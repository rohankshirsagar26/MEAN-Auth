const express = require('express');
const { createRole, updateRole, getAllRoles, getRole, deleteRole } = require('../controllers/role');

const roleRouter = express.Router();

roleRouter.get('/:id', getRole);
roleRouter.get('/', getAllRoles);
roleRouter.post('/', createRole);
roleRouter.put('/:id', updateRole);
roleRouter.delete('/:id', deleteRole);



module.exports = roleRouter;