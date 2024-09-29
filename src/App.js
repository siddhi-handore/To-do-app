import React, { useState, useEffect } from "react";

function App() {
  const [date, setDate] = useState(new Date());
  const [Input, setInput] = useState(false);
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    var timer = setInterval(() => {
      setDate(new Date());
    }, 86400000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  function ToggleTask() {
    setInput(!Input);
  }
  function Blink(e) {
    setTask(e.target.value);
  }
  function Invisible(e) {
    if (e.key === "Enter" && task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
      setInput(!Input);
    }
  }
  function finish(index)
   {
    const NewCompTasks = [...completedTasks];
    NewCompTasks[index] = !NewCompTasks[index];   // Toggles true/false for the task's completion status
    setCompletedTasks(NewCompTasks);
   }
   function deleteTask(index)
   {
    const updatedTasks = tasks.filter((_, i) => i !== index);  // Remove task at index
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);  // Update completion list
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
   }
  return (
    <>
      <div className="box">
        <div className="top">
          <div class="top-left">
            <h1>Today's Task</h1>
            <h2>{date.toDateString()}</h2>
          </div>
          <button onClick={ToggleTask}>+ New Task</button>
        </div>
        {Input && (
          <input
            type="text"
            onChange={Blink}
            onKeyDown={Invisible}
            placeholder="Enter task"
          ></input>
        )}
        <div className="AddTask">
        {tasks.map((TaskItem, index) => (
          <div key={index} style={{
            "background-color": !Input ? "#ffff": 
            "rgb(222, 214, 214)"
          }}>
              <h1 key={index} onClick={()=> finish(index)} style={{
                textDecoration: completedTasks[index] ? "line-through" : "none",   // Adds line-through if task is completed
                cursor: "pointer",   // Changes cursor to pointer
                opacity: completedTasks[index] ? 0.4 : 1 
              }}>👉{TaskItem}</h1>
            <button onClick={()=> deleteTask(index)}>x</button>
          </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default App;
