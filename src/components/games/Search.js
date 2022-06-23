import { useState } from "react";

export const Search = ({ exportUserGuess }) => {
  /* value typed into the search field */
  const [searchValue, updateSearchValue] = useState("");

  return (
    <section>
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
      <button
        onClick={() => {
          exportUserGuess(searchValue);
          updateSearchValue("");
        }}
      >
        GUESS
      </button>
    </section>
  );
};
