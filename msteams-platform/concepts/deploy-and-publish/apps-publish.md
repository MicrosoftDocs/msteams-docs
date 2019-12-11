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

* [Register as a Microsoft app developer](/office/dev/store/open-a-developer-account).
* Follow our guidance to [Submit your app to AppSource](~/concepts/deploy-and-publish/appsource/publish.md)
* Upload your package to App Source through [Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource) and monitor your Partner Center dashboard to track approval. 

AppSource (formerly known as Office Store) provides a convenient location for you to distribute your Microsoft Teams app, as well as other Office 365 extensibility types such as Office add-ins and SharePoint add-ins. To include your solution in AppSource, you submit it through Partner Center. You need to create an individual or company account if you have not already done so for other Windows apps or Office extensibility types.

By developing and submitting a Microsoft Teams app, you are subject to the Bot Developer Framework [Terms of Use](https://aka.ms/bf-terms), [Privacy Policy](https://aka.ms/bf-privacy), and [Code of Conduct](https://aka.ms/bf-conduct) for bot, tab, and messaging extension functionality within your app. If your app contains Office 365 Connector functionality, separate terms may also apply as part of your Connector Registration on the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).

### Register as an app developer

If you have already registered in the Microsoft Store ecosystem, either by distributing a Universal Windows App (UWA) via the Windows Store or an Office or SharePoint add-in via AppSource, you should use this account to distribute your Microsoft Teams app. Otherwise, you must first [register as an app developer](https://developer.microsoft.com/store/register) to create your publisher identity in the Microsoft Store ecosystem. Account registration allows you to secure your company identity and triggers validation checks by the Microsoft Store team to ensure you are who you say you are.

Account management in the Microsoft Store ecosystem relies on a [Microsoft account](https://account.microsoft.com/account). This identity will be the main administrator/owner of your AppSource experience. For more information, please review [Opening a developer account](/windows/uwp/publish/opening-a-developer-account) and the [Developer program FAQ](https://developer.microsoft.com/store/register/faq).

#### Account suggestions

* Create a Microsoft account specifically for your developer/AppSource account. Keep this account and password confidential, and share it only with your release team.
* Use a Microsoft account, not an Azure AD account. Although you might have leveraged the Windows Store Azure Active Directory (Azure AD) support for Windows Store account management, Partner Center requires you to use a Microsoft account, not an Azure AD account.
* If you've developed with a trial developer Office 365 account, do not use this account for your AppSource identity. Create a separate Microsoft account instead.

### Microsoft Teams app approval process

To ensure your app works well on Microsoft Teams, in addition to the core AppSource validation that occurs for all submitted apps, your app will go through a Teams-specific approval process. We provide [detailed guidance on this process](~/concepts/deploy-and-publish/office-store-approval.md). You must ensure your app follows our guidance. Multiple review/refactor/submit cycles can greatly delay getting your app into the store.

### Use Partner Center to submit to AppSource

> [!IMPORTANT]
> All information in the package manifest must match the metadata information you enter into the product listing.

After you've validated your app against our [approval guidance](~/concepts/deploy-and-publish/office-store-approval.md), you can submit your solution through [Partner Center](/dev/store/use-partner-center-to-submit-to-appsource).

You'll need to upload a [submission package](~/concepts/build-and-test/apps-package.md) and provide the required metadata for the product listing page, including information such as app logo, description, and screenshots. Please review our [Submission and Manifest Metadata Checklist](~/concepts/deploy-and-publish/appsource/prepare/office-store-checklist.md) for more information about your submission package.

## Add a download button to your product site

If your app is in the Microsoft Teams store, you can generate a link for your website that launches Teams and shows a consent and installation dialog for users to add the app.
The format is:  `https://teams.microsoft.com/l/app/<appId>` where appID is the GUID they declare in the submitted manifest.
Example: `https://teams.microsoft.com/l/app/49e6f432-d79c-49e8-94f7-89b94f3672fd` is the link to install Trello.

## Updating your app

When a user installs your application one of the first things they do is consent to give the app permission to access the services and information that the app needs to do its job. When you update your app, that can re-trigger this consent behavior, particularly if you have made one or more of the following changes:

* Adding a new capability to an app such as adding a bot to an tab only app.
* Changing the permissions array in the manifest.
* Increment your app version number in your manifest.

## Next Steps
* [Publish Apps to your organization's app catalog](/microsoftteams/tenant-apps-catalog-teams).
* [Submit your app to AppSource](~/concepts/deploy-and-publish/appsource/publish.md)
