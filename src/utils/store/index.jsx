import {createStore, persist} from 'easy-peasy';
import {model} from './models';

const store = createStore(persist(model));

export default store;
