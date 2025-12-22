"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import PageTitle from "@/components/shared/PageTitle";
import adminTableColumns from "@/components/tableColumns/adminTableColumns";
import Modal from "@/components/modals/Modal";
import AddAdminForm from "@/components/forms/admin/AddAdminForm";

const AdminsTable = ({ users = [], meta }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IUser>({
    data: users || [],
    columns: adminTableColumns as ColumnDef<IUser>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: meta?.limit,
      },
    },
  });

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* table top option bar */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-4">
        <PageTitle>Admin Management</PageTitle>
        <div className="flex items-center gap-6">
          {/* add new admin button */}
          <Modal
            dialogTrigger={
              <Button>
                <Plus /> Add New Admin
              </Button>
            }
            className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-6 bg-secondary-foreground"
          >
            <AddAdminForm />
          </Modal>
        </div>
      </section>

      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between gap-4 p-4 pt-2 bg-white rounded-xl">
        <DashboardTable table={table} columns={adminTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default AdminsTable;
