import clsx from "clsx";
import { Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { toast } from "@/components/Toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AddressExternalLink from "../AddressExternalLink";

export type Props = {
  address?: string;
  className?: string;
};

const AddressView = ({ address, className }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center max-md:flex max-md:flex-col",
        className
      )}
    >
      <div className="bg-white p-[8px] flex w-[150px] max-md:w-[100px] h-[150px] max-md:h-[100px] items-center justify-center">
        {address && <QRCode value={address} size={256} />}
      </div>
      <div className="ml-[24px] text-[14px] max-md:ml-0 max-md:mt-6 space-y-4">
        {/* <div className="w-full">
          <p className="text-muted-foreground">Multisig Wallet Name</p>
          <div className="text-[14px] mt-[4px]">
            {
              multisig?.name
            }
            <span className="pl-2">({multisig?.threshold} of {multisig?.participants.length})</span>
          </div>
        </div> */}
        <div>
          <p
            className="text-muted-foreground"
            data-clipboard-text={address}
            id="addressView"
          >
            Address
          </p>
          <div className="mt-[4px] max-md:mt-1 flex items-center max-md:min-w-[260px]">
            <AddressExternalLink content={address} />
            <div>
              <CopyToClipboard
                text={address || ""}
                onCopy={() => toast("Address copied to clipboard")}
              >
                <Copy className="w-[16px] ml-3 cursor-pointer hover:scale-110 transition-all" />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressView;
