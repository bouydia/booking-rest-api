import User from '../models/User.js'


export const user_put = async (req, res, next) => {
  const id = req.params.id
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}
export const user_delete = async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    res.status(200).json('user has been successfully')
  } catch (error) {
    next(error)
  }
}
export const user_get = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
export const user_get_all = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
