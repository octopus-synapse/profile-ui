

"use client";

import * as React from "react";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
  color?: string;
}

export interface AutocompleteProps {
  
  value?: string;
  
  displayValue?: string;
  
  onValueChange?: (value: string, option?: AutocompleteOption) => void;
  
  onSearch?: (query: string) => void;
  
  options?: AutocompleteOption[];
  
  placeholder?: string;
  
  searchPlaceholder?: string;
  
  emptyMessage?: string;
  
  isLoading?: boolean;
  
  disabled?: boolean;
  
  error?: boolean;
  
  className?: string;
  
  minSearchLength?: number;
  
  clearable?: boolean;
}

export function Autocomplete({
  value,
  displayValue,
  onValueChange,
  onSearch,
  options = [],
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum resultado encontrado",
  isLoading = false,
  disabled = false,
  error = false,
  className,
  minSearchLength = 2,
  clearable = true,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = displayValue || selectedOption?.label;

  
  React.useEffect(() => {
    if (search.length >= minSearchLength) {
      const timeoutId = setTimeout(() => {
        onSearch?.(search);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [search, minSearchLength, onSearch]);

  
  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleSelect = (option: AutocompleteOption) => {
    onValueChange?.(option.value, option);
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.("", undefined);
    setSearch("");
  };

  const listboxId = React.useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm",
            "border border-white/10 bg-[#030303]",
            "text-white",
            "ring-offset-[#030303]",
            "focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-pf-danger-emphasis",
            className
          )}
        >
          <span className={cn("flex-1 truncate", !displayText && "text-zinc-500")}>
            {displayText || placeholder}
          </span>
          <div className="ml-2 flex items-center gap-1">
            {clearable && value && !disabled && (
              <X
                className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "z-50 w-[--radix-popover-trigger-width] overflow-hidden rounded-lg p-0",
          "border border-white/10 bg-[#0A0A0A]/95 shadow-lg",
          "animate-in fade-in-0 zoom-in-95"
        )}
        align="start"
        sideOffset={4}
      >
        {}
        <div className="flex items-center border-b border-white/10 px-3">
          <Search className="mr-2 h-4 w-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            className={cn(
              "flex h-10 w-full bg-transparent py-3 text-sm outline-none",
              "text-white placeholder:text-zinc-600"
            )}
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />}
        </div>

        {}
        <div id={listboxId} role="listbox" className="max-h-[300px] overflow-y-auto p-1">
          {search.length < minSearchLength ? (
            <div className="py-6 text-center text-sm text-zinc-400">
              Digite pelo menos {minSearchLength} caracteres para buscar
            </div>
          ) : isLoading ? (
            <div className="py-6 text-center text-sm text-zinc-400">Buscando...</div>
          ) : options.length === 0 ? (
            <div className="py-6 text-center text-sm text-zinc-400">{emptyMessage}</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "relative flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none select-none",
                  "hover:bg-white/5",
                  value === option.value && "bg-cyan-500/10"
                )}
                onClick={() => handleSelect(option)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 flex-shrink-0",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="truncate font-medium">{option.label}</span>
                  {option.description && (
                    <span className="truncate text-xs text-zinc-400">{option.description}</span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

Autocomplete.displayName = "Autocomplete";
