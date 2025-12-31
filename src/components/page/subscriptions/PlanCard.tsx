"use client";

import EditPlanForm from "@/components/forms/subscription/EditPlanForm";
import DeleteModal from "@/components/modals/DeleteModal";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { subscriptionPlanTypes } from "@/constants/subscription";
import { revalidate } from "@/helpers/revalidateHelper";
import { nextFetch } from "@/utils/nextFetch";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export interface ISubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  priceId: string;
  product: string;
  payment_link: string;
  for: "employee" | "recruiter" | string;
  features: string[];
  paymentId: string;
  referenceId: string;
  recurring: "month" | "year" | string;
  status: "active" | "inactive" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type Props = {
  plan: ISubscriptionPlan;
  idx?: number;
};

const getIcon = (planName: string) => {
  return (
    subscriptionPlanTypes.find(
      (item) => item.name.toLowerCase() === planName.toLowerCase()
    )?.icon || subscriptionPlanTypes[0].icon // fallback icon
  );
};

export default function PlanCard({ plan }: Props) {
  // handle delete
  const handleDelete = async (id: string) => {
    toast.loading("Deleting...", { id: "delete-plan-toast" });
    try {
      const res = await nextFetch(`/package/${id}`, {
        method: "DELETE",
      });

      if (res?.success) {
        toast.success(res?.message as string, { id: "delete-plan-toast" });
        revalidate("subscription-packages");
        window.location.reload();
      } else {
        toast.error(res?.message || "Failed to delete plan", {
          id: "delete-plan-toast",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-white border border-primary rounded-xl relative">
      {/* Top Icon */}
      <div className="flex justify-center w-full absolute -translate-y-1/2 top-0">
        <div className="bg-white border border-secondary rounded-full p-2">
          <Image
            src={getIcon(plan.name)}
            alt="plan icon"
            width={50}
            height={50}
            className="size-8"
          />
        </div>
      </div>

      {/* Gradient Price Section */}
      <div className="bg-gradient-to-r from-primary-foreground to-primary rounded-t-lg text-white text-center py-7">
        <div className="text-4xl font-semibold mt-1">
          ${plan.price}/
          <span className="text-lg font-light">{plan.recurring}</span>
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 p-6 space-y-3 text-sm text-gray-700">
        {plan.features.map((feature, idx) => {
          const isExcluded = feature.toLowerCase().startsWith("no ");
          return (
            <div key={idx} className="flex items-start gap-2">
              {isExcluded ? (
                <XCircle className="text-red-500 min-w-4 w-4 h-4 mt-0.5" />
              ) : (
                <CheckCircle className="text-green-600 min-w-4 w-4 h-4 mt-0.5" />
              )}
              <span>{feature}</span>
            </div>
          );
        })}
      </div>

      {/* Edit Button */}
      <div className="p-6 bg-[#EEF6FB] rounded-b-xl flex flex-col gap-3">
        <Modal
          dialogTrigger={
            <Button className="w-full bg-gradient-to-r from-primary-foreground to-primary rounded-md">
              Edit Plan
            </Button>
          }
          className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-6 bg-secondary-foreground"
        >
          <EditPlanForm initialPlan={plan} />
        </Modal>
        <DeleteModal
          triggerBtn={
            <Button className="w-full bg-gradient-to-r from-primary-foreground to-primary rounded-md">
              Delete Plan
            </Button>
          }
          title="Are you sure to delete this item?"
          itemId={plan?._id?.toString() || ""}
          action={handleDelete}
        />
      </div>
    </div>
  );
}
