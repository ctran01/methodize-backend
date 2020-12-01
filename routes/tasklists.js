const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { TaskList, Task } = require("../db/models");
const router = express.Router();

//Authenticates user before being able to use API
// router.use(requireAuth);

//get all tasklists
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const tasklists = await TaskList.findAll({});

    res.json(tasklists);
  })
);

//get all tasks for tasklist
router.get(
  "/:id/tasks",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;
    const tasks = await Task.findAll({
      where: {
        tasklist_id: tasklist_id,
      },
    });
    res.json(tasks);
  })
);

//Create task to tasklist
router.post(
  "/:id/task",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;
    const {
      name,
      projectId,
      assigneeId,
      due_date,
      completed,
      description,
    } = req.body;
    const task = await Task.create({
      name: name,
      project_id: projectId,
      assignee_id: assigneeId,
      due_date: due_date,
      completed: completed,
      description: description,
      tasklist_id: tasklist_id,
    });
    if (!task) {
      res.status(404);
    } else {
      res.json(task).status(201);
    }
  })
);

//Delete TaskList
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;

    const tasklist = await TaskList.delete({
      where: { id: tasklist_id },
    });
    res.json(202);
  })
);

module.exports = router;
