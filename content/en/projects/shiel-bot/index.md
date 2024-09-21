---
navigation:
  author: 'Exi'
  publishedAt: '2022-06-07'
  tags: [ 'ExpressJs', 'VueJs', 'DiscordJs', 'SapphireJs', 'SQLite', 'Docker' ]
  source: 'https://github.com/exi66/shiel-bot'
  demo: 'https://market.exi.moe/'
  images: [ '/images/projects/shiel-bot/1.webp', '/images/projects/shiel-bot/2.webp', '/images/projects/shiel-bot/3.webp', '/images/projects/shiel-bot/4.webp' ]
  avatar: '/images/projects/shiel-bot/index.webp'
---

# shiel-bot

Discord bot for tracking the central market of the game Black Desert and subsequent integration into the messenger.

## Functionality

Allows you to receive notifications in the discord when the registration of the product you have subscribed to is
carried out, as well as when new coupons are published. Data is obtained from the auction API and parsing of html pages.
There is a web interface for
conveniently setting up subscriptions and notifications.

## Description

The official messenger library [discord.js](https://discord.js.org/) was used as a starting point.
The very first version of the application did not have any more significant dependencies and worked without a database,
the bot worked in queue mode, publishing everything in a separate channel, i.e. there were no personal settings.
After a couple of months of operation, I added the functionality of personal notifications and the corresponding setting
through the chat of the messenger itself. A little later I came across the
framework [sapphirejs](https://github.com/sapphiredev/framework) — «Discord bot framework built on top of
discord.js...». I decided to try it, updating the bot at the same time. So the application got a database, a small front
on **Vue**, an api on **Express** and acquired its current form.