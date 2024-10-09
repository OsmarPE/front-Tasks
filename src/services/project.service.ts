import { ProjectType, ProjectTypeWithId } from "@/types"
import { API } from "./api"
import { AxiosError } from "axios"


export const getProjects = async(token:string) =>{
    try {
        const { data } = await API('/project',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return data.message as ProjectTypeWithId[]

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}
export const getProjectById = async(id:ProjectTypeWithId['_id']) =>{
    
    try {
        const { data } = await API(`/project/${id}`)

        return data.message as ProjectTypeWithId

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}

export const addProject = async({name,token}:{name:ProjectType['name'],token:string} ) =>{
    try {
        const { data } = await API.post('/project',{name},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return data.message as string

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}
export const editProject = async({name,id}:{name:ProjectType['name'],id:ProjectTypeWithId['_id']} ) =>{
    try {
        const { data } = await API.put(`/project/${id}`,{name})

        return data.message as string

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}

export const removeProjectById = async(id:ProjectTypeWithId['_id']) =>{
    try {
        const { data } = await API.delete(`/project/${id}`)

        return data.message as string

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}