import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
      ...req.body,
      password: hash,
    })
    await newUser.save()
    res.status(200).send('user has been craeted ')
  } catch (error) {
    next(error)
  }
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'user not found'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordCorrect)
      return next(createError(401, 'wrong password or username'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    )
    const { isAdmin, password, ...otherProperty } = user._doc
    res.cookie('access_token', token, { httpOnly: true })
    res.status(200).json({details: {...otherProperty} ,isAdmin})
  } catch (error) {
    next(error)
  }
}
