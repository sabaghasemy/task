
document.addEventListener('DOMContentLoaded', () => {
    // 1. عنصر اصلی (Container) را انتخاب می‌کنیم.
    const appContainer = document.getElementById('app-container');

    if (!appContainer) {
        console.error("Element with ID 'app-container' not found.");
        return;
    }

    // =======================================================
    // 2. توابع کمکی (Helper Functions)
    // =======================================================

    // تابع برای ساخت المنت و افزودن کلاس‌ها
    const createElementWithClasses = (tag, classes) => {
        const element = document.createElement(tag);
        element.className = classes;
        return element;
    };

    // تابع برای ساخت بخش نمایش قیمت و تخفیف
    const createPriceSection = (originalPrice, discount, finalPrice, priceLabel = 'تومان') => {
        const div = createElementWithClasses('div', 'text-left text-lg');

        // قیمت اصلی (خط خورده)
        const original = createElementWithClasses('p', 'text-gray-400 line-through text-base');
        original.textContent = originalPrice;
        
        // میزان تخفیف
        const discountText = createElementWithClasses('p', 'text-discount-red font-semibold text-sm mb-1');
        discountText.textContent = discount;

        // قیمت نهایی
        const final = createElementWithClasses('p', 'text-primary-blue font-extrabold text-2xl');
        final.innerHTML = `${finalPrice} <span class="text-base">${priceLabel}</span>`;

        div.append(original, discountText, final);
        return div;
    };

    // =======================================================
    // 3. ساختار اصلی بخش تخفیفات (Main Content)
    // =======================================================

    const mainWrapper = createElementWithClasses('div', 'max-w-7xl mx-auto shadow-xl rounded-2xl p-4 bg-white border border-gray-100');

    // -------------------------------------------------------
    // A. ساختار هدر
    // -------------------------------------------------------
    const header = createElementWithClasses('header', 'flex justify-between items-center mb-8');

    // بخش زمان
    const timeDiv = createElementWithClasses('div', 'text-lg font-bold text-gray-600');
    timeDiv.id = 'current-time-js';
    timeDiv.textContent = '18:14:01'; // مقدار اولیه

    // عنوان
    const titleH1 = createElementWithClasses('h1', 'text-2xl md:text-3xl font-extrabold text-gray-800');
    titleH1.textContent = 'تخفیف‌های روزانه دسترسی';

    // آیکون
    const iconDiv = createElementWithClasses('div', 'w-6 h-6 border border-gray-400 rounded-md flex items-center justify-center text-gray-500 cursor-pointer');
    iconDiv.innerHTML = '&#x25A1;';

    header.append(timeDiv, titleH1, iconDiv);

    // -------------------------------------------------------
    // B. ساختار گرید محصولات
    // -------------------------------------------------------
    const gridDiv = createElementWithClasses('div', 'grid grid-cols-1 lg:grid-cols-3 gap-4');

    // =======================================================
    // 4. ساخت کارت‌های محصولات
    // =======================================================

    // --- تابع ساخت کارت کوچک (Small Card) ---
    const createSmallCard = (imageSrc, name, originalPrice, discount, finalPrice) => {
        const card = createElementWithClasses('div', 'flex items-center bg-gray-50 rounded-xl p-3 shadow-md border border-gray-100');

        const imageWrapper = createElementWithClasses('div', 'w-20 h-20 ml-3 flex-shrink-0');
        const img = createElementWithClasses('img', 'w-full h-full object-contain rounded-lg');
        img.src = imageSrc;
        img.alt = name;
        imageWrapper.appendChild(img);

        const detailsDiv = createElementWithClasses('div', 'flex-grow text-right');
        const nameP = createElementWithClasses('p', 'text-xs text-gray-700 mb-2 leading-snug');
        nameP.textContent = name;
        
        const priceSection = createPriceSection(originalPrice, discount, finalPrice, 'تومان');
        // نیاز به تنظیم سایز کوچکتر برای کارت‌های کوچک
        priceSection.className = priceSection.className.replace('text-lg', 'text-sm');
        priceSection.querySelector('.text-2xl').className = 'text-primary-blue font-extrabold text-lg';
        priceSection.querySelector('.text-base').className = 'text-sm';
        
        detailsDiv.append(nameP, priceSection);
        card.append(imageWrapper, detailsDiv);
        return card;
    };

    // --- تابع ساخت کارت بزرگ/متوسط (Large/Medium Card) ---
    const createLargeCard = (imageSrc, name, originalPrice, discount, finalPrice, isLarge = false) => {
        const card = createElementWithClasses('div', 'bg-white rounded-xl p-4 shadow-xl flex flex-col items-center justify-between border-2 border-gray-100');
        
        // تنظیم order برای چیدمان صحیح در گرید (Large: order-3, Medium: order-2)
        card.className += isLarge ? ' order-1 lg:order-3' : ' order-2';

        const imgHeight = isLarge ? 'h-48 md:h-80' : 'h-48 md:h-64';
        const imageWrapper = createElementWithClasses('div', `w-full ${imgHeight} flex justify-center items-center mb-4`);
        const img = createElementWithClasses('img', 'max-h-full max-w-full object-contain');
        img.src = imageSrc;
        img.alt = name;
        imageWrapper.appendChild(img);

        const detailsWrapper = createElementWithClasses('div', 'text-center w-full mt-4');
        const nameP = createElementWithClasses('p', 'text-sm md:text-md text-gray-700 font-semibold mb-4');
        nameP.textContent = name;

        const priceSection = createPriceSection(originalPrice, discount, finalPrice);
        
        detailsWrapper.append(nameP, priceSection);
        card.append(imageWrapper, detailsWrapper);
        return card;
    };


    // -------------------------------------------------------
    // C. ساخت ستون سمت راست (Stack of 3 Small Cards)
    // -------------------------------------------------------
    const smallCardsColumn = createElementWithClasses('div', 'space-y-4 order-3 lg:order-1');
    
    // کالا ۱: Mcdodo Power Bank
    smallCardsColumn.appendChild(createSmallCard(
        "img1.png", 
        "پاوربانک 10000 میلی آمپر 22.5 واتی مک دودو مدل Mcdodo MC-4220", 
        "1,597,000", 
        "200,000 تومان تخفیف", 
        "1,397,000"
    ));
    
    // کالا ۲: Powerology Power Bank
    smallCardsColumn.appendChild(createSmallCard(
        "img2.png", 
        "پاوربانک 10000 میلی آمپر 20 واتی وایرلس شارژر مگ سیف پاورولوژی مدل PPbch34", 
        "2,175,000", 
        "200,000 تومان تخفیف", 
        "1,975,000"
    ));

    // کالا ۳: Powerology HDMI Splitter
    smallCardsColumn.appendChild(createSmallCard(
        "img3.png", 
        "فرستنده HDMI بی سیم پاورولوژی مدل Powerology Phdmrahk", 
        "5,197,000", 
        "200,000 تومان تخفیف", 
        "4,997,000"
    ));


    // -------------------------------------------------------
    // D. ساخت کارت میانی (Anker Charger)
    // -------------------------------------------------------
    const mediumCard = createLargeCard(
        "img4.png", 
        "شارژر دیواری 30 واتی انکر مدل Anker Zolo A2698", 
        "1,150,000", 
        "200,000 تومان تخفیف", 
        "950,000", 
        false
    );

    // -------------------------------------------------------
    // E. ساخت کارت اصلی (Massage Gun)
    // -------------------------------------------------------
    const largeCard = createLargeCard(
        "download.png", 
        "سالمتر-مینی ULTRA-مینی پاورولوژی مدل Powerology SM011", 
        "3,250,000", 
        "255,000 تومان تخفیف", 
        "2,995,000", 
        true
    );


    // -------------------------------------------------------
    // 5. مونتاژ نهایی
    // -------------------------------------------------------
    gridDiv.append(smallCardsColumn, mediumCard, largeCard); // ترتیب در DOM مهم نیست، چون با Tailwind order کنترل می‌شود
    mainWrapper.append(header, gridDiv);
    appContainer.appendChild(mainWrapper);


    // -------------------------------------------------------
    // 6. منطق به‌روزرسانی زمان
    // -------------------------------------------------------

    const updateTime = () => {
        const timeElement = document.getElementById('current-time-js');
        if (timeElement) {
            const now = new Date();
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: false
            };
            timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions); 
        }
    };

    // به‌روزرسانی زمان هر یک ثانیه
    setInterval(updateTime, 1000);
});