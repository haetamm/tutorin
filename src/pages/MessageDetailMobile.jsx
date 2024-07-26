import React from 'react'
import MessageDetailComp from '../component/MessageDetailComp'
import { useParams } from 'react-router-dom'

const MessageDetailMobile = () => {
    const { id } = useParams()
    return (
        <>
            <MessageDetailComp id={id} />
        </>
    )
}

export default MessageDetailMobile