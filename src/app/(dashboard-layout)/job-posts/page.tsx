import JobPostsTable from "@/components/page/job-posts/JobPostsTable";
import { nextFetch } from "@/utils/nextFetch";

const JobPostsPage = async ({ searchParams }) => {
  const { status, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(status && { status }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await nextFetch(`/job-post/feed/user?${queryParams.toString()}`, {
    tags: ["job-posts"],
  });

  return (
    <>
      <JobPostsTable
        users={res?.data}
        meta={res?.pagination}
        filters={{ status, page }}
      />
    </>
  );
};

export default JobPostsPage;
