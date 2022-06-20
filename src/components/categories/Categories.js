/* imports */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalLists, getList } from "../../managers/APIManager";

/* component function */
export const Categories = ({ setCategory, setCategoryId, exportSelected }) => {
  /* use state */
  const [categories, setCategories] = useState([]);
  // const [lists, setLists] = useState([]);
  const [list, setList] = useState({});
  const [isLoading, updateLoading] = useState(false);
  const [isSelected, updateSelected] = useState(false);
  /* use effect - initial state */
  useEffect(() => {
    getLocalLists().then(setCategories);
  }, []);

  /* use effect - categories */
  /*  useEffect(() => {
    let listsFromAPI = [];
    categories.map((cat) =>
      getList(cat.id).then((list) =>
        listsFromAPI.push({ id: cat.id, list: list })
      )
    );
    setLists(listsFromAPI);
  }, [categories]); */

  /* useEffect(() => {
    const promiseArray = categories.map((cat) => getList(cat.id));
    Promise.all(promiseArray).then(setLists);
  }, [categories]); */

  /* useEffect(() => {
    console.log(lists);
  }, [lists]); */
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  } else {
    return (
      <>
        {!isSelected ? (
          <>
            <h2>Categories</h2>
            <h3>Choose A Category</h3>

            <section className="categories__buttons">
              {categories.map((category) => {
                return (
                  <button
                    key={`category--${category.id}`}
                    onClick={() => {
                      updateLoading(true);
                      getList(category.id).then((data) => {
                        setCategory(data);
                        setCategoryId(category.id);
                        updateSelected(true);
                        exportSelected(true);
                        updateLoading(false);
                      });
                      /*  const clickedList = lists.find(list => list.id === category.id)
                  setCategory(clickedList) */
                    }}
                  >
                    {category.name}
                  </button>
                );
              })}
            </section>
          </>
        ) : (
          <button
            onClick={() => {
              setCategory({});
              updateSelected(false);
              exportSelected(false);
            }}
          >
            Go Back
          </button>
        )}
      </>
    );
  }
};

/* (
  <>
   <h3>Categories</h3>
   {categories.map((category) => (
     <>
     <button
     key={`category--${category.id}`}
     type="button"
       onClick={(e) => {
         getListFromAPI(category.id)
         document.getElementById(`category--${category.id}`).innerHTML = selectedList?.items?.length
        }}
        >
        {category.name}
        </button>
        <div id={`category--${category.id}`}
        key={`categoryDiv--${category.id}`} ></div>
        </>
        ))}
        </>
        ); */
/* useEffect(() => {
          getLists().then(setCategories);
        }, []);
        
        const getListFromAPI = (listId) => {
          getSelectedList(listId).then(setSelectedList);
        }; */
