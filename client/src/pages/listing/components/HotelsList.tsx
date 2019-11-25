import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  hotels: any[],
  loading: boolean;
}

const prepareHotelsListJSX = (hotels: any[]) => {
  const jsx = hotels.map((hotel, index) => {
    return (
      <div key={index}className="col-12 col-md-6 col-lg-4">
        <div className="hotel">
          <div className="row">
            <div className="col-6 col-md-12 p-0">
              <Link to={'details/'+ index}>
                <img className="img-fluid" alt="" src={hotel._pictures[0] && hotel._pictures[0].url} />
              </Link>
            </div>
            <div className="col-6 col-md-12 p-0">
              <div className="hotel-details">
                <div className='row'>
                  <div className="col-12 col-md-8 p-0">
                    <h6 className="m-0 p-0">{hotel.name}</h6>
                    <p className="address m-0 p-0">{hotel.locality && hotel.locality.name}</p>
                  </div>
                  <div className="col-12 col-md-4 p-0">
                    <p className="price m-0 p-0">₹{hotel.rack_prices && hotel.rack_prices.morning_slot}</p>
                    <i className="fa fa-heart"></i> {hotel.overallRating && hotel.overallRating.toFixed(1)}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  });

  return jsx;
}

const HotelsList = (props: Props) => {

  const hotelsJSX = prepareHotelsListJSX(props.hotels);

  if(props.loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div className="row">
      {hotelsJSX}
    </div>
  )
}

export default HotelsList;
