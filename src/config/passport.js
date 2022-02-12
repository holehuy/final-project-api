const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const { tokenTypes } = require('./tokens')
const { User } = require('../model')
const { jwtSecretKey } = require('../config/auth')

const jwtOptions = {
  secretOrKey: jwtSecretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid Token Type')
    }

    const user = await User.findOne({ where: { id: payload.sub } })
    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
  jwtStrategy
}
