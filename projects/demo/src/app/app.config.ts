import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideToastService,
  ToastHorizontalPosition,
  ToastVerticalPosition,
} from 'daisyui-toaster';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideToastService({
      horizontalPosition: ToastHorizontalPosition.Right,
      verticalPosition: ToastVerticalPosition.Top,
      topOffset: 64,
      zIndex: 1000,
    }),
  ],
};
