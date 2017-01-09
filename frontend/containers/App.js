import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { init } from '../actions/backend';
import NavigationBar from '../components/NavigationBar';
import FlashContainer from './FlashContainer';
import SplitPane from 'react-split-pane';
import LevelInfoModal from '../components/LevelInfoModal';
import KarmaMapViewModal from '../components/KarmaMapViewModal';
import KarmaPresetsViewModal from '../components/KarmaPresetsViewModal';
import FolderInfoModal from '../components/FolderInfoModal';
import MoveLevelModal from '../components/Levels/MoveLevelModal';
import BotReportModal from '../components/BotReportModal';
import BotResultsModal from '../components/BotResultsModal';
import Tabs from '../components/Tabs';
import Folders from '../components/Folders';
import Levels from '../components/Levels';
import Worlds from '../components/Worlds';
import WorldEditor from '../components/WorldEditor';
import BotQueueEditor from '../components/BotQueueEditor';
import { closeFolderInfoModal } from '../actions/folders';
import { closeBotReportModal } from '../actions/bot';
import { closeMoveLevelModal, closeLevelInfoModal, closeKarmaMapModal, closeKarmaPresetsModal, closeBotResultsModal } from '../actions/levels';
//import {SHOW_KARMA_MAP_MODAL, SHOW_KARMA_PRESETS_MODAL} from '../reducers/karma';
import '../stylesheets/components/panes';
import '../stylesheets/utils/common';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(init());
  }

  componentWillReceiveProps(newProps) {
    this.props = newProps;
  }

  render() {
    return (
      <div>
        <NavigationBar
          username={this.props.username} loaded={this.props.spinner} karma_map={this.props.karma_map} karma_presets={this.props.karma_presets}
        />
          <div>
            <SplitPane split="vertical" minSize={300} defaultSize={380}>
              <div>
                <div className='tabs-container'>
                  <div className='container-fluid'>
                    <Tabs params={this.props}/>
                  </div>
                </div>
                {this.props.currentTab === 'levels' ? <Levels username={this.props.username}/> : null}
                {this.props.currentTab === 'folders' ? <Folders/> : null}
                {this.props.currentTab === 'worlds' ? <Worlds/> : null}
              </div>
              <div>
                {this.props.context === 'flash' ? <FlashContainer/> : null}
                {this.props.context === 'world' ? <WorldEditor/> : null}
                {this.props.context === 'bot_queue_editor' ? <BotQueueEditor/> : null}
              </div>
            </SplitPane>
            <LevelInfoModal
              show={this.props.levelInfoModalShown}
              onHide={() => this.props.dispatch(closeLevelInfoModal())}
            />
            <FolderInfoModal
              show={this.props.folderInfoModalShown}
              onHide={() => this.props.dispatch(closeFolderInfoModal())}
            />
            <BotReportModal
              show={this.props.botReportModalShown}
              onHide={() => this.props.dispatch(closeBotReportModal())}
            />
            <MoveLevelModal
              show={this.props.moveLevelModalShown}
              onHide={() => this.props.dispatch(closeMoveLevelModal())}
            />
            <KarmaMapViewModal
                show={this.props.karmaMapModalShown}
                onHide={() => this.props.dispatch(closeKarmaMapModal())}
            />
            <KarmaPresetsViewModal
                show={this.props.karmaPresetsModalShown}
                onHide={() => this.props.dispatch(closeKarmaPresetsModal())}
            />
            <BotResultsModal
                show={this.props.botResultsModalShown}
                onHide={() => this.props.dispatch(closeBotResultsModal())}
            />
          </div>
      </div>
    );
  }
}

App.propTypes = {
  botReportModalShown: PropTypes.bool.isRequired,
  context: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  folderInfoModalShown: PropTypes.bool.isRequired,
  levelInfoModalShown: PropTypes.bool.isRequired,
  moveLevelModalShown: PropTypes.bool.isRequired,
  karmaMapModalShown: PropTypes.bool.isRequired,
  karmaPresetsModalShown: PropTypes.bool.isRequired,
  spinner: PropTypes.bool.isRequired,
  tabs: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  karma_map: PropTypes.string.isRequired,
  karma_presets: PropTypes.string.isRequired,
  botResultsModalShown: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const {
    levelConfigs, application, levelInfoModalShown, submitDeleteModalShown,
    botReportModalShown, tabs, currentLeftPanelTab, moveLevelModalShown,
    folderInfoModalShown, context, karmaMapModalShown, karmaPresetsModalShown, botResultsModalShown
   } = state;
  const { isFetching } = levelConfigs || {
    isFetching: true,
  };
  const currentTab = currentLeftPanelTab;
  const { username, spinner, karma_map, karma_presets } = application || { username: '', spinner: false, karma_map: '', karma_presets: '' };
  return {
    isFetching, username, spinner, levelInfoModalShown, moveLevelModalShown,
    submitDeleteModalShown, botReportModalShown, tabs, currentTab,
    folderInfoModalShown, context, karmaMapModalShown, karmaPresetsModalShown, karma_map, karma_presets, botResultsModalShown
  };
}

export default connect(mapStateToProps)(App);
