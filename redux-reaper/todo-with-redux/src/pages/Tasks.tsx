import { AddTaskModal } from "@/module/tasks/AddTaskModal";
import TaskCard from "@/module/tasks/TaskCard";
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

const Tasks = () => {
  const tasks = useAppSelector(selectTasks);
  //   const filter = useAppSelector(selectFilter);

  console.log(tasks);

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-center font-bold text-2xl">Tasks</h1>
        <AddTaskModal />
      </div>
      <div className="space-y-5 mt-5">
    {
        tasks.map((task) => (
            <TaskCard task={task}/>
        ))
    }
      </div>
    </div>
  );
};

export default Tasks;
