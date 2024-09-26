import { Form as FormD } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"


interface Props{
    form:UseFormReturn<any>,
    onSubmit:(values: z.infer<any>) => void,
    children:ReactNode,
    className?:string
}



export function Form({form,onSubmit,children,className = ''}:Props) {


    return (
        <FormD {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-4",className)}>
                {children}
            </form>
        </FormD>
    )
}
