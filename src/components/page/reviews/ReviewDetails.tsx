import { Button } from "@/components/ui/button";
import { IMAGE_URL } from "@/config/env-config";
import { revalidate } from "@/helpers/revalidateHelper";
import { IReview } from "@/types/review";
import { nextFetch } from "@/utils/nextFetch";
import Image from "next/image";
import toast from "react-hot-toast";

const ReviewDetails = ({ review }: { review: IReview }) => {
  // handle update status
  const handleUpdateStatus = async (status: string) => {
    toast.loading("Updating status...", { id: "update-status" });
    try {
      const res = await nextFetch(`/review/${review._id}`, {
        method: "PATCH",
        body: { status },
      });
      if (res?.success) {
        revalidate("reviews");
        toast.success("Status updated successfully", { id: "update-status" });
      } else {
        toast.error("Failed to update status", { id: "update-status" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-4">
      <section className="flex items-center gap-8 border-b pb-4">
        <figure>
          <Image
            src={
              review?.user?.image?.includes("http")
                ? review.user.image
                : `${IMAGE_URL}${review.user?.image}`
            }
            alt="user-image"
            width={80}
            height={80}
            className="size-16 rounded-full"
          />
        </figure>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{review.user.name}</h1>
            <h3 className="text-lg font-medium">{review.user.email}</h3>
          </div>
        </div>
      </section>
      {/* user details */}
      <section className="grid gap-4 h-fit">
        <div className="bg-white p-2 px-3 rounded-lg shadow-md flex items-center gap-2">
          <span className="font-semibold">Rating:</span>
          <span className="text-sm">{review.rating}</span>
        </div>
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p>
            <span className="font-semibold">Comment:</span> <br />{" "}
            <span className="text-sm">{review.comment}</span>
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => handleUpdateStatus("published")}
            disabled={review.status === "published"}
          >
            Publish
          </Button>
          <Button
            onClick={() => handleUpdateStatus("rejected")}
            disabled={review.status === "rejected"}
            variant={"destructive"}
          >
            Reject
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ReviewDetails;
