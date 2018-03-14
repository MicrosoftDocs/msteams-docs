---
title: Combine bots with tabs
description: Describes how to use tabs and bots together
keywords: teams bots tabs development
ms.date: 05/15/2018
---
# Combine bots with tabs

Bots and tabs work well together, and are often combined. This section describes best practices and common patterns for using tabs and bots together.

## Associating user identities across bot and tab

A frequent topic arises of how to associate the content that loads in the tab with interactions that the user has had with the bot.
As an example, suppose your tab application uses a proprietary ID system to secure its content. Suppose you also have a bot that can interact with the user. Typically, you’ll want to show content in the tab that is specific to the viewing user. The challenge is that the user ID in your system is likely different from the Microsoft Teams user ID. So how do you associate these two identity contexts?
In general, the approach we recommend is to sign the user in with the bot using the same identity system providing authentication for the tab content. You can implement this via the sign-in card, which typically takes the user via an OAuth flow – this flow works best if your identity provider implements the OAuth 2.0 protocol. You can then associate the Teams user ID with the user’s credentials from your own identity service.
The following diagram illustrates how the identities can be associated:
