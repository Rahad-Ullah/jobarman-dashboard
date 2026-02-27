import ReviewsTable from "@/components/page/reviews/ReviewsTable";
import { nextFetch } from "@/utils/nextFetch";
const UsersPage = async ({ searchParams }) => {
  const { role, searchTerm, page, limit = 20 } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
    ...(limit && { limit }),
  });

  // Fetch data from the backend when backend is ready
  const res = await nextFetch(`/review?${queryParams.toString()}`, {
    tags: ["reviews"],
  });

  return (
    <>
      <ReviewsTable
        reviews={res?.data}
        meta={res?.pagination}
        filters={{ role, searchTerm, page }}
      />
    </>
  );
};

export default UsersPage;
