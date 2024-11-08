"use client";

import { Provider, Staker } from "@/lib/api/type";
import { abbreviateAddress } from "@/lib/string";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { satToBtc } from "@/lib/bitcoin/utils";

export const stakerColumns: ColumnDef<Staker>[] = [
  {
    accessorKey: "status",
    header: "Rank",
    cell: ({ row }) => {
      return <span>{row.original.rank}</span>;
    },
  },
  {
    accessorKey: "staker_address",
    header: "Address",
    cell: ({ row }) => {
      return (
        <Link to={`/address/${row.original.staker_address}`}>
          <span className="text-primary underline">
            {abbreviateAddress(row.original.staker_address)}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "active_tvl",
    header: "Total Staked Amount (BTC) ",
    cell: ({ row }) => {
      return <span>{ satToBtc(row.original.active_tvl || 0) }</span>;
    },
  },
  {
    accessorKey: "active_delegations",
    header: "Total Delegation Times"
  },
  {
    accessorKey: "Points earned",
    header: "Points earned",
    cell: () => {
      return <span>Coming soon</span>;
    },
  },
  {
    accessorKey: "Finality Provider",
    header: "Finality Provider",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.providers
            ?.map((item) => item.description?.moniker)
            .join(",")}
        </span>
      );
    },
  },
];

export const providerColumns: ColumnDef<Provider>[] = [
  {
    accessorKey: "status",
    header: "Finality Provider",
    cell: ({ row }) => {
      return (
        <span className="flex items-center">
          {row.original.description?.moniker}
          {row.original.description?.website && (
            <ExternalLink
              className="cursor-pointer w-[16px] ml-2 text-primary"
              onClick={() => window.open(row.original.description?.website)}
            />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "staker_address",
    header: "Provider PK",
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger>
            {abbreviateAddress(row.original.eots_pk || "")}
          </TooltipTrigger>
          <TooltipContent>{row.original.eots_pk}</TooltipContent>
        </Tooltip>
      )
    },
  },
  {
    accessorKey: 'active_tvl',
    header: 'Total Delegation Amount (BTC)',
    cell: ({ row }) => {
      return <span>{ satToBtc(row.original.active_tvl || 0) }</span>;
    },
  },
  {
    accessorKey: "total_delegations",
    header: "Total Delegation Times",
    cell: ({ row }) => {
      return <span>{row.original.total_delegations || 0}</span>;
    },
  },
  {
    accessorKey: "staker_address",
    header: "Commission",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.commission
            ? `${(parseFloat((Number(row.original.commission) * 100).toFixed(2)))}%`
            : "--"}
        </span>
      );
    },
  },
];
