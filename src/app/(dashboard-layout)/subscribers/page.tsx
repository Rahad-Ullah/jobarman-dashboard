import SubscriberTable from "@/components/page/subscribers/SubscribersTable";
import { nextFetch } from "@/utils/nextFetch";
const SubscribersPage = async ({ searchParams }) => {
  const { role, searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await nextFetch(`/subscription/subscribed-users?${queryParams.toString()}`, {
    tags: ["subscribers"],
  });

  return (
    <>
      <SubscriberTable
        users={res?.data}
        meta={res?.pagination}
        filters={{ role, searchTerm, page }}
      />
    </>
  );
};

export default SubscribersPage;
