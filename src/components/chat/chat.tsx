import { Message, UserData } from "@/app/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import useChatSet from "@/zustand/chatSet";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const { reciever}: any = useChatSet();
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {reciever === null ? (
        <p className="text-2xl text-center  m-8" >
          Welcome to the Bloggers chat section ...
        </p>
      ) : (
        <>
          <ChatTopbar selectedUser={reciever} />

          <ChatList
            messages={messagesState}
            selectedUser={selectedUser}
            sendMessage={sendMessage}
            isMobile={isMobile}
          />
        </>
      )}
    </div>
  );
}
