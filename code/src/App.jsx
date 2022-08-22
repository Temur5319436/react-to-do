import { useState } from "react";
import "./App.css";

function App() {
  const [toDo, setToDo] = useState("");

  const cache = JSON.parse(localStorage.getItem("todo") || "[]");
  const [toDoLists, setToDoLists] = useState(cache);

  const handlerAddToDo = () => {
    if (toDo == "") return;

    setToDoLists((prev) => {
      const newToDoLists = [
        ...prev,
        {
          uuid: Date.now(),
          title: toDo,
          createdAt: new Date().toJSON().replace("T", " ").substring(0, 19),
        },
      ];
      localStorage.setItem("todo", JSON.stringify(newToDoLists));

      return newToDoLists;
    });

    setToDo("");
  };

  const deleteTodoHandler = (uuid) => {
    setToDoLists((prev) => {
      const newToDoLists = prev.filter((todo) => todo.uuid !== uuid);

      localStorage.setItem("todo", JSON.stringify(newToDoLists));

      return newToDoLists;
    });
  };

  return (
    <div>
      <div className="container">
        <div className="title">
          <span>TODO</span>
        </div>

        <div className="add-to-do">
          <input
            type="text"
            placeholder="New todo"
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            onKeyDown={(e) => (e?.keyCode == 13 ? handlerAddToDo() : null)}
          />
        </div>

        <div className="clear"></div>

        <div className="to-do-list">
          <ol>
            {toDoLists.map((toDo) => (
              <li key={toDo.uuid}>
                <div>
                  <div className="header-actions">
                    <div className="to-do-created-at">
                      <span>{toDo.createdAt}</span>
                    </div>
                    <button
                      className="delete-to-do-button"
                      onClick={() => deleteTodoHandler(toDo.uuid)}
                    >
                      DELETE
                    </button>
                  </div>
                  <div className="clear"></div>
                </div>
                <hr />
                <div className="to-do-list-title">
                  <textarea value={toDo.title} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default App;
