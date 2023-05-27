import express from 'express'
import { chat } from '../controllers/chat.js'
import { login } from '../controllers/login.js'
import { addUser, deleteUser, getUsers, updatePassword, updateUser } from '../controllers/user.js'


const router = express.Router()

router.get('/get-user', getUsers)
router.post('/create-user', addUser)
router.put('/update-user/:id', updateUser)
router.put('/destroy-user/:id', deleteUser)
router.put('/update-password/:id', updatePassword)

router.post('/login', login)

router.post('/chat', chat)

export default router