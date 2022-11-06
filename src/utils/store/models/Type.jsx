import {action} from 'easy-peasy';

const type = {
  type: '',
  setType: action((state, payload) => {
    state.type = payload;
  }),
};

export default type;
