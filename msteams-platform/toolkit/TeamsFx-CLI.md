---
title: TeamsFx Command Line Interface
author: MuyangAmigo
description: In this module, learn Teamsapp Command Line Interface, TeamsFx library, supported commands and its scenarios
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
zone_pivot_groups: toolkit-cli
---

# Teams Toolkit command line interface

> [!IMPORTANT]
>
> We recommend that you use Teamsapp CLI v3 for building your Teams app. TeamsFx CLI v1 and TeamsFx CLI v2 will soon be deprecated.

Teams Toolkit command line interface (Teams Toolkit CLI) is a text-based command line interface that accelerates Teams application development. It aims to provide keyboard centric experience while building Teams applications.

For more information, see:

* [Source code](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli)
* [Package (NPM)](https://www.npmjs.com/package/@microsoft/teamsfx-cli)

::: zone pivot="version-three"

## Teams Tookit CLI Library

Teams Toolkit CLI is a library encapsulating common functionality and integration patterns, such as simplified access to Microsoft Identity. You can build apps for Microsoft Teams with zero configuration.

Following is a list of main Teams Toolkit CLI features:

* **Teams Toolkit CLI Collaboration**: Lets developers and project owner invite other collaborators to the Teams Toolkit CLI project. You can collaborate to debug and deploy a Teams Toolkit CLI project.

* **Teams Toolkit CLI**: Accelerates Teams application development. It also enables CI/CD scenario where you can integrate CLI in scripts for automation.

## Get Started

Install `teamsapp` from `npm` and run `teamsapp -h` to check all available commands:

```bash
  npm install -g @microsoft/teamsapp-cli
  teamsapp -h
```

## Supported commands

| Command | Description |
|----------------|-------------|
| `teamsapp new`| Create new Teams application.|
| `teamsapp add`| Adds features to your Teams application.|
| `teamsapp auth`| Manage cloud service accounts. The supported cloud services are 'Azure' and 'Microsoft 365'. |
| `teamsapp env` | Manage environments. |
| `teamsapp provision` | Provision cloud resources in the current application.|
| `teamsapp deploy` | Deploy the current application.  |
| `teamsapp package` | Build your Teams app into package for publishing.|
| `teamsapp validate` | Validate the current application.|
| `teamsapp publish` | Publish the app to Teams.|
| `teamsapp preview` | Preview the current application. |
| `teamsapp config`  | Manage the configuration data. |
| `teamsapp permission`| Collaborate with other developers in same project.|
| `teamsapp update` | Update the specific application manifest file. |
| `teamsapp upgrade` | Upgrade the project to work with the latest version of Teams Toolkit. |
| `teamsapp doctor` | Prerequisites to create Teams application.|

## Interactive mode

`teamsapp` command runs in interactive mode by default. You can work in non-interactive mode by setting `--interactive` flag to `false`.

## `teamsapp new`

By default, `teamsapp new` is in interactive mode and guides to create new Teams application. You can work in non-interactive mode by setting `--interactive` flag to `false`.

| Command | Description |
|:----------------  |:-------------|
| `teamsapp new template` | Create an app from an existing template. |
| `teamsapp new template list` | List all the available templates. |

### Parameters for `teamsapp new`

| Parameter | Required | Description |
|:---------------- |:-------------|:-------------|
|`--app-name` | Yes| Name of your Teams application.|
|`--interactive`| No | Select the options interactively. The options are `true` and `false` and default value is `true`.|
|`--capabilities`| No| Choose Teams application capabilities, the options are `tab`, `tab-non-sso`, `tab-spfx`, `bot`, `message-extension`, `notification`, `command-bot`, `sso-launch-page`, `search-app`. The default value is `tab`.|
|`--programming-language`| No| Programming language for the project. The options are `javascript` or `typescript` and default value is `javascript`.|
|`--folder`| No | Project directory. A sub folder with your app name is created under this directory. The default value is `./`.|
|`--spfx-framework-type`| No| Applicable if `SPFx tab` capability is selected. Frontend Framework. The options are `none`, `react` and `minimal`, and default value is `none`.|
|`--spfx-web part-name`| No | Applicable if `SPFx tab` capability is selected. The default value is "helloworld".|
|`--bot-host-type-trigger`| No | Applicable if `Notification bot` capability is selected. The options are `http-restify`, `http-functions`, and `timer-functions`. The default value is `http-restify`.|

### Scenarios for `teamsapp new`

You can use interactive mode to create a Teams app. The following list provides scenarios on controlling all the parameters with `teamsapp new`:

* HTTP triggered notification bot with restify server.

  ```bash
  teamsapp new --interactive false --capabilities "notification" --bot-host-type-trigger "http-restify" --programming-language "typescript" --folder "./" --app-name       MyAppName
  ```

* Teams command and response bot.

  ```bash
  teamsapp new --interactive false --capabilities "command-bot" --programming-language "typescript" --folder "./" --app-name myAppName
  ```

* Tab app hosted on SPFx using React.

  ```bash
  teamsapp new --interactive false --app-name newspfxapp --capabilities tab-spfx --spfx-framework-type react
  ```

## `teamsapp add`

The following table lists different features to your Teams application along with their description.

| Command | Description |
|:----------------  |:-------------|
| `teamsapp add SPFxWebPart` | Auto-hosted SPFx web part tightly integrated with Microsoft Teams. |

## `teamsapp auth`

The following table lists the cloud service accounts, such as Azure and Microsoft 365.

| Command | Description |
|:----------------  |:-------------|
| `teamsapp auth login`  | Log in to the selected cloud service. Service options are Microsoft 365 or Azure. |
| `teamsapp auth logout`  | Log out of selected cloud service. Service options are Microsoft 365 or Azure. |
| `teamsapp auth show` | Display all connected cloud accounts information. |

## `teamsapp env`

Manage environments.

|  Command  | Description |
|:----------------  |:-------------|
| `teamsapp env add`  | Add a new environment by copying from the specified environment. |
| `teamsapp env list` | List all environments. |

### Scenarios for `teamsapp env`

Create a new environment by copying from the existing dev environment:

```bash
teamsapp env add staging --env dev
```

## `teamsapp provision`

Run the provision stage in `teamsapp.yml`.

Running `teamsapp provision --env local` triggers the provision stage in `teamsapp.local.yml` instead.

### Parameters for `teamsapp provision`

| Parameters | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |

## `teamsapp deploy`

Run the deploy stage in `teamsapp.yml`.

Running `teamsapp deploy --env local` triggers the deploy stage in `teamsapp.local.yml` instead.

### Parameters for `teamsapp deploy`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |

## `teamsapp validate`

Validate the Teams app using manifest schema or validation rules.

### Parameters for `teamsapp validate`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--manifest-path` | No | Select the input Teams app manifest file path, defaults to `${folder}/appPackage/manifest.json`. This manifest is validated using manifest schema. |
|`--app-package-file-path` | No | Select the zipped Teams app package path, defaults to `${folder}/appPackage/build/appPackage.${env}.zip`. This package is validated with validation rules. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |

## `teamsapp publish`

Run the publish stage in `teamsapp.yml`.

Running `teamsapp publish --env local` triggers the publish stage in `teamsapp.local.yml` instead.

### Parameters for `teamsapp publish`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No |Select root folder of the project. Defaults to `./`. |

## `teamsapp package`

Build your Teams app into a package for publishing.

### Parameters for `teamsapp package`

|Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--manifest-file-path` | No | Select the Teams app manifest template path, defaults to `${folder}/appPackage/manifest.json`. |
| `--output-zip-path` | No | Select the output path of the zipped app package, defaults to `${folder}/appPackage/build/appPackage.${env}.zip`. |
| `--output-manifest-path` | No | Select the output path of the generated manifest path, defaults to `${folder}/appPackage/build/manifest.${env}.json`. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |

## `teamsapp preview`

Preview the current application.

### Parameters for `teamsapp preview`

| Parameter | Required | Description |
|:---------------- | :------------- | :------------- |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |
| `--env` | No | Select an existing env for the project. Defaults to `local`. |
| `--manifest-file-path` | No | Select the Teams app `manifest file path`, defaults to `${folder}/appPackage/manifest.json`. |
| `--run-command` | No | The command to start local service. Work for `local` environment only. If undefined, `teamsapp` uses the auto detected one from project type (`npm run dev:teamsapp` or `dotnet run` or `func start`). If empty, `teamsapp` skips starting local service. |
| `--running-pattern` | No | The ready signal output that service is launched. Work for `local` environment only. If undefined, `teamsapp` uses the default common pattern ("started/successfully/finished/crashed/failed"). If empty, `teamsapp` treats process start as ready signal. |
| `--open-only` | No | Work for `local` environment only. If true, directly open web client without launching local service. Defaults to `false`. |
| `--m365-host` | No | Preview the application in Teams, Outlook, or the Microsoft 365 app [string] [choices: `teams`, `outlook`, `office`]. Defaults to `teams`. |
| `--browser` | No | Select browser to open Teams web client [string] [choices: `chrome`, `edge`, `default`]. Defaults to `default`. |
| `--browser-arg` | No | Argument to pass to the browser, for example, --browser-args="--guest. |
| `--exec-path` | No | The paths that are added to the system environment variable PATH when the command is executed, defaults to `${folder}/devTools/func`. |

### Scenarios for `teamsapp preview`

The following list provides the common scenarios for `teamsapp preview`:

`teamsapp preview` expects users have already ran `teamsapp provision` and `teamsapp deploy`.

* Local Preview

  Dependencies:

  * Node.js
  * .NET SDK
  * Azure Functions Core Tools

  ```typescript
  teamsapp preview --env --local
  teamsapp preview --env --local --browser chrome
  ```

* Remote Preview

  ```typescript
  teamsapp preview --env --remote
  teamsapp preview --env --remote --browser edge
  ```

  > [!NOTE]
  > The logs of the background services, such as React is saved in ~/.fx/cli-log/local-preview/.

## `teamsapp config`

Configure user settings.

### Parameters for `teamsapp config`

| Command | Description |
|:----------------  |:-------------|
| `teamsapp config get [option]` | Get user global settings. |
| `teamsapp config set` | Set user settings. |

### Scenarios for `teamsapp config`

* Stop sending telemetry data

  ```typescript
  teamsapp config set telemetry off
  ```

## `teamsapp permission`

Check, grant, and list user permission.

| Command | Description |
|:----------------  |:-------------|
| `teamsapp collaborator grant` | Check user's permission. |
| `teamsapp collaborator status` | Show permission status for the project. |

### Parameters for `teamsapp collaborator grant`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |
| `--email` | No | Input email address of collaborator. |
| `--teams-app-manifest` | No | Manifest of Your Teams app. |
| `--aad-app-manifest` | No | Manifest of your Microsoft Entra app. |

### Parameters for `teamsapp collaborator status`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |
| `--teams-app-manifest` | No | Manifest of Your Teams app. |
| `--aad-app-manifest` | No | Manifest of your Microsoft Entra app. |
| `--list-all-collaborators` | No | To list all collaborators. |

### Scenarios for `teamsapp permission`

* Grant Permission

  Project creator and collaborators can use `teamsapp` permission grant command to add a new collaborator to the project:

  ```typescript
  teamsapp permission grant --env dev --email user-email@user-tenant.com
  ```

  After you receive the required permission, project creator and collaborators can share the project with the new collaborator by GitHub, and the new collaborator can have all the permissions for Microsoft 365 account.

* Show Permission Status

  Project creator and collaborators can use `teamsapp collaborator status` command to view Microsoft 365 account permission for specific env:

  ```typescript
  teamsapp permission status --env dev
  ```

* List All Collaborators

  Project creator and collaborators can use `teamsapp collaborator status` command to view all collaborators for specific env:

  ```typescript
  teamsapp collaborator status --env dev --list-all-collaborators
  ```

## `teamsapp update aad-app`

Update the specific application manifest file.

| Command | Description |
|:----------------  |:-------------|
| `teamsapp entra-app update` | Update the Microsoft Entra App in the current application. |
| `teamsapp update` | Update the Teams App manifest to Teams Developer Portal. |

### Parameters for `teamsapp entra-app update`

| Parameter | Required |Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |
| `--entra-app-manifest-file` | No | Enter the Microsoft Entra app manifest template file path, it's a relative path to project root folder, defaults to `./aad.manifest.json`. |

### Parameters for `teamsapp update teams-app`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Specifies the environment name for the project scaffolded by Microsoft Teams Toolkit. |
| `--env-file` | Yes | Specifies the .env file that defines the env variables to replace in the Teams app manifest template file. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |
| `--manifest-file` | No | Specifies the Microsoft Teams app manifest file path. Default value: `./appPackage/manifest.json`. |
| `--package-file` |  | Specifies the zipped Microsoft Teams app package file path. |
| `--output-package-file` |  | Specifies the output zipped Microsoft Teams app package file path. Default value: `./appPackage/build/appPackage.${env}.zip`. |
| `--output-manifest-file` |  | Specifies the final output Microsoft Teams app manifest file path in which the placeholders are resolved. |

## `teamsapp upgrade`

Upgrade the project to work with the latest version of Teams Toolkit.

### Parameters for `teamsapp upgrade`

|Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--force` | No | Force upgrade the project to work with the latest version of Teams Toolkit. Defaults to `false`. |

## `teamsapp doctor`

| Command | Description |
|:----------------  |:-------------|
| `teamsapp install` |  |
| `teamsapp uninstall` |  |
| `teamsapp launchinfo` |  |

::: zone-end

::: zone pivot="version-two"

## TeamsFx Library

Microsoft Teams Framework (TeamsFx) is a library encapsulating common functionality and integration patterns, such as simplified access to Microsoft Identity. You can build apps for Microsoft Teams with zero configuration.

Following is a list of main TeamsFx features:

* **TeamsFx Collaboration**: Lets developers and project owner invite other collaborators to the TeamsFx project. You can collaborate to debug and deploy a TeamsFx project.

* **TeamsFx CLI**: Accelerates Teams application development. It also enables CI/CD scenario where you can integrate CLI in scripts for automation.

* **TeamsFx SDK**: Provides access to database, such as the primary TeamsFx code library contains simple authentication for both client and server-side code tailored for Teams developers.

## Get Started

Install `teamsapp` from `npm` and run `teamsapp -h` to check all available commands:

```bash
  npm install -g @microsoft/teamsapp-cli
  teamsapp -h
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

| Parameter | Required | Description |
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

Running `teamsfx provision --env local` triggers the provision stage in `teamsapp.local.yml` instead.

### Parameters for `teamsfx provision`

| Parameters | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |

## `teamsfx deploy`

Run the deploy stage in `teamsapp.yml`.

Running `teamsfx deploy --env local` triggers the deploy stage in `teamsapp.local.yml` instead.

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
| `--manifest-path` | No | Select the input Teams app manifest file path, defaults to `${folder}/appPackage/manifest.json`. This manifest is validated using manifest schema. |
|`--app-package-file-path` | No | Select the zipped Teams app package path, defaults to `${folder}/appPackage/build/appPackage.${env}.zip`. This package is validated with validation rules. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |

## `teamsfx publish`

Run the publish stage in `teamsapp.yml`.

Running `teamsfx publish --env local` triggers the publish stage in `teamsapp.local.yml` instead.

### Parameters for `teamsfx publish`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an environment for the project. |
| `--folder` | No |Select root folder of the project. Defaults to `./`. |

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
| `--run-command` | No | The command to start local service. Work for `local` environment only. If undefined, `teamsfx` uses the auto detected one from project type (`npm run dev:teamsfx` or `dotnet run` or `func start`). If empty, `teamsfx` skips starting local service. |
| `--running-pattern` | No | The ready signal output that service is launched. Work for `local` environment only. If undefined, `teamsfx` uses the default common pattern ("started/successfully/finished/crashed/failed"). If empty, `teamsfx` treats process start as ready signal. |
| `--open-only` | No | Work for `local` environment only. If true, directly open web client without launching local service. Defaults to `false`. |
| `--m365-host` | No | Preview the application in Teams, Outlook, or the Microsoft 365 app [string] [choices: `teams`, `outlook`, `office`]. Defaults to `teams`. |
| `--browser` | No | Select browser to open Teams web client [string] [choices: `chrome`, `edge`, `default`]. Defaults to `default`. |
| `--browser-arg` | No | Argument to pass to the browser, for example, --browser-args="--guest. |
| `--exec-path` | No | The paths that are added to the system environment variable PATH when the command is executed, defaults to `${folder}/devTools/func`. |

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
| `--aad-app-manifest` | No | Manifest of your Microsoft Entra app. |

### Parameters for `teamsfx permission status`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./`. |
| `--teams-app-manifest` | No | Manifest of Your Teams app. |
| `--aad-app-manifest` | No | Manifest of your Microsoft Entra app. |
| `--list-all-collaborators` | No | To list all collaborators. |

### Scenarios for `teamsfx permission`

* Grant Permission

  Project creator and collaborators can use `teamsfx` permission grant command to add a new collaborator to the project:

  ```typescript
  teamsfx permission grant --env dev --email user-email@user-tenant.com
  ```

  After you receive the required permission, project creator and collaborators can share the project with the new collaborator by GitHub, and the new collaborator can have all the permissions for Microsoft 365 account.

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
| `teamsfx update aad-app` | Update the Microsoft Entra App in the current application. |
| `teamsfx update teams-app` | Update the Teams App manifest to Teams Developer Portal. |

### Parameters for `teamsfx update aad-app`

| Parameter | Required |Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |
| `--manifest-file-path` | No | Enter the Microsoft Entra app manifest template file path, it's a relative path to project root folder, defaults to `./aad.manifest.json`. |

### Parameters for `teamsfx update teams-app`

| Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--env` | Yes | Select an existing environment for the project. |
| `--folder` | No | Select root folder of the project. Defaults to `./` |
| `--manifest-file-path` | No | Enter the Teams app manifest template file path, it's a relative path to project root folder, defaults to `./appPackage/manifest.json`. |

## `teamsfx upgrade`

Upgrade the project to work with the latest version of Teams Toolkit.

### Parameters for `teamsfx upgrade`

|Parameter | Required | Description |
|:----------------  |:-------------|:-------------|
| `--force` | No | Force upgrade the project to work with the latest version of Teams Toolkit. Defaults to `false`. |

::: zone-end

::: zone pivot="version-one"

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

| Parameter | Required | Description |
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
| `teamsfx add sso` | Develop a single sign-on (SSO) feature for Teams tabs and bot capability. |
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

| Command | Description |
|:----------------  |:-------------|
| `teamsfx provision manifest` | Provision a Teams App in Teams Developer portal with corresponding information specified in the given manifest file. |

### Parameters for `teamsfx provision`

| Parameter  | Required | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes| Select an environment for the project. |
|`--subscription`| No | Specify an Azure Subscription ID. |
|`--resource-group`| No | Set the name of an existing resource group. |
|`--sql-admin-name`| No | Applicable when there's SQL resource in the project. Admin name of SQL.|
|`--sql-password`| No| Applicable when there's SQL resource in the project. Admin password of SQL.|

## `teamsfx deploy`

This command is used to deploy the current application. By default it deploys entire project but its also possible to deploy partially. The options are `frontend-hosting`, `function`, `apim`, `bot`, `spfx`, `aad-manifest`, and `manifest`.

### Parameters for `teamsfx deploy`

| Parameter  | Required | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes| Select an existing environment for the project. |
|`--open-api-document`| No | Applicable when there's APIM resource in the project. The open API document file path. |
|`--api-prefix`| No | Applicable when there's APIM resource in the project. The API name prefix. The default unique name of the API is `{api-prefix}-{resource-suffix}-{api-version}`. |
|`--api-version`| No | Applicable when there's APIM resource in the project. The API version. |
|`--include-app-manifest`| No | Whether to deploy app manifest to Teams platform. Options are `yes` and `not`. The default value is `no`. |
|`--include-aad-manifest`| No | Whether to deploy Microsoft Entra manifest. Options are `yes` and `not`. The default value is `no`. |

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

| Parameter  | Required | Description |
|:----------------  |:-------------|:-------------|
|`--local`| No | Preview the application from local. `--local` is exclusive with `--remote`. |
|`--remote`| No | Preview the application from remote. `--remote` is exclusive with `--local`. |
|`--env`| No | Select an existing environment for the project when parameter `--remote` is appended. |
|`--folder`| No | Project root directory. The default value is `./`. |
|`--browser`| No | The browser to open Teams web client. The options are `chrome`, `edge` and `default` such as system default browser and the value is `default`. |
|`--browser-arg`| No | Argument to pass to the browser, requires --browser, can be used multiple times, for example, --browser-args="--guest" |
|`--sharepoint-site`| No | SharePoint site URL, such as `{your-tenant-name}.sharepoint.com` for SPFx project remote preview. |
|`--m365-host`| No |Preview the application in Teams, Outlook or Microsoft 365 (formally known as Office app). Options are `teams`, `outlook` and `office`. The default value is `teams`. |

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

| Parameter  | Required | Description |
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
  * [Azure Functions Core Tools installation guide](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/vscode-extension/envchecker-help.md#how-to-install-azure-functions-core-tools).

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

| Parameter  | Required | Description |
|:----------------  |:-------------|:-------------|
|`--env`| Yes | Provide env name. |
|`--email`| Yes | Provide collaborator's Microsoft 365 email address. Ensure the collaborator's account is in the same tenant with creator. |

### Parameters for `teamsfx permission status`

| Parameter | Required | Description |
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

7. Provision again. Teams Toolkit updates Microsoft Entra ID, and manifest for you.

8. Find your `appPackage.dev.zip` in build, or AppPackage folder, and add to Teams.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [TeamsFx SDK for TypeScript or JavaScript](TeamsFx-SDK.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env.md)
* [Collaborate on Teams project using Teams Toolkit](TeamsFx-collaboration.md)

::: zone-end
