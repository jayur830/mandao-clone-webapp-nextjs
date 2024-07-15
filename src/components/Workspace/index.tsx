import { Paper } from '@mui/material';
import { useRef } from 'react';

import { Data } from '@/types/block';

import Block from './Block';

export interface WorkspaceProps {
  data: Data[];
  onChangeData(data: Data[]): void;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  selectedComponent: 'block' | 'image' | 'video' | 'carousel' | 'button' | null | undefined;
  selectedDataIndex?: number[] | null | undefined;
  onChangeSelectedDataIndex(value: number[]): void;
}

const widthMap = {
  desktop: 1440,
  tablet: 996,
  mobile: 512,
};

export default function Workspace({ data, onChangeData, breakpoint, selectedComponent, selectedDataIndex, onChangeSelectedDataIndex }: WorkspaceProps) {
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
          // minHeight: 500,
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
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                  },
                },
              ]);
              break;
            case 'image':
              onChangeData([...data, { type: 'image', fullWidth: true }]);
              break;
            case 'video':
              onChangeData([...data, { type: 'video', fullWidth: true }]);
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
                    backgroundColor: '#0B74E2',
                    color: '#FFFFFF',
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
                        paddingTop: 0,
                        paddingRight: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                      },
                    },
                  ];
                case 'image':
                  return [...state, { type: 'image', fullWidth: true }];
                case 'video':
                  return [...state, { type: 'video', fullWidth: true }];
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
                        backgroundColor: '#0B74E2',
                        color: '#FFFFFF',
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
          onDelete={(dataIndex) => {
            if (dataIndex.every((index, i) => index === selectedDataIndex?.[i])) {
              onChangeSelectedDataIndex([]);
            }

            if (dataIndex.length === 1) {
              return onChangeData(data.filter((_, i) => i !== dataIndex[0]));
            }

            function map(item: Data, i: number, current: number = 0): Data {
              if (i === dataIndex[current]) {
                if (item.type === 'block' && item.children) {
                  if (current === dataIndex.length - 2) {
                    return {
                      ...item,
                      children: item.children.filter((_, j) => j !== dataIndex[current + 1]),
                    };
                  }

                  return {
                    ...item,
                    children: item.children.map((child, j) => map(child, j, current + 1)),
                  };
                }

                return item;
              }

              return item;
            }

            onChangeData(data.map((item, i) => map(item, i)));
          }}
          dataIndex={[]}
          childrenItems={data}
        />
      </Paper>
    </div>
  );
}
