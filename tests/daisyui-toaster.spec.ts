import { test, expect } from '@playwright/test';

import { ToastSeverity } from '../projects/daisyui-toaster/src/lib/models/toast';

test('send closable toast and close with button', async ({
  page,
}): Promise<void> => {
  await page.goto('http://localhost:4200/');

  await page.locator('#send-closable-toast').click();

  const toast = page.locator('#toast-container').locator('#toast-1');
  await expect(toast).toBeVisible();
  const closeButton = toast.locator('#toast-1-close');
  await expect(closeButton).toBeVisible();

  await closeButton.click();

  await expect(toast).not.toBeVisible();
});

test('send closable toast and close with click', async ({
  page,
}): Promise<void> => {
  await page.goto('http://localhost:4200/');

  await page.locator('#send-closable-toast').click();

  const toast = page.locator('#toast-container').locator('#toast-1');
  await expect(toast).toBeVisible();
  const closeButton = toast.locator('#toast-1-close');
  await expect(closeButton).toBeVisible();

  await toast.click();

  await expect(toast).not.toBeVisible();
});

test('send autoclose toast and not close with click', async ({
  page,
}): Promise<void> => {
  await page.goto('http://localhost:4200/');

  await page.locator('#send-autoclose-toast').click();

  const toast = page.locator('#toast-container').locator('#toast-1');
  await expect(toast).toBeVisible();
  const closeButton = toast.locator('#toast-1-close');
  await expect(closeButton).not.toBeVisible();

  await toast.click();

  await expect(toast).toBeVisible();
});

test('send callback toast', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:4200/');

  await page.locator('#send-callback-toast').click();

  const toast = page.locator('#toast-container').locator('#toast-1');
  await expect(toast).toBeVisible();

  await toast.click();

  await expect(toast).toBeVisible();

  const callbackToast = page.locator('#toast-container').locator('#toast-2');
  await expect(callbackToast).toBeVisible();
});

[
  {
    severity: ToastSeverity.Success,
    summary: 'Success',
    detail: 'This is a success toast!',
    showClose: true,
    closeOnClick: true,
  },
  {
    severity: ToastSeverity.Info,
    summary: 'Info',
    detail: 'This is an info toast!',
    showClose: true,
    closeOnClick: false,
  },
  {
    severity: ToastSeverity.Warning,
    summary: 'Warning',
    detail: 'This is a warning toast!',
    showClose: false,
    closeOnClick: true,
  },
  {
    severity: ToastSeverity.Error,
    summary: 'Error',
    detail: 'This is an error toast!',
    showClose: false,
    closeOnClick: false,
  },
  {
    severity: ToastSeverity.Custom,
    summary: 'Custom',
    detail: 'This is a custom toast!',
    showClose: true,
    closeOnClick: true,
  },
].forEach(({ severity, summary, detail, showClose, closeOnClick }): void => {
  test(`send custom toast ${summary}`, async ({ page }): Promise<void> => {
    await page.goto('http://localhost:4200/');

    await page.locator('#severity').selectOption(severity);
    await page.locator('#summary').fill(summary);
    await page.locator('#detail').fill(detail);
    if (!showClose) {
      await page.locator('#showClose').uncheck();
    }
    if (!closeOnClick) {
      await page.locator('#closeOnClick').uncheck();
    }

    await page.locator(`#send-custom-toast`).click();

    const toast = page.locator('#toast-container').locator('#toast-1');
    await expect(toast).toBeVisible();
    await expect(toast.locator('#toast-1-summary')).toHaveText(summary);
    await expect(toast.locator('#toast-1-detail')).toHaveText(detail);

    if (showClose) {
      await expect(toast.locator('#toast-1-close')).toBeVisible();
    }

    await toast.click();

    if (closeOnClick) {
      await expect(toast).not.toBeVisible();
    } else {
      await expect(toast).toBeVisible();
    }
  });
});

test('send custom toast with duration', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:4200/');

  await page.locator('#duration').fill('200');

  await page.locator('#send-custom-toast').click();

  const toast = page.locator('#toast-container').locator('#toast-1');
  await expect(toast).toBeVisible();

  await new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, 200));

  await expect(toast).not.toBeVisible();
});
