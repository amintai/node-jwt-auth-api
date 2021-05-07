import express from 'express';

import { refreshController , loginController , userController , registerController } from '../controller'

import auth from '../middlewares/auth'
const router = express.Router();

router.get('/', (req,res) => {
    res.send('header')
})

router.post('/register' , registerController.register)
router.post('/login', loginController.login)
router.get('/me',auth ,userController.me)
router.post('/refresh' , refreshController.refresh)
router.post('/logout' ,auth, loginController.logout)

export default router;