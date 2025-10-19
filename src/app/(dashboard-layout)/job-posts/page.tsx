import JobPostsTable from "@/components/page/job-posts/JobPostsTable";
import { demoJobPostsData } from "@/demoData/job-posts";

const JobPostsPage = async ({ searchParams }) => {
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
      <JobPostsTable
        users={demoJobPostsData as never[]}
        meta={{ page: 1, totalPage: 1, total: 12 } as never}
        filters={{ status }}
      />
    </>
  );
};

export default JobPostsPage;
