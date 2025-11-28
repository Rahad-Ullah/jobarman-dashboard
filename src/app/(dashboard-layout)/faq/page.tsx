import AddFaqForm from "@/components/forms/faq/AddFaqForm";
import FaqList from "@/components/forms/faq/FaqList";
import Modal from "@/components/modals/Modal";
import PageTitle from "@/components/shared/PageTitle";

import { Button } from "@/components/ui/button";
import { nextFetch } from "@/utils/nextFetch";
import { Plus } from "lucide-react";

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
      <FaqList faqs={faqs} />
    </div>
  );
}
