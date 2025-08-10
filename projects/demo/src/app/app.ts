import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  DaisyUiToasterComponent,
  ToastService,
  ToastSeverity,
} from '../../../../dist/daisyui-toaster';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DaisyUiToasterComponent, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: [],
})
export class App {
  protected readonly toastService = inject(ToastService);
  protected readonly ToastSeverity = ToastSeverity;
  protected readonly themes = [
    'dark',
    'light',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abyss',
    'silk',
  ];
  protected severity = ToastSeverity.Custom;
  protected summary = '';
  protected detail = '';
  protected duration = 3000;
  protected showClose = true;
  protected closeOnClick = true;

  protected sendClosableToast(): void {
    this.toastService.add({
      severity: ToastSeverity.Success,
      summary: 'Success',
      detail: 'This is a success toast!',
      duration: 5000,
      showClose: true,
      closeOnClick: true,
    });
  }

  protected sendAutocloseToast(): void {
    this.toastService.add({
      severity: ToastSeverity.Info,
      summary: 'Info',
      detail: 'This is an info toast that closes in 5 seconds!',
      duration: 5000,
      showClose: false,
      closeOnClick: false,
    });
  }

  protected sendCallbackToast(): void {
    this.toastService.add({
      severity: ToastSeverity.Info,
      summary: 'Info',
      detail: 'This is an info toast with a callback!',
      duration: 5000,
      showClose: true,
      closeOnClick: false,
      callback: (): void => {
        this.toastService.add({
          severity: ToastSeverity.Success,
          summary: 'Success',
          detail: 'Successful callback!',
          duration: 5000,
          showClose: true,
          closeOnClick: false,
        });
      },
    });
  }

  protected sendCustomToast(): void {
    this.toastService.add({
      severity: this.severity,
      summary: this.summary,
      detail: this.detail,
      duration: this.duration,
      showClose: this.showClose,
      closeOnClick: this.closeOnClick,
    });
  }

  protected setTheme(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const theme = selectElement.value;
    document.documentElement.setAttribute('data-theme', theme || 'dark');
  }
}
