"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.less";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "@/components/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  onChange?: (page: number) => void;
  pageSize: number;
  onPageSizeChange?: (size: number) => void;
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  onChange,
  pageSize,
  onPageSizeChange,
  loading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onPaginationChange = (page: number) => {
    onChange?.(page);
  };

  return (
    <div className="">
      <div className="rounded-md border mb-[20px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="divide-x-[1px]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-primary text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y-[1px] text-[#DEDEDE] relative">
            {loading && <TableCell><div className="!absolute z-[100] !left-[50%] !top-[50%] !translate-x-[-50%] !translate-y-[-50%]"><span className="loader"></span></div></TableCell>}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="divide-x-[1px]"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              loading ? null :<TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-[20px] items-center">
          <span>Items per page</span>
          <Card
            bodyClassName="!px-0 !py-0"
            className="rounded-[4px] h-[36px] overflow-hidden"
          >
            <Select
              value={String(pageSize)}
              onValueChange={(value) => onPageSizeChange?.(Number(value))}
            >
              <SelectTrigger className="w-[80px] h-full border-none">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Card>
        </div>
        <div>
          <Card bodyClassName="!px-0 !py-0" className="rounded-[4px]">
            <Pagination
              pageSize={pageSize}
              total={total}
              locale={localeInfo}
              onChange={onPaginationChange}
              itemRender={(_current, type, element) => {
                if (type === "next") {
                  return <ChevronRight className="text-white" />;
                }

                if (type === "prev") {
                  return <ChevronLeft className="text-white" />;
                }

                return element;
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
