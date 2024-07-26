"use client";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/use-model-store";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";

const InviteServerModal = () => {
    const { isOpen, onClose, onOpen, type, data } = useModal();
    const isModalOpen = isOpen && type === "Invite";
    const origin = useOrigin();
    const server = data?.server;
    const [inviteUrl, setInviteUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (server) {
            setInviteUrl(`${origin}/invite/${server.inviteCode}`);
        }
    }, [server, origin]);

    const onCopy = () => {
        if (inviteUrl) {
            navigator.clipboard.writeText(inviteUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        }
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const res = await axios.patch(`/api/server/${server?.id}/invite-code`);
            onOpen("Invite", { server: { ...server, inviteCode: res.data.inviteCode } });
            setInviteUrl(`${origin}/invite/${res.data.inviteCode}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex flex-col items-center gap-4 justify-center">
                        <DialogTitle>Invite Others to Server</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="p-6">
                    <Label className="text-zinc-500 uppercase text-xs font-bold">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center gap-x-2 mt-2">
                        <Input
                            className="bg-zinc-200 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            disabled={isLoading}
                            value={inviteUrl}
                            readOnly
                        />
                        <Button onClick={onCopy} disabled={isLoading}>
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Button variant={"link"} className="mt-2" disabled={isLoading} onClick={onNew}>
                        Generate a New Link
                        <RefreshCcw className="w-4 ml-2 h-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InviteServerModal;
