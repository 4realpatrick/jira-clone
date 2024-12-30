import { Languages, PaintBucket, Palette, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LanguageController } from "@/components/system/locale-controller";
import { ThemeColorController } from "@/components/system/theme/theme-color-controller";
import { ThemeController } from "@/components/system/theme/theme-controller";

export function PortableSetting() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full size-11 portable-setting">
          <Settings className="size-4 text-primary-foreground shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Palette className="size-6" />
            <ThemeController />
          </div>
          <div className="flex items-center gap-2">
            <PaintBucket className="size-6" />
            <ThemeColorController />
          </div>
          <div className="flex items-center gap-2">
            <Languages className="size-6" />
            <LanguageController />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
