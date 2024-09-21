---
navigation:
  author: 'Exi'
  publishedAt: '2023-04-16'
  tags: [ 'NodeJs', 'VueJs', 'ChartJs' ]
source: 'https://github.com/exi66/tcp-servers-status'
images: [ '/images/projects/tcp-servers-status/index.webp', '/images/projects/tcp-servers-status/1.webp', '/images/projects/tcp-servers-status/2.webp' ]
avatar: '/images/projects/tcp-servers-status/index.webp'
---

# tcp-servers-status

Down detector, использующий tcp-ping, для любых серверов

## Описание

Небольшой сервис и веб-приложение, которое пингует tcp-порты и ведет статистику задержки с последующей визуализацией в
**ChartsJs**. Сервис работает как cron, пингует заданные сервера с заданным интервалом, собирает данные в
json файлы, генерирует раз в час картинку-превью текущей нагрузки и раз в день превью ежемесячной нагрузки. Веб
интерфейс просто предоставляет удобный доступ к json файлам с выбором сортировки по дням\месяцам и фильтрацией.

Спустя пару лет использования я узнал о проекте [Uptime Kuma](https://github.com/louislam/uptime-kuma), который
предоставлял более широкий функционал и полностью отказался от использования своей версии.