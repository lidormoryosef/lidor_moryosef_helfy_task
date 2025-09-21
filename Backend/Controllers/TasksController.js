
const tasksService = require('../Services/TasksService');
const service = tasksService;

function addTask(request,response){
    const task = service.addTask(request.body);
    if(task === null ){
        response.status(400).send();
    }else{
        response.status(200).send(task);
    }
}
function getAllTasks(request,response){
    const tasks = service.getAllTasks();
    if(tasks === null ){
        response.status(500).send();
    }else{
        response.status(200).send(tasks);
    }
}
function updateTask(request,response){
    const success = service.updateTask(request.params.id, request.body);
    if(success === null){
        response.status(400).send();
    }else if (deleted){
        response.status(200).send();
    }else{
        response.status(404).send();
    }
}
function deleteTask(request,response){
    const deleted = service.deleteTask(request.params.id);
    if(deleted === null){
        response.status(400).send();
    }else if (deleted){
        response.status(200).send();
    }else{
        response.status(404).send();
    }
}
function toggleTask(request,response){
    const toggled = service.toggleTask(request.params.id);
    if(toggled === null){
        response.status(400).send();
    }else if(toggled){
        response.status(200).send();
    }else{
        response.status(404).send();
    }
}
module.exports = {addTask,getAllTasks,updateTask,deleteTask,toggleTask};
