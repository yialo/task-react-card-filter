import { createElement } from 'react';
import { render } from 'react-dom';

import App from './components/App/index.jsx';

const initReactApp = () => {
  const app = createElement(App);
  const $root = document.getElementById('root');
  render(app, $root);
};

export default () => {
  document.addEventListener('DOMContentLoaded', initReactApp);
};
