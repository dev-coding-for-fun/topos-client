import * as ReactDOMClient from 'react-dom/client';
import App from "./App";
import { Firebase } from './config/firebase';

const container = document.getElementById('app') as Element;

const root = ReactDOMClient.createRoot(container);

root.render(<App/>);