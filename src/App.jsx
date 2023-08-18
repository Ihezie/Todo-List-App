import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Attribution from "./components/Attribution/Attribution";
import { useTheme } from "./ThemeContext";
import DataProvider from "./DataContext";
function App() {
  const { isDark } = useTheme();
  return (
    <section id="app" className={isDark ? "dark-bg" : ""}>
      <div id="banner"></div>
      <main className="container">
        <Header />
        <DataProvider>
          <Form />
          <TodoList />
        </DataProvider>
      </main>
      <p className="dnd-notice">Drag and drop to reorder list</p>
      <Attribution/>
    </section>
  );
}

export default App;
