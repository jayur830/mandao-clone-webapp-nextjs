import { PanoramaOutlined, PhotoSizeSelectActualOutlined, VideoCameraBackOutlined } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';

import Block from './Block';

export interface WorkspaceProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  selectedComponent?: 'block' | 'image' | 'video' | 'carousel' | 'button';
}

export type Data =
  | {
      type: 'block';
      children?: Data[];
    }
  | {
      type: 'image';
      url?: string;
    }
  | {
      type: 'video';
      url?: string;
    }
  | {
      type: 'carousel';
      items: Data[];
    }
  | {
      type: 'button';
      text: string;
    };

const widthMap = {
  desktop: 1440,
  tablet: 996,
  mobile: 512,
};

export default function Workspace({ breakpoint, selectedComponent }: WorkspaceProps) {
  const [data, setData] = useState<Data[]>([]);

  return (
    <>
      <Paper
        elevation={15}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: widthMap[breakpoint],
          height: 'fit-content',
          minHeight: 500,
          transition: 'all 0.3s ease',
        }}
        onClick={(e) => {
          e.stopPropagation();
          switch (selectedComponent) {
            case 'block':
              setData((state) => [...state, { type: 'block' }]);
              break;
            case 'image':
              setData((state) => [...state, { type: 'image' }]);
              break;
            case 'video':
              setData((state) => [...state, { type: 'video' }]);
              break;
            case 'carousel':
              setData((state) => [...state, { type: 'carousel', items: [] }]);
              break;
            case 'button':
              setData((state) => [...state, { type: 'button', text: '텍스트' }]);
              break;
          }
        }}
      >
        {/* 블록을 재귀해야됨. 근데 재귀적으로 state 업데이트하는 방법을 모르겠음. dispatch callback을 재귀해야하나 */}
        <Block
          onClick={() => {
            console.log('click block');
            // switch (selectedComponent) {
            //   case 'block':
            //     setData((state) => [...state, { type: 'block' }]);
            //     break;
            //   case 'image':
            //     setData((state) => [...state, { type: 'image' }]);
            //     break;
            //   case 'video':
            //     setData((state) => [...state, { type: 'video' }]);
            //     break;
            //   case 'carousel':
            //     setData((state) => [...state, { type: 'carousel', items: [] }]);
            //     break;
            //   case 'button':
            //     setData((state) => [...state, { type: 'button', text: '텍스트' }]);
            //     break;
            // }
          }}
          childrenItems={data}
        />
      </Paper>
    </>
  );
}
