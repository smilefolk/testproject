const httpStatus = require('http-status');
const moment = require('moment-timezone');
const logger = require('../../config/logger');
const path = require('path');
const Product = require('../models/product.model');

const uploadDir = path.join(__dirname, '/..', '/..', '/..', '/uploads/');
const fs = require('fs');

exports.createProduct = async (req, res, next) => {
  try {
    const { productCode, productName } = req.body
    const verifyProduct = await User.findOne({ productCode });
    if (verifyProduct) {
      res.status(httpStatus.CONFLICT);
      return res.json({ success: false, data: {}, message: { en: 'productCode is duplicate', th: 'รหัสใช้ซ้ำ' } });
    }
    const dataToSave = {
      productCode,
      productName,
    };
    console.log('dataToSave===>', dataToSave);
    const product = await new Product(dataToSave).save();
    res.status(httpStatus.CREATED);

    return res.json({ success: true, data: product, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    console.log('updateProduct');
    const dataToUpdate = Object.assign(req.body);
    dataToUpdate.lastUpdate = new Date();
    const { id } = req.params;
    console.log('id', id)
    console.log('dataToUpdate===>', dataToUpdate);
    const product = await Product.update(id, dataToUpdate);
    if (!product) {
      res.json({ success: true, message: { en: 'Data not found.', th: 'ไม่พบข้อมูล' } });
    }
    const newProduct = await Product.getById(id);
    res.json({ success: true, data: newProduct, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
      next(error);
  }
}

exports.removeProduct = async (req, res, next) => {
  try {
    console.log('deleteProduct');
    const { id } = req.params;
    const product = await Product.remove(id);
    res.json({ success: true, data: product, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
      next(error);
  }
}

exports.listProduct = async (req, res, next) => {
  try {
    const productList = await Product.list(req.query)
    return res.json({ success: true, data: productList, message: { en: 'Success', th: 'สำเร็จ' } });
  } catch (error) {
    next(error)
  }
}
