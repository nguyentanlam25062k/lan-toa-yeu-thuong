import express from 'express';
import homeController from '../controllers/home.controller.js';
import userController from '../controllers/user.controller.js';
let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/create-new-user', userController.createNewUser);

    router.post('/login', userController.login);
    router.post('/logout', userController.logout);

    router.get('/refresh-token', userController.refreshToken);

    router.get('*', (req, res) => {
        res.status(200).json({
            message: "hello Lan Toa Yeu Thuong"
        });
    })

    return app.use('/', router);
}

export default initWebRoutes;