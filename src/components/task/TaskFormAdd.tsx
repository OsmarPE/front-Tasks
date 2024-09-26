import {  taskInitial } from "@/utils/helper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../form/Form"
import FormItem from "../form/FormItem"
import { TaskTypeAdd } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { addTask } from "@/services/task.service"
import SelectForm from "../form/SelectForm"
import { SelectItem } from "../ui/select"
import { getPriorities } from "@/services/priority.service"
import { Button } from "../ui/button"

export default function TaskFormAdd() {

    const [search] = useSearchParams()
    const projectId = search.get('addTask') ?? ''
    const client = useQueryClient()
    const { pathname } = useLocation()
    const nav = useNavigate()
    const { mutate } = useMutation({
        mutationFn: addTask,
        onSuccess: (data) => {
            client.invalidateQueries({queryKey:['projects']})
            client.invalidateQueries({queryKey:['tasksGraphic']})
            toast.success(data)
            nav(pathname)
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const { data } = useQuery({
        queryKey: ['priorities'],
        queryFn: getPriorities
    })

    const form = useForm<TaskTypeAdd>({
        resolver: zodResolver(taskInitial),
        defaultValues: {
            taskName: '',
            priority: '',
        },
    })

    async function onSubmit(data: TaskTypeAdd) {
        // mutate(data)
        mutate({task:data,id:projectId});

    }


    return (
        <Form form={form} onSubmit={onSubmit} >
            <FormItem
                name={'taskName'}
                label="Nombre de la Tarea"
                control={form.control}
                placeholder="Ej. Configuración de la Base de datos"
            />
            <SelectForm label="Prioridad" placeholder="Seleccionar Prioridad" name={'priority'} control={form.control} >
                {
                    data?.map(({ _id, name }) => (
                        <SelectItem key={_id} value={_id} >
                            {name}
                        </SelectItem>))
                }

            </SelectForm>
            <Button className="block ml-auto mt-4" type="submit">Agregar Proyecto</Button>
        </Form>
    )
}
