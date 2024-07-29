"use client"
import CreateServerModal from "../modals/create-server";
import { useState,useEffect } from "react";
import InviteServerModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server";
import ManageMembers from "../modals/members";
import CreateChannelModal from "../modals/create-channel-model";
import LeaveServerModal from "../modals/leave-server";
import DeleteServerModal from "../modals/delete-server-model";

export const ModalProvider=()=>{
    const [isMounted,setIsMounted]=useState(false);
    useEffect(() => {
   setIsMounted(true);
    }, [])
    if(!isMounted){
        return null;
    }
    
    return (
        <>
        <CreateServerModal/>
        <InviteServerModal/>
        <EditServerModal/>
        <ManageMembers/>
        <CreateChannelModal/>
        <LeaveServerModal/>
        <DeleteServerModal/>
        </>
    )
}