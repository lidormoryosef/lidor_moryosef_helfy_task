const tasksModel = require('../Models/TasksModel');
const { checkValidation} = require('../Utils/Utils');
const model = tasksModel;
function addTask(task){
    let newTask = checkValidation(task);
    if(newTask !== null){
        return model.addTask(newTask);
    }
    return null;
}
function getAllTasks(){
    let tasksInDict = model.getAllTasks();
    try{
        return Object.values(tasksInDict);
    }catch(error){
        console.error("error in convert dict to array", error);
        return null;
    }  
}
function updateTask(taskId,task){
    let updateTask = checkValidation(task);
    let id = Number(taskId);
    if(updateTask !== null && !isNaN(id)){
        updateTask["id"] = id;
         return model.updateTask(taskId,updateTask);
    }
    return null;
}
function deleteTask(taskId){
    let id = Number(taskId);
    if( !isNaN(id)){
        return model.deleteTask(id);
    }
    return null;
}
function toggleTask(taskId){
    let id = Number(taskId);
    if( !isNaN(id)){
        return model.toggleTask(id);
    }
    return null;
}
module.exports = {addTask,getAllTasks,updateTask,deleteTask,toggleTask};