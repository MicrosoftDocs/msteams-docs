---
title: Publish Teams apps for Microsoft 365
description: Learn how to make your Microsoft 365-enabled Teams apps discoverable to users in Teams, Outlook, and Microsoft 365 app through single tenant and multitenant distribution.
ms.date: 10/10/2022
ms.author: mosdevdocs
ms.topic: conceptual
ms.custom: m365apps
ms.localizationpriority: medium
---
# Publish Teams apps for Microsoft 365

Microsoft Teams supports Microsoft 365-enabled Teams apps for production. You can distribute these apps to users who use the *Targeted Release* (dev preview) versions of Outlook.com and microsoft365.com (formerly office.com), the *Beta Channel* build of Outlook for Windows desktop, and Microsoft 365 Current Channel (dev preview) build of Microsoft 365 app for Android. Distribution options and processes for Microsoft 365-enabled Teams apps are the same as for traditional Teams apps.

After it's published, your app will be discoverable as an installable app from the Outlook and Microsoft 365 app stores, in addition to the Teams store. Your app uses the permissions defined in Teams across Outlook and Microsoft 365. Teams admins can [manage access to Teams apps across Microsoft 365](/microsoftteams/manage-third-party-teams-apps) for users in their organization.

:::image type="content" source="images/outlook-office-app-store.png" alt-text="The screenshot is an example that shows Outlook and microsoft365.com (formerly office.com) install screens for the SurveyMonkey and MURAL Teams apps.":::

## Single-tenant distribution

Outlook-enabled message extensions can be distributed to test and production tenants in several ways:

### Teams client

From the **Apps** menu, select **Manage your apps** > **Upload an app** > **Submit an app to your org**. To submit an app requires approval from your IT admin.

### Teams Developer Portal

Use the [Teams Developer Portal](https://dev.teams.microsoft.com/) to upload and publish an app for your organization. Uploading and publishing an app requires approval from your IT admin. For more information, see [manage your apps with the Developer Portal for Microsoft Teams](../concepts/build-and-test/teams-developer-portal.md).

### Microsoft Teams Admin Center

As a Teams admin, you can upload and pre-install the app package for your organization's tenant from [Teams admin center](https://admin.teams.microsoft.com/). For more information, see [upload your custom apps in the Microsoft Teams admin center](/microsoftteams/upload-custom-apps).

### Microsoft Admin Center

As a global admin, you can upload and pre-install the app package from [Microsoft admin](https://admin.microsoft.com/). For more information, see [test and deploy Microsoft 365 Apps by partners in the Integrated apps portal](/microsoft-365/admin/manage/test-and-deploy-microsoft-365-apps).

## Multitenant distribution

The [Microsoft commercial marketplace](https://appsource.microsoft.com/) (Microsoft AppSource) submission process for Teams apps enabled for Outlook and Microsoft 365 app is same as traditional Teams apps. The only difference is you'll need to use Teams app manifest [version 1.13](../tabs/how-to/using-teams-client-library.md) in your app package, which introduces support for Teams apps that run across Microsoft 365.

> [!TIP]
> Use Teams Developer Portal to [validate your app package](https://dev.teams.microsoft.com/validation) to resolve any errors or warnings before submitting it to the Teams store (via [Microsoft Partner Network](https://partner.microsoft.com/)).

To get started, see [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md).

## See also

* [Manage access to Teams app across Microsoft 365](/microsoftteams/manage-third-party-teams-apps)
* [Extend Teams apps across Microsoft 365](overview.md)
* [Tenancy in Azure Active Directory](/azure/active-directory/develop/single-and-multi-tenant-apps)
