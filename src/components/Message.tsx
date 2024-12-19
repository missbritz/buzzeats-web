import { MessageDef } from "@/types"
import { useState } from "react"

export default function Message({ message, state }: MessageDef){
    const [isRemoved, setIsRemoved] = useState(false)

    setTimeout(() => {
        setIsRemoved(true)
    }, 7000)

    const getStatus = (state: string) => {
        switch(state) {
            case 'error':
                return 'text-state-error'
            case 'success':
                return 'text-state-success'
            default:
                return 'text-state-regular'
        }
    }
    
    return !isRemoved && <p className={`${getStatus(state)} my-4 font-bold`}>{ message }</p>
}