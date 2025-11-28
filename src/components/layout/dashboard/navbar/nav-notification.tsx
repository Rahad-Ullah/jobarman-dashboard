import { Button } from "@/components/ui/button";
import { nextFetch } from "@/utils/nextFetch";
import { Bell } from "lucide-react";
import Link from "next/link";

const NavNotification = async () => {
  // fetch notification data from server
  const res = await nextFetch("/notification", {
    tags: ["notifications"],
  });
  const unreadCount = res?.data?.unreadCount;

  return (
    <Link href={"/notifications"}>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-[#008000] rounded-full relative"
      >
        <Bell className="size-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 left-5 px-2 text-[10px] text-red-100 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default NavNotification;
