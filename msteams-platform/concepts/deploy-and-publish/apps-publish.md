---
title: Publish your app
description: Describes the process of publishing your app
keywords: teams publish store office publishing AppSource
---
# Publish your Microsoft Teams app

Once you've created your app you have three options for distributing it to your users. The simplest option is to [upload your app package](~/concepts/deploy-and-publish/apps-upload.md) directly for yourself or a team. If you want distribute your app more broadly, Teams provides an app catalog for users to find or discover high-quality Teams apps. To have your solution available in the catalog, you must either:

* Publish your app through AppSource
* Publish your app through the your organization's app catalog

## Publish to your organization app catalog

Your organization's app catalog contains apps unique to your organization and is completely under your organization's control. You can find more information in the article [Publish Apps to your organization's app catalog](/microsoftteams/tenant-apps-catalog-teams). This feature can only be managed by Teams users with Microsoft Office 365 tenant admin privileges.

## Publish to AppSource

> [!IMPORTANT]
> Registering as a developer can be a time-consuming process. It is best to start this process while you're still developing your app.

At a high level, the process for submitting your app to AppSource is:

* [Register as a Microsoft app developer](https://developer.microsoft.com/store/register).
* [Register as a developer in the Seller Dashboard](#register-in-the-seller-dashboard-to-submit-to-appsource).
* Validate your app by following our [app guidance](~/concepts/deploy-and-publish/office-store-approval.md) and [app package checklist](~/concepts/deploy-and-publish/office-store-checklist.md).
* Submit your app package, test notes, and app metadata to `teamsubm@microsoft.com`. See our our [app guidance](~/concepts/deploy-and-publish/office-store-approval.md) for details.
* Once the Microsoft Teams validation team approves you, use the Seller Dashboard to submit your Teams app package to AppSource.
* Monitor the Seller Dashboard to track [approval](~/concepts/deploy-and-publish/office-store-approval.md).

AppSource (formerly known as Office Store) provides a convenient location for you to distribute your Microsoft Teams app, as well as other Office 365 extensibility types such as Office add-ins and SharePoint add-ins. To include your solution in AppSource, you submit it to the Seller Dashboard. You need to create an individual or company account if you have not already done so for other Windows apps or Office extensibility types.

By developing and submitting a Microsoft Teams app, you are subject to the Bot Developer Framework [Terms of Use](https://aka.ms/bf-terms), [Privacy Policy](https://aka.ms/bf-privacy), and [Code of Conduct](https://aka.ms/bf-conduct) for bot, tab, and messaging extension functionality within your app. If your app contains Office 365 Connector functionality, separate terms may also apply as part of your Connector Registration on the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).

### Register as an app developer

If you have already registered in the Microsoft Store ecosystem, either by distributing a Universal Windows App (UWA) via the Windows Store or an Office or SharePoint add-in via AppSource, you should use this account to distribute your Microsoft Teams app. Otherwise, you must first [register as an app developer](https://developer.microsoft.com/store/register) to create your publisher identity in the Microsoft Store ecosystem. Account registration allows you to secure your company identity and triggers validation checks by the Microsoft Store team to ensure you are who you say you are.

Account management in the Microsoft Store ecosystem relies on a [Microsoft account](https://account.microsoft.com/account). This identity will be the main administrator/owner of your AppSource experience. For more information, please review [Opening a developer account](/windows/uwp/publish/opening-a-developer-account) and the [Developer program FAQ](https://developer.microsoft.com/store/register/faq).

#### Account suggestions

* Create a Microsoft account specifically for your developer/AppSource account. Keep this account and password confidential, and share it only with your release team.
* Use a Microsoft account, not an Azure AD account. Although you might have leveraged the Windows Store Azure Active Directory (Azure AD) support for Windows Store account management, the AppSource Seller Dashboard requires you to use a Microsoft account, not an Azure AD account.
* If you've developed with a trial developer Office 365 account, do not use this account for your AppSource identity. Create a separate Microsoft account instead.

### Register in the Seller Dashboard to submit to AppSource

A second approval process happens after you create your developer account: You need to create your identity in the [AppSource Seller Dashboard](https://sellerdashboard.microsoft.com/Application/Summary). Although the content here should be similar to the details of your developer account, this extra step ensures that AppSource has all the required information and that your identity in that storefront accurately reflects your business.

If you already submitted other product types to AppSource, this additional registration may not be necessary.

To start the process, choose the **Continue** button under **Office**.

![AppSource Seller Dashboard entry point](~/assets/images/submission/sellerdashboardofficeentry.png)

### Microsoft Teams app approval process

To ensure your app works well on Microsoft Teams, in addition to the core AppSource validation that occurs for all submitted apps, your app will go through a Teams-specific approval process. We provide [detailed guidance on this process](~/concepts/deploy-and-publish/office-store-approval.md). You must ensure your app follows our guidance. Multiple review/refactor/submit cycles can greatly delay getting your app into the store.

### Use the Seller Dashboard to submit to AppSource

> [!IMPORTANT]
> All information in the package manifest must match the metadata information you enter into the product listing.

After your app has completed the Microsoft Teams app approval process, you can submit your solution to the [Seller Dashboard](http://go.microsoft.com/fwlink/?LinkId=248605). Add an app of type "Teams App" to initiate the submission process. For Teams-specific guidance and a detailed walk through, see [Submitting your Microsoft Teams app in the Seller Dashboard](~/concepts/deploy-and-publish/office-store-guidance.md). For general information about the Seller Dashboard, see [Use the Seller Dashboard to submit your solution to AppSource](/office/dev/store/use-the-seller-dashboard-to-submit-to-the-office-store).

You need to upload a [submission package](~/concepts/build-and-test/apps-package.md) and provide the required metadata for the product listing page, including information such as app logo, description, and screenshots. Please review our [Submission and Manifest Metadata Checklist](~/concepts/deploy-and-publish/office-store-checklist.md) for more information.

## Add a download button to your product site

If your app is in the Microsoft Teams store, you can generate a link for your website that launches Teams and shows a consent and installation dialog for users to add the app.
The format is:  `https://teams.microsoft.com/l/app/<appId>` where appID is the GUID they declare in the submitted manifest.
Example: `https://teams.microsoft.com/l/app/49e6f432-d79c-49e8-94f7-89b94f3672fd` is the link to install Trello.

## Updating your app

When a user installs your application one of the first things they do is consent to give the app permission to access the services and information that the app needs to do its job. When you update your app, that can re-trigger this consent behavior, particularly if you have made one or more of the following changes:

* Adding a new capability to an app such as adding a bot to an tab only app.
* Changing the permissions array in the manifest.
* Increment your app version number in your manifest.
