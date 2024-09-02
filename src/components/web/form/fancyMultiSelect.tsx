import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { SelectType } from "@/components/abis/types/generalTypes"
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FieldValues, Path, useForm } from "react-hook-form"

type FancyMultiSelectProps<T extends FieldValues> = {
  items: SelectType[]
  placeholder?: string
  form: ReturnType<typeof useForm<T>>
  name: Path<T>
  label: string
  description?: string
}

export function FancyMultiSelect<T extends FieldValues>({
  items,
  placeholder,
  form,
  name,
  label,
  description,
}: FancyMultiSelectProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<SelectType[]>([])
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = React.useCallback((item: SelectType) => {
    setSelected((prev) => {
      let newData = prev.filter((s) => s.value !== item.value)
      /* @ts-ignore */
      form.setValue(name, newData)
      return newData
    })
  }, [])

  const handleSelect = React.useCallback((item: SelectType) => {
    setInputValue("")
    setSelected((prev) => {
      let newData = [...prev, item]
      /* @ts-ignore */
      form.setValue(name, newData)
      return newData
    })
  }, [])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behaviour of the <input /> field
        else if (e.key === "Escape") {
          input.blur()
        } else setInputValue("")
      }
    },
    []
  )

  const selectables = items.filter((item) => !selected.includes(item))

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        if (field.value?.length > 0) setSelected(field.value)

        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Command
              onKeyDown={handleKeyDown}
              className="overflow-visible bg-transparent"
            >
              <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-1">
                  {selected.map((item) => (
                    <Badge key={item.value} variant="secondary">
                      {item.label}
                      <button
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUnselect(item)
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={() => handleUnselect(item)}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  ))}
                  {/* Avoid having the "Search" Icon */}
                  <CommandPrimitive.Input
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    placeholder={selected.length === 0 ? placeholder : ""}
                    className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="relative ">
                <CommandList>
                  {open && selectables.length > 0 && (
                    <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                      <CommandGroup className="h-full overflow-auto">
                        {selectables.map((item) => (
                          <CommandItem
                            value={item.label}
                            key={item.value}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                            onSelect={() => handleSelect(item)}
                            className={"cursor-pointer"}
                          >
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </div>
                  )}
                </CommandList>
              </div>
            </Command>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
