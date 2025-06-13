"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BrandFormCreateDTO,
  brandFormCreateSchema,
  BrandFormUpdateDTO,
  brandFormUpdateSchema,
} from "@/types";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { revalidatePath } from "next/cache";

export default function BrandForm({}) {
  const [mode, setMode] = useState<"create" | "update">("create");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<BrandFormCreateDTO | BrandFormUpdateDTO>({
    resolver: zodResolver(
      mode === "create" ? brandFormCreateSchema : brandFormUpdateSchema
    ),
    mode: "onChange",
    defaultValues: {
      adi: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: BrandFormCreateDTO | BrandFormUpdateDTO) {
    try {
      let result;
      if (mode === "create") {
        const validatedData = brandFormCreateSchema.parse(data);
        const res = await axios.post("/api/brand", data);
        if (res.status === 201) {
          setIsDialogOpen(false);
          form.reset();
        }
        // result = await createBrand(data);
      } else {
        const validatedData = brandFormUpdateSchema.parse(data);
        // result = await editBrand(data);
      }
    } catch (error: unknown) {}
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Marka Yönetimi</h1>
        <p className="text-gray-600 mt-2">Araç markalarını yönetin</p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Contact Us</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="adi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
