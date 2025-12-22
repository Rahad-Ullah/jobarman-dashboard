"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ISupportTicket } from "@/types/support";
import Modal from "../modals/Modal";
import { Textarea } from "../ui/textarea";
import { nextFetch } from "@/utils/nextFetch";
import toast from "react-hot-toast";
import Link from "next/link";
import { IMAGE_URL } from "@/config/env-config";

// handle reply
const handleReply = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const payload = {
    reply: formData.get("reply"),
  };

  toast.loading("Replying...", { id: "reply" });
  try {
    const res = await nextFetch(`/support/${id}`, {
      method: "PATCH",
      body: payload,
    });
    if (res?.success) {
      toast.success(res?.message as string, { id: "reply" });
    } else {
      toast.error(res?.message || "Failed to reply", { id: "reply" });
    }
  } catch (error) {
    console.error(error);
  }
};

// table column definition
const supportTableColumns: ColumnDef<ISupportTicket>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell: ({ row }) => {
      return <p>#{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item?.user?.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item?.user?.email || "-"}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item?.user?.phone || "-"}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Issue Title",
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{item.reason}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Issue Date</div>,
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return <p>{new Date(item.createdAt as string).toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const item = row.original as ISupportTicket;
      return (
        <Badge
          variant="outline"
          className={`capitalize font-medium shadow-none rounded py-1 ${
            item?.status === "resolved"
              ? "bg-green-50 text-green-600 border-green-400"
              : "bg-blue-50 text-blue-500 border-blue-400"
          }`}
        >
          {item?.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const item = row?.original as ISupportTicket;
      return (
        <div className="flex items-center justify-evenly gap-1">
          <Modal
            dialogTrigger={<Button size={"sm"}>View Details</Button>}
            className="max-w-[100vw] lg:max-w-lg"
          >
            <div className="text-stone-600 grid gap-2">
              <h1 className="text-xl font-semibold">{item?.reason}</h1>
              <h2 className="font-medium">
                <strong>User:</strong> {item?.user?.name}
              </h2>
              <p className="font-medium">
                <strong>Message:</strong> <br /> {item?.description}
              </p>

              {/* attachments */}
              {item?.images?.length > 0 ||
                (item?.docs?.length > 0 && (
                  <div>
                    <h3 className="font-medium">
                      <strong>Attachments:</strong>
                    </h3>
                    <div className="grid gap-2">
                      {item?.images?.map((image: string, index: number) => (
                        <Link
                          href={`${IMAGE_URL}${image}`}
                          key={index}
                          target="_blank"
                          className="block"
                        >
                          {image?.split("/").pop()}
                        </Link>
                      ))}
                      {item?.docs?.map((item: string, index: number) => (
                        <Link
                          href={`${IMAGE_URL}${item}`}
                          key={index}
                          target="_blank"
                          className="block"
                        >
                          {item?.split("/").pop()}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

              {/* reply option */}
              {
                <form
                  onSubmit={(e) => handleReply(e, item?._id)}
                  className="space-y-3"
                >
                  <p className="font-medium">
                    <strong>Reply:</strong>
                  </p>
                  <Textarea
                    name="reply"
                    required
                    placeholder="Type your reply"
                    rows={5}
                  />
                  <div className="flex items-center gap-4 justify-end">
                    <Button type="submit" className="rounded-md px-8">
                      Reply
                    </Button>
                  </div>
                </form>
              }
            </div>
          </Modal>
        </div>
      );
    },
  },
];

export default supportTableColumns;
