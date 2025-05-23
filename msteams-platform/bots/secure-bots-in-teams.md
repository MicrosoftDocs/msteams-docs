---
title: Secure Bot Teams Channel Content
description: Learn how to secure the connection to a Microsoft Teams channel bot's web app by using Azure Private Link and Azure Private Endpoint. 
ms.date: 05/23/2025
ms.topic: conceptual
author: surbhigupta12
ms.author: surbhigupta
ms.localizationpriority: high
---

# Secure bot Teams channel content

Managing secure and efficient bot interaction is crucial. This article shows you how to host a bot behind a firewall and still have conversations with it using Microsoft Teams.

To secure a *bot behind a firewall* implies that the bot's network connectivity is restricted to only the necessary machines (IP addresses). The following network architecture shows an example of how you you can secure a bot within a virtual network that allows only necessary traffic:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:::image type="content" source="../assets/images/bots/nw-architecture-secure-bot.png" alt-text="Image shows an example of network architecture of managing traffic for a bot secured behind a firewall." border="false" lightbox="../assets/images/bots/nw-architecture-secure-bot.png":::

The bot runs in a Virtual Network (VNET) that limits traffic to specific IP addresses for Microsoft Teams and Azure Bot Service (ABS):

- [The firewall controls *outgoing* traffic.](#control-outgoing-traffic)
- [The Network Security Group (NSG) rules of the App Gateway manage *incoming* traffic.](#restrict-incoming-traffic)

    > [!NOTE]
    > Endpoints data is updated as needed at the beginning of each month with new IP Addresses and URLs published 30 days in advance of being active. This cadence allows for customers who don't yet have automated updates to complete their processes before new connectivity is required. Endpoints may also be updated during the month if needed to address support escalations, security incidents, or other immediate operational requirements. The data shown on this page below is all generated from the REST-based web services.
    > If you're using a script or a network device to access this data, you must go to the [web service](/microsoft-365/enterprise/microsoft-365-ip-web-service?view=o365-worldwide&preserve-view=true) directly.

## Control outgoing traffic

To control outgoing traffic from your bot app:

1. You must set up the App Service Environment (ASE) for your bot's outgoing traffic through the firewall. For more information, see [App Service Environment overview](/azure/app-service/environment/overview).
1. To set the firewall to restrict traffic only to Teams and ABS:

    1. Navigate to **Rules** -> **Network Rule Collection**.
    1. Add the following rules for IP address and fully qualified domain names (FQDN) in a Network Rule Collection:

        :::image type="content" source="../assets/images/bots/restrict-egress-rules.png" alt-text="Image shows how to add a network rule collection." lightbox="../assets/images/bots/restrict-egress-rules.png":::

        - **IP Address rule**: Allow traffic from the subnet of the ASE to in the range [52.112.0.0/14, 52.122.0.0/15](/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide#microsoft-teams&preserve-view=true).

        - **FQDN rule**: Allow traffic from the subnet of the ASE to login.microsoftonline.com.
        - **FQDN rule**: Allow traffic from the subnet of the ASE to login.botframework.com

## Restrict incoming traffic

To control incoming traffic:

1. Navigate to **Add inbound security rule**.
1. Add an inbound security rule to the NSG associated with the subnet of the App Gateway:

    :::image type="content" source="../assets/images/bots/restrict-ingress-rules.png" alt-text="Image shows how to add an inbound security rule." lightbox="../assets/images/bots/restrict-ingress-rules.png":::

    - Allow inbound traffic from only [52.112.0.0/14, 52.122.0.0/15](/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide#microsoft-teams&preserve-view=true) to the subnet of the ASE.
