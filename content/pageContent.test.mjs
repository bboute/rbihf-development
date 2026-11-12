import assert from "node:assert/strict"
import test from "node:test"
import {
  normalizePageCopy,
  filledContentItems,
  filledStaffMembers,
} from "./pageContent.ts"
import { pathwayPageCopy, pathwayPages } from "./pathwayPages.ts"
import { isContentHref } from "./contentLinks.ts"

test("missing documents and missing/null/blank fields never restore defaults", () => {
  const fields = { title: "Old title", description: "Old description" }
  assert.deepEqual(normalizePageCopy(fields), { title: "", description: "" })
  assert.deepEqual(normalizePageCopy(fields, null), {
    title: "",
    description: "",
  })
  assert.deepEqual(
    normalizePageCopy(fields, { title: null, description: "  " }),
    {
      title: "",
      description: "",
    },
  )
  assert.deepEqual(
    normalizePageCopy(fields, { title: "  Published title  " }),
    {
      title: "Published title",
      description: "",
    },
  )
})

test("every detail page has a unique CMS document and blank initial copy", () => {
  assert.equal(pathwayPages.length, 6)
  assert.equal(new Set(pathwayPages.map((page) => page.id)).size, 6)
  assert.ok(Object.values(pathwayPageCopy).every((value) => value === ""))
})

test("information blocks omit blank entries and preserve authored order", () => {
  const titleOnly = { _key: "title", title: "Preparation" }
  const descriptionOnly = {
    _key: "body",
    description: "Published information",
  }
  assert.deepEqual(
    filledContentItems([
      null,
      { _key: "empty" },
      titleOnly,
      { _key: "space", title: " ", description: "\n" },
      descriptionOnly,
    ]),
    [titleOnly, descriptionOnly],
  )
})

test("staffing has no placeholder roles and accepts partial published profiles", () => {
  assert.deepEqual(filledStaffMembers(), [])
  assert.deepEqual(filledStaffMembers(null), [])
  const namedPerson = { _key: "person", name: "Published name" }
  const roleOnly = { _key: "role", title: "Team Manager" }
  const bioOnly = { _key: "bio", description: "Published responsibilities" }
  assert.deepEqual(
    filledStaffMembers([
      null,
      { _key: "blank" },
      { _key: "image-only", imageUrl: "https://example.com/photo.jpg" },
      { _key: "space", name: " " },
      namedPerson,
      roleOnly,
      bioOnly,
    ]),
    [namedPerson, roleOnly, bioOnly],
  )
})
test("content links allow intended destinations and reject unsafe or malformed URLs", () => {
  for (const href of [
    "/clubs",
    "/news/a%20story",
    "#planner",
    "https://example.com",
    "http://example.com/path?q=1",
    "mailto:office@example.com",
    "tel:+3212345678",
  ]) {
    assert.equal(isContentHref(href), true, href)
  }
  for (const href of [
    null,
    "",
    " ",
    "javascript:alert(1)",
    "data:text/html,test",
    "//example.com",
    "/\\example.com",
    "/path\ninjected",
    "https://",
    "mailto:",
    "relative/path",
  ]) {
    assert.equal(isContentHref(href), false, String(href))
  }
})
