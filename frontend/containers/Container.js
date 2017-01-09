import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import SubmitModal from '../components/Base/SubmitModal';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { moveCard, closeSubmitDeleteModal } from '../actions';
import { deleteLevel } from '../actions/levels';

const style = {
};

import '../stylesheets/components/folders';

@DragDropContext(HTML5Backend)
class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
  }

  moveCard(dragIndex, hoverIndex) {
    this.props.dispatch(moveCard(dragIndex, hoverIndex));
  }

  render() {
    const cards = this.props.visibleLevels;

    return (
      <div style={style} className='configs-list'>
        {cards.map((card, i) => {
          return (
            <Card
              key={card.id} author={card.author} levelId={card.id}
              folders={card.folders} index={i} id={card.id} text={card.name}
              name={card.name} config={card} moveCard={this.moveCard}
            />
          );
        })}
        <SubmitModal
          title='Подтвердите удаление'
          body='Вы уверены, что хотите удалить?'
          actionName='Удалить'
          data={this.props.selectedLevel}
          show={this.props.submitDeleteModalShown}
          onHide={() => this.props.dispatch(closeSubmitDeleteModal())}
          action={(dispatch, id) => dispatch(deleteLevel({ id }))}
        />
      </div>
    );
  }
}

Container.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedLevel: PropTypes.object.isRequired,
  submitDeleteModalShown: PropTypes.bool.isRequired,
  visibleLevels: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { visibleLevels, selectedLevel, submitDeleteModalShown } = state;
  return { visibleLevels, selectedLevel, submitDeleteModalShown };
}

export default connect(mapStateToProps)(Container);
