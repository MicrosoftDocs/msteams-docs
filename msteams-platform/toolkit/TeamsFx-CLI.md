---
title: TeamsFx Command Line Interface
author: MuyangAmigo
description: In this module, learn TeamsFx Command Line Interface, TeamsFx library, supported commands and its scenarios
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# TeamsFx command line interface

TeamsFx CLI is a text-based command line interface that accelerates Teams application development. It aims to provide keyboard centric experience while building Teams applications.

For more information, see:

* [Source code](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli)
* [Package (NPM)](https://www.npmjs.com/package/@microsoft/teamsfx-cli)

## TeamsFx Library

Microsoft Teams Framework (TeamsFx) is a library encapsulating common functionality and integration patterns, such as simplified access to Microsoft Identity. You can build apps for Microsoft Teams with zero configuration.

Following is a list of main TeamsFx features:

* **TeamsFx Collaboration**: Lets developers and project owner invite other collaborators to the TeamsFx project. You can collaborate to debug and deploy a TeamsFx project.

* **TeamsFx CLI**: Accelerates Teams application development. It also enables CI/CD scenario where you can integrate CLI in scripts for automation.

* **TeamsFx SDK**: Provides access to database, such as the primary TeamsFx code library containing simple authentication for both client and server-side code tailored for Teams developers.

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
| `teamsfx add`| Adds features to your Teams application.|
| `teamsfx account`| Manage cloud service accounts. The supported cloud services are 'Azure' and 'Microsoft 365'. |
| `teamsfx env` | Manage environments. |
| `teamsfx provision` | Provision cloud resources in the current application.|
| `teamsfx deploy` | Deploy the current application.  |
| `teamsfx package` | Build your Teams app into package for publishing.|
| `teamsfx validate` | Validate the current application.|
| `teamsfx publish` | Publish the app to Teams.|
| `teamsfx preview` | Preview the current application. |
| `teamsfx config`  | Manage the configuration data. |
| `teamsfx permission`| Collaborate with other developers in same project.|

## `teamsfx new`

By default, `teamsfx new` is in interactive mode and guides to create new Teams application. You can work in the non-interactive mode by setting `--interactive` flag to `false`.

| Command | Description |
|:----------------  |:-------------|
| `teamsfx new template <template-name>`     | Create an app from an existing template |
| `teamsfx new template list`     | List all the available templates |

### Parameters for `teamsfx new`

| Parameter | Requirement | Description |
|:---------------- |:-------------|:-------------|
|`--app-name` | Yes| Name of your Teams application.|
|`--interactive`| No | Select the options interactively. The options are `true` and `false` and default value is `true`.|
|`--capabilities`| No| Choose Teams application capabilities, the options are `tab`, `tab-non-sso`, `tab-spfx`, `bot`, `message-extension`, `notification`, `command-bot`, `sso-launch-page`, `search-app`. The default value is `tab`.|
|`--programming-language`| No| Programming language for the project. The options are `javascript` or `typescript` and default value is `javascript`.|
|`--folder`| No | Project directory. A sub folder with your app name is created under this directory. The default value is `./`.|
|`--spfx-framework-type`| No| Applicable if `SPFx tab` capability is selected. Frontend Framework. The options are `none`, `react` and `minimal`, and default value is `none`.|
|`--spfx-web part-name`| No | Applicable if `SPFx tab` capability is selected. The default value is "helloworld".|
|`--bot-host-type-trigger`| No | Applicable if `Notification bot` capability is selected. The options are `http-restify`, `http-functions`, and `timer-functions`. The default value is `http-restify`.|

### Scenarios for `teamsfx new`

You can use interactive mode to create a Teams app. The following list provides scenarios on controlling all the parameters with `teamsfx new`:

* HTTP triggered notification bot with restify server.

  ```bash
  teamsfx new --interactive false --capabilities "notification" --bot-host-type-trigger "http-restify" --programming-language "typescript" --folder "./" --app-name       MyAppName
  ```

* Teams command and response bot.

  ```bash
  teamsfx new --interactive false --capabilities "command-bot" --programming-language "typescript" --folder "./" --app-name myAppName
  ```

* Tab app hosted on SPFx using React.

  ```bash
  teamsfx new --interactive false --app-name newspfxapp --capabilities tab-spfx --spfx-framework-type react
  ```

## `teamsfx add`

The following table lists different features to your Teams application along with their description.

| Command | Description |
|:----------------  |:-------------|
| `teamsfx add notification` | Send notification to Microsoft Teams through various triggers. |
| `teamsfx add command-and-response` | Respond to simple commands in Microsoft Teams chat.|
| `teamsfx add sso-tab` | Teams identity aware webpages embedded in Microsoft Teams.|
| `teamsfx add tab` | Hello world webpages embedded in Microsoft Teams.|
| `teamsfx add bot` | Hello world chatbot to run simple and repetitive tasks by user. |
| `teamsfx add message-extension` | Hello world message extension allowing interactions through buttons and forms. |
| `teamsfx add azure-function`| A serverless, event-driven compute solution that allows you to write less code. |
| `teamsfx add azure-apim` | A hybrid, multi-cloud management platform for APIs across all environments.|
| `teamsfx add azure-sql` | An always-up-to-date relational database service built for the cloud. |
| `teamsfx add azure-keyvault` | A cloud service for securely storing and accessing secrets. |
| `teamsfx add sso` | Develop a single sign-on (SSO) feature for Teams Launch pages and Bot capability. |
| `teamsfx add api-connection [auth-type]` | Connect to an API with authentication support using TeamsFx SDK. |
| `teamsfx add cicd` | Add CI/CD Workflows for GitHub, Azure DevOps or Jenkins.|

## `teamsfx account`

The following table lists the cloud service accounts, such as Azure and Microsoft 365.

| Command | Description |
|:----------------  |:-------------|
| `teamsfx account login <service>`  | Log in to the selected cloud service. Service options are Microsoft 365 or Azure. |
| `teamsfx account logout <service>`  | log out of selected cloud service. Service options are Microsoft 365 or Azure. |
| `teamsfx account set --subscription` | Update account settings to set a subscription ID. |

## `teamsfx env`

The following table lists the different environments.

|  Command  | Description |
|:----------------  |:-------------|
| `teamsfx env add <new_env_name> --env <existing_env_name>` | Add a new environment by copying from the specified environment. |
| `teamsfx env list` | List all environments. |

### Scenarios for `teamsfx env`

Create a new environment by copying from the existing dev environment:

```bash
teamsfx env add staging --env dev
```

## `teamsfx provision`

Provision the cloud resources in the current application.

| `teamsFx provision` Command | Description |
|:----------------  |:-------------|
| `teamsfx provision manifest` | Provision a Teams App in Teams Developer portal with corresponding information specified in the given manifest file. |

### Parameters for `teamsfx provision`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes| Select an environment for the project. |
|`--subscription`| No | Specify an Azure Subscription ID. |
|`--resource-group`| No | Set the name of an existing resource group. |
|`--sql-admin-name`| No | Applicable when there's SQL resource in the project. Admin name of SQL.|
|`--sql-password`| No| Applicable when there's SQL resource in the project. Admin password of SQL.|

## `teamsfx deploy`

This command is used to deploy the current application. By default it deploys entire project but its also possible to deploy partially. The options are `frontend-hosting`, `function`, `apim`, `bot`, `spfx`, `aad-manifest`, and `manifest`.

### Parameters for `teamsfx deploy`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes| Select an existing environment for the project. |
|`--open-api-document`| No | Applicable when there's APIM resource in the project. The open API document file path. |
|`--api-prefix`| No | Applicable when there's APIM resource in the project. The API name prefix. The default unique name of the API is `{api-prefix}-{resource-suffix}-{api-version}`. |
|`--api-version`| No | Applicable when there's APIM resource in the project. The API version. |
|`--include-app-manifest`| No | Whether to deploy app manifest to Teams platform. Options are `yes` and `not`. The default value is `no`. |
|`--include-aad-manifest`| No | Whether to deploy aad manifest. Options are `yes` and `not`. The default value is `no`. |

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
|`--m365-host`| Preview the application in Teams, Outlook or Microsoft 365 (formally known as Office app). Options are `teams`, `outlook` and `office`. The default value is `teams`. |

### Scenarios for `teamsfx preview`

The following list provides the common scenarios for`teamsfx preview:

* Local Preview

  Dependencies:

  * Node.js
  * .NET SDK
  * Azure Functions Core Tools

  ```bash
  teamsfx preview --local
  teamsfx preview --local --browser chrome
  ```

* Remote Preview

  ```bash
  teamsfx preview --remote
  teamsfx preview --remote --browser edge
  ```

  > [!NOTE]
  > The logs of the background services, such as React is saved in `~/.fx/cli-log/local-preview/`.

## `teamsfx config`

The configuration data is either in user scope or project scope.

|  Command  | Description |
|:----------------  |:-------------|
| `teamsfx config get [option]` | View the configuration value of option. |
| `teamsfx config set <option> <value>` | Update the configuration value of option. |

### Parameters for `teamsfx config`

| Parameter  | Requirement | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes | Select an existing environment for the project. |
|`--folder`| No | Project directory used for get or set project configuration. The default value is `./`. |
|`--global`| No | Scope of configuration. If true, the scope is limited to user scope instead of project scope. The default value is `false`. Now, the supported global configurations include `telemetry`, `validate-dotnet-sdk`, `validate-func-core-tools`, `validate-node`. |

### Scenarios for `teamsfx config`

The secrets in `.userdata` file are encrypted, `teamsfx config` and can help you view or update required values.

* Stop sending telemetry data

  ```bash
  teamsfx config set telemetry off
  ```

* Disable environment checker

  There are three configurations to turn on or off Node.js, .NET SDK and Azure Functions Core Tools validation, and all of them are enabled by default. You can set the configuration to "off" if you don't need the dependencies validation and want to install the dependencies by yourself. Check the following guides:

  * [Node.js installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-nodejs)
  * [.NET SDK installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-net-sdk)
  * [Azure Functions Core Tools installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-azure).

  To disable .NET SDK validation, use the following command:

  ```bash
  teamsfx config set validate-dotnet-sdk off
  ```

  To enable .NET SDK validation, use the following command:

  ```bash
  teamsfx config set validate-dotnet-sdk on
  ```

* View all the user scope configuration

  ```bash
  teamsfx config get -g
  ```

* View all the configuration in project

    ```bash
    teamsfx config get --env dev
    ```

  > [!NOTE]
  > The secret is automatically decrypted.

* Update the secret configuration in project

  ```bash
  teamsfx config set fx-resource-aad-app-for-teams.clientSecret xxx --env dev
  ```

## `teamsfx permission`

TeamsFx CLI provides `teamsFx permission` commands for collaboration scenarios.

|  command | Description |
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
|`--list-all-collaborators` | No | With this flag, Teams Toolkit CLI prints all collaborators for the project. |

### Scenarios for `teamsfx permission`

The following list provides required permissions for `TeamsFx` projects:

* Grant Permission

  Project creator and collaborators can use `teamsfx permission grant` command to add a new collaborator to the project:

  ```bash
  teamsfx permission grant --env dev --email user-email@user-tenant.com
  ```

  After receiving required permission, project creator and collaborators can share the project with the new collaborator by GitHub, and the new collaborator can have all the permissions for Microsoft 365 account.

* Show Permission Status

  Project creator and collaborators can use `teamsfx permission status` command to view Microsoft 365 account permission for specific env:

  ```bash
  teamsfx permission status --env dev
  ```

* List All Collaborators

  Project creator and collaborators can use `teamsfx permission status` command to view all collaborators for specific env:

  ```bash
  teamsfx permission status --env dev --list-all-collaborators
  ```

* E2E Collaboration work flow in CLI

  * As a project creator

    * To create a new TeamsFx tab or bot project, and Azure as the host type:

      ```bash
      teamsfx new --interactive false --app-name newapp --host-type azure
      ```

    * To log in to Microsoft 365 account, and Azure account:

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

      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/permission-status-all-1.png" alt-text="permission-1" lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/permission-status-all-1.png":::

    * To add another account as collaborator. Ensure the added account is under the same tenant:

      ```bash
      teamsfx permission grant --env dev --email user-email@user-tenant.com
      ```

      :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/permission-grant-1.png" alt-text="permission" lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/permission-grant-1.png":::

    * To push your project to GitHub

  * As a Project Collaborator:

    * Clone the project from GitHub.
    * Log in to Microsoft 365 account. Ensure that the same Microsoft 365 account is added:

      ```bash
      teamsfx account login Microsoft 365
      ```

    * Log in to Azure account with contributor permission for all Azure resources:

      ```bash
      teamsfx account login azure
      ```

    * Check permission status:

      ```bash
      teamsfx permission status --env dev
      ```

      > [!NOTE]
      > Ensure to have the project owners permission.

      :::image type="content" source="../assets/images/Tools-and-SDK-revamp/images for provision cloud resources in TTK VS/permission-status.png" alt-text="Check permission status" lightbox="../assets/images/Tools-and-SDK-revamp/images for provision cloud resources in TTK VS/permission-status.png":::

    * Update Tab code, and deploy the project to remote.
    * Launch remote and the project.

## Deploy to azure web app manually

1. Create a SSO enable tab.
2. Provision your project:

      ```bash
      teamsfx provision
      ```

3. Run `npm install` and `npm run build:teamsfx:dev` in `tabs` or `api folder` to install added packages.

4. Create a windows app service in the same OS as your machine.

5. Run `$ az webapp up --name --html --subscription` in `tabs`, or `build`, or `folder`.

6. Modify `templates/azure/provision/frontendHosting.bicep`.

7. Provision again. Teams Toolkit updates Azure Active Directory (Azure AD), and manifest for you.

8. Find your `appPackage.dev.zip` in build, or AppPackage folder, and add to Teams.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [TeamsFx SDK for TypeScript or JavaScript](TeamsFx-SDK.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env.md)
* [Collaborate on Teams project using Teams Toolkit](TeamsFx-collaboration.md)
