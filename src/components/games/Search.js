import { useState } from "react";
import { Button } from "react-bootstrap";

export const Search = ({ exportUserGuess }) => {
  /* value typed into the search field */
  const [searchValue, updateSearchValue] = useState("");

  return (
    <section className="d-flex w-50 mx-auto mb-3" >
      {/* on submit, searchValue is exported as guess, searchValue is reset */}
      <input
      className="m-1"
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
      className="m-1"
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
