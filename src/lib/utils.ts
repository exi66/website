import { cn } from 'cn';
import { EachRoute, ROUTES } from './routes-config';
import { Dictionary } from './dictionaries';

export { cn };

export function helperSearch(
  query: string,
  dict: Dictionary,
  node: EachRoute,
  prefix: string,
  currenLevel: number,
  maxLevel?: number,
) {
  const res: EachRoute[] = [];
  let parentHas = false;

  const nextLink = `${prefix}${node.href}`;

  if (
    !node.noLink &&
    dict.leftbar[node.title as keyof typeof dict.leftbar]?.toLowerCase().includes(query.toLowerCase())
  ) {
    res.push({ ...node, items: undefined, href: nextLink });
    parentHas = true;
  }
  const goNext = maxLevel ? currenLevel < maxLevel : true;
  if (goNext) {
    node.items?.forEach((item) => {
      const innerRes = helperSearch(query, dict, item, nextLink, currenLevel + 1, maxLevel);
      if (!!innerRes.length && !parentHas && !node.noLink) {
        res.push({ ...node, items: undefined, href: nextLink });
        parentHas = true;
      }
      res.push(...innerRes);
    });
  }
  return res;
}

export function advanceSearch(query: string, dict: Dictionary) {
  return ROUTES.map((node) => helperSearch(query, dict, node, '', 1, query.length == 0 ? 2 : undefined)).flat();
}

export function stringToDate(date: string) {
  const [day, month, year] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
}
