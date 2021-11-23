---
title: Customize Teams App Manifest in Teams Toolkit
author: zyxiaoyuer
description:  Customize Teams App Manifest
ms.author: nliu
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Customize Teams App Manifest in Teams Toolkit

There are two manifest template files under `templates/appPackage` folder.

- `manifest.local.template.json` - local debug teams app
- `manifest.remote.template.json` - shared in all environments

## Prerequisite

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.
* You should already have a Teams app project opened in VS code.

During provision, Teams Toolkit will load manifest from `manifest.remote.template.json`, combined with configurations from `state.{env}.json` and `config.{env}.json`. Then create a teams app in [Dev Portal](https://dev.teams.microsoft.com/apps) with this manifest.

During local debug, Teams Toolkit will load manifest from `manifest.local.template.json`, combined with configurations from `localSettings.json`. Then create a teams app in [Dev Portal](https://dev.teams.microsoft.com/apps) with this manifest.

## Supported placeholder in manifest.remote.template.json

- `{{state.xx}}` is pre-defined placeholder whose value is resolved by Teams Toolkit, defined in `state.{env}.json`. You should not modify the values in state.{env}.json.
- `{{config.manifest.xx}}` is customized placeholder whose value is resolved from `config.{env}.json`.
  - You can add a customized parameter by following
    - Add a placeholder in manifest.remote.template.json with pattern: `{{config.manifest.xx}}`
    - Add a config value in config.{env}.json

        ```json
        {
            "manifest": {
                "KEY": "VALUE"
            }
        }
        ```

    Besides each config placeholder in `manifest.remote.template.json`, there is a `Go to config file` button. You can navigate to configuration file by clicking it.

    ![go to config file](./images/gotoconfigfile.png)

## Supported placeholder in manifest.local.template.json

`{{localSettings.xx}}` is pre-defined placeholder whose value is resolved by Teams Toolkit, defined in `localSettings.json`. You should not modify the values in localSettings.json

 > [!NOTE]
> Customization of local manifest is not suggested.

## See Also

> [!div class="nextstepaction"]
> [Preview Teams App Manifest in Teams Toolkit](TeamsFx-manifest-preview.md)
