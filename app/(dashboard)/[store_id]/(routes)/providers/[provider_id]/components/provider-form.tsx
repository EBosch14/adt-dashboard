"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Provider } from "@prisma/client";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "El nombre debe contener al menos 1 caracter",
    })
    .max(25, {
      message: "El nombre no debe contener más de 25 caracteres",
    }),
  phone: z
    .string({ required_error: "El telefono es requerido" })
    .min(7, { message: "Por favor ingrese un teléfono valido" })
    .max(15, { message: "Limite de carácteres: 15" }),
  email: z.string().email({ message: "Por favor ingrese un email válido" }),
});

type ProviderFormInput = z.infer<typeof FormSchema>;

interface ProviderFormProps {
  initialData: Provider | null;
}

export const ProviderForm: React.FC<ProviderFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Editar proveedor" : "Crear proveedor";
  const description = initialData
    ? "Editar un proveedor"
    : "Crear un nuevo proveedor";
  const toastMessage = initialData
    ? "Proveedor actualizado correctamente."
    : "Proveedor creado correctamente.";
  const action = initialData ? "Guardar cambios" : "Crear";
  const toastError = initialData
    ? "Ups! Algo salio mal, no se pudo actualizar el proveedor."
    : "Ups! Algo salio mal, no se pudo crear el proveedor.";

  const form = useForm<ProviderFormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: ProviderFormInput) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.store_id}/providers/${params.provider_id}`,
          data
        );
      } else {
        await axios.post(`/api/${params.store_id}/providers`, data);
      }
      router.refresh();
      router.push(`/${params.store_id}/providers`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error(toastError);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.store_id}/providers/${params.provider_id}`
      );
      router.refresh();
      router.push(`/${params.store_id}/providers`);
      toast.success("Proveedor eliminado exitosamente");
    } catch (error) {
      toast.error(
        "Ups! Algo salio mal, no se pudo eliminar el proveedor seleccionado."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}>
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre del proveedor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Email del proveedor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Teléfono del proveedor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
