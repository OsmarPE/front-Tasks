import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"



export default function useToken() {

    const { getToken } = useAuth()
    const [token, settoken] = useState('')
    useEffect(() => {

        getToken({ template: 'auth' })
            .then(data => settoken(data ?? ''))

    }, [getToken])


    return {
        token
    }
}
