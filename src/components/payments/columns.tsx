
import { TaskTypePopulateProyect } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { cn, getNameProject } from "@/lib/utils"
import { Link } from "react-router-dom"
import { priorityColors } from "@/utils/helper"

export type Payment = TaskTypePopulateProyect

export const columns: ColumnDef<Payment>[] = [
  {
      accessorKey: "taskName",
      header: "Tarea",
      cell: ({ row }) => (
          <div className="capitalize">{row.getValue("taskName")}</div>
      ),
  },
  {
      accessorKey: "completed",
      header: "Completado",
      cell: ({ row }) => (
          <Badge variant="outline" className={cn("border-0 rounded-3xl py-1.5",{
                'text-green-500 bg-green-100':row.getValue('completed'),
                'text-blue-500 bg-blue-100':!row.getValue('completed')
          })}>{row.getValue('completed') ? 'Completado' : 'En proceso'}</Badge>

      ),
      enableSorting: false,
      enableHiding: false,
  },
  {
      accessorKey: "project",
      header: 'Proyecto',
      cell: ({ row }) => {
        return (
            <div className="lowercase">{getNameProject(row.getValue("project"))}</div>
        )
    },
  },
  {
      accessorKey: "priority",
      header: () => <div className="text-left">Proridad</div>,
      cell: ({ row }) => {
        
          const value = row.getValue('priority') as string

          return <div className={"text-left font-medium flex items-center gap-2 capitalize"}> <div className={cn("size-1.5 rounded-full")} style={{backgroundColor:priorityColors[value as keyof typeof priorityColors]}}></div> { value }</div>
        },
    },
    {
      accessorKey: "_id",
      header:'Acciones',
      id: "_id",
      enableHiding: false,
      cell: ({ row }) => {
    
          return (
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`${window.location.pathname}?editTask=${row.getValue('_id')}`}>Editar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to={`${window.location.pathname}?removeTask=${row.getValue('_id')}`}>Eliminar</Link>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          )
      },
  },
]