import { useQuery } from "@tanstack/react-query";
import SheetModal from "../sheet/SheetModal";
import { getTaskById } from "@/services/task.service";
import { useSearchParams } from "react-router-dom";
import {  Loader2Icon } from "lucide-react";
import { getPriorities } from "@/services/priority.service";
import TableEditTaskBody from "./TableEditTaskBody";


export default function TaskEditTask() {

    const [search] = useSearchParams()
    const id = search.get('editTask') ?? ''


    const { data, isLoading } = useQuery({
        queryKey:['editTask',id],
        queryFn: () => getTaskById(id)
    })
    const { data:prorities } = useQuery({
        queryKey:['priorities'],
        queryFn: getPriorities,
    })


    return (
        <SheetModal title="Editar Tarea" description="Puedes modificar o eliminar la informacion de la tarea" open={Boolean(id)}>
            {
                isLoading ? <Loader2Icon className="animate-spin " /> : data ? <TableEditTaskBody hiddenbuttonRemove task={data} priorities={prorities} /> : null 
            }
        </SheetModal>
    )
}
