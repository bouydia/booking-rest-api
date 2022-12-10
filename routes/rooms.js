import express from 'express'
import {
  room_post,
  room_delete,
  room_get_all,
  room_get,
  room_put,
  room_put_availability,
} from '../controllers/roomController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
const router = express.Router()

//CREATE
router.post('/:hotelId', verifyAdmin, room_post)
//UPDATE
router.put('/:id', verifyAdmin, room_put)
router.put('/availability/:id',  room_put_availability)

//DELETE
router.delete('/:id/:hotelId', verifyAdmin, room_delete)
//GET
router.get('/:id', room_get)
//GET  ALL
router.get('/', room_get_all)

export default router
