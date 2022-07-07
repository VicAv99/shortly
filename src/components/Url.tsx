import { ActionIcon, Anchor, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import React from 'react';
import { FiCopy } from 'react-icons/fi';

interface UrlProps {
  shortLink?: {
    id: string;
    slug: string;
  };
}

export const ShortlyUrl = ({ shortLink }: UrlProps) => {
  const { copy, copied } = useClipboard({ timeout: 500 });
  const Tool = copied ? Tooltip : 'div';

  if (!shortLink?.id) return null;

  const shortUrl = `${window.location.origin}/${shortLink?.slug}`;
  const copyUrl = () => copy(shortUrl);

  return (
    <div className='flex text-center items-center justify-center'>
      <Anchor
        mr={10}
        variant='link'
        align='center'
        underline
        className='cursor-pointer text-center'
        target='_blank'
        href={shortUrl}
      >
        {shortUrl}
      </Anchor>
      <Tool label={(copied && 'Copied') || ''} position='top' placement='end'>
        <ActionIcon onClick={copyUrl} ml={10} variant='outline'>
          <FiCopy size={16} />
        </ActionIcon>
      </Tool>
    </div>
  );
};
