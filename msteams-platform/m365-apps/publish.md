---
title: Publish Teams apps for Microsoft 365
description: Learn how to make your Microsoft 365-enabled Teams apps discoverable to users in Teams, Outlook, and Microsoft 365 app through single tenant and multitenant distribution.
ms.date: 10/10/2022
ms.author: mosdevdocs
author: erikadoyle
ms.topic: conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Publish Teams apps for Microsoft 365

Microsoft Teams supports Microsoft 365 enabled Teams apps for production. You can distribute these apps to users who use the following clients:

* Web: *Current Channel* version of microsoft365.com (formerly office.com) and outlook.com.
* Desktop: *Current Channel* builds of Outlook and Microsoft 365 (Office) app for Windows desktop.
* Mobile: Production builds of Microsoft 365 app on iOS and Android.

Distribution options and processes for Microsoft 365-enabled Teams apps are the same as for traditional Teams apps.

After it's published, your app will be discoverable as an installable app from the Outlook and Microsoft 365 app stores, in addition to the Microsoft Teams Store. Your app uses the permissions defined in Teams across Outlook and Microsoft 365. Teams admins can [manage access to Teams apps across Microsoft 365](/microsoftteams/manage-third-party-teams-apps) for users in their organization.

:::image type="content" source="../assets/images/outlook-m365.png" alt-text="The screenshot is an example that shows Outlook and microsoft365.com (formerly office.com) install screens for the SurveyMonkey and MURAL Teams apps.":::

## Single-tenant distribution

Outlook-enabled message extensions can be distributed to test and production tenants in several ways:

### Teams client

From the **Apps** menu, select **Manage your apps** > **Upload an app** > **Submit an app to your org**. To submit an app requires approval from your IT admin.

### Teams Developer Portal

Use the [Teams Developer Portal](https://dev.teams.microsoft.com/) to upload and publish an app for your organization. Uploading and publishing an app requires approval from your IT admin. For more information, see [manage your apps with the Developer Portal for Microsoft Teams](../concepts/build-and-test/teams-developer-portal.md).

### Microsoft Teams Admin Center

Teams admin can upload and preinstall the app package for your organization's tenant from [Teams admin center](https://admin.teams.microsoft.com/). For more information, see [upload your custom apps in the Microsoft Teams admin center](/microsoftteams/upload-custom-apps).

### Microsoft Admin Center

Global admin can upload and preinstall the app package from [Microsoft admin](https://admin.microsoft.com/). For more information, see [test and deploy Microsoft 365 Apps by partners in the Integrated apps portal](/microsoft-365/admin/manage/test-and-deploy-microsoft-365-apps).

## Multitenant distribution

The [Microsoft commercial marketplace](https://appsource.microsoft.com/) (Microsoft AppSource) submission process for Teams apps enabled for Outlook and Microsoft 365 app is same as traditional Teams apps. The difference is you need to use app manifest (previously called Teams app manifest) [version 1.13](../tabs/how-to/using-teams-client-library.md) in your app package, which introduces support for Teams apps that run across Microsoft 365.

> [!TIP]
> Use Teams Developer Portal to [validate your app package](https://dev.teams.microsoft.com/validation) to resolve any errors or warnings before submitting it to the Teams Store (through [Microsoft Partner Network](https://partner.microsoft.com/)).

See the following video to learn more about multitenant apps:

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RWZb0O]

To get started, see [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md).

## See also

* [Manage access to Teams app across Microsoft 365](/microsoftteams/manage-third-party-teams-apps)
* [Extend Teams apps across Microsoft 365](overview.md)
* [Tenancy in Microsoft Entra ID](/azure/active-directory/develop/single-and-multi-tenant-apps)
