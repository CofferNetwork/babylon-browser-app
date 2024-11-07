import Card from "@/components/Card";
import clsx from "clsx";
import { PropsWithChildren, useEffect, useState } from "react";
import { DataTable } from "@/components/Table/data-table";
import { stakerColumns, providerColumns } from "./columns";
import { api, V1ServiceOverallStatsPublic } from "@/lib/api/types";
import { getProvider, getStaker } from "@/lib/api";
import { Page, Provider, Staker } from "@/lib/api/type";
import { useLoading, useLoadingStore } from "@/store/loading";
import { satoshiToBTC } from "@/lib/string";

type NumericalProps = {
  unit?: string;
  className?: string;
  childrenClassName?: string;
};

const Numerical = ({
  unit,
  children,
  className,
  childrenClassName,
}: PropsWithChildren<NumericalProps>) => {
  return (
    <div className={clsx(className)}>
      <span
        className={clsx(
          "text-[#DEDEDE] leading-none text-[30px]",
          childrenClassName
        )}
      >
        {children}
      </span>
      <span className="text-[999] text-[14px] pl-[12px]">{unit}</span>
    </div>
  );
};

enum ListType {
  Staker = "Staker",
  "Finality Provider" = "Finality Provider",
}

const Index = () => {
  const [selectedTab, setSelectedTag] = useState<ListType>(ListType.Staker);
  const [stats, setStats] = useState<V1ServiceOverallStatsPublic>();
  const [pn, setPn] = useState(10);
  const [page, setPage] = useState<Page>({ pi: 1, pn, total: 0 });
  const [stackerList, setStackerList] = useState<Staker[]>([]);
  const [providerList, setProviderList] = useState<Provider[]>([]);
  const { show, hide } = useLoading();
  const loading = useLoadingStore(state => state.loading);
  const [providerCount, setProviderCount] = useState('--');

  useEffect(() => {
    getProvider({ ...page, pn })
    .then((res) => {
      setProviderCount(String(res.data?.total || 0) || '--');
    })
    
  }, [])

  useEffect(() => {
    show();

    if (selectedTab === ListType.Staker) {
      getStaker({ ...page, pn })
        .then((res) => {
          if (res.code === 200) {
            if (res.data) setPage(res.data);
            setStackerList(
              (res.data?.items || []).map((item, index) => {
                return {
                  ...item,
                  rank: (page.pi - 1) * pn + (index + 1),
                };
              })
            );
          }
        })
        .finally(() => {
          hide();
        });
    }

    if (selectedTab === ListType["Finality Provider"]) {
      getProvider({ ...page, pn })
        .then((res) => {
          if (res.code === 200) {
            if (res.data) setPage(res.data);
            setProviderList(
              (res.data?.items || []).map((item, index) => {
                return {
                  ...item,
                  rank: (page.pi - 1) * pn + (index + 1),
                };
              })
            );
          }
        })
        .finally(() => {
          hide();
        });
    }
  }, [page.pi, pn, selectedTab]);

  useEffect(() => {
    api.v1.statsList().then((res) => {
      setStats(res.data.data);
    });
  }, []);

  return (
    <div>
      <Card
        className="!rounded-[8px] overflow-hidden h-[470px]"
        bodyClassName="bg-[#202124] h-full !px-0 !pt-[20px]"
      >
        <div className="w-full flex h-[150px]">
          <div className="flex-1 h-full flex flex-col justify-center pl-[20px] space-y-[20px]">
            <p className="text-[14px]">Total Staked</p>
            <Numerical unit="BTC">{satoshiToBTC(stats?.active_tvl)}</Numerical>
            {/* <p className="text-[14px] text-[#999]">≈-- USDT</p> */}
          </div>
          <div className="flex-[3] bg-background h-full rounded-[8px] flex">
            <div className="flex-1 pt-[35px] pl-[20px] opacity-70">
              <span className="text-[14px] text-[#666]">Staker accounts</span>
              <Numerical className="pt-[14px]">
                <span className="text-primary">{stats?.total_stakers}</span>
              </Numerical>
            </div>
            <div className="flex-1 pt-[35px] pl-[20px] opacity-70">
              <span className="text-[14px] text-[#666]">Finality Provider</span>
              <Numerical className="pt-[14px]" unit="">
                <span className="text-primary">{providerCount}</span>
              </Numerical>
            </div>
            <div className="flex-1 pt-[35px] pl-[20px] opacity-70">
              <span className="text-[14px] text-[#666]">Total Fees spent(BTC)</span>
              <Numerical className="pt-[14px]" unit="">
                <span className="text-primary">Coming soon</span>
              </Numerical>
            </div>
          </div>
        </div>
        <div className="line my-[20px] w-full"></div>
        <div className="grid grid-cols-4 gap-4">
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">
              Staking transactions
            </span>

            <Numerical className="pt-[14px]">
              {stats?.stacking_transactions_count}
            </Numerical>
          </div>
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">Total points</span>

            <Numerical className="pt-[14px]">--</Numerical>
          </div>
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">
              Total Fees spent(BTC)
            </span>

            <Numerical className="pt-[14px]">--</Numerical>
          </div>
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">Total Delegations</span>

            <Numerical className="pt-[14px]">
              {stats?.total_delegations}
            </Numerical>
          </div>
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">Unbond amount</span>

            <Numerical className="pt-[14px]">{stats?.unbound_amount}</Numerical>
          </div>
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">Unbond transactions</span>

            <Numerical className="pt-[14px]">
              {stats?.unbound_transactions_count}
            </Numerical>
          </div>
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">Slash amount</span>

            <Numerical className="pt-[14px]">{stats?.slash_amount}</Numerical>
          </div>
          <div className="max-w-[325px] h-[100px] bg-[#121417] rounded-[7px] py-[10px] px-[20px] opacity-70">
            <span className="text-[14px] text-[#666]">Slash transactions</span>

            <Numerical className="pt-[14px]">
              {stats?.slash_transactions}
            </Numerical>
          </div>
        </div>
      </Card>

      <div className="my-[40px] space-x-[20px]">
        {/* <Button className="w-[200px] h-[60px] text-[18px]">Leaderboard</Button>
        <Button className="w-[200px] h-[60px] text-[18px]" variant="outline">
          Pool Stake
        </Button> */}
        <Card
          className="w-fit h-[60px] rounded-[8px] max-md:h-[30px]"
          bodyClassName="!px-[0px] !py-[0px] h-full"
        >
          <div className="flex h-full items-center">
            {[ListType.Staker, ListType["Finality Provider"]].map((value) => (
              <div
                className={clsx(
                  { "!bg-primary": selectedTab === value },
                  "w-[240px] max-md:text-[11px] text-center rounded-[8px] h-full flex items-center justify-center cursor-pointer bg-transparent transition-all"
                )}
                onClick={() => {
                  setSelectedTag(value);
                  setPage({
                    pi: 1,
                    pn,
                    total: 0,
                  })
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        {selectedTab === ListType.Staker && (
          <DataTable
            loading={loading}
            pageSize={pn}
            columns={stakerColumns}
            total={page?.total || 0}
            data={stackerList}
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
        )}

        {selectedTab === ListType["Finality Provider"] && (
          <DataTable
            loading={loading}
            pageSize={pn}
            columns={providerColumns}
            total={page?.total || 0}
            data={providerList}
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
        )}
      </div>
    </div>
  );
};

export default Index;
