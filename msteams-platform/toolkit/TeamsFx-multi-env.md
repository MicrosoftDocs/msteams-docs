---
title: Manage Multiple Environments in Teams Toolkit
author: yanliang
description:  Manage Multiple Environments
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Manage Multiple Environments in Teams Toolkit

 Teams Toolkit provides a simple way for developers to easily create and manage multiple environments, and deploy artifacts to a target environment for a Teams App.

## Prerequisites

[Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

## Why do you need multiple environments?

1. **Test before production**: It is a common practice to setup multiple environments (e.g. dev, test, staging) before publishing a Teams App to production environment, in modern app development lifecycle.

2. **Manage app behaviors in different environments**: Developers can set different behaviors for different environments. E.g., developers may want to enable telemetry in production environment but disable it in development environment.

## Create a New Environment

By default, the toolkit generates:

- a `local` environment to represent your local machine environment configurations.
- a `dev` environment after creating a new project to represent a remote/cloud environment configurations.

Developer has only one `local` environment, but can create multiple remote environments.

To add another remote environment, you can use the `Teams: Create new environment copy` command from the tree view:

![add-env](./images/create-env.png)

And then input your new environment name:
![input-env](./images/create-env-input-name.png)

If you have more than one existing environments, you will need to select an existing environment to create the environment copy. The command will copy file contents of `config.<newEnv>.json` and `azure.parameters.<newEnv>.json` from the existing environment you selected to the new environment being created.

## Customize Environment-related Configuration Files

Teams Toolkit allows user to customize an environment for resource provision behavior.

Common scenarios supported for customized provision:

| Scenarios | Where to customize |
|--|--|
| Azure Resource Customization | <ul> <li>BICEP files under `templates/azure`.</li> <li>`.fx/azure.parameters.<envName>.json`.</li></ul> |
| App Manifest | <ul> <li>`templates/manifest.template.json`.</li> <li>`manifest` section in`.fx/config.<envName>.json`.</li>  </ul> |
| Reusing existing AAD app for Teams app | <ul> <li>`auth` section in`.fx/config.<envName>.json`.</li> </ul> |
| Reusing existing AAD app for bot | <ul> <li>`bot` section in`.fx/config.<envName>.json`.</li> </ul> |
| Skip adding user when provisioning SQL | <ul> <li>`skipAddingSqlUser` property in`.fx/config.<envName>.json`.</li> </ul> |

- For how to use the environment config file, you can refer to the [environment configuration schema](https://aka.ms/teamsfx-config).
- For how to use BICEP files in Teams toolkit, you can refer to [official BICEP document](https://docs.microsoft.com/azure/azure-resource-manager/bicep/) for help.

### Example 1: customize Teams App name for different environment

In this example, you will learn how to set the Teams app name to `myapp(dev)` for the default environment `dev`  and `myapp(staging)` for the staging environment `staging`.

Steps to do the customization:

- Step 1: open config file `.fx/configs/config.dev.json`.
- Step 2: update the property of *manifest > appName > short* to `myapp(dev)`

  Updates to `.fx/configs/config.dev.json`:

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

- Step 3: create new environment named `staging` if it doesn't exist.
- Step 4: open config file `.fx/configs/config.staging.json`.
- Step 5: update the same property of step 2 to `myapp(staging)`.

### Example 2: customize Teams App description for different environment

In this example, you will learn how to set different Teams App description for different environments:

- for the default environment `dev`, the description will be `my app description for dev`;
- for the staging environment `staging`, the description will be `my app description for staging`;

Steps to do the customization:

- Step 1: open config file `.fx/configs/config.dev.json`.
- Step 2: update the property of *manifest > description > short* to `my app description for dev`.

  Updates to `.fx/configs/config.dev.json`

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

- Step 3: create a new environment named `staging` if it doesn't exist.
- Step 4: open config file `.fx/configs/config.staging.json`.
- Step 5: update the same property of step 2 to `my app description for staging`.
- **Step 6**: open Teams app manifest template for remote `templates/appPackage/manifest.remote.template.json`.
- **Step 7**: update the property `description > short` to use the **variable** defined in config files with mustache syntax `{{config.manifest.description.short}}`.
  
  Updates to `manifest.remote.template.json`:

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

### Example 3: customize Teams App description for all environments

In this example, you will learn how to set the description of Teams app to `my app description` for all environments.

As the Teams app manifest template is shared across all environments, we can update the description value in it for our target.

- Step 1: open Teams app manifest template for remote `templates/appPackage/manifest.remote.template.json`.
- Step 2: update the property `description > short` with **hard-coded string** `my app description`.
  
  Updates to `manifest.remote.template.json`:

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

### Example 4: customize different web app sku for different environment

In this example, you will learn how to set the sku of simple auth to `D1` for the default environment `dev` and `S1` for the staging environment `staging`.

Steps to do the customization:

- Step 1: open config file `.fx/configs/azure.parameters.dev.json`.
- Step 2: add parameter `simpleAuth_sku` and set the value to `D1`.
  
  Updates to `.fx/configs/azure.parameters.dev.json`:

  ```json
  {
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/  deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
      ...
      "simpleAuth_sku": {
        "value": "D1"
      }
      ...
    }
  }

- Step 3: create a new environment named `staging` if it doesn't exist.
- Step 4: open config file `.fx/configs/azure.parameters.staging.json`.
- Step 5: add parameter `simpleAuth_sku` and set the value to `D1`.

After this is done, the web app for `simpleAuth` will be provisioned as `D1` sku under `dev` environment and `S1` sku under `staging` environment.

All the predefined parameters for `azure.parameters.<env>.json` can be found in `templates/azure/main.bicep`. You can also define new parameter in `templates/azure/main.bicep` and set particular value of the parameter for different environment.

### Example 5: customize web app sku for all environments

In this example, you will learn how to set the sku of simple auth to `D1` for all environments.

The BICEP template is shared across all environments, we can update the sku value in BICEP template directly for our target.

Steps to do the customization:

- Step 1: open BICEP template file `templates/azure/main.bicep`.
- Step 2: update the value of `simpleAuth_sku` from `F1` to `D1`:

  Updates to `templates/azure/main.bicep`:

  ```bicep
  ...
  param simpleAuth_sku string = 'D1'
  ...
  ```

After this, the web app for `simpleAuth` will be provisioned as `D1` sku for all environments.

For more details about BICEP template and parameter files, please refer to [this section](./provision.md#customize-azure-resource-being-created).

## Select Target Environment for Provision/Deploy/Publish/Preview

With multi-environments concept introduced in Teams Toolkit, for all environment related operations, you will need to select a target environment to perform against. The toolkit will prompt and ask for a target environment when needed.

![select env](./images/select-env.png)

## Project's Folder Structure

- `.fx/configs`: config files that user can customize for the Teams app.
  - `config.<envName>.json`: per-environment configuration file.
  - `azure.parameters.<envName>.json`: per-environment parameters file for Azure BICEP provision.
  - `projectSettings.json`: global project settings which apply to all environments.
  - `localSettings.json`: local debug configuration file.
- `.fx/states`: provision result that is generated by the Toolkit.
  - `state.dev.json`: the provision output file.
  - `<env>.userdata`: sensitive user data for the provision output.
- `templates`
  - `appPackage`: app manifest template files.
  - `azure`: BICEP template files.

## See also

> [!div class="nextstepaction"]
> [Provision cloud resources](provision.md)
> [!div class="nextstepaction"]
> [Add more cloud resources](add-resource.md)
> [!div class="nextstepaction"]
> [Collaborate with other developers on Teams project](TeamsFx-collaboration.md)
