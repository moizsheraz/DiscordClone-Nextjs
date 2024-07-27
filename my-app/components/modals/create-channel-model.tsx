"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { useModal } from "@/hooks/use-model-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import qs from "query-string";
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
  Select,
  SelectItem,
  SelectValue,
  SelectContent, SelectTrigger
} from "@/components/ui/select"
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
    const params = useParams();
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
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId : params?.serverId
        }
      })

      await axios.post(url, values);
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
        <FormItem>
        <FormLabel>Channel Type</FormLabel>
        <Select
        disabled={isLoading}
        onValueChange={field.onChange}
        defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger className="bg-zin-300/50 border-0 focus:ring-0 text-white ring-offset-0 focus:ring-offset-0 capitalize outline-none">
          <SelectValue placeholder="Select a Channel Type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
  {Object.values(ChannelTypes).map((type) => (
    <SelectItem key={type} value={type} className="capitalize">
      {type.toLowerCase()}
    </SelectItem>
  ))}
</SelectContent>

        </Select>
        </FormItem>
        
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
