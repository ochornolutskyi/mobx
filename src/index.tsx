import ReactDOM from 'react-dom/client';
import { injectStores } from '@mobx-devtools/tools';
import { spy } from 'mobx';
import { PostsStore, TodosStore, UsersStore } from 'store';
import App from './App';
import reportWebVitals from './reportWebVitals';

// spy(ev => {
// 	if (ev.type.includes('action')) {
// 		console.log(ev);
// 	}
// });

injectStores({
	PostsStore,
	TodosStore,
	UsersStore,
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

reportWebVitals();
