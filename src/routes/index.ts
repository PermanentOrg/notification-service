import express from 'express';
import { healthController, notificationController } from '../controllers';
import { deviceController } from '../controllers/device.controller';

const apiRoutes = express.Router();
apiRoutes.get('/health', healthController.getHealth);
apiRoutes.post('/notifications', notificationController.createNotification);
apiRoutes.post('/devices', deviceController.addDevice);

export { apiRoutes };
