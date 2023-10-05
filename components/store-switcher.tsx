"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  PlusCircleIcon,
  StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[];
}

export default function StoreSwitcher({
  className,
  stores = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedStores = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formattedStores.find(
    (store) => store.value === params.store_id
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Elige un depósito"
          className={cn("w-[200px] justify-between", className)}>
          <StoreIcon className="mr-2 h-4 w-4" />
          <span className="mr-2">{currentStore?.label}</span>
          <ChevronsUpDownIcon className="ml-auto shrink-0 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 flex flex-col">
        <Command>
          <CommandList>
            <CommandInput placeholder="Buscar depósito..." />
            <CommandEmpty>Depósito no encontrado</CommandEmpty>
            <CommandGroup heading="Depósitos">
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer">
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <Separator />
        <Button
          variant="ghost"
          size="commandItem"
          className="m-1"
          onClick={() => {
            setOpen(false);
            storeModal.onOpen();
          }}>
          <PlusCircleIcon className="mr-1 h-5 w-5" />
          Crear Depósito
        </Button>
      </PopoverContent>
    </Popover>
  );
}
