import { projectInitial } from "@/utils/helper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../form/Form"
import FormItem from "../form/FormItem"
import { ProjectType } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addProject } from "@/services/project.service"
import { toast } from "sonner"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import useToken from "@/hooks/useToken"

export default function ProjectFormAdd() {

    const client = useQueryClient()

    const { token } = useToken()
    
    const { pathname } = useLocation()
    const  nav = useNavigate()
    const { mutate } = useMutation({
        mutationFn:addProject,
        onSuccess:(data) =>{
            client.invalidateQueries({queryKey:['projects']})
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
            name:''
        },
    })
    async function onSubmit(data:Pick<ProjectType,'name'>) {
        mutate({name:data.name,token})
    }


  return (
    <Form form={form} onSubmit={onSubmit} >
        <FormItem
            name={'name'}
            label="Proyecto"
            control={form.control}
            placeholder="Ej. Creación de un Banco para la empresa DG"
        />
        <Button className="block ml-auto mt-4" type="submit">Agregar Proyecto</Button>
    </Form>
  )
}
