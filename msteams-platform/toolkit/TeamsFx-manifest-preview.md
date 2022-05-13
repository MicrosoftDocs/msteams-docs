---
title: Teams App Manifest in Teams Toolkit
author: zyxiaoyuer
description: Teams App Manifest
ms.author: nliu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
---


# Customize Teams app manifest

Teams Toolkit consists of the following manifest template files under `manifest.template.json` folder across local and remote environments:

* `manifest.template.json`
* `templates/appPackage`


## Prerequisite

* Install the [Teams Toolkit version 3.8.1](https://github.com/OfficeDev/TeamsFx/releases/tag/vscode-extension-3.8.1-beta.adb483893.0).

> [!TIP]
> Ensure you have Teams app project opened in Visual Studio Code.

During the local debug or provision, Teams Toolkit loads manifest from `manifest.template.json`, with the configurations from `state.{env}.json`, `config.{env}.json`, and creates Teams app in [Dev Portal](https://dev.teams.microsoft.com/apps).

## Supported placeholders in manifest.template.json

The following list provides supported placeholders in `manifest.template.json`:

* `{{state.xx}}` is pre-defined placeholder and it's value is resolved by Teams Toolkit, defined in `state.{env}.json`. Ensure not to modify the values in `state.{env}.json`
* `{{config.manifest.xx}}` is a customized placeholder and it's value is resolved from `config.{env}.json`

**To add customized parameter**

1. Add a customized parameter
   a. Add a placeholder in `manifest.template.json` with pattern `{{config.manifest.xx}}`.</br>
   b. Add a config value in `config.{env}.json`.

     ```json
     {
         "manifest": {
          "KEY": "VALUE"
          }
     }
     ```

2. You can navigate to configuration file by selecting any one of the config placeholder **Go to config file** or **View the state file** in `manifest.template.json`.

### Validate manifest

During operations such as, **Zip Teams metadata package**, Teams Toolkit validates the manifest against its schema. The following list provides different ways to validate manifest:

* In VSC, trigger `Teams: Validate manifest file` from command palette:

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/validate.png" alt-text="Validate file":::

* In CLI, use command:

     ``` bash
        teamsfx validate --env local
        teamsfx validate --env dev
        ```

---

## Codelenses and hovers

In `manifest.template.json`, you can navigate to codelens to preview the values for `local` and `dev` environment.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/codelens.png" alt-text="Preview values":::

> [!NOTE] 
> Provision the environment or execute local debug to generate values for placeholders. 

You can navigate to state file or configuration file by selecting the codelens, which provides a drop-down list with all the environment names. After selecting one environment, the corresponding state file or configuration file opens.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-environment.png" alt-text="Select your environment":::

To preview values for all the environments, you can hover over the placeholder. It shows a list with environment names and corresponding values. If you haven't provisioned the environment or executed the local debug, select `Trigger Teams: Provision in the cloud command to see placeholder value` or `Trigger local debug to see placeholder value`.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/hover.png" alt-text="Preview all values":::


## Preview app manifest in Teams Toolkit

The manifest template file `manifest.template.json` is available under `templates/appPackage` folder after scaffolding. The template file with placeholders and the actual values are resolved by Teams Toolkit from files under `.fx/configs` and `.fx/states` for different environments.
To preview manifest with actual content, Teams Toolkit generates preview manifest files under `build/appPackage` folder:

```text
└───build
    └───appPackage
        ├───appPackage.{env}.zip - Zipped app package of remote Teams app
        ├───appPackage.local.zip - Zipped app package of local Teams app
        ├───manifest.{env}.json  - Previewed manifest of remote Teams app
        └───manifest.local.json  - Previewed manifest of local Teams app
```

You can preview manifest file in  local and remote environments.

* [Preview manifest file in local environment](#preview-manifest-file-in-local-environment)
* [Preview manifest file in remote environment](#preview-manifest-file-in-remote-environment)
 
### Preview manifest file in local environment

To preview manifest file in local environment, you can press **F5** to run local debug. It generates default local settings for you, then the app package and preview manifest builds under `build/appPackage` folder.

You can also preview local manifest file by following the steps:

1. Select **Preview** in the codelens of `manifest.template.json` file and select **local**.
2. Select **Preview manifest file** on the menu bar of `manifest.template.json` file.
3. Select **Zip Teams metadata package** in Treeview and select **local**.

The preview local appears as shown in the image:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/preview-23.png" alt-text="Preview":::

### Preview manifest file in remote environment

To preview manifest file in remote environment, select **Provision in the cloud** in **DEVELOPMENT** panel of Teams Toolkit extension or trigger **Teams: Provision in the cloud** from command palette. It generates configuration for remote teams app, and builds package and preview manifest under `build/appPackage` folder.

You can also preview manifest file in remote environment by following steps:

1. Select **Preview** in the codelens of `manifest.template.json` file.
2. Select **Preview manifest file** on the menu bar of `manifest.template.json` file.
3. Select **Zip Teams metadata package** in Treeview.
4. Select your environment.

If there are more than one environment, you need to select the environment you want to preview as shown in the image:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/manifest preview-1.png" alt-text="Add env":::

## Sync local changes to Dev Portal

After previewing the manifest file, you can sync your local changes to Dev Portal by the following ways:

1. Deploy Teams app manifest

   You can deploy Teams app manifest in any of the following ways:

   * Go to `manifest.template.json` file, and right-click to select `Deploy Teams app manifest` from context menu

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/deploy-manifest.png" alt-text="Deploy manifest":::

   * Trigger `Teams: Deploy Teams app manifest` from command palette

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/deploy-command.png" alt-text="Deploy from command palette":::

2. Update to Teams platform

   You can update to Teams platform in any of the following ways:

   * Select **Update to Teams platform** on the upper left-corner of `manifest.{env}.json`

   * Trigger **Teams: Update manifest to Teams platform** on the menu bar of `manifest.{env}.json`

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/update-to-teams.png" alt-text="Update to teams":::

You can also trigger **Teams: Update manifest to Teams platform** from the command palette:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/pre.png" alt-text="tree view":::

> [!NOTE]
> Trigger from editor codelens or menu bar updates current manifest file to Teams platform. Trigger from command palette requires selecting target environment.


 CLI command

``` bash
        teamsfx deploy manifest --include-app-manifest yes
```

---

> [!NOTE]
> The changes will be updated to Dev Portal. If you have some manual updates in Dev Portal, it will be overwritten.

If the manifest file is outdated due to configuration file change or template change, select any one of the following action:

* **Preview only**: Local manifest file is overwritten according to current configuration
* **Preview and update**: Local manifest file is overwritten according to current configuration and also updated to Teams platform
* **Cancel**: No action is taken

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/manifest preview -3.png" alt-text="pre" border="true":::


## See also

* [Manage multiple environments](TeamsFx-multi-env.md)
* [Reference: Manifest schema for Microsoft Teams](../resources/schema/manifest-schema.md)
* [Public developer preview for Microsoft Teams](../resources/dev-preview/developer-preview-intro.md) 
