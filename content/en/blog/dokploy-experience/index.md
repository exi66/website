---
created: "2024-09-21"
tags: ["notes", "experience"]
title: "Experience using dokploy"
description: "Description of the experience of getting to know and working with dokploy"
---

# Experience using dokploy

Description of the experience of getting to know and working with [Dokploy](https://github.com/Dokploy/dokploy)

## What is it

**Dokploy**, as the description says, is a free self-hosted platform as a service (PaaS) that simplifies the deployment
and management of applications and databases. It positions itself as a self-hosted analogue of Vercel, Netlify and
Heroku.

## Personal experience of use

### Introduction

I have never used PaaS services before and even avoided containerization as such. Don't get me wrong, I have
actively used and will continue to use docker as a development tool. After all, hosting infrastructure, for example,
**Laravel**, is much easier in a container than on a local machine, but when it came to direct deployment, I
always preferred to install the service as is. The main reason is that I use low-cost infrastructure and an extra
docker wrapper, when there are only a couple of services on the machine, this is an unreasonable waste of resources.
Having come across a video about [Coolify](https://github.com/coollabsio/coolify) (another alternative), I decided to
experiment again. Quite quickly I abandoned the hero of the video, since he did not meet the requirements of my low-cost
«sport-car», but the idea of self-hosted PaaS caught fire more and more. That's how I got acquainted with a solution
called **Dokploy**.

### General impressions

The lack of experience interacting with PaaS played its role. When I placed the first application and pushed changes to
it, and it automatically updated, built and was available with new functionality literally a minute later, I was
literally happy as a child.

**Dokploy** is a fairly new solution, but despite this, it already has:

- a nice and clear interface based on **Radix-ui**
- integration with github/gitlab/bitbucket/git
- own api
- integration with messengers and mail for notifications
- a wide list of templates for applications and databases
- support for **nixpacks**, **docker**, **docker compose**
- full ability to manage containers directly in the web interface
- certification
- Docker Registry
- clustering
- monitoring of consumed resources
- detailed logs
- auto-update

And I have listed only what I have managed to try myself!

### Performance

Under the hood of **Dokploy** is a service on **NodeJs**, a web on **ReactJs**, a reverse proxy from **Traefik**, as a
base here is **PostgreSQL** and a cache in the form of **Redis**. This modest set makes Dokploy one of the least
demanding solutions among its competitors in terms of hardware power.

After migrating all my services, I can give real numbers:

- Disk space has decreased by 3gb
- Of this, 2gb is occupied by **Dokploy** itself and its dependencies
- RAM consumption has increased from 800mb to 950gb on average
- Processor time has increased by 0.15 on average

My installed services are:

- Two static sites
- Discord bot with its own database and web
- REST API with a database
- **3proxy** instance
- **Wireguard VPN** instance
- **php-fpm**

### Conclusion

I am very glad that I tried such a wonderful tool and I can confidently say that I will continue to use it. I really
hope that as the project develops, it will retain its identity as a lightweight analogue of PaaS.
