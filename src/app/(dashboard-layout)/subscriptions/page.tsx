import AddPlanForm from "@/components/forms/subscription/AddPlanForm";
import Modal from "@/components/modals/Modal";
import PlanCard from "@/components/page/subscriptions/PlanCard";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { nextFetch } from "@/utils/nextFetch";
import { Plus } from "lucide-react";

const SubscriptionPage = async () => {
  const res = await nextFetch("/package", { tags: ["subscription-packages"] });

  const recruiterPlans = res?.data?.filter((item) => item.for === "employee");

  const jobSeekerPlans = res?.data?.filter((item) => item.for === "recruiter");

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
            className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-6 bg-secondary-foreground"
          >
            <AddPlanForm />
          </Modal>
        </div>
      </section>
      <section className="max-w-screen-xl">
        {/* Job Seeker Plans */}
        {jobSeekerPlans.length > 0 && (
          <div>
            {/* Section Title */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">Job Seeker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobSeekerPlans.map((item, idx) => (
                <PlanCard key={idx} plan={item} idx={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Recruiter Plans */}
        {recruiterPlans.length > 0 && (
          <div>
            {/* Section Title */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">Recruiter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recruiterPlans.map((item, idx) => (
                <PlanCard key={idx} plan={item} idx={idx} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SubscriptionPage;
