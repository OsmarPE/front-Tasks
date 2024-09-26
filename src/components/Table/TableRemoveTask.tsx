import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../Modal'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '@/services/task.service'
import { toast } from 'sonner'


export default function TableRemoveTask() {
    
   const { pathname } =  useLocation()
   const [search] = useSearchParams()
   const id = search.get('removeTask') ?? ''
   const showRemoveTask = Boolean(id) ?? false
   const nav = useNavigate()
   const client = useQueryClient()

   const { mutate } = useMutation({
        mutationFn:deleteTask,
        onSuccess:(data) => {
            client.invalidateQueries({queryKey:['tasks']})
            toast.success(data)
            nav(pathname)
        },
        onError:(error) => {
            console.log(error);
            
        }
    })

   const removeTask = () => {
        mutate(id)
   } 

  return (
    <Modal open={showRemoveTask} pathname={pathname} title='¿Desea eliminar esta tarea?' description='Estas a punto de eliminar esta tarea'>
         <div className="flex justify-end gap-3">
            <Button asChild variant={'outline'}>
                <Link to={pathname}>
                    Cancelar
                </Link>
            </Button>
            <Button variant={'destructive'} onClick={removeTask}>
                Eliminar
            </Button>
        </div>
    </Modal>
  )
}
