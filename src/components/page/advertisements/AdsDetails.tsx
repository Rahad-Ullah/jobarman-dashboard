import { Button } from "@/components/ui/button";
import { IMAGE_URL } from "@/config/env-config";
import { IAdvertisement } from "@/types/advertisement";
import Image from "next/image";

export default function AdsDetails({ data }: { data: IAdvertisement }) {
  return (
    <section className="space-y-6">
      {/* Banner Image */}
      <div className="w-full">
        <Image
          src={
            data?.cover_image?.includes("http")
              ? data.cover_image
              : `${IMAGE_URL}${data?.cover_image}`
          }
          alt="banner"
          width={800}
          height={200}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* data Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Title</td>
              <td className="p-3">{data?.focus_area}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">
                Organization
              </td>
              <td className="p-3">{data?.organization_name}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Service</td>
              <td className="p-3">{data?.service_type}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">
                Service Mode
              </td>
              <td className="p-3 capitalize">{data?.mode}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Pricing</td>
              <td className="p-3">{data?.pricing}</td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Start Date</td>
              <td className="p-3">
                {data?.start_date?.split("T")[0]} {data?.start_time}
              </td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">End Date</td>
              <td className="p-3">
                {data?.end_date?.split("T")[0]} {data?.end_time}
              </td>
            </tr>
            <tr className="border-b last:border-none">
              <td className="bg-gray-100 p-3 font-medium w-1/3">Email</td>
              <td className="p-3">{data?.contact_info?.details}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="destructive">Reject</Button>
        <Button variant="default">Approve</Button>
      </div>
    </section>
  );
}
