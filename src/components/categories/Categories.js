/* imports */
import { useEffect, useState } from "react";
import {
  getLocalLists,
  getList,
  getCategories,
} from "../../managers/APIManager";
import { Category } from "./Category";

/* component function */
export const Categories = ({ setCategory, setCategoryId, exportSelected }) => {
  /* useState, set categories from API to state */
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState(null);
  const showCategoryButtons = () => {
    return (
      <section>
        <h1>Categories</h1>
        <h2>Choose a category</h2>
        {/* map categories, create button for each category */}
        {categories.map((category) => {
          return (
            /* on button click, set chosen category to the current category */
            <button
              key={`category--${category.id}`}
              onClick={() => {
                setChosenCategory(category)
              }}
            >
              {category.name}
            </button>
          );
        })}
      </section>
    );
  };

  /* useEffect, on initial state, getCategories from API */
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);
  return (
    <>
    {/* if categoryChosen is null, display category buttons, else display category element */}
      {chosenCategory === null ? (
        showCategoryButtons()
      ) : (
        <Category clearChosenCategory={setChosenCategory} chosenCategory={chosenCategory}/>
      )}
    </>
  );

  // /* use state */
  // const [categories, setCategories] = useState([]);
  // const [isLoading, updateLoading] = useState(false);
  // const [isSelected, updateSelected] = useState(false);

  // /* use effect - initial state */
  // useEffect(() => {
  //   getLocalLists().then(setCategories);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <>
  //       <h1>loading...</h1>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       {!isSelected ? (
  //         <>
  //           <h2>Categories</h2>
  //           <h3>Choose A Category</h3>

  //           <section className="categories__buttons">
  //             {categories.map((category) => {
  //               return (
  //                 <button
  //                   key={`category--${category.id}`}
  //                   onClick={() => {
  //                     updateLoading(true);
  //                     getList(category.id).then((data) => {
  //                       setCategory(data);
  //                       setCategoryId(category.id);
  //                       updateSelected(true);
  //                       exportSelected(true);
  //                       updateLoading(false);
  //                     });
  //                   }}
  //                 >
  //                   {category.name}
  //                 </button>
  //               );
  //             })}
  //           </section>
  //         </>
  //       ) : (
  //         <button
  //           onClick={() => {
  //             setCategory({});
  //             updateSelected(false);
  //             exportSelected(false);
  //           }}
  //         >
  //           Go Back
  //         </button>
  //       )}
  //     </>
  //   );
  // }
};
