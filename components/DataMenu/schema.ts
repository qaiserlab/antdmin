export interface ItemInterface {
  key?: string;
  title: string;
  icon?: Object;
  disabled?: boolean;
  hidden?: boolean;
  children?: Array<ItemInterface>;
};

export interface PropsInterface {
  dataSource: Array<ItemInterface>;
  mode?: any;
  theme?: any;
  onSelect?: (event: any) => void;
};