News App – Skill Test Mobile Developer

PT. CITRARAYA NUSATAMA (DHEALTH)

Aplikasi mobile sederhana untuk menampilkan berita terkini (Top Headlines) dari API berita dengan fitur pencarian, kategori, profil pengguna, dan notifikasi.
Dibuat menggunakan React Native (Expo / CLI) dengan integrasi Firebase Cloud Messaging (FCM) untuk push notification.

🚀 Cara Menjalankan Project
1. Persiapan

Pastikan sudah ter-install:

Node.js
 (versi LTS disarankan)

Expo CLI
 atau React Native CLI

Yarn
 / npm

Android Studio atau Xcode (jika testing di emulator)

Akun Firebase
 (jika menggunakan fase 2 – notifikasi)

2. Clone Repository
git clone https://github.com/mahardikaindra/news.git
cd news

3. Install Dependencies
yarn install
# atau
npm install

4. Konfigurasi Environment

Buat file .env pada root project:

API_KEY=your_newsapi_key_here
BASE_URL=https://newsapi.org/v2

5. Jalankan Aplikasi

Jika menggunakan Expo:

npx expo start


Jika menggunakan React Native CLI:

npx react-native run-android
# atau
npx react-native run-ios

📖 Detail Aplikasi
Fase 1 – News App

Halaman Beranda (Top Headlines)

Menampilkan berita utama hari ini dari US.

Format list vertikal dengan komponen:

Gambar preview berita

Sumber (source)

Penulis (author)

Judul (title)

Deskripsi singkat (description)

Halaman Pencarian Berita

Search box untuk input kata kunci.

Combo box untuk memilih pencarian berdasarkan title atau description.

Hasil pencarian ditampilkan dalam list.

Halaman Kategori

Menampilkan semua kategori berita:

Business, Entertainment, General, Health, Science, Sports, Technology

Saat kategori dipilih, aplikasi menampilkan berita sesuai kategori.

Halaman Notifikasi

Placeholder (fase 1).

Implementasi detail ada di fase 2.

Halaman Profil

Karena belum ada sistem login, halaman hanya menampilkan Coming Soon.

Navigation Bar (Bottom Tabs)

Semua halaman dapat diakses dari bottom navigation bar.

Fase 2 – Push Notification (Opsional)

Integrasi Firebase Cloud Messaging (FCM).

Aplikasi dapat:

Generate FCM token.

Menerima push notification dan menampilkannya di home screen HP.

Menyimpan setiap notifikasi di local storage.

Menampilkan riwayat notifikasi pada halaman Notifikasi.

Fitur input & pengiriman pesan bisa diuji melalui Firebase Console.

🛠️ Tech Stack

React Native 0.81 / Expo

React Navigation (Bottom Tabs)

Axios / Fetch API untuk konsumsi News API

Firebase Cloud Messaging (FCM) untuk notifikasi

AsyncStorage untuk menyimpan notifikasi lokal

📷 Screenshots (Opsional)

Tambahkan screenshot tiap halaman di folder docs/screenshots/.

👨‍💻 Author

Raka Mahardika
Skill Test Mobile Developer – PT. CITRARAYA NUSATAMA (DHEALTH)## License

This project is open-source and available under the [MIT License](LICENSE).