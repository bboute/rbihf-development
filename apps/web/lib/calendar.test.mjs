import assert from "node:assert/strict";
import test from "node:test";
import {
  calendarAgeFilters,
  calendarEntryStatus,
  filterCalendarEntries,
  scopeCalendarEntries,
} from "./calendar.ts";

const camp = {
  _id: "camp",
  kind: "event",
  title: "Development camp",
  eventDate: "2026-11-20T09:00:00Z",
  endDate: "2026-11-22T18:00:00Z",
  venue: "Ice rink",
  status: "provisional",
  categories: [{ title: "U14", slug: "u14" }],
};
const game = {
  _id: "game",
  kind: "exhibitionGame",
  title: "International game",
  eventDate: "2026-11-21T18:00:00Z",
  venue: "Ice rink",
  status: "upcoming",
  opponent: "France",
  categories: [
    { title: "U14", slug: "u14" },
    { title: "U16", slug: "u16" },
  ],
};

test("age-group schedules combine games and events chronologically without losing game details", () => {
  const entries = [game, camp];
  assert.deepEqual(filterCalendarEntries(entries, "u14"), [camp, game]);
  assert.deepEqual(filterCalendarEntries(entries, "u16"), [game]);
  assert.deepEqual(entries, [game, camp]);
});

test("filters include older groups and inspect every category, not just the first", () => {
  const olderGame = {
    ...game,
    _id: "older-game",
    categories: [{ title: "U20 Men", slug: "u20" }],
  };
  const uncategorized = { ...camp, _id: "general", categories: [] };
  const entries = [olderGame, game, camp, uncategorized];
  assert.deepEqual(calendarAgeFilters(entries), [
    { value: "all", label: "All groups" },
    { value: "u14", label: "U14" },
    { value: "u16", label: "U16" },
    { value: "u20", label: "U20 Men" },
  ]);
  assert.deepEqual(filterCalendarEntries(entries, "u20"), [olderGame]);
  assert.equal(filterCalendarEntries(entries, "all").length, 4);
  assert.deepEqual(filterCalendarEntries(entries, "u15"), []);
});

test("ongoing multi-day events keep planning status and cancellations are never marked completed", () => {
  const duringCamp = Date.parse("2026-11-21T12:00:00Z");
  const afterCamp = Date.parse("2026-11-23T12:00:00Z");
  assert.equal(calendarEntryStatus(camp, duringCamp), "provisional");
  assert.equal(calendarEntryStatus(camp, afterCamp), "completed");
  assert.equal(
    calendarEntryStatus({ ...game, status: "cancelled" }, afterCamp),
    "cancelled",
  );
  assert.equal(
    calendarEntryStatus({ ...game, status: "completed" }, duringCamp),
    "completed",
  );
});

test("page scopes include both content types and never leak unrelated filters", () => {
  const teamGame = {
    ...game,
    _id: "team-game",
    categories: [{ title: "U18 Men", slug: "u18m" }],
  };
  const teamCamp = {
    ...camp,
    _id: "team-camp",
    categories: [{ title: "U20 Men", slug: "u20" }],
  };
  const shared = {
    ...game,
    _id: "shared",
    categories: [...camp.categories, ...teamCamp.categories],
  };
  const entries = [camp, game, teamGame, teamCamp, shared];
  const talentPool = scopeCalendarEntries(entries, "talent-pool");
  const nationalTeams = scopeCalendarEntries(entries, "national-teams");
  assert.deepEqual(
    talentPool.map((entry) => entry._id),
    ["camp", "game", "shared"],
  );
  assert.deepEqual(
    nationalTeams.map((entry) => entry._id),
    ["team-game", "team-camp", "shared"],
  );
  assert.deepEqual(
    calendarAgeFilters(talentPool).map((filter) => filter.value),
    ["all", "u14", "u16"],
  );
  assert.deepEqual(
    calendarAgeFilters(nationalTeams).map((filter) => filter.value),
    ["all", "u18m", "u20"],
  );
  assert.equal(scopeCalendarEntries(entries, "all").length, 5);
  assert.equal(shared.categories.length, 2);
});

test("legacy U18 activities appear for both U18 teams, not U20", () => {
  const legacyGame = {
    ...game,
    categories: [{ title: "U18", slug: "u18" }],
  };
  assert.deepEqual(filterCalendarEntries([legacyGame], "u18m"), [legacyGame]);
  assert.deepEqual(filterCalendarEntries([legacyGame], "u18w"), [legacyGame]);
  assert.deepEqual(filterCalendarEntries([legacyGame], "u20"), []);
});
