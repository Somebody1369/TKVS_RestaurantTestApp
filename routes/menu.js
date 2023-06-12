const { Router } = require("express");
const Menu = require("../models/Menu");
const router = Router();

router.get("/", async (req, res) => {
  const menu = await Menu.find({});

  res.render("index", {
    title: "Menu",
    isIndex: true,
    menu,
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create menu item",
    isCreate: true,
  });
});

router.get("/cart", async (req, res) => {
  const menu = await Menu.find({});

  res.render("cart", {
    title: "Cart",
    isCart: true,
    menu,
  });
});

router.post("/create", async (req, res) => {
  const menu = new Menu({
    title: req.body.title,
    price: req.body.price,
  });

  await menu.save();
  res.redirect("/");
});

router.post("/inCart", async (req, res) => {
  const menu = await Menu.findById(req.body.id);

  menu.inCart = !!req.body.inCart;
  menu.amount = parseInt(req.body.amount);

  await menu.save();

  res.redirect("/");
});

router.post("/inCartCartPage", async (req, res) => {
  const menu = await Menu.findById(req.body.id);

  menu.inCart = !!req.body.inCart;
  menu.amount = parseInt(req.body.amount);

  await menu.save();

  res.redirect("/cart");
});

module.exports = router;
