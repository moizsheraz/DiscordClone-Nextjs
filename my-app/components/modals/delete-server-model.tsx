"use client";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/use-model-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";

const DeleteServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, onOpen, type, data } = useModal();
    const isModalOpen = isOpen && type === "DeleteServer";
    const server = data?.server;
    const [isLoading, setIsLoading] = useState(false);
    const handleLeaveServer=async()=>{
        try{
            setIsLoading(true);
            await axios.delete(`/api/server/${server?.id}`);
            setIsLoading(false)
            router.refresh();
            router.push("/")
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex flex-col items-center gap-4 justify-center">
                        <DialogTitle className="">Are you Really want to Delete Server ? <span className="font-bold text-red-500">{server?.name}</span></DialogTitle>
                    </div>
                </DialogHeader>
                <div className="p-6">
                    <div className="flex items-center justify-between gap-x-2 mt-2">
                    <Button>Cancel</Button>
                    <Button onClick={handleLeaveServer} disabled={isLoading}>Confirm</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteServerModal;
