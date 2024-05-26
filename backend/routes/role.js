const express = require('express');
const { createRole, updateRole, getAllRoles, getRole, deleteRole } = require('../controllers/role');
const { verifyAdmin } = require('../utils/verifyToken');

const roleRouter = express.Router();

roleRouter.get('/:id', verifyAdmin, getRole);
roleRouter.get('/', verifyAdmin, getAllRoles);
roleRouter.post('/', verifyAdmin, createRole);
roleRouter.put('/:id', verifyAdmin, updateRole);
roleRouter.delete('/:id', verifyAdmin, deleteRole);



module.exports = roleRouter;