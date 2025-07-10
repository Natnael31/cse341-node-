const router = require("express").Router();
const contactsController = require("../controllers/contactsController");

router.get("/", (req, res) => res.send("Hello Mongodb"));
router.get("/contacts", contactsController.getContacts);
router.get("/contacts/:id", contactsController.getSingleContact);
router.post("/contacts", contactsController.addContact);
router.put("/contacts/:id", contactsController.updateContact);
router.delete("/contacts/:id", contactsController.deleteContact);

module.exports = router;