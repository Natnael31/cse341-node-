const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { getDb } = require("../models/database");

const router = express.Router();

router.get("/login", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/login-failed",
    successRedirect: "/"
}));

router.get("/login-failed", (req, res) => res.status(401).json({ message: "GitHub login failed" }));

router.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: "Logout error" });
        req.session.destroy(() => {
            return res.json({ message: "Logged out successfully" });
        });
    });
});

module.exports = router;
