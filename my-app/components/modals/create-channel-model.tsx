"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { useModal } from "@/hooks/use-model-store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ChannelTypes } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }).refine(
    name =>name != "general",{
      message: "Name must not be 'general'",
    }
  ),
  type:z.nativeEnum(ChannelTypes)
});


const CreateChannelModal = () => {
    const {isOpen,onClose,type} =useModal();
    const isModalOpen = isOpen && type === "createChannel";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type:ChannelTypes.Text,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Here we will create a server logic
    try {
      await axios.post("/api/server", values);
      form.reset();
      router.refresh();
      onClose();
    } catch {}
  };


  const handleClose=()=>{
    form.reset();
    onClose();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col  items-center gap-4 justify-center ">
            <DialogTitle>Create Channel</DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          {/* Form submission handler */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name field */}

            {/* Image URL field */}
            <div className="flex  flex-col gap-10">
           
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
        <FormField 
        name="type"
       render={({field})=>(
        
       )}

        
        />

              {/* Submit button */}
              <Button type="submit" disabled={isLoading} variant="primary">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
