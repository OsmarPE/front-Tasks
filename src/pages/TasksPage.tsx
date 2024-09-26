import Loading from "@/components/Loading";
import { columns, Payment } from "@/components/payments/columns";
import { TableListTasks } from "@/components/Table/TableListTasks";
import TaskActions from "@/components/task/TaskActions";
import { getPriorities } from "@/services/priority.service";
import { getTasksWithPopulateProyect } from "@/services/task.service";
import { TaskTypePopulateProyect, TaskTypeTable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useLocation } from "react-router-dom";


export default function TasksPage() {

  const { pathname } = useLocation()

  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasksWithPopulateProyect
  })


  const { data: priorities, isLoading: isLoadingP } = useQuery({
    queryKey: ['priorities'],
    queryFn: getPriorities
  })



  let tasks: TaskTypePopulateProyect[] = []

  if (priorities && data) {
      tasks = data?.map(task => ({ ...task, priority: priorities.find(pri => pri._id === task.priority)?.name ?? '' }))
  }

  return (
    <div>
      <h2 className="font-bold text-2xl">Tareas</h2>
      <p className="text-gray-400">Podras observar la lista de forma general de cada una de las tareas</p>
      <div className="max-w-screen-lg mt-6">
        {(isLoading && isLoadingP) ? <Loading/> : <TableListTasks columns={columns} data={tasks as Payment[]} />}
      </div>

      <TaskActions />
    </div>
  )
}
