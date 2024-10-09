import {  ProjectTypeWithId, TaskTypeAdd, TaskTypePopulateProyect, TaskTypeWithId, TaskTypeWithIdS } from "@/types"
import { API } from "./api"
import { AxiosError } from "axios"

interface addTaskType{
    task: TaskTypeAdd,
    id:ProjectTypeWithId['_id']
}
interface updateTaskType{
    task:TaskTypeWithIdS,
    id:TaskTypeWithId['_id']
}

export const addTask = async({id,task}:addTaskType) =>{
    try {
        const { data } = await API.post(`/task/${id}`,task)

        return data.message as string

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}
export const updateTask = async({id,task}:updateTaskType) =>{
    try {
        const { data } = await API.put(`/task/${id}`,task)

        return data.message as string

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}
export const getTaskById = async(id:TaskTypeWithId['_id']) =>{
    try {
        const { data } = await API(`/task/${id}`)

        return data.message as TaskTypeWithIdS

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}
export const deleteTask = async(id:TaskTypeWithId['_id']) =>{
    try {
        const { data } = await API.delete(`/task/${id}`)

        return data.message as string

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}
export const getTasks = async(token:string) =>{
    try {
        const { data } = await API(`/task`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return data.message as TaskTypeWithId[]

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}
export const getTasksWithPopulateProyect = async(token:string) =>{
    try {
        const { data } = await API(`/task/all`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return data.message as TaskTypePopulateProyect[]

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}