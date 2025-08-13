---
title: Teams Connect Shared Channels
author: surbhigupta
description: Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
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

## Updating Your App Ensures the following:

- Visible and usable everywhere: Your app can be added to private and shared channels, not just standard ones.
- Works as expected: Your app handles channel-specific members and file storage correctly.
- Safe and secure: Your app respects privacy rules and avoids data leaks between channels.
- Future Readiness: Your app follows Microsoft’s direction to support private and shared channels.

This guide helps you understand the updates needed to make your Teams app work seamlessly across Standard, private, and Shared channels. It covers what’s changed, key concepts such as membership, access control, installation flow, and storage, along with implementation steps, testing tips, and best practices to get your app channel-ready.

## Channel Models in Microsoft Teams

**Standard Channels**

- Visible to the entire team
- All team members have access by default

**Private Channels**

- Access limited to invited team members only
- Files are stored in the channel’s dedicated SharePoint site

**Shared Channels**

- Can include members outside the host team
- Shareable with individuals or teams across the same or different organizations
- Files are stored in the channel’s own SharePoint site


