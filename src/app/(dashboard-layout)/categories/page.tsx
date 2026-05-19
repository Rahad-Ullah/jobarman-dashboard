import AddCategoryForm from "@/components/forms/category/AddCategory";
import Modal from "@/components/modals/Modal";
import CategoryTable from "@/components/page/categories/CategoryTable";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { nextFetch } from "@/utils/nextFetch";
import { Plus } from "lucide-react";

const CategoriesPage = async ({ searchParams }) => {
  const { searchTerm, limit = 500 } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(searchTerm && { searchTerm }),
    ...(limit && { limit }),
  });

  const res = await nextFetch(`/job-category?${queryParams.toString()}`, {
    tags: ["categories"],
  });

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* page header */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-6">
        <PageTitle>Category Management</PageTitle>
        <div>
          <Modal
            dialogTrigger={
              <Button className="bg-gradient-to-r from-primary-foreground to-primary rounded-full">
                <Plus /> Add New Category
              </Button>
            }
            className="max-w-[30vw] p-6 bg-secondary-foreground"
          >
            <AddCategoryForm />
          </Modal>
        </div>
      </section>

      {/* category list */}
      <section>
        <CategoryTable data={res?.data} filters={{ searchTerm, limit }} />
      </section>
    </div>
  );
};

export default CategoriesPage;
