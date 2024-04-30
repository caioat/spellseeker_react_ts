import { useState } from "react";
import styled from "styled-components";

type InputSearchDropdownOptionsProp = {
  searchFunction: (param: string) => Promise<string[]>;
  selectionCallback: (param: string) => void;
};

export const InputSearchDropdownOptions = ({
  searchFunction,
  selectionCallback,
}: InputSearchDropdownOptionsProp) => {
  const [dropdownContent, setDropdownContent] = useState<string[]>([]);

  let inputTimeout: NodeJS.Timeout;

  const execSearchFunction = async (searchInput: string) => {
    if (searchInput.length > 0) {
      clearTimeout(inputTimeout);

      inputTimeout = setTimeout(async () => {
        const searchResult = await searchFunction(searchInput);
        setDropdownContent(searchResult);
      }, 600);
    } else {
      clearTimeout(inputTimeout);
      setDropdownContent([]);
    }
  };

  return (
    <>
      <SearchInput
        type="text"
        onChange={(e) => execSearchFunction(e.target.value)}
      />
      <SearchDropdown content={dropdownContent}>
        {dropdownContent?.map((data) => (
          <SearchDropdownItem
            key={data}
            onClick={() => selectionCallback(data)}
          >
            {data}
          </SearchDropdownItem>
        ))}
      </SearchDropdown>
    </>
  );
};

const SearchInput = styled.input`
  width: 350px;
  padding: 10px;
  border: 1px solid rgb(73 90 143);
  border-radius: 20px;
  background-color: rgb(55 68 107);
  color: #ffffff;

  &:focus {
    outline: none !important;
    border: 1px solid rgb(15 186 129);
  }
`;

const SearchDropdown = styled.div<{ content: string[] }>`
  position: relative;
  display: ${(props) => (props.content.length > 0 ? "block" : "none")};
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  width: fit-content;
  max-height: 200px;
  overflow: auto;
`;

const SearchDropdownItem = styled.p`
  padding: 5px;
  cursor: pointer;
  margin: 0px;

  &:hover {
    background-color: rgb(15 186 129);
  }
`;
