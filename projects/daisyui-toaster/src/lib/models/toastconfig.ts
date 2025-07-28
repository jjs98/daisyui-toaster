export interface ToastConfig {
  zIndex?: number;
  verticalPosition?: ToastVerticalPosition;
  horizontalPosition?: ToastHorizontalPosition;
}

export enum ToastVerticalPosition {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
}

export enum ToastHorizontalPosition {
  Start = 'start',
  Center = 'center',
  End = 'end',
}
