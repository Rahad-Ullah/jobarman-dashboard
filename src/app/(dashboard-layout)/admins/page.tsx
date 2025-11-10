import AdminsTable from "@/components/page/admins/AdminTable";
import { demoUsersData } from "@/demoData/users";
const AdminsPage = async ({ searchParams }) => {
  const { status } = await searchParams;
  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(status && { status }),
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  // Fetch data from the backend when backend is ready
  // const res = await myFetch(`/user/users?${queryParams.toString()}`, {
  //   tags: ["users"],
  // });

  return (
    <>
      <AdminsTable
        users={demoUsersData as never[]}
        meta={{ page: 1, totalPage: 1, total: 12 } as never}
        filters={{ status }}
      />
    </>
  );
};

export default AdminsPage;
