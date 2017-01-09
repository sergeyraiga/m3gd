import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { decimalAdjust } from '../utils/index';

class BotReportModal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const strategy = getStrategy(this.props.runBotResult.strategy);
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>Отчет о запуске</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'left', fontSize: '14px', color: '#777' }}>
            <div>Количество запусков: {this.props.runBotResult.case_cnt}</div>
            <div>Сложность бота: {strategy}</div>
            <div>Сид: {this.props.runBotResult.seed}</div>
            <div>Выигрышных уровней: {this.props.runBotResult.passability}%</div>
            <div>Среднее количество ходов: {this.props.runBotResult.step_cnt_average}</div>
            <div>Медиана количества ходов: {this.props.runBotResult.step_cnt_median}</div>
            <div>Средний прогресс по целям: {decimalAdjust('round', this.props.runBotResult.target_progress_average, -1)}%</div>
            <div>Медиана прогресса по целям: {decimalAdjust('round', this.props.runBotResult.target_progress_median, -1)}%</div>
            <div>Cредний счет: {this.props.runBotResult.score_average}</div>
            <div>Медиана счета: {this.props.runBotResult.score_median}</div>
            <div>Среднее количество перемешиваний: {this.props.runBotResult.mixings_cnt_average}</div>
            <div>Медиана количества перемешиваний: {this.props.runBotResult.mixings_cnt_median}</div>
            <div>Среднее количество вариантов ходов: {this.props.runBotResult.step_variants_cnt_average}</div>
            <div>Среднее количество оставшихся ходов на уровне: {this.props.runBotResult.step_left_average}</div>
            <div>Cредний прогресс по целям, в абсолютных величинах: {this.props.runBotResult.target_absolute_progress_average}</div>
            <div>Медиана среднего прогресса по целям, в абсолютных величинах: {this.props.runBotResult.target_absolute_progress_median}</div>
            <form action="/bot_replay_json" method="post">
              <button className='run-bot-btn'
                      type="submit" name='id'
                      value={this.props.runBotResult.id}>
                REPLAY
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}

BotReportModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  runBotResult: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { runBotResult } = state;
  return { runBotResult };
}

function getStrategy(val){
  switch (val)
  {
    case 0:
      return '100% лучших ходов';
    case 1:
      return '66% лучших ходов';
    case 2:
      return '50% лучших ходов';
    case 3:
      return '33% лучших ходов';
    case 4:
      return '0% лучших ходов (все ходы случайные)';
  }
  return '';
}

export default connect(mapStateToProps)(BotReportModal);
