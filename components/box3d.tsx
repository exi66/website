import { UbuntuIcon } from "@/components/icons/ubuntu";
import { DockerIcon } from "@/components/icons/docker";
import { LaravelIcon } from "@/components/icons/laravel";
import { TailwindIcon } from "@/components/icons/tailwind";
import { VueIcon } from "@/components/icons/vue";
import { MySQLIcon } from "@/components/icons/mysql";

export const TechBox = () => {
  return (
    <div className="w-auto hidden sm:flex my-auto mr-8 ml-8 -z-10 relative">
      <div className="box3d">
        <div className="p1 flex bg-[#42b883]">
          <VueIcon className="m-auto h-16 w-auto" />
        </div>
        <div className="p2 flex bg-[#ff2d20]">
          <LaravelIcon className="m-auto h-16 w-auto" />
        </div>
        <div className="p3 flex bg-[#00678c]">
          <MySQLIcon className="m-auto h-16 w-auto" />
        </div>
        <div className="p4 flex bg-[#066da5]">
          <DockerIcon className="m-auto h-16 w-auto" />
        </div>
        <div className="p5 flex bg-[#38bdf8]">
          <TailwindIcon className="m-auto w-16 h-auto" />
        </div>
        <div className="p6 flex bg-[#f47421]">
          <UbuntuIcon className="m-auto h-16 w-auto" />
        </div>
      </div>
    </div>
  );
};
