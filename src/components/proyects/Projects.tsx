import { useQuery } from "@tanstack/react-query"
import ProjectItem from "./ProjectItem"
import ProjectList from "./ProjectList"
import { getProjects } from "@/services/project.service"
import { useLocation, useSearchParams } from "react-router-dom"
import Modal from "../Modal"
import ProjectRemove from "./ProjectRemove"
import Loading from "../Loading"

export default function Projects() {

  const { pathname } = useLocation()
  const [search] = useSearchParams()
  const idProject = Boolean(search.get('id')) ?? false

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
  

  if (isLoading) return <Loading className="mt-4"/>


  if (data) return (
    <>
      <ProjectList>
        {
          data.map(project => (
            <ProjectItem key={project._id} project={project}  />
          ))
        }
      </ProjectList>
      
      <Modal open={idProject} pathname={pathname} title="¿Deseas eliminar este proyecto?" description="Estas apunto de eliminar un proyecto el cual no podra ser recuperado una vex eliminado">
          <ProjectRemove pathname={pathname}/>
      </Modal>
    </>
  )
}
