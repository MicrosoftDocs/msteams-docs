---
title: Overview - Distribute your app
description: Learn to distribute, publish your app to Microsoft Teams store or to your org. Understand how app's endpoints must comply with your Government Community Cloud(GCC) organization's requirements.
ms.topic: conceptual
author: v-rpatkur
ms.author: surbhigupta
ms.localizationpriority: high
---

# Distribute your Microsoft Teams app

You can provide your Microsoft Teams app to an individual, team, organization, or anyone who wants to use it. How you distribute depends on several factors including users' needs, business, technical requirements, and your goals for the app.

## Configure default install options

You can configure default install options. For example, if your app's primary capability is a bot, you can make the bot the default capability when a user installs your app to a team.

## Create Teams app package

To distribute your Teams app, you must have a valid app package.  An app package is a zip file that contains an **app manifest** and **app icons**.

## Upload your app in Teams

Sideload an app for personal use, collaborating with your team, or testing and debugging. This kind of distribution doesn't require a formal review process.

> [!IMPORTANT]
> Currently, sideloading apps are available in Government Community Cloud (GCC), but are not available for GCC-High and Department of Defense (DOD).

For more information, see [upload your app in Teams](apps-upload.md).

## Publish to your org

Make your app available to people in your org. This kind of distribution requires your Teams admin's approval.

For more information, see [manage your apps in the Teams admin center](/microsoftteams/manage-apps?toc=%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2FMicrosoftTeams%2Fbreadcrumb%2Ftoc.json).

### Government Community Cloud (GCC) organizations

In GCC Teams environments, compliant Microsoft apps are enabled by default. Before publishing an app, however, make sure that all the app's endpoints comply with your GCC organization's requirements. For more information, see [Government Community Cloud](../app-fundamentals-overview.md#government-community-cloud).

> [!IMPORTANT]
>If your app includes a bot or message extension, you must select the **Microsoft Teams for Government** option when setting up a channel between your bot and Teams in Azure. For more information, see [connect a bot to channels](/azure/bot-service/bot-service-manage-channels?view=azure-bot-service-4.0&preserve-view=true).

## Publish your app to the Teams store

Make your app available to everyone. This kind of distribution requires Microsoft approval.

For more information, see [publish to the Teams store](~/concepts/deploy-and-publish/appsource/publish.md).

## Next step

> [!div class="nextstepaction"]
> [Configure app's default install options](~/concepts/deploy-and-publish/add-default-install-scope.md)

## See also

* [Microsoft 365 App Compliance Program](/microsoft-365-app-certification/overview)
* [Create Teams app package](../build-and-test/apps-package.md)
* [Publish to org](/microsoftteams/upload-custom-apps)
* [Modify your app's registration in the Azure portal](/azure/active-directory/develop/howto-modify-supported-accounts)
