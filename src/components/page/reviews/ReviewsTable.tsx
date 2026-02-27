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
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/user";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import PageTitle from "@/components/shared/PageTitle";
import { formatEnum } from "@/utils/formatEnum";
import reviewTableColumns from "@/components/tableColumns/reviewTableColumns";

const ReviewsTable = ({ reviews = [], filters, meta }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IUser>({
    data: reviews || [],
    columns: reviewTableColumns as ColumnDef<IUser>[],
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
        <PageTitle>Reviews</PageTitle>
        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="capitalize min-w-32 justify-between"
              >
                {filters?.status ? `${formatEnum(filters?.status)}` : "Status"}{" "}
                <ChevronDown className="text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  updateMultiSearchParams({ status: null, page: null })
                }
              >
                All Statuses
              </DropdownMenuItem>
              {["published", "rejected"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() =>
                    updateMultiSearchParams({ status: item, page: null })
                  }
                >
                  {formatEnum(item)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between gap-4 p-4 pt-2 bg-white rounded-xl">
        <DashboardTable table={table} columns={reviewTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default ReviewsTable;
