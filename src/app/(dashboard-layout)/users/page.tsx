import UsersTable from "@/components/page/users/UsersTable";
import { nextFetch } from "@/utils/nextFetch";
const UsersPage = async ({ searchParams }) => {
  const { role, searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await nextFetch(`/user?${queryParams.toString()}`, {
    tags: ["users"],
  });

  return (
    <>
      <UsersTable
        users={res?.data}
        meta={res?.pagination}
        filters={{ role, searchTerm, page }}
      />
    </>
  );
};

export default UsersPage;
