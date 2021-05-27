import express from 'express';
import {
  deviceController,
  healthController,
  notificationController,
} from '../controllers';

const apiRoutes = express.Router();
apiRoutes.post('/deleteToken', deviceController.deleteDevice);
apiRoutes.post('/devices', deviceController.addDevice);
apiRoutes.get('/health', healthController.getHealth);
apiRoutes.post('/notifications', notificationController.createNotification);

export { apiRoutes };
