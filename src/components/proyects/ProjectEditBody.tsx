import { toast } from "sonner"
import { useLocation, useNavigate } from "react-router-dom"
import { projectInitial } from "@/utils/helper"
import { ProjectType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editProject } from "@/services/project.service"
import FormItem from "../form/FormItem"
import { Form } from "../form/Form"
import { Button } from "../ui/button"

interface Props{
    id:string,
    name:string
}

export default function ProjectEditBody({id,name}:Props) {
        
    const client = useQueryClient()
    
    const { pathname } = useLocation()
    const  nav = useNavigate()
    const { mutate } = useMutation({
        mutationFn:editProject,
        onSuccess:(data) =>{
            client.invalidateQueries({queryKey:['projects']})
            client.invalidateQueries({queryKey:['projectEdit']})
            toast.success(data)
            nav(pathname,{replace:true})
        },
        onError:(error) => {
            toast.error(error.message)
        }
    })

    const form = useForm<Pick<ProjectType,'name'>>({
        resolver: zodResolver(projectInitial),
        defaultValues: {
            name
        },
    })
    async function onSubmit(data:Pick<ProjectType,'name'>) {
        mutate({name:data.name,id})
    }


  return (
    <Form form={form} onSubmit={onSubmit} >
        <FormItem
            name={'name'}
            label="Proyecto"
            control={form.control}
            placeholder="Ej. Creación de un Banco para la empresa DG"
        />
        <Button className="block ml-auto mt-4" type="submit">Editar Proyecto</Button>
    </Form>
  )
}
