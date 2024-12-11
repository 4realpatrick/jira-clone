import { useMedia } from "react-use";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface IResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onlyCancelToExit: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal: React.FC<IResponsiveModalProps> = ({
  children,
  open,
  onlyCancelToExit,
  onOpenChange,
}) => {
  const isPC = useMedia("(min-width: 1024px)", true);
  if (isPC) {
    return onlyCancelToExit ? (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh] gap-0">
          <AlertDialogTitle>
            <VisuallyHidden>x</VisuallyHidden>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <VisuallyHidden>x</VisuallyHidden>
          </AlertDialogDescription>
          {children}
        </AlertDialogContent>
      </AlertDialog>
    ) : (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          <DialogTitle className="hidden"></DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerTitle className="hidden"></DrawerTitle>
          <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
