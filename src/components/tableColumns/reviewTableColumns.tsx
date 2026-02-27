"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Modal from "../modals/Modal";
import { IReview } from "@/types/review";
import { truncateText } from "@/utils/truncateText";
import ReviewDetails from "../page/reviews/ReviewDetails";

// table column definition
const reviewTableColumns: ColumnDef<IReview>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p className="px-2">#{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as IReview;
      return <p className="px-2 capitalize">{item?.user?.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as IReview;
      return <p className="px-2">{item?.user?.email || "-"}</p>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const item = row.original as IReview;
      return <p className="px-2">{item?.rating || "-"}</p>;
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const item = row.original as IReview;
      return <p className="px-2">{truncateText(item?.comment, 5) || "-"}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const item = row.original as IReview;
      return (
        <p className="px-2 capitalize">
          {new Date(item?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) || "-"}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const item = row.original as IReview;
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
            className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-10 bg-secondary-foreground"
          >
            <ReviewDetails review={item} />
          </Modal>
        </div>
      );
    },
  },
];

export default reviewTableColumns;
