import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    progressClassName: "notifySuccess",
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: {
      background: "#0f172a",
      color: "#7979fe",
      padding: "12px 16px",
      fontWeight: "500",
    },
  });
};

export const notifyError = (message: string = "Unknown error occured.") => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
