import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
import { useTheme } from "../../ThemeContext";
import { useState, useEffect } from "react";
import { useData } from "../../DataContext";

import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const TodoList = () => {
  const [todoItems, setTodoItems] = useData();
  const filterBtns = ["all", "active", "completed"];
  const { isDark } = useTheme();

  const [currentItems, setCurrentItems] = useState(todoItems);
  const [itemFilter, setItemFilter] = useState("all");

  const [itemsLeft, setItemsLeft] = useState(0)

  const [isMounted, setIsMounted] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...todoItems];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setTodoItems(newItems);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clearCompleted = () => {
    const activeItems = todoItems.filter((item) => item.completed !== true);
    setTodoItems(activeItems);
  };
  
  useEffect(() => {
    setCurrentItems(todoItems);
  }, [todoItems]);

  useEffect(() => {
    const completedItems = todoItems.filter((item) => item.completed === true);
    const activeItems = todoItems.filter((item) => item.completed !== true);
    setItemsLeft(todoItems.length - completedItems.length);

    if (itemFilter === "active") {
      setCurrentItems(activeItems);
    } else if (itemFilter === "completed") {
      setCurrentItems(completedItems);
    } else if (itemFilter === "all") {
      setCurrentItems(todoItems);
    }
  }, [itemFilter, todoItems]);

  return (
    <section className={isDark ? "todo-container dark" : "todo-container"}>
      {currentItems.length === 0  ? (
        <p className="no-items">No items</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {isMounted ? (
            <Droppable droppableId="droppableList">
              {(provided) => (
                <ul
                  className="todo-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {currentItems.map((item, index) => (
                    <Draggable
                      draggableId={String(item.id)}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TodoItem {...item} />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          ) : null}
        </DragDropContext>
      )}

      <div className="controls">
        <p>
          {itemsLeft} {itemsLeft === 1 ? "item left" : "items left"}
        </p>
        <div className="filter-btns-container">
          {filterBtns.map((filterBtn, index) => {
            return (
              <button
                type="button"
                key={index}
                className={`btn filter-btn ${
                  itemFilter === filterBtn ? "current" : ""
                }`}
                onClick={() => {
                  setItemFilter(filterBtn);
                }}
              >
                {filterBtn}
              </button>
            );
          })}
        </div>
        <button type="button" className="btn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </section>
  );
};
export default TodoList;
