// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: boolean; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    // this title is translation key present in en.json or other language files
    // make sure you add translation for this key in all language files
    title: "introduction",
    href: "/introduction",
    noLink: false,
  },
  {
    // translation key present in dictionaries/*.json under "leftbar"
    title: "work-experience",
    href: "/work-experience",
    noLink: false,
  },
  {
    title: "projects",
    href: "/projects",
    noLink: false,
    items: [
      { title: "website", href: "/website" },
      { title: "shiel-bot", href: "/shiel-bot" },
      { title: "bdo-sieges", href: "/bdo-sieges" },
      { title: "tcp-rtt", href: "/tcp-rtt" },
      { title: "mcgl-timeline", href: "/mcgl-timeline" },
      { title: "mcgl-arts", href: "/mcgl-arts" },
      { title: "mcgl-slimes", href: "/mcgl-slimes" },
      { title: "mcgl-data", href: "/mcgl-data" },
      { title: "mcgl-correct-evasion-calculator", href: "/mcgl-correct-evasion-calculator" },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
