'use client'
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function SetupPage() {
    const { onOpen, isOpen } = useStoreModal(); // Destructure onOpen and isOpen correctly

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return null;
}
