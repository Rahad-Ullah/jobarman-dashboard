import AddFaqForm from "@/components/forms/faq/AddFaqForm";
import EditFaqForm from "@/components/forms/faq/EditFaqForm";
import DeleteModal from "@/components/modals/DeleteModal";
import Modal from "@/components/modals/Modal";
import PageTitle from "@/components/shared/PageTitle";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { nextFetch } from "@/utils/nextFetch";
import { ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const handleDelete = async (itemId: string) => {
  "use server";
  // Placeholder for delete action
  console.log(`Deleting FAQ with id: ${itemId}`);
};

export default async function FaqSection() {
  const res = await nextFetch("/faq", { tags: ["faqs"] });
  const faqs = res?.data;

  return (
    <div>
      <section className="flex justify-between items-center gap-8 px-6 py-2">
        <PageTitle>Frequently Asked Questions</PageTitle>
        <div>
          <Modal
            dialogTrigger={
              <Button className="bg-gradient-to-r from-primary-foreground to-primary rounded-full">
                <Plus /> Add FAQ
              </Button>
            }
            className="max-w-[30vw] p-6 bg-secondary-foreground"
          >
            <AddFaqForm />
          </Modal>
        </div>
      </section>
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
                    itemId={idx.toString()}
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
    </div>
  );
}
