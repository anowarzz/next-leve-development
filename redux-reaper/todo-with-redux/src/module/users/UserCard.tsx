import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteUser, toggleActiveState } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types";
import { Trash2 } from "lucide-react";

interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="border px-4 py-4 rounded-md">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2
            className={`text-lg font-semibold text-center ${
              !user.isActive ? "text-gray-500" : ""
            }`}
          >
            {user.name}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div
              className={cn("w-2 h-2 rounded-full", {
                "bg-green-500": user.isActive,
                "bg-red-500": !user.isActive,
              })}
            />
            <span
              className={`text-sm ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => dispatch(toggleActiveState(user.id))}
            variant={user.isActive ? "outline" : "default"}
            size="sm"
            className="w-full text-xs py-1 h-7"
          >
            {user.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button
            onClick={() => dispatch(deleteUser(user.id))}
            variant="outline"
            size="sm"
            className="w-full text-xs py-1 h-7 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
