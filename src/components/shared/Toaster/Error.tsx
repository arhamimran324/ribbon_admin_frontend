import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  toast.error(message);
};

export default Error;
