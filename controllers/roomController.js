import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'
import { createError } from '../utils/error.js'

export const room_post =async (req,res,next) => {
    const hotelId = req.params.hotelId
    const newRoom = await Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const room_put = async (req, res, next) => {
  const id = req.params.id
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedRoom)
  } catch (error) {
     next(error)
  }
}
export const room_put_availability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumber._id': req.params.id },
      {$push: { "roomNumbers.$.unavailableDates": req.body.dates }}
    )
    res.status(200).json('Room status has been updated.')
  } catch (error) {
    next(error)
  }
}
export const room_delete = async (req, res, next) => {
    const hotelId = req.params.hotelId
  try {
      await Room.findByIdAndDelete(req.params.id)
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        })
      } catch (error) {
        next(error)
      }
    res.status(200).json('room has been successfully')
  } catch (error) {
     next(error)
  }
}
export const room_get = async (req, res, next) => {
  const id = req.params.id
  try {
    const room = await Room.findById(id)
    res.status(200).json(room)
  } catch (error) {
     next(error)
  }
}
export const room_get_all = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.status(200).json(rooms)
  } catch (error) {
    next(error)
  }
}

