import { render, act, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeContext, ThemeProvider } from '../src'
import React from 'react'

describe('ThemeProvider', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <ThemeProvider config={{ DefaultTheme: 'light' }}>
        <div>Test</div>
      </ThemeProvider>
    );
    expect(container).toBeTruthy();
  });

  it('should toggle theme', () => {
    const { result } = renderHook(() => React.useContext(ThemeContext), {
      wrapper: ({ children }) => (
        <ThemeProvider config={{ DefaultTheme: 'light' }}>{children}</ThemeProvider>
      ),
    });

    act(() => {
      result.current.toggleThemeDefault();
    });

    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleThemeDefault();
    });

    expect(result.current.theme).toBe('light');
  });

  // Adicione mais testes para outras funções conforme necessário
});
