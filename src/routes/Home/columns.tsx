"use client";

import { Provider, Staker } from "@/lib/api/type";
import { abbreviateAddress } from "@/lib/string";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

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
          <span className="text-primary underline">{abbreviateAddress(row.original.staker_address)}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "active_delegations",
    header: "Staked amount (BTC)",
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
      return <span>{row.original.description?.moniker}</span>;
    },
  },
  {
    accessorKey: "staker_address",
    header: "BTC PK",
    cell: ({ row }) => {
      return <span>{abbreviateAddress(row.original.eots_pk)}</span>;
    },
  },
  {
    accessorKey: "total_delegations",
    header: "Total Delegation",
  },
];
