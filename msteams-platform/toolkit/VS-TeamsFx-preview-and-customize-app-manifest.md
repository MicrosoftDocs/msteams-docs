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

During **Provision in the Cloud** or **Prepare Teams App Dependencies**, Teams Toolkit loads manifest from `manifest.template.json`, combined with configurations from `state.{env}.json` and `config.{env}.json` to create a Teams app in [Teams Developer Portal](https://dev.teams.microsoft.com/apps) with the manifest.

After scaffolding, in the manifest template file under `templates/appPackage` folder,
`manifest.template.json` is shared between local and remote environment.

In the manifest template, select **Project** > **Teams Toolkit** > **Open Manifest File**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-open-manifest.png" alt-text="Open manifest":::

## Customize app manifest in Teams Toolkit

There are two kinds of placeholders in `manifest.template.json`:

- `{{state.xx}}` is pre-defined placeholder whose value is resolved by Teams Toolkit, defined in `state.{env}.json`. You should not modify the values in `state.{env}.json`.
- `{{config.manifest.xx}}` is customized placeholder whose value is resolved from `config.{env}.json`.

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

## Preview app manifest

You can Preview values in app manifest in two ways:

- When you hover over the placeholder in `manifest.template.json`, the values for **dev** and **local** environment can be seen.

    :::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-placeholder.png" alt-text="Placeholder values":::

- You can also hover over the key besides each placeholder in `manifest.template.json`, the same values for **dev** and **local** environment can be seen.

    :::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-placeholder.png" alt-text="Placeholder values":::

> [!NOTE]
> If the environment has not been provisioned, or **Prepare Teams App Dependencies** has not been executed, it means the values for placeholder have not been generated. Please follow the guidance inside, and hover to generate corresponding values.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-undefined1.png" alt-text="Placeholder values undefined":::

### Preview manifest file

To preview manifest file, you need to trigger **Prepare Teams App Dependencies** or **Provision in the Cloud** from **Project**> **Teams Toolkit** menu, that generates configuration for local or remote Teams app.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-preview-manifest1.png" alt-text="Preview manifest file":::

To preview manifest with real content, Teams Toolkit generates the preview manifest files, right click on **manifest.template.json** under **build/appPackage** folder. Select **Preview Manifest File**> **For Local** or **For Azure**. This opens the corresponding manifest file.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-preview.png" alt-text="Preview context menu":::

The other ways to preview manifest file are:

- Trigger **Zip App Package** from **Project**> **Teams Toolkit** menu, select **For Local** or **For Azure**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-zip.png" alt-text="Zip app package":::

- You can also right click on **Solution Explorer** under **Teams Toolkit**, which shows a list of menus that are same as under the menus Project> Teams Toolkit.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-solution-explorer.png" alt-text="Solution explorer":::

### Sync local changes to Developer Portal

After previewing the manifest file, your local changes can be synced to the Developer Portal by selecting **Update Manifest in Teams Developer Portal** under **Project**> **Teams Toolkit** menu, or context menu from Solution Explorer.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-update-manifest.png" alt-text="Update manifest":::

> [!NOTE]
> The changes are updated to Teams Developer Portal. If you have some manual updates in Teams Developer Portal, that can be overwritten. In the **Warning** dialogue box you can **Overwrite and update** or **Cancel**.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-overwrite.png" alt-text="Update warning":::

## See also

TBA
