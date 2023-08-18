---
title: Customize App Manifest in Teams Toolkit
author: surbhigupta
description: In this module, learn how to edit, preview, and customize App Manifest in different environment.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
zone_pivot_groups: teams-toolkit-platform
---

# Customize app manifest

::: zone pivot="visual-studio-code-v5"

The app manifest (previously called Teams app manifest) describes how your app integrates into Teams. After scaffolding, the default app manifest file is available at `appPackage/manifest.json`. The app manifest file contains some environment variables with format of `${{XX_XX}}`, and the actual values are resolved using Teams Toolkit with env files like `env/.env.dev` and `env/.env.local`.

To preview app manifest with actual content, Teams Toolkit generates preview app manifest files under `appPackage/build` folder:

```text
└───appPackage
    └───build
        ├───appPackage.{env}.zip - Zipped app package of remote Teams app
        ├───appPackage.local.zip - Zipped app package of local Teams app
        ├───manifest.{env}.json  - Previewed manifest of remote Teams app
        └───manifest.local.json  - Previewed manifest of local Teams app
```

You can preview the app manifest file in local and remove environments.

## Preview app manifest file in local environment

To preview app manifest file in local environment, you can press F5 to run local debug. After you generate the environment variables in `env/.env.local`, the app package and preview app manifest is built under `appPackage/build` folder.

You can also trigger `Zip Teams App Package` from tree view or `Teams: Zip Teams app Package` from command palette to generate previewed app manifest and app package.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/zip-app-package.png" alt-text="Screenshot showing the selection of zip Teams App package.":::

## Preview app manifest file in remote environment

To preview app manifest file in remote environment, you can trigger `Provision` from tree view or `Teams: Provision in the cloud` from command palette. It generates environment variables for remote Teams app, build app package and preview app manifest under `appPackage/build` folder.

You can also trigger Zip Teams App Package from tree view or `Teams: Zip Teams app Package` from command palette to generate preview app manifest and app package.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/zip-app-package (1).png" alt-text="Screenshot showing the selection of zip Teams app package in preview app manifest file.":::

## Customize app manifest for Visual Studio Code

During local debug or provision, Teams Toolkit loads app manifest from `appPackage/manifest.json`, and resolves app manifest by environment variables defined in `env/.env.xx`, then creates or updates Teams app in [Teams Developer Portal](https://dev.teams.microsoft.com/home).

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

After customization, you may want to validate your app manifest or app package. You can trigger `Validate Application` from tree view, or `Teams: ValidateApplication` from command palette. There are two options, `Validate using manifest schema` or `Validate app package using validation rules`.

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validate-application.png" alt-text="Screenshot showing the selection of validate application under utility.":::

### Validate using app manifest schema

This option renders `appPackage/manifest.json` with environment variables, and then validates your app manifest with its schema.

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

It has additional validation rules than app manifest schema. For example, if static tab section has entityId "conversations" and name, the following error appears:

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/validation-output.png" alt-text="Screenshot showing the validation output.":::

## Update Teams app

After you've previewed and validated the app manifest file, you can sync your local changes to Teams Developer Portal by triggering `Teams: Update Teams app` command from command palette:

:::image type="content" source="../assets/images/teams-toolkit-v2/customize app manifest/update-teams-app.png" alt-text="Screenshot showing the selection of Teams update Teams app.":::

CLI command:

```text
teamsfx update teams-app
```

> [!NOTE]
> The change is reflected in Developer Portal. Any manual updates in Developer Portal are overwritten.

If the app manifest file is outdated due to configuration file change or template change, select any one of the following actions:

* Preview only: Local app manifest file is overwritten according to current configuration.
* Preview and update: Local app manifest file is overwritten according to current configuration and also updated to Teams platform.
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

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md).
* [App manifest schema](../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
* [Public developer preview for Microsoft Teams](../resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio Code](provision-cloud-resources.md)

::: zone-end

::: zone pivot="visual-studio-code-v4"
> [!IMPORTANT]
>
> We've introduced the [Teams Toolkit v5](teams-toolkit-fundamentals.md#teams-toolkit-overview) extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> Teams Toolkit v4 extension will soon be deprecated.

## Customize app manifest for Visual Studio Code

The app manifest describes how your app integrates into Teams. The app manifest template file `manifest.template.json` is available under `templates/appPackage` folder after scaffolding. The template file with placeholders, and the actual values are resolved by Teams Toolkit using files under `.fx/configs` and `.fx/states` for different environments.

To preview app manifest with actual content, Teams Toolkit generates preview app manifest files under `build/appPackage` folder:

```text
└───build
    └───appPackage
        ├───appPackage.{env}.zip - Zipped app package of remote Teams app
        ├───appPackage.local.zip - Zipped app package of local Teams app
        ├───manifest.{env}.json  - Previewed manifest of remote Teams app
        └───manifest.local.json  - Previewed manifest of local Teams app
```

You can preview the app manifest file in local and remote environments.

<br>

<details>

<b><summary>Preview app manifest file in local environment</b></summary>

To preview app manifest file in local environment, you can press **F5** to run local debug. After generating default local settings, the app package and preview app manifest builds under `build/appPackage` folder.

You can preview local app manifest file by two methods:

* Use preview option in CodeLens.
* Use **Zip Teams metadata package** option.

The following steps help to preview local app manifest file by using preview option in CodeLens:

1. Select **Preview** in the CodeLens of `manifest.template.json` file.

   :::image type="content" source="toolkit-v4/images/preview-23-v4.png" alt-text="Screenshot is an example showing the preview in the CodeLens of manifest file." lightbox="toolkit-v4/images/preview-23-v4.png":::

1. Select **local**.

   :::image type="content" source="toolkit-v4/images/select-env1-v4.png" alt-text="Screenshot is an example of showing the selection of local in the environment.":::

To preview local app manifest file by using **Zip Teams metadata package** option:

1. Select `manifest.template.json` file.

   :::image type="content" source="toolkit-v4/images/select-manifest-json-v4.png" alt-text="Screenshot is an example of showing the selection of manifest.template.json.":::

1. Select the Teams Toolkit :::image type="icon" source="toolkit-v4/images/teams-toolkit-sidebar-icon-v4.PNG"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Zip Teams metadata package** under **DEPLOYMENT**.

   :::image type="content" source="toolkit-v4/images/teams-metadata-package-v4.png" alt-text="Screenshot is an example of showing the selection of zip Teams metadata package.":::

1. Select **local**.

   :::image type="content" source="toolkit-v4/images/select-env1-v4.png" alt-text="Screenshot is an example of showing the selection of local in the environment.":::

Following is a preview local image:

:::image type="content" source="toolkit-v4/images/preview-23-v4.png" alt-text="Screenshot is an example of showing the preview of local." lightbox="toolkit-v4/images/preview-23-v4.png":::

<br>

</details>

<details>

<b><summary>Preview app manifest file in remote environment</b></summary>

To preview app manifest file using Visual Studio Code:

* Select **Provision in the cloud** under **DEPLOYMENT** in Teams Toolkit.
  
   :::image type="content" source="toolkit-v4/images/provision-v4.png" alt-text="Screenshot is an example of showing the selection of provision in the cloud resource.":::

* To preview the app manifest file using command palette. You can trigger **Teams: Provision in the cloud** from command palette.

   :::image type="content" source="toolkit-v4/images/command palatte-v4.png" alt-text="Screenshot is an example of showing provision cloud resource using command palette.":::

It generates configuration for remote Teams app, builds package, and preview app manifest under `build/appPackage` folder.

You can preview app manifest file in remote environment by two methods:

* Use preview option in CodeLens.
* Use **Zip Teams metadata package** option.

To preview app manifest file by using preview option in CodeLens:

1. Select **Preview** in the CodeLens of `manifest.template.json` file.

   :::image type="content" source="toolkit-v4/images/preview-23-v4.png" alt-text="Screenshot is an example of showing preview in the CodeLens of manifest file." lightbox="toolkit-v4/images/preview-23-v4.png":::

1. Select your environment.

   :::image type="content" source="toolkit-v4/images/manifest preview-1-v4.png" alt-text="Screenshot is an example of showing the adding of environment.":::

   > [!NOTE]
   > If there are more than one environment, you need to select the environment you want to preview.

To preview app manifest file by selecting **Zip Teams metadata package** in remote environment:

1. Select `manifest.template.json` file.

   :::image type="content" source="toolkit-v4/images/select-manifest-json-v4.png" alt-text="Screenshot is an example of showing the selection of manifest.template.json.":::

1. Select the **Teams Toolkit** :::image type="icon" source="toolkit-v4/images/teams-toolkit-sidebar-icon-v4.PNG"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Zip Teams metadata package** under **DEPLOYMENT**.

   :::image type="content" source="toolkit-v4/images/teams-metadata-package-v4.png" alt-text="Screenshot is an example of showing the selection of zip Teams metadata package.":::

1. Select your environment.

   :::image type="content" source="toolkit-v4/images/manifest preview-1-v4.png" alt-text="Screenshot is an example of showing the adding of environment.":::

   > [!NOTE]
   > If there are more than one environment, you need to select the environment you want to preview.

</details>

## Sync local changes to Developer Portal

After previewing the app manifest file, you can sync your local changes to Developer Portal by the following ways:

1. Deploy app manifest.

   You can deploy app manifest in any of the following ways:

   * Right-click the `manifest.template.json` file, and select **Deploy Teams app manifest** from context menu.

      :::image type="content" source="toolkit-v4/images/deploy-manifest-v4.png" alt-text="Screenshot is an example of showing the selection of deploy app manifest.":::

   * Trigger **Teams: Deploy Teams app manifest** by selecting it from the command palette.

      :::image type="content" source="toolkit-v4/images/deploy-command-v4.png" alt-text="Screenshot is an example of showing the deploy from command palette.":::

2. Update to Teams platform.

   You can update to Teams platform in any of the following ways:

   * Select **Update to Teams platform** on the upper left-corner of `manifest.{env}.json`.

   * Trigger **Teams: Update manifest to Teams platform** on the menu bar of `manifest.{env}.json`. The following image shows dev environment:

      :::image type="content" source="toolkit-v4/images/update-to-teams-v4.png" alt-text="Screenshot is an example of showing the update to Teams platform on the menu bar of manifest." lightbox="toolkit-v4/images/update-to-teams-v4.png":::

You can also trigger **Teams: Update manifest to Teams platform** from the command palette:

:::image type="content" source="toolkit-v4/images/pre-v4.png" alt-text="Screenshot is an example of showing the selection of Teams: update app manifest to Teams platform from the command palette.":::

> [!NOTE]
>
> * The Trigger from editor CodeLens or menu bar updates current app manifest file to Teams platform.
> * The Trigger from command palette requires selecting target environment.

 CLI command:

``` bash
        teamsfx deploy manifest --include-app-manifest yes
```

---

> [!NOTE]
> The change is reflected in Developer Portal. Any manual updates in Developer Portal are overwritten.

If the app manifest file is outdated due to configuration file change or template change, select any one of the following actions:

* **Preview only**: Local app manifest file is overwritten according to current configuration.
* **Preview and update**: Local app manifest file is overwritten according to current configuration and also updated to Teams platform.
* **Cancel**: No action is taken.

:::image type="content" source="toolkit-v4/images/manifest preview -3-v4.png" alt-text="Screenshot is an example of showing,the navigation to select preview only, preview and update and cancel options when the app manifest file is outdated due to configuration or template change.":::

## Customize your app manifest

Teams Toolkit consists of the following app manifest template files under `manifest.template.json` folder across local and remote environments:

* `manifest.template.json`
* `templates/appPackage`

During the local debug or provision, Teams Toolkit loads app manifest from `manifest.template.json` with the configurations from `state.{env}.json`, `config.{env}.json`, and creates Teams app in [Developer Portal](https://dev.teams.microsoft.com/apps).

### Supported placeholders in manifest.template.json

The following list provides supported placeholders in `manifest.template.json`:

* `{{state.xx}}` is pre-defined placeholder, and it's value is resolved by Teams Toolkit defined in `state.{env}.json`. Ensure not to modify the values in `state.{env}.json`.
* `{{config.manifest.xx}}` is a customized placeholder and it's value is resolved from `config.{env}.json`.

**To add customized parameter**

1. Add customized parameter as follows:</br>
   a. Add a placeholder in `manifest.template.json` with pattern `{{config.manifest.xx}}`.</br>
   b. Add a config value in `config.{env}.json`.

     ```json
     {
         "manifest": {
          "KEY": "VALUE"
          }
     }
     ```

2. You can go to configuration file by selecting any one of the config placeholders **Go to config file** or **View the state file** in `manifest.template.json`.

### Validate app manifest

During operations such as **Zip Teams metadata package**, Teams Toolkit validates the app manifest against its schema. The following list provides different ways to validate app manifest:

* In Visual Studio Code, trigger **Teams: Validate manifest file** from command palette:

  :::image type="content" source="toolkit-v4/images/validate-v4.png" alt-text="Screenshot is an example of showing Teams validate app manifest file from command palette.":::

* In CLI, use command:

     ``` bash
        teamsfx validate --env local
        teamsfx validate --env dev
        ```

---

## To preview values for local and dev environment

In `manifest.template.json`, you can go to CodeLens to preview the values for `local` and `dev` environment.

:::image type="content" source="toolkit-v4/images/codelens-v4.png" alt-text="Screenshot is an example of showing preview values for local and dev environment." lightbox="toolkit-v4/images/codelens-v4.png":::

> [!NOTE]
> Provision the environment or execute local debug to generate values for placeholders.

You can go to state file or configuration file by selecting the CodeLens, which provides a drop down list with all the environment names. After selecting one environment, the corresponding state file or configuration file opens.

:::image type="content" source="toolkit-v4/images/select-environment-v4.png" alt-text="Screenshot is an example of showing the selection of an environment.":::

To preview values for all the environments, you can hover over the placeholder. It shows a list with environment names and corresponding values. If you haven't provisioned the environment or executed the local debug, select `Trigger Teams: Provision in the cloud command to see placeholder value` or `Trigger local debug to see placeholder value`.

:::image type="content" source="toolkit-v4/images/hover-v4.png" alt-text="Screenshot is an example of showing the preview values for all environments.":::

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md).
* [App manifest schema](../resources/schema/manifest-schema.md)
* [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md)
* [Environments in Teams Toolkit](TeamsFx-multi-env.md)
* [Public developer preview for Microsoft Teams](../resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio Code](provision-cloud-resources.md)

::: zone-end
