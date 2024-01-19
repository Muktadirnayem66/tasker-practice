import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultState = {
    id: crypto.randomUUID(),
    title: "Learn React JS",
    description: "I want to Learn React JS.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultState]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [taskToUpdated, setTaskToUpdated] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }

          return task;
        })
      );
    }
    handleClickClose();
  };

  const handleEditTask = (task) => {
    setTaskToUpdated(task);
    setIsShowModal(true);
  };

  const handleClickClose = () => {
    setIsShowModal(false);
    setTaskToUpdated(null);
  };
  const handleDelete = (taskId) => {
    const filteredTask = tasks.filter((task) => task.id !== taskId);
    setTasks([...filteredTask]);
  };

  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleSearch = (searchText) => {
    
    const filtered = tasks.filter((task) =>task.title.toLowerCase().includes(searchText.toLowerCase()))
    setTasks([...filtered]);
  };

  const handleFavorite = (favId)=>{
    
    // const taskIndex = tasks.findIndex((task)=> task.id === favId)
    // const newTasks =  [...tasks]
    // newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite
    // setTasks(newTasks)

    //better way

    setTasks(tasks.map((task)=>{
        if(task.id === favId){
            return {...task, isFavorite: !task.isFavorite}
        }else{
            return task;
        }
        
    }))
  }


  return (
    <section className="mb-20" id="tasks">
      {isShowModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdated={taskToUpdated}
          onClose={handleClickClose}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onShowModal={() => setIsShowModal(true)}
            onDeleteAllTask={handleDeleteAllTask}
          />
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDelete}
            onFav={handleFavorite}
          />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
