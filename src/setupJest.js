import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';
import configureStore from 'redux-mock-store';
import handleFetch from './middlewares/handleFetch';

const middlewares = [handleFetch];
global.mockStore = configureStore(middlewares)({});

configure({ adapter: new Adapter() })
global.fetch = fetch;
