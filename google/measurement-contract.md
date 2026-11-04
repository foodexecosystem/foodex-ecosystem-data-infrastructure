# قرارداد نصب و اندازه‌گیری — Foodex Ecosystem

وضعیت 2026-11-04: پنج تگ در Workspace ذخیره شده‌اند؛ نصب سایت، آزمون زنده و انتشار باقی است. مسئول تغییر برنامه: رسول. این مخزن فقط زیرساخت داده است.

## 1. نصب یک‌باره

کانتینر `GTM-WSNCPQCX` را از دستور نصب خود GTM در قالب عمومی Next.js نصب کنید. شناسهٔ مقصد GA4 برابر `G-E667121MXL` است. اسکریپت مستقیم GA4 موازی اضافه نشود. اجرا روی HTTPS و دامنهٔ foodexecosystem.com و www آن مجاز است؛ مسیرهای admin/api/auth/login/_next اندازه‌گیری نمی‌شوند. تنظیم رضایت موجود سایت باید در نصب حفظ شود؛ این بسته بنر یا CMP ایجاد نمی‌کند.

## 2. بازدید صفحه

روش انتخاب‌شده دستی است. بعد از بارگذاری اولیه و هر تغییر مسیر پذیرفته‌شده، پس از نهایی‌شدن document.title، یک پیام زیر ارسال شود. هر سه فیلد در هر پیام حاضر باشند. referrer در ورود اولیه document.referrer و در تغییر مسیر، URL صفحهٔ پذیرفته‌شدهٔ قبلی باشد.

```js
// previousAcceptedPageUrl is maintained by the application's router integration.
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'fx_page_ready',
  fx_page_location: window.location.href,
  fx_page_title: document.title,
  fx_page_referrer: previousAcceptedPageUrl || document.referrer || ''
});
```

در render مجدد، modal یا تغییر hash بدون نمایش صفحهٔ تازه تکرار نشود. Back/Forward واقعی هم پوشش داده شود. پیام پیش از بارگیری GTM می‌تواند در dataLayer صف شود. پیام قدیمی پس از تغییر مسیر ارسال نشود؛ URL و عنوان باید با صفحهٔ فعلی برابر باشند. این پیام تنها منبع page_view است؛ send_page_view و History خودکار خاموش‌اند.

## 3. موفقیت واقعی فرم

فقط بعد از تأیید پذیرش درخواست توسط Backend، یک بار به ازای ارسال پذیرفته‌شده:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({event: 'fx_form_success', form_id: 'node-eoi-form'});
// Contact page uses form_id: 'contact-form'.
```

| فرم واقعی | مسیر | مقدار مجاز form_id |
|---|---|---|
| درخواست همکاری نود | / | node-eoi-form |
| تماس عمومی | /contact-us | contact-form |

کلیک دکمه، validation، پاسخ خطا، timeout و نمایش toast به‌تنهایی موفقیت نیستند. هر پیام form_id تازه داشته باشد. اطلاعات فیلدها، پاسخ API، نام، ایمیل، تلفن، متن آزاد و توکن وارد dataLayer نشوند. اگر زبان‌های fa/en/ar اضافه شدند، پیشوند زبان در این دو مسیر پشتیبانی می‌شود.

## 4. لینک‌ها و داده‌های مجاز

تگ‌ها خودشان لینک‌های tel/mailto/WhatsApp و خروج به زیرسیستم‌ها را می‌سنجند؛ کد جداگانه برای کلیک لازم نیست. خروج به خدمات ایران با گروه consultant، سایر صفحات ایران با iran، دیجیتال با digital و ترید با trade ثبت می‌شود. raw URL مقصد و مقدار تلفن/ایمیل فرستاده نمی‌شود.

URL صفحه بدون hash و queryهای آزاد ارسال می‌شود؛ تنها UTMهای محدود و service از فهرست ثابت باقی می‌مانند. این کنترل تشخیص کامل دادهٔ شخصی نیست: در عنوان صفحه، path و UTMها اطلاعات شخصی قرار ندهید. referrer خارجی فقط origin و referrer داخلی بدون query/hash است.

## 5. ترافیک تیم

علامت اختیاری مرورگر تیم `fxe_staff=1` است و traffic_type=internal می‌سازد. روی مرورگر عادی تنظیم نشود. فیلتر باید تا قبولی آزمون دو مرورگر در Testing بماند؛ Testing هنوز داده را حذف نمی‌کند.

```js
document.cookie = 'fxe_staff=1; Path=/; Max-Age=7776000; SameSite=Lax; Secure';
```

## تحویل

URL نسخهٔ نصب‌شده و commit برنامه را در Issue نصب ثبت کنید. سپس Preview/DebugView و آزمون فرم‌ها در محیط کنترل‌شده انجام می‌شود؛ بعد GTM منتشر و دریافت عادی GA4 و اولین جدول روزانهٔ BigQuery بررسی خواهد شد. هیچ فرم واقعی برای آزمون این مرحله ارسال نشده است.
