import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"


interface Props {
    title: string
    description?: string,
    children: ReactNode,
    open: boolean,
    pathname: string
}

export default function Modal({ title, description, children, open, pathname }: Props) {

    const nav = useNavigate()

    return (
        <Dialog open={open} onOpenChange={() => nav(pathname, { replace: true })} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}
