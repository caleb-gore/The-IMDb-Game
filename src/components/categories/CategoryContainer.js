/* imports */
import { useState } from "react";
import { Categories } from "./Categories";
import { Category } from "./Category";

/* component */
export const CategoryContainer = () => {
  const [categoryId, setCategoryId] = useState("");
  const [selectedCategory, updateSelectedCategory] = useState({});
  const [isSelected, importSelected] = useState(false);

  return (
    <>
      <Categories
        setCategory={updateSelectedCategory}
        setCategoryId={setCategoryId}
        exportSelected={importSelected}
      />
      <Category
        category={selectedCategory}
        categoryId={categoryId}
        isSelected={isSelected}
      />
    </>
  );
};
