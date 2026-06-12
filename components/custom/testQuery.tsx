"use client";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { RefreshCwIcon } from "lucide-react";
import createTodoQuery from "@/app/queryOptions/todoQuery";
const TestQuery = () => {
  const [id, setId] = useState<number>(1);
  // data never undefined
  const { data, isLoading, isFetching, refetch } = useSuspenseQuery(
    createTodoQuery(id),
  );
  // const mutation = useMutation({
  //   mutationFn: createTodo,
  // });

  // const handleAdd = () => {
  //   mutation.mutate({ todo: "Learn TanStack Query" });
  // };
  return (
    <div className="flex flex-col justify-center items-center">
      {isLoading ? (
        <RefreshCwIcon className={`${isFetching ? "animate-spin" : ""}`} />
      ) : (
        <div>
          <span key={data.id}>
            <p>{data.id}</p>
            <p>{data.todo}</p>
            <p>{data.completed ? "TRUE" : "FALSE"}</p>
            <p>{data.userId}</p>
          </span>
        </div>
      )}

      <button onClick={() => refetch()} className="p-5 border rounded-xl">
        RELOAD
      </button>
      <button onClick={() => setId(id + 1)} className="p-5 border rounded-xl">
        INCREMENT ID
      </button>
    </div>
  );
};

export default TestQuery;
