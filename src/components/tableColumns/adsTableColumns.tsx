"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import Modal from "../modals/Modal";
import { IAdvertisement } from "@/types/advertisement";
import AdsDetails from "../page/advertisements/AdsDetails";

// handle delete
const handleDelete = async () => {
  // perform api here...
};

// table column definition
const adsTableColumns: ColumnDef<IAdvertisement>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?._id}</p>;
    },
  },
  {
    accessorKey: "organizationName",
    header: "Organization Name",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.organizationName}</p>;
    },
  },
  {
    accessorKey: "adType",
    header: "Ad Type",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.adType}</p>;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.startDate}</p>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.endDate}</p>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const item = row.original as IAdvertisement;
      return <p className="px-2">{item?.paymentStatus}</p>;
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
            className="max-w-[35vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
          >
            <AdsDetails />
          </Modal>
          <DeleteModal
            triggerBtn={
              <Button variant={"ghost"} size={"icon"} className="text-red-500">
                <Trash />
              </Button>
            }
            title="Are you sure to delete this item?"
            itemId={item?._id?.toString() || ""}
            action={handleDelete}
          />
        </div>
      );
    },
  },
];

export default adsTableColumns;
