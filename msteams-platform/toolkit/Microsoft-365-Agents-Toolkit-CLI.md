---
title: Introduction to Microsoft 365 Agents Toolkit CLI
author: tecton
description: Learn about Microsoft 365 Agents Toolkit Command Line Interface for agent or app for Microsoft 365 development in different versions, supported commands, scenarios, interactive mode, global options.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/16/2025
---

# Microsoft 365 Agents Toolkit command line interface

Microsoft 365 Agents Toolkit command line interface (Microsoft 365 Agents Toolkit CLI) is a text-based command line interface that can help scaffold, validate, and deploy applications for Microsoft 365 from the terminal or a CI/CD process. For more information, see [source code](https://github.com/OfficeDev/Microsoft-365-Agents-Toolkit/tree/dev/packages/cli) and [npm package](https://www.npmjs.com/package/@microsoft/m365agentstoolkit-cli).

Whether you prefer keyboard-centric developer operations, or you are automating your CI/CD pipeline, the Microsoft 365 Agents Toolkit CLI offers the same features as the IDE extensions. It provides the following features to facilitate the development of agents or apps for Microsoft 365 Copilot, Microsoft Teams and Microsoft 365:

- **Collaboration**: Invite other developers to collaborate on your Microsoft 365 Agents Toolkit project to debug and deploy.
- **Agent/Application Creation**: Generate a new agent or app using available templates and samples.
- **Agent/Application Preview**: Upload and preview your agent or app in Teams, Outlook, and the Microsoft 365 app.
- **Resource Provisioning and Deployment**: Provision necessary cloud resources and deploy your application to Azure.
- **Validation, Packaging, and Publishing**: Validate, package, and publish your agent or application using CLI commands.
- **Environment Management**: Manage multiple environments, Microsoft Entra apps, and Teams app registration.

## Get started

Install `@microsoft/m365agentstoolkit-cli` from `npm` and run `atk -h` to check all available commands:

```bash
  npm install -g @microsoft/m365agentstoolkit-cli
  atk -h
```

:::image type="content" source="../assets/images/m365agentstoolkit-cli/npm-package-install.png" alt-text="Screenshot shows the installation of npm package." lightbox="../assets/images/m365agentstoolkit-cli/npm-package-install.png":::

## Supported commands

The following table lists the supported commands to help developers build and manage agents or applications:

| Command                                 | Description                                                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [`atk doctor`](#atk-doctor)             | Prerequisite checker for building Microsoft 365 Apps.                                                              |
| [`atk new`](#atk-new)                   | Create a new Microsoft 365 App.                                                                                    |
| [`atk add`](#atk-add)                   | Add feature to your Microsoft 365 App.                                                                             |
| [`atk auth`](#atk-auth)                 | Manage Microsoft 365 and Azure accounts.                                                                           |
| [`atk entra-app`](#atk-install)         | Manage the Microsoft Entra app in the current application.                                                         |
| [`atk env`](#atk-env)                   | Manage environments.                                                                                               |
| [`atk help`](#atk-help)                 | Show Microsoft 365 Agents Toolkit CLI help.                                                                        |
| [`atk install`](#atk-install)           | Sideload a given application package across Microsoft 365.                                                         |
| [`atk launchinfo`](#atk-launchinfo)     | Get launch information of an acquired Microsoft 365 App.                                                           |
| [`atk list`](#atk-list)                 | List available Microsoft 365 App templates and samples.                                                            |
| [`atk provision`](#atk-provision)       | Run the provision stage in `m365agents.yml` or `m365agents.local.yml`.                                             |
| [`atk deploy`](#atk-deploy)             | Run the deploy stage in `m365agents.yml` or `m365agents.local.yml`.                                                |
| [`atk package`](#atk-package)           | Build your Microsoft 365 App into a package for publishing.                                                        |
| [`atk validate`](#atk-validate)         | Validate the Microsoft 365 App using manifest schema, validation rules, or test cases.                             |
| [`atk publish`](#atk-publish)           | Run the publish stage in `m365agents.yml`.                                                                         |
| [`atk preview`](#atk-preview)           | Preview the current application.                                                                                   |
| [`atk update`](#atk-update)             | Update the Microsoft 365 App manifest to Teams Developer Portal.                                                   |
| [`atk upgrade`](#atk-upgrade)           | Upgrade the project to work with the latest version of Microsoft 365 Agents Toolkit.                               |
| [`atk collaborator`](#atk-collaborator) | Check, grant and list permissions for who can access and manage Microsoft 365 App and Microsoft Entra application. |
| [`atk uninstall`](#atk-uninstall)       | Clean up resources associated with Manifest ID, Title ID, or an environment.                                       |

:::image type="content" source="../assets/images/m365agentstoolkit-cli/list-of-commands.png" alt-text="Screenshot shows the list of available commands.":::

## Global options

The following are the global options you can use with each command:

| Options            | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `--version -v`     | Display Microsoft 365 Agents Toolkit CLI version.         |
| `--help -h`        | Show Microsoft 365 Agents Toolkit CLI help.               |
| `--interactive -i` | Run the command in interactive mode. Default value: true. |
| `--debug`          | Print debug information. Default value: false.            |
| `--verbose`        | Print diagnostic information. Default value: false.       |
| `--telemetry`      | Whether to enable telemetry. Default value: true.         |

:::image type="content" source="../assets/images/m365agentstoolkit-cli/global-options.png" alt-text="Screenshot shows the list of global options.":::

## Interactive mode

Commands have different default interactive modes. Some commands are interactive by default and some are non-interactive. To determine the default interactive mode of a command, use the `-h` option with the specific command.

## `atk doctor`

The `atk doctor` command checks for the prerequisites needed to build Microsoft 365 Apps.

## `atk new`

The `atk new` command operates in an interactive mode by default and provides guidance to create a new Microsoft 365 App. To work `atk new` in a non-interactive mode, set the `--interactive` flag to `false`.

```bash
atk new
atk new -i false
```

| Command            | Description                                            |
| :----------------- | :----------------------------------------------------- |
| `atk new sample`   | Create an app from existing sample.                    |
| `atk list samples` | Displays a list of all available pre-existing samples. |

### `atk new` parameters

The following table lists the parameters available for `atk new`:

| Parameter                       | Required | Description                                                                                                                                                                                            |
| :------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--app-name -n`                 | Yes      | Name of your application.                                                                                                                                                                              |
| `--capability -c`               | Yes      | Specifies the app feature. The available options are `declarative-agent`, `basic-custom-engine-agent` and `weather-agent`, etc. Use `atk list templates` to see all available options.                 |
| `--programming-language -l`     | No       | Programming Language. The available options are `javascript`, `typescript`, and `csharp`. The default value is `javascript`.                                                                           |
| `--folder -f`                   | No       | Directory where the project folder will be created in. The default value is `./`.                                                                                                                      |
| `--spfx-solution -s`            | No       | Create or import an existing SharePoint Framework solution. The available options are `new` and `import`. The default value is `new`.                                                                  |
| `--spfx-install-latest-package` | No       | Install the latest version of SharePoint Framework. The default value is `true`.                                                                                                                       |
| `--spfx-framework-type -k`      | No       | Applicable if `framework` capability is selected. The available options are `minimal`, `react`, and `none`. The default value is `react`.                                                              |
| `--spfx-webpart-name -w`        | No       | Name for SharePoint Framework Web Part. The default value is `helloworld`.                                                                                                                             |
| `--spfx-folder`                 | No       | Directory or Path that contains the existing SharePoint Framework solution.                                                                                                                            |
| `--me-architecture -m`          | No       | Architecture of Search Based Message Extension. The available options are `new-api`, `api-spec`, and `bot`. The default value is `new-api`.                                                            |
| `--openapi-spec-location -a`    | No       | OpenAPI description document location.                                                                                                                                                                 |
| `--api-operation -o`            | No       | Select operation(s) Teams can interact with.                                                                                                                                                           |
| `--bot-host-type-trigger -t`    | No       | Specifies the trigger for `Chat Notification Message` app template. The available options are `http-express`, `http-webapi`, and `http-and-timer-functions`, etc. The default value is `http-express`. |

:::image type="content" source="../assets/images/m365agentstoolkit-cli/atk-new-parameters.png" alt-text="Screenshot shows the atk new parameters." lightbox="../assets/images/m365agentstoolkit-cli/atk-new-parameters.png":::

### `atk new` scenarios

The following are a list of scenarios to control all the parameters with `atk new`:

- Create a weather agent.

  ```bash
  atk new -c weather-agent -l typescript -n myagent -i false
  ```

- Create a new timer triggered notification bot.

  ```bash
  atk new -c notification -t timer-functions -l typescript -n myapp -i false
  ```

- Import an existing SharePoint Framework solution.

  ```bash
  atk new -c tab-spfx -s import --spfx-folder <folder-path> -n myapp -i false
  ```

## `atk add`

Add feature to your Microsoft 365 App.

| Command                           | Description                                                                     |
| :-------------------------------- | :------------------------------------------------------------------------------ |
| `atk add spfx-web-part [options]` | Auto-hosted SPFx web part tightly integrated with Microsoft 365.                |
| `atk add action [options]`        | An action to extend Copilot using your APIs.                                    |
| `atk add auth-config [options]`   | Add Configurations to Support Actions with Authentication in Declarative Agent. |
| `atk add capability [options]`    | A capability to extend Copilot using your APIs.                                 |

## `atk auth`

Manage Microsoft 365 and Azure accounts.

| Command                     | Description                                             |
| :-------------------------- | :------------------------------------------------------ |
| `atk auth list`             | Display all connected Microsoft 365 and Azure accounts. |
| `atk auth login`            | Log in to Microsoft 365 or Azure account.               |
| `atk auth logout <service>` | Log out of Microsoft 365 or Azure account.              |

## `atk entra-app`

Manage the Microsoft Entra app in the current application.

| Command                | Description                                                |
| :--------------------- | :--------------------------------------------------------- |
| `atk entra-app update` | Update the Microsoft Entra app in the current application. |

## `atk env`

Manage environments.

| Command         | Description                                                      |
| :-------------- | :--------------------------------------------------------------- |
| `atk env add`   | Add a new environment by copying from the specified environment. |
| `atk env list`  | Lists all available environments.                                |
| `atk env reset` | Reset environment file.                                          |

### `atk env` scenario

Create a new environment by copying from the existing dev environment:

```bash
atk env add staging --env dev
```

## `atk help`

The `atk help` command displays all the commands available for Microsoft 365 Agents Toolkit CLI.

## `atk install`

Sideload a given application package across Microsoft 365.

### `atk install` parameters

The following table lists the parameters available for `atk install`:

| Command       | Description                           |
| :------------ | :------------------------------------ |
| `--file-path` | Path to the App manifest zip package. |
| `--xml-path`  | Path to the XML manifest xml file.    |
| `--scope`     | App scope. Options: Personal, Shared. |

### `atk install` scenarios

Sideload the application package with JSON-based manifest to Teams, Outlook, and the Microsoft 365 app.

```bash
atk install --file-path appPackage.zip
```

Sideload the application package in Shared scope with JSON-based manifest to Teams, Outlook, and the Microsoft 365 app.

```bash
atk install --file-path appPackage.zip --scope Shared
```

Sideload the Outlook add-in application package with XML-based manifest to Outlook.

```bash
atk install --xml-path manifest.xml
```

## `atk launchinfo`

Get launch information of an acquired Microsoft 365 App.

### `atk launchinfo` parameters

The following table lists the parameters available for `atk launchinfo`:

| Command         | Description                                                  |
| :-------------- | :----------------------------------------------------------- |
| `--title-id`    | Specifies the title ID of the acquired Microsoft 365 app.    |
| `--manifest-id` | Specifies the manifest ID of the acquired Microsoft 365 app. |

### `atk launchinfo` scenarios

Get launch information of the acquired Microsoft 365 app by title ID.

```bash
atk launchinfo --title-id U_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Get launch information of the acquired Microsoft 365 app by manifest ID.

```bash
atk launchinfo --manifest-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## `atk list`

List available Microsoft 365 App templates and samples.

### `atk list` parameters

The following table lists the parameters available for `atk list`:

| Command              | Description                                 |
| :------------------- | :------------------------------------------ |
| `atk list samples`   | Displays a list of available app samples.   |
| `atk list templates` | Displays a list of available app templates. |

:::image type="content" source="../assets/images/m365agentstoolkit-cli/atk-list-templates.png" alt-text="Screenshot shows the list of templates.":::

## `atk provision`

The `atk provision` command runs the provision stage in `m365agents.yml`.

To trigger the provision stage in `m365agents.local.yml`, run `atk provision --env local`.

### `atk provision` parameters

The following table lists the parameters available for `atk provision`:

| Parameters          | Required | Description                                                                                |
| :------------------ | :------- | :----------------------------------------------------------------------------------------- |
| `--env`             | No       | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit. |
| `--folder -f`       | No       | Specifies the project's root folder. Default to `./`.                                      |
| `--ignore-env-file` | No       | Whether to skip loading .env file when --env is not specified.                             |

## `atk deploy`

The `atk deploy` command runs the deploy stage in `m365agents.yml`.

To trigger the deploy stage in `m365agents.local.yml`, run `atk deploy --env local`.

### `atk deploy` parameters

The following table lists the parameters available for `atk deploy`:

| Parameter               | Required | Description                                                                                |
| :---------------------- | :------- | :----------------------------------------------------------------------------------------- |
| `--env`                 | Yes      | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit. |
| `--folder -f`           | No       | Specifies the project's root folder. Default to `./`.                                      |
| `--ignore-env-file`     | No       | Whether to skip loading .env file when --env is not specified.                             |
| `--config-file-path -c` | No       | Specifies the path of the configuration yaml file.                                         |

## `atk package`

Build your Microsoft 365 App into a package for publishing.

### `atk package` parameters

The following table lists the parameters available for `atk package`:

| Parameter               | Required | Description                                                                                                   |
| :---------------------- | :------- | :------------------------------------------------------------------------------------------------------------ |
| `--env`                 | No       | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit.                    |
| `--env-file`            | No       | Specifies the .env file that defines the variables to replace in the app manifest template file.              |
| `--manifest-file`       | No       | Specifies the app manifest file path. Default value: `./appPackage/manifest.json`.                            |
| `--output-folder`       | No       | Specifies the output folder containing the manifest(s). Default value: `./appPackage/build`.                  |
| `--output-package-file` | No       | Specifies the output zipped app package file path. Default value: `./appPackage/build/appPackage.${env}.zip`. |
| `--folder -f`           | No       | Specifies the project's root folder. Default to `./`.                                                         |

## `atk validate`

Validate the Microsoft 365 App using manifest schema, validation rules, or test cases.

### `atk validate` parameters

The following table lists the parameters available for `atk validate`:

| Parameter               | Required | Description                                                                                                   |
| :---------------------- | :------- | :------------------------------------------------------------------------------------------------------------ |
| `--env`                 | No       | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit.                    |
| `--env-file`            | No       | Specifies the .env file that defines the variables to replace in the app manifest template file.              |
| `--manifest-file`       | No       | Specifies the app manifest file path. Default value: `./appPackage/manifest.json`.                            |
| `--package-file`        | No       | Specifies the zipped app package file path.                                                                   |
| `--output-folder`       | No       | Specifies the output folder containing the manifest(s). Default value: `./appPackage/build`.                  |
| `--output-package-file` | No       | Specifies the output zipped app package file path. Default value: `./appPackage/build/appPackage.${env}.zip`. |
| `--folder -f`           | No       | Specifies the project's root folder. Defaults to `./`.                                                        |
| `--validate-method -m`  | No       | Specifies validation method Allowed value: `validation-rules` or `test-cases`.                                |

## `atk publish`

The `atk publish` command runs the publish stage in `m365agents.yml`.

### `atk publish` parameters

The following table lists the parameters available for `atk publish`:

| Parameter               | Required | Description                                                                                                   |
| :---------------------- | :------- | :------------------------------------------------------------------------------------------------------------ |
| `--env`                 | No       | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit.                    |
| `--env-file`            | No       | Specifies the .env file that defines the variables to replace in the app manifest template file.              |
| `--manifest-file`       | No       | Specifies the app manifest file path. Default value: `./appPackage/manifest.json`.                            |
| `--package-file`        | No       | Specifies the zipped app package file path.                                                                   |
| `--output-folder`       | No       | Specifies the output folder containing the manifest(s). Default value: `./appPackage/build`.                  |
| `--output-package-file` | No       | Specifies the output zipped app package file path. Default value: `./appPackage/build/appPackage.${env}.zip`. |
| `--folder -f`           | No       | Specifies the project's root folder. Defaults to `./`.                                                        |

## `atk preview`

The `atk preview` command allows you to preview your app during development. This command provides a real-time view of your app, helping you identify and fix issues before deployment.

### `atk preview` parameters

The following table lists the parameters available for `atk preview`:

| Parameter              | Required | Description                                                                                                                                                                                                                                             |
| :--------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--m365-host -m`       | No       | Preview the application in Teams, Outlook, or the Microsoft 365 app. The available options are `teams`, `outlook`, and `office`. The default value is `teams`.                                                                                          |
| `--manifest-file`      | No       | Specifies the app manifest file path. Default value: `./appPackage/manifest.json`.                                                                                                                                                                      |
| `--run-command -c`     | No       | The command starts the service and works only in local environment. If undefined, it auto-detects the appropriate command from project type (`npm run dev:teamsapp`, `dotnet run`, or `func start`). If empty, it will skip starting the local service. |
| `--running-pattern -p` | No       | The ready signal output that service is launched. Works for `local` environment only. If undefined, the command defaults to (started\|successfully\|finished\|crashed\|failed\|listening\|ready). If empty, the process start as ready signal.          |
| `--open-only -o`       | No       | Works for `local` environment only. If true, directly open web client without launching local service. Defaults to `false`.                                                                                                                             |
| `--browser -b`         | No       | Select browser to open Microsoft Teams web client. The available options are `chrome`, `edge`, and `default`. Defaults to `default`.                                                                                                                    |
| `--browser-arg -ba`    | No       | Argument to pass to the browser. For example, `--browser-args="--guest`.                                                                                                                                                                                |
| `--exec-path -ep`      | No       | The paths that are added to the system environment variable "PATH" when the command is executed. The default value is `devTools/func`.                                                                                                                  |
| `--desktop -d`         | No       | If true, open Teams desktop client instead of web client. Default value: false.                                                                                                                                                                         |
| `--env`                | No       | Specifies an existing environment for the project. Defaults to `local`.                                                                                                                                                                                 |
| `--folder -f`          | No       | Specifies the project's root folder. Defaults to `./`.                                                                                                                                                                                                  |

### `atk preview` scenarios

The `atk preview` command must be used after `atk provision` and `atk deploy`.

The following list provides the common scenarios for `atk preview`:

- Local Preview: The following are the dependencies to use local preview:

  - Node.js
  - .NET SDK
  - Azure Functions Core Tools

  ```typescript
  atk preview --env --local
  atk preview --env --local --browser chrome
  ```

- Remote Preview

  ```typescript
  atk preview --env --remote
  atk preview --env --remote --browser edge
  ```

  > [!NOTE]
  > The logs of the background services, such as React is saved in `~/.fx/cli-log/local-preview/`.

## `atk update`

Update the app manifest to Developer Portal.

### `atk update` parameters

The following table lists the parameters available for `atk update`:

| Parameter               | Required | Description                                                                                                   |
| :---------------------- | :------- | :------------------------------------------------------------------------------------------------------------ |
| `--env`                 | No       | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit.                    |
| `--env-file`            | No       | Specifies the .env file that defines the variables to replace in the app manifest template file.              |
| `--manifest-file`       | No       | Specifies the app manifest file path. Default value: `./appPackage/manifest.json`.                            |
| `--package-file`        | No       | Specifies the zipped app package file path.                                                                   |
| `--output-folder`       | No       | Specifies the output folder containing the manifest(s). Default value: `./appPackage/build`.                  |
| `--output-package-file` | No       | Specifies the output zipped app package file path. Default value: `./appPackage/build/appPackage.${env}.zip`. |
| `--folder -f`           | No       | Specifies the project's root folder. Defaults to `./`.                                                        |

## `atk upgrade`

Upgrade the project to work with the latest version of Microsoft 365 Agents Toolkit.

### `atk upgrade` parameters

The following table lists the parameters available for `atk upgrade`:

| Parameter    | Required | Description                                                                                                               |
| :----------- | :------- | :------------------------------------------------------------------------------------------------------------------------ |
| `--force -f` | No       | Force upgrade the project to work with the latest version of Microsoft 365 Agents Toolkit. The defaults value is `false`. |

## `atk collaborator`

Check, grant and list permissions for who can access and manage app and Microsoft Entra application.

| Command                   | Description                                            |
| :------------------------ | :----------------------------------------------------- |
| `atk collaborator status` | Displays the current permission status of the project. |
| `atk collaborator grant`  | Grant permission for another account.                  |

### `atk collaborator status` parameters

The following table lists the parameters available for `atk collaborator status`:

| Parameter                      | Required | Description                                                                                      |
| :----------------------------- | :------- | :----------------------------------------------------------------------------------------------- |
| `--env`                        | No       | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit.       |
| `--manifest-file`              | No       | Specifies the app manifest file path. Default value: `./appPackage/manifest.json`.               |
| `--entra-app-manifest-file -a` | No       | Select the path for the Entra manifest template file. Defaults to `${folder}/aad.manifest.json`. |
| `--all -a`                     | No       | Display all collaborators.                                                                       |
| `--folder -f`                  | No       | Select the project's root folder. Defaults to `./`.                                              |

### `atk collaborator grant` parameters

The following table lists the parameters available for `atk collaborator grant`:

| Parameter                      | Required | Description                                                                                 |
| :----------------------------- | :------- | :------------------------------------------------------------------------------------------ |
| `--email`                      | No       | Enter the collaborator's email address.                                                     |
| `--manifest-file`              | No       | Specifies the app manifest file path. Default value: `./appPackage/manifest.json`.          |
| `--entra-app-manifest-file -a` | No       | Select the path for the Entra app manifest file. Defaults to `${folder}/aad.manifest.json`. |
| `--env`                        | No       | Specifies the environment name for the project scaffolded by Microsoft 365 Agents Toolkit.  |
| `--folder -f`                  | No       | Select the project's root folder. Defaults to `./`.                                         |

### `atk collaborator` scenarios

- Grant permission for another Microsoft 365 account to collaborate on the app.

  ```typescript
  atk collaborator grant -i false --manifest-file ./appPackage/manifest.json --env dev --email other@email.com
  ```

## `atk uninstall`

Clean up resources associated with Manifest ID, Title ID, or an environment in Microsoft 365 Agents Toolkit generated project. Resources include app registration in Teams Developer Portal, bot registration in Bot Framework Portal, and uploaded custom apps in Microsoft 365 apps.

### `atk uninstall` parameters

The following table lists the parameters available for `atk uninstall`:

| Command         | Description                                                   |
| :-------------- | :------------------------------------------------------------ |
| `--mode`        | Choose a way to clean up resources.                           |
| `--title-id`    | Specifies the title ID of the installed Microsoft 365 app.    |
| `--manifest-id` | Specifies the manifest ID of the installed Microsoft 365 app. |

### `atk uninstall` scenarios

Remove the acquired Microsoft 365 Application using Title ID.

```bash
atk uninstall -i false --mode title-id --title-id U_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Remove the acquired Microsoft 365 Application using Manifest ID.

```bash
atk uninstall -i false --mode manifest-id --manifest-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --options 'm365-app,app-registration,bot-framework-registration'
```

Remove the acquired Microsoft 365 Application using environment in Microsoft 365 Agents Toolkit generated project.

```bash
atk uninstall -i false --mode env --env xxx --options 'm365-app,app-registration,bot-framework-registration' --folder ./myapp
```

Uninstall in interactive mode.

```bash
atk uninstall
```
