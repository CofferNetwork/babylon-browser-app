import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Buffer } from 'buffer';


import App from "./App.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
    {/* <BitcoinWeb3ConfigProvider
      autoConnect
      wallets={[
        XverseWallet(),
        UnisatWallet(),
        OkxWallet(),
      ]}
    > */}
      <App />
    {/* </BitcoinWeb3ConfigProvider> */}
    </TooltipProvider>
  </StrictMode>
);
