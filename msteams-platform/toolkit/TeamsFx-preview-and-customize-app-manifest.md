---
title: Customize Teams App Manifest in Teams Toolkit
author: surbhigupta
description: In this module, learn how to edit, preview and customize Teams App Manifest in different environment.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
zone_pivot_groups: teams-app-platform
---

# Customize Teams app manifest

The Teams app manifest describes how your app integrates into Teams. After scaffolding, the default manifest file is available at `appPackage/manifest.json`. The manifest file contains some environment variables with format of `${{XX_XX}}`, and the actual values are resolved by Teams Toolkit with env files like `env/.env.dev` and `env/.env.local`.

To preview manifest with actual content, Teams Toolkit generates preview manifest files under `appPackage/build` folder:

```text
└───appPackage
    └───build
        ├───appPackage.{env}.zip - Zipped app package of remote Teams app
        ├───appPackage.local.zip - Zipped app package of local Teams app
        ├───manifest.{env}.json  - Previewed manifest of remote Teams app
        └───manifest.local.json  - Previewed manifest of local Teams app
```

You can preview the manifest file in local and remove environments.

<br>

<details>

<b><summary>Preview manifest file in local environment</b></summary>

To preview manifest file in local environment, you can press F5 to run local debug. After generating environment variables in `env/.env.local`, the app package and preview manifest will be built under `appPackage/build` folder.

You can also trigger `Zip Teams App Package` from treeview or Teams: Zip Teams app Package from command palette to generate preview manifest and app package.

[Image]

<br>

</details>

<details>

<b><summary>Preview manifest file in remote environment</b></summary>

To preview manifest file in remote environment, you can trigger `Provision` from treeview or `Teams: Provision in the cloud` from command palette. It generates environment variables for remote Teams app, build app package and preview manifest under `appPackage/build` folder.

You can also trigger Zip Teams App Package from treeview or `Teams: Zip Teams app Package` from command palette to generate preview manifest and app package.

[Image]

## Customize Teams app manifest for Visual Studio Code

During local debug or provision, Teams Toolkit loads manifest from `appPackage/manifest.json`, and resolve manifest by environment variales defined in `env/.env.xx`, then creates or updates Teams app in [Teams Developer Portal](https://dev.teams.microsoft.com/home).

1. You can define your own manifest.json file in `teamsapp.yml` and `teamsapp.local.yml`.
For example, you can put your manifest.json file in `test/test.json`, and update `manifestPath` parameters in yaml files.

```text
  - uses: teamsApp/zipAppPackage # Build Teams app package with latest env value
    with:
      manifestPath: ./test/test.json # Path to manifest template
      outputZipPath: ./appPackage/build/appPackage.${{TEAMSFX_ENV}}.zip
      outputJsonPath: ./appPackage/build/manifest.${{TEAMSFX_ENV}}.json
```

1. You can define your own environment variables. The default manifest.json contains some placeholders with format of ${{xx_xx}}. You can define your own environment variables, and add placeholders in manifest.json file.
For example, you can customize app description by defining a new environment variable in env/.env.xx file, and update manifest.json with corresponding placeholder.

[.env.dev]

```text
TEAMS_APP_DESCRIPTION=This is an amazing app
```

[manifest.json]

```text
{
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
    "manifestVersion": "1.16",
    "description": {
        "short": "${{TEAMS_APP_DESCRIPTION}}",
        "full": "Full description of tab0418"
    },
}
```

## Validate Application

After customization, you may want to validate your manifest or app package. You can trigger `Validate Application` from Treeview, or `Teams: ValidateApplication` from command palette. There are two options, `Validate using manifest schema` or `Validate app package using validation rules`.

[Image]

Validate using manifest schema

This option renders `appPackage/manifest.json` with environment variables, and then validate your manifest with its schema.

[Image]

CLI command:

```text
teamsfx validate --manifest-path YOUR-PATH-TO-MANIFEST
```

If you meet `MissingEnvironmentVariablesError`, it means that Teams Toolkit cannot find corresponding environment variables defined in manifest.json. You may need to run Provision or F5 to generate environment variables, or manually update `.env.xx` file to fullfil the value.

[Image]

Validate app package using validation rules

This option validates the zipped app package with validation rules.

[Image]

CLI command:

```text
teamsfx validate --app-package-file-path YOUR-PATH-TO-APP-PACKAGE
```

It has additional validation rules than manifest schema. For example, if static tab section has entityId "conversations" and name, the following error appears:

[Image]

## Update Teams app

After you've previewed and validated the manifest file, you can sync your local changes to Teams Developer Portal by triggering `Teams: Update Teams app` command from command palette:

[Image]

CLI command:

```text
teamsfx update teams-app
```

> [!NOTE]
> The change is reflected in Developer Portal. Any manual updates in Developer Portal are overwritten.

If the manifest file is outdated due to configuration file change or template change, select any one of the following actions:

* Preview only: Local manifest file is overwritten according to current configuration.
* Preview and update: Local manifest file is overwritten according to current configuration and also updated to Teams platform.
* Cancel: No action is taken.

## To preview values for local and dev environment

In `appPackage/manifest.json`, you can go to CodeLens to preview the values for `local` and `dev` environment.

[Image]

> [!NOTE]
> Provision the environment or execute local debug to generate environment variables.

You can go to .env file by selecting the CodeLens, which provide a dropdown list with all the environment names. After selecting one environment, the corresponding .env file opens.

[Image]

To preview values for all the environment, you can hover over the placeholder. It shows a list with environment names and corresponding values. If you haven't provisioned the environment or executed the local debug, the environment variable may not exist. Select `Trigger Teams: Provision in the cloud command to see placeholder value` or `Trigger local debug to see placeholder value`.

[Image]

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md).
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Public developer preview for Microsoft Teams](../resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
