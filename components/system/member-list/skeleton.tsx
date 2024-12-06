import { cn } from "@/lib/utils";

export const MembersSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {[...new Array(5)].map((_, index) => (
        <div
          className={cn(
            "relative mx-auto min-h-fit w-full sm:max-w-[300px] md:max-w-[600px] lg:max-w-[800px] cursor-pointer overflow-hidden rounded-2xl p-4",
            // animation styles
            "transition-all duration-200 ease-in-out hover:scale-[103%]",
            // light styles
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            // dark styles
            "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}
          key={index}
        >
          <div className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full animate-pulse bg-primary"></div>
            <div className="flex flex-col overflow-hidden gap-2">
              <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                <div className="text-sm sm:text-lg animate-pulse w-32 h-4 bg-primary rounded-lg"></div>
                {/* <span className="text-xs text-gray-500">{time}</span> */}
              </figcaption>
              <p className="w-20 h-4 animate-pulse bg-primary rounded-lg"></p>
              {/* <p className="text-sm font-normal dark:text-white/60">
      {description}
    </p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
