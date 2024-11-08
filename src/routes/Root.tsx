import { Toaster } from "react-hot-toast";
import { Toaster as ToasterUI } from "@/components/ui/sonner";

import Nav from "./../components/Layout/Nav";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import topBg from "@/assets/imgs/topBg.png";
import Card from "@/components/Card";
import "./root.less";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loading";
import { validateAddress } from "@/lib/bitcoin/utils";
import { errorToast } from "@/components/Toast";

const Root = () => {
  const { address: addressParam } = useParams();
  const navigate = useNavigate();

  const isHome = location.hash === "#/";
  const [address, setAddress] = useState(addressParam);
  const loading = useLoadingStore((state) => state.loading);

  useEffect(() => {
    setAddress('')
  }, [])

  const onSearch = () => {
    if (!validateAddress(address || '')) {
      errorToast('Invalid address');
      return;
    }
    navigate(`/address/${address}`);
  };

  return (
    <div className="h-full relative">
      <Toaster />
      <ToasterUI position="top-center" />
      <Nav />

      <div className="flex flex-1 min-h-screen overflow-auto">
        <div className="flex-1 min-w-[1120px] !pb-0 !pt-0 overflow-x-hidden">
          <div className="h-full w-full relative overflow-y-auto pt-[60px] max-md:pt-0">
            {!isHome && <div className="max-w-[1360px] px-[40px] pt-[30px] absolute z-10"><ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} /></div>}
            <div className="h-[300px] items-center justify-center relative flex flex-col">
              <img
                src={topBg}
                className="h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0"
              />
              <Link className="relative z-10" to="/">
                <h2 className="text-[50px] font-Condensed">
                  Babylon Staking Explorer
                </h2>
              </Link>
              <Card
                bodyClassName="!px-0 !py-0 w-[840px] h-[56px] rounded-[8px] overflow-hidden"
                className="!rounded-[8px]"
              >
                <div className="relative h-full bg-background">
                  <Input
                    className="border-none h-full pl-[38px] pr-[60px] text-[18px]"
                    placeholder="Search address"
                    wrapClassName="h-full"
                    value={address}
                    onChange={(evt) => setAddress(evt.target.value)}
                  />
                  <Search className="w-[16px] absolute left-3 top-[50%] translate-y-[-50%]" />
                  <Button
                    className="w-[46px] h-[46px] absolute right-1 top-[50%] translate-y-[-50%]"
                    onClick={onSearch}
                  >
                    <Search className="w-[16px]" />
                  </Button>
                </div>
              </Card>
            </div>
            <div className="max-w-[1360px] px-[40px] pb-[60px] mx-auto">
            
              {loading && (
                <div className="!absolute z-[100] !left-[50%] !top-[50%] !translate-x-[-50%] !translate-y-[-50%]">
                  <span className="loader"></span>
                </div>
              )}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
