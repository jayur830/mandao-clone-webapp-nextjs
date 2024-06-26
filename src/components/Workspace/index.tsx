import { Paper } from '@mui/material';
import { useRef } from 'react';

import { Data } from '@/types/block';

import Block from './Block';

export interface WorkspaceProps {
  data: Data[];
  onChangeData(data: Data[]): void;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  selectedComponent: 'block' | 'image' | 'video' | 'carousel' | 'button' | null | undefined;
  onChangeSelectedDataIndex(value: number[]): void;
}

const widthMap = {
  desktop: 1440,
  tablet: 996,
  mobile: 512,
};

export default function Workspace({ data, onChangeData, breakpoint, selectedComponent, onChangeSelectedDataIndex }: WorkspaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  console.log(new DOMParser().parseFromString(ref.current?.innerHTML || '', 'text/html'));

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: widthMap[breakpoint],
        transition: 'all 0.3s ease',
      }}
    >
      <Paper
        elevation={15}
        sx={{
          position: 'relative',
          height: 'fit-content',
          minHeight: 500,
        }}
        onClick={(e) => {
          console.log('onClick Paper');
          e.stopPropagation();
          switch (selectedComponent) {
            case 'block':
              onChangeData([
                ...data,
                {
                  type: 'block',
                  style: {
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                },
              ]);
              break;
            case 'image':
              onChangeData([...data, { type: 'image' }]);
              break;
            case 'video':
              onChangeData([...data, { type: 'video' }]);
              break;
            case 'carousel':
              onChangeData([...data, { type: 'carousel', items: [] }]);
              break;
            case 'button':
              onChangeData([
                ...data,
                {
                  type: 'button',
                  text: '텍스트',
                  fullWidth: true,
                  style: {
                    borderRadius: 4,
                  },
                },
              ]);
              break;
          }
        }}
      >
        <Block
          selectedComponent={selectedComponent}
          onClick={(dataIndex) => {
            console.log('onClick Root Block');
            function recursive(state: Data[], index: number): Data[] {
              if (index < dataIndex.length) {
                return state.map((item, i) => {
                  if (i === dataIndex[index]) {
                    switch (item.type) {
                      case 'block':
                        return {
                          ...item,
                          children: recursive(item.children || [], index + 1),
                        };
                      default:
                        return item;
                    }
                  }

                  return item;
                });
              }

              switch (selectedComponent) {
                case 'block':
                  return [
                    ...state,
                    {
                      type: 'block',
                      style: {
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    },
                  ];
                case 'image':
                  return [...state, { type: 'image' }];
                case 'video':
                  return [...state, { type: 'video' }];
                case 'carousel':
                  return [...state, { type: 'carousel', items: [] }];
                case 'button':
                  return [
                    ...state,
                    {
                      type: 'button',
                      text: '텍스트',
                      fullWidth: true,
                      style: {
                        borderRadius: 4,
                      },
                    },
                  ];
                default:
                  return state;
              }
            }
            onChangeData(recursive(data, 0));
          }}
          onSelect={(dataIndex) => {
            onChangeSelectedDataIndex(dataIndex);
          }}
          dataIndex={[]}
          childrenItems={data}
        />
      </Paper>
    </div>
  );
}
