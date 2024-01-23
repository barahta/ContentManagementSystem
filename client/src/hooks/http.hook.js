import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url,method = 'GET',body = null, headers = {}) => {
        try {
            if(body) body = JSON.stringify(body)
            setLoading(true)

            const responce = await fetch(url, { method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *client
                body: body
            })

            const data = await responce.json()

            if(!data){
                setError(data.message)
            }
            //console.log(data)

            setLoading(false)
            return data

        }catch (e){
            setLoading(false)
            setError(e.message)
            console.log(e.message)
        }
    }, [])

    const clearError = useCallback(() => setError(null),[])

    return {loading,request,error,clearError}
}