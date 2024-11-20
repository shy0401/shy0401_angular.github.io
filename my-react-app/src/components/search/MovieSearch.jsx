import React, { useState } from "react";
import "./MovieSearch.css";

const MovieSearch = ({ changeOptions }) => {
  const dropdowns = {
    originalLanguage: ["장르 (전체)", "Action", "Adventure", "Comedy", "Crime", "Family"],
    translationLanguage: ["평점 (전체)", "9~10", "8~9", "7~8", "6~7", "5~6", "4~5", "4점 이하"],
    sorting: ["언어 (전체)", "영어", "한국어"],
  };

  const DEFAULT_OPTIONS = {
    originalLanguage: "장르 (전체)",
    translationLanguage: "평점 (전체)",
    sorting: "언어 (전체)",
  };

  const [selectedOptions, setSelectedOptions] = useState({ ...DEFAULT_OPTIONS });
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const selectOption = (key, option) => {
    const updatedOptions = {
      ...selectedOptions,
      [key]: option,
    };
    setSelectedOptions(updatedOptions);
    setActiveDropdown(null);
    if (changeOptions) {
      changeOptions(updatedOptions);
    }
  };

  const clearOptions = () => {
    setSelectedOptions({ ...DEFAULT_OPTIONS });
    if (changeOptions) {
      changeOptions({ ...DEFAULT_OPTIONS });
    }
  };

  return (
    <div className="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      {Object.entries(dropdowns).map(([key, options]) => (
        <div className="custom-select" key={key}>
          <div
            className={`select-selected ${activeDropdown === key ? "select-arrow-active" : ""}`}
            onClick={() => toggleDropdown(key)}
          >
            {selectedOptions[key]}
          </div>
          {activeDropdown === key && (
            <div className="select-items">
              {options.map((option) => (
                <div key={option} onClick={() => selectOption(key, option)}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button className="clear-options" onClick={clearOptions}>
        초기화
      </button>
    </div>
  );
};

export default MovieSearch;
