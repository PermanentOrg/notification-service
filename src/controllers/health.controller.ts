import type {
  Handler,
  Request,
  Response,
} from 'express';
import { healthService } from '../services';

const getHealth: Handler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.json({
    status: await healthService.getHealth(),
  });
};

export const healthController = {
  getHealth,
};
