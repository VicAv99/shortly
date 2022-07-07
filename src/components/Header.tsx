import {
  ActionIcon,
  Group,
  Header,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export const ShortlyHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Header height={60} p='xs'>
      <Group sx={{ height: '100%' }} px={20} position='apart'>
        <Title order={1}>Shortly</Title>
        <ActionIcon
          variant='default'
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
        </ActionIcon>
      </Group>
    </Header>
  );
};
