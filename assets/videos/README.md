# Video Folder

Folder ini untuk menyimpan video lokal (.mp4, .webm, .ogg)

## Cara Menggunakan:

### 1. Untuk Video Lokal
- Letakkan file video (.mp4) di folder ini
- Update script.js dengan path yang benar:
```javascript
openVideoModal('Nama Video', 'assets/videos/auliyanari.mp4', 'local');
```

### 2. Untuk Video YouTube
- Dapatkan YouTube Video ID dari URL
- Contoh: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- ID-nya adalah: `dQw4w9WgXcQ`
- Gunakan:
```javascript
openVideoModal('Nama Video', 'dQw4w9WgXcQ', 'youtube');
```

## Format Video yang Didukung:
- MP4 (recommended)
- WebM
- OGG
- YouTube Embed

## Contoh Video yang Sudah Dikonfigurasi:
- Koreografi "Tari Saman Modern" → YouTube demo video
- Koreografi "Tari Kreasi Nusantara" → YouTube demo video
- Part 1 - Pembukaan.mp4 → YouTube demo video
- Part 2 - Inti.mp4 → YouTube demo video
- Part 3 - Penutup.mp4 → YouTube demo video
- Full Version.mp4 → YouTube demo video

Ganti dengan video ID YouTube yang sebenarnya atau path video lokal Anda!
