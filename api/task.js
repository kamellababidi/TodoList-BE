const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const i18n = require("i18n");
const handleSqualizerErrors = require('../errors/errors')
const Task = require('../models/task');

// @route   post api/task
// @desc    Create Task
// @access  public

router.post(
    '/',
    [],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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

      }
  );
  
  // @route   get api/task
  // @desc    get all tasks
  // @access  Public
  router.get(
    '/',
    [],
    async (req, res) => {

    }
);

  

module.exports = router;
