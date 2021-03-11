---
title: Support your published app
description: What to think about once your store is listed on the Teams store and AppSource.
ms.topic: conceptual
author: heath-hamilton
ms.author: surbhigupta
---
# Maintain your published Microsoft Teams app

Now that your app is listed on the Microsoft Teams store, it's time to start thinking about how you'll maintain the app going forward and also increase downloads and usage.

## Publish updates to your app

You can submit changes to your app in Partner Center. Updates must undergo a new review and validation process.

Ensure the following when publishing updates:

* Don't select **Add a new app** to do the update. Go to your app's page instead.
* Don't change your app ID.
* Increment your app's version number if you make any changes to the published version, including the app name or other metadata.

### App updates requiring user consent

When a user adds your app, they must give the app permission to access the services and information it requires to function. In most cases, users only have to do this once&#8212;new versions of your app install automatically.

If you make any of the following changes to your app, your existing users must accept another permission request:

* Add or remove a bot.
* Change the bot ID.
* Modify a bot's one-way notification configuration.
* Modify a bot's support for uploading and downloading files.
* Add or remove a messaging extension.
* Add a personal app tab.
* Add a channel and group tab.
* Add a connector.
* Modify configurations related to your Azure Active Directory (AD) app ID. For more information, see [`webApplicationInfo`](~/resources/schema/manifest-schema.md#webapplicationinfo).

## Create a download link for your app

When your app is listed in the Teams store, you can create a link that launches Teams and displays a dialog to add your app. You could include this link, for example, with a download button on your product's marketing page.

You can create the link with the following format that appends your app ID:

```
https://teams.microsoft.com/l/app/<appId>
```
