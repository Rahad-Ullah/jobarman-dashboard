import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdsDetails() {
  const trainingInfo = {
    Title: "UI/UX Designer",
    Organization: "Bootcamp",
    Service: "Training Program",
    Industry: "Cybersecurity",
    Location: "2464 Royal Ln. Mesa, New Jersey 45463",
    Fee: "Admission Fee",
    Start: "01 Jan 2020",
    End: "01 Jan 2020",
    Contact: "Company@gmail.com",
  };

  return (
    <section className="space-y-6">
      {/* Banner Image */}
      <div className="w-full">
        <Image
          src="https://t3.ftcdn.net/jpg/03/58/14/84/360_F_358148466_X8U31rOEi3WB8jeD21Phc3K8DiR1XsFu.jpg" // Replace with your actual image path
          alt="We Are Hiring Banner"
          width={800}
          height={200}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* data Table */}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(trainingInfo).map(([label, value]) => (
              <tr key={label} className="border-b last:border-none">
                <td className="bg-gray-100 p-3 font-medium w-1/3">{label}</td>
                <td className="p-3">{value}</td>
              </tr>
            ))}
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
