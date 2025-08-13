# AutoRent - Modern Araç Kiralama Sitesi

Modern, yenilikçi ve kullanıcı dostu bir araç kiralama web sitesi. HTML, Bootstrap, CSS ve JavaScript kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Ana Özellikler
- **Modern Tasarım**: Responsive ve modern UI/UX tasarımı
- **Araç Filosu**: 12 farklı araç kategorisi (Lüks, Ekonomik, SUV)
- **Hızlı Rezervasyon**: Ana sayfada hızlı rezervasyon formu
- **Detaylı Araç Bilgileri**: Her araç için detaylı özellikler ve görseller
- **İletişim Formu**: Müşteri iletişim formu
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm

### Teknik Özellikler
- **HTML5**: Semantik HTML yapısı
- **Bootstrap 5**: Modern CSS framework
- **CSS3**: Özel animasyonlar ve efektler
- **JavaScript ES6+**: Modern JavaScript fonksiyonları
- **Font Awesome**: İkon kütüphanesi
- **Google Fonts**: Inter font ailesi

## 📁 Proje Yapısı

```
AutoRent/
├── index.html          # Ana sayfa
├── styles.css          # CSS stilleri
├── script.js           # JavaScript fonksiyonları
├── README.md           # Proje dokümantasyonu
└── assets/             # Görseller ve medya dosyaları
    ├── range-1.jpg     # BMW 3 Serisi
    ├── range-2.jpg     # Mercedes C-Class
    ├── range-3.jpg     # Audi A4
    ├── range-4.jpg     # Volkswagen Golf
    ├── select-1.png    # Toyota Corolla
    ├── select-2.png    # Honda Civic
    ├── select-3.png    # Ford Focus
    ├── select-4.png    # Hyundai i30
    ├── select-5.png    # BMW X3
    ├── select-6.png    # Mercedes GLC
    ├── select-7.png    # Audi Q5
    ├── cars.jpeg       # Volkswagen Tiguan
    ├── company.jpg     # Şirket görseli
    ├── header-bg.png   # Hero section arka plan
    └── ...             # Diğer görseller
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Primary**: #2563eb (Mavi)
- **Secondary**: #1e40af (Koyu Mavi)
- **Accent**: #f59e0b (Turuncu)
- **Success**: #10b981 (Yeşil)
- **Danger**: #ef4444 (Kırmızı)

### Animasyonlar
- **Fade In Up**: Kartlar için yukarıdan aşağıya geçiş
- **Hover Effects**: Butonlar ve kartlar için hover efektleri
- **Smooth Scrolling**: Sayfa içi geçişler
- **Loading Animations**: Form gönderimi sırasında

## 🚗 Araç Kategorileri

### Lüks Araçlar
- BMW 3 Serisi (₺850/gün)
- Mercedes C-Class (₺920/gün)
- Audi A4 (₺780/gün)

### Ekonomik Araçlar
- Volkswagen Golf (₺450/gün)
- Toyota Corolla (₺420/gün)
- Honda Civic (₺480/gün)
- Ford Focus (₺400/gün)
- Hyundai i30 (₺380/gün)

### SUV Araçlar
- BMW X3 (₺1100/gün)
- Mercedes GLC (₺1200/gün)
- Audi Q5 (₺1150/gün)
- Volkswagen Tiguan (₺750/gün)

## 🛠️ Kurulum

1. **Projeyi İndirin**
   ```bash
   git clone [repository-url]
   cd AutoRent
   ```

2. **Dosyaları Kontrol Edin**
   - `index.html` dosyasının varlığını kontrol edin
   - `assets/` klasöründeki görsellerin mevcut olduğunu kontrol edin

3. **Tarayıcıda Açın**
   - `index.html` dosyasını herhangi bir modern tarayıcıda açın
   - Local server kullanmanız önerilir (Live Server gibi)

## 📱 Responsive Tasarım

### Breakpoint'ler
- **Desktop**: 1200px ve üzeri
- **Tablet**: 768px - 1199px
- **Mobile**: 767px ve altı

### Özellikler
- Mobil uyumlu navigasyon menüsü
- Responsive araç kartları
- Mobilde optimize edilmiş formlar
- Touch-friendly butonlar

## 🔧 JavaScript Fonksiyonları

### Ana Fonksiyonlar
- `loadVehicles()`: Araçları yükler
- `createVehicleCard()`: Araç kartı oluşturur
- `bookVehicle()`: Rezervasyon modalını açar
- `showVehicleDetails()`: Araç detaylarını gösterir
- `submitBooking()`: Rezervasyon formunu gönderir
- `submitContactForm()`: İletişim formunu gönderir

### Yardımcı Fonksiyonlar
- `showNotification()`: Bildirim gösterir
- `calculatePrice()`: Fiyat hesaplar
- `formatDate()`: Tarih formatlar
- `setupAnimations()`: Animasyonları ayarlar

## 🎯 Kullanım Senaryoları

### Müşteri Senaryosu
1. Ana sayfada hızlı rezervasyon formunu doldurur
2. Araçları inceler ve detaylarını görür
3. İstediği aracı seçer ve rezervasyon yapar
4. İletişim formu ile sorularını sorar

### Yönetici Senaryosu
1. Araç filosunu yönetir
2. Rezervasyonları takip eder
3. Müşteri mesajlarını yanıtlar
4. Fiyatlandırmayı günceller

## 🔮 Gelecek Özellikler

### Planlanan Geliştirmeler
- [ ] Kullanıcı hesap sistemi
- [ ] Online ödeme entegrasyonu
- [ ] Araç filtreleme sistemi
- [ ] Çoklu dil desteği
- [ ] Admin paneli
- [ ] Araç takip sistemi
- [ ] Müşteri yorumları
- [ ] Sadakat programı

### Teknik İyileştirmeler
- [ ] PWA (Progressive Web App) desteği
- [ ] SEO optimizasyonu
- [ ] Performance iyileştirmeleri
- [ ] API entegrasyonu
- [ ] Database bağlantısı

## 📞 İletişim

**AutoRent Araç Kiralama**
- 📍 Adres: Atatürk Havalimanı, İstanbul
- 📞 Telefon: +90 212 555 0123
- 📧 E-posta: info@autorent.com

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir. Ticari kullanım için lütfen iletişime geçin.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Changelog

### v1.0.0 (2024-01-XX)
- İlk sürüm yayınlandı
- Temel araç kiralama özellikleri
- Responsive tasarım
- Modern UI/UX

---

**Not**: Bu proje modern web teknolojileri kullanılarak geliştirilmiştir. En iyi deneyim için güncel bir tarayıcı kullanmanız önerilir.
