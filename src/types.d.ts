
export interface idType {
    _id:string
}

export interface priorityType{
    name:string,
}

export interface userType {
    user:string,
    email:string,
    token:string,
}

export interface TaskType{
    taskName:string
    priority: string,
    project: string,
    completed:boolean
}

export interface ProjectType {
    name:string,
    date:Date,
    tasks:TaskTypeWithId[],
    manager:userType
}

export type ProjectTypeWithId = ProjectType & idType
export type TaskTypeWithId = Omit<TaskType,'priority'> & idType 
export type TaskTypePopulateProyect = TaskType & idType & {
    project: idType & ProjectType,
}

export type TaskTypeWithIdItem = TaskType & idType 

export type TaskTypeWithIdAndString = idType & Pick<TaskType,'taskName'> 
export type TaskTypeWithId = idType & TaskType 
export type TaskTypeWithIdS = TaskType & idType
export type priorityTypeWithId = priorityType & idType
export type TaskTypeAdd = Omit<TaskType,'completed'> 


export type TaskTypeTable = idType & Pick<TaskType,'taskName'|'completed'>

export type datesGraphicType =  { completed:number,incompleted:number } 

interface ShowMenuContextType {
    showMenu: boolean;
    toggleMenu: () => void;
}

type typeLink = { href: string, Icon: ForwardRefExoticComponent<any> , name:string}