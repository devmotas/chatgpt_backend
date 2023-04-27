import express from 'express'
import { login } from '../controllers/login.js'
import { addUser, deleteUser, getUsers, updateUser } from '../controllers/user.js'


const router = express.Router()

router.get('/get-user', getUsers)
router.post('/create-user', addUser)
router.put('/update-user/:id', updateUser)
router.put('/destroy-user/:id', deleteUser)

router.post('/login', login)

export default router