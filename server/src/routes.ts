import { Router } from 'express';
import config from 'config';
import BookingController from './modules/booking/BookingController';

const apiRouter: Router = Router();

apiRouter.get('/v1/index', (req, res) => {
  res.send('hello from api');
  console.log(JSON.stringify(config));
});

apiRouter.post('/v1/booking/create', BookingController.create);
apiRouter.get('/v1/booking/all', BookingController.getAll);

export default apiRouter;
