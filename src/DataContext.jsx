import { createContext, useContext, useState, useEffect } from "react";
import data from "./data";

const DataContext = createContext();

const getLocalStorage = () => {
  let list = localStorage.getItem("data");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const DataProvider = ({ children }) => {
  const [todoItems, setTodoItems] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <DataContext.Provider value={[todoItems, setTodoItems]}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
export default DataProvider;