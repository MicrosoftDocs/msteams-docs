---
title: Customize Teams App Manifest in Teams Toolkit
author: surbhigupta
description: In this module, learn how to edit, preview, and customize Teams App Manifest in different environment.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
zone_pivot_groups: teams-app-platform
---

# Customize Teams app manifest in Teams Toolkit

:::zone pivot="visual-studio-code"

## Customize Teams app manifest for Visual Studio Code

The Teams app manifest describes how your app integrates into Teams. After scaffolding, the default manifest file is available at `appPackage/manifest.json`. The manifest file contains some environment variables with format of `${{XX_XX}}`, and the actual values are resolved using Teams Toolkit with env files like `env/.env.dev` and `env/.env.local`.

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

## Preview manifest file in local environment

To preview manifest file in local environment, you can press F5 to run local debug. After you generate the environment variables in `env/.env.local`, the app package and preview manifest is built under `appPackage/build` folder.

You can also trigger `Zip Teams App Package` from tree view or `Teams: Zip Teams app Package` from command palette to generate previewed manifest and app package.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/zip-app-package.png" alt-text="Screenshot showing the selection of zip Teams App package.":::

## Preview manifest file in remote environment

To preview manifest file in remote environment, you can trigger `Provision` from tree view or `Teams: Provision in the cloud` from command palette. It generates environment variables for remote Teams app, build app package and preview manifest under `appPackage/build` folder.

You can also trigger Zip Teams App Package from tree view or `Teams: Zip Teams app Package` from command palette to generate preview manifest and app package.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/zip-app-package (1).png" alt-text="Screenshot showing the selection of zip Teams app package in preview manifest file.":::

## Customize your Teams app manifest

During local debug or provision, Teams Toolkit loads manifest from `appPackage/manifest.json`, and resolves manifest by environment variables defined in `env/.env.xx`, then creates or updates Teams app in [Teams Developer Portal](https://dev.teams.microsoft.com/home).

1. You can define your own manifest.json file in `teamsapp.yml` and `teamsapp.local.yml`.
For example, you can put your manifest.json file in `test/test.json`, and update `manifestPath` parameters in yaml files.

    ```text
    - uses: teamsApp/zipAppPackage # Build Teams app package with latest env value
      with:
      manifestPath: ./test/test.json # Path to manifest template
      outputZipPath: ./appPackage/build/appPackage.${{TEAMSFX_ENV}}.zip
      outputJsonPath: ./appPackage/build/manifest.${{TEAMSFX_ENV}}.json
    ```

1. You can define your own environment variables. The default manifest.json contains some placeholders with format of ${{xx_xx}}. You can define your own environment variables and add placeholders in manifest.json file.
For example, you can customize app description by defining a new environment variable in env/.env.xx file, and update manifest.json with corresponding placeholder.

    `.env.dev`

    ```text
    TEAMS_APP_DESCRIPTION=This is an amazing app
    ```

    `manifest.json`

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

After customization, you may want to validate your manifest or app package. You can trigger `Validate Application` from tree view, or `Teams: ValidateApplication` from command palette. There are two options, `Validate using manifest schema` or `Validate app package using validation rules`.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validate-application.png" alt-text="Screenshot showing the selection of validate application under utility.":::

### Validate using manifest schema

This option renders `appPackage/manifest.json` with environment variables, and then validates your manifest with its schema.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validate-schema.png" alt-text="Screenshot showing the selection of validate using manifest schema.":::

CLI command:

```text
teamsfx validate --manifest-path YOUR-PATH-TO-MANIFEST
```

If you meet `MissingEnvironmentVariablesError`, it means that Teams Toolkit can't find corresponding environment variables defined in manifest.json. You may need to run Provision or F5 to generate environment variables, or manually update `.env.xx` file to fulfill the value.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/missing-env.png" alt-text="Screenshot showing the Missing Environment Variables Error.":::

**Validate app package using validation rules**

This option validates the zipped app package with validation rules.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validate-app-package.png" alt-text="Screenshot showing the selection of Validate app package using validation rules.":::

CLI command:

```text
teamsfx validate --app-package-file-path YOUR-PATH-TO-APP-PACKAGE
```

It has additional validation rules than manifest schema. For example, if static tab section has entityId "conversations" and name, the following error appears:

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validation-output.png" alt-text="Screenshot showing the validation output.":::

## Update Teams app

After you've previewed and validated the manifest file, you can sync your local changes to Teams Developer Portal by triggering `Teams: Update Teams app` command from command palette:

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/update-teams-app.png" alt-text="Screenshot showing the selection of Teams update Teams app.":::

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

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/codelens-v5.png" alt-text="Screenshot showing the codelens v5.":::

> [!NOTE]
> Provision the environment or execute local debug to generate environment variables.

You can go to `.env` file by selecting the CodeLens, which provide a dropdown list with all the environment names. After selecting one environment, the corresponding `.env` file opens.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/select-env-with-local.png" alt-text="Screenshot showing the selection of dev.":::

To preview values for all the environment, you can hover over the placeholder. It shows a list of environment names and corresponding values. If you haven't provisioned the environment or executed the local debug, the environment variable may not exist. Select `Trigger Teams: Provision in the cloud command to see placeholder value` or `Trigger local debug to see placeholder value`.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/hover-v5.png" alt-text="Screenshot showing the placeholder when hovered displays a list with environment names and corresponding values.":::
:::zone-end

:::zone pivot="visual-studio"

## Customize Teams app manifest for Visual Studio

Teams Toolkit in Visual Studio loads manifest from `appPackage/manifest.json` with environment variables from `env/.env.{env}` file while provisioning and preparing app dependencies. It's shared between local and remote environment.

### Customize app manifest in Teams Toolkit

The manifest file contains some environment variables with format of `${{XX_XX}}`. You can define your own environment variables, and add placeholders in `manifest.json` file. The following are the examples:

```env
TEAMS_APP_DESCRIPTION=This is an amazing app
```

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

### Preview manifest file

You can either sideload for local, or deploy for Azure to preview the manifest file. You can preview the manifest file by performing the following steps:

1. Select **Project** > **Teams Toolkit**.

1. Select to trigger **Prepare Teams App Dependencies** or **Provision in the Cloud** that generates environment variables for local or remote Teams app.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/provision-in-the-cloud.png" alt-text="Screenshot shows the app trigger in local or remote.":::

There are two ways to upload zip app package before you can preview the manifest file:

1. From the list of menu select, **Project** > **Teams Toolkit**.

1. Select **Zip App Package**, then select either **For Local** or **For Azure**.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/zip-app-package.png" alt-text="Screenshot shows the zip app package for local or azure.":::

1. You can also upload zip app package from **Solution Explorer** section, if you right-click on **MyTeamsApp8**. In this scenario the project name is MyTeamsApp8.

1. Select **Teams Toolkit** > **Zip App Package** > **For Local** or **For Azure**.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/solution-zip.png" alt-text="Screenshot shows the solution zip app package for local or azure.":::

Teams Toolkit generates the zip app package, the following steps help to preview the manifest file:

1. Right-click on the `manifest.json` file under `appPackage` folder.

1. Select **Preview Manifest File** > **For Local** or **For Azure**.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/preview-manifest.png" alt-text="Screenshot shows the preview of manifest.":::

This displays the preview of the manifest file under `appPackage/build` in Visual Studio.

### Sync local changes to Developer Portal

After you've previewed the manifest file in Visual Studio, you can sync the local changes to Developer Portal.

Select **Project** > **Teams Toolkit** > **Update Manifest in Teams Developer Portal**.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/update-teams-app.png" alt-text="Screenshot shows update manifest in teams developer portal.":::

You can also sync the local changes to Developer Portal from the context menu of **Solution Explorer** section. After the local changes are synced, you can preview the manifest file in Teams Developer Portal.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/solution-update-teams-app.png" alt-text="Screenshot shows solution update to teams app.":::

The changes are updated to Developer Portal.

>[!Tips] Select **Overwrite and update** from the **Warning** dialog box to make any manual updates that can be overwritten in Teams Developer Portal.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/vs-overwrite.png" alt-text="Screenshot shows overwrite of app in teams developer portal.":::

When you create a Teams command bot using Visual Studio, two app IDs are registered in Microsoft Azure Active Directory (Azure AD). You can identify the app IDs in the Developer Portal as **Application (client) ID** under **Basic information** and existing **bot ID** under **App features**.

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/vs-dev-portal-basic-info.png" alt-text="Screenshot shows basic information of the app in teams developer portal.":::

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-v5/vs-dev-portal-app-features.png" alt-text="Screenshot shows overwrite and update in teams developer portal.":::
:::zone-end

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md).
* [App manifest schema for Teams](../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Public developer preview for Microsoft Teams](../resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
