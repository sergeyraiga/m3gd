import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, ControlLabel, Form, FormGroup, Col, Checkbox } from 'react-bootstrap';
import { runBot, showBotReportModal } from '../actions/bot';
import { getBotReportsForLevel } from '../actions/bot_reports';
import TreeNode from '../components/Tree';
import BotReports from './BotReports';

import '../stylesheets/components/categorization';

class Categorization extends Component {

    constructor(props) {
        super(props);
        this.runBot = this.runBot.bind(this);
        this.difficulty = this.difficulty.bind(this);
        this.strategy = this.strategy.bind(this);
        this.seed = this.seed.bind(this);
        this.showReport = this.showReport.bind(this);
        this.rangeSeed = this.rangeSeed.bind(this);
        this.karmaPreset = this.karmaPreset.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getBotReportsForLevel(this.props.currentLevel.id));
    }

    difficulty(e) {
        this._difficultyRate = e.target.value;
    }

    strategy(e) {
        this._strategy = e.target.value;
    }

    seed(e) {
        this._seed = e.target.value;
    }

    rangeSeed(e) {
        this._rangeSeed = e.target.checked;
    }

    karmaPreset(e) {
        this._karmaPreset = e.target.value;
    }

    runBot() {
        const iterations = this._iterations !== '' ?
            parseInt(this._iterations, 10) : 0;
        const difficulty = parseInt(this._difficultyRate, 10) || 0;
        const strategy = parseInt(this._strategy, 10) || 0;
        const seed = parseInt(this._seed, 10) || 0;
        const rangeSeed = !!this._rangeSeed;
        const karmaPresetId = this._karmaPreset;
        const karmaPresets = JSON.parse(this.props.karma_map);
        const karmaMap = JSON.parse(this.props.karma_presets);
        this.props.dispatch(runBot({
            level: JSON.parse(this.props.currentLevel.level),
            range: this.props.currentRangeParams,
            iterations, difficulty, strategy, seed, rangeSeed, karmaPresets, karmaMap, karmaPresetId
        }, this.props.currentLevel.id));
    }

    showReport() {
        this.props.dispatch(showBotReportModal());
    }

    render() {
        return (
            <div className='categorization'>
                <br/>
                <div className='categorization-level'>Уровень: {this.props.currentLevel.name}</div>
                <span className='range-params'>Параметры ранжирования</span>
                <Form horizontal className='categorization-params'>
                    <div className='categorization-container'>
                        <div className='treeview-container'>
                            { this.props.rangeParams.map(
                                (item, i) =>
                                    <TreeNode node={item} visible={false} key={i}
                                              dispatch={this.props.dispatch} state={this.props.currentRangeParams}
                                    />
                            )
                            }
                        </div>
                        <br/>
                        <div>
                            <FormGroup controlId="formControlsText">
                                <ControlLabel className='categorization-param'>Количество итераций</ControlLabel>
                                <FormControl type="text" bsSize='small' placeholder=""
                                             onChange={e => (this._iterations = e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Col sm={2}>
                                    <ControlLabel className='categorization-param'>Seed</ControlLabel>
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="text" bsSize='small' placeholder="" onChange={this.seed}/>
                                </Col>
                                <Col sm={3}>
                                    <Checkbox onChange={this.rangeSeed}>Range</Checkbox>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formControlsSelectStrategy">
                                <ControlLabel className='categorization-param'>Стратегия</ControlLabel>
                                <FormControl componentClass="select" className='categorization-param'
                                             onChange={this.strategy}>
                                    <option value='0'>100% лучших ходов</option>
                                    <option value='1'>66% лучших ходов</option>
                                    <option value='2'>50% лучших ходов</option>
                                    <option value='3'>33% лучших ходов</option>
                                    <option value='4'>0% лучших ходов (все ходы случайные)</option>
                                </FormControl>
                            </FormGroup>

                            <FormGroup controlId="formControlsSelectStrategy">
                                <ControlLabel className='categorization-param'>Пресеты кармы</ControlLabel>
                                <FormControl componentClass="select" className='categorization-param'
                                             onChange={this.karmaPreset}>
                                    <option value='-2'></option>
                                    <option value='-1'>Preset 4</option>
                                    <option value='0'>Preset 1</option>
                                    <option value='1'>Preset 2</option>
                                    <option value='2'>Preset 3</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                        {this.props.botRunProgress.length ?
                            <Button className='run-bot-btn disabled'>
                                Обработать
                            </Button>
                            :
                            <Button className='run-bot-btn' onClick={this.runBot}>
                                Обработать
                            </Button>
                        }
                        <br/>
                        <br/>
                        { this.props.botRunProgress.length ?
                            <div className='bot-progress'>
                                Итерация {this.props.botRunProgress[0]} из {this._iterations}
                                <br/>
                                Ход {this.props.botRunProgress[1]} из {this.props.botRunProgress[2]}
                            </div>
                            : null
                        }
                        {/* { Object.keys(this.props.runBotResult).length > 0 && !this.props.botRunProgress.length ?
                         <Button className='run-bot-btn' onClick={this.showReport}>
                         Отчет
                         </Button>
                         : null
                         } */}
                    </div>
                </Form>
                <BotReports/>
            </div>
        );
    }
}

Categorization.propTypes = {
    botRunProgress: PropTypes.array.isRequired,
    currentLevel: PropTypes.object.isRequired,
    currentRangeParams: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    rangeParams: PropTypes.array.isRequired,
    runBotResults: PropTypes.array.isRequired,
    runBotResult: PropTypes.object.isRequired,
    karma_map: PropTypes.string.isRequired,
    karma_presets: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const {
        botRunProgress, currentLevel, currentRangeParams, rangeParams,
        runBotResult, runBotResults, application
        } = state;
    const { karma_map, karma_presets } = application;

    return {
        botRunProgress, currentLevel, currentRangeParams, rangeParams,
        runBotResult, runBotResults, karma_map, karma_presets
    };
}

export default connect(mapStateToProps)(Categorization);
