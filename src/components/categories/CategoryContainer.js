import { useEffect, useState } from "react"
import { Categories } from "./Categories"
import { Category } from "./Category"

export const CategoryContainer = () => {
    const [selectedCategory, updateSelectedCategory] = useState({})
    
    useEffect(
        () => {
            console.log(selectedCategory);
        }, [selectedCategory]
    )
    
    return (
        <>
            <Categories setCategory={updateSelectedCategory}/>
            <Category category={selectedCategory}/>
        </>
    )
}