import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';

class PageHeader extends Component {
  render() {
    return (
      <div>
        <div className='header-main'>
          <div className='container-fluid'>
            <div className='header-page'>
              <div className='page-name'>
                <div className='page-name-cell'>
                  {this.props.name}
                </div>
                <Loader loaded={!this.props.loaded} scale={0.5} width={4} length={8} speed={0.7} color={'#555'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  loaded: PropTypes.bool,
  name: PropTypes.string
};

export default PageHeader;
