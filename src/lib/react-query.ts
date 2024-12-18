import { DefaultOptions, QueryClient } from "@tanstack/react-query"

export * from "@tanstack/react-query"

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {
    retry: false,
  },
}

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})
