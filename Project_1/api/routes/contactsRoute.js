const router = require("express").Router();
const contactsController = require("../controllers/contactsController");

router.get("/", (req, res) => res.send("Hello Mongodb"));
router.get("/contacts", contactsController.getContacts);
// router.post("/contacts", contactsController.addContact);
router.get("/contacts/:id", contactsController.getSingleContact);


module.exports = router;