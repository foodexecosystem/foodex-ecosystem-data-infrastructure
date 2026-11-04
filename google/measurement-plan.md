# طرح اندازه‌گیری اکوسیستم

بر مبنای بررسی زندهٔ سایت در 2026-11-04: Next.js، زبان فعلی انگلیسی، دامنهٔ اصلی https://foodexecosystem.com و دو فرم node-eoi-form و contact-form.

## رویدادها

| تگ | رویداد / مقصد | کاربرد |
|---|---|---|
| Base | G-E667121MXL | تنظیم مقصد و خاموش‌کردن page_view خودکار |
| Page view | page_view | یک نمایش واقعی صفحه پس از fx_page_ready معتبر |
| Contact click | contact_click | قصد تماس با تلفن، ایمیل یا WhatsApp؛ بدون مقدار تماس |
| Ecosystem navigation | ecosystem_navigation_click | رفتن به iran، consultant، digital یا trade |
| Form success | generate_lead | پذیرش واقعی فرم توسط Backend |

generate_lead در GA4 Key event است؛ به معنای ثبت قرارداد، فروش یا تأیید کیفیت سرنخ نیست. کلیک تماس هم اثبات انجام گفت‌وگو نیست.

## ابعاد گزارش

شش بُعد Event-scoped ثبت شده‌اند: content_language، page_type، contact_method، destination_group، link_position و form_id. content_group بُعد داخلی GA4 است. زبان فعلی en است؛ fa و ar برای توسعهٔ مسیرها پشتیبانی می‌شوند و وجود محتوای آن زبان‌ها ادعا نمی‌شود.

گروه‌ها: corporate، policies و other. نوع صفحه جداست: home، about، contact، faq، policy و other. مسیرهای مدیریتی از اجرای تگ‌ها خارج‌اند.

## سیاست ثبت

page_view دستی انتخاب شد. History خودکار، کلیک خروج خودکار، فرم خودکار، اسکرول، جست‌وجو، دانلود و ویدئوی خودکار خاموش‌اند. پنج تگ اولیه همهٔ جزئیات تعامل را ثبت نمی‌کنند؛ تعامل‌های بیشتر پس از نیاز واقعی و QA افزوده می‌شوند. نام و متن و مقادیر فرم ثبت نمی‌شوند.

URL صفحه با فهرست محدود پارامترها پاک‌سازی می‌شود؛ referrer خارجی فقط origin دارد. اطلاعات شخصی نباید در عنوان، مسیر یا UTM قرار بگیرد. Google signals و شخصی‌سازی تبلیغات در تگ پایه خاموش‌اند. اجرای تگ‌ها باید با سازوکار رضایت سایت هماهنگ شود؛ این بسته رضایت کاربر را مدیریت نمی‌کند.

## ترافیک تیم و نگهداری

کوکی اختیاری fxe_staff=1 مقدار traffic_type=internal می‌دهد. فیلتر موجود Internal Traffic در Testing مشاهده شد؛ تا آزمون مرورگر تیم و عادی به Active تغییر نکند. Testing هنوز داده را حذف نمی‌کند.

Event retention به 14 ماه تنظیم و ذخیره شد؛ User retention موجود 14 ماه و reset on new activity روشن باقی ماند. این تنظیمات GA4، محدودیت انقضای جدول‌های Sandbox در BigQuery را تغییر نمی‌دهند.

جزئیات نصب و پیام‌ها در [قرارداد فنی](measurement-contract.md) است.
