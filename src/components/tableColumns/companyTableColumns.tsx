"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ICompany } from "@/types/company";
import Image from "next/image";
import Link from "next/link";

// table column definition
const companyTableColumns: ColumnDef<ICompany>[] = [
  {
    accessorKey: "logo",
    header: "Company Logo",
    cell: ({ row }) => {
      const item = row.original as ICompany;
      return (
        <Image
          src={item?.company_logo || "/demo.png"}
          alt="logo"
          width={50}
          height={50}
          className="size-12"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => {
      const item = row.original as ICompany;
      return <p className="px-2 capitalize">{item?.company_name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as ICompany;
      return <p className="px-2">{item?.contact_email || "-"}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const item = row.original as ICompany;
      return <p className="px-2">{item?.company_address || "-"}</p>;
    },
  },
  {
    accessorKey: "job_url",
    header: "Job Link",
    cell: ({ row }) => {
      const item = row.original as ICompany;
      return (
        <Link
          href={item?.job_url}
          target="_blank"
          className="underline text-primary"
        >
          Job Link
        </Link>
      );
    },
  },
];

export default companyTableColumns;
