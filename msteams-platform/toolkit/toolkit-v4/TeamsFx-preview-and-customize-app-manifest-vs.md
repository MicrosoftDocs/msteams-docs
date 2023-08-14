---
title: Customize Teams App Manifest in Teams Toolkit using Visual Studio
author: surbhigupta
description: In this module, learn how to edit, preview and customize Teams App Manifest in different environment in Teams Toolkit.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
zone_pivot_groups: teams-toolkit-platform-vs
---

:::zone pivot="visual-studio-v17-7"

## Customize Teams app manifest for Visual Studio

The Teams app manifest describes how your app integrates into Teams and is shared between local and remote environments. The default manifest file is available at the `appPackage/manifest.json` file and the environment variables available from the `env/.env.{env}` file

The manifest file contains some environment variables with the `${{XX_XX}}` format. You can define your own environment variables and add placeholders in the `manifest.json` file. The following are the .env and .json file examples:

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

### Preview manifest file

You can preview the manifest file either For Local or For Azure.  To preview the manifest file, follow these steps:To preview the manifest file:

1. Select **Project** > **Teams Toolkit**.

1. Select **Prepare Teams App Dependencies** or **Provision in the Cloud...** to generate environment variables for local or remote Teams app..

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/provision-in-the-cloud.png" alt-text="Screenshot shows the app trigger in local or remote.":::

1. Upload the **Zip App Package**. There are two ways to upload zip app package:

    1. Select **Project** > **Teams Toolkit** > **Zip App Package** and then select either **For Local** or **For Azure**

        :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/zip-app-package.png" alt-text="Screenshot shows the zip app package for local or azure.":::

    1. From **Solution Explorer**, right-click on **MyTeamsApp2** (In this scenario the project name is MyTeamsApp2). Go to **Teams Toolkit** > **Zip App Package** and then select either **For Local** or **For Azure**.

        :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/solution-zip.png" alt-text="Screenshot shows the solution zip app package for local or azure.":::

     Teams Toolkit generates the zip app package.

1. Under `appPackage` folder, right-click on the `manifest.json` file.

1. Select **Preview Manifest File**.

1. Select either **For Local** or **For Azure**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/preview-manifest.png" alt-text="Screenshot shows the preview of manifest.":::

You can preview the app manifest file under `appPackage/build` in Visual Studio is displayed.

### Sync local changes to Developer Portal

After you've previewed the manifest file in Visual Studio, you can sync the local changes to Developer Portal. To sync changes to Developer Portal follow these steps:

1. Select **Project**.
1. Select **Teams Toolkit**.
1. Select **Update Manifest in Teams Developer Portal**.

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/update-teams-app.png" alt-text="Screenshot shows update manifest in teams developer portal.":::

You can also sync the local changes to Developer Portal from **Solution Explorer**:

1. Right-click on **MyTeamsApp2**.
1. Select **Teams Toolkit**.
1. Select **Update Manifest in Teams Developer Portal**

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/solution-update-teams-app.png" alt-text="Screenshot shows solution update to teams app.":::

The changes are updated to Developer Portal.

> [!Tip]
> If you want to make any manual updates that can be overwritten in Teams Developer Portal, from the **Warning** dialog box select **Overwrite and update**.

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-overwrite.png" alt-text="Screenshot shows overwrite of app in teams developer portal.":::

When you create a Teams command bot using Visual Studio, two app IDs are registered in Azure Active Directory (Azure AD). You can identify the app IDs in the Developer Portal as **Application (client) ID** under **Basic information** and existing **bot ID** under **App features**.

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-dev-portal-basic-info.png" alt-text="Screenshot shows basic information of the app in teams developer portal.":::

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-dev-portal-app-features.png" alt-text="Screenshot shows overwrite and update in teams developer portal.":::

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md)
* [Manage multiple environments](TeamsFx-multi-env-v4.md)
* [Public developer preview for Microsoft Teams](~/resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-vs.md#deploy-teams-app-to-the-cloud-using-visual-studio)

:::zone-end

:::zone pivot="visual-studio-v17-6"

## Customize Teams app manifest in Teams Toolkit

Teams Toolkit in Visual Studio loads manifest from `manifest.template.json` with configurations from `state.{env}.json` and `config.{env}.json` while provisioning and preparing app dependencies. You can also create Teams app in Developer Portal with manifest.

After scaffolding, in the manifest template file under `templates/appPackage` folder,
`manifest.template.json` is shared between local and remote environment.

In the manifest template, select **Project** > **Teams Toolkit** > **Open Manifest File**.

:::image type="content" source="images/vs-open-manifest-v4.png" alt-text="Screenshot is an example of showing the navigation to open manifest file." lightbox="images/vs-open-manifest-v4.png":::

### Customize app manifest in Teams Toolkit

The following list provides two types of placeholders in `manifest.template.json`:

* `{{state.xx}}` is pre-defined placeholder, whose value is resolved by Teams Toolkit defined in `state.{env}.json`. Its recommended not to modify the values in `state.{env}.json`.
* `{{config.manifest.xx}}` is customized placeholder, whose value is resolved from `config.{env}.json`.

You can add a customized parameter by:

* Adding a placeholder in `manifest.template.json` with pattern: `{{config.manifest.xx}}`.
* Adding a config value in `config.{env}.json`.

    ```JSON
        {
            "manifest": {
            "KEY": "VALUE"
            }
    }
    ```

## Preview app manifest in Teams Toolkit

You can preview values in app manifest in two ways:

* When you hover over the placeholder in `manifest.template.json`, you can see the values for **dev** and **local** environment.

   :::image type="content" source="images/vs-hover-placeholder1-v4.png" alt-text="Screenshot is an example showing when you hover over placeholder, can view the values for dev and local environment." lightbox="images/vs-hover-placeholder1-v4.png":::

* You can also hover over the key beside each placeholder in `manifest.template.json`, where you can see the same values for **dev** and **local** environment.

   :::image type="content" source="images/vs-hover-key-placeholder-v4.png" alt-text="Screenshot is an example showing when you hover over key beside placeholder can view the same values for dev and local environment." lightbox="images/vs-hover-key-placeholder-v4.png":::

If the environment has not been provisioned, or the Teams app dependencies have not been prepared, it indicates that the values for the placeholder have not been generated. You can follow the guidance inside the hover to generate corresponding values.

## Preview manifest file

You can either sideload for local, or deploy for Azure to preview the manifest file. You can preview the manifest file by performing the following steps:

1. Select **Project** > **Teams Toolkit**.

1. Select to trigger **Prepare Teams App Dependencies** or **Provision in the Cloud** that generates configuration for either for local or remote Teams app.

   :::image type="content" source="images/vs-preview-manifest1-v4.png" alt-text="Screenshot is an example of showing preview manifest file." lightbox="images/vs-preview-manifest1-v4.png":::

There are two ways to upload zip app package before you can preview the manifest file:

1. From the list of menu select, **Project** > **Teams Toolkit**.

1. Select **Zip App Package**, then select either **For Local** or **For Azure**.

   :::image type="content" source="images/vs-zip1-v4.png" alt-text="Screenshot is an example of showing the navigation to zip app package for local and Azure." lightbox="images/vs-zip1-v4.png":::

1. You can also upload zip app package from **Solution Explorer** section, if you right-click on **MyTeamsApp1**. In this scenario the project name is MyTeamsApp1.

1. Select **Teams Toolkit** > **Zip App Package** > **For Local** or **For Azure**.

   :::image type="content" source="images/vs-solution-explorer1-v4.png" alt-text="Screenshot is an example of showing the list of Teams toolkit menus from solution explorer." lightbox="images/vs-solution-explorer1-v4.png":::

Teams Toolkit generates the zip app package, the following steps help to preview the manifest file:

1. Right-click on **manifest.template.json** file under **appPackage** folder.

1. Select **Preview Manifest File** > **For Local** or **For Azure**.

   :::image type="content" source="images/vs-preview1-v4.png" alt-text="Screenshot is an example of showing the preview manifest menu for local and Azure." lightbox="images/vs-preview1-v4.png":::

This displays the preview of the manifest file in Visual Studio.

## Sync local changes to Developer Portal

After you've previewed the manifest file in Visual Studio, you can sync the local changes to Developer Portal.

Select **Project** > **Teams Toolkit** > **Update Manifest in Teams Developer Portal**.

:::image type="content" source="images/vs-update-manifest1-v4.png" alt-text="Screenshot is an example of showing the navigation to update manifest in Teams developer portal." lightbox="images/vs-update-manifest1-v4.png":::

You can also sync the local changes to Developer Portal from the context menu of **Solution Explorer** section. After the local changes are synced, you can preview the manifest file in Developer Portal.

:::image type="content" source="images/vs-update-manifest2-v4.png" alt-text="Update manifest in Teams developer portal from solution explorer section":::

The changes are updated to Developer Portal.

> [!TIP]
>
> * Select **Overwrite and update** or **Cancel** from the **Warning** dialog box to make any manual updates that can be overwritten in Developer Portal.

:::image type="content" source="images/vs-overwrite-v4.png" alt-text="Screenshot is an example of showing the update warning." lightbox="images/vs-overwrite-v4.png":::

When you create a Teams command bot using Visual Studio, two app IDs are registered in Microsoft Azure Active Directory (Azure AD). You can identify the app IDs in the Developer Portal as **Application (client) ID** under **Basic information** and existing **bot ID** under **App features**.

:::image type="content" source="images/vs-dev-portal-basic-info-v4.png" alt-text="Developer portal showing basic info app id" lightbox="images/vs-dev-portal-basic-info-v4.png":::

:::image type="content" source="images/vs-dev-portal-app-features-v4.png" alt-text="Developer portal showing app feature bot id selection" lightbox="images/vs-dev-portal-app-features-v4.png":::

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md)
* [Manage multiple environments](TeamsFx-multi-env-v4.md)
* [Public developer preview for Microsoft Teams](~/resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio](provision-vs.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-vs.md#deploy-teams-app-to-the-cloud-using-visual-studio)

:::zone-end
