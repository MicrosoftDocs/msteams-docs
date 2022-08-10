---
title: Publish Teams apps for Microsoft 365
description: In this article, know how to make your Microsoft 365-enabled Teams apps discoverable to users in Teams, Outlook, and Office.
ms.date: 05/24/2022
ms.topic: conceptual
ms.custom: m365apps
ms.localizationpriority: medium
---
# Publish Teams apps for Microsoft 365

Microsoft 365-enabled Teams apps are supported for production use in Microsoft Teams. You can distribute these apps to preview audiences who use the *Targeted Release* versions of outlook.com and office.com, and the *Beta Channel* build of Outlook for Windows desktop. Distribution options and processes for Microsoft 365-enabled Teams apps are the same as for traditional Teams apps.

After it's published, your app will be discoverable as an installable app from the Outlook and Office app stores, in addition to the Teams store. Your app uses the permissions defined in Teams across Outlook and Office. Teams admins can [manage access to Teams apps across Microsoft 365](/MicrosoftTeams/manage-third-party-teams-apps) for users in their organization.

:::image type="content" source="images/outlook-office-app-store.png" alt-text="The screenshot is an example that shows Outlook and Office.com install screens for the SurveyMonkey and MURAL Teams apps.":::

## Single-tenant distribution

Outlook-enabled message extensions can be distributed to test and production tenants in several ways:

### Teams client

From the **Apps** menu, select **Manage your apps** > **Publish an app** > **Submit an app to your org**. This requires approval from your IT admin.

### Teams Developer Portal

Use the [Teams Developer Portal](https://dev.teams.microsoft.com/) to upload and publish an app to your organization. This requires approval from your IT admin. For more information, see [Manage your apps with the Developer Portal for Microsoft Teams](../concepts/build-and-test/teams-developer-portal.md).

### Microsoft Teams Admin Center

As a Teams admin, you can upload and pre-install the app package for your organization's tenant from [Teams admin center](https://admin.teams.microsoft.com/). For more information, see [Upload your custom apps in the Microsoft Teams admin center](/MicrosoftTeams/upload-custom-apps).

### Microsoft Admin Center

As a global admin, you can upload and pre-install the app package from [Microsoft admin](https://admin.microsoft.com/). For more information, see [Test and deploy Microsoft 365 Apps by partners in the Integrated apps portal](/microsoft-365/admin/manage/test-and-deploy-microsoft-365-apps).

## Multitenant distribution

The [Microsoft AppSource](https://appsource.microsoft.com/) (Microsoft commercial marketplace) submission process for Teams apps enabled for Outlook and Office is same as traditional Teams apps. The only difference is you'll need to use Teams app manifest [version 1.13](../tabs/how-to/using-teams-client-sdk.md) in your app package, which introduces support for Teams apps that run across Microsoft 365.

> [!TIP]
> Use Teams Developer Portal to [validate your app package](https://dev.teams.microsoft.com/validation) to resolve any errors or warnings before submitting to the Teams store (via [Microsoft Partner Network](https://partner.microsoft.com/)).

To get started, see [Distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md).
