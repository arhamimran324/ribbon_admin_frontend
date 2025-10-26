import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface SuccessProps {
  message: string;
}

const Success = ({ message }: SuccessProps) => {
  toast.success(
    <div className="text-black">
      <p>{message}</p>
    </div>,
    {
      position: "top-center",
      autoClose: 2000,
      theme: "light",
      progress: 1,
    },
  );
};

export default Success;
