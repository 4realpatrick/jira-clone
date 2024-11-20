export const GradientFillButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className = "", ...rest } = props;
  return (
    <button
      className="group/button relative overflow-hidden rounded-md border border-primary/20 bg-secondary px-4 py-1 text-xs font-medium text-primary transition-all duration-150 hover:border-primary active:scale-95"
      {...rest}
    >
      <span className="absolute bottom-0 left-0 z-0 h-0 w-full bg-gradient-to-t from-primary to-primary transition-all duration-500 group-hover/button:h-full" />
      <span className="relative z-10 transition-all duration-500 group-hover/button:text-primary-foreground">
        SyntaxUI
      </span>
    </button>
  );
};

export default GradientFillButton;
