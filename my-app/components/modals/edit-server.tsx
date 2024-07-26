"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
import FileUpload from "../ui/file-upload";
import { use } from "react";
import { on } from "events";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL",
  }),
});


const EditServerModal = () => {
    const {isOpen,onClose,type,data} =useModal();
    const isModalOpen = isOpen && type === 'editServer';
    const server = data?.server;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  useEffect(() => {
    
    if(server){
      form.setValue("name",server.name)
      form.setValue("imageUrl",server.imageUrl)
    }
  }, [server,form])
  
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Here we will create a server logic
    try {
      await axios.patch(`/api/server/${server?.id}`, values);
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
            <DialogTitle>Custommize Your Server</DialogTitle>
            <DialogDescription>
              Give a Name and Image to your server for better customization
            </DialogDescription>
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit button */}
              <Button type="submit" disabled={isLoading} variant="primary">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;
