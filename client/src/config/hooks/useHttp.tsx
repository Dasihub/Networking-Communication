import React from "react";
import {useMessage} from "./useMessage";

const basesUrl = 'http://localhost:5000/api'

export const useHttp = () => {
    const message = useMessage()
    const [loader, setLoader] = React.useState<boolean>(false)

    const request = React.useCallback(async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body: any = null, headers: any = {}) => {
        try {
            setLoader(pre => pre = true)
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const res: Response = await fetch(basesUrl + url, {
                method,
                body,
                headers
            })
            const data = await res.json()
            setLoader(pre => pre = false)
            return data
        } catch (e) {
            message('Что-то пошло не так!', 'error')
            setLoader(pre => pre = false)
        }
    }, [])

    return {request, loader}
}