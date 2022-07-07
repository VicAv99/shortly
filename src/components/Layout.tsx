import {
  AppShell,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import React, { PropsWithChildren, useState } from 'react';

import { ShortlyHeader } from './Header';

interface LayoutProps {}

export const ShortlyLayout = (props: PropsWithChildren<LayoutProps>) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme,
        }}
      >
        <AppShell fixed padding='md' header={<ShortlyHeader />}>
          <Center className='h-full'>{props.children}</Center>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
