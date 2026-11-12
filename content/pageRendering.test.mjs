import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { compileFunction } from "node:vm";
import { normalizePageCopy } from "./pageContent.ts";
import { pathwayPageCopy, pathwayPages } from "./pathwayPages.ts";
import { talentPoolPageCopy, nationalTeamsPageCopy } from "./hubPages.ts";
import { scopeCalendarEntries } from "../apps/web/lib/calendar.ts";
import nextConfig from "../apps/web/next.config.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const webRequire = createRequire(resolve(root, "apps/web/package.json"));
const { createElement } = webRequire("react");
const { renderToStaticMarkup: renderMarkup } = webRequire("react-dom/server");
const { ImageConfigContext } = webRequire(
  "next/dist/shared/lib/image-config-context.shared-runtime",
);
const { imageConfigDefault } = webRequire("next/dist/shared/lib/image-config");
function renderToStaticMarkup(element) {
  return renderMarkup(
    createElement(
      ImageConfigContext.Provider,
      { value: { ...imageConfigDefault, ...nextConfig.images } },
      element,
    ),
  );
}
const ts = webRequire("typescript");
const loaded = new Map();

// Compile the existing TSX with the project's TypeScript, without adding a test runner.
function loadComponent(filename) {
  if (loaded.has(filename)) return loaded.get(filename).exports;
  const module = { exports: {} };
  loaded.set(filename, module);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: filename,
  });
  const require = createRequire(filename);
  const localRequire = (specifier) => {
    if (specifier === "lucide-react")
      return loadComponent(require.resolve(specifier));
    if (!specifier.startsWith("@/") && !specifier.startsWith("."))
      return require(specifier);
    const target = specifier.startsWith("@/")
      ? resolve(root, "apps/web", specifier.slice(2))
      : resolve(dirname(filename), specifier);
    const source = [target, `${target}.ts`, `${target}.tsx`].find((file) =>
      existsSync(file),
    );
    assert.ok(source, `Cannot resolve ${specifier} from ${filename}`);
    return loadComponent(source);
  };
  compileFunction(outputText, ["require", "module", "exports"], { filename })(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}

const { PathwayDetailPage } = loadComponent(
  resolve(root, "apps/web/components/PathwayDetailPage.tsx"),
);
const { HubHero } = loadComponent(
  resolve(root, "apps/web/components/HubHero.tsx"),
);
const { TalentPoolHub } = loadComponent(
  resolve(root, "apps/web/components/talentpools/TalentPoolHub.tsx"),
);
const { SeasonPlanningSection } = loadComponent(
  resolve(root, "apps/web/components/sections/SeasonPlanningSection.tsx"),
);
const { ContentSections } = loadComponent(
  resolve(root, "apps/web/components/sections/ContentSections.tsx"),
);
const { resolveContentSections } = loadComponent(
  resolve(root, "apps/web/lib/pageSections.ts"),
);
const { getSanityImage } = loadComponent(
  resolve(root, "apps/web/lib/sanityImage.ts"),
);
const imageConfig = { projectId: "testproject", dataset: "production" };
const imageAsset = {
  _ref: "image-0123456789012345678901234567890123456789-2000x1000-jpg",
};
const labels = {
  confirmed: "Confirmed",
  provisional: "Provisional",
  completed: "Completed",
  upcoming: "Upcoming",
  cancelled: "Cancelled",
};

function render(content = {}, extra = {}) {
  return renderToStaticMarkup(
    createElement(PathwayDetailPage, {
      kind: "national-teams",
      slug: "u18m",
      team: "u18m",
      content: { copy: normalizePageCopy(pathwayPageCopy), ...content },
      events: [],
      games: [],
      posts: [],
      labels,
      ...extra,
    }),
  );
}

test("empty detail pages retain a dark named header and navigation without optional content", () => {
  for (const page of pathwayPages) {
    const html = render(
      {},
      {
        kind: page.kind,
        slug: page.slug,
        team: page.kind === "national-teams" ? page.slug : undefined,
      },
    );
    assert.match(html, new RegExp(`<h1[^>]*>${page.label}</h1>`));
    assert.match(html, /bg-\[#102D35\]/);
    assert.equal((html.match(/<section/g) ?? []).length, 1);
    assert.match(html, /overview/);
    assert.doesNotMatch(
      html,
      /<h[23]|<img|<video|<p[ >]|image\.png|Head Coach/,
    );
  }
});

test("published detail titles replace the structural team name", () => {
  const html = render({
    copy: {
      ...normalizePageCopy(pathwayPageCopy),
      heroTitle: "Published team title",
    },
  });
  assert.match(html, /<h1[^>]*>Published team title<\/h1>/);
  assert.doesNotMatch(html, /<h1[^>]*>U18 Men<\/h1>/);
});

test("staffing headings do not create a section without populated staff", () => {
  const html = render({
    copy: {
      ...normalizePageCopy(pathwayPageCopy),
      staffingTitle: "Our staff",
      staffingDescription: "Introduction",
    },
    staffing: [null, { _key: "blank", title: " " }],
  });
  assert.doesNotMatch(html, /id="staffing"|Our staff|Introduction/);
});

test("published staffing names, roles and descriptions render in authored order", () => {
  const html = render({
    copy: {
      ...normalizePageCopy(pathwayPageCopy),
      staffingTitle: "Team people",
    },
    staffing: [
      { _key: "named", name: "First person" },
      { _key: "blank" },
      {
        _key: "role",
        title: "Team Manager",
        description: "Published responsibilities",
      },
    ],
  });
  assert.match(html, /id="staffing"/);
  assert.match(html, /Team people/);
  assert.match(html, /First person/);
  assert.match(html, /Team Manager/);
  assert.match(html, /Published responsibilities/);
  assert.ok(html.indexOf("First person") < html.indexOf("Team Manager"));
  assert.doesNotMatch(html, /Head Coach|Assistant Coaches|<h3[^>]*><\/h3>/);
});

test("Talent Pool uses the same CMS staffing renderer", () => {
  const html = render(
    {
      staffing: [
        { _key: "coach", title: "Stage Coach", name: "Published coach" },
      ],
    },
    { kind: "talent-pool", slug: "u14", team: undefined },
  );
  assert.match(html, /Talent Pool overview/);
  assert.match(html, /Stage Coach/);
  assert.match(html, /Published coach/);
  assert.doesNotMatch(html, /Staffing Around The Stage|Head Coach/);
});

test("purpose and expectation headings stay hidden without body content", () => {
  const html = render({
    copy: {
      ...normalizePageCopy(pathwayPageCopy),
      purposeTitle: "Purpose",
      expectationsTitle: "Expectations",
    },
    expectations: [{ _key: "blank" }],
  });
  assert.doesNotMatch(
    html,
    /id="purpose"|id="expectations"|Purpose|Expectations/,
  );
});

test("populated information blocks render without restoring missing titles", () => {
  const html = render({
    copy: {
      ...normalizePageCopy(pathwayPageCopy),
      purposeDescription: "Published purpose",
    },
    expectations: [{ _key: "body", description: "Published expectations" }],
  });
  assert.match(html, /id="purpose"/);
  assert.match(html, /Published purpose/);
  assert.match(html, /id="expectations"/);
  assert.match(html, /Published expectations/);
  assert.doesNotMatch(html, /What players, families|Federation concepts/);
});

test("empty overview heroes keep a dark named header without placeholder copy or imagery", () => {
  for (const fallbackTitle of ["National Teams", "Talent Pool"]) {
    const html = renderToStaticMarkup(
      createElement(HubHero, {
        title: "",
        fallbackTitle,
        eyebrow: "",
        description: "",
        imageAlt: "",
        links: [],
      }),
    );
    assert.match(html, new RegExp(`<h1[^>]*>${fallbackTitle}</h1>`));
    assert.match(html, /bg-\[#102D35\]/);
    assert.doesNotMatch(html, /<img|<p[ >]|<a[ >]|image\.png/);
  }
});

test("overview hero links are shown only when their authored labels are supplied", () => {
  const html = renderToStaticMarkup(
    createElement(HubHero, {
      title: "Published overview",
      fallbackTitle: "National Teams",
      eyebrow: "",
      description: "",
      imageAlt: "",
      links: [
        { href: "#hidden", label: "", icon: () => null },
        { href: "#planner", label: "Published link", icon: () => null },
      ],
    }),
  );
  assert.match(html, /Published overview/);
  assert.doesNotMatch(html, /<h1[^>]*>National Teams<\/h1>/);
  assert.match(html, /href="#planner"/);
  assert.doesNotMatch(html, /href="#hidden"|<img/);
});

test("Talent Pool overview hides all empty sections, including heading-only ones", () => {
  const html = renderToStaticMarkup(
    createElement(TalentPoolHub, {
      events: [],
      posts: [],
      documents: [],
      labels,
      copy: {
        ...normalizePageCopy(talentPoolPageCopy),
        programTitle: "Heading only",
        plannerTitle: "No dates",
        newsTitle: "No posts",
        documentsTitle: "No documents",
        programPartnershipTitle: "No explanation",
      },
    }),
  );
  assert.equal(html, "");
});

test("images without selections stay centered and missing images stay absent", () => {
  assert.equal(getSanityImage(null, imageConfig), undefined);
  const image = getSanityImage({ asset: imageAsset }, imageConfig);
  assert.equal(image.objectPosition, "50% 50%");
  assert.equal(new URL(image.url).searchParams.get("rect"), null);
});

test("saved crops are applied and focal points are relative to the cropped image", () => {
  const image = getSanityImage(
    {
      asset: imageAsset,
      crop: { left: 0.1, right: 0.2, top: 0.1, bottom: 0.1 },
      hotspot: { x: 0.66, y: 0.3, width: 0.1, height: 0.1 },
    },
    imageConfig,
  );
  assert.equal(new URL(image.url).searchParams.get("rect"), "200,100,1400,800");
  const [x, y] = image.objectPosition.split(" ").map(parseFloat);
  assert.ok(Math.abs(x - 80) < 0.001);
  assert.ok(Math.abs(y - 25) < 0.001);
});

test("square portraits use the saved hotspot when generating the CDN crop", () => {
  const portrait = (x) =>
    getSanityImage(
      {
        asset: imageAsset,
        hotspot: { x, y: 0.5, width: 0.1, height: 0.1 },
      },
      imageConfig,
      { width: 192, height: 192 },
    );
  const left = new URL(portrait(0.2).url);
  const right = new URL(portrait(0.8).url);
  assert.equal(left.searchParams.get("rect"), "0,0,1000,1000");
  assert.equal(right.searchParams.get("rect"), "1000,0,1000,1000");
  assert.equal(right.searchParams.get("w"), "192");
  assert.equal(right.searchParams.get("h"), "192");
});

test("overview and detail hero images receive their saved focal position", () => {
  const image = getSanityImage(
    {
      asset: imageAsset,
      hotspot: { x: 0.8, y: 0.25, width: 0.1, height: 0.1 },
    },
    imageConfig,
  );
  const overview = renderToStaticMarkup(
    createElement(HubHero, {
      title: "",
      fallbackTitle: "National Teams",
      eyebrow: "",
      description: "",
      imageUrl: "/image.png",
      imagePosition: image.objectPosition,
      imageAlt: "",
      links: [],
    }),
  );
  const detail = render({
    heroImageUrl: "/image.png",
    heroImagePosition: image.objectPosition,
  });
  for (const html of [overview, detail]) {
    assert.match(html, /object-position:80% 25%/);
  }
});

test("national team cards always show the fixed link wording, ignoring legacy CMS labels", async () => {
  const clientPath = resolve(root, "apps/web/lib/sanityClient.ts");
  const pagePath = resolve(root, "apps/web/app/national-teams/page.tsx");
  const copy = normalizePageCopy(nationalTeamsPageCopy, {
    howWeWorkU18MenTitle: "U18 Men",
    howWeWorkU18WomenTitle: "U18 Women",
    howWeWorkU20MenTitle: "U20 Men",
    howWeWorkTeamLink: "Old custom label",
  });
  assert.equal("howWeWorkTeamLink" in copy, false);
  loaded.set(clientPath, {
    exports: {
      getCalendarEntries: async () => [],
      getNationalTeamPosts: async () => [],
      getNationalTeamsPageContent: async () => ({ copy }),
      getEventLabels: async () => labels,
    },
  });
  try {
    const Page = loadComponent(pagePath).default;
    const html = renderToStaticMarkup(await Page());
    assert.equal((html.match(/View team/g) ?? []).length, 3);
    for (const team of ["u18m", "u18w", "u20"]) {
      assert.match(html, new RegExp(`href="/national-teams/${team}"`));
    }
    assert.doesNotMatch(html, /Old custom label/);
  } finally {
    loaded.delete(clientPath);
    loaded.delete(pagePath);
  }
});

test("the shared calendar renders events and games together with their date ranges and details", () => {
  const date = new Date(Date.now() + 86400000).toISOString();
  const entries = [
    {
      _id: "camp",
      kind: "event",
      title: "Shared development camp",
      eventDate: date,
      endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
      venue: "Camp rink",
      status: "provisional",
      categories: [{ title: "U14", slug: "u14" }],
    },
    {
      _id: "game",
      kind: "exhibitionGame",
      title: "International fixture",
      eventDate: date,
      venue: "Match rink",
      status: "upcoming",
      opponent: "France",
      ticketUrl: "https://example.com/tickets",
      categories: [{ title: "U20 Men", slug: "u20" }],
    },
  ];
  const renderCalendar = (scope, theme = "light") =>
    renderToStaticMarkup(
      createElement(SeasonPlanningSection, {
        events: scopeCalendarEntries(entries, scope),
        labels,
        theme,
      }),
    );
  const homepage = renderCalendar("all", "dark");
  assert.match(homepage, /Shared development camp/);
  assert.match(homepage, /International fixture/);
  assert.match(homepage, /Belgium vs France/);
  assert.match(homepage, /href="https:\/\/example.com\/tickets"/);
  assert.match(homepage, /Provisional/);
  const talentPool = renderCalendar("talent-pool");
  assert.match(talentPool, /Shared development camp/);
  assert.doesNotMatch(talentPool, /International fixture|U20 Men/);
  const nationalTeams = renderCalendar("national-teams");
  assert.match(nationalTeams, /International fixture/);
  assert.doesNotMatch(nationalTeams, /Shared development camp|U14/);
  for (const html of [homepage, talentPool, nationalTeams]) {
    assert.match(html, /aria-label="Filter calendar by age group"/);
    assert.match(html, /aria-pressed="true"/);
  }
});

function sectionBody(text) {
  return [
    {
      _key: "paragraph",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: "span", _type: "span", text, marks: [] }],
    },
  ];
}

test("all seven content blocks render in authored order with editorial and accessible markup", () => {
  const sections = [
    {
      _key: "text",
      _type: "richTextSection",
      title: "An explanation",
      body: sectionBody("First content"),
    },
    {
      _key: "split",
      _type: "textImageSection",
      title: "On the ice",
      body: sectionBody("Image explanation"),
      imageUrl: "/image.png",
      imageAlt: "Players practising",
      imagePosition: "left",
      caption: "Training day",
    },
    {
      _key: "quote",
      _type: "quoteSection",
      theme: "dark",
      quote: "Every player has a next step.",
      attribution: "Programme coach",
      role: "Development",
    },
    {
      _key: "steps",
      _type: "stepsSection",
      items: [
        { _key: "one", title: "Discover", description: "Try the programme." },
        { _key: "two", title: "Develop" },
      ],
    },
    {
      _key: "faq",
      _type: "faqSection",
      items: [
        {
          _key: "q",
          question: "Who can join?",
          answer: sectionBody("Players from local clubs."),
        },
      ],
    },
    {
      _key: "callout",
      _type: "calloutSection",
      body: sectionBody("Speak to your club."),
      link: { label: "Find a club", href: "/clubs" },
    },
    {
      _key: "image",
      _type: "imageSection",
      imageUrl: "/image.png",
      imageAlt: "The team together",
      caption: "Our community",
    },
  ];
  const html = renderToStaticMarkup(
    createElement(ContentSections, { sections }),
  );
  assert.deepEqual(
    [...html.matchAll(/data-content-section="([^"]+)"/g)].map(
      (match) => match[1],
    ),
    sections.map((section) => section._type),
  );
  assert.match(html, /lg:order-first/);
  assert.match(
    html,
    /<blockquote[^>]*>Every player has a next step\.<\/blockquote>/,
  );
  assert.match(html, /<figcaption[^>]*>.*Programme coach/s);
  assert.match(html, /<ol[^>]*>.*Discover.*Develop/s);
  assert.match(
    html,
    /<details[^>]*>.*<summary[^>]*>Who can join\?.*Players from local clubs\./s,
  );
  assert.match(html, /href="\/clubs"/);
  assert.match(html, /<figcaption[^>]*>Our community<\/figcaption>/);
  assert.match(html, /\[--background:#152E35\]/);
  assert.match(html, /alt="Players practising"/);
});

test("missing arrays and incomplete sections create no empty wrappers", () => {
  for (const sections of [
    undefined,
    null,
    [],
    [
      null,
      {
        _key: "text",
        _type: "richTextSection",
        title: "Only a title",
        body: sectionBody(" "),
      },
      {
        _key: "split",
        _type: "textImageSection",
        body: sectionBody("No image yet"),
      },
      { _key: "quote", _type: "quoteSection", quote: " " },
      {
        _key: "steps",
        _type: "stepsSection",
        items: [null, { _key: "empty", title: " " }],
      },
      {
        _key: "faq",
        _type: "faqSection",
        items: [{ _key: "q", question: "No answer" }],
      },
      { _key: "callout", _type: "calloutSection" },
      { _key: "image", _type: "imageSection", caption: "No image yet" },
    ],
  ]) {
    assert.equal(
      renderToStaticMarkup(createElement(ContentSections, { sections })),
      "",
    );
  }
});

test("section images preserve crops and focal points in either desktop layout without mutating CMS data", () => {
  const raw = ["left", "right"].map((imagePosition) => ({
    _key: imagePosition,
    _type: "textImageSection",
    imagePosition,
    body: sectionBody("Explanation"),
    image: {
      asset: imageAsset,
      crop: { left: 0.1, right: 0.2, top: 0.1, bottom: 0.1 },
      hotspot: { x: 0.66, y: 0.3, width: 0.1, height: 0.1 },
    },
    imageAlt: "Published description",
  }));
  const sections = resolveContentSections(raw, imageConfig);
  assert.equal(
    new URL(sections[0].imageUrl).searchParams.get("rect"),
    "200,100,1400,800",
  );
  assert.ok(raw[0].image.asset);
  assert.equal("image" in sections[0], false);
  const html = renderToStaticMarkup(
    createElement(ContentSections, { sections }),
  );
  assert.equal((html.match(/lg:order-first/g) ?? []).length, 1);
  assert.equal((html.match(/object-position:80/g) ?? []).length, 2);
  assert.equal(resolveContentSections(null, imageConfig).length, 0);
});

test("rich text renders lists and safe links but never executable destinations", (context) => {
  const warning = context.mock.method(console, "warn", () => {});
  const body = sectionBody("Safe link");
  body[0].markDefs = [{ _key: "safe", _type: "link", href: "/clubs" }];
  body[0].children[0].marks = ["safe"];
  const unsafe = sectionBody("Unsafe destination");
  unsafe[0].markDefs = [
    { _key: "bad", _type: "link", href: "javascript:alert(1)" },
  ];
  unsafe[0].children[0].marks = ["bad"];
  const list = sectionBody("A useful bullet");
  list[0].listItem = "bullet";
  list[0].level = 1;
  const html = renderToStaticMarkup(
    createElement(ContentSections, {
      sections: [
        {
          _key: "links",
          _type: "richTextSection",
          body: [...body, ...unsafe, ...list],
        },
        {
          _key: "cta",
          _type: "calloutSection",
          body: sectionBody("Guidance"),
          link: { label: "Unsafe action", href: "//example.com" },
        },
      ],
    }),
  );
  assert.match(html, /href="\/clubs"/);
  assert.match(html, /<ul[^>]*>.*A useful bullet/s);
  assert.match(html, /Unsafe destination|Unsafe action/);
  assert.doesNotMatch(html, /javascript:|href="\/\//);
  assert.equal(warning.mock.callCount(), 2);
});

test("overview and detail pages use the same flexible sections, with Talent Pool calendar last", async () => {
  const sections = [
    {
      _key: "explanation",
      _type: "richTextSection",
      body: sectionBody("Flexible authored explanation"),
    },
  ];
  const future = new Date(Date.now() + 86400000).toISOString();
  const events = [
    {
      _id: "camp",
      kind: "event",
      title: "Published camp",
      eventDate: future,
      status: "confirmed",
      categories: [{ title: "U14", slug: "u14" }],
    },
  ];
  const clientPath = resolve(root, "apps/web/lib/sanityClient.ts");
  for (const route of ["talent-pool", "national-teams"]) {
    const pagePath = resolve(root, `apps/web/app/${route}/page.tsx`);
    loaded.set(clientPath, {
      exports: {
        getCalendarEntries: async () => events,
        getTalentPoolPosts: async () => [],
        getTalentPoolDocuments: async () => [],
        getNationalTeamPosts: async () => [],
        getTalentPoolPageContent: async () => ({
          contentSections: sections,
          copy: {
            ...normalizePageCopy(talentPoolPageCopy),
            programTitle: "How we work",
            programDescription: "Introductory content",
            programClubDescription: "Club responsibilities",
          },
        }),
        getNationalTeamsPageContent: async () => ({
          contentSections: sections,
          copy: {
            ...normalizePageCopy(nationalTeamsPageCopy),
            howWeWorkTitle: "How we work",
            howWeWorkDescription: "Introductory content",
          },
        }),
        getEventLabels: async () => labels,
      },
    });
    try {
      const Page = loadComponent(pagePath).default;
      const html = renderToStaticMarkup(await Page());
      assert.match(html, /Flexible authored explanation/);
      assert.ok(
        html.indexOf("Introductory content") <
          html.indexOf("Flexible authored explanation"),
      );
      if (route === "talent-pool") {
        assert.ok(
          html.indexOf("Club responsibilities") < html.indexOf('id="planner"'),
        );
        assert.match(html, /id="planner"[\s\S]*<\/section><\/main>$/);
      }
    } finally {
      loaded.delete(clientPath);
      loaded.delete(pagePath);
    }
  }
  for (const kind of ["talent-pool", "national-teams"]) {
    assert.match(
      render({ contentSections: sections }, { kind }),
      /Flexible authored explanation/,
    );
  }
});
