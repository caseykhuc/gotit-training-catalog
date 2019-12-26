import { modalTypes } from 'constants/actionTypes';
import * as modalActions from '../modal';

describe('actions/modal', () => {
  const store = global.mockStore;
  let creator;
  let actions;

  const setup = async () => {
    store.clearActions();
    await store.dispatch(creator);
    actions = store.getActions();
  }

  beforeEach(() => {
  });

  it('should create show modal action', async () => {
    creator = modalActions.showModal('SAMPLE_KEY');
    await setup();

    expect(actions[0]).toEqual({
      type: modalTypes.SHOW_MODAL,
      payload: { modalKey: 'SAMPLE_KEY', props: {} },
    });
  });

  it('should create hide modal action', async () => {
    creator = modalActions.hideModal();
    await setup();

    expect(actions[0]).toEqual({ type: modalTypes.HIDE_MODAL });
  })
});
