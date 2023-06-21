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

Submit changes to your app (such as new features or even metadata) in Partner Center. These changes require a new review process.

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

## Promote your app on another site

When your app is listed in the Teams store, create a link that launches Teams and displays a dialog to install your app. You could include this link, for example, with a download button on your product's marketing page.

Create the link using the following URL appended with your app ID: `https://teams.microsoft.com/l/app/<your-app-id>`.

## Complete Microsoft 365 Certification

[Microsoft 365 Certification](/microsoft-365-app-certification/docs/certification) offers assurances that data and privacy are adequately secured and protected when a third-party Microsoft 365 app or an add-in is installed in your Microsoft 365 ecosystem. The certification confirms that your app is compatible with Microsoft technologies, is compliant with cloud app security best practices, and is supported by Microsoft.

## Keep your app details updated

## Fix issues with your published app

Microsoft runs daily automation tests on apps listed on the Teams store. If issues with your app are identified, Microsoft contacts you with a detailed report on how to reproduce the issues and recommendations to resolve them. If you can't fix the problems within a stated timeline, your app listing may be removed from the store.

## Possible enforcement actions

Microsoft runs automated and manual continuous health checks for all the published apps. It's intended to maintain the health and end user experience of the Microsoft Commercial Marketplace and the Teams App store. In certain situations, Microsoft may contact you and remove your app from the commercial marketplace and the Teams App store, or temporarily halt new user acquisition for your app, or take further action on your app as deemed appropriate.

**Microsoft may contact you for a resolution when:**

* Microsoft is unable to run the continuous health evaluation tests on your app as the test credentials or test environment you provided is expired.

* Microsoft sees or is made aware of critical security vulnerabilities in your app. These may endanger your users or the Microsoft Commercial Marketplace.

* Microsoft is made aware of issues with your app by your users through any of Microsoft’s support channels. These issues include, but aren't limited to, spammy behavior, broken functionality, or unexpected user experience bugs and user interface bugs.

* Microsoft may also unilaterally take cognizance of issues with your app. Users may have highlighted these issues by means of rating and reviews for your app.

* Microsoft has identified commercial marketplace policy failures in your app as part of the continuous health evaluation of your app post publish.

If Microsoft doesn't receive a suitable response from you, it'll reach out to you again, and may simultaneously remove your app to protect end users. If it hears back from you, and you confirm that issues are resolved and you've submitted an updated app for review, Microsoft will re-list your app when the app passes review.

**Microsoft may remove your app without prior notice (other than to inform you of that action) when:**

* Microsoft receives a takedown notice for your app alleging copyright or trademark infringement.
* Your app appears to be unmaintained or abandoned and unused, and there's no response from you on Microsoft's reach outs.

## Discontinuing your published app

You must maintain your app's user experience as at the initial app review. If you don't maintain the app actively, or no longer wish to support the app, ensure that you discontinue your published app from your Partner Center account.

To discontinue your app:

* Remove it from Microsoft AppSource. On the **Product Overview** page in your Microsoft Partner Center account, select **Stop Selling**.

* Contact the Microsoft Teams App Health evaluation team at [apphealthevaluation@microsoft.com](mailto:apphealthevaluation@microsoft.com) or [teams-sas@microsoft.com](mailto:teams-sas@microsoft.com) to remove your app from the Microsoft Teams app store.

* Contact your customers where appropriate. Delete or revoke any security or authorization tokens generated for your app.

## See also

[Monetize your app through Microsoft Commercial Marketplace](/office/dev/store/monetize-addins-through-microsoft-commercial-marketplace)
