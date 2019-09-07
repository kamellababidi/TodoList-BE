const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const i18n = require("i18n");
const params = require('params');
const handleSqualizerErrors = require('../errors/errors')
const Task = require('../models/task');

// @route   post api/task
// @desc    Create Task
// @access  public

router.post(
    '/',
    [
        check('title', i18n.__('%s is required', 'title'))
            .not()
            .isEmpty(),
        check('description', i18n.__('%s is required', 'description'))
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description } = req.body;
      
      try {
  
        let task = new Task({
            title,
            description
        });
  
        task = await task.save()
        .catch((err) => {
          handleSqualizerErrors(err, res)
        })
        res.json({ task });
  
      } catch (err) {
        console.error(err.message);
        res.status(500).send(i18n.__('serverError'));
      }
  
    }
  );
  
  // @route   get api/task
  // @desc    get all tasks
  // @access  Public
  router.get(
      '/',
      [],
      async (req, res) => {
        await Task.findAll()
        .then((tasks) => {
          return res.status(200).json(tasks);
        })
      }
  );

  // @route   update api/task
  // @desc    update specific tasks
  // @access  Public
  router.put(
    '/:uid',
    [],
    async (req, res) => {
        await Task.update(params(req.body).only(permittedParams()), { where: {id: req.params.uid} })
        .then((task) => {
            if(task[0]) {
                return res.status(201).json({});
            } else {
                return res.status(404).json({});
            }
        })
        .catch((err) => {
            handleSqualizerErrors(err, res)
        })
    }
);
  
  // @route   delete api/task
  // @desc    delet specific tasks
  // @access  Public
  router.delete(
    '/:uid',
    [],
    async (req, res) => {
        await Task.destroy({ where: {id: req.params.uid} })
        .then((task) => {
            if(task) {
                return res.status(201).json({});
            } else {
                return res.status(404).json({});
            }
        })
        .catch((err) => {
            handleSqualizerErrors(err, res)
        })
    }
);

// permit params
function permittedParams() {
    return ['title', 'description']
}
  

module.exports = router;
