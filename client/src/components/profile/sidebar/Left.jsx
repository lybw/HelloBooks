import React from 'react';
import image from '../../../assets/images/1.jpg';

export default () => (
  <div className="col-sm-4 px-0 pr-sm-auto pr-sm-3">
    <div className="card mb-3">
      <div className="card-header">
        <span>Reading list</span>
      </div>
      <div className="row m-2">
        { [...Array(4)].map((val, index) => (
          <div className="col-sm-6 col-6 px-0 pr-1 mb-1" key={index}>
            <a href="/books/borrow/index.html">
              <img
                className="img-thumbnail w-100 h-100"
                src={image}
                alt="Card cap"/>
            </a>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary bg-light btn-block">
                See more
        </button>
      </div>
    </div>
  </div>
);
