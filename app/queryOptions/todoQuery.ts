import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export default function createTodoQuery(id: number) {
  return queryOptions({
    queryKey: ["todos", id],
    queryFn: () => getTodos({ id: id }),
  });
}

const getTodos = async ({ id = 1 }: { id: number }): Promise<TodoType> => {
  try {
    const res = await axios.get<TodoType>(`https://dummyjson.com/todos/${id}`);
    if (!res.data) {
      throw new Error("No data returned from the server");
    }
    return res.data;
  } catch (err) {
    console.log("ERROR" , err);
    throw err;
  }
};

type TodoType = {
  id: number;
  todo: string;
  completed: false;
  userId: number;
};
