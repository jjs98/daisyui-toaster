[![npm](https://img.shields.io/npm/v/daisyui-toaster?color=%2300d26a&style=for-the-badge)](https://www.npmjs.com/package/daisyui-toaster)
[![Build Status](https://img.shields.io/github/actions/workflow/status/jjs98/daisyui-toaster/deploy.yml?branch=main&style=for-the-badge)](https://github.com/jjs98/daisyui-toaster/actions/workflows/deploy.yml)
[![bundle size](https://img.shields.io/bundlephobia/minzip/daisyui-toaster?color=%23FF006F&label=Bundle%20Size&style=for-the-badge)](https://bundlephobia.com/package/daisyui-toaster)

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

Copy the `safelist.html` file somewhere to your project. This needs to be done so that Tailwind CSS will not purge the styles used by the toast notifications. You can place it in the `src` folder or any other location that is included in your build process.

## Demo

To run the demo application, follow these steps:

- `pnpm install`
- `pnpm start`
