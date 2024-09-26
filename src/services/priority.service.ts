import { AxiosError } from "axios"
import { API } from "./api"
import { priorityTypeWithId } from "@/types"

export const getPriorities = async() =>{
    try {
        const { data } = await API('/priority')

        return data.message as priorityTypeWithId[]

    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message)
        }
    }

}