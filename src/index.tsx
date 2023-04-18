import * as ReactDOMClient from 'react-dom/client';
import App from "./App";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const container = document.getElementById('app') as Element;

const root = ReactDOMClient.createRoot(container);

root.render(<App/>);