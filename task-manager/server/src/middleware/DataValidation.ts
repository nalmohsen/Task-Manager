import { body, param, query } from 'express-validator'

// Validation middleware for 'registerUser' && 'login' API
const validateUser = [
   body('email')
      .notEmpty().withMessage('Email must not be empty')
      .isEmail().withMessage('Invalid email format'),
   body('password')
      .notEmpty().withMessage('Password must not be empty')
      .isString().withMessage('Password must be a string')
]


// Validation middleware for 'createTask' API
const validateCreateTaskApi = [
   body('task').notEmpty().isString().withMessage('Task must be a non-empty string'),
   body('dateScheduled').notEmpty().isString().withMessage('Date scheduled must be a non-empty string')
];


// Validation middleware for 'getTasks' API
const validateGetTaskApi = [
   query('query')
      .optional()
      .isIn(['My Day', 'Importance', 'Planned', 'Completed', 'Overdue', 'Tasks'])
      .withMessage('Invalid query parameter'),
   query('sort')
      .optional()
      .isIn(['isImp', 'dateScheduled', 'createdAt','Sort'])
      .withMessage('Invalid sort parameter')
]


// Validation middleware for 'updateTask' API
const validateUpdateTaskApi = [
   body('task').optional().isString().withMessage('Task must be a string'),
   body('dateScheduled').optional().isString().withMessage('Date scheduled must be a string'),
   param('taskId').notEmpty().isInt().withMessage("Invalid taskId")
];

export { validateUser, validateCreateTaskApi, validateGetTaskApi, validateUpdateTaskApi }
