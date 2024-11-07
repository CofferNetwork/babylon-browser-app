import clsx from "clsx";
import styles from "./index.module.less";
import { PropsWithChildren } from "react";

type Props = {
  bodyClassName?: string;
  className?: string;
  vertical?: boolean;
  onClick?: () => void;
};

const Card = (props: PropsWithChildren<Props>) => {
  return (
    <div
      className={clsx(styles.card, "rounded-[20px] max-md:rounded-[9px]", props.className, {
        [styles.verticalCard]: props.vertical,
      })}
      onClick={props.onClick}
    >
      <div className={clsx("px-[20px] py-[30px] max-md:py-[20px] max-md:px-[10px]", props.bodyClassName)}>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
