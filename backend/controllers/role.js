const Role = require("../models/Role");

const getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        if (roles.length > 0) {
            return res.status(200).send(roles);
        } else {
            return res.status(404).send('Roles not found');
        }
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
}

const getRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            return res.status(200).send(role);
        } else {
            return res.status(404).send('Role not found');
        }
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
}

const createRole = async (req, res, next) => {
    try {
        if (req.body.role && req.body.role !== '') {
            const newRole = new Role(req.body);
            await newRole.save();
            return res.status(201).send('Role created successfully');
        } else {
            return res.status(400).send('Bad request');
        }
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }

}

const updateRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            const updatedRole = await Role.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            return res.status(200).send('Role updated successfully');
        } else {
            return res.status(400).send('Role not found');
        }
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

const deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findById({ _id: req.params.id });
        if (role) {
            await Role.findOneAndDelete({ _id: req.params.id })
            res.status(200).send('Role deleted successfully')
        } else {
            res.status(404).send('Role not found');
        }

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }

}

module.exports = { getRole, getAllRoles, createRole, updateRole, deleteRole }