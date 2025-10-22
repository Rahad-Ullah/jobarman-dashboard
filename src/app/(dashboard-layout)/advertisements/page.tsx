import AdsTable from "@/components/page/advertisements/AdsTable";
import { demoAdvertisementsData } from "@/demoData/advertisements";

const AdsPage = async ({ searchParams }) => {
  const { searchTerm, page, status } = await searchParams;

  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  // Fetch data from the backend when backend is ready
  // const res = await myFetch(`/user/users?${queryParams.toString()}`, {
  //   tags: ["users"],
  // });

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* category list */}
      <section>
        <AdsTable
          data={demoAdvertisementsData as never[]}
          filters={{ searchTerm, status, page } as never}
          meta={{ page: 1, totalPage: 1, total: 12 } as never}
        />
      </section>
    </div>
  );
};

export default AdsPage;
