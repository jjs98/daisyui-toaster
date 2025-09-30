export interface ToastConfig {
  zIndex?: number;
  verticalPosition?: ToastVerticalPosition;
  horizontalPosition?: ToastHorizontalPosition;
  topOffset?: number;
  bottomOffset?: number;
  leftOffset?: number;
  rightOffset?: number;
  maxToasts?: number;
  defaultDuration?: number;
  defaultShowClose?: boolean;
  defaultCloseOnClick?: boolean;
}

export enum ToastVerticalPosition {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
}

export enum ToastHorizontalPosition {
  Left = 'start',
  Center = 'center',
  Right = 'end',
}
