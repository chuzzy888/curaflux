import { FaUserMd } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";

export const Modal = ({
  msg,
  isOpen,
  onClose,
}: {
  msg: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <main>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className=" text-center flex justify-center">
            <FaUserMd size={70} color="blue" />
          </div>
          <DialogHeader>
            <DialogDescription className=" text-xl pt-3 font-bold text-center">
              {msg}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};
