"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { DialogHeader } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { CarData } from "@/data/cars";

interface ModalProps {
  car: CarData;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ car, children }) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog open defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
