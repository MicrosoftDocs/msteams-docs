---
title: Maintain and support your published app
description: What to think about once your store is listed on the Teams store and AppSource.
ms.topic: conceptual
author: heath-hamilton
ms.author: surbhigupta
---
# Maintain your published Microsoft Teams app

With your app listed on the Microsoft Teams store, start thinking about how you'll maintain the app going forward and increase downloads and usage.

## Publish updates to your app

You can submit changes to your app (such as new features or even metadata) in Partner Center. These changes requires a new review process.

Ensure the following when publishing updates:

* Don't change your app ID.
* Increment your app's version number.
* In Partner Center, don't select **Add a new app** to do the update. Go to your app's page instead.

### App updates requiring user consent

When a user installs your app, they must give the app permission to access the services and information the app requires to function. In most cases, users only have to do this once and new versions of your app install automatically.

If you make any of the following changes to your app, however, your existing users must accept another permission request to install the update:

* Add or remove a bot.
* Change the bot ID.
* Modify a bot's one-way notification configuration.
* Modify a bot's support for uploading and downloading files.
* Add or remove a messaging extension.
* Add a personal tab.
* Add a channel and group tab.
* Add a connector.
* Modify configurations related to your Azure Active Directory (Azure AD) app registration. For more information, see [`webApplicationInfo`](~/resources/schema/manifest-schema.md#webapplicationinfo).

## Create a download link for your app

When your app is listed in the Teams store, you can create a link that launches Teams and displays a dialog to install your app. You could include this link, for example, with a download button on your product's marketing page.

Create the link using the following URL appended with your app ID: `https://teams.microsoft.com/l/app/<your-app-id>`.

## See also

* [Monetize your app through Microsoft Commercial Marketplace](/office/dev/store/monetize-addins-through-microsoft-commercial-marketplace)
