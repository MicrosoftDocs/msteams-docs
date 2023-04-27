---
title: Customize Teams App Manifest in Teams Toolkit v4
author: surbhigupta
description: In this module, learn how to edit, preview and customize Teams App Manifest in different environment in Teams Toolkit v4.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
zone_pivot_groups: teams-app-platform
---

# Customize Teams app manifest in Teams Toolkit v4

::: zone pivot="visual-studio-code"

## Customize Teams app manifest for Visual Studio Code

The Teams app manifest describes how your app integrates into Teams. The manifest template file `manifest.template.json` is available under `templates/appPackage` folder after scaffolding. The template file with placeholders, and the actual values are resolved by Teams Toolkit using files under `.fx/configs` and `.fx/states` for different environments.

To preview manifest with actual content, Teams Toolkit generates preview manifest files under `build/appPackage` folder:

```text
└───build
    └───appPackage
        ├───appPackage.{env}.zip - Zipped app package of remote Teams app
        ├───appPackage.local.zip - Zipped app package of local Teams app
        ├───manifest.{env}.json  - Previewed manifest of remote Teams app
        └───manifest.local.json  - Previewed manifest of local Teams app
```

You can preview the manifest file in local and remote environments.

<br>

<details>

<b><summary>Preview manifest file in local environment</b></summary>

To preview manifest file in local environment, you can press **F5** to run local debug. After generating default local settings, the app package and preview manifest builds under `build/appPackage` folder.

You can preview local manifest file by two methods:

* Use preview option in CodeLens.
* Use **Zip Teams metadata package** option.

The following steps help to preview local manifest file by using preview option in CodeLens:

1. Select **Preview** in the CodeLens of `manifest.template.json` file.

   :::image type="content" source="images/preview-23-v4.png" alt-text="Screenshot is an example showing the preview in the CodeLens of manifest file." lightbox="images/preview-23-v4.png":::

1. Select **local**.

   :::image type="content" source="images/select-env1-v4.png" alt-text="Screenshot is an example of showing the selection of local in the environment.":::

To preview local manifest file by using **Zip Teams metadata package** option:

1. Select `manifest.template.json` file.

   :::image type="content" source="images/select-manifest-json-v4.png" alt-text="Screenshot is an example of showing the selection of manifest.template.json.":::

1. Select the Teams Toolkit :::image type="icon" source="images/teams-toolkit-sidebar-icon-v4.PNG"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Zip Teams metadata package** under **DEPLOYMENT**.

   :::image type="content" source="images/teams-metadata-package-v4.png" alt-text="Screenshot is an example of showing the selection of zip Teams metadata package.":::

1. Select **local**.

   :::image type="content" source="images/select-env1-v4.png" alt-text="Screenshot is an example of showing the selection of local in the environment.":::

Following is a preview local image:

:::image type="content" source="images/preview-23-v4.png" alt-text="Screenshot is an example of showing the preview of local." lightbox="images/preview-23-v4.png":::

<br>

</details>

<details>

<b><summary>Preview manifest file in remote environment</b></summary>

To preview manifest file using Visual Studio Code:

* Select **Provision in the cloud** under **DEPLOYMENT** in Teams Toolkit.
  
   :::image type="content" source="images/provision-v4.png" alt-text="Screenshot is an example of showing the selection of provision in the cloud resource.":::

* To preview the manifest file using command palette. You can trigger **Teams: Provision in the cloud** from command palette.

   :::image type="content" source="images/command palatte-v4.png" alt-text="Screenshot is an example of showing provision cloud resource using command palette.":::

It generates configuration for remote Teams app, builds package, and preview manifest under `build/appPackage` folder.

You can preview manifest file in remote environment by two methods:

* Use preview option in CodeLens.
* Use **Zip Teams metadata package** option.

To preview manifest file by using preview option in CodeLens:

1. Select **Preview** in the CodeLens of `manifest.template.json` file.

   :::image type="content" source="images/preview-23-v4.png" alt-text="Screenshot is an example of showing preview in the CodeLens of manifest file." lightbox="images/preview-23-v4.png":::

1. Select your environment.

   :::image type="content" source="images/manifest preview-1-v4.png" alt-text="Screenshot is an example of showing the adding of environment.":::

   > [!NOTE]
   > If there are more than one environment, you need to select the environment you want to preview.

To preview manifest file by selecting **Zip Teams metadata package** in remote environment:

1. Select `manifest.template.json` file.

   :::image type="content" source="images/select-manifest-json-v4.png" alt-text="Screenshot is an example of showing the selection of manifest.template.json.":::

1. Select the **Teams Toolkit** :::image type="icon" source="images/teams-toolkit-sidebar-icon-v4.PNG"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Zip Teams metadata package** under **DEPLOYMENT**.

   :::image type="content" source="images/teams-metadata-package-v4.png" alt-text="Screenshot is an example of showing the selection of zip Teams metadata package.":::

1. Select your environment.

   :::image type="content" source="images/manifest preview-1-v4.png" alt-text="Screenshot is an example of showing the adding of environment.":::

   > [!NOTE]
   > If there are more than one environment, you need to select the environment you want to preview.

</details>

## Sync local changes to Developer Portal

After previewing the manifest file, you can sync your local changes to Developer Portal by the following ways:

1. Deploy Teams app manifest.

   You can deploy Teams app manifest in any of the following ways:

   * Right-click the `manifest.template.json` file, and select **Deploy Teams app manifest** from context menu.

      :::image type="content" source="images/deploy-manifest-v4.png" alt-text="Screenshot is an example of showing the selection of deploy Teams app manifest.":::

   * Trigger **Teams: Deploy Teams app manifest** by selecting it from the command palette.

      :::image type="content" source="images/deploy-command-v4.png" alt-text="Screenshot is an example of showing the deploy from command palette.":::

2. Update to Teams platform.

   You can update to Teams platform in any of the following ways:

   * Select **Update to Teams platform** on the upper left-corner of `manifest.{env}.json`.

   * Trigger **Teams: Update manifest to Teams platform** on the menu bar of `manifest.{env}.json`. The following image shows dev environment:

      :::image type="content" source="images/update-to-teams-v4.png" alt-text="Screenshot is an example of showing the update to Teams platform on the menu bar of manifest." lightbox="images/update-to-teams-v4.png":::

You can also trigger **Teams: Update manifest to Teams platform** from the command palette:

:::image type="content" source="images/pre-v4.png" alt-text="Screenshot is an example of showing the selection of Teams: update manifest to Teams platform from the command palette.":::

> [!NOTE]
>
> * The Trigger from editor CodeLens or menu bar updates current manifest file to Teams platform.
> * The Trigger from command palette requires selecting target environment.

 CLI command:

``` bash
        teamsfx deploy manifest --include-app-manifest yes
```

---

> [!NOTE]
> The change is reflected in Developer Portal. Any manual updates in Developer Portal are overwritten.

If the manifest file is outdated due to configuration file change or template change, select any one of the following actions:

* **Preview only**: Local manifest file is overwritten according to current configuration.
* **Preview and update**: Local manifest file is overwritten according to current configuration and also updated to Teams platform.
* **Cancel**: No action is taken.

:::image type="content" source="images/manifest preview -3-v4.png" alt-text="Screenshot is an example of showing,the navigation to select preview only, preview and update and cancel options when the manifest file is outdated due to configuration or template change.":::

## Customize your Teams app manifest

Teams Toolkit consists of the following manifest template files under `manifest.template.json` folder across local and remote environments:

* `manifest.template.json`
* `templates/appPackage`

During the local debug or provision, Teams Toolkit loads manifest from `manifest.template.json` with the configurations from `state.{env}.json`, `config.{env}.json`, and creates Teams app in [Developer Portal](https://dev.teams.microsoft.com/apps).

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

### Validate manifest

During operations such as **Zip Teams metadata package**, Teams Toolkit validates the manifest against its schema. The following list provides different ways to validate manifest:

* In Visual Studio Code, trigger **Teams: Validate manifest file** from command palette:

  :::image type="content" source="images/validate-v4.png" alt-text="Screenshot is an example of showing Teams validate manifest file from command palette.":::

* In CLI, use command:

     ``` bash
        teamsfx validate --env local
        teamsfx validate --env dev
        ```

---

## To preview values for local and dev environment

In `manifest.template.json`, you can go to CodeLens to preview the values for `local` and `dev` environment.

:::image type="content" source="images/codelens-v4.png" alt-text="Screenshot is an example of showing preview values for local and dev environment." lightbox="images/codelens-v4.png":::

> [!NOTE]
> Provision the environment or execute local debug to generate values for placeholders.

You can go to state file or configuration file by selecting the CodeLens, which provides a drop down list with all the environment names. After selecting one environment, the corresponding state file or configuration file opens.

:::image type="content" source="images/select-environment-v4.png" alt-text="Screenshot is an example of showing the selection of an environment.":::

To preview values for all the environments, you can hover over the placeholder. It shows a list with environment names and corresponding values. If you haven't provisioned the environment or executed the local debug, select `Trigger Teams: Provision in the cloud command to see placeholder value` or `Trigger local debug to see placeholder value`.

:::image type="content" source="images/hover-v4.png" alt-text="Screenshot is an example of showing the preview values for all environments.":::

::: zone-end

::: zone pivot="visual-studio"

## Customize Teams app manifest using Visual Studio

Teams Toolkit in Visual Studio loads manifest from `manifest.template.json` with configurations from `state.{env}.json` and `config.{env}.json` while provisioning and preparing app dependencies. You can also create Teams app in Developer Portal with manifest.

After scaffolding, in the manifest template file under `templates/appPackage` folder,
`manifest.template.json` is shared between local and remote environment.

In the manifest template, select **Project** > **Teams Toolkit** > **Open Manifest File**.

:::image type="content" source="images/vs-open-manifest-v4.png" alt-text="Screenshot is an example of showing the navigation to open manifest file." lightbox="images/vs-open-manifest-v4.png":::

### Customize app manifest in Teams Toolkit

The following list provides two types of placeholders in `manifest.template.json`:

* `{{state.xx}}` is pre-defined placeholder, whose value is resolved by Teams Toolkit defined in `state.{env}.json`. Its recommended not to modify the values in `state.{env}.json`.
* `{{config.manifest.xx}}` is customized placeholder, whose value is resolved from `config.{env}.json`.

You can add a customized parameter by:

* Adding a placeholder in `manifest.template.json` with pattern: `{{config.manifest.xx}}`.
* Adding a config value in `config.{env}.json`.

    ```JSON
        {
            "manifest": {
            "KEY": "VALUE"
            }
    }
    ```

### Preview app manifest in Teams Toolkit

You can preview values in app manifest in two ways:

* When you hover over the placeholder in `manifest.template.json`, you can see the values for **dev** and **local** environment.

   :::image type="content" source="images/vs-hover-placeholder1-v4.png" alt-text="Screenshot is an example showing when you hover over placeholder, can view the values for dev and local environment." lightbox="images/vs-hover-placeholder1-v4.png":::

* You can also hover over the key beside each placeholder in `manifest.template.json`, where you can see the same values for **dev** and **local** environment.

   :::image type="content" source="images/vs-hover-key-placeholder-v4.png" alt-text="Screenshot is an example showing when you hover over key beside placeholder can view the same values for dev and local environment." lightbox="images/vs-hover-key-placeholder-v4.png":::

If the environment has not been provisioned, or the Teams app dependencies have not been prepared, it indicates that the values for the placeholder have not been generated. You can follow the guidance inside the hover to generate corresponding values.

### Preview manifest file

You can either sideload for local, or deploy for Azure to preview the manifest file. You can preview the manifest file by performing the following steps:

1. Select **Project** > **Teams Toolkit**.

1. Select to trigger **Prepare Teams App Dependencies** or **Provision in the Cloud** that generates configuration for either for local or remote Teams app.

   :::image type="content" source="images/vs-preview-manifest1-v4.png" alt-text="Screenshot is an example of showing preview manifest file." lightbox="images/vs-preview-manifest1-v4.png":::

There are two ways to upload zip app package before you can preview the manifest file:

1. From the list of menu select, **Project** > **Teams Toolkit**.

1. Select **Zip App Package**, then select either **For Local** or **For Azure**.

   :::image type="content" source="images/vs-zip1-v4.png" alt-text="Screenshot is an example of showing the navigation to zip app package for local and Azure." lightbox="images/vs-zip1-v4.png":::

1. You can also upload zip app package from **Solution Explorer** section, if you right-click on **MyTeamsApp1**. In this scenario the project name is MyTeamsApp1.

1. Select **Teams Toolkit** > **Zip App Package** > **For Local** or **For Azure**.

   :::image type="content" source="images/vs-solution-explorer1-v4.png" alt-text="Screenshot is an example of showing the list of Teams toolkit menus from solution explorer." lightbox="images/vs-solution-explorer1-v4.png":::

Teams Toolkit generates the zip app package, the following steps help to preview the manifest file:

1. Right-click on **manifest.template.json** file under **appPackage** folder.

1. Select **Preview Manifest File** > **For Local** or **For Azure**.

   :::image type="content" source="images/vs-preview1-v4.png" alt-text="Screenshot is an example of showing the preview manifest menu for local and Azure." lightbox="images/vs-preview1-v4.png":::

This displays the preview of the manifest file in Visual Studio.

### Sync local changes to Developer Portal

After you've previewed the manifest file in Visual Studio, you can sync the local changes to Developer Portal.

Select **Project** > **Teams Toolkit** > **Update Manifest in Teams Developer Portal**.

:::image type="content" source="images/vs-update-manifest1-v4.png" alt-text="Screenshot is an example of showing the navigation to update manifest in Teams developer portal." lightbox="images/vs-update-manifest1-v4.png":::

You can also sync the local changes to Developer Portal from the context menu of **Solution Explorer** section. After the local changes are synced, you can preview the manifest file in Developer Portal.

:::image type="content" source="images/vs-update-manifest2-v4.png" alt-text="Update manifest in Teams developer portal from solution explorer section":::

The changes are updated to Developer Portal.

> [!TIP]
>
> * Select **Overwrite and update** or **Cancel** from the **Warning** dialog box to make any manual updates that can be overwritten in Developer Portal.

:::image type="content" source="images/vs-overwrite-v4.png" alt-text="Screenshot is an example of showing the update warning." lightbox="images/vs-overwrite-v4.png":::

When you create a Teams command bot using Visual Studio, two app IDs are registered in Microsoft Azure Active Directory (Azure AD). You can identify the app IDs in the Developer Portal as **Application (client) ID** under **Basic information** and existing **bot ID** under **App features**.

:::image type="content" source="images/vs-dev-portal-basic-info-v4.png" alt-text="Developer portal showing basic info app id" lightbox="images/vs-dev-portal-basic-info-v4.png":::

:::image type="content" source="images/vs-dev-portal-app-features-v4.png" alt-text="Developer portal showing app feature bot id selection" lightbox="images/vs-dev-portal-app-features-v4.png":::

::: zone-end

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md)
* [Manage multiple environments](TeamsFx-multi-env-v4.md)
* [Public developer preview for Microsoft Teams](~/resources/dev-preview/developer-preview-intro.md)
* [Provision cloud resources using Visual Studio](provision-v4.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-v4.md#deploy-teams-app-to-the-cloud-using-visual-studio)
