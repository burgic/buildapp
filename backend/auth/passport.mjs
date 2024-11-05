import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../models/index.mjs';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.Admin.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let admin = await db.Admin.findOne({ where: { googleId: profile.id } });
        if (admin) {
          return done(null, admin);
        } else {
          admin = await db.Admin.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          });
          return done(null, admin);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
