---
title: Integrate existing third-party APIs
author: MuyangAmigo
description: Learn how toolkit allows bootstrap sample access to existing APIs and the list of different authentication types.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: Overview
ms.date: 05/20/2022
---

# Integrate existing third-party APIs

> [!IMPORTANT]
>
> We've introduced the Teams Toolkit v5 extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> [Teams Toolkit v4](toolkit-v4/teams-toolkit-fundamentals-v4.md) extension will soon be deprecated.

Teams Toolkit allows you to access and use existing APIs for building Teams apps. Your organization or a third-party might have developed these APIs. When you use Teams Toolkit to connect to an existing API, Teams Toolkit performs the following functions:

* Generate sample code in the `./bot` or `./api` folder.
* Add a reference to the `@microsoft/teamsfx` package to `package.json`.
* Add app settings for your API in  `.env.teamsfx.local` that configures local debugging.

Teams Toolkit allows you bootstrap sample code to access the APIs, if you don't have language appropriate SDKs to access these APIs.

## Add API connection using Teams Toolkit

Add a connection to an existing third-party API using the following steps:

1. Open your Teams app project in **Visual Studio Code**.
1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
1. Select **View How-to Guides** in the **DEVELOPMENT** section.

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Screenshot shows the selection of View How-to guides.":::

1. From the dropdown list that appears, select **Connect to an API**. You'll be redirected to the respective How-to Guide.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features_1.png" alt-text="Screenshot shows the selection of Connect to an API option in the View How-to Guides list.":::

      |**Development** | **How-to Guide** |
      |----------|----------|
      |Connect to an API | [How to integrate API Connection with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-API-Connection-with-your-Teams-app) |

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
