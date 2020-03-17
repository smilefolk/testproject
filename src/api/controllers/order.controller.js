const httpStatus = require('http-status');
const moment = require('moment-timezone');
const logger = require('../../config/logger');
const path = require('path');
const Test = require('../models/test.model');

const uploadDir = path.join(__dirname, '/..', '/..', '/..', '/uploads/');
const fs = require('fs');

exports.createOrder = async (req, res, next) => {
  try {
    const { username, password, fname, lname, role } = req.body
    const verifyTest = await Test.findOne({ username });
    if (verifyTest) {
      res.status(httpStatus.CONFLICT);
      return res.json({ success: false, data: {}, message: { en: 'UserName is duplicate', th: 'ชื่อผู้ใช้ซ้ำ' } });
    }
    const dataToSave = {
      username,
      password,
      fname,
      lname,
      role,
      created: new Date(),
      lastUpldate: new Date(),
    };
    console.log('dataToSave===>', dataToSave);
    const user = await new Test(dataToSave).save();
    res.status(httpStatus.CREATED);

    return res.json({ success: true, data: user, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
    next(error)
  }
}

exports.updateOrder = async (req, res, next) => {
    try {
      const { username, password, fname, lname, role } = req.body
      const verifyTest = await Test.findOne({ username });
      if (verifyTest) {
        res.status(httpStatus.CONFLICT);
        return res.json({ success: false, data: {}, message: { en: 'UserName is duplicate', th: 'ชื่อผู้ใช้ซ้ำ' } });
      }
      const dataToSave = {
        username,
        password,
        fname,
        lname,
        role,
        created: new Date(),
        lastUpldate: new Date(),
      };
      console.log('dataToSave===>', dataToSave);
      const user = await new Test(dataToSave).save();
      res.status(httpStatus.CREATED);
  
      return res.json({ success: true, data: user, message: { en: 'Success', th: 'สำเร็จ' } });
    } catch (error) {
      next(error)
    }
}

exports.removeOrder = async (req, res, next) => {
    try {
      const { username, password, fname, lname, role } = req.body
      const verifyTest = await Test.findOne({ username });
      if (verifyTest) {
        res.status(httpStatus.CONFLICT);
        return res.json({ success: false, data: {}, message: { en: 'UserName is duplicate', th: 'ชื่อผู้ใช้ซ้ำ' } });
      }
      const dataToSave = {
        username,
        password,
        fname,
        lname,
        role,
        created: new Date(),
        lastUpldate: new Date(),
      };
      console.log('dataToSave===>', dataToSave);
      const user = await new Test(dataToSave).save();
      res.status(httpStatus.CREATED);
  
      return res.json({ success: true, data: user, message: { en: 'Success', th: 'สำเร็จ' } });
    } catch (error) {
      next(error)
    }
}

exports.listOrder = async (req, res, next) => {
    try {
      const { username, password, fname, lname, role } = req.body
      const verifyTest = await Test.findOne({ username });
      if (verifyTest) {
        res.status(httpStatus.CONFLICT);
        return res.json({ success: false, data: {}, message: { en: 'UserName is duplicate', th: 'ชื่อผู้ใช้ซ้ำ' } });
      }
      const dataToSave = {
        username,
        password,
        fname,
        lname,
        role,
        created: new Date(),
        lastUpldate: new Date(),
      };
      console.log('dataToSave===>', dataToSave);
      const user = await new Test(dataToSave).save();
      res.status(httpStatus.CREATED);
  
      return res.json({ success: true, data: user, message: { en: 'Success', th: 'สำเร็จ' } });
    } catch (error) {
      next(error)
    }
}
