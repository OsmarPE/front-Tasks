import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
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
                <DropdownMenuItem onClick={() => nav(`${pathname}?addTask=${id}`)}>Agregar Tarea</DropdownMenuItem>
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={() => nav(`${pathname}?id=${id}`)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
