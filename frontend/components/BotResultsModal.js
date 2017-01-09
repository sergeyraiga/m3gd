import React, { Component, PropTypes } from 'react';
import { Modal, FormControl, FormGroup, ControlLabel, Button, Checkbox, Col, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { decimalAdjust } from '../utils/index';
import { BOT_RESULT_SELECTED, BOT_RESULT_UNSELECTED } from '../actions/bot';
import { saveBotReport } from '../actions/bot_reports';

class BotResultsModal extends Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);

        //default filter params
        this._turns_from = 0;
        this._turns_to = 0;
        this._turns_check = false;

        this._progress_from = 0;
        this._progress_to = 0;
        this._progress_check = false;

        this._turnsVariability_from = 3;
        this._turnsVariability_to = 3;
        this._turnsVariability_check = false;

        this._supersCreated_from = 10;
        this._supersCreated_to = 10;
        this._supersCreated_check = false;

        this._wins_from = 0;
        this._wins_to = 100;
        this._wins_check = true;

        //
        this.updateSelectedResults(false);
    }

    render() {
        const seedCount = this.props.runBotResults.length;
        const runCount = this.props.runBotResults.length;
        const selectedText = this.getSelectedDesc();
        return (
            <Modal {...this.props}>
                <Modal.Header closeButton>
                    <Modal.Title>Отчет о запуске</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>Прогнали {seedCount} сидов по {runCount} раз</div>
                        <FormGroup controlId="formTurnsText">
                            <ControlLabel>Количество оставшихся ходов</ControlLabel>
                            <FormGroup>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._turns_from} onChange={e => (this._turns_from = e.target.value)}/>
                                </Col>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._turns_to} onChange={e => (this._turns_to = e.target.value)}/>
                                </Col>
                                <Col sm={2}>
                                    <Checkbox defaultChecked={this._turns_check} onChange={e => (this._turns_check = e.target.checked)}>Вкл</Checkbox>
                                </Col>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup controlId="formProgressText">
                            <ControlLabel>Прогресс по целям, в абсолютных величинах</ControlLabel>
                            <FormGroup>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._progress_from} onChange={e => (this._progress_from = e.target.value)}/>
                                </Col>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._progress_to} onChange={e => (this._progress_to = e.target.value)}/>
                                </Col>
                                <Col sm={2}>
                                    <Checkbox defaultChecked={this._progress_check} onChange={e => (this._progress_check = e.target.checked)}>Вкл</Checkbox>
                                </Col>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup controlId="formTurnsVariabilityText">
                            <ControlLabel>Количество вариантов ходов</ControlLabel>
                            <FormGroup>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._turnsVariability_from} onChange={e => (this._turnsVariability_from = e.target.value)}/>
                                </Col>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._turnsVariability_to} onChange={e => (this._turnsVariability_to = e.target.value)}/>
                                </Col>
                                <Col sm={2}>
                                    <Checkbox defaultChecked={this._turnsVariability_check} onChange={e => (this._turnsVariability_check = e.target.checked)}>Вкл</Checkbox>
                                </Col>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup controlId="formSupersCreatedText">
                            <ControlLabel>Количество созданных суперэлементов</ControlLabel>
                            <FormGroup>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._supersCreated_from} onChange={e => (this._supersCreated_from = e.target.value)}/>
                                </Col>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._supersCreated_to} onChange={e => (this._supersCreated_to = e.target.value)}/>
                                </Col>
                                <Col sm={2}>
                                    <Checkbox defaultChecked={this._supersCreated_check} onChange={e => (this._supersCreated_check = e.target.checked)}>Вкл</Checkbox>
                                </Col>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup controlId="formWinsText">
                            <ControlLabel>Количество выигрышей(%)</ControlLabel>
                            <FormGroup>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._wins_from} onChange={e => (this._wins_from = e.target.value)}/>
                                </Col>
                                <Col sm={5}>
                                    <FormControl type="text" bsSize='small' defaultValue={this._wins_to} onChange={e => (this._wins_to = e.target.value)}/>
                                </Col>
                                <Col sm={2}>
                                    <Checkbox defaultChecked={this._wins_check} onChange={e => (this._wins_check = e.target.checked)}>Вкл</Checkbox>
                                </Col>
                            </FormGroup>
                        </FormGroup>
                        <Button onClick={() => this.runSelect()}>Сделать выборку</Button>
                        <div>{this._selected ? selectedText : null}</div>
                        <div>{this.getSelectedLength() > 0 ? <Button onClick={this.save}>Сохранить</Button> : null}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }

    runSelect() {
        this.updateSelectedResults(false);

        this.selectResult = this.props.runBotResults.filter(
            item => (this._turns_check ? item['step_left_average'] >= this._turns_from && item['step_left_average'] <= this._turns_to : true)
                && (this._progress_check ? item['target_absolute_progress_average'] >= this._progress_from && item['target_absolute_progress_average'] <= this._progress_to : true)
                && (this._turnsVariability_check ? item['step_variants_cnt_average'] >= this._turnsVariability_from && item['step_variants_cnt_average'] <= this._turnsVariability_to : true)
                && (this._supersCreated_check ? item['super_items_created_average'] >= this._supersCreated_from && item['super_items_created_average'] <= this._supersCreated_to : true)
                && (this._wins_check ? (item['passability']*100) >= this._wins_from && (item['passability']*100) <= this._wins_to : true));
        console.log(this.selectResult);

        this.updateSelectedResults(true);
    }

    save() {
        console.log(this.selectResult);
        const levelId = this.props.bot_level_id;
        this.selectResult.map(item => { console.log(item); this.props.dispatch(saveBotReport({ level_id: levelId, ...item }))}, this);
    }

    updateSelectedResults(selected) {
        this._selected = selected;
        if(selected){
            this.props.dispatch({ type: BOT_RESULT_SELECTED });
        }
        else {
            this.props.dispatch({ type: BOT_RESULT_UNSELECTED });
        }
    }

    getSelectedDesc() {
        if(this._selected){
            return "Выбрано " + this.selectResult.length + " отчетов";
        }
        else {
            return "Вы еще не проводили выборку";
        }
    }

    getSelectedLength() {
        if(this.selectResult) {
            return this.selectResult.length;
        }
        else {
            return 0;
        }
    }
}

BotResultsModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    runBotResults: PropTypes.array.isRequired,
    botResultSelected: PropTypes.bool.isRequired,
    bot_level_id: PropTypes.number
};

function mapStateToProps(state) {
    const { runBotResults, botResultSelected, bot_level_id } = state;
    return { runBotResults, botResultSelected, bot_level_id };
}

export default connect(mapStateToProps)(BotResultsModal);
