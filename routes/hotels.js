import express from 'express'
import { createError } from '../utils/error.js'
import {
  hotel_post,
  hotel_delete,
  hotel_get_all,
  hotel_get,
  hotel_put,
  countByCity,
  countByType,
  getHotelRooms,
} from '../controllers/hotelController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
const router = express.Router()

//GET  ALL
router.get('/', hotel_get_all)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRooms )
//CREATE
router.post('/',verifyAdmin, hotel_post)
//UPDATE
router.put('/:id', verifyAdmin, hotel_put)
//DELETE
router.delete('/:id', verifyAdmin, hotel_delete)
//GET
router.get('/:id', hotel_get)












export default router
