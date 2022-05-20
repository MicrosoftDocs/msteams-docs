---
title: Customize Teams App Manifest in Teams Toolkit
author: zyxiaoyuer
description:  Customize Teams App Manifest
ms.author: nliu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Customize app manifest in Toolkit

Teams Toolkit consists of the following manifest template files under `manifest.template.json` folder across local and remote environments:

* `manifest.template.json`
* `templates/appPackage`


## Prerequisite

* Install the [latest version of Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

> [!TIP]
> Ensure you have Teams app project opened in Visual Studio Code.

During local debug or provision, Teams Toolkit loads manifest from `manifest.template.json`,  with configurations from `state.{env}.json`, `config.{env}.json`, and creates teams app in [Dev Portal](https://dev.teams.microsoft.com/apps).


## Placeholders supported in manifest.template.json

* `{{state.xx}}` is pre-defined placeholder and it's value is resolved by Teams Toolkit, defined in `state.{env}.json`. Ensure not to modify the values in state.{env}.json
* `{{config.manifest.xx}}` is customized placeholder and it's value is resolved from `config.{env}.json`

  1. You can add a customized parameter as follows:
      1. Add a placeholder in manifest.template.json with pattern: `{{config.manifest.xx}}`
      2. Add a config value in config.{env}.json

        ```json
        {
            "manifest": {
                "KEY": "VALUE"
            }
        }
        ```

   2. You can navigate to configuration file by selecting any one of the config placeholder **Go to config file** or **View the state file** in `manifest.template.json`

## See also

[Preview app manifest in Toolkit](TeamsFx-preview-and-customize-app-manifest.md)
