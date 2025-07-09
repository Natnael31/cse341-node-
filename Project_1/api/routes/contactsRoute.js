const router = require("express").Router();
const contactsController = require("../controllers/contactsController");

router.get("/", (req, res) => res.send("Hello Mongodb"));
router.get("/contacts", contactsController.getContacts);
router.get("/contacts/:id", contactsController.getSingleContact);
router.post("/contacts", contactsController.addContact);



module.exports = router;