# daisyui-toaster

This is a customizable toast notification library for Angular applications, built with DaisyUI and Tailwind CSS.

## Installation

- npm: `npm install daisyui-toaster`
- yarn: `yarn add daisyui-toaster`
- pnpm: `pnpm add daisyui-toaster`

## Pre-requisites

- npm: `npm install -D tailwindcss daisyui`
- yarn: `yarn add -D tailwindcss daisyui`
- pnpm: `pnpm add -D tailwindcss daisyui`

## Usage

Provide the toast service in your Angular application:

```typescript
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
      defaultDuration: 5000,
      defaultShowClose: true,
      defaultCloseOnClick: false,
    }),
  ],
};
```

Add the `DaisyUiToasterComponent` to your application template:

```html
<daisyui-toaster></daisyui-toaster>
```

Import the `DaisyUiToasterComponent` in your application Component:

```typescript
import { Component } from '@angular/core';

import {
  DaisyUiToasterComponent,
  ToastService,
  ToastSeverity,
} from 'daisyui-toaster';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DaisyUiToasterComponent],
  templateUrl: './app.html',
  styleUrls: [],
})
export class App {}
```

Use the `ToastService` to add toasts:

```typescript
import { Component, inject } from '@angular/core';

import {
  DaisyUiToasterComponent,
  ToastService,
  ToastSeverity,
} from 'daisyui-toaster';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [DaisyUiToasterComponent],
  templateUrl: './demo.html',
  styleUrls: [],
})
export class DemoComponent {
  protected readonly toastService = inject(ToastService);
  protected readonly ToastSeverity = ToastSeverity;

  protected sendCallbackToast(): void {
    this.toastService.add({
      severity: ToastSeverity.Success,
      summary: 'Success',
      detail: 'This is a success toast with a callback!',
      duration: 5000,
      showClose: true,
      closeOnClick: false,
      callback: (): void => {
        alert('Toast clicked!');
      },
    });
  }
}
```

Add the package as a source to your css to prevent purging of styles used by the toast notifications.

```css
@import 'daisyui-toaster';
@source "./node_modules/daisyui-toaster";
@plugin "daisyui" {
  themes: dark --default;
}
```
