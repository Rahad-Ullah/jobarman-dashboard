import CompaniesTable from "@/components/page/companies/CompaniesTable";
import { nextFetch } from "@/utils/nextFetch";
const CompaniesPage = async ({ searchParams }) => {
  const { role, searchTerm, page, limit = 50 } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
    ...(limit && { limit }),
  });

  // Fetch data from the backend when backend is ready
  const res = await nextFetch(`/admin/company-info?${queryParams.toString()}`, {
    tags: ["companies"],
  });

  return (
    <>
      <CompaniesTable
        data={res?.data}
        meta={res?.pagination}
        filters={{ role, searchTerm, page }}
      />
    </>
  );
};

export default CompaniesPage;
