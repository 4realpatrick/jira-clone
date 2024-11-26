import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IHintProps {
  children: React.ReactNode;
  descrption: string | React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  asChild?: boolean;
  align?: "center" | "end" | "start";
}
export const Hint: React.FC<IHintProps> = ({
  children,
  descrption,
  side = "top",
  sideOffset = 0,
  asChild = false,
  align = "center",
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          align={align}
          className="text-xs max-w-[200px] break-words"
        >
          {descrption}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
