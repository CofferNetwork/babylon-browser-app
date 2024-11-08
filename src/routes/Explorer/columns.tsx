"use client";

import { Delegation } from "@/lib/api/type";
import { satToBtc } from "@/lib/bitcoin/utils";
import { formatTimestamp } from "@/lib/date";
import { abbreviateAddress } from "@/lib/string";
import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMempoolAddressLink, getMempoolTxLink } from "@/lib/utils";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Delegation>[] = [
  {
    accessorKey: "staking_tx.tx_hex",
    header: "Txn Hash",
    cell({ row }) {
      return (
        <Tooltip>
          <TooltipTrigger>
            <Link target="_blank" to={getMempoolTxLink(row.original._id || "")}>{abbreviateAddress(row.original._id || "")}</Link>
          </TooltipTrigger>
          <TooltipContent>{row.original._id}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    header: "Type",
    cell({ row }) {
      return (
        <span className="bg-[#202124] flex items-center justify-center rounded-sm px-[10px] py-[3px]">
          {row.original.state === "active" ? "Stake" : row.original.state}
        </span>
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
        <span>
          {formatTimestamp(row.original.staking_tx.start_timestamp * 1000)}
        </span>
      );
    },
  },
  {
    accessorKey: "staker_address",
    header: "From",
    cell({ row }) {
      return (
        <Tooltip>
          <TooltipTrigger>
            <Link target="_blank" to={getMempoolAddressLink(row.original.staker_address || '')}>{abbreviateAddress(row.original.staker_address || "")}</Link>
          </TooltipTrigger>
          <TooltipContent>{row.original.staker_address}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "to_address",
    header: "To",
    cell({ row }) {
      return (
        <Tooltip>
          <TooltipTrigger>
            <Link target="_blank" to={getMempoolAddressLink(row.original.to_address || '')}>{abbreviateAddress(row.original.to_address || "")}</Link>
          </TooltipTrigger>
          <TooltipContent>{row.original.to_address}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "staking_value",
    header: "Value(BTC)",
    cell({ row }) {
      return <span>{satToBtc(row.original.staking_value || 0)}</span>;
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
