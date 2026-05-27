# سند طراحی ERP اختصاصی مجموعه وس
### نسخه ۱.۰ | تاریخ: خرداد ۱۴۰۵
### Senior Product Architect + ERP Consultant + Full-Stack System Designer

---

## ۱. تعریف کلی محصول

### نام پیشنهادی سیستم
**WAS-OS** (WAS Operating System)
زیرعنوان: *سیستم عملیاتی یکپارچه مجموعه وس*

---

### مأموریت ERP
WAS-OS طراحی شده تا تمام فرایندهای عملیاتی مجموعه وس را از لحظه ورود لید تا تسویه نهایی مشتری، در یک پلتفرم واحد یکپارچه کند. این سیستم نه یک CRM ساده است، نه یک ابزار گزارش‌گیری. WAS-OS نقش **سیستم عصبی مرکزی وس** را ایفا می‌کند؛ تمام تصمیم‌های عملیاتی، از پیگیری فروش گرفته تا کنترل انبار، تامین و مالی، از طریق این پلتفرم هدایت می‌شوند.

سیستم حسابداری **منطق** نقش **Accounting Engine** را حفظ می‌کند و WAS-OS از طریق Integration Layer با آن ارتباط برقرار می‌کند.

---

### تفاوت WAS-OS با CRM ساده

| ویژگی | CRM ساده | WAS-OS |
|---|---|---|
| تمرکز | مدیریت مشتری و فروش | کل عملیات کسب‌وکار |
| انبار | ندارد | کامل با رزرو و هشدار |
| تامین | ندارد | مدیریت تامین‌کننده و سفارش |
| مالی | بدهی ساده | Integration کامل با منطق |
| B2B | پایه | قرارداد، اعتبار، قیمت اختصاصی |
| پروژه | ندارد | مدیریت پروژه ساختمانی |
| هوش مصنوعی | ندارد | AI Sales Assistant کامل |
| BI | گزارش ساده | داشبورد مدیریتی چندلایه |
| کال‌سنتر | ثبت تماس پایه | Script، ارجاع، گزارش اپراتور |

---

### ارزش استراتژیک برای وس

۱. **یکپارچگی عملیاتی**: حذف جزیره‌های اطلاعاتی بین فروش، انبار، تامین و مالی
۲. **تسریع چرخه فروش**: از لید تا فاکتور در یک جریان واحد
۳. **کنترل مالی بدون تکرار**: منطق به‌عنوان موتور حسابداری، WAS-OS به‌عنوان لایه عملیاتی
۴. **تصمیم‌گیری مبتنی بر داده**: BI و AI برای مدیران ارشد
۵. **مقیاس‌پذیری**: آماده رشد به چندین شعبه، برند و کانال فروش

---

## ۲. نقش‌ها و کاربران سیستم

### ۲.۱ مدیرعامل (CEO)
**سطح دسترسی**: Read-Only روی همه ماژول‌ها + تایید عملیات حساس

**نیازهای اصلی**:
- داشبورد اجرایی با KPIهای کلیدی (فروش روز، هفته، ماه)
- مقایسه عملکرد تیم‌ها
- سودآوری برندها و مشتریان B2B
- هشدارهای بحرانی (کمبود انبار، بدهی بالا، فرصت از دست رفته)
- گزارش خودکار AI

**محدودیت‌ها**: نمی‌تواند داده ثبت یا ویرایش کند، فقط مشاهده و تایید

---

### ۲.۲ مدیر فروش
**سطح دسترسی**: کامل روی CRM، لید، فروش، B2B + مشاهده مالی

**نیازهای اصلی**:
- مدیریت قیف فروش تیم
- تخصیص لیدها به کارشناسان
- تایید تخفیف‌های بالای سقف
- گزارش عملکرد فردی و تیمی
- مشاهده پایپ‌لاین و پیش‌بینی فروش

---

### ۲.۳ تیم فروش حضوری
**سطح دسترسی**: CRM + لید + پیش‌فاکتور + سفارش خودشان + پروژه

**نیازهای اصلی**:
- ثبت و پیگیری لیدهای خود
- ارسال پیش‌فاکتور
- مشاهده موجودی انبار
- ثبت یادداشت و فایل برای مشتری
- دریافت پیشنهادهای AI برای اقدام بعدی
- نسخه موبایل فعال

---

### ۲.۴ تیم فروش B2B
**سطح دسترسی**: CRM + B2B ماژول کامل + قراردادها + قیمت‌گذاری اختصاصی

**نیازهای اصلی**:
- مدیریت پروژه‌های بزرگ
- تعریف شرایط پرداخت و سقف اعتبار
- قیمت‌گذاری سفارشی per مشتری
- مدیریت سفارش‌های عمده

---

### ۲.۵ کال‌سنتر
**سطح دسترسی**: CRM (read) + CallLog + لید + ارجاع

**نیازهای اصلی**:
- نمایش پروفایل مشتری هنگام تماس
- Script مکالمه بر اساس نوع تماس
- ثبت درخواست و ارجاع سریع
- گزارش روزانه تماس‌ها

---

### ۲.۶ تیم تامین
**سطح دسترسی**: تامین کامل + مشاهده انبار + مشاهده سفارش‌های فروش

**نیازهای اصلی**:
- دریافت درخواست تامین از انبار/فروش
- مقایسه تامین‌کنندگان
- ثبت سفارش خرید
- پیگیری وضعیت تامین

---

### ۲.۷ انبار
**سطح دسترسی**: انبار کامل + مشاهده سفارش‌های فروش + درخواست تامین

**نیازهای اصلی**:
- ثبت ورود و خروج کالا
- رزرو کالا برای سفارش تایید شده
- صدور حواله انبار
- هشدار کمبود موجودی

---

### ۲.۸ مالی
**سطح دسترسی**: مالی کامل + مشاهده فروش + مشاهده سفارش + Integration منطق

**نیازهای اصلی**:
- مشاهده وضعیت پرداخت مشتریان
- تایید یا رد پیش‌فاکتورهای حساس
- گزارش بدهی و مانده حساب
- Sync با منطق

---

### ۲.۹ بازاریابی
**سطح دسترسی**: مارکتینگ کامل + مشاهده لید + مشاهده CRM (read-only)

**نیازهای اصلی**:
- ایجاد و مدیریت کمپین
- تحلیل منبع لیدها
- ارسال پیامک/واتساپ/ایمیل
- گزارش ROI کمپین

---

### ۲.۱۰ ادمین سیستم
**سطح دسترسی**: کامل روی تمام ماژول‌ها + تنظیمات + کاربران + لاگ

**نیازهای اصلی**:
- مدیریت کاربران و نقش‌ها
- تنظیمات Integration
- مشاهده Activity Log
- مدیریت backup و امنیت

---

### ۲.۱۱ مدیر محصول / مدیر دیجیتال
**سطح دسترسی**: محصولات + برندها + مارکتینگ + BI + AI

**نیازهای اصلی**:
- مدیریت کاتالوگ محصولات
- تحلیل عملکرد برندها
- مدیریت کمپین‌های دیجیتال
- گزارش تحلیلی BI

---

## ۳. ماژول‌های اصلی ERP

### ۳.الف ماژول CRM و مدیریت مشتری

**هدف**: نگهداری تمام اطلاعات مشتریان در یک پروفایل یکپارچه

**ورودی‌ها**: داده ثبت دستی، لیدهای تبدیل شده، سفارش‌های قبلی، تماس‌های کال‌سنتر

**خروجی‌ها**: پروفایل کامل مشتری، امتیاز مشتری، پیشنهادات AI، گزارش تعاملات

**فیچرها**:

*پروفایل مشتری*:
- نام کامل، کد ملی/ثبت، تلفن‌ها، ایمیل، آدرس‌ها
- نوع مشتری: مالک، سازنده، معمار، پیمانکار، شرکت، مشتری B2B، مشتری خرده
- درجه‌بندی: A، B، C، D (بر اساس حجم خرید و وفاداری)
- منبع آشنایی: معرفی، کال‌سنتر، وبسایت، نمایشگاه، شبکه‌های اجتماعی
- مسئول حساب (Account Manager)
- امتیاز مشتری (Customer Score) محاسبه شده توسط AI

*تاریخچه تعاملات*:
- لیست تمام تماس‌ها، پیگیری‌ها، ملاقات‌ها
- لیست سفارش‌ها و پیش‌فاکتورها
- لیست پروژه‌های مرتبط
- فایل‌ها و مستندات

*وضعیت مالی*:
- مانده بدهی (از منطق)
- سقف اعتبار
- تاریخ آخرین پرداخت

*ارتباط با سایر ماژول‌ها*: لید، فروش، B2B، پروژه، مالی، کال‌سنتر، AI

---

### ۳.ب ماژول مدیریت لید و فرصت فروش

**هدف**: مدیریت کامل قیف فروش از اولین تماس تا تبدیل به مشتری

**کانال‌های ورود لید**:
- فرم وبسایت (API)
- کال‌سنتر (Manual)
- واتساپ بیزینس (API)
- اینستاگرام (دستی)
- نمایشگاه (Import CSV)
- معرفی مشتری قبلی
- ورود دستی توسط فروشنده

**مراحل قیف فروش (Pipeline Stages)**:
1. لید جدید (New)
2. تماس اولیه برقرار شد (Contacted)
3. علاقه‌مند (Interested)
4. پیش‌فاکتور ارسال شد (Quoted)
5. در حال مذاکره (Negotiating)
6. بسته شد - برنده (Won)
7. بسته شد - باخته (Lost)

**فیچرها**:
- تخصیص خودکار/دستی لید به کارشناس بر اساس منطقه، نوع مشتری یا Round-Robin
- SLA پیگیری: هشدار اگر لید ۲۴ ساعت بدون پیگیری بماند
- ثبت دلیل از دست رفتن: قیمت، رقیب، زمان‌بندی، بودجه، عدم نیاز
- نرخ تبدیل per کارشناس، per کانال، per محصول
- Duplicate Detection: تشخیص لید تکراری بر اساس تلفن/ایمیل

**ارتباط با سایر ماژول‌ها**: CRM، کال‌سنتر، فروش، مارکتینگ، AI

---

### ۳.ج ماژول کال‌سنتر

**هدف**: ثبت، مدیریت و تحلیل تمام تماس‌های ورودی و خروجی

**فیچرها**:
- ثبت تماس با کد مشتری یا شماره تلفن
- نمایش خودکار پروفایل مشتری هنگام ورود شماره
- Script مکالمه: بر اساس نوع تماس (خرید، پیگیری، شکایت، اطلاعات)
- وضعیت تماس: پاسخ داده شد، پیام گذاشته شد، پاسخ نداد، قطع کرد
- ثبت نوع درخواست: استعلام قیمت، پیگیری سفارش، شکایت، اطلاعات محصول، خرید
- ارجاع به: فروش (ایجاد لید)، تامین (پیگیری سفارش)، پشتیبانی (شکایت)
- سیستم یادآور: تماس برگشتی در زمان مشخص

**گزارش اپراتور**:
- تعداد تماس روزانه/هفتگی
- نرخ تبدیل تماس به لید
- میانگین مدت تماس
- تعداد ارجاع به فروش

**ارتباط با سایر ماژول‌ها**: CRM، لید، فروش، AI

---

### ۳.د ماژول فروش

**هدف**: مدیریت کامل چرخه فروش از پیش‌فاکتور تا تحویل

**جریان اصلی**:
```
لید تایید شده → پیش‌فاکتور → تایید مشتری → سفارش → بررسی موجودی → تایید مالی → حواله انبار → ارسال → فاکتور منطق
```

**فیچرهای پیش‌فاکتور (Quotation)**:
- انتخاب محصول از کاتالوگ با قیمت پیش‌فرض
- اعمال تخفیف (با سطح تایید بر اساس درصد)
- محاسبه خودکار مالیات، ارزش افزوده
- تاریخ انقضا
- ارسال PDF به واتساپ/ایمیل مشتری
- مقایسه چند پیش‌فاکتور

**فیچرهای سفارش (Order)**:
- تبدیل پیش‌فاکتور به سفارش با یک کلیک
- تایید اعتبار مالی مشتری قبل از ثبت
- بررسی موجودی انبار در لحظه
- رزرو خودکار کالا
- وضعیت: ثبت شده، تایید شده، در حال تامین، آماده ارسال، ارسال شده، تحویل داده شده
- وضعیت پرداخت: پرداخت نشده، پرداخت جزئی، تسویه شده

**مدیریت تخفیف (Multi-level Approval)**:
- ۰-۵٪: کارشناس فروش
- ۵-۱۵٪: مدیر فروش
- بالای ۱۵٪: مدیرعامل

**ارتباط با سایر ماژول‌ها**: CRM، انبار، مالی، تامین، منطق

---

### ۳.هـ ماژول فروش B2B

**هدف**: مدیریت مشتریان سازمانی، قراردادها و پروژه‌های بزرگ

**فیچرها**:

*مدیریت مشتریان سازمانی*:
- پروفایل شرکت (نام، ثبت، نماینده، مجوزها)
- درخت مخاطبین (تصمیم‌گیر، خریدار، مهندس)
- تاریخچه قراردادها

*قرارداد*:
- تاریخ شروع و پایان
- حجم تخمینی سفارش
- شرایط قیمت‌گذاری
- شرایط پرداخت: نقد، ۳۰ روزه، ۶۰ روزه، اقساطی
- سقف اعتبار مصوب
- جریمه تاخیر پرداخت

*قیمت‌گذاری اختصاصی*:
- قیمت خاص per مشتری per محصول
- تخفیف حجمی (Volume Discount)
- قیمت قرارداد (Contract Price) با تاریخ انقضا

*سفارش‌های عمده*:
- Bulk Order با تحویل مرحله‌ای
- پیوند به پروژه ساختمانی
- وضعیت تامین هر مرحله

*گزارش سودآوری*:
- درآمد، هزینه، حاشیه سود per مشتری B2B
- مقایسه دوره‌ای

**ارتباط با سایر ماژول‌ها**: CRM، پروژه، انبار، تامین، مالی، منطق

---

### ۳.و ماژول تامین

**هدف**: مدیریت کامل فرایند خرید و تامین کالا

**جریان اصلی**:
```
هشدار کمبود / درخواست فروش → ایجاد درخواست تامین → انتخاب تامین‌کننده → صدور سفارش خرید → پیگیری → دریافت کالا → ورود به انبار
```

**فیچرها**:

*درخواست تامین (Purchase Request)*:
- منشاء: هشدار خودکار انبار، درخواست دستی، سفارش B2B بزرگ
- اولویت: فوری، عادی، پایین
- مقدار درخواستی و مقدار تایید شده

*مدیریت تامین‌کنندگان*:
- پروفایل کامل (نام، کد، تماس، شرایط)
- تاریخچه معاملات
- امتیاز تامین‌کننده (قیمت، کیفیت، زمان تحویل)
- محصولاتی که تامین می‌کند

*مقایسه تامین‌کنندگان*:
- جدول مقایسه قیمت، زمان تحویل، شرایط پرداخت
- پیشنهاد AI برای بهترین تامین‌کننده

*سفارش خرید (Purchase Order)*:
- وضعیت: پیش‌نویس، ارسال شده، تایید شده، در راه، دریافت شده، لغو
- پیگیری زمان تحویل وعده داده شده vs واقعی

*هشدارهای خودکار*:
- موجودی زیر حد Reorder Point
- سفارش تامین با تاخیر
- انقضای قرارداد تامین‌کننده

**ارتباط با سایر ماژول‌ها**: انبار، فروش، مالی، منطق

---

### ۳.ز ماژول انبار

**هدف**: کنترل دقیق موجودی و جریان کالا

**فیچرها**:

*موجودی*:
- موجودی فیزیکی
- موجودی رزرو شده (برای سفارش‌های تایید شده)
- موجودی قابل فروش = موجودی فیزیکی - رزرو شده
- موجودی در راه (سفارش تامین داده شده اما نرسیده)

*ورود کالا (Goods Receipt)*:
- ورود از محل خرید (لینک به PO)
- ورود مرجوعی مشتری
- تاریخ، تعداد، شماره سریال/بچ، وضعیت کالا

*خروج کالا (Goods Issue)*:
- خروج با حواله انبار (لینک به سفارش فروش)
- خروج مرجوعی به تامین‌کننده
- ضایعات و اسقاط

*رزرو کالا*:
- رزرو خودکار هنگام تایید سفارش
- آزاد شدن رزرو در صورت لغو سفارش
- نمایش کالاهای رزرو شده per سفارش

*انبارگردانی*:
- ثبت شمارش فیزیکی
- محاسبه مغایرت
- تاییدیه مدیر انبار

*هشدارها*:
- موجودی زیر Minimum Stock
- کالای بدون حرکت بیش از N روز
- رزرو بدون حواله خروج

**ارتباط با سایر ماژول‌ها**: تامین، فروش، مالی، محصولات

---

### ۳.ح ماژول مالی (Integration Layer)

**مهم**: این ماژول داده‌ها را **نمایش می‌دهد** و **هماهنگ می‌کند**، اما عملیات حسابداری واقعی در **منطق** انجام می‌شود.

**آنچه WAS-OS انجام می‌دهد**:
- نمایش وضعیت پرداخت مشتری (دریافت از منطق)
- نمایش مانده بدهی مشتری (دریافت از منطق)
- ثبت وضعیت سفارش برای sync با منطق
- تایید یا توقف سفارش بر اساس اعتبار مشتری
- نمایش گزارش فروش مالی (ترکیب WAS-OS + منطق)

**آنچه منطق انجام می‌دهد**:
- صدور فاکتور رسمی
- ثبت دریافت وجه
- حسابداری دوطرفه
- گزارش‌های مالی رسمی
- محاسبه مالیات

**فیچرهای WAS-OS در این ماژول**:
- داشبورد مانده‌های مشتریان (Sync از منطق)
- هشدار مشتریان با بدهی بالا
- تایید سقف اعتبار قبل از ثبت سفارش
- گزارش فروش per فروشنده، per ماه (از WAS-OS)
- گزارش وضعیت فاکتورهای صادره (Sync از منطق)

**ارتباط با سایر ماژول‌ها**: تمام ماژول‌ها + Integration Layer منطق

---

### ۳.ط ماژول محصولات و برندها

**هدف**: کاتالوگ کامل محصولات با امکان جستجو و پیشنهاد هوشمند

**فیچرها**:
- دسته‌بندی سلسله‌مراتبی (۳ سطح): گروه > دسته > زیردسته
- مشخصات فنی per دسته‌بندی (Dynamic Fields)
- برندها با پروفایل کامل (نماینده، قرارداد، شرایط)
- قیمت فروش با تاریخ اعتبار
- قیمت خرید (فقط قابل مشاهده برای مجاز)
- وضعیت موجودی نمایش real-time از انبار
- کالاهای جایگزین (Alternative Products)
- کالاهای مکمل (Cross-sell Products)
- تصاویر، کاتالوگ PDF، مشخصات فنی فایل

**پیشنهاد محصول**:
- AI پیشنهاد محصول مکمل هنگام ثبت سفارش
- نمایش محصولات پرفروش per نوع مشتری

**ارتباط با سایر ماژول‌ها**: انبار، فروش، تامین، AI

---

### ۳.ی ماژول پروژه‌های ساختمانی

**هدف**: ردیابی پروژه‌های ساختمانی مشتریان و فرصت‌های فروش مرحله‌ای

**فیچرها**:

*تعریف پروژه*:
- نام، آدرس، نوع پروژه (مسکونی، تجاری، صنعتی، اداری)
- مالک پروژه (لینک به CRM)
- معمار، سازنده، پیمانکار (لینک به CRM)
- تعداد واحد، متراژ، تعداد طبقه

*مرحله پروژه*:
- اسکلت، نما، دیوارچینی، سقف، کف، سرویس‌ها، نازک‌کاری، تاسیسات، تجهیزات

*فرصت فروش مرحله‌ای*:
- per هر مرحله: محصولات مورد نیاز، بودجه تقریبی، زمان خرید تخمینی
- وضعیت: برنامه‌ریزی شده، در حال مذاکره، سفارش داده شده، تحویل شده

*مدیریت پروژه*:
- Timeline پروژه
- اسناد: نقشه، مجوز، قرارداد
- یادداشت‌های بازدید میدانی

**ارتباط با سایر ماژول‌ها**: CRM، B2B، فروش، لید

---

### ۳.ک ماژول مارکتینگ

**هدف**: مدیریت کمپین‌ها، تحلیل کانال‌ها و بازگشت مشتریان

**فیچرها**:

*کمپین‌ها*:
- نوع: پیامک، واتساپ، ایمیل، تبلیغات دیجیتال، نمایشگاه
- مخاطبین: Segment از CRM
- بودجه و هزینه واقعی
- تاریخ شروع/پایان
- گزارش: ارسال، باز شده، کلیک، لید ایجاد شده، فروش ایجاد شده

*سگمنت‌بندی مشتریان*:
- بر اساس نوع، درجه، منطقه، محصول خریداری شده، آخرین خرید
- سگمنت‌های پیشنهادی AI

*کمپین‌های بازگشتی*:
- مشتریانی که N ماه خرید نکرده‌اند
- مشتریان بازخورد منفی داده
- مشتریانی که لید داشتند ولی نخریدند

*تحلیل ROI*:
- هزینه هر لید per کانال
- هزینه هر مشتری جدید per کمپین
- درآمد منتسب به کمپین

**ارتباط با سایر ماژول‌ها**: CRM، لید، AI

---

### ۳.ل ماژول داشبورد مدیریتی و BI

**داشبورد مدیرعامل**:
- فروش امروز vs هدف
- فروش ماه جاری vs ماه قبل vs هدف
- تعداد لید جدید هفته
- نرخ تبدیل لید به فروش
- بدهی‌های معوق بالای X روز
- کمبود موجودی بحرانی
- عملکرد تیم فروش
- سودآوری top 10 برند
- سودآوری top 10 مشتری B2B

**داشبورد فروش**:
- پایپ‌لاین per کارشناس
- قیف فروش تیمی
- سفارش‌های در انتظار تحویل
- پیش‌فاکتورهای منقضی

**داشبورد تامین**:
- سفارش‌های خرید در راه
- تامین‌کنندگان با تاخیر
- درخواست‌های تامین در انتظار تایید

**داشبورد انبار**:
- موجودی فیزیکی vs رزرو vs قابل فروش
- کالاهای با موجودی بحرانی
- رزروهای بدون خروج

**داشبورد مالی**:
- فروش‌های تسویه نشده
- مانده بدهی مشتریان (از منطق)
- جریان نقدینگی تخمینی

**داشبورد مارکتینگ**:
- لیدهای ورودی per کانال (هفتگی)
- نرخ تبدیل per کانال
- ROI کمپین‌های فعال

**KPIهای اصلی سیستم**:
- Revenue (روزانه/هفتگی/ماهانه/سالانه)
- Lead Conversion Rate
- Average Order Value
- Customer Lifetime Value (CLV)
- Days Sales Outstanding (DSO)
- Inventory Turnover Rate
- On-Time Delivery Rate
- Call Resolution Rate

---

### ۳.م ماژول هوش مصنوعی

**هدف**: تبدیل داده‌های عملیاتی به بینش‌های اجرایی

**AI Sales Assistant**:
- پس از هر تعامل با مشتری، اقدام بعدی پیشنهادی نمایش می‌دهد
- مثال: "مشتری ۳ بار قیمت کاشی مراجعه کرده. پیشنهاد: ارسال پیش‌فاکتور با تخفیف ۵٪ امروز"

**پیش‌بینی احتمال خرید**:
- امتیاز ۰-۱۰۰ برای هر لید باز
- بر اساس: تعداد تماس، مدت زمان در pipeline، نوع مشتری، سابقه خرید مشابه

**پیشنهاد محصول مرتبط**:
- هنگام ثبت پیش‌فاکتور: "مشتریانی که X خریدند، Y هم خریدند"
- Cross-sell و Upsell هوشمند

**تحلیل دلیل از دست رفتن فروش**:
- Pattern recognition روی دلایل ثبت شده
- گزارش ماهانه: چرا فروش از دست رفته

**تشخیص مشتریان مهم**:
- مشتریانی که خطر Churn دارند (خرید نکرده + سابقه خوب دارند)
- مشتریانی با پتانسیل رشد بالا

**خلاصه‌سازی تعاملات**:
- Auto-summary از تمام تماس‌ها و یادداشت‌های یک مشتری
- نمایش در پروفایل مشتری

**پیشنهاد زمان پیگیری**:
- بر اساس الگوی رفتاری مشتری: "بهترین زمان تماس: سه‌شنبه‌ها بین ۱۰-۱۲"

**گزارش مدیریتی خودکار**:
- هر هفته: خلاصه عملکرد فروش + نکات قابل توجه
- هر ماه: تحلیل جامع برای مدیرعامل

**پشته فنی AI**:
- GPT-4o / Claude API برای NLP
- Embeddings برای جستجوی هوشمند مشتری
- ML داخلی برای امتیازدهی (Python/scikit-learn)

---

## ۴. اتصال ERP با سیستم حسابداری منطق

### ۴.۱ معماری Integration

```
┌─────────────────────────────────────────────────────────────┐
│                        WAS-OS                                │
│  [فروش] [انبار] [تامین] [CRM] [B2B] [مارکتینگ]             │
└──────────────────────┬──────────────────────────────────────┘
                       │
              ┌────────▼────────┐
              │ Integration      │
              │ Middleware Layer │  ← Queue + Retry + Log
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │  سیستم منطق     │
              │ (Accounting      │
              │  Engine)         │
              └─────────────────┘
```

---

### ۴.۲ داده‌های ارسالی از WAS-OS به منطق

| رویداد | داده ارسالی | زمان ارسال |
|---|---|---|
| ثبت سفارش نهایی | شماره سفارش، مشتری، اقلام، مبلغ، تخفیف | بلافاصله پس از تایید |
| تغییر وضعیت پرداخت | شماره سفارش، مبلغ دریافتی | هنگام ثبت پرداخت |
| لغو سفارش | شماره سفارش، دلیل | هنگام لغو |
| ثبت مرجوعی | شماره سفارش اصلی، اقلام مرجوعی | هنگام ثبت |
| ثبت سفارش خرید | تامین‌کننده، اقلام، مبلغ | هنگام تایید PO |

---

### ۴.۳ داده‌های دریافتی از منطق به WAS-OS

| داده | کاربرد در WAS-OS | فرکانس Sync |
|---|---|---|
| مانده بدهی مشتری | کنترل سقف اعتبار، هشدار | هر ۱۵ دقیقه |
| وضعیت فاکتور | نمایش در پروفایل مشتری | هر ۳۰ دقیقه |
| تاریخ پرداخت‌های انجام شده | به‌روزرسانی وضعیت سفارش | هر ۱۵ دقیقه |
| مانده حساب تامین‌کننده | اطلاعاتی برای تامین | روزانه |

---

### ۴.۴ عملیاتی که فقط در منطق می‌مانند

- صدور فاکتور رسمی (با کد مالیاتی)
- ثبت سند حسابداری
- محاسبه مالیات و ارزش افزوده
- تراز آزمایشی و ترازنامه
- دفتر کل و کل معین
- گزارش‌های مالی رسمی (سود و زیان، ترازنامه)
- تسویه با تامین‌کنندگان (ثبت حسابداری)

---

### ۴.۵ ساختار API Integration

**پروتکل**: REST API over HTTPS
**احراز هویت**: API Key + IP Whitelist
**فرمت**: JSON

**Endpoint‌های WAS-OS → منطق**:
```
POST /api/manteq/orders          → ثبت سفارش جدید
POST /api/manteq/orders/{id}/cancel → لغو سفارش
POST /api/manteq/payments        → ثبت پرداخت
POST /api/manteq/purchase-orders → ثبت سفارش خرید
POST /api/manteq/returns         → ثبت مرجوعی
```

**Endpoint‌های منطق → WAS-OS (Webhook یا Pull)**:
```
GET  /api/customers/{id}/balance   → مانده بدهی
GET  /api/invoices?order_id={id}   → وضعیت فاکتور
GET  /api/payments?customer_id={id} → تاریخچه پرداخت
```

---

### ۴.۶ Queue / Retry / Error Handling

**Message Queue**: Redis Queue (Bull.js) یا RabbitMQ

**سیاست Retry**:
- خطاهای شبکه: Retry خودکار ۳ بار با فاصله ۱، ۵، ۱۵ دقیقه
- خطاهای اعتبارسنجی: Dead Letter Queue + هشدار به ادمین
- خطاهای منطق (5xx): Retry ۵ بار، سپس هشدار

**Error Handling**:
```json
{
  "sync_id": "uuid",
  "status": "failed",
  "error_code": "MANTEQ_TIMEOUT",
  "payload": {...},
  "retry_count": 2,
  "next_retry": "2025-01-15T10:30:00Z",
  "created_at": "..."
}
```

**جدول API_Sync_Logs**: هر تراکنش با status، payload، response، timestamp لاگ می‌شود

---

### ۴.۷ جلوگیری از مغایرت داده

۱. **Idempotency Key**: هر درخواست با شناسه یکتا ارسال شود تا در صورت Retry، دوبار ثبت نشود
۲. **Reconciliation Job**: یک بار در روز، سفارش‌های WAS-OS با فاکتورهای منطق مقایسه شود
۳. **Soft Delete فقط**: هیچ داده‌ای حذف فیزیکی نشود تا قابل بازیابی باشد
۴. **Immutable Events**: رویدادهای Sync تغییر نپذیرند، فقط رویداد جدید اصلاح را ثبت کند
۵. **Manual Sync**: ادمین بتواند هر رکورد را دستی Sync کند

---

## ۵. دیتامدل پیشنهادی

### ۵.۱ جدول Users
```sql
users (
  id              UUID PRIMARY KEY,
  full_name       VARCHAR(100) NOT NULL,
  email           VARCHAR(100) UNIQUE NOT NULL,
  phone           VARCHAR(20),
  password_hash   VARCHAR(255) NOT NULL,
  role_id         UUID FK → roles,
  department      ENUM('sales','b2b','callcenter','warehouse','procurement','finance','marketing','management','admin'),
  is_active       BOOLEAN DEFAULT TRUE,
  last_login      TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۲ جدول Roles
```sql
roles (
  id              UUID PRIMARY KEY,
  name            VARCHAR(50) UNIQUE NOT NULL,  -- 'ceo', 'sales_manager', 'salesperson', ...
  permissions     JSONB NOT NULL,               -- {'crm': 'write', 'finance': 'read', ...}
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۳ جدول Customers
```sql
customers (
  id              UUID PRIMARY KEY,
  code            VARCHAR(20) UNIQUE,           -- کد مشتری
  type            ENUM('owner','builder','architect','contractor','company','b2b','retail'),
  full_name       VARCHAR(150) NOT NULL,
  company_name    VARCHAR(150),
  national_id     VARCHAR(20) UNIQUE,
  phones          JSONB,                        -- [{type: 'mobile', number: '...'}]
  email           VARCHAR(100),
  address         TEXT,
  city            VARCHAR(50),
  grade           ENUM('A','B','C','D') DEFAULT 'C',
  source          VARCHAR(50),                  -- 'referral', 'callcenter', 'website', ...
  account_manager UUID FK → users,
  credit_limit    DECIMAL(15,2) DEFAULT 0,
  ai_score        INTEGER,                      -- 0-100
  notes           TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_by      UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۴ جدول Leads
```sql
leads (
  id              UUID PRIMARY KEY,
  customer_id     UUID FK → customers,          -- NULL اگر هنوز به مشتری تبدیل نشده
  full_name       VARCHAR(150) NOT NULL,
  phone           VARCHAR(20) NOT NULL,
  email           VARCHAR(100),
  source          VARCHAR(50) NOT NULL,
  source_campaign_id UUID FK → campaigns,
  assigned_to     UUID FK → users,
  stage           ENUM('new','contacted','interested','quoted','negotiating','won','lost'),
  lost_reason     VARCHAR(100),                 -- 'price', 'competitor', 'timing', 'budget', 'no_need'
  ai_score        INTEGER,                      -- احتمال تبدیل 0-100
  estimated_value DECIMAL(15,2),
  next_follow_up  TIMESTAMP,
  notes           TEXT,
  created_by      UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۵ جدول Opportunities
```sql
opportunities (
  id              UUID PRIMARY KEY,
  lead_id         UUID FK → leads,
  customer_id     UUID FK → customers,
  title           VARCHAR(200),
  estimated_value DECIMAL(15,2),
  probability     INTEGER,                      -- درصد احتمال
  expected_close  DATE,
  stage           VARCHAR(50),
  project_id      UUID FK → projects,
  assigned_to     UUID FK → users,
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۶ جدول Projects (پروژه ساختمانی)
```sql
projects (
  id              UUID PRIMARY KEY,
  name            VARCHAR(200) NOT NULL,
  type            ENUM('residential','commercial','industrial','office'),
  owner_id        UUID FK → customers,
  architect_id    UUID FK → customers,
  contractor_id   UUID FK → customers,
  address         TEXT,
  city            VARCHAR(50),
  units           INTEGER,
  area_m2         DECIMAL(10,2),
  current_phase   VARCHAR(50),
  estimated_budget DECIMAL(15,2),
  start_date      DATE,
  estimated_end   DATE,
  status          ENUM('planning','active','paused','completed'),
  assigned_to     UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۷ جدول Products
```sql
products (
  id              UUID PRIMARY KEY,
  sku             VARCHAR(50) UNIQUE NOT NULL,
  name            VARCHAR(200) NOT NULL,
  brand_id        UUID FK → brands,
  category_id     UUID FK → categories,
  unit            VARCHAR(20),                  -- 'عدد', 'متر', 'کیلوگرم', ...
  sale_price      DECIMAL(15,2),
  purchase_price  DECIMAL(15,2),
  min_stock       INTEGER DEFAULT 0,
  reorder_point   INTEGER DEFAULT 0,
  specifications  JSONB,                        -- مشخصات فنی dynamic
  images          JSONB,                        -- آرایه URLها
  alternatives    JSONB,                        -- [{product_id, reason}]
  complements     JSONB,                        -- [{product_id, reason}]
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۸ جدول Brands
```sql
brands (
  id              UUID PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  country         VARCHAR(50),
  representative  VARCHAR(150),
  contract_end    DATE,
  notes           TEXT,
  logo_url        VARCHAR(500),
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۹ جدول Categories
```sql
categories (
  id              UUID PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  parent_id       UUID FK → categories,         -- برای سلسله‌مراتب
  level           INTEGER,                      -- 1, 2, 3
  spec_schema     JSONB,                        -- schema مشخصات فنی این دسته
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۱۰ جدول Suppliers
```sql
suppliers (
  id              UUID PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  code            VARCHAR(20) UNIQUE,
  contact_name    VARCHAR(100),
  phone           VARCHAR(20),
  email           VARCHAR(100),
  address         TEXT,
  payment_terms   INTEGER,                      -- روز اعتبار
  lead_time_days  INTEGER,                      -- زمان تامین معمول
  score           INTEGER DEFAULT 50,           -- 0-100
  notes           TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۱۱ جدول Inventory
```sql
inventory (
  id              UUID PRIMARY KEY,
  product_id      UUID FK → products UNIQUE,
  warehouse_id    UUID FK → warehouses,
  qty_physical    DECIMAL(10,3) DEFAULT 0,
  qty_reserved    DECIMAL(10,3) DEFAULT 0,
  qty_in_transit  DECIMAL(10,3) DEFAULT 0,
  last_counted    TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT NOW()
)
-- qty_available = qty_physical - qty_reserved (محاسباتی)
```

### ۵.۱۲ جدول Warehouses
```sql
warehouses (
  id              UUID PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  code            VARCHAR(20),
  address         TEXT,
  manager_id      UUID FK → users,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۱۳ جدول Orders
```sql
orders (
  id              UUID PRIMARY KEY,
  order_number    VARCHAR(30) UNIQUE NOT NULL,
  customer_id     UUID FK → customers,
  quotation_id    UUID FK → quotations,
  type            ENUM('retail','b2b'),
  status          ENUM('draft','confirmed','in_procurement','ready','shipped','delivered','cancelled'),
  payment_status  ENUM('unpaid','partial','paid'),
  total_amount    DECIMAL(15,2) NOT NULL,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  tax_amount      DECIMAL(15,2) DEFAULT 0,
  final_amount    DECIMAL(15,2) NOT NULL,
  assigned_to     UUID FK → users,
  notes           TEXT,
  manteq_invoice_id VARCHAR(50),               -- شناسه فاکتور در منطق
  manteq_synced_at  TIMESTAMP,
  created_by      UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۱۴ جدول OrderItems
```sql
order_items (
  id              UUID PRIMARY KEY,
  order_id        UUID FK → orders,
  product_id      UUID FK → products,
  qty             DECIMAL(10,3) NOT NULL,
  unit_price      DECIMAL(15,2) NOT NULL,
  discount_pct    DECIMAL(5,2) DEFAULT 0,
  final_price     DECIMAL(15,2) NOT NULL,
  warehouse_id    UUID FK → warehouses,
  status          ENUM('pending','reserved','issued','returned'),
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۱۵ جدول Quotations
```sql
quotations (
  id              UUID PRIMARY KEY,
  quote_number    VARCHAR(30) UNIQUE NOT NULL,
  customer_id     UUID FK → customers,
  lead_id         UUID FK → leads,
  status          ENUM('draft','sent','accepted','rejected','expired'),
  valid_until     DATE,
  total_amount    DECIMAL(15,2),
  discount_amount DECIMAL(15,2),
  final_amount    DECIMAL(15,2),
  notes           TEXT,
  created_by      UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP
)
```

### ۵.۱۶ جدول Payments
```sql
payments (
  id              UUID PRIMARY KEY,
  order_id        UUID FK → orders,
  customer_id     UUID FK → customers,
  amount          DECIMAL(15,2) NOT NULL,
  method          ENUM('cash','transfer','check','card','credit'),
  reference       VARCHAR(100),
  paid_at         TIMESTAMP,
  verified_by     UUID FK → users,
  manteq_payment_id VARCHAR(50),
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۱۷ جدول Invoices
```sql
invoices (
  id              UUID PRIMARY KEY,
  order_id        UUID FK → orders,
  manteq_id       VARCHAR(50) UNIQUE,           -- شناسه در سیستم منطق
  invoice_number  VARCHAR(50),
  status          ENUM('pending','issued','paid','overdue','cancelled'),
  amount          DECIMAL(15,2),
  tax_amount      DECIMAL(15,2),
  due_date        DATE,
  paid_at         TIMESTAMP,
  synced_at       TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۱۸ جدول CallLogs
```sql
call_logs (
  id              UUID PRIMARY KEY,
  customer_id     UUID FK → customers,
  lead_id         UUID FK → leads,
  operator_id     UUID FK → users,
  direction       ENUM('inbound','outbound'),
  phone_number    VARCHAR(20),
  duration_sec    INTEGER,
  status          ENUM('answered','no_answer','busy','voicemail'),
  call_type       ENUM('inquiry','follow_up','complaint','info','purchase'),
  summary         TEXT,
  action_taken    VARCHAR(100),                 -- 'created_lead', 'transferred_sales', 'scheduled_callback'
  callback_at     TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۱۹ جدول FollowUps
```sql
follow_ups (
  id              UUID PRIMARY KEY,
  related_type    ENUM('lead','customer','order','opportunity'),
  related_id      UUID NOT NULL,
  assigned_to     UUID FK → users,
  type            ENUM('call','visit','email','whatsapp','meeting'),
  scheduled_at    TIMESTAMP NOT NULL,
  completed_at    TIMESTAMP,
  status          ENUM('pending','done','cancelled'),
  notes           TEXT,
  outcome         VARCHAR(200),
  created_by      UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۲۰ جدول Campaigns
```sql
campaigns (
  id              UUID PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  type            ENUM('sms','whatsapp','email','digital','exhibition','other'),
  status          ENUM('draft','active','paused','completed'),
  budget          DECIMAL(15,2),
  actual_cost     DECIMAL(15,2),
  start_date      DATE,
  end_date        DATE,
  target_segment  JSONB,                        -- فیلترهای segment‌بندی
  stats           JSONB,                        -- sent, opened, clicked, leads, orders
  created_by      UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۲۱ جدول Tasks
```sql
tasks (
  id              UUID PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  assigned_to     UUID FK → users,
  created_by      UUID FK → users,
  related_type    ENUM('lead','customer','order','project'),
  related_id      UUID,
  priority        ENUM('low','medium','high','urgent'),
  due_at          TIMESTAMP,
  completed_at    TIMESTAMP,
  status          ENUM('pending','in_progress','done','cancelled'),
  notes           TEXT,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۲۲ جدول Notes
```sql
notes (
  id              UUID PRIMARY KEY,
  related_type    ENUM('lead','customer','order','project','supplier'),
  related_id      UUID NOT NULL,
  content         TEXT NOT NULL,
  is_private      BOOLEAN DEFAULT FALSE,
  created_by      UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۲۳ جدول Documents
```sql
documents (
  id              UUID PRIMARY KEY,
  related_type    VARCHAR(50),
  related_id      UUID,
  name            VARCHAR(200),
  file_url        VARCHAR(500),
  file_type       VARCHAR(50),
  file_size_kb    INTEGER,
  uploaded_by     UUID FK → users,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

### ۵.۲۴ جدول API_Sync_Logs
```sql
api_sync_logs (
  id              UUID PRIMARY KEY,
  direction       ENUM('to_manteq','from_manteq'),
  event_type      VARCHAR(100),                 -- 'order_created', 'payment_sync', ...
  related_id      UUID,
  payload         JSONB,
  response        JSONB,
  status          ENUM('pending','success','failed','retrying'),
  error_message   TEXT,
  retry_count     INTEGER DEFAULT 0,
  next_retry_at   TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW(),
  synced_at       TIMESTAMP
)
```

### ۵.۲۵ جدول AI_Recommendations
```sql
ai_recommendations (
  id              UUID PRIMARY KEY,
  type            ENUM('next_action','product_suggest','follow_up_time','churn_risk','upsell'),
  related_type    ENUM('lead','customer','order'),
  related_id      UUID NOT NULL,
  assigned_to     UUID FK → users,
  content         TEXT NOT NULL,
  confidence      DECIMAL(3,2),                 -- 0.00 - 1.00
  is_dismissed    BOOLEAN DEFAULT FALSE,
  dismissed_at    TIMESTAMP,
  acted_on        BOOLEAN DEFAULT FALSE,
  acted_on_at     TIMESTAMP,
  expires_at      TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
)
```

---

## ۶. جریان‌های کاری اصلی سیستم

### ۶.۱ از ورود لید تا تبدیل به مشتری
```
[کانال ورودی: وبسایت / واتساپ / کال‌سنتر / فروشنده]
    ↓
[ثبت لید در سیستم با تشخیص تکراری]
    ↓
[تخصیص خودکار به کارشناس بر اساس قانون Round-Robin یا منطقه]
    ↓
[هشدار به کارشناس: پیامک + نوتیفیکیشن سیستم]
    ↓
[کارشناس تماس اول را برقرار می‌کند ← ثبت CallLog]
    ↓
[وضعیت لید: Contacted]
    ↓
[ثبت یادداشت تماس + تنظیم FollowUp بعدی]
    ↓
[پیگیری‌ها تا رسیدن به مرحله: Interested]
    ↓
[ایجاد پیش‌فاکتور → ارسال به مشتری]
    ↓
[وضعیت لید: Quoted]
    ↓
[در صورت تایید مشتری → تبدیل لید به Customer + ایجاد Order]
    ↓
[در صورت رد → ثبت دلیل از دست دادن → آرشیو]
```

---

### ۶.۲ از پیش‌فاکتور تا سفارش نهایی
```
[ثبت پیش‌فاکتور توسط فروشنده]
    ↓
[بررسی خودکار: سقف اعتبار مشتری (از منطق)]
    ↓
[اگر تخفیف > سقف مجاز → درخواست تایید مدیر فروش]
    ↓
[ارسال PDF پیش‌فاکتور به مشتری (واتساپ/ایمیل)]
    ↓
[مشتری تایید می‌کند]
    ↓
[تبدیل Quotation → Order با یک کلیک]
    ↓
[بررسی موجودی انبار در لحظه]
    ↓
[اگر موجود: رزرو خودکار کالا]
[اگر کمبود: هشدار به تامین + ادامه با تاریخ تحویل تخمینی]
    ↓
[تایید مالی (اگر پرداخت لازم است)]
    ↓
[ارسال به انبار برای حواله خروج]
```

---

### ۶.۳ از کمبود موجودی تا درخواست تامین
```
[هشدار خودکار: موجودی قابل فروش < Reorder Point]
    ↓
[ایجاد خودکار Purchase Request]
    ↓
[تیم تامین درخواست را مشاهده می‌کند]
    ↓
[مقایسه تامین‌کنندگان (قیمت، زمان، شرایط)]
    ↓
[انتخاب تامین‌کننده + صدور Purchase Order]
    ↓
[تامین‌کننده تایید می‌کند ← ثبت تاریخ تحویل وعده]
    ↓
[پیگیری تا تاریخ تحویل]
    ↓
[دریافت کالا در انبار ← ثبت Goods Receipt]
    ↓
[به‌روزرسانی موجودی + آزاد کردن سفارش‌های در انتظار]
    ↓
[Sync با منطق: ثبت سند خرید]
```

---

### ۶.۴ از تماس کال‌سنتر تا ارجاع به فروش
```
[تماس ورودی]
    ↓
[جستجوی خودکار مشتری بر اساس شماره تلفن]
    ↓
[نمایش پروفایل مشتری / یا فرم ثبت مشتری جدید]
    ↓
[اپراتور script مربوطه را دنبال می‌کند]
    ↓
[ثبت نوع درخواست]
    ↓
┌─────────────────────────────────────────┐
│ نوع درخواست                              │
├───────────────┬───────────┬─────────────┤
│ علاقه خرید    │ شکایت    │ پیگیری سفارش│
↓               ↓           ↓
[ثبت لید جدید] [تیکت      ] [نمایش Order  ]
[ارجاع به      ] [پشتیبانی ] [وضعیت برای  ]
[کارشناس فروش] ]            ] [مشتری        ]
```

---

### ۶.۵ از پروژه ساختمانی تا فروش مرحله‌ای
```
[ثبت پروژه جدید در سیستم]
    ↓
[تعریف مراحل پروژه و نیازمندی‌های هر مرحله]
    ↓
[تنظیم یادآور برای هر مرحله]
    ↓
[هنگام رسیدن به مرحله X]
    ↓
[AI پیشنهاد ملاقات/تماس می‌دهد]
    ↓
[فروشنده تماس می‌گیرد ← ثبت FollowUp]
    ↓
[صدور پیش‌فاکتور مرحله‌ای]
    ↓
[ثبت سفارش + رزرو کالا]
    ↓
[تحویل مرحله‌ای]
    ↓
[آمادگی برای مرحله بعد پروژه]
```

---

## ۷. سطح دسترسی و امنیت

### ۷.۱ Role-Based Access Control (RBAC)

**ساختار دسترسی**: هر Role مجموعه‌ای از Permissions دارد
```json
{
  "crm": "write",
  "leads": "write", 
  "orders": "write",
  "finance": "read",
  "pricing": "limited",
  "reports": "own",
  "admin": "none"
}
```

**سطوح دسترسی**:
- `none`: عدم دسترسی
- `read`: فقط مشاهده
- `write`: مشاهده + ایجاد + ویرایش
- `own`: فقط رکوردهای خودش
- `limited`: با محدودیت مشخص
- `full`: کامل شامل حذف

---

### ۷.۲ محدودیت‌های کلیدی

**تغییر قیمت و تخفیف**:
- تغییر قیمت پایه: فقط مدیر محصول
- تخفیف ۰-۵٪: کارشناس فروش بدون تایید
- تخفیف ۵-۱۵٪: نیاز به تایید مدیر فروش
- تخفیف بالای ۱۵٪: نیاز به تایید مدیرعامل

**اطلاعات مالی**:
- بدهی مشتریان: فروش B2B، مدیر فروش، مالی، مدیرعامل
- قیمت خرید: تامین، مالی، مدیرعامل
- سودآوری: مالی، مدیرعامل

**حذف داده**:
- هیچ حذف فیزیکی وجود ندارد (Soft Delete)
- آرشیو لید/مشتری: فقط مدیر فروش
- لغو سفارش: مدیر فروش + تایید مالی

---

### ۷.۳ Activity Log
```sql
activity_logs (
  id          UUID PRIMARY KEY,
  user_id     UUID FK → users,
  action      VARCHAR(100),      -- 'order.create', 'lead.update.stage', ...
  entity_type VARCHAR(50),
  entity_id   UUID,
  old_value   JSONB,
  new_value   JSONB,
  ip_address  VARCHAR(45),
  created_at  TIMESTAMP DEFAULT NOW()
)
```

**رویدادهای حتماً لاگ شده**:
- تغییر قیمت/تخفیف
- تایید یا لغو سفارش
- تغییر مانده اعتبار مشتری
- Sync با منطق
- ورود/خروج کاربر
- تغییر نقش کاربر

---

### ۷.۴ تاییدیه‌های مدیریتی (Approval Workflow)
موارد نیاز به تایید:
- تخفیف بالای سقف
- لغو سفارش بالای X تومان
- افزایش سقف اعتبار مشتری
- تایید قرارداد B2B
- تایید PO بالای مبلغ مشخص

---

## ۸. معماری فنی پیشنهادی

### ۸.۱ Stack پیشنهادی (تیم کوچک + MVP محور)

```
┌──────────────────────────────────────────────────────────┐
│                    Frontend Layer                         │
│  Next.js 14 (App Router) + TypeScript + Tailwind CSS     │
│  TanStack Query + Zustand + shadcn/ui                    │
└──────────────────────┬───────────────────────────────────┘
                       │ REST API / WebSocket
┌──────────────────────▼───────────────────────────────────┐
│                    Backend Layer                          │
│  Node.js + Fastify (یا NestJS برای تیم بزرگتر)           │
│  TypeScript + Zod (validation) + Prisma (ORM)            │
└───────┬──────────────┬──────────────────┬────────────────┘
        │              │                  │
┌───────▼──┐    ┌──────▼──────┐   ┌──────▼──────┐
│PostgreSQL│    │ Redis        │   │ Integration  │
│(Primary  │    │(Cache+Queue) │   │ Middleware   │
│Database) │    └─────────────┘   │(منطق API)    │
└──────────┘                      └─────────────┘
        │
┌───────▼──────────────────────────────────────────────────┐
│                    Supporting Services                    │
│  MinIO / S3 (File Storage)                               │
│  Resend / SMTP (Email)                                   │
│  Kavenegar (SMS)                                         │
│  Pusher / Socket.io (Real-time Notifications)            │
└──────────────────────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────┐
│                       AI Layer                            │
│  OpenAI / Anthropic API (NLP, Summaries, Suggestions)    │
│  Python FastAPI Microservice (ML Scoring)                │
└──────────────────────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────┐
│                    Reporting Layer                        │
│  Built-in: Recharts / Chart.js (داشبوردهای اصلی)         │
│  Advanced: Metabase Self-hosted (گزارش‌های سفارشی)       │
└──────────────────────────────────────────────────────────┘
```

---

### ۸.۲ احراز هویت
- **JWT** با Refresh Token (۱۵ دقیقه access / ۷ روز refresh)
- **2FA** اختیاری برای مدیران
- **Session Invalidation**: در صورت تغییر رمز یا تغییر نقش
- **IP Whitelist** برای API Integration با منطق

---

### ۸.۳ توجیه انتخاب تکنولوژی برای تیم کوچک

| تکنولوژی | دلیل انتخاب |
|---|---|
| Next.js | SSR + SSG + API Routes در یک پروژه، اکوسیستم قوی |
| Fastify | سریع‌تر از Express، plugin محور، TypeScript native |
| PostgreSQL | JSONB برای fields انعطاف‌پذیر، mature، رایگان |
| Prisma | Type-safe ORM، migration داخلی، DX عالی |
| Redis | Queue (Bull) + Cache + Session در یک سرویس |
| Supabase (اختیاری) | PostgreSQL + Auth + Storage hosted برای کاهش Ops |

---

## ۹. MVP پیشنهادی (سه ماه اول)

### ۹.۱ فریم‌ورک MoSCoW

**Must Have (ضروری برای MVP)**:
1. احراز هویت و مدیریت کاربران/نقش‌ها
2. CRM پایه (ثبت و مدیریت مشتری)
3. مدیریت لید (ثبت، تخصیص، pipeline)
4. پیش‌فاکتور و سفارش (ثبت، وضعیت)
5. انبار پایه (موجودی، ورود/خروج، رزرو)
6. محصولات و برندها (کاتالوگ پایه)
7. Integration پایه با منطق (ارسال سفارش، دریافت بدهی)
8. داشبورد فروش ساده (KPI های اصلی)
9. FollowUp و یادآور

**Should Have (فاز دوم)**:
10. کال‌سنتر
11. ماژول تامین کامل
12. فروش B2B (قرارداد، قیمت اختصاصی)
13. پروژه‌های ساختمانی
14. گزارش‌های پیشرفته

**Could Have (فاز سوم)**:
15. ماژول مارکتینگ
16. AI Sales Assistant
17. داشبورد BI کامل
18. نسخه موبایل بهینه‌شده
19. Integration واتساپ

**Won't Have (خارج از scope اولیه)**:
- پورتال مشتریان (B2C)
- اپ موبایل Native
- WMS پیشرفته (Barcode، Location tracking)

---

### ۹.۲ تیم مورد نیاز MVP
- ۱ Full-stack Developer (Next.js + Node.js)
- ۱ Backend Developer (Node.js + PostgreSQL)
- ۱ UI/UX Designer (نیمه وقت)
- ۱ Product Owner از وس (داخلی)
- ۱ QA (نیمه وقت از هفته ۸)

---

## ۱۰. رودمپ اجرایی (۶ تا ۹ ماه)

### فاز ۱: Discovery و تحلیل (هفته ۱-۳)
**مدت**: ۳ هفته
**خروجی‌ها**:
- مصاحبه با ذینفعان اصلی (مدیرعامل، مدیر فروش، انبار، مالی)
- نقشه فرایندهای As-Is
- تعریف فرایندهای To-Be
- مستندات API منطق (چه Endpointهایی وجود دارد)
- اولویت‌بندی نهایی فیچرها
- تعریف KPIهای موفقیت

**ریسک‌ها**: عدم دسترسی به API منطق، تغییر اولویت‌ها
**KPI موفقیت**: سند نیازمندی تایید شده توسط مدیرعامل

---

### فاز ۲: طراحی UX/UI و معماری (هفته ۴-۶)
**مدت**: ۳ هفته
**خروجی‌ها**:
- Wireframe کامل همه صفحات MVP
- Design System (رنگ‌ها، فونت، کامپوننت‌ها)
- ERD نهایی دیتابیس
- سند API Integration با منطق
- تعریف محیط‌های Dev/Staging/Production

**ریسک‌ها**: طراحی بیش از حد پیچیده، عدم تایید stakeholders
**KPI موفقیت**: تایید Prototype از تیم فروش + مالی

---

### فاز ۳: توسعه Core و زیرساخت (هفته ۷-۱۲)
**مدت**: ۶ هفته
**خروجی‌ها**:
- Setup محیط توسعه (Docker, CI/CD)
- احراز هویت + مدیریت کاربران/نقش‌ها
- CRM پایه (Customer + Lead)
- ماژول محصولات و برندها (کاتالوگ)
- ماژول انبار پایه (موجودی، ورود/خروج)

**ریسک‌ها**: technical debt اولیه، تاخیر در تنظیم زیرساخت
**KPI موفقیت**: ورود مشتری، لید، محصول و موجودی بدون باگ Critical

---

### فاز ۴: فروش و Integration منطق (هفته ۱۳-۱۸)
**مدت**: ۶ هفته
**خروجی‌ها**:
- ماژول پیش‌فاکتور و سفارش
- ماژول FollowUp و Task
- Integration Layer با منطق (ارسال سفارش، sync بدهی)
- Queue + Retry + Log سیستم
- داشبورد فروش اولیه

**ریسک‌ها**: API منطق ناپایدار، تفاوت داده
**KPI موفقیت**: یک سفارش کامل در WAS-OS که در منطق هم ثبت شود

---

### فاز ۵: کال‌سنتر + تامین + B2B (هفته ۱۹-۲۴)
**مدت**: ۶ هفته
**خروجی‌ها**:
- ماژول کال‌سنتر
- ماژول تامین (Supplier، PO)
- ماژول فروش B2B (قرارداد، قیمت اختصاصی)
- ماژول پروژه ساختمانی

**ریسک‌ها**: پیچیدگی B2B، نیاز به Training تیم
**KPI موفقیت**: ۳ تیم (کال‌سنتر، تامین، B2B) سیستم را استفاده کنند

---

### فاز ۶: BI، مارکتینگ و گزارش‌ها (هفته ۲۵-۲۸)
**مدت**: ۴ هفته
**خروجی‌ها**:
- داشبوردهای کامل (مدیرعامل، فروش، انبار، مالی)
- ماژول مارکتینگ پایه
- گزارش‌های دوره‌ای خودکار
- Metabase برای گزارش‌های پیشرفته

**ریسک‌ها**: کیفیت داده برای گزارش‌ها
**KPI موفقیت**: مدیرعامل روزانه داشبورد را ببیند

---

### فاز ۷: هوش مصنوعی (هفته ۲۹-۳۲)
**مدت**: ۴ هفته
**خروجی‌ها**:
- AI Sales Assistant (پیشنهاد اقدام بعدی)
- امتیازدهی لیدها
- پیشنهاد محصول مکمل
- خلاصه‌سازی مشتری
- گزارش مدیریتی خودکار هفتگی

**ریسک‌ها**: کیفیت داده برای مدل AI، هزینه API
**KPI موفقیت**: ۷۰٪ توصیه‌های AI مرتبط باشند (feedback تیم)

---

### فاز ۸: تست، آموزش و استقرار نهایی (هفته ۳۳-۳۶)
**مدت**: ۴ هفته
**خروجی‌ها**:
- Load Testing
- User Acceptance Test با تیم‌های مختلف
- جلسات آموزشی per نقش
- راهنمای کاربری
- Migration داده از سیستم‌های قبلی
- Go-Live

**ریسک‌ها**: مقاومت کاربران، باگ‌های Production
**KPI موفقیت**: ۸۰٪ کاربران بدون کمک وارد سیستم شوند

---

## ۱۱. پیشنهاد UI/UX

### ۱۱.۱ منوی اصلی (Sidebar)
```
🏠 داشبورد
👥 CRM
   ├── مشتریان
   └── سگمنت‌ها
🎯 فروش
   ├── لیدها
   ├── پیش‌فاکتورها
   ├── سفارش‌ها
   └── تقویم پیگیری
🏢 B2B
   ├── مشتریان سازمانی
   ├── قراردادها
   └── پروژه‌ها
📞 کال‌سنتر
📦 انبار
   ├── موجودی
   ├── ورود کالا
   └── حواله خروج
🔧 تامین
   ├── درخواست‌ها
   ├── تامین‌کنندگان
   └── سفارش خرید
💰 مالی
🛍️ محصولات
   ├── کاتالوگ
   └── برندها
📣 مارکتینگ
📊 گزارش‌ها
⚙️ تنظیمات
```

---

### ۱۱.۲ صفحات کلیدی

**صفحه داشبورد مدیرعامل**:
- Row 1: ۴ کارت KPI (فروش امروز، فروش ماه، لید جدید، نرخ تبدیل)
- Row 2: نمودار خطی فروش ۳۰ روز vs هدف
- Row 3: Top 5 فروشنده + Top 5 مشتری
- Row 4: هشدارهای فوری (بدهی معوق، کمبود انبار)
- Row 5: خلاصه AI

**صفحه لید (Kanban View)**:
- ستون‌ها = مراحل pipeline
- کارت = خلاصه لید (نام، تلفن، مبلغ تخمینی، تاریخ آخرین تماس)
- رنگ‌بندی بر اساس: سن لید، امتیاز AI
- Drag & Drop برای تغییر مرحله

**صفحه پروفایل مشتری**:
- Header: نام، درجه، مسئول حساب، مانده بدهی، آخرین خرید
- Tabs: تاریخچه تعاملات | سفارش‌ها | پروژه‌ها | فایل‌ها | یادداشت‌ها
- Sidebar: پیشنهاد AI + اقدامات سریع

**صفحه ثبت سفارش**:
- جستجوی مشتری (autocomplete)
- جستجوی محصول با نمایش موجودی real-time
- محاسبه قیمت، تخفیف، مالیات live
- نمایش وضعیت اعتبار مشتری
- ارسال مستقیم به واتساپ

---

### ۱۱.۳ تجربه کاربری تیم فروش موبایل
- Bottom Navigation: داشبورد | لیدهای من | ثبت تماس | سفارش جدید
- صفحه Home: لیدهای امروز + پیگیری‌های سررسید + پیشنهادات AI
- ثبت تماس: ۳ کلیک (انتخاب مشتری → نوع → یادداشت کوتاه)
- offline-ready: مشاهده اطلاعات مشتری بدون اینترنت

---

## ۱۲. ریسک‌های پروژه و راهکارها

| ریسک | احتمال | تاثیر | راهکار |
|---|---|---|---|
| **مقاومت سازمانی** | بالا | بالا | Champions داخلی معرفی کن؛ از مدیران میانی شروع کن؛ Quick Win های اولیه را showcase کن |
| **کیفیت پایین داده اولیه** | بالا | بالا | قبل از Go-Live یک Data Cleanup Sprint؛ validation rules سختگیرانه از روز اول |
| **عدم پایداری API منطق** | متوسط | بالا | Circuit Breaker Pattern؛ Fallback Mode (offline تا Sync)؛ Mock API برای توسعه |
| **پیچیدگی فرایندهای B2B** | متوسط | متوسط | Workshop اختصاصی با تیم B2B قبل از توسعه؛ MVP ساده‌تر برای B2B |
| **آموزش تیم‌ها** | متوسط | متوسط | Video آموزشی per نقش؛ Sandbox environment؛ Super User در هر دپارتمان |
| **مغایرت مالی و انبار** | متوسط | بالا | Reconciliation Job روزانه؛ گزارش مغایرت هفتگی؛ Lock قبل از انبارگردانی |
| **تاخیر فنی** | متوسط | متوسط | MVP محدود؛ فازبندی؛ تیم کوچک focused |
| **تغییر نیازمندی‌ها** | بالا | متوسط | Change Request process؛ Sprint Review دوهفتگی با stakeholders |

---

## ۱۳. مستند فنی قابل ارائه به تیم توسعه

### ۱۳.۱ خلاصه ماژول‌ها و اولویت‌بندی

```
فاز ۱ (MVP - ماه ۱-۳):
├── auth           → احراز هویت + RBAC
├── users          → مدیریت کاربران
├── customers      → پروفایل مشتری
├── leads          → لید + pipeline
├── products       → کاتالوگ + برندها
├── inventory      → موجودی پایه
├── quotations     → پیش‌فاکتور
├── orders         → سفارش
├── follow_ups     → پیگیری + یادآور
└── dashboard      → KPI ساده

فاز ۲ (ماه ۴-۶):
├── call_center    → کال‌سنتر
├── procurement    → تامین
├── b2b            → فروش B2B
├── projects       → پروژه ساختمانی
├── manteq_sync    → Integration منطق
└── reports        → گزارش‌های پیشرفته

فاز ۳ (ماه ۷-۹):
├── marketing      → کمپین‌ها
├── bi_dashboard   → داشبورد BI
└── ai_assistant   → هوش مصنوعی
```

---

### ۱۳.۲ APIهای اصلی Backend

```
Auth:
  POST   /api/auth/login
  POST   /api/auth/refresh
  POST   /api/auth/logout

Customers:
  GET    /api/customers
  POST   /api/customers
  GET    /api/customers/:id
  PATCH  /api/customers/:id
  GET    /api/customers/:id/orders
  GET    /api/customers/:id/balance      ← از منطق

Leads:
  GET    /api/leads
  POST   /api/leads
  PATCH  /api/leads/:id
  POST   /api/leads/:id/convert          ← تبدیل به مشتری
  POST   /api/leads/:id/assign

Products:
  GET    /api/products
  POST   /api/products
  GET    /api/products/:id
  GET    /api/products/:id/inventory     ← real-time از انبار

Quotations:
  POST   /api/quotations
  GET    /api/quotations/:id
  POST   /api/quotations/:id/convert     ← تبدیل به سفارش

Orders:
  GET    /api/orders
  POST   /api/orders
  PATCH  /api/orders/:id/status
  POST   /api/orders/:id/issue           ← حواله خروج انبار

Inventory:
  GET    /api/inventory
  POST   /api/inventory/receive          ← ورود کالا
  POST   /api/inventory/reserve          ← رزرو

Sync (Integration):
  POST   /api/sync/manteq/push-order
  GET    /api/sync/manteq/customer-balance/:id
  POST   /api/sync/manteq/retry-failed

AI:
  GET    /api/ai/recommendations/:entity/:id
  POST   /api/ai/summarize-customer/:id
  GET    /api/ai/lead-score/:id
```

---

### ۱۳.۳ صفحات اصلی Frontend

```
/login                          → ورود
/dashboard                      → داشبورد
/customers                      → لیست مشتریان
/customers/new                  → افزودن مشتری
/customers/:id                  → پروفایل مشتری
/leads                          → Kanban لیدها
/leads/:id                      → جزئیات لید
/quotations/new                 → پیش‌فاکتور جدید
/quotations/:id                 → جزئیات پیش‌فاکتور
/orders                         → لیست سفارش‌ها
/orders/:id                     → جزئیات سفارش
/products                       → کاتالوگ محصولات
/inventory                      → موجودی انبار
/follow-ups                     → تقویم پیگیری
/reports/sales                  → گزارش فروش
/reports/inventory              → گزارش انبار
/settings/users                 → مدیریت کاربران
/settings/integrations          → تنظیمات Sync
```

---

### ۱۳.۴ Environment Variables مورد نیاز
```env
# Database
DATABASE_URL=postgresql://...

# Auth
JWT_SECRET=...
JWT_REFRESH_SECRET=...

# منطق Integration
MANTEQ_API_URL=https://...
MANTEQ_API_KEY=...

# Redis
REDIS_URL=redis://...

# File Storage
S3_BUCKET=...
S3_ACCESS_KEY=...

# Notifications
SMS_API_KEY=...           (Kavenegar)
EMAIL_API_KEY=...         (Resend)

# AI
OPENAI_API_KEY=...
```

---

### ۱۳.۵ اولویت‌بندی Sprint اول (۲ هفته)

**Sprint 1 (هفته ۱-۲)**:
- [ ] Setup پروژه (Next.js + Fastify + PostgreSQL + Prisma)
- [ ] Migration دیتابیس: users, roles, customers, leads
- [ ] Auth (login, JWT, refresh)
- [ ] RBAC middleware
- [ ] CRUD مشتری
- [ ] CRUD لید
- [ ] Pipeline view ساده (Kanban)
- [ ] Unit tests برای auth

---

*این سند پایه طراحی ERP اختصاصی مجموعه وس (WAS-OS) است.*
*نسخه ۱.۰ | خرداد ۱۴۰۵*
