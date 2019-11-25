import Booking from '../models/booking.model';
import _ from 'lodash';
import { IBookingRequest } from '../modules/booking/bookOptions';

class BookingDAO {
  static async getAllBooking() {
    const bookings = await Booking.findAll();
    return bookings;
  }

  static async createBooking(bookingObj: IBookingRequest) {
    const booking = await Booking.create(bookingObj);
    return booking;
  }
}

export default BookingDAO;
