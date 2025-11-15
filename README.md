# 🩺 TUS Hazırlık - React Native Mobil Uygulama

Modern ve kullanıcı dostu bir TUS (Tıpta Uzmanlık Sınavı) hazırlık uygulaması. Duolingo'nun etkileşimli yaklaşımından ilham alınarak React Native ve TypeScript ile geliştirilmiştir.

## ✨ Özellikler

- 🏠 **Ana Ekran**: Günlük seri, çözülen sorular, başarı oranı takibi
- 📚 **Konu Yolculuğu**: Görsel yol haritası ile konu takibi
- ✏️ **İnteraktif Sorular**:
  - Çoktan seçmeli TUS soruları (A-E şıkları)
  - Vaka bazlı sorular
  - Detaylı açıklamalar
  - Anlık geri bildirim
- 👤 **Profil ve İstatistikler**:
  - Genel başarı oranı
  - Konu bazlı performans analizi
  - Zayıf konular takibi
  - Başarı rozetleri
- 🎨 **Modern UI**: Temiz, renkli ve hekim adaylarına özel arayüz

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start

# Android için
npm run android

# iOS için (macOS gerekli)
npm run ios

# Web için
npm run web
```

## 📱 Ekranlar

### Ana Ekran (Home)
- Günlük seri takibi 🔥
- Toplam doğru cevap ve başarı oranı ✅
- Günlük soru hedefi ve ilerleme 🎯
- Hızlı başlangıç seçenekleri:
  - Günlük test (20 soru)
  - Zayıf konular pratiği
  - Mock sınav
- Temel bilimler ve klinik bilimler kategorileri

### Konu Yolculuğu (Lessons)
- Görsel yol haritası (Duolingo tarzı)
- Konu grupları:
  - Temel Tıp Bilimleri (Anatomi, Fizyoloji, Biyokimya, Farmakoloji, vb.)
  - Klinik Bilimler (Dahiliye, Cerrahi, Pediatri, Kadın Hastalıkları, vb.)
- Zorluk seviyeleri: Kolay, Orta, Zor
- Tamamlanma durumu gösterimi

### Soru Çözme (Exercise)
- TUS formatında çoktan seçmeli sorular
- A-E şıkları ile profesyonel görünüm
- İlerleme çubuğu
- Doğru/yanlış geri bildirimi
- Detaylı açıklamalar
- Konu bazlı performans hesaplama

### Profil (Profile)
- Kullanıcı bilgileri ve genel başarı oranı
- İstatistikler:
  - Çözülen soru sayısı
  - Doğru cevap sayısı
  - Günlük ve en uzun seri
- En iyi konular listesi
- Geliştirilmesi gereken konular
- Başarı rozetleri sistemi
- Ayarlar menüsü

## 🏗️ Proje Yapısı

```
ts/
├── src/
│   ├── components/       # Reusable UI komponentleri
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ProgressBar.tsx
│   ├── data/            # Mock data
│   │   └── mockData.ts
│   ├── navigation/      # Navigation yapılandırması
│   │   └── AppNavigator.tsx
│   ├── screens/         # Ekranlar
│   │   ├── HomeScreen.tsx
│   │   ├── LessonsScreen.tsx
│   │   ├── ExerciseScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── types/           # TypeScript type tanımları
│       └── index.ts
├── App.tsx
└── package.json
```

## 🎓 İçerik Yapısı

### Temel Tıp Bilimleri
- 🦴 Anatomi
- ❤️ Fizyoloji
- 🧬 Biyokimya
- 💊 Farmakoloji
- 🔬 Patoloji
- 🦠 Mikrobiyoloji

### Klinik Bilimler
- 🩺 Dahiliye
- 🏥 Cerrahi
- 👶 Pediatri
- 🤰 Kadın Hastalıkları ve Doğum

## 🎨 Tasarım Dili

Uygulama, tıp dünyasına uygun modern ve profesyonel bir tasarım kullanır:
- **Yeşil (#58CC02)**: Başarı, doğru cevaplar
- **Mavi (#1CB0F6)**: Seçili durumlar, aktif konular
- **Sarı (#FFD900)**: Başarımlar, özel işaretler
- **Kırmızı (#FF4B4B)**: Yanlış cevaplar, zayıf konular
- **Konu Renkleri**: Her tıp dalı için özel renk paleti

## 🔧 Teknolojiler

- **React Native** (Expo)
- **TypeScript**
- **React Navigation** (Stack & Bottom Tabs)
- **Native Components** (SafeAreaView, ScrollView, vb.)

## 📝 Mock Data

Uygulama şu anda detaylı mock data ile çalışmaktadır:
- 10 farklı tıp dalı (temel bilimler + klinik bilimler)
- 3+ konu grubu
- 12+ gerçek TUS sorusu örneği
- Detaylı açıklamalar ve konu etiketleri

### Örnek Sorular
- Anatomi: Kardiyovasküler sistem, üst ekstremite
- Fizyoloji: Nörofizyoloji, renal fizyoloji, kardiyovasküler fizyoloji
- Biyokimya: Metabolizma, glikoliz, Krebs döngüsü
- Farmakoloji: Beta-blokerler, ACE inhibitörleri
- Dahiliye: Kardiyoloji, endokrinoloji, EKG yorumlama
- Cerrahi: Akut batın, apandisit

## 🎯 Gelecek Geliştirmeler

- [ ] Backend entegrasyonu
- [ ] Gerçek kullanıcı kayıt/giriş sistemi
- [ ] Daha fazla TUS sorusu ve konu
- [ ] Soru favorileme ve not alma
- [ ] Zamanlayıcılı deneme sınavları
- [ ] Konu anlatım videoları
- [ ] Sosyal özellikler (liderlik tablosu, arkadaş ekleme)
- [ ] Performans analizi ve zayıf konu önerileri
- [ ] Bildirim sistemi
- [ ] Offline mod
- [ ] Soru paylaşma ve yorum yapma
- [ ] Grafik ve raporlama

## 👥 Hedef Kitle

- TUS'a hazırlanan tıp fakültesi mezunları
- Tıpta uzmanlık sınavına girecek hekim adayları
- Tıbbi bilgilerini güncel tutmak isteyen hekimler
- Tıp fakültesi öğrencileri

## 📄 Lisans

Bu proje eğitim amaçlıdır.

## 🙏 Teşekkürler

Duolingo'nun etkileşimli öğrenme yaklaşımından ilham alınmıştır.
