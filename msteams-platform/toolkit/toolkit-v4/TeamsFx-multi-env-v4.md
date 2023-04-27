---
title: TeamsFX multiple environments in Teams Toolkit v4   
author: surbhigupta
description: In this module, learn about TeamsFX multi environment such as, create a new environment, select target environment and more in Teams Toolkit v4.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 11/29/2021
---

# Manage multiple environments in Teams Toolkit v4

 Teams Toolkit provides a simple way for you to create and manage multiple environments. You can use environments to provision resources and deploy artifacts to the target environment for your Microsoft Teams app.

 You can perform the following activities with environments:

1. **Test before production**: You can set up multiple environments, such as dev, test, and staging before publishing a Teams app to production environment in modern app development lifecycle.

2. **Manage app behaviors in different environments**: You can set up different app behaviors for multiple environments, such as enabling telemetry in the production environment.

   > [!NOTE]
   > Ensure that telemetry is disabled in the development environment.

## Create a new environment

Each project can have one **local** environment but multiple remote environments. After you create a project, Teams Toolkit configures the following default environments:

* **local** environment to represent the local machine environment configuration.
* **dev** environment to represent the remote or cloud environment configuration.

To create a new environment:

1. Open your Teams app project in Visual Studio Code.
2. Select the **Teams Toolkit** from the Visual Studio Code activity bar.
3. Select **+ Create new environment** under **ENVIRONMENT**.

   :::image type="content" source="images/create_new _env_1-v4.PNG" alt-text="Create new environment":::

   If you've more than one environment, you need to select an existing environment to create the new environment. The command copies the file contents of `config.<newEnv>.json` and `azure.parameters.<newEnv>.json` from the selected environment to the new environment that you’re creating.

## Target environment

Teams Toolkit prompts you to select a target environment when you've multiple remote environments.

:::image type="content" source="images/manifest preview-1_1-v4.png" alt-text="add env":::

## Project folder structure

After creating the project, you can view the project folders and files under **EXPLORER** in Visual Studio Code. Besides the custom codes, Teams Toolkit uses some files to maintain the `configs`, `states`, and `templates` of the app. The following list provides files and outlines their relationship with multiple environments:

* `.fx\configs`: Configuration files that the user can customize for the Teams app.
  * `config.<envName>.json`: Configuration file for the environment. This file exists for every environment individually.
  * `azure.parameters.<envName>.json`: Parameters file for Azure bicep provision for every environment.
  * `projectSettings.json`: Global project settings that apply to all environments.
* `.fx\states`: Teams Toolkit generates the provision output in this folder after you provision resources for your app.
  * `state.<envName>.json`: Provision output file for the environment. This file exists for every environment individually.
  * `<env>.userdata`: User data for the provision output for the environment. This file exists for every environment individually.
* `templates`
  * `appPackage`: App manifest template files.
  * `azure`: `bicep` template files.

## Customize resource provision

Teams Toolkit allows you to customize the resource provision in each environment by changing the configuration and template files.

The following table lists the common scenarios for customized resource provision:

| Scenarios | Location| Description |
| --- | --- | --- |
| Customize Azure Resource |`bicep` files under `templates\azure` `.fx\azure.parameters.<envName>.json` | [Customize ARM parameters and templates](provision-v4.md#customize-arm-template-files) |
| Reuse existing Microsoft Azure Active Directory (Azure AD) app for Teams app | `auth` section in`.fx\config.<envName>.json`|  [Use an existing Azure AD app for your Teams app](provision-v4.md#use-an-existing-azure-ad-app-for-your-teams-app) |
| Reuse existing Azure AD app for bot |`bot` section in`.fx\config.<envName>.json`| [Use an existing Azure AD app for your bot](provision-v4.md#use-an-existing-azure-ad-app-for-your-bot) |
| Skip adding user while provisioning SQL |`skipAddingSqlUser` property in`.fx\config.<envName>.json`| [Skip adding user for SQL database](provision-v4.md#skip-adding-user-for-sql-database) |
| Customize app manifest |`manifest.template.json` file is available under `templates\appPackage`| [Preview app manifest in Toolkit](TeamsFx-preview-and-customize-app-manifest-v4.md)|

## Scenarios

The following scenarios show how to customize the resource provision in different environments:
<br>

<br><details>
<summary><b>Scenario 1: Customize the Teams app name for different environments
</b></summary>

You can set the Teams app name to `myapp(dev)` for the default environment **dev** and `myapp(staging)` for the staging environment, **staging**. Here, myapp denotes the name of your app project or app name.

Steps for customization:

1. Open the configuration file `.fx\configs\config.dev.json`.
2. Update the value of the property `manifest` > `appName` > `short` to `myapp(dev)`.

  The updates to `.fx\configs\config.dev.json` are:

  ```json
  {
      "$schema": "https://aka.ms/teamsfx-env-config-schema",
      "description": "You can customize the TeamsFx config for different environments.   Visit https://aka.ms/teamsfx-env-config to learn more about this.",
      "manifest": {
          "appName": {
              "short": "myapp(dev)"
              ...
          }
      }
      ...
  }
  ```

3. Create a new environment and name it **staging**, if a staging environment doesn't exist.
4. Open the configuration file `.fx\configs\config.staging.json`.
5. Update the value of the property manifest > appname > short to `myapp(staging)`.
6. Run provision command on **dev** and **staging** environments to update the app name in remote environments.

   > [!NOTE]
   > For more information on running provision command with Teams Toolkit, see [how to provision using Teams Toolkit in Microsoft Visual Studio Code](provision-v4.md#provision-using-teams-toolkit-in-microsoft-visual-studio-code).

</details>

<details>
<summary><b>Scenario 2: Customize the Teams app description for different environments</b></summary>

You can define Teams app description for each environment:

* For the default environment **dev**, the description is **my app description for dev**.
* For the staging environment **staging**, the description is **my app description for staging**.

Follow these steps customizing the environment description:

1. Open the configuration file `.fx\configs\config.dev.json`.
2. Add a new property for `manifest` > `description` > `short` and enter its value as **my app description for dev**.

  The updates to `.fx\configs\config.dev.json` are:

  ```json
  {
      "$schema": "https://aka.ms/teamsfx-env-config-schema",
      "description": "You can customize the TeamsFx config for different environments.   Visit https://aka.ms/teamsfx-env-config to learn more about this.",
      "manifest": {
          ...
          "description": {
              "short": "`my app description for dev"
              ...
          }
      }
      ...
  }
  ```

3. Create a new environment and name it **staging**, if a staging environment doesn’t exist.
4. Open the configuration file `.fx\configs\config.staging.json`.
5. Add a new property as you did in config.dev.json and enter its value as **my app description for staging**.
6. Open Teams app manifest template `templates\appPackage\manifest.template.json`.
7. Update the value of property `description` > `short` to use the variable defined in configure files with braces. Use the  following syntax `{{config.manifest.description.short}}`.
  
    The updates to `manifest.template.json` are:

    ```json
    {
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
    "manifestVersion": "1.11",
    "version": "1.0.0",
    ...
    "description": {
      "short": "{{config.manifest.description.short}}", 
      ...
    },
    ...

    }

    ```

8. Run provision command against **dev** and **staging** environments to update the app name in remote environments.

   > [!NOTE]
   > For more information on running provision command with Teams Toolkit, see [how to provision using Teams Toolkit in Microsoft Visual Studio Code](provision-v4.md#provision-using-teams-toolkit-in-microsoft-visual-studio-code).

</details>

<details>
<summary><b>Scenario 3: Customize Teams app description for all environments</b></summary>

You can set the description of Teams app to **my app description** for all the environments.

Teams Toolkit shares the same Teams app manifest templates across all environments, you can update the description value in it for your target:

1. Open the Teams app manifest template `templates\appPackage\manifest.template.json`.
2. Update the value of the property `description` > `short` with the permanent string **my app description**.
  
    The updates to `manifest.template.json` are:

    ```json
    {
    "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
    "manifestVersion": "1.11",
    "version": "1.0.0",
    ...
    "description": {
      "short": "my app description",
      ...
    },
    ...
    }

    ```

3. Run the provision command against all environments to update the app name in remote environments.

</details>

<details>
<summary><b>Scenario 4: Customize Azure resources for different environments</b></summary>

You can customize Azure resources provisioned for each environment. For example, edit the environment corresponding to `.fx\configs\azure.parameters.{env}.json` file to specify an Azure Function name.

For more information on Bicep template and parameter files, see [how to provision cloud resources](provision-v4.md).
</details>

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [App manifest schema for Teams](~/resources/schema/manifest-schema.md)
* [Add more cloud resources](add-resource-v4.md)
* [Collaborate with other developers on Teams project](TeamsFx-collaboration-v4.md)
* [Test app behavior in different environment](test-app-behavior-v4.md)
