import {  useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priorityColors, taskInitialEdit } from "@/utils/helper";
import {  priorityTypeWithId, TaskTypeWithIdAndString, TaskTypeWithIdS } from "@/types";
import FormItem from "../form/FormItem";
import { toast } from "sonner";
import { Form } from "../form/Form";
import SelectForm from "../form/SelectForm";
import { SelectItem } from "../ui/select";
import FormCheckbox from "../form/FormCheckbox";
import { Button } from "../ui/button";
import { updateTask } from "@/services/task.service";


interface Props {
    task: TaskTypeWithIdAndString ,
    priorities: priorityTypeWithId[] | undefined,
    hiddenbuttonRemove?:boolean
}



export default function TaskEditSheetBody({ task, priorities, hiddenbuttonRemove = false }: Props) {


    const { pathname } = useLocation()
    const [search, setSearch] = useSearchParams()
    const client = useQueryClient()

    const nav = useNavigate()
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            client.invalidateQueries({queryKey:['projects']})
            client.removeQueries({queryKey:['editTask',task._id]})
            client.invalidateQueries({queryKey:['tasksGraphic']})
            toast.success(data)
            nav(pathname,{replace:true})
        },
        onError: (error) => {
            console.log(error);
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

    const removeTask = () =>{
        setSearch((prevSearch) => { 
            prevSearch.append('removeTaskModal','true')
            return prevSearch
        })
    }

    console.log(search);
    
    
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
            {!hiddenbuttonRemove && <Button onClick={ removeTask} type="button"  className="w-full" variant={'outline'}>Eliminar Tarea</Button>}
        </Form>
    )
}
