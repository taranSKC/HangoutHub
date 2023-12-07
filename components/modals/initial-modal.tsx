"use client";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import FileUpload from "../providers/file-upload";

const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required" }),
  imageUrl: z.string().min(1, { message: "Server Image is Required" }),
});

function InitialModal() {

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
    
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };


  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-2">
          <DialogTitle className="text-center text-2xl font-bold pt-3">
            Create your server
          </DialogTitle>
          <DialogDescription className="text-center px-4">
            Give your server a name and and image to get started.You can change
            it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center">
          <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                Server Image
              </FormLabel>

              <FormControl>
<FileUpload
endPoint={'serverImage'}
value={field.value}
onChange={field.onChange}




/>


              </FormControl>



              </FormItem>)}
              />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="text-black bg-zinc-300 "
                        {...field}
                        placeholder="Enter a server name"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              ></FormField>
            </div>

            <DialogFooter className="p-3 bg-grey-100 ">
              <Button disabled={isLoading} variant={"primary"} >
                Create server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default InitialModal;
