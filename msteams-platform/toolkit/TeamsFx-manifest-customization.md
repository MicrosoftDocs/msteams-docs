---
title: Customize Teams App Manifest in Teams Toolkit
author: zyxiaoyuer
description:  Customize Teams App Manifest
ms.author: nliu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Customize app manifest in Teams Toolkit

Teams Toolkit consists of the following manifest template files under `templates/appPackage` folder:

* `manifest.local.template.json` - local debug teams app
* `manifest.remote.template.json` - shared in all environments

## Prerequisite

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> Ensure you have Teams app project opened in Visual Studio Code.

During provision, Teams Toolkit loads manifest from `manifest.remote.template.json`, combined with configurations from `state.{env}.json`, `config.{env}.json`, and creates teams app in [Dev Portal](https://dev.teams.microsoft.com/apps).

During local debug, Teams Toolkit loads manifest from `manifest.local.template.json`, combined with configurations from `localSettings.json`, and creates teams app in [Dev Portal](https://dev.teams.microsoft.com/apps).

## Supported placeholder in manifest.remote.template.json

* `{{state.xx}}` is pre-defined placeholder and it's value is resolved by Teams Toolkit, defined in `state.{env}.json`. Ensure not to modify the values in state.{env}.json.
* `{{config.manifest.xx}}` is customized placeholder whose value is resolved from `config.{env}.json`.
  * You can add a customized parameter as follows:
    * Add a placeholder in manifest.remote.template.json with pattern: `{{config.manifest.xx}}`
    * Add a config value in `config.{env}.json`

        ```json
        {
            "manifest": {
                "KEY": "VALUE"
            }
        }
        ```

    Besides each config placeholder in `manifest.remote.template.json`, there is a `Go to config file`. You can navigate to configuration file by selecting it.

## Supported placeholder in manifest.local.template.json

`{{localSettings.xx}}` is pre-defined placeholder and it's value is resolved by Teams Toolkit defined in `localSettings.json`. Ensure not to modify the values in localSettings.json.

 > [!NOTE]
 > Ensure not to customize the local manifest.

## See also

[Preview Teams App Manifest in Teams Toolkit](TeamsFx-manifest-preview.md)
