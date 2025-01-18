import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/global.css';
import { AppProps } from 'next/app';
import { theme } from '@/components/theme';
import { DataProvider } from '@/hook/useData';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ChakraProvider>
  );
}
