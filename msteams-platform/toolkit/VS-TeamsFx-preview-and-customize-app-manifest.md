---
title: Teams App Manifest in Teams Toolkit VS
author: zyxiaoyuer
description: In this module, learn how to edit, preview and customize Teams App Manifest in the different environment for Visual Studio.
ms.author: nliu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
---

# Edit Teams app manifest using Visual Studio

Teams Toolkit in Visual Studio (VS) loads manifest from `manifest.template.json` with configurations from `state.{env}.json` and `config.{env}.json` while provisioning and preparing app dependencies. This allows you to create Microsoft Teams app in [Developer Portal](https://dev.teams.microsoft.com/apps) with the manifest.

After scaffolding, in the manifest template file under `templates/appPackage` folder,
`manifest.template.json` is shared between local and remote environment.

In the manifest template, select **Project** > **Teams Toolkit** > **Open Manifest File**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-open-manifest.png" alt-text="Open manifest file":::

### Customize app manifest in Teams Toolkit

There are two types of placeholders in `manifest.template.json`:

- `{{state.xx}}` is pre-defined placeholder, whose value is resolved by Teams Toolkit, defined in `state.{env}.json`. You can't modify the values in `state.{env}.json`.
- `{{config.manifest.xx}}` is customized placeholder, whose value is resolved from `config.{env}.json`.

You can have a customized parameter by:

- Adding a placeholder in `manifest.template.json` with pattern: `{{config.manifest.xx}}`.
- Adding a config value in `config.{env}.json`.

    ```
        {
            "manifest": {
            "KEY": "VALUE"
            }
    }
    ```

### Preview app manifest in Teams Toolkit

You can preview values in app manifest in two ways:

- When you hover over the placeholder in `manifest.template.json`, the values for **dev** and **local** environment can be seen.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-placeholder1.png" alt-text="Hover over placeholder":::

- You can also hover over the key besides each placeholder in `manifest.template.json`, the same values for **dev** and **local** environment can be seen.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-key-placeholder.png" alt-text="Hover over key beside placeholder":::

> [!NOTE]
> If the environment has not been provisioned, or the Teams app dependencies has not been prepared, it indicates that the values for placeholder have not been generated.

### Preview manifest file

You can preview the manifest file by performing the following steps:

- Select **Project** > **Teams Toolkit** menu and trigger **Prepare Teams App Dependencies** or **Provision in the Cloud**, that generates configuration for local or remote Teams app.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-preview-manifest1.png" alt-text="Preview manifest file":::

- To preview manifest with real content, Teams Toolkit generates the preview manifest files, right click on **manifest.template.json** under **appPackage** folder. Select **Preview Manifest File** > **For Local** or **For Azure**.

   :::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-preview1.png" alt-text="Preview context menu":::

There are two other ways to preview manifest file:

- Select **Project** > **Teams Toolkit** > **Zip App Package** then select **For Local** or **For Azure**.

    :::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-zip1.png" alt-text="Zip app package":::

- You can also see the same list of menus that are under Project > Teams Toolkit, if you right click on your project name and then select **Teams Toolkit** under **Solution Explorer**.

    :::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-solution-explorer1.png" alt-text="List of Teams Toolkit menus from solution explorer":::

    > [!NOTE]
    >In this case the project name is **MyTeamsApp1**.

### Sync local changes to Developer Portal

Your local changes can be synced to the Developer Portal, after you have previewed the manifest file. Select **Project** > **Teams Toolkit** > **Update Manifest in Teams Developer Portal**, or context menu from Solution Explorer.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-update-manifest1.png" alt-text="Update manifest in teams developer portal":::

> [!NOTE]
> The changes are updated to Teams Developer Portal. If you have some manual updates in Developer Portal, that can be overwritten. In the **Warning** dialogue box you can **Overwrite and update** or **Cancel**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-overwrite.png" alt-text="Update warning":::

## See also

TBA
