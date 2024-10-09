import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/services/project.service"
import { useSearchParams } from "react-router-dom"
import ProjectEditBody from "./ProjectEditBody"

export default function ProjectEdit() {

    const [search] = useSearchParams()
    const id = search.get('editproject') ?? ''

    const { data } = useQuery({
        queryKey: ['projectEdit', id],
        queryFn: () => getProjectById(id),
    })


    if (data) return (
        <ProjectEditBody name={data?.name} id={id} />
    )
}
