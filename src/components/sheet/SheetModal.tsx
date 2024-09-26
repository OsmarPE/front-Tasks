import { ReactNode } from 'react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle ,Sheet} from '../ui/sheet'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props{
    open:boolean,
    title:string,
    description:string,
    children:ReactNode
}

export default function SheetModal({open,description,title,children}:Props) {
    
    const { pathname } = useLocation()
    const nav = useNavigate()

    return (
        <Sheet open={open} onOpenChange={() => nav(pathname) } >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                </SheetHeader>
                <div>   
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}
