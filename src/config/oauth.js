const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { jwtSecret, jwtExpiresIn, jwtRefreshSecret, jwtRefreshExpiresIn } = require('./auth');

const setupOAuth = (app) => {
  app.use(passport.initialize());

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/v1/auth/google/callback',
      scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const username = profile.displayName.replace(/\s+/g, '').toLowerCase().substring(0, 50);

        let [user, created] = await User.findOrCreate({
          where: { email },
          defaults: {
            username: username + Math.floor(Math.random() * 1000),
            email,
            password: require('crypto').randomBytes(32).toString('hex'),
            role: 'user'
          }
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }));

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findByPk(id);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    });

    app.get('/api/v1/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    app.get('/api/v1/auth/google/callback',
      passport.authenticate('google', { session: false, failureRedirect: '/api/v1/auth/google/failure' }),
      (req, res) => {
        const accessToken = jwt.sign({ userId: req.user.id }, jwtSecret, { expiresIn: jwtExpiresIn });
        const refreshToken = jwt.sign({ userId: req.user.id }, jwtRefreshSecret, { expiresIn: jwtRefreshExpiresIn });

        res.status(200).json({
          success: true,
          message: 'Google OAuth login successful',
          data: {
            user: req.user,
            accessToken,
            refreshToken
          }
        });
      }
    );

    app.get('/api/v1/auth/google/failure', (req, res) => {
      res.status(401).json({
        success: false,
        message: 'Google OAuth authentication failed'
      });
    });

    console.log('Google OAuth configured successfully');
  } else {
    console.log('Google OAuth not configured (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET not set)');

    app.get('/api/v1/auth/google', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'Google OAuth is available. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env to enable.',
        configRequired: {
          GOOGLE_CLIENT_ID: 'your-google-client-id',
          GOOGLE_CLIENT_SECRET: 'your-google-client-secret',
          GOOGLE_CALLBACK_URL: '/api/v1/auth/google/callback'
        }
      });
    });
  }
};

module.exports = setupOAuth;
