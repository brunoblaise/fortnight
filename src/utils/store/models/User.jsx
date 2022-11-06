import {action} from 'easy-peasy';

const user = {
  profile: [],
  setProfile: action((state, payload) => {
    state.profile = payload;
  }),
};

export default user;
