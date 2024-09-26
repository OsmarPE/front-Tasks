import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {  ReactNode } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { ChangeHandler, Control } from "react-hook-form"


interface Props {
    className?: string,
    placeholder: string,
    children: ReactNode,
    name: string,
    label: string,
    control: Control<any>
}

export default function SelectForm({ className = '', placeholder, children, name, label,control }: Props) {
    return (
        <div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                               {children}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

    )
}
