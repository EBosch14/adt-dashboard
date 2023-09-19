"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre debe contener al menos 1 caracter.",
  }),
});

type FormInput = z.infer<typeof FormSchema>;

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: FormInput) => {
    console.log(values);
    //TODO create store
  };

  return (
    <Modal
      title="Crear deposito"
      description="Agregar un nuevo deposito para gestionar nuevos productos y categorias"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      <div>
        <div className="space-y-4 py-2 pb-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre:</FormLabel>
                    <FormControl>
                      <Input placeholder="Deposito para Gamers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  // type="reset"
                  variant="outline"
                  onClick={storeModal.onClose}>
                  Cancelar
                </Button>
                <Button type="submit">Continuar</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
