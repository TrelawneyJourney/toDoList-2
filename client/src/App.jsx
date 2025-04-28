import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { SERVER_URL } from "../config";

function App() {
  const userEmail = "anto@gmail.com";
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/todos/${userEmail}`);
      const json = await response.json();
      console.log(json);
      setTasks(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => getData, []);
  console.log(tasks);

  //sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="w-dvw min-h-screen flex justify-center items-start pt-12 px-4">
      <div className="w-dvw max-w-4xl">
        <div className="app">
          <ListHeader listName={"🏝️ Holiday tick list"} getData={getData} />

          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
