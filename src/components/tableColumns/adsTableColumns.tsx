"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Modal from "../modals/Modal";
import AdsDetails from "../page/advertisements/AdsDetails";
import { IAdvertisement } from "@/types/advertisement";

// table column definition
const adsTableColumns: ColumnDef<IAdvertisement>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "organizationName",
    header: "Organization Name",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.organization_name}</p>;
    },
  },
  {
    accessorKey: "adType",
    header: "Ad Type",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.service_type}</p>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return (
        <p className="px-2">
          {item?.start_date?.split("T")[0]} {item?.start_time}
        </p>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return (
        <p className="px-2">
          {item?.end_date?.split("T")[0]} {item?.end_time}
        </p>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.pricing}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2 capitalize">{item?.status}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="px-8 text-center">Action</div>,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center justify-center gap-1.5">
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"} className="text-primary">
                <Eye />
              </Button>
            }
            dialogTitle=""
            className="max-w-[35vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-8 bg-secondary-foreground"
          >
            <AdsDetails item={item} />
          </Modal>
          {/* <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            title="Are you sure to delete this item?"
            itemId={item?._id?.toString() || ""}
            action={handleDelete}
          /> */}
        </div>
      );
    },
  },
];

export default adsTableColumns;
