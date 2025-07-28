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
      horizontalPosition: ToastHorizontalPosition.Center,
      verticalPosition: ToastVerticalPosition.Top,
      zIndex: 1000,
    }),
  ],
};
