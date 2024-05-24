import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/admintodo.css";

function AdminTodo({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="taskDiv"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {title}
    </div>
  );
}

export default AdminTodo;
