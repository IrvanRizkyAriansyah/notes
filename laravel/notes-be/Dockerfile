FROM php:8.3-fpm

# Install sistem dependencies dan ekstensi PHP
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpq-dev libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy semua file ke container
COPY . .

# Install dependencies Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Beri permission ke storage dan bootstrap/cache
RUN chmod -R 777 storage bootstrap/cache

# Jalankan php-fpm
CMD ["php-fpm"]

EXPOSE 8000
