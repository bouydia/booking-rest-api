import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const hotel_post = async (req, res,next) => {
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (error) {
     next(error)
  }
}
export const hotel_put = async (req, res, next) => {
  const id = req.params.id
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedHotel)
  } catch (error) {
     next(error)
  }
}
export const hotel_delete = async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id)
    res.status(200).json('Hotel has been successfully')
  } catch (error) {
     next(error)
  }
}
export const hotel_get = async (req, res, next) => {
  const id = req.params.id
  try {
    const hotel = await Hotel.findById(id)
    res.status(200).json(hotel)
  } catch (error) {
     next(error)
  }
}
export const hotel_get_all = async (req, res, next) => {
   const {min,max,...others}=req.query
  try {
    const hotels = await Hotel.find({...others,cheapestPrice:{$gte:min|1,$lte:max|999}}).limit(req.query.limit)
    res.status(200).json(hotels)
  } catch (error) {
    next(error)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(cities.map(city=> {
      return Hotel.countDocuments({city:city})
    }))
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount =await Hotel.countDocuments({ type: "hotel" })
    const motelCount = await Hotel.countDocuments({ type: 'motel' })
    const raidCount = await  Hotel.countDocuments({ type: 'riad' })
    const appartmentCount = await Hotel.countDocuments({ type: 'appartment' })
    const villaCount = await Hotel.countDocuments({ type: 'villa' })
    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'motel', count: motelCount },
      { type: 'riad', count: raidCount },
      { type: 'appartment', count: appartmentCount },
      { type: 'villa', count: villaCount },
    ])
  } catch (error) {
    next(error)
  }
}

export const getHotelRooms =async (req,res,next) => {
  try {
    const hotel =await Hotel.findById(req.params.id)
    const list = await Promise.all(
      hotel.rooms.map(room => {
        return Room.findById(room)
      })
    )
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
}