import {
  BellRing,
  Bot,
  Calculator,
  ChartNoAxesColumnIncreasing,
  Database,
  Globe,
  Image,
  Map,
  MapPin,
  Network,
  Puzzle,
  type LucideIcon,
} from 'lucide-react';

// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  icon?: LucideIcon;
  noLink?: boolean; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    // this title is translation key present in en.json or other language files
    // make sure you add translation for this key in all language files
    title: 'introduction',
    href: '/introduction',
    noLink: false,
  },
  {
    // translation key present in dictionaries/*.json under "leftbar"
    title: 'work-experience',
    href: '/work-experience',
    noLink: false,
  },
  {
    title: 'projects',
    href: '/projects',
    noLink: false,
    items: [
      { title: 'modding-platform', href: '/modding-platform', icon: Puzzle },
      { title: 'mcgl-mcp', href: '/mcgl-mcp', icon: Bot },
      { title: 'tcp-rtt', href: '/tcp-rtt', icon: Network },
      { title: 'shiel-bot', href: '/shiel-bot', icon: BellRing },
      { title: 'bdo-sieges', href: '/bdo-sieges', icon: Map },
      { title: 'mcgl-data', href: '/mcgl-data', icon: Database },
      { title: 'mcgl-correct-evasion-calculator', href: '/mcgl-correct-evasion-calculator', icon: Calculator },
      { title: 'mcgl-itpe-ahk', href: '/mcgl-itpe-ahk', icon: Image },
      { title: 'mcgl-slimes', href: '/mcgl-slimes', icon: MapPin },
      { title: 'visits-counter', href: '/visits-counter', icon: ChartNoAxesColumnIncreasing },
      { title: 'website', href: '/website', icon: Globe },
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
