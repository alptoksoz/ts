# 🎓 Duolingo Clone - React Native

Modern ve kullanıcı dostu bir dil öğrenme uygulaması. Duolingo'dan ilham alınarak React Native ve TypeScript ile geliştirilmiştir.

## ✨ Özellikler

- 🏠 **Ana Ekran**: Günlük streak, XP takibi ve hızlı başlangıç seçenekleri
- 📚 **Dersler**: Duolingo tarzı yol haritası ile görsel ders takibi
- ✏️ **İnteraktif Egzersizler**:
  - Çoktan seçmeli sorular
  - Çeviri egzersizleri
  - Kelime eşleştirme oyunları
- 👤 **Profil**: İstatistikler, başarılar ve ilerleme takibi
- 🎨 **Modern UI**: Temiz, renkli ve kullanıcı dostu arayüz

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
- Günlük seri (streak) takibi 🔥
- Toplam XP ve seviye gösterimi ⭐
- Günlük hedef ilerleme çubuğu 🎯
- Hızlı pratik seçenekleri
- Diğer dillere geçiş

### Dersler (Lessons)
- Üniteler halinde organize edilmiş dersler
- Görsel yol haritası
- Ders tipleri: Normal ders, Pratik, Hikaye, Test
- Tamamlanan dersler için görsel geri bildirim
- Kilitli/açık ders gösterimi

### Egzersiz (Exercise)
- Farklı egzersiz tipleri
- İlerleme takibi
- Anlık geri bildirim
- Puan hesaplama
- Tamamlama ekranı

### Profil (Profile)
- Kullanıcı bilgileri
- Seviye ve XP detayları
- İstatistikler (toplam ders, seri, vb.)
- Başarımlar sistemi
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

## 🎨 Tasarım

Uygulama, Duolingo'nun modern ve renkli tasarım dilinden ilham alır:
- **Yeşil (#58CC02)**: Başarı, tamamlama, pozitif aksiyonlar
- **Mavi (#1CB0F6)**: Aktif dersler, seçimler
- **Sarı (#FFD900)**: Başarımlar, özel işaretler
- **Kırmızı (#FF4B4B)**: Hatalar, uyarılar

## 🔧 Teknolojiler

- **React Native** (Expo)
- **TypeScript**
- **React Navigation** (Stack & Bottom Tabs)
- **Native Components** (SafeAreaView, ScrollView, vb.)

## 📝 Mock Data

Uygulama şu anda mock data ile çalışmaktadır:
- 4 farklı dil seçeneği (İngilizce, İspanyolca, Fransızca, Almanca)
- 3 ünite
- Her ünitede 2-3 ders
- Farklı egzersiz tipleri

## 🎯 Gelecek Geliştirmeler

- [ ] Ses kaydı ve dinleme egzersizleri
- [ ] Backend entegrasyonu
- [ ] Gerçek kullanıcı kayıt/giriş sistemi
- [ ] Sosyal özellikler (liderlik tablosu, arkadaş ekleme)
- [ ] Daha fazla egzersiz tipi
- [ ] Bildirim sistemi
- [ ] Offline mod

## 📄 Lisans

Bu proje eğitim amaçlıdır.
