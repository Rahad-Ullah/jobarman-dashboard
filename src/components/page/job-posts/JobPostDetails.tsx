"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, Layers, MapPinIcon, Timer } from "lucide-react";
import Image from "next/image";
import { IJobPost } from "@/types/job-post";
import { IMAGE_URL } from "@/config/env-config";
import { formatEnum } from "@/utils/formatEnum";

export default function JobPostDetails({ item }: { item: IJobPost }) {
  return (
    <div className="overflow-hidden">
      {/* Top Banner */}
      <section>
        <Image
          src={
            item?.thumbnail?.trim()
              ? item.thumbnail.includes("http")
                ? item.thumbnail
                : `${IMAGE_URL}${item.thumbnail}`
              : "/demo.png"
          }
          alt="banner"
          width={1200}
          height={300}
          className="w-auto max-h-[300px] mx-auto rounded-md"
        />
      </section>

      {/* Title & Tags */}
      <section className="flex gap-4 py-4 pt-12">
        <figure>
          <Image
            src={"/avatar.png"}
            alt="recruiter image"
            width={60}
            height={60}
            className="size-16 rounded-full border p-1"
          />
        </figure>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{item?.title}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">at {item?.recruiter?.name}</p>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                {formatEnum(item?.job_level)}
              </Badge>
              <Badge
                variant="outline"
                className="text-orange-500 border-orange-500"
              >
                {formatEnum(item?.job_type)}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="grid grid-cols-[50%_auto] gap-6 py-6">
        <div>
          <h4 className="font-semibold">Job Description</h4>
          <article
            className="prose prose-slate"
            dangerouslySetInnerHTML={{ __html: item?.description }}
          />
          <h4 className="font-semibold mt-4">Requirements</h4>
          <ul className="list-disc list-inside">
            {item?.required_skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Overview */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 text-sm text-gray-700 border p-5 rounded-md">
            <div>
              <h4 className="font-semibold">Salary (USD)</h4>
              <p>
                ${item.min_salary} - ${item.max_salary}/month
              </p>
            </div>
            <div className="border-l pl-4">
              <h4 className="font-semibold flex items-center gap-1">
                <MapPinIcon size={18} /> Job Location
              </h4>
              <p>{item.location}</p>
            </div>
          </div>
          <div className="grid gap-4 text-sm border p-5 rounded-md">
            <h2 className="font-semibold">Job Overview</h2>
            <div className="grid grid-cols-3 gap-5 text-gray-700">
              <div className="flex flex-col gap-1">
                <Calendar className="text-primary mb-2" />
                Job Posted:{" "}
                <span className="font-semibold">
                  {item?.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <Timer className="text-primary mb-2" />
                Job Expiry:
                <span className="font-semibold">
                  {item?.deadline?.split("T")[0]}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <Layers className="text-primary mb-2" />
                Job Level:
                <span className="font-semibold">
                  {formatEnum(item?.job_level)}
                </span>
              </div>
              {/* <div className="flex flex-col gap-1">
                <WalletMinimal className="text-primary mb-2" />
                Salary:{" "}
                <span className="font-semibold">
                  ${item?.min_salary} - ${item?.max_salary}/month
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="destructive" className="px-10">
            Reject
          </Button>
          <Button className="px-10 bg-green-600 hover:bg-green-700">
            Accept
          </Button>
        </div>
      </section> */}
    </div>
  );
}
