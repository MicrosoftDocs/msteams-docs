---
title: Maintain and support your published app
description: Maintain your published Microsoft Teams app. Analyze app usage, publish updates, promote your app, check Teams Store marketing guidelines, and complete Microsoft 365 Certification.
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

When a user installs your app, they must give the app permission to access the services, and information the app requires to function. In most cases, users must do this once and the new version of your app is installed automatically.
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

## Promote your app on another site

When your app is listed in the Teams Store, create a link that launches Teams and displays a dialog to install your app. For example, you can include this link as a download button on your product's marketing page.

Create the link using the following URL appended with your app ID: `https://teams.microsoft.com/l/app/<your-app-id>`.

## Teams Store marketing guidelines for apps

Learn how to promote your apps and content in the Teams Store. These guidelines cover how to use the assets that are available to you, along with recommendations for promoting your apps.

### Store badges

We’ve created special promotional badges to help you drive more customers to your app's listing in the Teams Store. Keep in mind that there are certain requirements you need to follow when using these images; these requirements, along with usage examples and guidelines, are available in [**Teams Store Badge Guidelines (PDF, English)**](https://github.com/MicrosoftDocs/msteams-docs/blob/main/msteams-platform/assets/downloads/MicrosoftTeams-Store-Marketing-Guidelines.pdf).

### Badge generator and images

You can download the complete set of badge images (in PNG and PDF format) from the link below.

[Download](https://github.com/MicrosoftDocs/msteams-docs/blob/main/msteams-platform/assets/downloads/Microsoft-Teams-all-badges.zip) **All badge images**.

### License to Microsoft Marks

*Microsoft Marks* means the *Microsoft badge* described on the [badge generator](https://apps.microsoft.com/store/app-badge) page. To use these badges, you must:

* Have your app or other content available in the Teams Store, or be part of the [Microsoft Affiliate Program](https://www.microsoftaffiliates.com/).

* If you're registered as an app developer in Partner Center, comply with the [“License to Microsoft Marks”](/legal/windows/agreements/app-developer-agreement#license_to_mark) section of the App Developer Agreement.

* If you aren't registered as an app developer in Partner Center, Microsoft grants you a worldwide, nonexclusive, nontransferable, royalty-free license to use the badges solely as described in the Teams Store Badge Guidelines. Microsoft may change these guidelines, but if it does, Microsoft will use reasonable means to redirect you to any new URLs where these specifications are posted. Microsoft reserves all rights not expressly granted herein.

* Follow the logo usage specifications described in the [**Teams Store Badge Guidelines (PDF, English)**](https://github.com/MicrosoftDocs/msteams-docs/blob/doc-improvement-store-marketing-guidelines/msteams-platform/assets/downloads/MicrosoftTeams-Store-Marketing-Guidelines.pdf).

Microsoft is the sole owner of the Microsoft Marks and associated goodwill, and the sole beneficiary of the goodwill associated with your use of the Microsoft Marks. Microsoft may revoke this license at any time and at its sole discretion.

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

## Fix issues with your published app

Microsoft runs daily automation tests on apps listed on the Teams Store. If issues with your app are identified, Microsoft contacts you with a detailed report on how to reproduce the issues and then provide recommendations to resolve them. Your app listing might be removed from the Teams Store if you can't fix the problems within a stated timeline.

## Possible enforcement actions

Microsoft runs automated and manual continuous health checks for all the published apps. It's intended to maintain the health and user experience of the Microsoft commercial marketplace and the Teams Store. In certain situations, Microsoft might contact you and remove your app from the commercial marketplace and the Teams Store, temporarily halt new user acquisition for your app, or take further action on your app as deemed appropriate.

**Microsoft might contact you for a resolution when:**

* Microsoft is unable to run the continuous health evaluation tests on your app as the test credentials or test environment you provided have expired.

* Microsoft sees or is made aware of critical security vulnerabilities in your app, which might endanger your users or the Microsoft commercial marketplace.

* Microsoft is made aware of issues with your app by your users through any of Microsoft’s support channels. The issues include, but aren't limited to, spammy behavior, broken functionality, or unexpected user experience bugs and user interface bugs.

* Microsoft might unilaterally take cognizance of issues highlighted by users for your app with rating and reviews.

* Microsoft has identified commercial marketplace policy failures in your app as part of the continuous health evaluation of your app post publish.

If Microsoft doesn't receive a suitable response from you, it reaches out to you again, and might simultaneously remove your app to protect users. If Microsoft receives a response that your issues are resolved and you've submitted an updated app for review, Microsoft will re-list your app when the app passes review.

**Microsoft might remove your app without prior notice (other than to inform you of that action) when:**

* Microsoft receives a takedown notice for your app alleging copyright or trademark infringement.
* Your app isn't maintained or abandoned and unused.
* There's no response from you on Microsoft's reach outs.

## Discontinuing your published app

You must maintain your app's user experience as at the initial app review. If you don't maintain the app actively, or no longer wish to support the app, ensure that you discontinue your published app from your Partner Center account.

To discontinue your app:

* To remove your app from Microsoft AppSource, in your Microsoft Partner Center account, go the **Product Overview** page and select **Stop Selling**.

* Contact the Microsoft Teams App Health evaluation team at [apphealthevaluation@microsoft.com](mailto:apphealthevaluation@microsoft.com) or [teams-sas@microsoft.com](mailto:teams-sas@microsoft.com) to remove your app from the Teams Store.

* Contact your customers where appropriate. Delete or revoke any security or authorization tokens generated for your app.

## Ratings and review for Teams apps

Users can rate apps from one to five stars on Microsoft Teams Store and offer feedback (review) on their usage experiences. The ratings and reviews for apps appear on the app listing and the product details page in Teams Store. As a developer, you can interact and respond to these reviews from Partner Center, and the responses are shown on AppSource along with Teams experience, helping users find and use the app more easily. This feedback improves app visibility, keeps users engaged, and encourages more downloads on Teams Store.

:::image type="content" source="../../../../assets/images/submission/review.gif" alt-text="Graphics shows the user ratings and review for teams app.":::

> [!NOTE]
> Ratings and reviews aren't available for custom apps that are built for your organization.

## See also

[Monetize your app through Microsoft commercial marketplace](/office/dev/store/monetize-addins-through-microsoft-commercial-marketplace)
