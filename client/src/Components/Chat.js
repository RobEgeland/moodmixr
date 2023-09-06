import React from 'react'
import { MessageList, Input } from "react-chat-elements"
import "react-chat-elements/dist/main.css"
import ChatSideBar from './ChatSideBar'

const Chat = () => {

  
    return (
			<div>
                <div className='h-[calc(100vh-105px)] grid grid-cols-4 grid-flow-col gap-4'>
                    <div className='col-span-1 row-span-2 bg-gray-400 h-full'>
                        <h1 className='mx-auto'>Multiple Conversations coming soon</h1>
                        {/* <ChatSideBar /> */}
                    </div>
                    <div className='col-span-3 col-start-2'>
                        <MessageList
                            className="message-list"
                            lockable={true}
                            toBottomHeight={"100%"}
                            dataSource={[
                                {
                                    position: "left",
                                    type: "text",
                                    title: "Kursat",
                                    text: "Give me a message list example !",
                                },
                                {
                                    position: "right",
                                    type: "text",
                                    title: "Emre",
                                    text: "That's all.",
                                },
                            ]}
                        />
                    </div>
                    <div className='self-end col-span-3 col-start-2 '>
				        <Input placeholder="Type here..." multiline={false} />
                    </div>
                </div>
			</div>
		);
}

export default Chat