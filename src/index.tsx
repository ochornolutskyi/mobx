import ReactDOM from 'react-dom/client';
import { spy } from 'mobx';
import App from './App';
import reportWebVitals from './reportWebVitals';

// spy(ev => {
// 	if (ev.type.includes('action')) {
// 		console.log(ev);
// 	}
// });

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

reportWebVitals();
