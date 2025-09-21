let tasks = {};
let id = 1;

function addTask(task){
    try{
        task.id = id;
        tasks[id] = task;
        id++;
        return tasks[task.id];
    }catch(error){
        console.error("error in add task to dict", error);
        return null;
    }

}
function getAllTasks(){
    return tasks;
}
function updateTask(taskId,task){
    if(taskId in tasks){
        tasks[taskId] = task;
        return true;
    }
    return false;
}
function deleteTask(taskId){
    if(taskId in tasks){
        delete tasks[taskId];
        return true;
    }else{
        return false;
    }
}
function toggleTask(taskId){
    if(taskId in tasks){
        tasks[taskId].completed = !tasks[taskId].completed;
        return true;
    }else{
        return false;
    }  
}
module.exports = {addTask,getAllTasks,updateTask,deleteTask,toggleTask};
