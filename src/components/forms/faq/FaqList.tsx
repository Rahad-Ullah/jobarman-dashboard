"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import EditFaqForm from "@/components/forms/faq/EditFaqForm";
import DeleteModal from "@/components/modals/DeleteModal";
import toast from "react-hot-toast";
import { nextFetch } from "@/utils/nextFetch";
import { revalidate } from "@/helpers/revalidateHelper";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

const handleDelete = async (itemId: string) => {
  toast.loading("Deleting...", { id: "delete-faq" });

  const res = await nextFetch(`/faq/${itemId}`, {
    method: "DELETE",
  });

  if (res?.success) {
    toast.success(res?.message as string, { id: "delete-faq" });
    revalidate("faqs");
    window.location.reload();
  } else {
    toast.error(res?.message || "Failed to delete FAQ", { id: "delete-faq" });
  }
};

const FaqList = ({ faqs }: { faqs: FAQ[] }) => {
  return (
    <section className="p-6">
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq: FAQ, idx: number) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border rounded-lg"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <AccordionTrigger className="text-base">
                {faq.question}
              </AccordionTrigger>
              <div className="flex gap-2 items-center">
                <AccordionTrigger className="px-4">
                  <ChevronDown className="text-gray-500 hover:text-primary" />
                </AccordionTrigger>

                <Modal
                  dialogTrigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-primary"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  }
                  className="max-w-[30vw] p-6 bg-secondary-foreground"
                >
                  <EditFaqForm initialFaq={faq} />
                </Modal>

                <DeleteModal
                  triggerBtn={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  }
                  itemId={faq._id}
                  action={handleDelete}
                  title="Are you sure to delete this item?"
                />
              </div>
            </div>
            <AccordionContent className="px-4 pb-4 text-sm text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqList;
