# 📝 Notes App — Laravel + Next.js + MySQL (Dockerized)

## 📖 Deskripsi Proyek

**Notes App** adalah aplikasi pencatatan sederhana yang dibangun menggunakan **Laravel** sebagai backend API dan **Next.js** sebagai frontend.
Aplikasi ini berjalan di atas container Docker, dengan **MySQL** sebagai database.
Tujuannya adalah untuk memberikan contoh arsitektur modern berbasis **microservices** antara frontend, backend, dan database yang terpisah namun terhubung secara otomatis melalui Docker Compose.

---

## 🧱 Teknologi yang Digunakan

* ⚙️ **Backend:** [Laravel 10](https://laravel.com/)
* 🖥️ **Frontend:** [Next.js 14+](https://nextjs.org/) + [TailwindCSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
* 🗄️ **Database:** [MySQL 8](https://www.mysql.com/)
* 🐳 **Containerization:** [Docker & Docker Compose](https://www.docker.com/)

---

## 📁 Struktur Proyek
notes/
    laravel/
    notes-be/ # Source code backend (Laravel)

    next/
    notes-fe/ # Source code frontend (Next.js)

    docker-compose.yml # Docker orchestration file
    README.md # Dokumentasi proyek


---

## ⚙️ Konfigurasi Docker Compose

File `docker-compose.yml` membuat tiga service utama:

| Service | Port | Deskripsi |
|----------|------|-----------|
| **laravel** | 8000 | Menjalankan Laravel API (`php artisan serve`) |
| **next** | 3000 | Menjalankan Next.js frontend |
| **db** | 3306 | MySQL database |

```yaml
services:
  laravel:
    build:
      context: ./laravel/notes-be
    container_name: notes-laravel
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - ./laravel/notes-be:/var/www
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=local
      - APP_DEBUG=true
      - APP_KEY=
      - DB_HOST=db
      - DB_PORT=3306
      - DB_DATABASE=notes
      - DB_USERNAME=root
      - DB_PASSWORD=root
    depends_on:
      - db
    command: bash -c "php artisan key:generate && php artisan migrate && php artisan serve --host=0.0.0.0 --port=8000"

  next:
    build:
      context: ./next/notes-fe
    container_name: notes-next
    restart: unless-stopped
    working_dir: /app
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - laravel

  db:
    image: mysql:8.0
    container_name: notes-db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: notes
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:

## 🚀 Cara Menjalankan Proyek

### 1️⃣ Persyaratan
Pastikan kamu sudah menginstal:

- **Docker Desktop**  
- **Docker Compose**

### 2️⃣ Clone Repositori
```bash
git clone https://github.com/username/notes.git
cd notes

### 3️⃣ Jalankan Docker Compose
```bash
docker compose up --build

Perintah ini akan:

Membangun image untuk Laravel, Next.js, dan MySQL
Menjalankan semua container
Menjalankan migrasi database otomatis

### 4️⃣ Akses Aplikasi

| Komponen | URL / Informasi |
|----------|----------------|
| **Frontend (Next.js)** | [http://localhost:3000](http://localhost:3000) |
| **Backend API (Laravel)** | [http://localhost:8000](http://localhost:8000) |
| **Database (MySQL)** | `localhost:3306` (user: `root`, password: `root`) |

###🧩 Perintah Tambahan
Masuk ke Container Laravel
docker exec -it notes-laravel bash

Jalankan Migrasi Manual (jika diperlukan)
php artisan migrate

Hapus Cache Build Docker
docker builder prune -a

Hentikan Semua Container
docker compose down