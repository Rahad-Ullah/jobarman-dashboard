import AdminsTable from "@/components/page/admins/AdminTable";
import { nextFetch } from "@/utils/nextFetch";
const AdminsPage = async ({ searchParams }) => {
  const { status, searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(status && { status }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const res = await nextFetch(`/admin?${queryParams.toString()}`, {
    tags: ["admins"],
  });

  return (
    <>
      <AdminsTable users={res?.data} meta={res?.pagination} />
    </>
  );
};

export default AdminsPage;
