const httpStatus = require('http-status');
const moment = require('moment-timezone');
const logger = require('../../config/logger');
const path = require('path');
const User = require('../models/user.model');

const uploadDir = path.join(__dirname, '/..', '/..', '/..', '/uploads/');
const fs = require('fs');

exports.createUser = async (req, res, next) => {
  try {
    const { userCode, firstName, lastName, email } = req.body
    const verifyUser = await User.findOne({ userCode });
    if (verifyUser) {
      res.status(httpStatus.CONFLICT);
      return res.json({ success: false, data: {}, message: { en: 'userCode is duplicate', th: 'ชื่อผู้ใช้ซ้ำ' } });
    }
    const dataToSave = {
      userCode,
      firstName,
      lastName,
      email,
    };
    console.log('dataToSave===>', dataToSave);
    const user = await new User(dataToSave).save();
    res.status(httpStatus.CREATED);

    return res.json({ success: true, data: user, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
    try {
        console.log('updateUser');
        const dataToUpdate = Object.assign(req.body);
        dataToUpdate.lastUpdate = new Date();
        const { id } = req.params;
        console.log('id', id)
        console.log('dataToUpdate===>', dataToUpdate);
        const user = await User.update(id, dataToUpdate);
        if (!user) {
          res.json({ success: true, message: { en: 'Data not found.', th: 'ไม่พบข้อมูล' } });
        }
        const newUser = await User.getById(id);
        res.json({ success: true, data: newUser, message: { en: 'Success', th: 'สำเร็จ' } });
    } catch (error) {
        next(error);
    }
}

exports.removeUser = async (req, res, next) => {
    try {
        console.log('deleteUser');
        const { id } = req.params;
        const user = await User.remove(id);
        res.json({ success: true, data: user, message: { en: 'Success', th: 'สำเร็จ' } });
    } catch (error) {
        next(error);
    }
}

exports.listUser = async (req, res, next) => {
    try {
        const userList = await User.list(req.query)
        return res.json({ success: true, data: userList, message: { en: 'Success', th: 'สำเร็จ' } });
      } catch (error) {
        next(error)
      }
}
