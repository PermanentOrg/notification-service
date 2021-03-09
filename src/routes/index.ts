import express from 'express';
import { healthController, notificationController } from '../controllers';

const apiRoutes = express.Router();
apiRoutes.get('/health', healthController.getHealth);
apiRoutes.post('/notifications', notificationController.createNotification);

export { apiRoutes };
