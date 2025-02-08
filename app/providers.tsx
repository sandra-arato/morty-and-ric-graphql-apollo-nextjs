'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'

export function Providers({ children }: { children: React.ReactNode }) {
  return <CacheProvider><ChakraProvider value={defaultSystem}>{children}</ChakraProvider></CacheProvider>
}