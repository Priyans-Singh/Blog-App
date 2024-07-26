import {create } from 'zustand';    

const useChatSet = create((set) => ({
    users:[],
    setUsers: (users:any) => set({ users }),
    reciever:null,
    setReciever: (reciever:any) => set({ reciever }),
    messages:[],
    setMessages: (messages:any) => set({ messages }),
}));

export default useChatSet;
