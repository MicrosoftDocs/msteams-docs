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

After scaffolding, in the manifest template file under `templates/appPackage` folder:

`manifest.template.json` - shared between local and remote environment

In the manifest template, select the `Open Manifest File` under Project -> Teams Toolkit menu.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-open-manifest.png" alt-text="Open manifest":::

During **Provision in the Cloud** or **Prepare Teams App Dependencies**, Teams Toolkit loads manifest from `manifest.template.json`, combined with configurations from `state.{env}.json` and `config.{env}.json` to create a Teams app in [Teams Developer Portal](https://dev.teams.microsoft.com/apps) with the manifest.

## Customize app manifest in Teams Toolkit

There are two kinds of placeholders in `manifest.template.json`:

1. `{{state.xx}}` is pre-defined placeholder whose value is resolved by Teams Toolkit, defined in `state.{env}.json`. You should not modify the values in `state.{env}.json`.
2. `{{config.manifest.xx}}` is customized placeholder whose value is resolved from `config.{env}.json`.

You can add a customized parameter by doing the following:

1. Add a placeholder in `manifest.template.json` with pattern: `{{config.manifest.xx}}`
2. Add a config value in config.{env}.json

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

When you hover over the placeholder in `manifest.template.json`, the values for `local` and `dev` environment can be seen.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-placeholder.png" alt-text="Placeholder values":::

Or you can hover over the key besides each placeholder in `manifest.template.json`, which also shows the values for `local` and `dev` environment.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-placeholder.png" alt-text="Placeholder values":::

>[!Note]
>
>If the environment has not been provisioned, or `Prepare Teams App Dependencies` has not been executed, it means the values for placeholder have not been generated. Please follow the guidance inside hover to generate corresponding values.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-hover-undefined.png" alt-text="Placeholder values undefined":::

### Preview manifest file

Prerequisite:

To preview manifest file, you need to trigger **Prepare Teams App Dependencies** or **Provision in the Cloud** from Project -> Teams Toolkit menu, which will generate configuration for local or remote Teams app.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-prepare-dependencies.png" alt-text="Prepare dependencies":::

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-provision.png" alt-text="Provision in the cloud":::

To preview manifest with real content, Teams Toolkit will generate preview manifest files under `build/appPackage` folder. You can right click on `manifest.template.json`, and from `Preview Manifest File` select `For Local` or `For Azure`. The corresponding manifest file will be opened.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-preview.png" alt-text="Preview context menu":::

The other ways are:

1. Trigger `Zip App Package` from Project -> Teams Toolkit menu, select `For Local` or `For Azure`.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-zip.png" alt-text="Zip app package":::

2. Right click on Solution Explorer, there will be a list of menus which are the same as menus under Project -> Teams Toolkit

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-solution-explorer.png" alt-text="Solution explorer":::

### Sync local changes to Developer Portal

After previewing the manifest file, you can sync your local changes to Developer Portal by the following way:

Select `Update Manifest in Teams Developer Portal` under Project -> Teams Toolkit menu, or context menu from Solution Explorer.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-update-manifest.png" alt-text="Update manifest":::

> [!NOTE]
>
> The changes will be updated to Teams Developer Portal. If you have some manual updates in Teams Developer Portal, it will be overwritten. There will be a warning window to let you proceed or cancel.

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/edit-manifest-for-visual-studio/vs-overwrite.png" alt-text="Update warning":::

## See also

TBA
