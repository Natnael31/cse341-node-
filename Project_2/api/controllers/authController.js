const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { getDb, ObjectId } = require("../models/database");

function configureOAuth() {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, async (accessToken, refreshToken, profile, done) => {
        const db = getDb();
        const users = db.collection("users");

        let user = await users.findOne({ githubId: profile.id });
        if (!user) {
            const newUser = {
                githubId: profile.id,
                email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
                createdAt: new Date()
            };
            const result = await users.insertOne(newUser);
            user = { ...newUser, _id: result.insertedId };
        }

        return done(null, user);
    }));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const db = require("../models/database").getDb();
            const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send("Hello guest. Please log in!");
}

module.exports = { configureOAuth, authenticate };
