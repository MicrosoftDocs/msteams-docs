---
title: TeamsFx Command Line Interface
author: MuyangAmigo
description:  Describes TeamsFx Command Line Interface
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# TeamsFx Library

Microsoft Teams Framework (TeamsFx) is a library encapsulating common functionality and integration patterns (like simplified access to Microsoft Identity). You can build apps for Microsoft Teams with zero configuration.

Here's a list of main TeamsFx features:

* **TeamsFx Collaboration**: Let developers and project owner invite other collaborators to the TeamsFx project. You can collaborate to debug and deploy a TeamsFx project.

* **TeamsFx CLI**: It accelerates Teams application development. It also enables CI/CD scenario where you can integrate CLI in scripts for automation.

* **TeamsFx SDK**: TeamsFx Software Development Kit (SDK) is the main TeamsFx code library encapsulating simple authentication for both client and server-side code tailored for Teams developers.

## TeamsFx command line interface

TeamsFx CLI is a text-based command line interface that accelerates Teams application development. It aims to provide keyboard centric experience while building Teams applications. It also enables CI/CD scenario where you can integrate CLI in scripts for automation.

For more information, see:

* [Source code](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli)
* [Package (NPM)](https://www.npmjs.com/package/@microsoft/teamsfx-cli)

## Get Started

Install `teamsfx-cli` from `npm` and run `teamsfx -h` to check all available commands:

```bash
  npm install -g @microsoft/teamsfx-cli
  teamsfx -h
```

## Supported commands

| Command | Description |
|----------------|-------------|
| `teamsfx new`| Create new Teams application.|
| `teamsfx account`| Manage cloud service accounts. The supported cloud services are 'Azure' and 'Microsoft 365'. |
| `teamsfx env` | Manage environments. |
| `teamsfx capability`| Add new capabilities to the current application.|
| `teamsfx resource`  | Manage the resources in the current application.|
| `teamsfx provision` | Provision cloud resources in the current application.|
| `teamsfx deploy` | Deploy the current application.  |
| `teamsfx package` | Build your Teams app into package for publishing.|
| `teamsfx validate` | Validate the current application.|
| `teamsfx publish` | Publish the app to Teams.|
| `teamsfx preview` | Preview the current application. |
| `teamsfx config`  | Manage the configuration data. |
| `teamsfx permission`| Collaborate with other developers in same project.|

## `teamsfx new`

By default, `teamsfx new` goes into interactive mode and guides you through the process of creating a new Teams application. You can also work with non-interactive mode by setting `--interactive` flag to `false`.

| `teamsFx new` Command | Description |
|:----------------  |:-------------|
| `teamsfx new template <template-name>`     | Create an app from an existing template |
| `teamsfx new template list`     | List all the available templates |

### Parameters for `teamsfx new`

| Parameter | Requirement | Description |
|:---------------- |:-------------|:-------------|
|`--app-name` | Yes| Name of your Teams application.|
|`--interactive`| No | Select the options interactively. The options are `true` and `false` and default value is `true`.|
|`--capabilities`| No| Choose Teams application capabilities, the multiple options are `tab`, `bot`, `messaging-extension` and `tab-spfx`. The default value is `tab`.|
|`--programming-language`| No| Programming language for the project. The options are `javascript` or `typescript` and default value is `javascript`.|
|`--folder`| No | Project directory. A sub folder with your app name is created under this directory. The default value is `./`.|
|`--spfx-framework-type`| No| Applicable if `Tab(SPfx)` capability is selected. Frontend Framework. The options are `none` and `react`, and default value is `none`.|
|`--spfx-web part-name`| No | Applicable if `Tab(SPfx)` capability is selected. The default value is "helloworld".|
|`--spfx-web part-desp`| No | Applicable if `Tab(SPfx)` capability is selected. The default value is "helloworld description". |
|`--azure-resources`| No| Applicable if contains `tab` capability. Add Azure resources to your project. The multiple options are `sql` (Azure SQL Database) and `function` (Azure Functions). |

### Scenarios for `teamsfx new`

You can use interactive mode to create a Teams app.The scenarios on controlling all the parameters with `teamsfx new` are as follows:

#### Tab app hosted on SPFx using React

```bash
teamsfx new --interactive false --app-name newspfxapp --capabilities tab-spfx --spfx-framework-type react
```

#### Teams app in JavaScript with tab, bot capabilities and Azure Functions

```bash
teamsfx new --interactive false --app-name newtabbotapp --capabilities tab bot --programming-language javascript --azure-resources function
```

#### Teams tab app with Azure Functions and Azure SQL

```bash
teamsfx new --interactive false app-name newapp --azure-resources sql function --programming-language typescript
```

## `teamsfx account`

Manage cloud service accounts. The supported cloud services are `Azure` and `Microsoft 365`.

| `teamsFx account` Command | Description |
|:----------------  |:-------------|
| `teamsfx account login <service>`  | Log in to the selected cloud service. |
| `teamsfx account logout <service>`  | log out of selected cloud service. |
| `teamsfx account set --subscription` | Update account settings to set a subscription ID. |

## `teamsfx env`

Manage the environments.

| `teamsfx env` Command  | Description |
|:----------------  |:-------------|
| `teamsfx env add <new_env_name> --env <existing_env_name>` | Add a new environment by copying from the specified environment. |
| `teamsfx env list` | List all environments. |

### Scenarios for `teamsfx env`

The scenarios for `teamsfx env` are as follows:

#### Create a new environment

Add a new environment by copying from the existing dev environment:

```bash
teamsfx env add staging --env dev
```

## `teamsfx capability`

Add new capabilities to the current application.

| `teamsFx capability` Command  | Description |
|:----------------  |:-------------|
| `teamsfx capability add tab` | Add tab |
| `teamsfx capability add bot` | Add bot |
| `teamsfx capability add messaging-extension`| Add messagE extension |

> [!NOTE]
> If your project includes a bot, message extension can't be added and it applies vice versa. You can include both bot and message extensions in your project while creating a new Teams app project.

## `teamsfx resource`

Manage the resources in the current application. Supported `<resource-type>` are: `azure-sql`, `azure-function` and `azure-apim` .

| `teamsFx resource` Command  | Description |
|:----------------  |:-------------|
| `teamsfx resource add <resource-type>`      | Add resource into current application.|
| `teamsfx resource show <resource-type>`      | Show configuration details of the resource. |
| `teamsfx resource list`      | List all the resources in the current application. |

### Parameters for `teamsfx resource add azure-function`

| Parameter  | Requirement | Description |
|----------------  |-------------|-------------|
|`--function-name`| Yes | Provide a function name. The default value is `getuserprofile`. |

### Parameters for `teamsfx resource add azure-sql`

#### `--function-name`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--function-name`| Yes | Provide a function name. The default value is `getuserprofile`. |

> [!NOTE]
> The function name is verified as SQL and needs to be accessed from server workload. If your project doesn't contain `Azure Functions`, create one for you.

### Parameters for `teamsfx resource add azure-apim`

> [!TIP]
> The options take effect when you try to use an existing `APIM` instance. By default, you don't have to specify any options and it creates a new instance during `teamsfx provision` step.

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--subscription`| Yes | Select an Azure subscription|
|`--apim-resource-group`| Yes| The name of resource group. |
|`--apim-service-name`| Yes | The name of the API management service instance. |
|`--function-name`| Yes | Provide a function name. The default value is `getuserprofile`. |

> [!NOTE]
> `Azure API Management` needs to work with `Azure Functions`. If your project doesn't contain `Azure Functions`, you can create one.

## `teamsfx provision`

Provision the cloud resources in the current application.

### Parameters for `teamsfx provision`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes| Select an environment for the project. |
|`--subscription`| No | Specify an Azure Subscription ID. |
|`--resource-group`| No | Set the name of an existing resource group. |
|`--sql-admin-name`| No | Applicable when there is SQL resource in the project. Admin name of SQL.|
|`--sql-password`| No| Applicable when there is SQL resource in the project. Admin password of SQL.|

## `teamsfx deploy`

This command is used to deploy the current application. By default it deploys entire project but it's also possible to deploy partially. The multiple options are `frontend-hosting`, `function`, `apim`, `teamsbot`, and `spfx`.

### Parameters for `teamsfx deploy`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes| Select an existing environment for the project. |
|`--open-api-document`| No | Applicable when there is APIM resource in the project. The open API document file path. |
|`--api-prefix`| No | Applicable when there is APIM resource in the project. The API name prefix. The default unique name of the API is `{api-prefix}-{resource-suffix}-{api-version}`. |
|`--api-version`| No | Applicable when there is APIM resource in the project. The API version. |

## `teamsfx validate`

Validate current application. This command validates your application's manifest file.

### Parameters for `teamsfx validate`

`--env`: Select an existing environment for the project.

## `teamsfx publish`

Publish the app to Teams.

### Parameters for `teamsfx publish`

`--env`: Select an existing environment for the project.

## `teamsfx package`

Build your Teams app into a package for publishing.

## `teamsfx preview`

Preview the current application from local or remote.

### Parameters for `teamsfx preview`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--local`| No | Preview the application from local. `--local` is exclusive with `--remote`. |
|`--remote`| No | Preview the application from remote. `--remote` is exclusive with `--local`. |
|`--env`| No | Select an existing environment for the project when parameter `--remote` is appended. |
|`--folder`| No | Project root directory. The default value is `./`. |
|`--browser`| No | The browser to open Teams web client. The options are `chrome`, `edge` and `default` such as system default browser and the value is `default`. |
|`--browser-arg`| No | Argument to pass to the browser, requires --browser, can be used multiple times, for example, --browser-args="--guest" |
|`--sharepoint-site`| No | SharePoint site URL, such as `{your-tenant-name}.sharepoint.com` for SPFx project remote preview. |

### Scenarios for `teamsfx preview`

#### Local Preview

Dependencies:

* Node.js
* .NET SDK
* Azure Functions Core Tools

```bash
teamsfx preview --local
teamsfx preview --local --browser chrome
```

#### Remote Preview

```bash
teamsfx preview --remote
teamsfx preview --remote --browser edge
```

> [!NOTE]
> The logs of the background services, such as React is saved in `~/.fx/cli-log/local-preview/`.

## `teamsfx config`

Manage the configuration data either in user scope or project scope.

| `teamsfx config` Command  | Description |
|:----------------  |:-------------|
| `teamsfx config get [option]` | View the configuration value of option |
| `teamsfx config set <option> <value>` | Update the configuration value of option |

### Parameters for `teamsfx config`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes | Select an existing environment for the project. |
|`--folder`| No | Project directory. This is used for get or set project configuration. The default value is `./`. |
|`--global`| No | Cope of configuration. If this is true, the scope is limited to user scope instead of project scope. The default value is `false`. At present, the supported global configurations include `telemetry`, `validate-dotnet-sdk`, `validate-func-core-tools`, `validate-node`. |

### Scenerios for `teamsfx config`

Secrets in `.userdata` file are encrypted, `teamsfx config` and can help you to view or update the values.

#### Stop sending telemetry data

```bash
teamsfx config set telemetry off
```

#### Disable environment checker

There are three configuration to turn on or off Node.js, .NET SDK and Azure Functions Core Tools validation, and all of them are enabled by default. You can set the configuration to "off" if you don't need the dependencies validation and want to install the dependencies by yourself. Check the following guides:

* [Node.js installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-nodejs)
* [.NET SDK installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-net-sdk)
* [Azure Functions Core Tools installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-azure-functions-core-tools).

To disable .NET SDK validation, you can use the following command:

```bash
teamsfx config set validate-dotnet-sdk off
```

To enable .NET SDK validation, you can use the following command:

```bash
teamsfx config set validate-dotnet-sdk on
```

#### View all the user scope configuration

```bash
teamsfx config get -g
```

#### View all the configuration in project

The secret is automatically decrypted:

```bash
teamsfx config get --env dev
```

#### Update the secret configuration in project

```bash
teamsfx config set fx-resource-aad-app-for-teams.clientSecret xxx --env dev
```

## `teamsfx permission`

TeamsFx CLI provides `teamsFx permission` commands for collaboration scenario.

| `teamsFx permission` command | Description |
|:------------------------------|-------------|
| `teamsfx permission grant --env --email` | Grant permission for collaborator's Microsoft 365 account for the project of a specified environment. |
| `teamsfx permission status` | Show permission status for the project |

### Parameters for `teamsfx permission grant`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes | Provide env name. |
|`--email`| Yes | Provide collaborator's Microsoft 365 email address. Ensure the collaborator's account is in the same tenant with creator. |

### Parameters for `teamsfx permission status`

| Parameter | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes | Provide env name. |
|`--list-all-collaborators` | No | With this flag, Teams Toolkit CLI prints all collaborators for this project. |

### Scenarios for `teamsfx permission`

The permissions for `TeamsFx` projects are as follows:

#### Grant Permission

Project creator and collaborators can use `teamsfx permission grant` command to add a new collaborator to the project:

```bash
teamsfx permission grant --env dev --email user-email@user-tenant.com
```

After receiving required permission, project creator and collaborators can share the project with the new collaborator by GitHub, and the new collaborator can have all permission for Microsoft 365 account.

#### Show Permission Status

Project creator and collaborators can use `teamsfx permission status` command to view his Microsoft 365 account permission for specific env:

```bash
teamsfx permission status --env dev
```

#### List All Collaborators

Project creator and collaborators can use `teamsfx permission status` command to view all collaborators for specific env:

```bash
teamsfx permission status --env dev --list-all-collaborators
```

#### E2E Collaboration work flow in CLI

As a project creator:

* To create a new TeamsFx tab or bot project, and select Azure as the host type:

  ```bash
  teamsfx new --interactive false --app-name newapp --host-type azure
  ```

* To login to Microsoft 365 account and Azure account:

  ```bash
  teamsfx account login azure
  teamsfx account login Microsoft 365
  ```

* To provision your project:

  ```bash
  teamsfx provision
  ```

* To view collaborators:

  ```bash
  teamsfx permission status --env dev --list-all-collaborators
  ```

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/permission-status-all-1.png" alt-text="permission-1":::

* To add another account as collaborator. Ensure the added account is under the same tenant:

  ```bash
  teamsfx permission grant --env dev --email user-email@user-tenant.com
  ```

  :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/permission-grant-1.png" alt-text="permission":::

* To push your project to GitHub

As a Project Collaborator:

* Clone the project from GitHub.
* Login to Microsoft 365 account. Ensure that the same Microsoft 365 account is added:

  ```bash
  teamsfx account login Microsoft 365
  ```

* Login to Azure account with contributor permission for all Azure resources.

  ```bash
  teamsfx account login azure
  ```

* Check permission status. You should find yourself have the owner permission of the project:

  ```bash
  teamsfx permission status --env dev
  ```

  ![permission status](./images/permission-status.png)

* Update Tab code, and deploy the project to remote.
* Launch remote and the project should work fine.

## See also

* [TeamsFx SDK for TypeScript or JavaScript](TeamsFx-SDK.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env.md)
* [Collaborate on Teams project using Teams Toolkit](TeamsFx-collaboration.md)
* [Teams Toolkit overview](teams-toolkit-fundamentals.md)
