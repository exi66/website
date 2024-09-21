---
navigation:
  author: 'Exi'
  publishedAt: '2024-09-20'
  tags: [ 'ExpressJs', 'VueJs', 'DiscordJs', 'SapphireJs', 'SQLite', 'Docker' ]
source: 'https://github.com/exi66/mcgl-data-api/'
demo: 'https://mcgl.exi.moe/'
images: [ '/images/projects/mcgl-data-api/1.webp' ]
---

# mcgl-data-api

An application for converting various raw data arrays into structured data for subsequent convenient REST-like search.

## Functionality

The application includes two seeders for generating a database from information dumps, a detailed description of the
structure of the dumps and how to work with them, an API on **ExpressJs** for accessing structured information and a web
interface on **VueJs** for convenient search. **MongoDB** and the corresponding **mongoose** package are used as a
database here.

## Description

A long time ago, I already implemented the functionality of searching for this data, but then I was just getting
acquainted with programming. This project is a kind of look back into the past, correcting errors using the accumulated
experience. This is also the first time I used a NoSQL database.