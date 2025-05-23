---
title: Secure Bot Teams Channel Content
description: Learn how to secure the connection to a Microsoft Teams channel bot's web app by using Azure Private Link and Azure Private Endpoint. 
ms.date: 04/23/2025
ms.topic: conceptual
author: surbhigupta12
ms.author: surbhigupta
ms.localizationpriority: high
---

# Secure bot Teams channel content

Secure and efficient communication between applications and users is crucial. This article shows you how to host a bot behind a firewall and still have conversations with it using Microsoft Teams.

To secure a *bot behind a firewall* implies that the bot's network connectivity is restricted to only the necessary machines (IP addresses).

Your bot runs in a Virtual Network (VNET) that limits traffic to specific IP addresses for Microsoft Teams and Azure Bot Service (ABS). The firewall controls outgoing traffic, while the Network Security Group (NSG) rules of the Application Gateway manage incoming traffic.

The following network architecture shows an example of how you you can secure a bot within a virtual network that allows only necessary traffic:

:::image type="content" source="../assets/images/bots/nw-architecture-secure-bot.png" alt-text="Image shows an example of network architecture of managing traffic for a bot secured behind a firewall." border="false" lightbox="../assets/images/bots/nw-architecture-secure-bot.png":::
