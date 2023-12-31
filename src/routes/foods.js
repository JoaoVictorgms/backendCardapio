const express = require('express');
const router = express.Router();

const { celebrate, Joi, Segments } = require('celebrate');

const parser = require('../config/parser');

const middleware = require('../middleware');

const foodsController = require('../controllers/foodsController');

router.get('/', foodsController.index);
router.get('/index', foodsController.index);
router.get('/create', middleware.isAuthenticated, foodsController.getCreateForm);
router.get(
  '/delete/:id',
  middleware.isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  foodsController.getDeleteForm
);
router.get(
  '/update/:id',
  middleware.isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  foodsController.getUpdateForm
);
router.post(
  '/create',
  middleware.isAuthenticated,
  parser.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      name: Joi.string().required(),
      price: Joi.number().precision(2),
      category_id: Joi.number().integer(),
    }),
  }),
  foodsController.create
);
router.post(
  '/update',
  middleware.isAuthenticated,
  parser.single('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      name: Joi.string(),
      price: Joi.number().precision(2),
      category_id: Joi.number().integer(),
    }),
  }),
  foodsController.update
);
router.post('/delete', middleware.isAuthenticated, foodsController.destroy);

module.exports = router;
