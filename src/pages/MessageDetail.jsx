import React from 'react'
import { useParams } from 'react-router-dom'
import MessageDetailComp from '../component/MessageDetailComp'

const MessageDetail = () => {
    const { id } = useParams()
    return (
    <>
        <div className="h-full flex">
            <MessageDetailComp id={id} />
        </div>
    </>
    )
}

export default MessageDetail