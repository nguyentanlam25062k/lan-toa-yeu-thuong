import React from 'react';
import PropTypes from 'prop-types';

BannerHome.propTypes = {
  
};

function BannerHome(props) {
  return (
    <section className="banner-home">
      <div className="container">
        <div className="row">
          <div className="col lg-6">
            hom nay tao buon
          </div>
          <div className="col lg-6">
            hom nay tao vui
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerHome;