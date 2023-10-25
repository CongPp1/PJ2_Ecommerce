const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const OauthUser = require('../server/models/oauthUser');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, cb) {
    console.log('profile', profile)
    const tokenLogin = uuidv4();
    profile.tokenLogin = tokenLogin;
    try {
      const [user, created] = await OauthUser.findOrCreate({ oauth2Id: profile.id }, {
        name: profile.displayName,
        email: profile.emails[0].value, 
        oauth2Id: profile.id,
        typeLogin: profile.provider,
        avtUrl: profile.photos[0].value,
        tokenLogin
      });
      if (!created) {
        await OauthUser.updateOne(
          { oauth2Id: profile.id },
          { tokenLogin }
        )
      }
      console.log(user);
    } catch (error) {
      console.error(error);

    }
    return cb(null, profile);
  }
)); 