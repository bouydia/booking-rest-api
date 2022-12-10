import express from 'express'
import { createError } from '../utils/error.js'
import {
  user_delete,
  user_get_all, 
  user_get,
  user_put,
} from '../controllers/userController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'
const router = express.Router()

/* router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user user you are logedd in")
})

router.get('/checkuser/:id', verifyUser, (req, res, next) => {
  res.send('hello user user you are logged and you can delete you account')
})
router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
  res.send('hello user user you are Admin you can delete all account')
}) */
//UPDATE
router.put('/:id',verifyUser, user_put)
//DELETE
router.delete('/:id', verifyUser, user_delete)
//GET
router.get('/:id', verifyUser, user_get)
//GET  ALL
router.get('/',verifyAdmin, user_get_all)

export default router
