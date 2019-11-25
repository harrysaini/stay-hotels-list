import { Request, Response } from 'express';
import { BookingRequest } from './bookOptions';
import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/Status';
import { GenericResponse, IGenericResponse } from '../../utils/GenericResponse';
import BookingModel from './BookingModel';
import Booking from '../../models/booking.model';

class Controller {

  static async create(req: Request, res: Response) {
    try {
      const options = new BookingRequest(req);
      const booking: Booking = await BookingModel.create(options);
      const response = new GenericResponse<Booking>(RESPONSE_STATUS.SUCCESS, 'Success', booking);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const bookings: Booking[] = await BookingModel.getAll();
      const response = new GenericResponse<Booking[]>(RESPONSE_STATUS.SUCCESS, 'Success', bookings);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }


}

export default Controller;
