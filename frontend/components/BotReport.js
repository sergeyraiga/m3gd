import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { showBotReportModal } from '../actions/bot';
import { setCurrentBotReport } from '../actions/bot_reports';

class BotReport extends Component {

  constructor(props) {
    super(props);
    this.showReport = this.showReport.bind(this);
  }

  showReport() {
    this.props.dispatch(setCurrentBotReport(this.props.report));
    this.props.dispatch(showBotReportModal());
  }

  render() {
    const report = this.props.report;
    const createdAt = Date.parse(report.createdAt);
    return (
        <div className='report' onClick={this.showReport}>
          <div style={{ display: 'table-cell', paddingRight: '10px' }}>
            {moment(createdAt).format('YYYY-MM-DD HH:mm')}
          </div>
          <div style={{ display: 'table-cell', paddingRight: '10px' }}>
            Сид: {report.seed}
          </div>
            <div style={{ display: 'table-cell', paddingRight: '10px' }}>
                Wins: {report.passability}
            </div>
          <div style={{ display: 'table-cell', paddingRight: '10px' }}>
            Прогресс: {report.target_absolute_progress_average}
          </div>
            <div style={{ display: 'table-cell', paddingRight: '10px' }}>
                Ходов: {report.step_cnt_average} из {this.props.moves}
            </div>
            <div style={{ display: 'table-cell', paddingRight: '10px' }}>
                Супер-элементов: {report.super_items_created_average}
            </div>
        </div>
    );
  }
}

BotReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
  moves: PropTypes.number.isRequired,
  report: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(BotReport);
