"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Layers, Timer } from "lucide-react";
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
            item?.thumbnail?.includes("http")
              ? item.thumbnail
              : `${IMAGE_URL}${item?.thumbnail}`
          }
          alt="banner"
          width={1200}
          height={300}
          className="w-auto max-h-[400px] mx-auto rounded-md"
        />
      </section>

      {/* Title & Tags */}
      <section className="flex gap-4 py-4 pt-12">
        <figure>
          <Image
            src={
              item?.recruiter?.image?.includes("http")
                ? item.recruiter.image
                : `${IMAGE_URL}${item?.recruiter.image}`
            }
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
          {/* Description */}
          <div>
            <h4 className="font-semibold mb-1">Job Description</h4>
            <p className="text-sm text-gray-700">
              We are a Shopify Plus Agency that partners with brands to help
              them grow. We specialize in creating exceptional digital
              experiences for eCommerce brands— including websites, landing
              pages, and digital products. You’ll translate specs into clean,
              fast, conversion-optimized designs and collaborate with
              developers.
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="font-semibold mb-1">Requirements</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Strong reasoning and analytical skills</li>
              <li>Passion for creating exceptional digital experiences</li>
              <li>Experience in designing for eCommerce</li>
              <li>Ability to work independently and with smaller teams</li>
              <li>Proficiency in Figma, Adobe XD, Illustrator</li>
            </ul>
          </div>

          {/* Perks */}
          <div>
            <h4 className="font-semibold mb-1">Perks</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Monthly team dinner</li>
              <li>Yearly trip</li>
              <li>Performance-based bonuses</li>
              <li>Paid leaves</li>
              <li>Annual increments</li>
              <li>Birthday celebration</li>
              <li>End-of-week lunch</li>
              <li>Extra day off for birthdays</li>
            </ul>
          </div>
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
              <h4 className="font-semibold">Experience Level</h4>
              <p>{item.experience_level}</p>
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
              </div>
              <div className="flex flex-col gap-1">
                <GraduationCap className="text-primary mb-2" />
                Education:
                <span className="font-semibold">Graduate Degree</span>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="destructive" className="px-10">
            Reject
          </Button>
          <Button className="px-10 bg-green-600 hover:bg-green-700">
            Accept
          </Button>
        </div>
      </section>
    </div>
  );
}
