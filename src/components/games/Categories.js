import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLists, getSelectedList } from "../../managers/APIManager";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  
  const navigate = useNavigate()

  useEffect(() => {
    getLists().then(setCategories);
  }, []);

  const getListFromAPI = (listId) => {
    getSelectedList(listId).then(setSelectedList);
  };

  useEffect(() => {
  }, [selectedList]);

  return (
    <>
      <h3>Categories</h3>
      {categories.map((category) => (
        <button
          key={`category--${category.id}`}
          type="button"
          onClick={(e) => {
            console.log(category.name)
          }}
        >
          {category.name}
        </button>
      ))}
    </>
  );
};
