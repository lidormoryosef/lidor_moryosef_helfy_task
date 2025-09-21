const status = {"low" : "low","medium":"medium","high":"high"};
function checkValidation(task){
    newTask = {};
    if (!task || typeof task !== "object"){
        return null;
    }
    if (!("title" in task) || !("priority" in task) || typeof task.title !== "string" || !(task.priority in status)){
        return null;
    }
    newTask["title"] = task.title;
    newTask["priority"] = task.priority;
    newTask["description"] = "description" in task ? task["description"] : "";
    newTask["completed"] = "completed" in task ? task["completed"] : false;
    newTask["createdAt"] = new Date().toLocaleDateString("en-GB");
    return newTask;
}
module.exports = {checkValidation};