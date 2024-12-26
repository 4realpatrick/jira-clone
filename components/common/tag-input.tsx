import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IKeywordsInputProps {
  keywords: string[];
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  onKeywordsChange: (keywords: string[]) => void;
}

export const KeywordsInput: React.FC<IKeywordsInputProps> = ({
  keywords,
  placeholder = "Type keyword and press Enter...",
  id,
  disabled,
  onKeywordsChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Handles adding new keyword on Enter or comma press, and keyword removal on Backspace
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
      event.preventDefault();
      const newKeywords = [...keywords, inputValue.trim()];
      onKeywordsChange(newKeywords);
      setInputValue("");
    } else if (event.key === "Backspace" && inputValue === "") {
      event.preventDefault();
      const newKeywords = keywords.slice(0, -1);
      onKeywordsChange(newKeywords);
    }
  };

  // Handles pasting keywords separated by commas, new lines, or tabs
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const paste = event.clipboardData.getData("text");
    const keywordsToAdd = paste
      .split(/[\n\t,]+/)
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    if (keywordsToAdd.length) {
      const newKeywords = [...keywords, ...keywordsToAdd];
      onKeywordsChange(newKeywords);
      setInputValue("");
    }
  };

  // Updates the inputValue state as the user types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  // Adds the keyword when the input loses focus, if there's a keyword to add
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim() !== "" && event.relatedTarget?.tagName !== "BUTTON") {
      const newKeywords = [...keywords, inputValue.trim()];
      onKeywordsChange(newKeywords);
      setInputValue("");
    }
  };

  // Removes a keyword from the list
  const removeKeyword = (indexToRemove: number) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove);
    onKeywordsChange(newKeywords);
  };

  return (
    <div className="flex w-full flex-wrap items-center rounded-lg border p-2 bg-background">
      <div
        className="flex w-full flex-wrap overflow-y-auto"
        style={{ maxHeight: "300px" }}
      >
        {keywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => removeKeyword(index)}
            className={cn(
              "m-1 flex items-center rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground",
              disabled && "opacity-50 pointer-events-none"
            )}
          >
            {keyword}
            <X size={14} className="ml-2 cursor-pointer" />
          </button>
        ))}
        <input
          type="text"
          className="my-1 flex-1 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
          value={inputValue}
          id={id}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
