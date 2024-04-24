import { useState } from "react";

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
      <input type="text" onChange={(e) => execSearchFunction(e.target.value)} />
      {dropdownContent?.map((data) => (
        <div key={data} onClick={() => selectionCallback(data)}>
          {data}
        </div>
      ))}
    </>
  );
};
