import { Control, FieldValues, Path, PathValue, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InputTags } from "@/components/ui/tag-input"
import { cn } from "@/lib/utils"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

const Optional = () => (
  <span className="text-gray-500/80 text-xs ml-1">(Optional)</span>
)

type InputFormProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  placeholder?: string
  form: ReturnType<typeof useForm<T>>
  isOptional?: boolean
  type?: string
  accept?: string
}

export function InputForm<T extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  type,
  isOptional,
  ...props
}: InputFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isOptional && <Optional />}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder ?? ""}
              type={type ?? "text"}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function InputTagsForm<T extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  isOptional,
}: InputFormProps<T>) {
  const [value, setValue] = useState<string[]>([])
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isOptional && <Optional />}
          </FormLabel>
          <FormControl>
            <InputTags
              placeholder={placeholder ?? ""}
              /* @ts-ignore */
              onChange={(val: PathValue<T, Path<T>>) => {
                setValue(val)
                form.setValue(name, val)
              }}
              {...field}
              value={field.value ?? value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type SelectFormProps<T extends FieldValues> = {
  control: Control<T> | undefined
  elements: { id: string; value: string }[]
  isSelectDisabled?: boolean
  name: Path<T>
  label: string
  placeholder?: string
  isOptional?: boolean
}

export function SelectForm<T extends FieldValues>({
  control,
  elements,
  isSelectDisabled,
  name,
  placeholder,
  label,
  isOptional,
}: SelectFormProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">
            {label} {isOptional && <Optional />}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isSelectDisabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {elements?.map(({ id, value }, idx) => (
                <SelectItem value={`${id}`} key={idx}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type ComboboxFormProps<T extends FieldValues> = {
  items: { label: string; value: string }[]
  isSelectDisabled?: boolean
  name: Path<T>
  label: string
  placeholder?: string
  description?: string
  form: ReturnType<typeof useForm<T>>
  emptyLabel: string
  isOptional?: boolean
}

export function ComboboxForm<T extends FieldValues>({
  name,
  label,
  items,
  placeholder,
  description,
  form,
  emptyLabel,
  isOptional,
}: ComboboxFormProps<T>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            {label} {isOptional && <Optional />}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : placeholder}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder={placeholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyLabel}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          /* @ts-ignore */
                          form.setValue(name, item.value)
                          setOpen(false)
                        }}
                      >
                        {item.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function TextareaForm<T extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  isOptional,
}: InputFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isOptional && <Optional />}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder ?? ""} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
