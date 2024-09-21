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

Down detector using tcp-ping for any servers

## Description

A small service and web application that pings tcp ports and keeps latency statistics with subsequent visualization in
**ChartsJs**. The service works as cron, pings specified servers at a specified interval, collects data in
json files, generates a preview image of the current load once an hour and a preview of the monthly load once a day. The
web interface simply provides convenient access to json files with the option of sorting by days\months and filtering.

After a couple of years of use, I learned about the [Uptime Kuma](https://github.com/louislam/uptime-kuma) project,
which provided broader functionality and completely abandoned the use of my own version.