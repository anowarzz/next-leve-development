import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  deleteTask,
  toogleCompleteState,
} from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import type { ITask } from "@/types";
import { Trash2 } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import { selectUsers } from "@/redux/features/user/userSlice";

export interface IProps {
  task: ITask;
}



const TaskCard = ({ task }: IProps) => {
  const dispatch = useAppDispatch();


const users = useAppSelector(selectUsers)


const assignedUser = users.find((user) => user.id === task.assignedTo);


  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={cn("size-3 rounded-full", {
              "bg-green-500": task.priority === "low",
              "bg-yellow-500": task.priority === "medium",
              "bg-red-500": task.priority === "high",
            })}
          ></div>
          <h1 className={cn({ "line-through": task.isCompleted })}>
            {task.title}
          </h1>
        </div>

        <div className="flex gap-3 items-center">
          <Button
            onClick={() => dispatch(deleteTask(task.id))}
            variant="link"
            className="p-0, text-red-500"
          >
            <Trash2 />
          </Button>
          <Checkbox onClick={() => dispatch(toogleCompleteState(task.id))} />

          <EditTaskModal task={task} />
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Assigned To :{" "}
        <span className="text-orange-300">{assignedUser ? assignedUser.name : "Unassigned"}</span>
      </p>

      <p className="mt-5">{task.description}</p>
    </div>
  );
};

export default TaskCard;
