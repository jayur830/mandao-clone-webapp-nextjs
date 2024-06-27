import { Paper } from '@mui/material';

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
              onChangeData([...data, { type: 'button', text: '텍스트' }]);
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
                  return [...state, { type: 'button', text: '텍스트' }];
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
    </>
  );
}
