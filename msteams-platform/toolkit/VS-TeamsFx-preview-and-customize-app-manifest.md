---
title: Teams App Manifest in Teams Toolkit VS
author: zyxiaoyuer
description: In this module, learn how to edit, preview and customize Teams App Manifest in the different environment for Visual Studio.
ms.author: nliu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
---

# Manage Teams app manifest

After scaffolding, in the manifest template file under `templates/appPackage` folder,

`manifest.template.json` is shared between local and remote environment.

In the manifest template, select the **Open Manifest File** under **Project** -> **Teams Toolkit** menu.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-open-manifest.png" alt-text="Open manifest":::

During **Provision in the Cloud** or **Prepare Teams App Dependencies**, Teams Toolkit loads manifest from `manifest.template.json`, combined with configurations from `state.{env}.json` and `config.{env}.json` to create a Teams app in [Teams Developer Portal](https://dev.teams.microsoft.com/apps) with the manifest.

## Customize app manifest in Teams Toolkit

There are two kinds of placeholders in `manifest.template.json`:

1. `{{state.xx}}` is pre-defined placeholder whose value is resolved by Teams Toolkit, defined in `state.{env}.json`. You should not modify the values in `state.{env}.json`.
2. `{{config.manifest.xx}}` is customized placeholder whose value is resolved from `config.{env}.json`.

You can have a customized parameter by:

1. Adding a placeholder in `manifest.template.json` with pattern: `{{config.manifest.xx}}`.
2. Adding a config value in `config.{env}.json`.

    ```
        {
            "manifest": {
            "KEY": "VALUE"
            }
    }
    ```

## Preview app manifest

[Placeholder for description or related information]

### Preview values with hovers

When you hover over the placeholder in `manifest.template.json`, the values for **dev** and **local** environment can be seen.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-placeholder.png" alt-text="Placeholder values":::

Or you can hover over the key besides each placeholder in `manifest.template.json`, which also shows the values for **dev** and **local** environment.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-placeholder.png" alt-text="Placeholder values":::

> [!NOTE]
> If the environment has not been provisioned, or **Prepare Teams App Dependencies** has not been executed, it means the values for placeholder have not been generated. Please follow the guidance inside, and hover to generate corresponding values.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-undefined.png" alt-text="Placeholder values undefined":::

### Preview manifest file

### Prerequisite

To preview manifest file, you need to trigger **Prepare Teams App Dependencies** or **Provision in the Cloud** from **Project** -> **Teams Toolkit** menu, which generates configuration for local or remote Teams app.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-preview-manifest.png" alt-text="Preview manifest file":::

To preview manifest with real content, Teams Toolkit generates the preview manifest files under **build/appPackage** folder. Right click on **manifest.template.json**, and from **Preview Manifest File** select **For Local** or **For Azure**. This opens the corresponding manifest file.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-preview.png" alt-text="Preview context menu":::

The other ways are:

1. Trigger **Zip App Package** from **Project** -> **Teams Toolkit** menu, select **For Local** or **For Azure**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-zip.png" alt-text="Zip app package":::

2. Right click on **Solution Explorer**, here under **Teams Toolkit** it shows a list of menus that are same as under the menus Project -> Teams Toolkit.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-solution-explorer.png" alt-text="Solution explorer":::

### Sync local changes to Developer Portal

After previewing the manifest file, your local changes can be synced to the Developer Portal by selecting **Update Manifest in Teams Developer Portal** under **Project** -> **Teams Toolkit** menu, or context menu from Solution Explorer.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-update-manifest.png" alt-text="Update manifest":::

> [!NOTE]
> The changes are updated to Teams Developer Portal. If you have some manual updates in Teams Developer Portal, that can be overwritten. In the **Warning** dialogue box you can **Overwrite and update** or **Cancel**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-overwrite.png" alt-text="Update warning":::

## See also

TBA
