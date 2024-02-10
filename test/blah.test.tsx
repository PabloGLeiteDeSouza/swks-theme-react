import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ThemeProvider config={{}} children={<></>} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
