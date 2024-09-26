import { z } from "zod";

export const projectInitial = z.object({
    name: z.string().min(5, {
        message: "El nombre debe tener al menos 5 caracteres.",
    }),
})
export const taskInitial = z.object({
    taskName: z.string().min(5, {
        message: "El nombre debe tener al menos 5 caracteres.",
    }),
    priority: z.string().min(5, {
        message: "La prioridad es obligatorio",
    }),
})

export const taskInitialEdit = taskInitial.merge( z.object({
    completed: z.boolean().refine(value => typeof value === 'boolean' ,{
        message:'El valor debe ser un booleano'
    } ),
    project: z.string().min(5,{
        message:'El proyecto debe ser de minimo 5 caracteres'
    })
}))

export enum priorityColors {
    mayor = '#34d399',
    intermedio = '#fbbf24',
    menor = '#f87171'
}