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
| `teamsfx update` | Update the specific application manifest file. |
| `teamsfx upgrade` | Upgrade the project to work with the latest version of Teams Toolkit. |

## Interactive mode

`teamsfx` command runs in interactive mode by default. You can work in non-interactive mode by setting `--interactive` flag to `false`.

## `teamsfx new`

By default, `teamsfx new` is in interactive mode and guides to create new Teams application. You can work in non-interactive mode by setting `--interactive` flag to `false`.

| Command | Description |
|:----------------  |:-------------|
| `teamsfx new template` | Create an app from an existing template. |
| `teamsfx new template list` | List all the available templates. |

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
| `teamsfx add SPFxWebPart` | Auto-hosted SPFx web part tightly integrated with Microsoft Teams. |

## `teamsfx account`

The following table lists the cloud service accounts, such as Azure and Microsoft 365.

| Command | Description |
|:----------------  |:-------------|
| `teamsfx account login`  | Log in to the selected cloud service. Service options are Microsoft 365 or Azure. |
| `teamsfx account logout`  | Log out of selected cloud service. Service options are Microsoft 365 or Azure. |
| `teamsfx account show` | Display all connected cloud accounts information. |

## `teamsfx env`

Manage environments.

|  Command  | Description |
|:----------------  |:-------------|
| `teamsfx env add`  | Add a new environment by copying from the specified environment. |
| `teamsfx env list` | List all environments. |

### Scenarios for `teamsfx env`

Create a new environment by copying from the existing dev environment:

```bash
teamsfx env add staging --env dev
```

## `teamsfx provision`

Run the provision stage in `teamsapp.yml`.

Running `teamsfx provision --env local` will trigger the provision stage in `teamsapp.local.yml` instead.

### Parameters for `teamsfx provision`

| Parameters | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |

## `teamsfx deploy`

Run the deploy stage in `teamsapp.yml`.

Running `teamsfx deploy --env local` will trigger the deploy stage in `teamsapp.local.yml` instead.

### Parameters for `teamsfx deploy`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |

## `teamsfx validate`

Validate the Teams app using manifest schema or validation rules.

### Parameters for `teamsfx validate`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--manifest-path` | No | Select the input Teams app manifest file path, defaults to `${folder}/appPackage/manifest.json`. This manifest will be validated using manifest schema. |
|`--app-package-file-path` | No | Select the zipped Teams app package path, defaults to `${folder}/appPackage/build/appPackage.${env}.zip`. This package will be validated with validation rules. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |

## `teamsfx publish`

Run the publish stage in `teamsapp.yml`.

Running `teamsfx publish --env local` will trigger the publish stage in `teamsapp.local.yml` instead.

### Parameters for `teamsfx publish`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No |Select root folder of the project. Defaults to "./". |

## `teamsfx package`

Build your Teams app into a package for publishing.

### Parameters for `teamsfx package`

|Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--manifest-file-path` | No | Select the Teams app manifest template path, defaults to `${folder}/appPackage/manifest.json`. |
| `--output-zip-path` | No | Select the output path of the zipped app package, defaults to `${folder}/appPackage/build/appPackage.${env}.zip`. |
| `--output-manifest-path` | No | Select the output path of the generated manifest path, defaults to `${folder}/appPackage/build/manifest.${env}.json`. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |

## `teamsfx preview`

Preview the current application.

### Parameters for `teamsfx preview`

| Parameter | Required | Description |
|:---------------- | :------------- | :------------- |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |
| `--env` | No | Select an existing env for the project. Defaults to `local`. |
| `--manifest-file-path` | No | Select the Teams app `manifest file path`, defaults to `${folder}/appPackage/manifest.json`. |
| `--run-command` | No | The command to start local service. Work for `local` environment only. If undefined, `teamsfx` will use the auto detected one from project type (`npm run dev:teamsfx` or `dotnet run` or `func start`). If empty, `teamsfx` will skip starting local service. |
| `--running-pattern` | No | The ready signal output that service is launched. Work for `local` environment only. If undefined, `teamsfx` will use the default common pattern ("started/successfully/finished/crashed/failed"). If empty, `teamsfx` treats process start as ready signal. |
| `--open-only` | No | Work for `local` environment only. If true, directly open web client without launching local service. Defaults to `false`. |
| `--m365-host` | No | Preview the application in Teams, Outlook, or the Microsoft 365 app [string] [choices: `teams`, `outlook`, `office`]. Defaults to `teams`. |
| `--browser` | No | Select browser to open Teams web client [string] [choices: `chrome`, `edge`, `default`]. Defaults to `default`. |
| `--browser-arg` | No | Argument to pass to the browser, for example, --browser-args="--guest. |

### Scenarios for `teamsfx preview`

The following list provides the common scenarios for `teamsfx preview`:

`teamsfx preview` expects users have already ran `teamsfx provision` and `teamsfx deploy`.

* Local Preview

  Dependencies:

  * Node.js
  * .NET SDK
  * Azure Functions Core Tools

  ```typescript
  teamsfx preview --env --local
  teamsfx preview --env --local --browser chrome
  ```

* Remote Preview

  ```typescript
  teamsfx preview --env --remote
  teamsfx preview --env --remote --browser edge
  ```

  > [!NOTE]
  > The logs of the background services, such as React is saved in ~/.fx/cli-log/local-preview/.

## `teamsfx config`

Configure user settings.

### Parameters for `teamsfx config`

| Command | Description |
|:----------------  |:-------------|
| `teamsfx config get [option]` | Get user global settings. |
| `teamsfx config set` | Set user settings. |

### Scenarios for `teamsfx config`

* Stop sending telemetry data

  ```typescript
  teamsfx config set telemetry off
  ```

## `teamsfx permission`

Check, grant, and list user permission.

| Command | Description |
|:----------------  |:-------------|
| `teamsfx permission grant` | Check user's permission. |
| `teamsfx permission status` | Show permission status for the project. |

### Parameters for `teamsfx permission grant`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |
| `--email` | No | Input email address of collaborator. |
| `--teams-app-manifest` | No | Manifest of Your Teams app. |
| `--aad-app-manifest` | No | Manifest of your Azure AD app. |

### Parameters for `teamsfx permission status`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |
| `--teams-app-manifest` | No | Manifest of Your Teams app. |
| `--aad-app-manifest` | No | Manifest of your Azure AD app. |
| `--list-all-collaborators` | No | To list all collaborators. |

### Scenarios for `teamsfx permission`

* Grant Permission

  Project creator and collaborators can use `teamsfx` permission grant command to add a new collaborator to the project:

  ```typescript
  teamsfx permission grant --env dev --email user-email@user-tenant.com
  ```

  After receiving required permission, project creator and collaborators can share the project with the new collaborator by GitHub, and the new collaborator can have all the permissions for Microsoft 365 account.

* Show Permission Status

  Project creator and collaborators can use `teamsfx permission status` command to view Microsoft 365 account permission for specific env:

  ```typescript
  teamsfx permission status --env dev
  ```

* List All Collaborators

  Project creator and collaborators can use `teamsfx permission status` command to view all collaborators for specific env:

  ```typescript
  teamsfx permission status --env dev --list-all-collaborators
  ```

## `teamsfx update`

Update the specific application manifest file.

| Command | Description |
|:----------------  |:-------------|
| `teamsfx update aad-app` | Update the AAD App in the current application. |
| `teamsfx update teams-app` | Update the Teams App manifest to Teams Developer Portal. |

### Parameters for `teamsfx update aad-app`

| Parameter | Required |Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |
| `--manifest-file-path` | No | Enter the AAD app manifest template file path, it's a relative path to project root folder, defaults to `./aad.manifest.json`. |

### Parameters for `teamsfx update teams-app`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |
| `--manifest-file-path` | No | Enter the Teams app manifest template file path, it's a relative path to project root folder, defaults to `./appPackage/manifest.json`.

## `teamsfx upgrade`

Upgrade the project to work with the latest version of Teams Toolkit.

### Parameters for `teamsfx upgrade`

|Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--force` | No | Force upgrade the project to work with the latest version of Teams Toolkit. Defaults to `false`. |
