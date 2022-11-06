import ReactDOM from 'react-dom/client';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom';

import {StoreProvider} from 'easy-peasy';
import store from './utils/store/index';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Router>,
);
