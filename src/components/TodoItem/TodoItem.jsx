import "./TodoItem.css";
import { useState, useEffect } from "react";
import { useData } from "../../DataContext";

const TodoItem = ({ id, content, completed}) => {
  const [checked, setChecked] = useState(completed);
  const [todoItems, setTodoItems] = useData();

  const deleteItem = () => {
    const editedTodoItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(editedTodoItems)
  }
  
  useEffect(() => {
    const newTodoItems = todoItems.map((item) => {
      if (item.id === id) {
        item.completed = checked;
      }
      return item;
    });
    setTodoItems(newTodoItems);
  }, [checked]);

  return (
    <li>
      <div className="wrapper">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked)
          }}
          className="circle"
        />
        <p className={`content ${completed ? "completed" : ""}`}>{content}</p>
      </div>
      <button className="delete-btn" onClick={deleteItem}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </li>
  );
};
export default TodoItem;
