export type Data =
  | {
      type: 'block';
      children?: Data[];
    }
  | {
      type: 'image';
      src?: string;
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
      style?: Partial<{
        fontSize: number;
        fontWeight: 100 | 300 | 400 | 500 | 600 | 700;
      }>;
    };
