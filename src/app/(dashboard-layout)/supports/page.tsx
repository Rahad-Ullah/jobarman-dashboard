import SupportTable from "@/components/page/support/SupportTable";
import { nextFetch } from "@/utils/nextFetch";
const SupportPage = async ({ searchParams }) => {
  const { status, searchTerm, page, limit = 20 } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(status && { status }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
    ...(limit && { limit }),
  });

  const res = await nextFetch(`/support?${queryParams.toString()}`, {
    tags: ["supports"],
  });

  const tickets = res?.data;

  return (
    <section className="h-full">
      <SupportTable
        tickets={tickets}
        meta={res?.pagination}
        filters={{ status, searchTerm }}
      />
    </section>
  );
};

export default SupportPage;
