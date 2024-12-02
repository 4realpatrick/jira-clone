"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaTerminal } from "react-icons/fa";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { IconType } from "react-icons/lib";
import { showup } from "@/constant/animations";
interface ICompositeAlterProps {
  title: string | JSX.Element;
  description?: string;
  className?: string;
  icon?: IconType;
}
const MotionAlert = m.create(Alert);
const CompositeAlert: React.FC<ICompositeAlterProps> = ({
  title,
  description,
  className = "",
  icon = FaTerminal,
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionAlert className={className} {...showup()}>
        {icon({ className: "size-4" })}
        <AlertTitle>{title}</AlertTitle>
        {!!description && (
          <AlertDescription className="text-xs">{description}</AlertDescription>
        )}
      </MotionAlert>
    </LazyMotion>
  );
};

export default CompositeAlert;
