import { cn } from "@/lib/utils";

export const ShineButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className = "", ...rest } = props;
  return (
    <button
      className={cn(
        "group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:primary/30",
        className,
        "hover:bg-primary"
      )}
      {...rest}
    >
      {children}
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20" />
      </div>
    </button>
  );
};
