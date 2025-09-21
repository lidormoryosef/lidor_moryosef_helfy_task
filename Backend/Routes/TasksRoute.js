const tasksController = require('../Controllers/TasksController');
const express=require('express');
const controller = tasksController;
const router=express.Router();
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: add a new Task.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 example: Clean
 *               description:
 *                 type: string
 *                 example: clean Home.
 *               completed:
 *                  type: boolean
 *                  example: false   
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: low
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-13
 *     responses:
 *       200:
 *         description: successfully.
 *       400:
 *         description: Bad request.
 */

router.route('/').post(controller.addTask);
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: get all Tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: return all tasks.
 *       500:
 *         description: Server error
 */
router.route('/').get(controller.getAllTasks);
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: update Task.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id of task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Clean
 *               description:
 *                 type: string
 *                 example: Clean home thoroughly.
 *               completed:
 *                 type: boolean
 *                 example: true
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-13
 *     responses:
 *       200:
 *         description: successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
router.route('/:id').put(controller.updateTask);
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: delete Task.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id of task
 *     responses:
 *       200:
 *         description: successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
router.route('/:id').delete(controller.deleteTask);
/**
 * @swagger
 * /api/tasks/{id}/toggle:
 *   patch:
 *     summary: toggle status.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id of task
 *     responses:
 *       200:
 *         description: successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
router.route('/:id/toggle').patch(controller.toggleTask);

module.exports = router;