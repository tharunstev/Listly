/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, addTask, deleteTask, updateTask } from "../redux/taskSlice";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import NewTaskDialogBox from "./NewTaskDialogBox";
import EditTaskDialogBox from "./EditTaskDialogBox";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const WhiteButton = styled(Button)`
  color: white;
  border: 1px solid white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: white;
  }
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ButtonsContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TaskContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: auto;
  }

  & .task-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    word-wrap: break-word;
    padding: 10px;
    border-radius: 5px;
    background-color: #262a4a;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
  }

  & .task-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
  }
`;

const Home = ({ input }) => {
  const { tasks, loading, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (loading)
    return (
      <Stack sx={{ width: "100%", color: "grey.500", mt: "100px" }} spacing={4}>
        <LinearProgress color="secondary" />
        <h1>WELCOME TO LISTLY...</h1>
        <LinearProgress color="secondary" />
        <h1>STREAMLINE YOUR TASKS WITH LISTLY...</h1>
        <LinearProgress color="success" />
        <h1>ORGANIZE, ACHIEVE, REPEAT WITH LISTLY...</h1>
        <LinearProgress color="inherit" />
        <h1>LISTLY PROVIDES A WAY TO ORGANIZE YOUR DAILY TASKS...</h1>
        <LinearProgress color="inherit" />
      </Stack>
    );

  if (error) return <p>Error: {error}</p>;

  const filteredTasks = tasks.filter((task) => {
    const filterTask = filter === "all" ? true : task.completed;
    const inputSearch = task.todo.toLowerCase().includes(input.toLowerCase());
    return filterTask && inputSearch;
  });

  const taskTypeHandler = (type) => {
    setFilter(type);
  };

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask))
      .then(() => {
        setSnackbarMessage("Task added successfully");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Failed to add task");
        setSnackbarOpen(true);
      });
    setOpenDialog(false);
  };

  const handleDeleteTask = (taskId) => {
    console.log("handle button is triggered");
    dispatch(deleteTask(taskId))
      .then(() => {
        setSnackbarMessage("Task deleted successfully");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Failed to delete task");
        setSnackbarOpen(true);
      });
  };

  const handleMarkAsDone = (taskId) => {
    dispatch(updateTask({ taskId, completed: true }))
      .then(() => {
        setSnackbarMessage("Well Done , You Did It ");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Failed to mark task as done");
        setSnackbarOpen(true);
      });
  };

  const handleEditTask = (taskId, updatedTodo) => {
    dispatch(
      updateTask({
        taskId,
        completed: selectedTask.completed,
        todo: updatedTodo,
      })
    )
      .then(() => {
        setSnackbarMessage("Task edited successfully");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Failed to edit task");
        setSnackbarOpen(true);
      });
    setOpenEditDialog(false);
  };

  const openEditDialogHandler = (task) => {
    setSelectedTask(task);
    setOpenEditDialog(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Container>
      <ButtonsContainer>
        {filter !== "all" && (
          <WhiteButton
            variant="outlined"
            onClick={() => taskTypeHandler("all")}
          >
            Tasks
          </WhiteButton>
        )}
        {filter !== "completed" && (
          <WhiteButton
            variant="outlined"
            onClick={() => taskTypeHandler("completed")}
          >
            Completed
          </WhiteButton>
        )}
        <WhiteButton variant="outlined" onClick={() => setOpenDialog(true)}>
          Add Task
        </WhiteButton>
      </ButtonsContainer>

      <TaskContainer>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div className="task-item" key={task.id}>
              <h1
                style={{ color: "white", fontWeight: "300", fontSize: "26px" }}
              >
                {task.todo}
              </h1>
              <div className="task-buttons">
                {!task.completed && (
                  <WhiteButton
                    variant="outlined"
                    onClick={() => handleMarkAsDone(task.id)}
                  >
                    Done
                  </WhiteButton>
                )}
                <WhiteButton
                  variant="outlined"
                  onClick={() => openEditDialogHandler(task)}
                >
                  Edit
                </WhiteButton>
                <WhiteButton
                  variant="outlined"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </WhiteButton>
              </div>
            </div>
          ))
        ) : (
          <h1>No tasks available!!...</h1>
        )}
      </TaskContainer>

      <NewTaskDialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAddTask={handleAddTask}
      />

      {selectedTask && (
        <EditTaskDialogBox
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSave={handleEditTask}
          task={selectedTask}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={action}
      />
    </Container>
  );
};

export default Home;
