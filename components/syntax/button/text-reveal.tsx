import { LucideIcon } from "lucide-react";

export const TextRevealButton = (
  props: Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "onClick"
  > & {
    icon: React.ReactNode;
  }
) => {
  const { children, icon, ...rest } = props;

  return (
    <button
      className="group/button relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:w-24"
      {...rest}
    >
      <p className="inline-flex whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
        {children}
      </p>
      <div className="absolute right-1.5">{icon}</div>
    </button>
  );
};
