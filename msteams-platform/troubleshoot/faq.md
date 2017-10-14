---
title: Frequently asked questions
description: Answers to frequently asked questions about developing apps for Microsoft Teams
keywords: teams apps faq faqs
---

# Frequently asked questions (Microsoft Teams developer platform)

## Setting up

### What technology should I use to build my bot or tab?

Tabs are web content that you build and deploy, so you can use any technology you want.  

Because bots must be built with the Bot Framework, we recommend you use one of the languages supported by the Bot Builder SDK: .NET/C# or Node.js. Although the Bot Framework also provides REST APIs usable by any language you choose, the SDK provides additional functionality and helper functions to simplify the development process.

We also provide Teams-specific .NET and Node.js [extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) to make integration with the Teams platform even easier.

### Where do I sign up to start building Teams apps?

No prerequisites or additional development accounts are needed to start building apps for Microsoft Teams. Although you must have access to Microsoft Teams via an Office 365 subscription, no other sign-up or program access is required. You do need to create accounts for the Bot Framework if you build a bot and create a Dev Center account if you submit your app for publication.

## Bots

### How can my bot access the ID of a user in a 1:1 chat?

To can obtain the profile information of the user who is chatting with your bot, see [Fetching user profile in 1:1 chat](~/concepts/bots/bots-context#fetching-user-profile-in-11-chat). (The process is almost identical to [Fetching the team roster](~/concepts/bots/bots-context#fetching-the-team-roster).)

### How can my bot access or listen to all messages in a channel?

Bots in channels receive messages only when they are explicitly @mentioned. There is no way to grant your bot access to conversations in which they are not mentioned.

## Distribution

### How can I distribute my Microsoft Teams app?

Microsoft Teams apps can be distributed to end users via the Office Store and the in-product app-discovery system. For more information, see [Publish your Microsoft Teams app to the Office Store](~/publishing/apps-publish).

Microsoft Teams app packages can be manually distributed to your colleagues or other end users and sideloaded by them via the [sideloading process](~/concepts/app-sideload). Please note that apps distributed in this format are not tested, validated, or trusted by Microsoft.

### What account do I use to create an Office Store or Dev Center account?

A Microsoft Store developer account is based on a [Microsoft account](https://account.microsoft.com/account), so you should use an existing Microsoft account or create one for this purpose.

If you already have a Windows Store developer account, you must use the original owner Microsoft account for the Seller Dashboard experience. Although the Windows Store portal allows Azure Active Directory association, the Seller Dashboard is a separate system that works only with your original Microsoft account.

---

>Not seeing your question? Submit your own; we listen to the developer community across [several channels](~/feedback).
