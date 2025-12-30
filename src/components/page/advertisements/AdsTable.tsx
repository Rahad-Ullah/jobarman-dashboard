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

import userTableColumns from "@/components/tableColumns/userTableColumn";
import { IUser } from "@/types/user";
import DashboardTable from "@/components/shared/table";
import TablePagination from "@/components/shared/table-pagination";
import adsTableColumns from "@/components/tableColumns/adsTableColumns";
import PageTitle from "@/components/shared/PageTitle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";
import { adStatusTypes } from "@/constants/advertisement";
import { downloadFile } from "@/utils/downloadFile";
import Modal from "@/components/modals/Modal";
import UpdateAdPrice from "./UpdateAdPrice";

const AdsTable = ({ data = [], filters, meta, adPrice }) => {
  const updateMultiSearchParams = useUpdateMultiSearchParams();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<IUser>({
    data: data || [],
    columns: adsTableColumns as ColumnDef<IUser>[],
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
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* page header */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-6">
        <PageTitle>Ad Management</PageTitle>
        <div className="flex items-center gap-4">
          {/* status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="capitalize min-w-32 justify-between"
              >
                {filters?.status ? `${filters?.status}` : "All Status"}
                <ChevronDown className="text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  updateMultiSearchParams({ status: null, page: null })
                }
              >
                All Status
              </DropdownMenuItem>
              {adStatusTypes.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() =>
                    updateMultiSearchParams({
                      status: item?.toLowerCase(),
                      page: null,
                    })
                  }
                >
                  {capitalizeSentence(item)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Modal
            dialogTrigger={<Button variant={"outline"}>Update Price</Button>}
            dialogTitle="Update Ad Price"
            className="max-w-[35vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-8 bg-secondary-foreground"
          >
            <UpdateAdPrice price={adPrice} />
          </Modal>

          <Button onClick={() => downloadFile("ad", "csv", "ads.csv")}>
            Export to CSV
          </Button>
          <Button onClick={() => downloadFile("ad", "pdf", "ads.pdf")}>
            Export to PDF
          </Button>
        </div>
      </section>
      {/* table and pagination*/}
      <section className="flex-1 flex flex-col justify-between gap-4 p-4 pt-2 bg-white rounded-xl">
        <DashboardTable table={table} columns={userTableColumns} />
        <TablePagination table={table} meta={meta} />
      </section>
    </div>
  );
};

export default AdsTable;
