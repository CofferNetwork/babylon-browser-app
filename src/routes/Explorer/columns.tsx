"use client";

import { Delegation } from "@/lib/api/type";
import { satToBtc } from "@/lib/bitcoin/utils";
import { formatTimestamp } from "@/lib/date";
import { abbreviateAddress } from "@/lib/string";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Delegation>[] = [
  {
    accessorKey: "staking_tx.tx_hex",
    header: "Txn Hash",
    cell({ row }) {
      return (
        <span>{abbreviateAddress(row.original.staking_tx.tx_hex || "")}</span>
      );
    },
  },
  {
    header: "Type",
    cell({ row }) {
      return (
        <span className="bg-[#202124] flex items-center justify-center rounded-sm px-[10px] py-[3px]">{row.original.state === "active" ? 'Stake' : ''}</span>
      );
    },
  },
  {
    accessorKey: "staking_tx.start_height",
    header: "Block",
  },
  {
    accessorKey: "staking_tx.start_timestamp",
    header: "Timestamp",
    cell({ row }) {
      return (
        <span>{formatTimestamp(row.original.staking_tx.start_timestamp * 1000)}</span>
      )
    }
  },
  {
    accessorKey: "staker_address",
    header: "From",
    cell({ row }) {
      return (
        <span>{abbreviateAddress(row.original.staker_address || "")}</span>
      );
    },
  },
  {
    accessorKey: "To",
    header: "To",
  },
  {
    accessorKey: "staking_value",
    header: "Value(BTC)",
    cell({ row }) {
      return (
        <span>{satToBtc(row.original.staking_value || 0)}</span>
      );
    },
  },
  {
    accessorKey: "Fee",
    header: "Fee",
    cell: () => {
      return <span>Coming soon</span>;
    },
  },
];
