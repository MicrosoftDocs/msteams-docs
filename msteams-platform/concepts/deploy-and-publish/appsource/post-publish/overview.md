---
title: Maintain and support your published app
description: Maintain your published Microsoft Teams app. Analyze app usage, publish updates, promote your app, complete Microsoft 365 Certification.
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

You can submit changes to your app (such as new features or even metadata) in Partner Center. These changes require a new review process.

Ensure to check the following when you're publishing updates:

* Don't change your app ID.
* Increment your app's version number.
* In Partner Center, don't select **Add a new app** to do the update. Go to your app's page instead.

### App updates requiring user consent

When a user installs your app, they must give the app permission to access the services, and information the app requires to function. In most cases, users must do this once and new version of your app install automatically.
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


## Teams App Store marketing guidelines for apps

Learn how to promote your apps and content in the Teams App Store. These guidelines cover how to use the assets that are available to you, along with recommendations for promoting your apps.

### Store badges

We’ve created special promotional badges to help you drive more customers to your app's listing in the Teams App Store. Keep in mind that there are certain requirements you need to follow when using these images; these requirements, along with usage examples and guidelines, are available in a PDF file.

[![Download button](images/downloadbutton.png)](https://download.microsoft.com/download/0/7/D/07DF43D4-B1A8-4D38-BC02-4903BB36CEE8/Microsoft_Store_Badge_Guidelines.pdf) **Teams App Store Badge Guidelines (PDF, English)**


### Badge generator and images

You can use our [badge generator](https://apps.microsoft.com/store/app-badge) to generate HTML that displays the Store badge (in the language of your choice) and links directly to your app's Store listing.

You can also download the complete set of badge images (in PNG and PDF format) from the link below.

[![Download button](images/downloadbutton.png)](https://download.microsoft.com/download/6/6/6/66641831-E662-4898-BB21-75D6C193A8F9/All%20Badges.zip) **All badge images**


### License to Microsoft Marks

*Microsoft Marks* means the *Microsoft badge* described on the [badge generator](https://apps.microsoft.com/store/app-badge) page. To use these badges, you must:

-   Have your app or other content available in the Microsoft Store, or be part of the [Microsoft Affiliate Program](https://www.microsoftaffiliates.com/).

-   If you are registered as an app developer in Partner Center, comply with the [“License to Microsoft Marks”](/legal/windows/agreements/app-developer-agreement#license_to_mark) section of the App Developer Agreement.

-   If you are not registered as an app developer in Partner Center, Microsoft grants you a worldwide, nonexclusive, nontransferable, royalty-free license to use the badges solely as described in the Microsoft Store Badge Guidelines. Microsoft may change these guidelines, but if it does, Microsoft will use reasonable means to redirect you to any new URLs where these specifications are posted. Microsoft reserves all rights not expressly granted herein.

-   Follow the logo usage specifications described in the [Teams App Store Badge Guidelines](https://download.microsoft.com/download/0/7/D/07DF43D4-B1A8-4D38-BC02-4903BB36CEE8/Microsoft_Store_Badge_Guidelines.pdf).

Microsoft is the sole owner of the Microsoft Marks and associated goodwill, and the sole beneficiary of the goodwill associated with your use of the Microsoft Marks. Microsoft may revoke this license at any time and at its sole discretion.

## Complete Microsoft 365 Certification

[Microsoft 365 Certification](/microsoft-365-app-certification/docs/certification) offers assurances that data and privacy are adequately secured and protected when a third-party Microsoft 365 app or an add-in is installed in your Microsoft 365 ecosystem. The certification confirms that your app is compatible with Microsoft technologies, is compliant with cloud app security best practices, and is supported by Microsoft.

## Stop app distribution

You can remove an app from the [Microsoft commercial marketplace](/azure/marketplace/overview) to prevent its discovery and use.

To stop distribution of an app after you've published, follow the steps:

1. On the **Product overview** page, select **Stop selling**. It removes the app from the Microsoft AppSource.
1. To initiate de-listing of the app, on **Partner Center**, select the **Overview** page, and then select **Stop selling**.

After you stop the distribution of an app, you can still see it in Partner Center with a **Not available** status. If you decide to list the app again, follow the instructions to [Publish your app to the Microsoft Teams store](../publish.md).

## See also

[Monetize your app through Microsoft Commercial Marketplace](/office/dev/store/monetize-addins-through-microsoft-commercial-marketplace)
