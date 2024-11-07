import { getMempoolAddressLink, getMempoolTxLink } from "@/lib/utils";
import clsx from "clsx";
import { ExternalLink } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
  content?: string;
  showExternal?: boolean;
  theme?: "gray";
  className?: string;
  afterAddress?: ReactNode;
  type?: ContentType;
};

export enum ContentType {
  Address,
  Txid,
}

const AddressExternalLink = ({
  content,
  children,
  showExternal,
  theme,
  className,
  afterAddress,
  type = ContentType.Address,
}: PropsWithChildren<Props>) => {
  const onExternalLink = () => {
    if (!content) return;
    window.open(getMempoolAddressLink(content));
  };

  const onTxIdLink = () => {
    if (!content) return;
    window.open(getMempoolTxLink(content));
  };

  return (
    <div
      className={clsx(
        "flex space-x-2 items-center max-md:break-all max-md:text-left",
        {
          "text-muted-foreground": theme === "gray",
        },
        className
      )}
    >
      <p>
        {children || content} {afterAddress}
      </p>
      {showExternal && content && (
        <ExternalLink
          onClick={() => {
            switch (type) {
              case ContentType.Address: {
                onExternalLink();
                break;
              }
              case ContentType.Txid: {
                onTxIdLink();
                break;
              }
            }
          }}
          className="w-[16px] cursor-pointer hover:scale-110 transition-all max-md:w-[16px]"
        />
      )}
    </div>
  );
};

export default AddressExternalLink;
