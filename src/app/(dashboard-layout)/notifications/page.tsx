import Notifications from "@/components/page/notifications/Notifications";
import { nextFetch } from "@/utils/nextFetch";

const NotificationPage = async () => {
  const res = await nextFetch("/notification", { tags: ["notifications"] });

  return <Notifications data={res?.data?.data} meta={res?.pagination} />;
};

export default NotificationPage;
