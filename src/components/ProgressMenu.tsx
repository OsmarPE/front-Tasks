import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { CircleDashedIcon } from "lucide-react"
import PieGraphic from "./PieGraphic"
import { useQuery } from "@tanstack/react-query"
import { getTasks } from "@/services/task.service"
import { calculatePorcent, getCompletedTasks } from "@/lib/utils"
import { datesGraphicType } from "@/types"
import useToken from "@/hooks/useToken"

export default function ProgressMenu() {
    
    const { token } = useToken()

    const { data } = useQuery({
        queryKey:['tasksGraphic'],
        queryFn:() => getTasks(token)
    })
    
    const total:number = data?.length ?? 0
    const datos = data ?? []
    const datosFilter: datesGraphicType  = getCompletedTasks(datos)
    
    const porcent = calculatePorcent(datosFilter.completed,total)


    return (
        <Sheet>
               <Button asChild className="gap-2 w-full md:w-auto" variant={'outline'}> 
                     <SheetTrigger><CircleDashedIcon width={16} height={16}/> Progreso</SheetTrigger>
               </Button>
            <SheetContent>
                
                <div>
                   { datos.length > 0 && <PieGraphic data={datosFilter}  totalPorcent={porcent}/>}
                </div>
            </SheetContent>
        </Sheet>

    )
}
