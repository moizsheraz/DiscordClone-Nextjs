"use client"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

  interface ActionTooltipProps {
    label: string,
    children: React.ReactNode,
    side?: "small" | "medium" | "large",
    align?: "left" | "right",

  }

  export const ActionToolTip=({
    label,
    children,
    side,
    align

  }:ActionTooltipProps)=>{
    return (
      <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
{children}

            </TooltipTrigger>
<TooltipContent side={side} align ={align}>
<p className="font-semibold text-sm  capitalize ">{label.toLowerCase()}</p>
</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }