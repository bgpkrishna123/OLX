const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware');
const { createItem, getAllUnsoldItems, getUserItems, getUserPurchases, addToFavourites, getItemById } = require('../controllers/items');

const itemRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

itemRouter.post('/', authMiddleware, upload.single('image'), createItem); 
itemRouter.get('/:id', getItemById);
itemRouter.get('/', getAllUnsoldItems);
itemRouter.get('/user', authMiddleware, getUserItems);
itemRouter.get('/purchases', authMiddleware, getUserPurchases);
itemRouter.post('/favourites', authMiddleware, addToFavourites);

module.exports = itemRouter;
