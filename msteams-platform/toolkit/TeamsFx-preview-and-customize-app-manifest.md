---
title: Customize app manifest in Teams Toolkit
author: surbhigupta
description: Learn how to edit and preview app manifest in local and remote environments, customize app manifest in Visual Studio Code, and ways to validate and update app.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
---

# Customize app manifest

App manifest (previously called Teams app manifest) describes how your app integrates into Microsoft Teams. After scaffolding, the default app manifest file is available at `appPackage/manifest.json`. The app manifest file contains some environment variables with format of `${{XX_XX}}`, and the actual values are resolved using Microsoft Teams Toolkit with env files such as `env/.env.dev` and `env/.env.local`.

To preview app manifest with actual content, Teams Toolkit generates the preview app manifest files under `appPackage/build` folder as shown in the following folder structure:

```text
└───appPackage
    └───build
        ├───appPackage.{env}.zip - Zipped app package of remote Teams app
        ├───appPackage.local.zip - Zipped app package of local Teams app
        ├───manifest.{env}.json  - Previewed manifest of remote Teams app
        └───manifest.local.json  - Previewed manifest of local Teams app
```

You can preview the app manifest file in local and remote environments.

## Preview the app manifest file in local environment

To preview the app manifest file in local environment, select the F5 key to run local debug. After you generate the environment variables in `env/.env.local`, the app package and the preview app manifest are built under `appPackage/build` folder.

You can also trigger **Zip Teams App Package** from tree view or **Teams: Zip Teams App Package** from command palette to generate the preview app manifest and app package.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/zip-app-package.png" alt-text="Screenshot shows the selection of Zip Teams App Package.":::

## Preview the app manifest file in remote environment

To preview the app manifest file in remote environment, you can trigger **Provision** from tree view or **Teams: Provision** from command palette. It generates environment variables for remote Teams app, build app package and the preview app manifest under `appPackage/build` folder.

You can also trigger **Zip Teams App Package** from tree view or **Teams: Zip Teams App Package** from command palette to generate the preview app manifest and app package.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/zip-app-package (1).png" alt-text="Screenshot shows the option to zip the Teams app package.":::

## Customize app manifest in Visual Studio Code

During local debug or provision, Teams Toolkit loads app manifest from `appPackage/manifest.json` and resolves app manifest by environment variables defined in `env/.env.xx`, then creates or updates Teams app in [Developer Portal for Teams](https://dev.teams.microsoft.com/home).

1. You can define your own manifest.json file in `teamsapp.yml` and `teamsapp.local.yml`.
For example, you can put your manifest.json file in `test/test.json`, and update the `manifestPath` parameters in yaml files.

    ```text
    - uses: teamsApp/zipAppPackage # Build Teams app package with latest env value
      with:
      manifestPath: ./test/test.json # Path to manifest template
      outputZipPath: ./appPackage/build/appPackage.${{TEAMSFX_ENV}}.zip
      outputJsonPath: ./appPackage/build/manifest.${{TEAMSFX_ENV}}.json
    ```

1. You can define your own environment variables. The default manifest.json contains some placeholders with format of ${{xx_xx}}. You can define your own environment variables and add placeholders in the manifest.json file.
For example, you can customize app description by defining a new environment variable in env/.env.xx file, and update manifest.json with corresponding placeholder.

`.env.dev`

```text
    TEAMS_APP_DESCRIPTION=This is an amazing app
```

`manifest.json`

```json
    {
        "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
        "manifestVersion": "1.16",
        "description": {
            "short": "${{TEAMS_APP_DESCRIPTION}}",
            "full": "Full description of tab0418"
        },
    }
```

## Validate your app

After customization, you might want to validate your app manifest or app package. You can trigger **Validate Application** from tree view, or **Teams: Validate Application** from command palette. There are two options, **Validate using manifest schema** or **Validate app package using validation rules**.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validate-application.png" alt-text="Screenshot shows the selection of validate application under utility.":::

### Validate using the app manifest schema

This option renders `appPackage/manifest.json` with environment variables, and then validates your app manifest with its schema.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validate-schema.png" alt-text="Screenshot shows the selection of validate using manifest schema.":::

Alternatively, use the following Microsoft Teams Toolkit command line interface (Teams Toolkit CLI) command:

```bash
teamsfx validate --manifest-path <YOUR-PATH-TO-MANIFEST>
```

If you meet `MissingEnvironmentVariablesError`, it means that Teams Toolkit can't find corresponding environment variables defined in manifest.json. You may need to run **Provision** or select F5 to generate environment variables, or manually update `.env.xx` file to fulfill the value.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/missing-env.png" alt-text="Screenshot shows the missing environment variables error.":::

### Validate app package using validation rules

This option validates the zipped app package with validation rules.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validate-app-package.png" alt-text="Screenshot shows the selection of Validate app package using validation rules.":::

Alternatively, use the following Teams Toolkit CLI command:

```bash
teamsfx validate --app-package-file-path <YOUR-PATH-TO-APP-PACKAGE>
```

It has other validation rules than the app manifest schema. For example, if static tab section has entityId `conversations` and name, the following error appears:

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validation-output.png" alt-text="Screenshot shows the validation output." lightbox="../assets/images/teams-toolkit-v2/customize app manifest/validation-output.png":::

## Update Teams app

After you've previewed and validated the app manifest file, you can sync your local changes to Teams Developer Portal by triggering **Teams: Update Teams App** command from command palette.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/update-teams-app.png" alt-text="Screenshot shows the selection of Teams update Teams app.":::

Alternatively, use the following Teams Toolkit CLI command:

```bash
teamsfx update teams-app
```

> [!NOTE]
>
> * The change is reflected in Developer Portal. Any manual updates in Developer Portal are overwritten.
> * To change the name of the published app, you must modify both the `local.manifest` and `manifest.json` files.

If the app manifest file is outdated due to configuration file change or template change, select any one of the following actions:

* Preview only: Local app manifest file is overwritten according to current configuration.
* Preview and update: Local app manifest file is overwritten according to current configuration and also updated to Teams platform.
* Cancel: No action is taken.

## To preview values for local and dev environment

In `appPackage/manifest.json`, you can go to CodeLens to preview the values for `local` and `dev` environments.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/codelens-v5.png" alt-text="Screenshot shows the CodeLens v5.":::

> [!NOTE]
> Provision the environment or execute local debug to generate environment variables.

You can go to `.env` file by selecting CodeLens, which provides a dropdown list with all the environment names. After you select an environment, the corresponding `.env` file opens.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/select-env-with-local.png" alt-text="Screenshot shows the selection of dev environment.":::

To preview values for all the environments, you can hover over the placeholder. It shows a list of environment names and corresponding values. If you didn't provision the environment or execute local debug, the environment variables might not exist. Provision or debug the app locally to see the placeholder value.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/hover-v5.png" alt-text="Screenshot shows the placeholder when hovered displays a list with environment names and corresponding values.":::

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [App manifest schema](../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Public developer preview for Microsoft Teams](../resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio Code](provision-cloud-resources.md)
