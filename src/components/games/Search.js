import { useState } from "react";
import { Button } from "react-bootstrap";

export const Search = ({ exportUserGuess }) => {
  /* value typed into the search field */
  const [searchValue, updateSearchValue] = useState("");

  return (
    <section className="d-flex flex-column w-25 mx-auto" >
      {/* on submit, searchValue is exported as guess, searchValue is reset */}
      <input
        value={searchValue}
        onChange={(e) => {
          updateSearchValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            exportUserGuess(searchValue);
            updateSearchValue("");
          }
        }}
      />
      <Button
      variant="warning"
        onClick={() => {
          exportUserGuess(searchValue);
          updateSearchValue("");
        }}
      >
        GUESS
      </Button>
    </section>
  );
};
