"use client";

import { FC, FormEvent } from "react";

import { ICategory } from "@/types/types";

import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { instance } from "@/api/axios.api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type CategoryItemProps = {
  category: ICategory;
  openModal: (id: number) => void;
};

const CategoryItem: FC<CategoryItemProps> = ({ category, openModal }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await instance(user?.token).delete(`/categories/category/${category.id}`);
    router.refresh();
  };

  return (
    <div className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2">
      {category.title}
      <div className="absolute top-0 right-0 bottom-0 left-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
        <button onClick={() => openModal(category.id)}>
          <AiFillEdit />
        </button>

        <form className="flex" onSubmit={handleSubmit}>
          <input type="hidden" value={category.id} />
          <button type="submit">
            <AiFillCloseCircle />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryItem;
