---
title: Publish your app to AppSource
description: Describes the process of publishing your app to AppSource (formerly Office Store)
keywords: teams publish store office publishing AppSource
ms.date: 03/15/2018
---
# Publish your Microsoft Teams app to AppSource

> [!IMPORTANT]
> **Your Microsoft Teams app *must* use the [latest schema](~/resources/schema/manifest-schema) and follow [current packaging guidelines](~/concepts/apps/apps-package).**
>
> [!NOTE]
> Teams provides an in-app gallery for users to find or discover [high-quality Teams apps](~/resources/design/overview). To have your solution available in this gallery, you must publish your solution through AppSource.

AppSource (formerly known as Office Store) provides a convenient location for you to distribute your Microsoft Teams app, as well as other Office 365 extensibility types such as Office add-ins and SharePoint add-ins. To include your solution in AppSource, you submit it to the Seller Dashboard. You need to create an individual or company account if you have not already done so for other Windows apps or Office extensibility types.

> [!NOTE]
> By developing and submitting a Microsoft Teams app, you are subject to the Bot Developer Framework [Terms of Use](https://aka.ms/bf-terms), [Privacy Policy](https://aka.ms/bf-privacy), and [Code of Conduct](https://aka.ms/bf-conduct) for bot, tab, and messaging extension functionality within your app. If your app contains Office 365 Connector functionality, separate terms may also apply as part of your Connector Registration on the [Connectors Developer Dashboard](https://aka.ms/publishconnector).

## Register as an app developer

If you have already registered in the Microsoft Store ecosystem, either by distributing a Universal Windows App (UWA) via the Windows Store or an Office or SharePoint add-in via AppSource, you should use this account to distribute your Microsoft Teams app. Otherwise, you must first [register as an app developer](https://developer.microsoft.com/en-us/store/register) to create your publisher identity in the Microsoft Store ecosystem. Account registration allows you to secure your company identity and triggers validation checks by the Microsoft Store team to ensure you are who you say you are.

Account management in the Microsoft Store ecosystem relies on a [Microsoft account](https://account.microsoft.com/account). This identity will be the main administrator/owner of your AppSource experience. For more information, please review [Opening a developer account](https://docs.microsoft.com/en-us/windows/uwp/publish/opening-a-developer-account) and the [Developer program FAQ](https://developer.microsoft.com/en-us/store/register/faq).

> [!TIP]
> We recommend you create a Microsoft account specifically for your developer/AppSource account. Keep this account and password confidential, and share it only with your release team.
>
> [!NOTE]
> Although you might have leveraged the Windows Store Azure Active Directory (Azure AD) support for Windows Store account management, the AppSource Seller Dashboard requires you to use a Microsoft account, not an Azure AD account.
>
> [!IMPORTANT]
> **If you've developed with a trial developer Office 365 account, do not use this account for your AppSource identity.** Create a separate Microsoft account instead.

## Register in the Seller Dashboard to submit to AppSource

A second approval process happens after you create your developer account: You need to create your identity in the AppSource Seller Dashboard. Although the content here should be similar to the details of your developer account, this extra step ensures that AppSource has all the required information and that your identity in that storefront accurately reflects your business.

If you already submitted other product types to AppSource, this additional registration may not be necessary.

To start the process, choose the **Continue** button under **Office**.

![AppSource Seller Dashboard entry point](~/assets/images/submission/sellerdashboardofficeentry.png)

## Use the Seller Dashboard to submit to AppSource

After your account is approved, you can submit your solution to the [Seller Dashboard](http://go.microsoft.com/fwlink/?LinkId=248605).  Add an app of type "Teams App" to initiate the submission process.

![AppSource Seller Dashboard add an app](~/assets/images/submission/sellerdashboardaddapp.png)

You need to upload a [submission package](~/concepts/apps/apps-package) and provide the required metadata for the product listing page, including information such as app logo, description, and screenshots. Please review our [Submission and Manifest Metadata Checklist](~/publishing/office-store-checklist) for more information.

> [!IMPORTANT]
> All information in the package manifest must match the metadata information you enter into the product listing.

For general information about the Seller Dashboard, see [Use the Seller Dashboard to submit your solution to AppSource](https://dev.office.com/officestore/docs/use-the-seller-dashboard-to-submit-to-the-office-store). For Teams-specific help, see [Submitting your Microsoft Teams app in the Seller Dashboard](~/publishing/office-store-guidance).

## Microsoft Teams app approval process

Teams app approval is a free service provided by AppSource that verifies that your app works as described, contains all appropriate metadata, and provides content that would be valuable to an end user.

For your Teams app to be approved:

* It must not contain inadmissible or offensive material.
* It must be stable and functional.
* Any material that you associate with your experience, such as descriptions and support documentation, must be accurate. Use correct spelling, capitalization, punctuation, and grammar in your descriptions and materials.
* It must pass all current [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies) for Teams tabs and bots. Please note that these policies are subject to change.
* For tabs, it must provide value to users outside of what is possible by simply pinning your website in Teams. This means that, at minimum, it must remove extraneous chrome and disallow navigating outside the configured context. See the [Microsoft Teams Design Guidelines](https://aka.ms/microsoftteamsdesignguidelines) for more guidance.

When the validation process is complete, you will receive a message to let you know that either your Teams experience is approved or it fails one of the stated policies.  You can also follow these steps to check the approval status in the Seller Dashboard:

1. Sign in to the Seller Dashboard.
2. On the **manage** tab, your submission status appears under the submission name.
   * If the status is **pending approval**, your submission is still being verified. When it is in this state, you can't update or resubmit it.
   * If the status is **changes requested**, your submission needs changes before approval. Select your submission; on the summary page, choose **View the add-in report** for details about the required changes.
   * If the status is **approved**, your submission will be listed in the appropriate marketplaces, typically within 24 hours.

Failures are explained, with references to the specific policy violations. All failures must be addressed before resubmission. Be sure to resubmit your app using the tile on the Overview tab. Do not use the *Add a new app* button.

> [!NOTE]
> If you make changes to an approved Teams experience—specifically, changes to core functionality or the manifest—it must go through the approval process again. For all other changes to your service, such as addressing issues or adding new features, resubmission is not required.

## Tips for rapid approval

* Don't use "Teams" or "Microsoft" in your app name; in all contexts, that extra clarification is superfluous.
* If your product requires an account on your service or another service, list that in the description.
* If your product requires additional purchases to function properly, list that in the description.
* For your Tab configuration page, be sure to provide "About" links and proper guidance—this page is the first thing the user sees, so ensure that a new user understands what to do.
* Be sure that your bot provides appropriate responses when mentioned (@*botname*) in a channel and in 1:1 conversations as needed. If your bot does not provide meaningful context within the personal or teams scope, disable that scope via the manifest. (See the `bots` block in the [Microsoft Teams manifest schema reference](~/resources/schema/manifest-schema#bots).)
* Provide the requisite Terms and Privacy policy links in the manifest and the Seller Dashboard, and verify that they properly resolve to the correct documentation. For bots, you must provide this same information in the Submission section of the Bot Framework registration page.
* Ensure that metadata in the manifest roughly matches metadata in the Seller Dashboard (and, for bots, in the Bot Framework registration). Note that your Seller Dashboard entry should contain a more detailed and formatted description for use in the AppSource product page.
* Check your manifest for completeness and accuracy. Then check it again.
* Be sure to include detailed testing notes and a valid, working test account with appropriate prepopulated data.
* Do not use the *Add a new app* button to resubmit your app.  Use the tile for your app on the Overview tab instead.

## Add a download button to your product site

If your app is in the Microsoft Teams store, you can generate a button for your website that launches the Teams experience and shows a selection dialog for the user to add the app.
The format is:  `https://teams.microsoft.com/l/app/<appId>` where appID is the GUID they declare in the submitted manifest.
Example: `https://teams.microsoft.com/l/app/56E1A16C-DDB4-46C0-B4B1-FC634ED86DDD`