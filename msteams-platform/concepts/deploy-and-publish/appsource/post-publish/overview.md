---
title: Maintain and support your published app
description: In this module, learn to maintain your published Microsoft Teams app and what to think about once your store is listed on the Teams store and AppSource.
ms.topic: conceptual
ms.localizationpriority: high
author: heath-hamilton
ms.author: surbhigupta
---
# Maintain your published Microsoft Teams app

With your app listed on the Microsoft Teams store, start thinking about how you'll maintain the app going forward and increase downloads and usage.

## Analyze app usage

You can track your app usage in the [Teams app usage report](/office/dev/store/teams-apps-usage) in Partner Center. Metrics include Monthly, Daily, and Weekly active users, and retention and intensity charts enabling you to track churn and frequency of usage.

Data for newly published apps takes about a week to appear in the report.

## Publish updates to your app

> [!NOTE]
> Teams store has evolved:
>
> Previously, the links were copied by selecting ellipses on the app tile. With the updated Teams store experience, you will access the same from the details tab of the apps. This update will be generally available (GA) by March 01, 2022.

You can submit changes to your app (such as new features or even metadata) in Partner Center. These changes require a new review process.

Ensure the following when publishing updates:

* Don't change your app ID.
* Increment your app's version number.
* In Partner Center, don't select **Add a new app** to do the update. Go to your app's page instead.

### App updates requiring user consent

When a user installs your app, they must give the app permission to access the services and information the app requires to function. In most cases, users must do this once and new version of your app install automatically.
If you make any of the following changes to your app, however, your existing users must accept another permission request to install the update:

* Add or remove a bot.
* Change the bot ID.
* Modify a bot's one-way notification configuration.
* Modify a bot's support for uploading and downloading files.
* Add or remove a message extension.
* Add a personal tab.
* Add a channel and group tab.
* Add a connector.
* Modify configurations related to your Microsoft Azure Active Directory (Azure AD) app registration. For more information, see [`webApplicationInfo`](~/resources/schema/manifest-schema.md#webapplicationinfo).

## Fix issues with your published app

Microsoft runs daily automation tests on apps listed on the Teams store. If issues with your app are identified, we contact you with a detailed report on how to reproduce the issues and recommendations to resolve them. If you can't fix the problems within a stated timeline, your app listing may be removed from the store.

## Promote your app on another site

When your app is listed in the Teams store, you can create a link that launches Teams and displays a dialog to install your app. You could include this link, for example, with a download button on your product's marketing page.

Create the link using the following URL appended with your app ID: `https://teams.microsoft.com/l/app/<your-app-id>`.

## Complete Microsoft 365 Certification

[Microsoft 365 Certification](/microsoft-365-app-certification/docs/certification) offers assurances that data and privacy are adequately secured and protected when a third-party Office app or add-in is installed in your Microsoft 365 ecosystem. Certification confirms that your app is compatible with Microsoft technologies, compliant with cloud app security best practices, and supported by Microsoft.

## See also

[Monetize your app through Microsoft Commercial Marketplace](/office/dev/store/monetize-addins-through-microsoft-commercial-marketplace)
