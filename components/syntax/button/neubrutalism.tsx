export const NeubrutalismButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className = "", ...rest } = props;
  return (
    <button
      className="group/button rounded-lg bg-primary/80 my-3 disabled:pointer-events-none disabled:opacity-50"
      {...rest}
    >
      <span className="block -translate-x-1 -translate-y-1 rounded-lg border-2 border-primary/80 bg-primary px-4 py-1 text-sm text-primary-foreground font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0">
        {children}
      </span>
    </button>
  );
};
