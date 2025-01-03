"use client";

import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
    Check,
    ChevronsUpDown,
    PlusCircle,
    Store,
    StoreIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { StoreSwitcherProps } from "@/types/navbars";
import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";

export function StoreSwitcher({ className, items }: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id.toString(),
    }));

    const currentStore = formattedItems.find(
        (item) => item.value === params.storeId
    );

    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: { value: string; label: string }) => {
        setOpen(false);
        const newPath = pathname.split('/').slice(2).join('/');
        router.push(`/${store.value}/${newPath}`);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-[240px] flex justify-between">
                <Button
                    variant="outline"
                    size={"sm"}
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Изберете магазин"
                    className={cn("w-[240px] justify-between", className)}
                >
                    <Store className="mr-2 w-4 h-4" />
                    <span>{currentStore?.label}</span>
                    <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Търсене на магазин..." />
                        <CommandEmpty>Няма намерен магазин</CommandEmpty>
                        {formattedItems.map((store) => (
                            <CommandItem
                                key={store.value}
                                onSelect={() => onStoreSelect(store)}
                                className="text-sm"
                            >
                                <StoreIcon className="mr-2 w-4 h-4" />
                                {store.label}
                                <Check className={cn("ml-auto w-4 h-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        ))}
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    storeModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 w-5 h-5" />
                                <span>Създаване на магазин</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}