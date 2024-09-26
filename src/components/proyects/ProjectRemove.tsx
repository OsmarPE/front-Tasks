
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { removeProjectById } from '@/services/project.service'

interface Props{
    pathname:string
}

export default function ProjectRemove({pathname}:Props) {
    
    const [search] = useSearchParams() 
    const client = useQueryClient()
    const  nav = useNavigate()
    const { mutate } = useMutation({
        mutationFn:removeProjectById,
        onSuccess:(data) =>{
            client.invalidateQueries({queryKey:['projects']})
            toast.success(data)
            nav(pathname,{replace:true})
        },
        onError:(error) => {
            console.log(error);
        }
    })

    const removeProject = () => {
        const id = search.get('id')
        id && mutate(id)
    }

    return (
        <div className="flex justify-end gap-3">
            <Button asChild variant={'outline'}>
                <Link to={pathname}>
                    Cancelar
                </Link>
            </Button>
            <Button variant={'destructive'} onClick={removeProject}>
                Eliminar
            </Button>
        </div>
    )
}
