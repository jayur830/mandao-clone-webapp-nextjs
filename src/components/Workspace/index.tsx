import { Paper } from '@mui/material';
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

  console.log('data:', data);

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
          onClick={(dataIndex) => {
            function recursive(state: Data[], index: number): Data[] {
              if (index < dataIndex.length) {
                console.log('index:', index, 'dataIndex:', dataIndex[index], state);
                return state.map((item, i) => {
                  if (i === dataIndex[index] && item.type === 'block') {
                    return {
                      ...item,
                      children: recursive(item.children || [], index + 1),
                    };
                  }

                  return item;
                });
              }

              switch (selectedComponent) {
                case 'block':
                  return [...state, { type: 'block' }];
                case 'image':
                  return [...state, { type: 'image' }];
                case 'video':
                  return [...state, { type: 'video' }];
                case 'carousel':
                  return [...state, { type: 'carousel', items: [] }];
                case 'button':
                  return [...state, { type: 'button', text: '텍스트' }];
                default:
                  return state;
              }
            }
            setData((state) => recursive(state, 0));
          }}
          dataIndex={[]}
          childrenItems={data}
        />
      </Paper>
    </>
  );
}
