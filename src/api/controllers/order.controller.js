const httpStatus = require('http-status');
const moment = require('moment-timezone');
const logger = require('../../config/logger');
const path = require('path');
const Order = require('../models/order.model');

const uploadDir = path.join(__dirname, '/..', '/..', '/..', '/uploads/');
const fs = require('fs');

exports.createOrder = async (req, res, next) => {
  try {
    const { productCode, userCode, address } = req.body
    const lastOrderNumber = await Order.count({});
    const orderNumber = lastOrderNumber + 1
    const dataToSave = {
      orderNumber,
      productCode,
      userCode,
      address
    };
    console.log('dataToSave===>', dataToSave);
    const order = await new Order(dataToSave).save();
    res.status(httpStatus.CREATED);

    return res.json({ success: true, data: order, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
    next(error)
  }
}

exports.updateOrder = async (req, res, next) => {
  try {
    console.log('updateOrder');
    const dataToUpdate = Object.assign(req.body);
    dataToUpdate.lastUpdate = new Date();
    const { id } = req.params;
    console.log('id', id)
    console.log('dataToUpdate===>', dataToUpdate);
    const order = await Order.update(id, dataToUpdate);
    if (!order) {
      res.json({ success: true, message: { en: 'Data not found.', th: 'ไม่พบข้อมูล' } });
    }
    const newOrder = await Order.getById(id);
    res.json({ success: true, data: newOrder, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
      next(error);
  }
}

exports.removeOrder = async (req, res, next) => {
  try {
    console.log('deleteOrder');
    const { id } = req.params;
    const order = await Order.remove(id);
    res.json({ success: true, data: order, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
    next(error);
  }
}

exports.listOrder = async (req, res, next) => {
  try {
    const orderList = await Order.list(req.query)
    return res.json({ success: true, data: orderList, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
    next(error)
  }
}
