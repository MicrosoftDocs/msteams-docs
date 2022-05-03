---
title: Preview Teams App Manifest in Teams Toolkit
author: zyxiaoyuer
description:  Preview Teams App Manifest
ms.author: nliu
ms.localizationpriority: high
ms.topic: overview
ms.date: 11/29/2021
---

# Preview app manifest in Toolkit

The manifest template file `manifest.template.json` is available under `templates/appPackage` folder after scaffolding. The Template file with placeholders, and the actual values is resolved by Teams Toolkit from files under `.fx/configs` and `.fx/states` for different environments.

## Prerequisite

* Install the [latest version of Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)

> [!TIP]
> Ensure you have Teams app project opened in Visual Studio code.

## Preview manifest

To preview manifest with actual content, Teams Toolkit generates preview manifest files under `build/appPackage` folder:

```text
└───build
    └───appPackage
        ├───appPackage.{env}.zip - Zipped app package of remote teams app
        ├───appPackage.local.zip - Zipped app package of local team app
        ├───manifest.{env}.json  - Previewed manifest of remote teams app
        └───manifest.local.json  - Previewed manifest of local teams app
```

### Preview manifest file in local environment

To preview manifest file in local teams app, you can press **F5** to run local debug. It generates default local settings for you, then the app package and preview manifest builds under `build/appPackage` folder.

You can also preview local manifest file by following the steps:

1. Select **Preview** in the codelens of `manifest.template.json` file and select **local**
2. Select **Preview manifest file** on the menu bar of `manifest.template.json` file
3. Select **Zip Teams metadata package** in Treeview and select **local**

The preview local appears as shown in the image:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/preview-23.png" alt-text="Preview":::

### Preview manifest file in remote environment

To preview manifest file in remote teams app, select **Provision in the cloud** in **DEVELOPMENT** panel of Teams Toolkit extension Treeview, or trigger **Teams: Provision in the cloud** from command palette. It generates configuration for remote teams app, and builds package and preview manifest under `build/appPackage` folder.

You can also preview manifest file in remote environment by following steps:

1. Select **Preview** in the codelens of `manifest.template.json` file
2. Select **Preview manifest file** on the menu bar of `manifest.template.json` file
3. Select **Zip Teams metadata package** in Treeview
4. Select your environment

If there are more than one environment, you need to select the environment you want to preview as shown in the image:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/manifest preview-1.png" alt-text="Add env":::


# Customize app manifest

Teams Toolkit has the following manifest template files under `manifest.template.json` folder across local and remote environments:

* `manifest.template.json`
* `templates/appPackage`

During the local debug or provision, Teams Toolkit loads manifest from `manifest.template.json`, with the configuration from `state.{env}.json`, `config.{env}.json`, and creates teams app in [Dev Portal](https://dev.teams.microsoft.com/apps).

## Supported placeholders in manifest.template.json

* `{{state.xx}}` is pre-defined placeholder and it's value is resolved by Teams Toolkit, defined in `state.{env}.json`. Ensure not to modify the values in state.{env}.json
* `{{config.manifest.xx}}` is a customized placeholder and it's value is resolved from `config.{env}.json`

  1. You can add a customized parameter as follows:
      1. Add a placeholder in manifest.template.json with pattern `{{config.manifest.xx}}`
      2. Add a config value in config.{env}.json

        ```json
        {
            "manifest": {
                "KEY": "VALUE"
            }
        }
        ```

   2. You can navigate to configuration file by selecting any one of the config placeholder **Go to config file** or **View the state file** in `manifest.template.json`:

## Sync local changes to Developer Portal

After previewing the manifest file, you can sync your local changes to Developer Portal by following the steps:

1. Select **Update to Teams platform** on the top left corner of `manifest.{env}.json`
2. Select **Teams: Update manifest to Teams platform** on the menu bar of `manifest.{env}.json`

 You can also trigger **Teams: Update manifest to Teams platform** from the command palette:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/pre.png" alt-text="tree view":::

> [!NOTE]
>  Trigger from editor codelens or **title**  updates current manifest file to Teams platform. Trigger from command palette requires selecting target environment

  

If the manifest file is outdated due to configuration file change or template change, select any one of the following action:

* **Preview only**: Local manifest file is overwritten according to current configuration
* **Preview and update**: Local manifest file is overwritten according to current configuration and also updated to Teams platform
* **Cancel**: No action is taken

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/manifest preview -3.png" alt-text="pre":::



> [!NOTE]
> The changes are updated in Dev Portal. Any manual updates in Dev portal are  overwritten.

## See also

[Customize Teams App Manifest in Teams Toolkit](TeamsFx-manifest-customization.md)
