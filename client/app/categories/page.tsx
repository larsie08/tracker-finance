import { instance } from "@/api/axios.api";

import { ICategory } from "@/types/types";
import { getCookieTokenAction } from "../actions";

import CategoriesProvider from "../components/CategoriesProvider";

const Categories = async () => {
  const token = await getCookieTokenAction();
  const { data: categories } =
    await instance(token).get<ICategory[]>("/categories");

  return (
    <div className="mt-10 rounded-md bg-slate-800 p-4">
      <h1>Your category list:</h1>
      <CategoriesProvider categories={categories} />
    </div>
  );
};

export default Categories;
