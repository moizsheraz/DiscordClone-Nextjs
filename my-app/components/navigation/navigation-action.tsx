"use client"
import { Plus } from "lucide-react";
import { ActionToolTip } from "../ui/action-tooltip";
import { useModal } from "@/hooks/use-model-store";
const NavigationAction = () => {



  const {onOpen} = useModal();

  return (
    <div className="">
   <ActionToolTip side="right" align="center" label="Add a Server ">

   <button onClick={()=>{
    onOpen("createServer")
   }} className="flex mx-3 h-[48px] w-[48px] rounded-full hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-gray-200 dark:bg-neutral-700 hover:bg-emerald-500">
        <Plus 
          className="w-6 h-6 text-white dark:text-white"
        />
      </button>
   </ActionToolTip>
    </div>
  );
};

export default NavigationAction;
