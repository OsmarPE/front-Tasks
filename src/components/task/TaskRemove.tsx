import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../Modal";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/task.service";
import { toast } from "sonner";

export default function TaskRemove() {

    const { pathname } = useLocation()
    const [search] = useSearchParams()
    const id = search.get('editTask') ?? ''
    const nav = useNavigate()
    const client = useQueryClient()

    const { mutate } = useMutation({
        mutationKey:[id],
        mutationFn:deleteTask,
        onSuccess:(data) => {
            client.invalidateQueries({queryKey:['projects']})
            client.invalidateQueries({queryKey:['tasksGraphic']})
            toast.success(data)
            nav(pathname,{replace:true})
        },
        onError:(error) => {
            console.log(error.message);
        }
    })

    const removeTaskById = () => {
        mutate(id)
    }

    return (
        <Modal open pathname={`${pathname}?editTask=${id}`} title="Borrar tarea" description="Estas apunto de borrar una tarea">
            <div className="flex items-center justify-end mt-4 gap-4">
                <Button asChild variant={'outline'}>
                    <Link to={`${pathname}?editTask=${id}`}>
                        Cancelar
                    </Link>
                </Button>
                <Button variant={'destructive'} onClick={removeTaskById}>
                    Eliminar
                </Button>
            </div>
        </Modal>
    )
}
