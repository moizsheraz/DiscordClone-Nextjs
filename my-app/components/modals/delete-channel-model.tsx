"use client";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/use-model-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import qs from "query-string";

const DeleteChannelModal = () => {
    const router = useRouter();
    const { isOpen, onClose, onOpen, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteChannel";
    const server = data?.server;
    const channel = data?.channel;
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteChannel = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                },
            });
            await axios.delete(url);
            router.refresh();
            router.push(`/`);
        } catch (error) {
            console.error("Error deleting channel:", error);
        } finally {
            setIsLoading(false);
            onClose(); 
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex  items-center gap-4 justify-center">
                        <DialogTitle className="">Are you Really want to Delete  #{data?.channel?.name} ?</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="p-6">
                    <div className="flex items-center justify-between gap-x-2 mt-2">
                    <Button>Cancel</Button>
                    <Button onClick={handleDeleteChannel} disabled={isLoading}>Confirm</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteChannelModal;
