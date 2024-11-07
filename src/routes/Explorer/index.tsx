import Card from "@/components/Card";

import { DataTable } from "@/components/Table/data-table";
import { columns } from "./columns";
import copyIcon from "@/assets/imgs/copy@2x.png";
import qrcodeIcon from "@/assets/imgs/qrcode@2x.png";
import shareIcon from "@/assets/imgs/share@2x.png";
import { toast } from "@/components/Toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { getMempoolAddressLink } from "@/lib/utils";
import AddressViewDialog from "@/components/AddressView/dialog";
import { useEffect, useState } from "react";
import { getStakerByAddress } from "@/lib/api";
import { Page, StakerDetail } from "@/lib/api/type";
import { useLoading, useLoadingStore } from "@/store/loading";
import { satToBtc } from "@/lib/bitcoin/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePrevious } from "@uidotdev/usehooks";

const Explorer = () => {
  const { address } = useParams();
  const previousAddress = usePrevious(address);
  const [stakerState, setStakerState] = useState<StakerDetail | null>();
  const [pn, setPn] = useState(10);
  const [page, setPage] = useState<Page>({ pi: 1, pn, total: 0 });
  const { show, hide } = useLoading();
  const loading = useLoadingStore((state) => state.loading);

  useEffect(() => {
    if (address && previousAddress && previousAddress !== address) {
      setStakerState(null);
      setPage({ pi: 1, pn, total: 0 });
      show();
    }
  }, [previousAddress, address]);

  useEffect(() => {
    if (address) {
      show();
      getStakerByAddress({ address, ...page })
        .then((res) => {
          if (res.code === 200) {
            res.data?.delegations.map((item) => {
              item.staker_address = res.data?.staker_address;
              return item;
            });
            setStakerState(res.data);
            setPage({ total: res.data?.total || 0, pn, pi: res.data?.pi || 1 });
          }
        })
        .finally(() => {
          hide();
        });
    }
  }, [address, pn, page?.pi]);

  return (
    <div className="pb-[64px]">
      <div className="mx-auto space-y-[25px]">
        <Card
          className="!rounded-[8px] overflow-hidden"
          bodyClassName="!px-[15px] !py-[15px] flex items-center justify-between"
        >
          <div>
            <h3 className="font-ArialBold text-[24px]">Overview</h3>
            <p className="text-[14px] text-[#999999]">{address}</p>
          </div>
          <div className="flex space-x-[44px] mr-[24px]">
            <img
              onClick={() => window.open(getMempoolAddressLink(address || ""))}
              className="w-[19px] h-[19px] cursor-pointer"
              src={shareIcon}
            />
            <CopyToClipboard
              text={address || ""}
              onCopy={() => toast("Address copied to clipboard")}
            >
              <img
                className="w-[19px] h-[19px] cursor-pointer"
                src={copyIcon}
              />
            </CopyToClipboard>
            <AddressViewDialog address={address}>
              <img
                className="w-[19px] h-[19px] cursor-pointer"
                src={qrcodeIcon}
              />
            </AddressViewDialog>
          </div>
        </Card>

        <Card
          className="!rounded-[8px] overflow-hidden"
          bodyClassName=" !px-[0px] pt-[15px] pb-[40px]"
        >
          <h3 className="font-ArialBold text-[24px] px-[15px] pt-[20px]">
            Overview
          </h3>
          <div className="px-[15px]">
            <div className="w-full h-[122px] bg-[#202124] rounded-[8px] mt-[20px] flex pt-[30px] pl-[20px]">
              <div className="flex flex-col flex-[0.5] space-y-[10px] w-[100px]">
                <span className="text-[#666] text-[14px] leading-none">
                  Delegations
                </span>
                <span className="text-[26px]">
                  {stakerState?.total_delegations}
                </span>
              </div>
              <div className="flex flex-col flex-1 space-y-[10px]">
                <span className="text-[#666] text-[14px] leading-none">
                  Finality Provider
                </span>
                <span className="text-[26px] w-full">
                  <Tooltip>
                    <TooltipTrigger content="test"><p className="line-clamp-1 w-full">{stakerState?.finality_providers?.[0]|| '--'}...</p></TooltipTrigger>
                    <TooltipContent>
                      <div className="text-[18px] space-y-1 px-2 py-4">{stakerState?.finality_providers?.map(item => <p>{item}</p>)}</div>
                    </TooltipContent>
                  </Tooltip>
                  {/* <Popover>
                    <PopoverTrigger>{stakerState?.finality_providers || '00'}</PopoverTrigger>
                    <PopoverContent>{stakerState?.finality_providers}</PopoverContent>
                  </Popover> */}
                </span>
              </div>
              <div className="flex flex-col flex-1 space-y-[10px]">
                <span className="text-[#666] text-[14px] leading-none">
                  Total Staked
                </span>
                <span className="text-[26px]">
                  {satToBtc(stakerState?.active_tvl || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col flex-1 space-y-[10px]">
                <span className="text-[#666] text-[14px] leading-none">
                  Total points
                </span>
                <span className="text-[26px]">Coming soon</span>
              </div>
              <div className="flex flex-col flex-1 space-y-[10px]">
                <span className="text-[#666] text-[14px] leading-none">
                  Unbonding
                </span>
                <span className="text-[26px]">Coming soon</span>
              </div>
              <div className="flex flex-col flex-1 space-y-[10px]">
                <span className="text-[#666] text-[14px] leading-none">
                  Slashed
                </span>
                <span className="text-[26px]">Coming soon</span>
              </div>
            </div>
          </div>
        </Card>

        <div>
          <div className="ml-[20px]">
            <h3 className="font-ArialBold text-[24px] pt-[20px]">Overview</h3>
            <p className="text-muted-foreground">
              Latest {pn} from a total of {page.total} transactions
            </p>
          </div>
          <div className="mt-[20px]">
            <DataTable
              loading={loading}
              columns={columns}
              data={stakerState?.delegations || []}
              total={page.total}
              pageSize={pn}
              onPageSizeChange={setPn}
              onChange={(page) => {
                setPage((p) => {
                  return {
                    ...p,
                    pi: page || 1,
                    pn: p?.pn || 10,
                    total: p?.total || 0,
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
