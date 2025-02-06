import { useEffect } from "react";
import successimg from "../../assets/success-img.svg";
import errorimg from "../../assets/error-img.svg";

interface SuccessModalProps {
  type?: string;
  onClose: () => void;
}

const StateModal: React.FC<SuccessModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`bg-green-400 ${
        type === "error" ? "bg-[#39292C]" : "bg-brand-forest-green"
      } rounded-xl font-nunito py-5 px-6 ${
        type === "error" && "w-[460px]"
      } w-fit h-fit`}
    >
      <div className="flex items-center gap-7 h-full w-fit">
        <div className=" w-fit flex items-center justify-center h-full">
          <img src={type === "error" ? errorimg : successimg} alt="success" />
        </div>
        <div className="w-full  h-full flex flex-col gap-2">
          <h1
            className={`text-xl font-bold ${
              type === "error" ? "text-[#D82042]" : "text-black"
            } `}
          >
            {type === "error"
              ? "Error"
              : type === "pending"
              ? "Pending"
              : "Success"}
          </h1>
          {type === "error" ? (
            <p className="text-xs w-full flex  font-normal text-brand-text-white">
              Unable to connect to the network. Please check your internet
              connection and try again.
            </p>
          ) : type === "pending" ? (
            <p className="text-xs w-full flex  font-normal text-brand-text-white">
              Request Processing...
            </p>
          ) : type === "getrequest" ? (
            <p className="text-xs w-full flex  font-normal text-brand-text-white">
              The request for this application has being gotten successfully...
            </p>
          ) : (
            <p className="text-xs w-full flex  font-normal text-brand-text-white">
              The request for this application has been
              <span className="px-1">
                {type === "created" ? "created" : type === "edited" && "edited"}
              </span>
              successfully.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateModal;
