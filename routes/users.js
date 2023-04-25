import express from 'express'
import { addUser, deleteUser, getUsers, updateUser } from '../controllers/user.js'


const router = express.Router()

router.get('/get-user', getUsers)
router.post('/create-user', addUser)
router.put('/update-user/:id', updateUser)
router.put('/destroy-user/:id', deleteUser)

export default router