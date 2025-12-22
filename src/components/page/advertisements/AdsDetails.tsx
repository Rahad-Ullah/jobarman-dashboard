import { Button } from "@/components/ui/button";
import { IMAGE_URL } from "@/config/env-config";
import { revalidate } from "@/helpers/revalidateHelper";
import { IAdvertisement } from "@/types/advertisement";
import { nextFetch } from "@/utils/nextFetch";
import Image from "next/image";
import toast from "react-hot-toast";

// update ad status
const handleUpdate = async (id: string, status: string) => {
  toast.loading("Updating...", { id: "update-ad" });
  try {
    const res = await nextFetch(`/spotlight/change-status/${id}`, {
      method: "PATCH",
      body: { status },
    });
    if (res?.success) {
      toast.success(res?.message as string, { id: "update-ad" });
      revalidate("advertisements");
    } else {
      toast.error(res?.message || "Failed to update", { id: "update-ad" });
    }
  } catch (error) {
    console.error(error);
  }
};

export default function AdsDetails({ item }: { item: IAdvertisement }) {
  return (
    <section className="space-y-6">
      {/* Banner Image */}
      <div className="w-full">
        <Image
          src={
            item?.cover_image?.includes("http")
              ? item.cover_image
              : `${IMAGE_URL}${item?.cover_image}`
          }
          alt="banner"
          width={800}
          height={200}
          className="max-h-[300px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* data Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Title</td>
              <td className="p-3">{item?.focus_area}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">
                Organization
              </td>
              <td className="p-3">{item?.organization_name}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Service</td>
              <td className="p-3">{item?.service_type}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">
                Service Mode
              </td>
              <td className="p-3 capitalize">{item?.mode}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Pricing</td>
              <td className="p-3">{item?.pricing}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Start Date</td>
              <td className="p-3">
                {item?.start_date?.split("T")[0]} {item?.start_time}
              </td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">End Date</td>
              <td className="p-3">
                {item?.end_date?.split("T")[0]} {item?.end_time}
              </td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Email</td>
              <td className="p-3">{item?.contact_info?.details}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {item?.status === "pending" && (
          <Button
            onClick={() => handleUpdate(item._id, "rejected")}
            variant="destructive"
            className="px-8"
          >
            Reject
          </Button>
        )}
        {item?.status === "pending" && (
          <Button
            onClick={() => handleUpdate(item._id, "approved")}
            variant="default"
            className="px-6"
          >
            Approve
          </Button>
        )}
      </div>
    </section>
  );
}
