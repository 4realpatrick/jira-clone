export const NeubrutalismButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className = "", ...rest } = props;
  return (
    <button
      className="group/button rounded-lg bg-primary/80 text-black my-3"
      {...rest}
    >
      <span className="block -translate-x-1 -translate-y-1 rounded-lg border-2 border-[#222222] bg-primary px-4 py-1 text-sm font-medium tracking-tight transition-all group-hover/button:-translate-y-2 group-active/button:translate-x-0 group-active/button:translate-y-0">
        {children}
      </span>
    </button>
  );
};
