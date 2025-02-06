import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuspenseDannyPost } from "../components/utilities/Queries";
import { SuspensePostType } from "../types/SuspenseType";
import StateModal from "../components/utilities/StateModal";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [formData, setFormData] = useState<SuspensePostType>({
    name: "",
    email: "",
    password: "",
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: SuspensePostType) => SuspenseDannyPost(formData),
    onSuccess: (formData) => {
      setIsOpen(true);
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["Document"] });
      queryClient.setQueryData(["updates", { id: 5 }], formData);
    },
    onError: () => {
      setIsSubmitting(false);
      alert("An error occurred during submission.");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseStatusModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    mutation.mutate(formData);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black flex justify-center items-center w-screen h-screen">
      <div className="bg-gray-800 shadow-lg rounded-2xl justify-center flex flex-col gap-4 h-fit px-8 py-6 text-white w-[30%]">
        <h1 className="text-2xl font-bold text-center text-indigo-400">
          Submit Your Details
        </h1>
        <div className="flex items-center w-full py-2 px-3 rounded-lg border border-gray-700 gap-4">
          <div className="w-[20%] text-indigo-400">
            <h1 className="text-[16px] font-semibold">Name:</h1>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-none text-gray-300 outline-none py-2 px-4 rounded-lg bg-gray-700"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex items-center w-full text-white py-2 px-3 rounded-lg border border-gray-700 gap-4">
          <div className="w-[20%] text-indigo-400">
            <h1 className="text-[16px] font-semibold">Email:</h1>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-none outline-none py-2 px-4 rounded-lg bg-gray-700"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex items-center w-full py-2 px-3 rounded-lg border border-gray-700 gap-4">
          <div className="w-[20%] text-indigo-400">
            <h1 className="text-[16px] font-semibold">Password:</h1>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-none text-gray-400 outline-none py-2 px-4 rounded-lg bg-gray-700"
            placeholder="Enter your password"
          />
        </div>
        <div className="w-full py-3 flex justify-center items-center gap-4">
          {mutation.isSuccess && (
            <button
              className="bg-gradient-to-r cursor-pointer from-green-400 to-green-600 hover:shadow-md py-2.5 px-10 rounded-lg text-white font-semibold"
              onClick={() => {
                navigate("/");
              }}
              disabled={isSubmitting}
            >
              Home
            </button>
          )}
          <button
            className={`${
              mutation.isSuccess ? "hidden" : "block"
            } bg-gradient-to-r from-blue-400 to-blue-600 cursor-pointer hover:shadow-md py-2.5 px-10 rounded-lg text-white font-semibold`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            className={`${
              mutation.isSuccess ? "block" : "hidden"
            } bg-gradient-to-r from-purple-400 to-purple-600 hover:shadow-md cursor-pointer py-2.5 px-10 rounded-lg text-white font-semibold`}
            onClick={() => {
              navigate("/dannysuspense");
            }}
            disabled={isSubmitting}
          >
            Continue
          </button>
        </div>
      </div>
      {mutation.isSuccess && isOpen && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-4">
          <StateModal onClose={handleCloseStatusModal} type="created" />
        </div>
      )}
      {mutation.isPending && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-4">
          <StateModal onClose={handleCloseStatusModal} type="pending" />
        </div>
      )}
      {mutation.error && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-4">
          <StateModal onClose={handleCloseStatusModal} type="error" />
        </div>
      )}
    </div>
  );
};

export default Body;
