import {  useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priorityColors, taskInitialEdit } from "@/utils/helper";
import {  priorityTypeWithId, TaskTypeWithIdS } from "@/types";
import FormItem from "../form/FormItem";
import { toast } from "sonner";
import { Form } from "../form/Form";
import SelectForm from "../form/SelectForm";
import { SelectItem } from "../ui/select";
import FormCheckbox from "../form/FormCheckbox";
import { Button } from "../ui/button";
import { updateTask } from "@/services/task.service";


interface Props {
    task: TaskTypeWithIdS ,
    priorities: priorityTypeWithId[] | undefined,
    hiddenbuttonRemove?:boolean
}



export default function TableEditTaskBody({ task, priorities }: Props) {

    const { pathname } = useLocation()
    
    const nav = useNavigate()
    const client = useQueryClient()
   

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            client.invalidateQueries({queryKey:['tasks']})
            client.invalidateQueries({queryKey:['editTask']})
            toast.success(data)
            nav(pathname,{replace:true})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const form = useForm<TaskTypeWithIdS>({
        resolver: zodResolver(taskInitialEdit),
        defaultValues: {
            ...task
        },
    })
    async function onSubmit(data: TaskTypeWithIdS) {
        mutate({task:data,id:task._id})
        
    }


    
    return (
        <Form form={form} onSubmit={onSubmit} className="mt-4">
            <FormItem
                name={'taskName'}
                label="Tarea"
                control={form.control}
                placeholder="Ej. Creación de un Banco para la empresa DG"
            />
            <SelectForm control={form.control} label="Prioridad" name="priority" placeholder="Seleccione una prioridad" >
                {
                    priorities?.map(priority => <SelectItem key={priority._id} value={priority._id}> 
                    <div className="flex gap-2 items-center capitalize">
                        <div className={"size-2 rounded-full"} style={{backgroundColor:priorityColors[priority.name as unknown as keyof typeof priorityColors]}}></div>
                        {priority.name}
                    </div>
                    </SelectItem>)
                }

            </SelectForm>
            <FormCheckbox label="Tarea completada" control={form.control} name="completed" />
            <Button className="w-full py-5 mt-4">Editar Tarea</Button>
            </Form>
    )
}
