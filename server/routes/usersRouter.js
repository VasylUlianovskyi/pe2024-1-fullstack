const { Router } = require('express');
const { usersController } = require('../controllers');
const { upload } = require('../middleware');

// /api/users
const usersRouter = Router();

usersRouter
  .route('/')
  .post(upload.uploadUserPhoto, usersController.createUser)
  .get(usersController.getUsers);

usersRouter
  .route('/:userId')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .put(usersController.updateOrCreateUserById, usersController.createUser)
  .delete(usersController.deleteUserById);

usersRouter.get('/:userId/tasks', usersController.getUsersTasks);

usersRouter.patch(
  '/:userId/images',
  upload.uploadUserPhoto,
  usersController.updateImage
);

module.exports = usersRouter;
// patch - зміна
// put заміна або створення
