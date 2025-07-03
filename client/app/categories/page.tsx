import { instance } from "@/api/axios.api";

import { ICategory } from "@/types/types";
import { getCookieTokenAction } from "../actions";

import CategoriesPage from "../components/CategoriesPage";

const Categories = async () => {
  const token = await getCookieTokenAction();
  const { data: categories } =
    await instance(token).get<ICategory[]>("/categories");

  return <CategoriesPage categories={categories} />;
};

export default Categories;
