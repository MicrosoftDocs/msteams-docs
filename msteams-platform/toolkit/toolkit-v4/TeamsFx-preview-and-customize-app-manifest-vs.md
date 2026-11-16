---
title: Customize App Manifest in Agents Toolkit
description: Learn how to customize and preview the app manifest for different environments in Agents Toolkit for Visual Studio, and sync local changes in Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
---

# Customize app manifest for Microsoft Visual Studio

The app manifest (previously called Teams app manifest) describes how your app integrates into Microsoft Teams and is shared between local and remote environments. The default app manifest file is available at the `appPackage/manifest.json` file and the environment variables available from the `env/.env.{env}` file.

The app manifest file contains some environment variables with the `${{XX_XX}}` format. You can define your own environment variables and add placeholders in the `manifest.json` file. The following are the .env and .json file examples:

```env
TEAMS_APP_DESCRIPTION=This is an amazing app
```

```json
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
    "manifestVersion": "1.16",
    "description": {
        "short": "${{TEAMS_APP_DESCRIPTION}}",
        "full": "Full description of tab0418"
    },
}
```

## Preview app manifest file

You can preview the app manifest file either **For Local** or **For Azure**. To preview the app manifest file, follow these steps:

1. Select **Project** > **Microsoft 365 Agents Toolkit**.

1. Select **Select Microsoft 365 Account** or **Provision in the Cloud...** to generate environment variables for local or remote Teams app.

    :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/provision-in-the-cloud.png" alt-text="Screenshot shows the app trigger in local or remote.":::

1. Upload the **Zip App Package** in the following ways:

    1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Zip App Package** and then select either **For Local** or **For Azure**

        :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/zip-app-package.png" alt-text="Screenshot shows the zip app package for local or Azure.":::

    1. From **Solution Explorer**, right-click on **M365Agent** (in this scenario the project name is M365Agent). Go to **Microsoft 365 Agents Toolkit** > **Zip App Package** and then select either **For Local** or **For Azure**.

        :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/solution-zip.png" alt-text="Screenshot shows the solution zip app package for local or Azure.":::

     Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) generates the zip app package.

1. Under `appPackage` folder, right-click on the `manifest.json` file.

1. Select **Preview Manifest File**.

1. Select either **For Local** or **For Azure**.

    :::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/preview-manifest.png" alt-text="Screenshot shows the preview of app manifest.":::

You can preview app manifest file under `appPackage/build` in Visual Studio.

### Sync local changes to Developer Portal

After you've previewed the app manifest file in Visual Studio, you can sync the local changes to Developer Portal. To sync changes to Developer Portal follow these steps:

1. Select **Project**.
1. Select **Microsoft 365 Agents Toolkit**.
1. Select **Update Manifest in Developer Portal**.

:::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/update-teams-app.png" alt-text="Screenshot shows update app manifest in teams developer portal.":::

You can also sync the local changes to Developer Portal from **Solution Explorer**:

1. Right-click on **MyTeamsApp14**.
1. Select **Microsoft 365 Agents Toolkit**.
1. Select **Update Manifest in Developer Portal**

:::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/solution-update-teams-app.png" alt-text="Screenshot shows solution update to teams app.":::

The changes are updated to Developer Portal.

> [!Tip]
> If you want to make any manual updates that can be overwritten in Developer Portal, from the **Warning** dialog box select **Overwrite and update**.

:::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/vs-overwrite.png" alt-text="Screenshot shows overwrite of app in Developer Portal.":::

When you create a Teams command bot using Visual Studio, two app IDs are registered in Microsoft Entra ID. You can identify the app IDs in Developer Portal as **Application (client) ID** under **Basic information** and existing **bot ID** under **App features**.

:::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/vs-dev-portal-basic-info.png" alt-text="Screenshot shows basic information of the app in Developer Portal.":::

:::image type="content" source="../../assets/images/toolkit-v2/toolkit-vs/vs-dev-portal-app-features.png" alt-text="Screenshot shows overwrite and update in Developer Portal.":::

## See also

* [Microsoft 365 Agents Toolkit Overview](agents-toolkit-fundamentals-vs.md)
* [App manifest schema](/microsoft-365/extensibility/schema)
* [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md)
* [Public developer preview for Microsoft Teams](~/resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Deploy Microsoft Teams app to the cloud using Microsoft Visual Studio](deploy-vs.md)
