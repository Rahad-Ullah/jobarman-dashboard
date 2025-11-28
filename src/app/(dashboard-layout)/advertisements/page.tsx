import AdsTable from "@/components/page/advertisements/AdsTable";
import { nextFetch } from "@/utils/nextFetch";

const AdsPage = async ({ searchParams }) => {
  const { page, status } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(status && { status }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await nextFetch(`/spotlight?${queryParams.toString()}`, {
    tags: ["advertisements"],
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* category list */}
      <AdsTable
        data={res?.data}
        filters={{ status, page } as never}
        meta={res?.pagination}
      />
    </div>
  );
};

export default AdsPage;
