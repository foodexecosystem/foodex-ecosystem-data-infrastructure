# foodex-ecosystem-data-infrastructure

زیرساخت دادهٔ سایت Foodex Ecosystem با ابزارهای گوگل؛ تنظیمات و مستندات مستقل از کد برنامه.

## سند مرکزی پیگیری سه پروژه

وضعیت کلی ایران، دیجیتال و اکوسیستم، مسئولیت‌ها و ترتیب نصب، تست و انتشار در [سند مرکزی زیرساخت دادهٔ فودکس](https://github.com/foodexecosystem/foodex-ecosystem-data-infrastructure/blob/main/docs/foodex-google-data-infrastructure.md) پیگیری می‌شود. قراردادها، تنظیمات و شواهد اختصاصی این پروژه در همین مخزن نگهداری می‌شوند.

## وضعیت — 2026-11-04

- Search Console به GA4 متصل است؛ لینک واقعی در هر دو پنل مشاهده شد.
- BigQuery به پروژهٔ foodex-ecosystem در US با خروجی Daily متصل است؛ وجود جدول و رکورد هنوز تأیید نشده.
- پنج تگ GTM ساخته، اعتبارسنجی و در نسخهٔ ۲ ذخیره شده‌اند؛ هنوز منتشر نشده‌اند.
- شش بُعد رویدادی GA4 و generate_lead به‌عنوان Key event ثبت شده‌اند؛ فیلتر داخلی در Testing است.
- مرحلهٔ فنی باقی‌مانده: نصب کانتینر و اتصال پیام صفحه/موفقیت فرم توسط مسئول برنامه، سپس آزمون زنده و انتشار.

## فایل‌های اصلی

- [گزارش وضعیت و شواهد](reports/status-2026-11-04.md)
- [قرارداد آمادهٔ اجرا برای رسول](google/measurement-contract.md)
- [طرح اندازه‌گیری](google/measurement-plan.md)
- [آزمون و انتشار](google/deployment-and-qa.md)
- [فایل Import تولیدشده](google/gtm-foundation-import.json)
- [خروجی بومی نسخهٔ ۲](google/gtm-native-version-2-2026-11-04.json)
- [بررسی فقط‌خواندنی BigQuery؛ اجرا نشده](google/bigquery/verify-export.sql)

## شناسه‌ها

| ابزار | شناسه |
|---|---|
| GA4 property / stream | 562368835 / 16270370970 |
| Measurement ID | G-E667121MXL |
| GTM container | GTM-WSNCPQCX |
| Google Cloud project | foodex-ecosystem |
| ساعت / ارز | United Arab Emirates UTC+04 / USD |

## بازسازی و بررسی

بدون dependency خارجی، با Node.js:

```sh
node scripts/build-foundation.mjs
node scripts/validate-foundation.mjs
node scripts/compare-native.mjs
```

آزمون آفلاین جای آزمون سایت و دریافت داده را نمی‌گیرد. پشتیبان بومی خروجی نسخهٔ ۲ ذخیره‌شده است و به معنی انتشار نیست. مخزن عمومی است؛ دادهٔ کاربران، فرم‌ها، توکن، کلید، تصاویر حساب و لینک Preview در آن قرار نگیرد.
