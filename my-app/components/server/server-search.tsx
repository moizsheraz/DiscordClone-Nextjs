"use client"
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member";
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[];
    }[];
}

const ServerSearch: React.FC<ServerSearchProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const handleOpen = () => {
        setOpen(true);
    }

    const onClick=({id,type}:{id:string,type: "channel" | "members"})=>{
        setOpen(false);
        if()
    }

    return (
        <>
            <button onClick={handleOpen} className='group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition '>
                <Search className='w-4 h-4 text-zinc-500 dark:text-zinc-400' />
                <p className='font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 group-hover:text-zinc-300 transition'>Search</p>
                <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto '>
                    <span className='text-xs'>CMD</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={() => setOpen(false)}>
                <CommandInput placeholder='Search all channels and members' />
                <CommandList>
                    <CommandEmpty>
                        No Results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;
                        return (
                            <CommandGroup key={label} heading={label}>
                                {data.map(({ icon, name, id }) => {
                                    return (
                                        <CommandItem key={id}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        );
                    })}
                </CommandList>
            </CommandDialog>
        </>
    );
}

export default ServerSearch;
