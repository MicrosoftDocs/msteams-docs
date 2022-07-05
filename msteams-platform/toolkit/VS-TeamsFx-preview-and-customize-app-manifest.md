---
title: Teams App Manifest in Teams Toolkit VS
author: zyxiaoyuer
description: In this module, learn how to edit, preview and customize Teams App Manifest in the different environment for Visual Studio.
ms.author: nliu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
---

## How to manage Teams app manifest

After scaffolding, there will be a manifest template file available under `templates/appPackage` folder:

- manifest.template.json - shared between local and remote environment

You can open this manifest template file by click `Open Manifest File` under Project -> Teams Toolkit menu.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/preview-23.png" alt-text="Preview":::
![open manifest](../images/vs-open-manifest.png)

During `Provision in the Cloud` or `Prepare Teams App Dependencies`, Teams Toolkit will load manifest from `manifest.template.json`, combined with configurations from `state.{env}.json` and `config.{env}.json`. Then create a Teams app in [Teams Developer Portal](https://dev.teams.microsoft.com/apps) with this manifest.

### Customize app manifest in Teams Toolkit

There are two kinds of placeholders in `manifest.template.json`:

- `{{state.xx}}` is pre-defined placeholder whose value is resolved by Teams Toolkit, defined in `state.{env}.json`. You should not modify the values in `state.{env}.json`.
- `{{config.manifest.xx}}` is customized placeholder whose value is resolved from `config.{env}.json`.
  - You can add a customized parameter by following
    - Add a placeholder in `manifest.template.json` with pattern: `{{config.manifest.xx}}`
    - Add a config value in config.{env}.json

        ```
        {
            "manifest": {
                "KEY": "VALUE"
            }
        }
        ```

### Preview app manifest

#### Preview values with hovers

When you hover over the placeholder in `manifest.template.json`, you can preview the values for `local` and `dev` environment.
![preview placeholder values](../images/vs-hover-placeholder.png)

Or you can hover over the key besides each placeholder in `manifest.template.json`, which also provides values for `local` and `dev` environment.

![preview placeholder values](../images/vs-hover.png)

> [!NOTE]: If the environment has not been provisioned, or `Prepare Teams App Dependencies` has not been executed, it means the values for placeholder have not been generated. Please follow the guidance inside hover to generate corresponding values.
![preview placeholder values - undefined](../images/vs-hover-undefined.png)

#### Preview manifest file

> [!Prerequisite]: To preview manifest file, you need to trigger `Prepare Teams App Dependencies` or `Provision in the Cloud...` from Project -> Teams Toolkit menu, which will generate configuration for local or remote Teams app.
![prepare dependencies](../images/vs-prepare-dependencies.png)

![provision in the cloud](../images/vs-provision.png)

To preview manifest with real content, Teams Toolkit will generate preview manifest files under `build/appPackage` folder. You can right click on `manifest.template.json`, click `Preview Manifest File` and select `For Local` or `For Azure`. The corresponding manifest file will be opened.

![preview-context-menu](../images/vs-preview.png)

The other ways are:

- Trigger `Zip App Package` from Project -> Teams Toolkit menu, select `For Local` or `For Azure`.

![zip app package](../images/vs-zip.png)

- Right click on Solution Explorer, there will be a list of menus which are the same as menus under Project -> Teams Toolkit

![solution explorer](../images/vs-solution-explorer.png)

### Sync local changes to Developer Portal

After previewing the manifest file, you can sync your local changes to Developer Portal by the following ways:

- Click `Update Manifest in Teams Developer Portal` under Project -> Teams Toolkit menu, or context menu from Solution Explorer.

![update](../images/vs-update-manifest.png)

> [!NOTE]: The changes will be updated to Teams Developer Portal. If you have some manual updates in Teams Developer Portal, it will be overwritten. There will be a warning window to let you proceed or cancel.
![update-warning](../images/vs-overwrite.png)

## See also

TBA
