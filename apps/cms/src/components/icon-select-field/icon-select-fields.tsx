"use client";

import { useField, FieldLabel as Label } from "@payloadcms/ui";
import { cn } from "@synoem/ui/lib/utils";
import { Button } from "@synoem/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@synoem/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@synoem/ui/components/popover";
import { icons as LucideIcons } from "lucide-react";
import type { TextFieldClientProps } from "payload";
import { useState, useEffect } from "react";

const lucideIconNames = Object.keys(LucideIcons);

const processIconData = () => {
  try {
    const processedIcons = lucideIconNames
      .map((iconName) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];

        if (!IconComponent) {
          return null;
        }

        let displayName = String(iconName);
        try {
          displayName = displayName
            .replace(/([A-Z])/g, " $1")
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            .trim();
        } catch (e) {
          console.error("Format icon name error:", e);
        }

        return {
          name: iconName,
          displayName,
          component: IconComponent,
        };
      })
      .filter(Boolean);

    return processedIcons;
  } catch (error) {
    console.error("Error processing icon data:", error);
    return [];
  }
};

const ICON_DATA = processIconData();

export const IconSelectField: React.FC<TextFieldClientProps> = (props) => {
  const { field, path } = props;
  const label = field.label || "Icon";
  const { value, setValue } = useField<string>({ path });

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [selectedIcon, setSelectedIcon] = useState<any>(null);

  useEffect(() => {
    if (value) {
      const found = ICON_DATA.find((icon) => icon?.name === value);
      setSelectedIcon(found || null);
    } else {
      setSelectedIcon(null);
    }
  }, [value]);

  const filteredIcons = searchQuery
    ? ICON_DATA.filter(
        (icon) =>
          icon?.displayName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          icon?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ICON_DATA;

  const handleSelect = (iconName: string) => {
    setValue(iconName);
    setOpen(false);
  };

  const renderSelectedIcon = () => {
    if (!selectedIcon) {
      return <span>+ Select an Icon</span>;
    }

    try {
      const { component: IconComponent, displayName } = selectedIcon;
      return (
        <span className="flex items-center gap-2">
          <IconComponent className="w-5 h-5" />
          {displayName}
        </span>
      );
    } catch (error) {
      console.error("Error rendering selected icon:", error);
      return <span>Error displaying icon</span>;
    }
  };

  return (
    <div className="twp field-type icon-select-field">
      <Label htmlFor={`field-${path?.replace(/\./gi, "__")}`} label={label} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="mb-[10px]" asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[220px] justify-start text-left font-normal",
              !selectedIcon && "text-muted-foreground"
            )}
          >
            {renderSelectedIcon()}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[320px]" side="right" align="start">
          <Command>
            <CommandInput
              placeholder="Search icon..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No icons found</CommandEmpty>
              <CommandGroup>
                {filteredIcons.length === 0 ? (
                  <div className="p-4 text-center">
                    No icons match your search
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 p-2">
                    {filteredIcons.slice(0, 200).map((icon) => {
                      if (!icon) {
                        return null;
                      }

                      const {
                        name,
                        component: IconComponent,
                        displayName,
                      } = icon;
                      return (
                        <CommandItem
                          key={name}
                          value={name}
                          onSelect={handleSelect}
                          className="flex flex-col items-center justify-center p-2"
                        >
                          <div className="flex flex-col items-center">
                            <IconComponent className="w-6 h-6 mb-1" />
                            <span className="text-xs text-center">
                              {displayName}
                            </span>
                          </div>
                        </CommandItem>
                      );
                    })}
                    {filteredIcons.length > 200 && (
                      <div className="col-span-4 text-center text-sm p-2 text-muted-foreground">
                        Showing first 200 of {filteredIcons.length} results.
                        Refine your search to see more.
                      </div>
                    )}
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
