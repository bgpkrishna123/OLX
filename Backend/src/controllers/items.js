const itemModel = require("../models/item.Schema");
const userModel = require("../models/user.Schema");
const path = require("path");

const createItem = async (req, res) => {
  const { name, price, location, categories, description } = req.body;
  const image = req.file ? path.basename(req.file.path) : "";
  try {
    const item = new itemModel({
      name,
      price,
      location,
      description,
      categories,
      owner: req.user._id,
      ownerName: req.user.name,
      image,
    });
    await item.save();

    req.user.items.push(item);
    await req.user.save();

    res.status(201).send(item);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getAllUnsoldItems = async (req, res) => {
  try {
    const items = await itemModel.find({ status: "unsold" });
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemModel.findById(id);

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.send(item);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUserItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("items");
    res.send(user.items);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addToFavourites = async (req, res) => {
  const { itemId } = req.body;

  try {
    const user = await userModel.findById(req.user._id);
    const itemIndex = user.favourites.indexOf(itemId);

    if (itemIndex === -1) {
      user.favourites.push(itemId);
      await user.save();
      res.status(200).send({ message: "Item added to favourites" });
    } else {
      user.favourites.splice(itemIndex, 1);
      await user.save();
      res.status(200).send({ message: "Item removed from favourites" });
    }
  } catch (error) {
    console.error("Error updating favourites:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getUserPurchases = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("purchases");
    res.send(user.purchases);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createItem,
  getAllUnsoldItems,
  getUserItems,
  getUserPurchases,
  addToFavourites,
  getItemById,
};