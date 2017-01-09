import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BotReport from './BotReport';
import { ControlLabel, Button } from 'react-bootstrap';

class BotReports extends Component {

  render() {
    const moves = JSON.parse(this.props.currentLevel.level).moves;
    return (
      this.props.botReports.length ?
        <div>
          <ControlLabel className='categorization-param'>Отчеты</ControlLabel>
          <div className='reports'>
            {this.props.botReports.map(report =>
              <BotReport key={report.id} report={report} moves={moves}/>
            )}
          </div>
          <br/>
          <form action="/bot_reports_csv" method="post">
            <Button className='run-bot-btn'
              type="submit" name='level_id'
              value={parseInt(this.props.currentLevel.id, 10)}>
              Скачать отчеты
            </Button>
          </form>
        </div>
      : null
    );
  }
}

BotReports.propTypes = {
  botReports: PropTypes.array.isRequired,
  currentLevel: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { botReports, currentLevel } = state;
  return { botReports, currentLevel };
}

export default connect(mapStateToProps)(BotReports);
