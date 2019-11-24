import { config } from '../config';
import { each } from 'lodash';

// const startUrl = config.apiUrl + '/api/v1/game/start';
const hotelsListUrl = 'https://unclestaging.com/api/hotels/search?checkin=2019-11-24T04:30:00.000Z&checkout=2019-11-24T13:30:00.000Z&filter=%7B%22where%22:%7B%22cityId%22:%22delhi%22%7D,%22include%22:%22locality%22%7D';
const headers = {
  "Content-type": "application/json"
}

class HotelService {

  static hotels = [];

  static async fetchHotels() {
    try {
      const resp = await fetch(hotelsListUrl, {
        method: 'get'
      });

      const response = await resp.json();
      HotelService.hotels =response;
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
}

export default HotelService;
