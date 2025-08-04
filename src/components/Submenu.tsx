import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Pencil, Plus, Trash } from "lucide-react"
import { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface Props{
    children:ReactNode,
    id:string
    
}

export default function Submenu({children,id}:Props) {
    
    const nav = useNavigate()
    const { pathname } = useLocation()

    return (
        <DropdownMenu>
            {children}
            <DropdownMenuContent >
                <DropdownMenuItem onClick={() => nav(`${pathname}?addTask=${id}`)} className="gap-2">
                    <Plus className="size-4"/> Agregar Tarea
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => nav(`${pathname}?editproject=${id}`)} className="gap-2">
                    <Pencil className="size-4" /> Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => nav(`${pathname}?id=${id}`)} className="gap-2">
                    <Trash className="size-4" />
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
