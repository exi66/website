FROM composer as builder

WORKDIR /form/

COPY ./form .

RUN composer install

FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
  libzip-dev \
  zip \
  && docker-php-ext-install zip

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

WORKDIR /app/

COPY --from=builder /form/ ./form/

COPY ./dist .

CMD ["php-fpm"]