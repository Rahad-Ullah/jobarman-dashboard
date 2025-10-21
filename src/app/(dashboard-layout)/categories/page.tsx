import AddCategoryForm from "@/components/forms/category/AddCategory";
import Modal from "@/components/modals/Modal";
import CategoryTable from "@/components/page/categories/CateogoryTable";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { demoCategoriesData } from "@/demoData/categories";
import { Plus } from "lucide-react";

const CategoriesPage = async ({ searchParams }) => {
  const { searchTerm, page } = await searchParams;

  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  // Fetch data from the backend when backend is ready
  // const res = await myFetch(`/user/users?${queryParams.toString()}`, {
  //   tags: ["users"],
  // });

  const handleDelete = async () => {
    "use server";
  };

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
        <CategoryTable
          data={demoCategoriesData as never[]}
          filters={{ searchTerm: "", page: 1 }}
          meta={{ page: 1, totalPage: 1, total: 12 } as never}
        />
      </section>
    </div>
  );
};

export default CategoriesPage;
