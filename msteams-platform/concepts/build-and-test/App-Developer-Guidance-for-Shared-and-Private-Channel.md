---
title: Teams Connect Shared and Private Channels
author: surbhigupta
description: Explore Teams Connect shared channels to collaborate securely with both internal and external users in one shared space.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 04/09/2025
---
# Adapting Microsoft Teams App for Private and Shared Channels: A Developer's Guide

As Microsoft Teams evolves, shared and private channels introduce new collaboration patterns that differ significantly from Standard channels. To function reliably and securely across all channel types, apps must become context-aware—specifically in terms of:

- Membership structure
- Storage architecture
- Privacy boundaries

## Updating Your App Ensures

- Visible and usable everywhere: Your app can be added to private and shared channels, not just standard ones.
- Works as expected: Your app handles channel-specific members and file storage correctly.
- Safe and secure: Your app respects privacy rules and avoids data leaks between channels.
- Future Readiness: Your app follows Microsoft’s direction to support private and shared channels.

This guide helps you understand the updates needed to make your Teams app work seamlessly across Standard, private, and Shared channels.

What This Guide Covers?

- key concepts (membership, access, installation, storage)
- Implementation steps
- testing guidance
- Best practices

## Channel Models in Microsoft Teams

**Standard Channels**

- Visible to the entire team
- All team members have access to the channel by default

**Private Channels**

- Access limited to invited team members only
- Files are stored in the channel’s dedicated SharePoint site

**Shared Channels**

- Including external and nonhost team members
- Sharing with individuals or teams across organizations
- Storing files in the channel’s dedicated SharePoint sit

## Shared Channel Capabilities

## Teams Channel Models – Capabilities Comparison

| **Category** | **Capability**                                                                 | **Standard Channel** | **Private Channel** | **Shared Channel** |
|--------------|----------------------------------------------------------------------------------|----------------------|---------------------|---------------------|
| **Membership** | Can add people to the channel without adding to the host team                 | No                   | No                  | Yes                 |
|              | Channel membership can be limited to a subset of the host team                 | No                   | Yes                 | Yes                 |
|              | Channel can be shared with other teams to inherit members from the team        | No                   | No                  | Yes                 |
|              | Channel can be shared directly with its parent team to inherit members         | N/A                  | No                  | Yes                 |
|              | Guests (B2B Guests) can participate in the channel                             | Yes                  | Yes                 | No                  |
|              | External participants (B2B Direct Connect) can participate in the channel      | No                   | No                  | Yes                 |
|              | Channel is hosted under a host team                                            | Yes                  | Yes                 | Yes                 |
| **Storage**   | Each channel has a dedicated SharePoint site                                  | No (inherits team site) | Yes              | Yes                 |
| **App Model** | App must be installed in the host team                                        | Yes                  | Yes                 | Yes                 |
|              | App installed to host team automatically available in channel                 | Yes                  | No                  | No                  |
|              | App must be added to each channel                                              | No                   | Yes                 | Yes                 |

> **Note:**  

> - Currently, only apps that include tabs are supported in private and shared channels in Microsoft Teams.  
> - Tab apps in shared channels are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../sovereign-cloud.md) environments.  
> - SharePoint and the SharePoint pages apps aren't supported for shared channels in GCC, GCC High, DoD, and Teams operated by 21Vianet environments.  
> - Bots and message extensions are not supported in shared channels.
