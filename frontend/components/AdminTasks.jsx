import { useState } from "react";
import "../styles/admintasks.css";
import { FaTrash } from "react-icons/fa";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AdminTodo from "./AdminTodo";

function AdminTasks({ tasks, setTasks }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const getTaskPosition = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPosition(active.id);
      const newPos = getTaskPosition(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const addTask = () => {
    const newId = tasks.length + 1;
    const newTask = { id: newId, title: newTaskTitle };
    setTasks((tasks) => [...tasks, newTask]);
    setNewTaskTitle("");
  };

  return (
    <div className="todo-content">
      <div className="columns">
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <div className="todo-column1">
            <h1>Todo</h1>
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <AdminTodo id={task.id} title={task.title} key={task.id} />
              ))}
            </SortableContext>
          </div>
          <div className="todo-column2">
            <h1>Ongoing</h1>
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {/* <div className="taskDiv"></div> */}
            </SortableContext>
          </div>
          <div className="todo-column3">
            <h1>Completed</h1>
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {/* <div className="taskDiv"></div> */}
            </SortableContext>
          </div>
          <div className="deleteField">
            <FaTrash />
          </div>
        </DndContext>
      </div>
      <div className="addTask">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
    </div>
  );
}

export default AdminTasks;
