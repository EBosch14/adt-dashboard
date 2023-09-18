"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Crear deposito"
      description="Agregar un nuevo deposito para gestionar nuevos productos y categorias"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}></Modal>
  );
};
