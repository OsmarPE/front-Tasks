import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Submenu from "../Submenu";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import { ProjectTypeWithId } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { calculateTaskCompleted, cn, formatDate } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    project: ProjectTypeWithId
}

export default function ProjectItem({ project }: Props) {

    const { name, tasks, date, _id, } = project

    const { pathname } = useLocation()

    const taskSize = tasks.length
    const taskCompleted = calculateTaskCompleted(tasks)
    const porcent = taskSize > 0 ? (taskCompleted * 100) / taskSize : 0

    const dateTask = new Date(date)
    const isToday = dateTask.toLocaleDateString() === new Date().toLocaleDateString()    
    
    return (
        <Card >
            <CardHeader className="flex-row justify-between items-start" >
                <div>
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <CardDescription>{ isToday ? 'Hoy' :  formatDate(dateTask)}</CardDescription>
                </div>
                <Submenu id={_id}>
                    <DropdownMenuTrigger >
                        <EllipsisVerticalIcon width={14} height={14} />
                    </DropdownMenuTrigger>
                </Submenu>
            </CardHeader>
            <CardContent>
                <ul className=" grid gap-0.5 text-sm">
                    {
                        taskSize > 0 ? (

                            tasks.map(task => (
                                <li key={task._id} className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <div className={cn("size-1.5 rounded-full", { 'bg-green-400': task.completed, 'bg-red-500': !task.completed })}></div>
                                        <Button asChild className="p-0 h-auto text-foreground font-normal flex-1" variant='link'>
                                            <Link to={`${pathname}?editTask=${task._id}`} className="whitespace-break-spaces">
                                                {task.taskName}
                                            </Link>
                                        </Button>
                                    </span>
                                    <div>
                                        <Checkbox disabled className="disabled:opacity-100" checked={task.completed} />
                                    </div>

                                </li>
                            ))


                        ) : (
                            <div>
                                <p className="text-sm text-gray-400">No hay tareas, <Button asChild className="inline-block p-0 h-auto" variant={'link'}>
                                    <Link to={`${pathname}?addTask=${_id}`}>¿Quiere agregar uno nuevo?</Link>
                                </Button></p>

                            </div>
                        )
                    }

                </ul>
            </CardContent>
                {taskSize > 0 && (
                    <CardFooter className="flex-col">
                        <Progress value={porcent} className="h-1 mt-8" />
                        <div className="flex w-full items-center justify-between text-sm text-gray-400 mt-2">
                            <p>Progreso</p>
                            <span>{porcent}%</span>
                        </div>

                    </CardFooter>
                )
                }
        </Card>

    )
}
