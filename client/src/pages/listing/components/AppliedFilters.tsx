import React from 'react';


const AppliedFilters = () => {

  return (
    <div className="header-div filters-applied-div row">
      <div className="filter-item col-12 col-md-4">
        <input name="abc" placeholder="Enter city" />
      </div>
      <div className="w-100 d-none d-sm-block d-md-none"></div>
      <div className="filter-item col-3 col-md-2">
        check in
      </div>
      <div className="filter-item  col-3 col-md-2">
        check out
      </div>
      <div className="filter-item  col-3 col-md-2">
        guests
      </div>
      <div className="filter-item col-3 col-md-2">
        rooms
      </div>
    </div>
  )
}

export default AppliedFilters;
