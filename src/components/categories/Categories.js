/* imports */
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getLocalLists,
  getList,
  getCategories,
} from "../../managers/APIManager";
import { Category } from "./Category";

/* component function */
export const Categories = ({ setCategory, setCategoryId, exportSelected }) => {
  
  const navigate = useNavigate()
  /* useState, set categories from API to state */
  
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState(undefined);
  const showCategoryButtons = () => {
    return (
      <section style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
        <h1>Select a Category</h1>
        
        <Stack gap={2} className="mx-auto w-25"
          vertical
          
        >
          {categories.map((category) => {
            return (
              /* on button click, set chosen category to the current category */
              <Button className=""
                variant="warning"
                key={`category--${category.id}`}
                onClick={() => {
                  setChosenCategory(category);
                }}
              >
                {category.name}
              </Button>
            );
          })}
        </Stack>
        <Button className="mt-2 mx-auto w-25" variant="outline-warning" 
            onClick={() => {
              navigate("/modes")
            }}
          >
            go back
          </Button>
        {/* map categories, create button for each category */}
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
      {chosenCategory === undefined ? (
        showCategoryButtons()
      ) : (
        <Category
          clearChosenCategory={setChosenCategory}
          chosenCategory={chosenCategory}
        />
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
