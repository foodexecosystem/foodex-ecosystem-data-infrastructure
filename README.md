# foodex-ecosystem-data-infrastructure

زیرساخت دادهٔ سایت Foodex Ecosystem با Google Analytics 4، Search Console، Tag Manager و BigQuery.

مالک و مقصد مخزن: [foodexecosystem/foodex-ecosystem-data-infrastructure](https://github.com/foodexecosystem/foodex-ecosystem-data-infrastructure). این بسته برای همان مخزن مستقل آماده شده؛ مخزن برنامهٔ سایت و مخزن ایران/دیجیتال تغییر نمی‌کند.

## وضعیت — 2026-11-04

- Search Console ↔ GA4: لینک واقعی مشاهده شد.
- BigQuery: لینک foodex-ecosystem، خروجی Daily در US؛ وجود جدول و داده هنوز تأیید نشده.
- GTM: کانتینر GTM-WSNCPQCX موجود ولی خالی؛ تعریف تگ، نصب، آزمون و انتشار باقی است.
- GitHub: دسترسی نوشتن افزونه برقرار شد؛ پنج فایل این نسخه در همین مخزن مستقل ثبت شده‌اند.

اطلاعات پنل‌های گوگل در گزارش، شواهد بررسی قبلی همین روز است. بازبینی تازهٔ مرورگر با خروج از حساب مواجه شد؛ به معنی قطع اتصال‌ها نیست.

## فایل‌ها

- [گزارش وضعیت و شواهد](reports/status-2026-11-04.md)
- [طرح اولیهٔ اندازه‌گیری؛ هنوز نهایی/پیاده نشده](google/measurement-plan.md)
- [چک‌لیست نصب، آزمون و انتشار](google/deployment-and-qa.md)
- [بررسی فقط‌خواندنی BigQuery؛ اجرا نشده](google/bigquery/verify-export.sql)

## شناسه‌ها

GA4 property: 562368835 — Stream: 16270370970 — Measurement ID: G-E667121MXL.
GTM: GTM-WSNCPQCX — Google Cloud project: foodex-ecosystem.
Timezone: United Arab Emirates / UTC+04:00. Currency: USD.

## مرزهای کار

این بسته فایل اجرایی GTM، خروجی بومی GTM یا ادعای تست زنده ندارد؛ تنظیمات اجرایی پس از بررسی واقعی سایت ساخته می‌شوند. مخزن فعلی عمومی است؛ رمز، API key، توکن، اطلاعات فرم، دادهٔ کاربر و تصاویر حساب در آن قرار نگیرد.

## منابع رسمی

- [راه‌اندازی BigQuery export](https://support.google.com/analytics/answer/9823238?hl=en)
- [قالب Dataset و جدول‌های GA4](https://support.google.com/analytics/answer/7029846?hl=en)
- [Sandbox](https://docs.cloud.google.com/bigquery/docs/sandbox)

