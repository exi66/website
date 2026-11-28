import { getDocsTocs } from '@/lib/markdown';
import TocObserver from './toc-observer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dictionary } from '@/lib/dictionaries';

export default async function Toc({ path, dict }: { path: string; dict: Dictionary }) {
  const tocs = await getDocsTocs(path);

  return (
    <div className="toc sticky top-16 hidden min-w-59.5 flex-[1.5] py-9 lg:flex">
      <div className="flex w-full flex-col gap-3 pl-2">
        <h3 className="text-sm font-semibold">{dict.docs.on_this_page}</h3>
        <ScrollArea className="overflow-y-auto pt-0.5 pb-2">
          <TocObserver data={tocs} />
        </ScrollArea>
      </div>
    </div>
  );
}
