import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from '../models/index.mjs';

// Make sure to load environment variables
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract JWT from Authorization header
  secretOrKey: process.env.JWT_SECRET,  // Use the secret key from environment variables
};

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await db.User.findByPk(jwt_payload.id);  // Assuming you have a User model to find the user by ID
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(strategy);
