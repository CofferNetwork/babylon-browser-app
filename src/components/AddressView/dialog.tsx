import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";
import AddressView, { Props as AddressViewProps } from ".";

type Props = AddressViewProps & {}

const AddressViewDialog = ({ children, address, ...props }: PropsWithChildren<Props>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-auto max-w-fit">
        <DialogHeader>
          <DialogTitle>View Your QR Code</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <AddressView className="mt-[24px]" address={address} {...props} />
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressViewDialog;
