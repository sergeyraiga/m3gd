import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem, FormControl } from 'react-bootstrap';
import { filterLevels } from '../../actions/levels';
import { filterFolders } from '../../actions/folders';

import '../../stylesheets/components/filterPanel';

class FilterPanel extends Component {

  constructor(props) {
    super(props);
    this.filterCreatedBy = this.filterCreatedBy.bind(this);
    this.filterName = this.filterName.bind(this);
  }

  filterCreatedBy() {
    if (this.props.currentFolder.id) {
      this.props.dispatch(filterLevels('author', this.props.username));
    }
    else {
      this.props.dispatch(filterLevels('author', this.props.username));
    }
  }

  filterName(e) {
    const param = e.target.value;
    if (this.props.currentFolder.id) {
      this.props.dispatch(filterLevels('all', param));
    }
    else {
      this.props.dispatch(filterFolders('all', param));
    }
  }

  render() {
    return (
      <div className='row filter-panel'>
        <div className='col-lg-12'>
          <div className='input-group'>
            <div className='input-group-btn'>
              <DropdownButton title='' id='input-dropdown-addon' className='defined-filters'>
                <MenuItem key='1' onClick={this.filterCreatedBy}>Созданные мной</MenuItem>
              </DropdownButton>
            </div>
            <FormControl
              type='text'
              className='form-control'
              aria-label='...'
              placeholder='Поиск...'
              onChange={this.filterName}
            />
          </div>
        </div>
      </div>
    );
  }
}

FilterPanel.propTypes = {
  currentFolder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string
};

export default FilterPanel;
