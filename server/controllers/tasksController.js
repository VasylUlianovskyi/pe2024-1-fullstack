const _ = require('lodash');
const createHttpError = require('http-errors');
const { Task, User } = require('./../models');

module.exports.createTask = async (req, res, next) => {
  const { body } = req;

  try {
    const createdTask = await Task.create(body);
    const preparedTask = _.omit(createdTask.get(), ['createdAt', 'updatedAt']);

    res.status(201).send({ data: preparedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: ['nickname'],
      },
      raw: true,
    });

    res.status(200).send({ data: foundTasks });
  } catch (error) {
    next(error);
  }
};

// Get task by ID
module.exports.getTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundTask = await Task.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: ['nickname'],
      },
      raw: true,
    });

    if (!foundTask) {
      return next(createHttpError(404, 'Task not found'));
    }

    res.status(200).send({ data: foundTask });
  } catch (error) {
    next(error);
  }
};

// Update task by ID
module.exports.updateTaskById = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log('Request params:', req.params);
  console.log('Updating task with id:', id);
  console.log('Update body:', body);
  try {
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      return next(createHttpError(400, 'Invalid task ID'));
    }
    const [updatedCount, updatedTasks] = await Task.update(body, {
      where: { id: taskId },
      returning: true,
    });

    if (updatedCount === 0) {
      return next(createHttpError(404, 'Task not found'));
    }

    const updatedTask = _.omit(updatedTasks[0].get(), [
      'createdAt',
      'updatedAt',
    ]);
    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// Delete task by ID
module.exports.deleteTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await Task.destroy({ where: { id } });

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Task not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
