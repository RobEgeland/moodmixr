import React, {useState} from 'react'
import { MessageList, Input } from "react-chat-elements"
import "react-chat-elements/dist/main.css"
import ChatSideBar from './ChatSideBar'

const Chat = ({currentUser}) => {
    const [input, setInput] = useState()
    const [conversation, setConversation] = useState([
        {
            position: "left",
            type: "text",
            title: "ChatGpt",
            text: "Give me a message list example !",
        },
    ])

    function handleUserInput(event) {
        if(event.key === "Enter") {
            const convoObject = {
                position: "right",
                type: "text",
                title: currentUser.username,
                text: input,
            }
            setConversation([...conversation, convoObject])
            setInput("")
        }
    }

  
    return (
			<div>
                <div className='h-[calc(100vh-105px)] grid grid-cols-4 grid-flow-col gap-4'>
                    <div className='col-span-1 row-span-2 bg-gray-400 h-full border-2 border-current border-solid rounded-none'>
                        <h1 className='mx-auto'>Multiple Conversations coming soon</h1>
                        {/* <ChatSideBar /> */}
                    </div>
                    <div className='col-span-3 col-start-2 '>
                        <MessageList
                            className="message-list"
                            lockable={true}
                            toBottomHeight={"100%"}
                            dataSource={conversation}
                        />
                    </div>
                    <div className='self-end col-span-3 col-start-2 mx-2 '>
				        <Input onKeyDown={(e) => handleUserInput(e)} onChange={(e) => setInput(e.target.value)} value={input} placeholder="Type here..." multiline={false} />
                    </div>
                </div>
			</div>
		);
}

export default Chat