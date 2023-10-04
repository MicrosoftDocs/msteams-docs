---
title: Maintain and support your published app
description: Maintain your published Microsoft Teams app. Analyze app usage, publish updates, promote your app, complete Microsoft 365 Certification.
ms.topic: conceptual
ms.localizationpriority: high
author: heath-hamilton
ms.author: surbhigupta
ms.date: 10/19/2022
---
# Maintain your published Microsoft Teams app

With your app listed on the Microsoft Teams Store, start thinking about how you'll maintain the app going forward and increase downloads and usage.

## Analyze app usage

You can track your app usage in the [Teams app usage report](/office/dev/store/teams-apps-usage) in Partner Center. Metrics include Monthly, Daily, and Weekly active users, and retention and intensity charts. The metrics help you to track churn and frequency of usage.

Data for newly published apps takes about a week to appear in the report.

## Publish updates to your app

Submit changes to your app (such as new features or metadata) in Partner Center. These changes require a new review process.

Ensure that you check the following when you're publishing updates:

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

Microsoft runs daily automation tests on apps listed on the Teams Store. If issues with your app are identified, we contact you with a detailed report on how to reproduce the issues and recommendations to resolve them. If you can't fix the problems within a stated timeline, your app listing may be removed from the store.

## Promote your app on another site

When your app is listed in the Teams Store, you can create a link that launches Teams and displays a dialog to install your app. You could include this link, for example, with a download button on your product's marketing page

Create the link using the following URL appended with your app ID: `https://teams.microsoft.com/l/app/<your-app-id>`.

## Complete Microsoft 365 Certification

[Microsoft 365 Certification](/microsoft-365-app-certification/docs/certification) offers assurances that data and privacy are adequately secured and protected when a third-party Microsoft 365 app or an add-in is installed in your Microsoft 365 ecosystem. The certification confirms that your app is compatible with Microsoft technologies, is compliant with cloud app security best practices, and is supported by Microsoft.

## Keep your app details updated

You can remove an app from the [Microsoft commercial marketplace](/azure/marketplace/overview) and the Microsoft Teams Store to prevent its discovery and use.

| App details | Description |
| --- | --- |
| Your app's listing must be kept updated. | Any changes to functionality, pricing, visual appearance, or any other updates must be accurately reflected in your app's listing.|
| You must regularly update your app to ensure that it remains compliant with the commercial marketplace policies.| Stay up to date with policy changes by subscribing to the changelog.|
| Your contact details must be kept up to date in your Partner Center account. |Microsoft will contact you occasionally to resolve any bugs or commercial marketplace policy violations in your app. If your contact details aren't updated, you might miss important notices or updates from Microsoft.|
| Maintain your app's functionality and user experience. | Your app's functionality and user experience must match or exceed the quality of experience at submission. You must maintain your app's performance.|

1. In **Partner Center**, on the **Product overview** page, select **Stop selling**. It removes the app from the Microsoft AppSource.
1. To initiate de-listing of the app from the Microsoft Teams Store, write to [apphealthevaluation](mailto:apphealthevaluation@microsoft.com).

After you stop the distribution of an app, you can still see it in Partner Center with a **Not available** status. If you decide to list the app again, follow the instructions to [Publish your app to the Microsoft Teams Store](../publish.md).

## Ratings and review for Teams apps

Users can rate and review apps on the Teams Store to share feedback on their experiences. Ratings range from one to five stars, and can be accompanied by an optional summary of the user's experience. These ratings and reviews are visible on the app's listing in the Teams Store and product details page. Developers can view and respond to these reviews via the Partner Center, and these responses are also displayed on AppSource along with the Teams experience. Such feedback enhances an app's discoverability, boosts user retention, and promotes downloads on the Teams Store.

> [!NOTE]
> Ratings and reviews aren't available for LOB apps.

:::image type="content" source="../../../../assets/images/submission/review.gif" alt-text="Screenshot shows the ratings and review of an app."

## See also

[Monetize your app through Microsoft commercial marketplace](/office/dev/store/monetize-addins-through-microsoft-commercial-marketplace)
