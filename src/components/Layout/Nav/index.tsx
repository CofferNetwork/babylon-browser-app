import logo from "@/assets/imgs/logo.png";
import clsx from "clsx";

type Props = {
  className?: string;
}

const Nav = ({ className }: Props) => {
  return (
    <div className={clsx("h-[64px] w-full nav px-4 flex justify-between fixed bg-black z-20", className)}>
      <div className="h-full flex items-center ml-[10px]">
        <a href="https://coffer.network/">
          <img src={logo} className="w-[98px] h-[28px]" />
        </a>
      </div>
      <div className="text-[fff] flex h-full items-center">
      </div>
    </div>
  );
};

export default Nav;
