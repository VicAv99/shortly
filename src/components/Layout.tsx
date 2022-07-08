import { AppShell, Center, ColorScheme, ColorSchemeProvider, MantineProvider, MantineTheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { PropsWithChildren, useState } from 'react';

import { ShortlyHeader } from './Header';

interface LayoutProps {}

export const ShortlyLayout = (props: PropsWithChildren<LayoutProps>) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const shellBg = (theme: MantineTheme) => ({
    main: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  });

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
        <NotificationsProvider>
          <AppShell
            fixed
            padding='md'
            header={<ShortlyHeader />}
            styles={shellBg}
          >
            <Center className='h-full'>{props.children}</Center>
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
