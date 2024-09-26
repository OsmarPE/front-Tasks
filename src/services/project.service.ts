import { ProjectType, ProjectTypeWithId } from "@/types"
import { API } from "./api"
import { AxiosError } from "axios"


export const getProjects = async() =>{
    try {
        const { data } = await API('/project')

        return data.message as ProjectTypeWithId[]

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}

export const addProject = async(name:ProjectType['name']) =>{
    try {
        const { data } = await API.post('/project',{name})

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