import { config } from '../config';
import { each } from 'lodash';

const bookUrl = config.apiUrl + '/api/v1/booking/';
const hotelsListUrl = 'https://unclestaging.com/api/hotels/search?checkin=2019-11-24T04:30:00.000Z&checkout=2019-11-24T13:30:00.000Z&filter=%7B%22where%22:%7B%22cityId%22:%22delhi%22%7D,%22include%22:%22locality%22%7D';
const headers = {
  "Content-type": "application/json"
}

interface IBooking {
  hotel: string;
  city: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
};

class HotelService {

  static hotels = [];

  static async fetchHotels() {
    try {
      const resp = await fetch(hotelsListUrl, {
        method: 'get'
      });

      const response = await resp.json();
      HotelService.hotels = response;
      return response;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }

  static async getHotel(index: number) {
    try {
      const resp = HotelService.hotels.length ? HotelService.hotels : await HotelService.fetchHotels();
      return resp[index];
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }

  static async bookHotel(obj: IBooking) {
    try {
      const resp = await fetch(bookUrl + 'create', {
        method: 'post',
        headers: headers,
        body: JSON.stringify(obj)
      });
      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async getBookings() {
    const resp = await fetch(bookUrl + 'all', {
      method: 'get',
      headers: headers
    });
    const response = await resp.json();
    if (response.status.code !== 0) {
      throw new Error(response.status.message);
    }

    return response.data;
  } catch(e: Error) {
    throw e;
  }
}

export default HotelService;
