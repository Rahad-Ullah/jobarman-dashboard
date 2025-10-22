import AddPlanForm from "@/components/forms/subscription/AddPlanForm";
import Modal from "@/components/modals/Modal";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SubscriptionPage = () => {
  return (
    <div>
      <section className="flex justify-between items-center gap-8">
        <PageTitle>Subscription Management</PageTitle>
        <div>
          <Modal
            dialogTrigger={
              <Button className="bg-gradient-to-r from-primary-foreground to-primary rounded-full">
                <Plus /> Add Plan
              </Button>
            }
            className="max-w-[30vw] p-6 bg-secondary-foreground"
          >
            <AddPlanForm />
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
