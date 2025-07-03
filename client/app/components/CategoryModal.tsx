"use client";

import { FC, FormEvent, useState } from "react";

import { instance } from "@/api/axios.api";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type ModalProps = {
  type: "post" | "patch";
  id: number | null;
  setVisibleModal: (visible: boolean) => void;
  closeModal: () => void;
};

const CategoryModal: FC<ModalProps> = ({
  type,
  id,
  setVisibleModal,
  closeModal,
}) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  // console.log(user?.token);

  const [title, setTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (type === "post") {
        await instance(user?.token).post("/categories", { title });
      }
      if (type === "patch") {
        await instance(user?.token).patch(`/categories/category/${id}`, {
          id,
          title,
        });
      }

      router.refresh();
      setVisibleModal(false);
    } catch (error: any) {
      console.log("Ошибка при сохранении категории:", error);
      toast.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black/50">
      <form
        className="grid w-72 gap-6 rounded-md bg-slate-900 p-5"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="title"
          className="relative flex flex-col gap-1 font-semibold"
        >
          Category title
          <input
            type="text"
            className="w-full rounded-md border-none bg-[#EEEEEE] p-2 text-black shadow-md outline-none placeholder:text-black"
            name="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
            type="submit"
          >
            {type === "patch" ? "Save" : "Create"}
          </button>
          <button
            onClick={closeModal}
            className="flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryModal;
