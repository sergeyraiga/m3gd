export function beforeOpenModal(getState) {
  const editor = getState().editor;
  const game = getState().game;
  if (game) {
    game.style.height = '0px';
  }
  if (editor) {
    editor.style.height = '0px';
  }
}

export function beforeCloseModal(getState) {
  const editor = getState().editor;
  const game = getState().game;
  if (game) {
    game.style.height = '700px';
  }
  if (editor) {
    editor.style.height = '900px';
  }
}
