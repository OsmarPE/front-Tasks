import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import ProgressMenu from "../ProgressMenu";
import Modal from "../Modal";
import Projects from "../proyects/Projects";
import ProjectFormAdd from "../proyects/ProjectFormAdd";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import TaskFormAdd from "../task/TaskFormAdd";
import TaskEditSheet from "../task/TaskEditSheet";

export default function Main() {

  const [search] = useSearchParams()
  const { pathname } = useLocation()
  const showFormAdd = Boolean(search.get('add')) ?? false
  const showModalTAddTask = Boolean(search.get('addTask')) ?? false
  const showModalEditTask = Boolean(search.get('editTask')) ?? false

  

  return (
    <div className=" max-w-screen-xl">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
        <div>
          <h2 className="font-bold text-2xl">Mis Proyectos</h2>
          <p className="text-gray-400">Aqui podras ver tus proyectos y tu progreso</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <ProgressMenu />
          <Button asChild >
            <Link to={`${pathname}?add=true`}  className="gap-1 w-full md:w-auto">
              <PlusIcon width={16} height={16} />
              Agregar
            </Link>
          </Button>
          <Modal open={showFormAdd} pathname={pathname} title="Agregar Proyecto" description="Ingrese la información relacionado con el proyecto">
            <ProjectFormAdd />
          </Modal>
          <Modal open={showModalTAddTask} pathname={pathname} title="Agregar Tarea Nueva" >
            <TaskFormAdd />
          </Modal>
        </div>
      </div>
      <p className="text-sm mt-3 " >Haz acompletado <span className="text-primary">2 proyectos de 4</span></p>
      <Projects />
      <TaskEditSheet open={showModalEditTask} />

    </div>
  )
}
