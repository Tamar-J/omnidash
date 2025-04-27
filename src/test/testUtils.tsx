import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react-native'

import { theme } from '@/themes'

export const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
    mutations: {
      retry: false,
      gcTime: Infinity,
    },
  },
})

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={mockQueryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  )
}

function customRender<T = unknown>(ui: React.ReactElement<T>, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options })
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) {
  return renderHook(renderCallback, {
    wrapper: AllProviders,
    ...options,
  })
}

export * from '@testing-library/react-native'
export { customRenderHook as renderHook }
export { customRender as render }
