import { BulbOutlined, HeartOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';
import React from 'react';
import Icons, { IconFontSize } from './Icons';

export * from './i18n';
export * from './theme';

export const isDevelopment = !!window.location.port;

export const CollapsedKey = 'collapsed';

export const TocCollapsedKey = ['collapsed', 'toc'].join('-');

export const NavData = [
    {
        label: 'Home',
        value: 'index',
        icon: <HomeOutlined style={{ fontSize: IconFontSize }} />
    },
    {
        label: 'JS',
        value: 'js',
        icon: Icons.JavaScript
    },
    {
        label: 'Node',
        value: 'node',
        icon: Icons.NodeJs
    },
    {
        label: 'Tool',
        value: 'tool',
        icon: <ToolOutlined style={{ fontSize: IconFontSize }} />
    },
    {
        label: 'Awesome',
        value: 'awesome',
        icon: <HeartOutlined style={{ fontSize: IconFontSize }} />
    },
    {
        label: 'HTML',
        value: 'html',
        icon: Icons.Html
    },
    {
        label: 'CSS',
        value: 'css',
        icon: Icons.Css
    },
    {
        label: 'Assemble',
        value: 'assemble',
        icon: <BulbOutlined style={{ fontSize: IconFontSize }} />
    }
];
