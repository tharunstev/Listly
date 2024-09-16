/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/taskSlice";


const CompletedTasks = () => {
  const { tasks, loading, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  
  const completedTasks = tasks.filter(task => task.completed);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {
        completedTasks.map((task) => (
          <div key={task.id}>
            <h1>{task.todo}</h1>
            
          </div>
        ))
      }
    </div>
  );
};

export default CompletedTasks;
