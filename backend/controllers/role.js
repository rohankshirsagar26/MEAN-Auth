const Role = require("../models/Role");
const createError = require("../utils/error");
const createSuccess = require("../utils/success");

const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        if (roles.length > 0) {
            return next(createSuccess(true, 200, 'All roles fetched successfully', roles));
        } else {
            return next(createError(404, 'Roles not found'));
        }
    } catch (err) {
        return next(createError(500, err.message));
    }
}

const getRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            return res.status(200).send(role);
        } else {
            return next(createError(404, 'Role not found'));
        }
    } catch (err) {
        return next(createError(500, err.message));
    }
}

const createRole = async (req, res, next) => {
    try {
        if (req.body.type && req.body.type !== '') {
            const newRole = new Role({ role: req.body.type });
            await newRole.save();
            return next(createSuccess(true, 201, `Role ${newRole.role} created successfully`, newRole));
        } else {
            return next(createError(500, 'Bad request'));
        }
    } catch (err) {
        return next(createError(500, err.message));
    }

}

const updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            const updatedRole = await Role.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
            return next(createSuccess(true, 201, `Role ${role.role} updated to ${req.body.role} successfully`, updatedRole));
        } else {
            return next(createError(404, 'Role not found'));
        }
    } catch (err) {
        return next(createError(500, err.message));
    }
}

const deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            await Role.findOneAndDelete({ _id: req.params.id })
            return next(createSuccess(true, 200, `Role ${role.role} deleted successfully`, role));
        } else {
            return next(createError(404, 'Role not found'));
        }

    } catch (err) {
        return next(createError(500, err.message));
    }

}

module.exports = { getRole, getAllRoles, createRole, updateRole, deleteRole }