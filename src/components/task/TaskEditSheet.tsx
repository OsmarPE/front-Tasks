import { useQuery } from "@tanstack/react-query";
import SheetModal from "../sheet/SheetModal";
import { getTaskById } from "@/services/task.service";
import { useSearchParams } from "react-router-dom";
import {  Loader2Icon } from "lucide-react";
import TaskEditSheetBody from "./TaskEditSheetBody";
import { getPriorities } from "@/services/priority.service";
import TaskRemove from "./TaskRemove";

interface Props {
    open: boolean
}


export default function TaskEditSheet({open}:Props) {

    const [search] = useSearchParams()
    const id = search.get('editTask') ?? ''
    const showModalRemoveTask = Boolean(search.get('removeTaskModal')) ?? false
    
    const { data, isLoading } = useQuery({
        queryKey:['editTask',id],
        queryFn: () => getTaskById(id)
    })
    const { data:prorities } = useQuery({
        queryKey:['priorities'],
        queryFn: getPriorities,
    })


    return (
        <SheetModal title="Editar Tarea" description="Puedes modificar o eliminar la informacion de la tarea" open={open}>
            {
                isLoading ? <Loader2Icon className="animate-spin " /> : data ? <TaskEditSheetBody task={data} priorities={prorities} /> : null 
            }

          {showModalRemoveTask &&  <TaskRemove/>}
        </SheetModal>
    )
}
