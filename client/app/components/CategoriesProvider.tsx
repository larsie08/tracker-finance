"use client";

import { FC, useState } from "react";

import { ICategory } from "@/types/types";

import CategoryModal from "./CategoryModal";
import { FaPlus } from "react-icons/fa";
import CategoryItem from "./CategoryItem";

type CategoriesPageProps = {
  categories: ICategory[];
};

const CategoriesProvider: FC<CategoriesPageProps> = ({ categories }) => {
  const [visible, setVisibleModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const openModal = (id: number): void => {
    setVisibleModal(true);
    setIsEdit(true);
    setCategoryId(id);
  };

  const closeModal = () => {
    setVisibleModal(false);
    setIsEdit(false);
    setCategoryId(null);
  };

  return (
    <>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <CategoryItem
            category={category}
            key={category.title}
            openModal={openModal}
          />
        ))}
      </div>

      {/* Add Category */}

      <button
        onClick={() => setVisibleModal(true)}
        className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
      >
        <FaPlus />
        <span>Create a new category</span>
      </button>

      {/* Category Modal */}
      {visible && (
        <CategoryModal
          type={isEdit ? "patch" : "post"}
          setVisibleModal={setVisibleModal}
          closeModal={closeModal}
          id={categoryId}
        />
      )}
    </>
  );
};

export default CategoriesProvider;
