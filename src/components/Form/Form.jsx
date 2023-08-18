import { useTheme } from "../../ThemeContext";
import { useState } from "react";
import { useData } from "../../DataContext";
import "./Form.css";

const Form = () => {
  const [userInput, setUserInput] = useState("");
  const [todoItems, setTodoItems] = useData();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput !== '') {
      const newTodoItem = {
        id: new Date().getTime(),
        completed: false,
        content: userInput
      }
      setTodoItems([...todoItems, newTodoItem])
      setUserInput('')
    }
  };

  const { isDark } = useTheme();
  return (
    <form
      className={isDark ? "todo-form dark" : "todo-form"}
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="todo-input">
        <span className="circle"></span>
      </label>
      <input
        type="text"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        id="todo-input"
        placeholder="Destroy a new todo..."
      />
    </form>
  );
};
export default Form;
