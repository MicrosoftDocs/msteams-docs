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

To preview manifest file of remote teams app, you need to click `Provision in the cloud` in DEVELOPMENT panel of Teams Toolkit extension Treeview, or trigger `Teams: Provision in the cloud` from command palette first. This step will generate configurations for remote teams app, then the app package and preview manifest will be built under `build/appPackage` folder.

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

### Sync local changes to Dev Portal
After previewing the manifest file, you can sync your local changes to Dev Portal by the following ways:

- Right click on `manifest.template.json` file, and click `Deploy Teams app manifest` from context menu
- 
    ![deploy-manifest](../images/deploy-manifest.png)


- Trigger `Teams: Deploy Teams app manifest` from command palette
- 
    ![deploy-command](../images/deploy-command.png)

- Click `Update to Teams platform` at the top left corner of `manifest.{env}.json`
- 
- Click `Teams: Deploy Teams app manifest` at the menu bar of `manifest.{env}.json`
- 
    ![update](../images/updatetoteamsplatform.png)

s marked this conversation as resolved.
Show resolved
- CLI command
    ```bash
    teamsfx deploy manifest --include-app-manifest yes
    ```

> [!NOTE]: Trigger from editor codelens or menu bar will update current manifest file to Teams platform. Trigger from command palette will require selecting target environment.
If the manifest file is outdated due to configuration file change or template change, user will be asked to confirm their action:
![manifest-outdated](../images/manifest_outdated_dialog.png)

- `Preview only`: local manifest file will be overwritten according to current configuration
- `Preview and update`: local manifest file will be overwritten according to current configration and also updated to Teams platform at the same time
- `Cancel`: do nothing

> [!NOTE]: The changes will be updated to dev portal. If you have some manual updates in dev portal, it will be overwritten.


## Customize app manifest

Teams Toolkit has the following manifest template files under `manifest.template.json` folder across local and remote environments:

* `manifest.template.json`
* `templates/appPackage`

During the local debug or provision, Teams Toolkit loads manifest from `manifest.template.json`, with the configurations from `state.{env}.json`, `config.{env}.json`, and creates teams app in [Dev Portal](https://dev.teams.microsoft.com/apps).

## Supported placeholders in manifest.template.json

* `{{state.xx}}` is pre-defined placeholder and it's value is resolved by Teams Toolkit, defined in `state.{env}.json`. Ensure not to modify the values in `state.{env}.json`
* `{{config.manifest.xx}}` is a customized placeholder and it's value is resolved from `config.{env}.json`

  1. You can add a customized parameter as follows:
      1. Add a placeholder in `manifest.template.json` with pattern `{{config.manifest.xx}}`
      2. Add a config value in `config.{env}.json`

        ```json
        {
            "manifest": {
                "KEY": "VALUE"
            }
        }
        ```

   2. You can navigate to configuration file by selecting any one of the config placeholder **Go to config file** or **View the state file** in `manifest.template.json`:

### Validate manifest

During some operations like `Zip Teams metadata package`, Teams Toolkit implicitly validates the manifest against its schema. The following are two ways to explicitly validate manifest:

- Trigger `Teams: Validate manifest file` from command palette
- 
    ![validate](../images/validate.png)

- CLI command

   ```
    bash
    teamsfx validate --env local
    teamsfx validate --env dev
    ```

### Codelenses and hovers

Besides each placeholder in `manifest.template.json`, there is a codelens to preview the values for `local` and `dev` environment.

![preview placeholder values](../images/codelens.png)

> [!NOTE] 
> If the environment has not been provisioned, or local debug has not been executed, it means the values for placeholder has not been generated. So the value will be undefined in codelens.
You can navigate to state file or configuration file by selecting the codelens, which pops up a drop down list with all the environment names. After selecting one environment, the corresponding state file or configuration file opens.

![select environment](../images/select-env-with-local.png)

To preview values for all the environments, you can hover over the placeholder. It shows a list with environment names and corresponding values. If the environment has not been provisioned, or the local debug has not been executed, you can click `Trigger Teams: Provision in the cloud command to see placeholder value` or `Trigger local debug to see placeholder value`.

![hover](../images/hover.png)

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


