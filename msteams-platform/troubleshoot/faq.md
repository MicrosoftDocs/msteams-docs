---
title: Frequently asked questions
description: Answers to frequently asked questions about developing apps for Microsoft Teams
keywords: teams apps faq faqs
ms.date: 07/12/2018
---

# Frequently asked questions (Microsoft Teams developer platform)

## Setting up

### What technology should I use to build my bot or tab?

Tabs are web content that you build and deploy, so you can use any technology you want.

Because bots must be built with the Bot Framework, we recommend you use one of the languages supported by the Bot Builder SDK: .NET/C# or Node.js. Although the Bot Framework also provides REST APIs usable by any language you choose, the SDK provides additional functionality and helper functions to simplify the development process.

We also provide Teams-specific .NET and Node.js [extensions for the Bot Builder SDK](~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) to make integration with the Teams platform even easier.

### Where do I sign up to start building Teams apps?

1. You must have access to Microsoft Teams via an Office 365 subscription
2. If you are building a bot you must [register it with Bot Framework](~/concepts/bots/bots-create)
3. App publishing requires you [register as a Microsoft app developer](//developer.microsoft.com/en-us/store/register)

## How do I make my Teams app work with Microsoft Teams free?

On July 12, 2018, Microsoft announced a new edition of Microsoft Teams: *Microsoft Teams free*. This allows users to create their own Teams organizations of up to 300 users for free (not a free trial; free, period). You can find more information about Microsoft Teams free [here](https://support.office.com/article/6d79a648-6913-4696-9237-ed13de64ae3c).

There are no significant limitations in Microsoft Teams free in terms of how many apps you can use, what they can do or, for the most part, which apps are available. Some of the Teams apps are not available, for example, because they are designed to work with Office 365 services that aren't included in Microsoft Teams free.

Most apps will work in Microsoft Teams free with no modifications. However, apps which require users to log into Azure Active Directory (AAD) may need to make some minor changes. If you want to ensure your app works with Microsoft Teams free, and your app requires users to log into AAD, here's what to do:
* Ensure that the endpoint you call is in the form [http://login.microsoftonline.com/**TENANT_ID**/oauth2/authorize?...]()
  and **not**  [https://login.microsoftonline.com/**common**/oauth2/authorize?...]()
* To obtain **TENANT_ID**, use the [bot context](~/concepts/bots/bots-context) or the [tab context](~/concepts/tabs/tabs-context) APIs
* This will also ensure [Guest users](https://docs.microsoft.com/en-us/MicrosoftTeams/guest-access) can login using your app

For a more exhaustive discussion, see [AAD tab authentication](~/concepts/authentication/auth-tab-aad) and [AAD bot authentication](~/concepts/authentication/auth-bot-aad). For a Node.js source code example of an app that does AAD authentication and will work on with Microsoft Teams free, see the [Microsoft Teams Authentication Sample](https://github.com/OfficeDev/microsoft-teams-sample-auth-node) app.

## Bots

### How can my bot access the ID of a user in personal chat?

To can obtain the profile information of the user who is chatting with your bot, see [Fetching user profile in personal chat](~/concepts/bots/bots-context#fetching-user-profile-in-11-chat). (The process is almost identical to [Fetching the team roster](~/concepts/bots/bots-context#fetching-the-team-roster).)

### How can my bot access or listen to all messages in a channel?

Bots in channels receive messages only when they are explicitly @mentioned. There is no way to grant your bot access to conversations in which they are not mentioned.

## Distribution

### How can I distribute my Microsoft Teams app?

Microsoft Teams apps can be distributed to end users via AppSource and the in-product app-discovery system. For more information, see [Publish your Microsoft Teams app to AppSource](~/publishing/apps-publish).

Microsoft Teams app packages can be manually distributed to your colleagues or other end users and uploaded by them via the [uploading process](~/concepts/apps/apps-upload). Please note that apps distributed in this format are not tested, validated, or trusted by Microsoft.

### What account do I use to create an AppSource or Dev Center account?

An AppSource developer account is based on a [Microsoft account](https://account.microsoft.com/account), so you should use an existing Microsoft account or create one for this purpose.

If you already have a Windows Store developer account, you must use the original owner Microsoft account for the Seller Dashboard experience. Although the Windows Store portal allows Azure Active Directory association, the Seller Dashboard is a separate system that works only with your original Microsoft account.

---

>Not seeing your question? Submit your own; we listen to the developer community across [several channels](~/feedback).
