import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Attribution from "./components/Attribution/Attribution";
import { useTheme } from "./ThemeContext";
import DataProvider from "./DataContext";
function App() {
  const { isDark } = useTheme();
  return (
    <main id="app" className={isDark ? "dark-bg" : ""}>
      <div id="banner"></div>
      <section className="container">
        <Header />
        <DataProvider>
          <Form />
          <TodoList />
        </DataProvider>
      </section>
      <article className="dnd-notice">Drag and drop to reorder list</article>
      <Attribution/>
    </main>
  );
}

export default App;
