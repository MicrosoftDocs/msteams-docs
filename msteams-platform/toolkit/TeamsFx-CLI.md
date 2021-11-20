# TeamsFx Command Line Interface

TeamsFx CLI is a text-based command line interface that accelerates Teams application development. It aims to provide delightful keyboard centric experience when building Teams applications. It also enables CI/CD scenario where CLI can be easily integrated in scripts for automation.

# Commands

| `teamsFx` Commands  | Descriptions |
|:----------------  |:-------------|
| `teamsfx new`       | Create a new Teams application. |
| `teamsfx account`   | Manage cloud service accounts. The supported cloud services are 'Azure' and 'M365'.          |
| `teamsfx env`       | Manage the environments. |
| `teamsfx capability`| Add new capabilities to the current application.         |
| `teamsfx resource`  | Manage the resources in the current application.         |
| `teamsfx provision` | Provision the cloud resources in the current application.             |
| `teamsfx deploy`    | Deploy the current application.  |
| `teamsfx build`     | Build the current application.         |
| `teamsfx test`      | Test and validate the current application.             |
| `teamsfx publish`   | Publish the app to Teams.             |
| `teamsfx preview`   | Preview the current application. |
| `teamsfx config`    | Manage the configuration data. |
| `teamsfx permission`| Collaborate with other developers in same project.|

***

# `teamsfx new`

`teamsfx new` will by default go into interactive mode and guide you through the process of creating a new Teams application by asking few questions. You can also do it in an non-interactive way by setting `--interactive` flag to `false`.

## Commands

| `teamsFx new` Commands  | Descriptions |
|:----------------  |:-------------|
| `teamsfx new template <template-name>`     | Create an app from an existing template |
| `teamsfx new template list`     | List all the available templates |

## Required Parameters

`--app-name`
Name of your Teams application.

## Optional Parameters

> Below options can always take effect.

### `--interactive`

Select the options interactively. Options are `true` and `false`. The default value is `false`.

### `--capabilities`

Choose Teams application capabilities. Options(multiple) are: `tab`, `bot` and `message-extension`. The default value is: `tab`.

### `--host-type`

Frontend hosting type. Options are `azure` and `spfx`, the default value is: `azure`.

### `--programming-language`  

Programming Language for the project. Options are `javascrip` or `typescript` and default value is: `javascript`.

### `--folder`

Project directory. A sub folder with the your app name will be created under this directory. The default value is: `./`.

> Below options will take effect if `--host-type` is set to `spfx`.

### `--spfx-framework-type`

Frontend Framework. Options are `none` and `react`, the default value is: `none`.

### `--spfx-webpart-name`

Webpart Name. The default value is: "helloworld".

### `--spfx-webpart-desp`

Webpart Description. The default value is: "helloworld description".

> Below options will take effect if `--host-type` is set to `azure`.

### `--azure-resources`

Add Azure resources to your project. Options(Multiple) are `sql` (Azure SQL Database) and `function` (Azure Functions).

> Below Options will take effect if `--capabilities` include `bot` or `message-extension`.

### `--way-to-register-bot`

Options are `create-new` to Register a new bot or `reuse-existing` to reuse an existing one. Reuse existing bot requires `bot-id` and `bot-password`. The default value is: `create-new`.

### `--bot-id`

Bot id.

### `--bot-password`

Bot password.

## Examples

Using interactive mode to create a Teams app is super intuitive, please try it by starting with `teamsfx new`. Here are some examples for you to play with if you enjoy controlling all the parameters.

### A tab app hosted on SPFx using React

```bash
teamsfx new --interactive false --app-name newspfxapp --host-type spfx --spfx-framework-type react
```

### A Teams app contains multiple capabilities

```bash
teamsfx new --interactive false --app-name newtabbotapp --host-type azure --capabilities tab bot
```

### A Teams tab app with Azure Functions and Azure SQL

```bash
teamsfx new --interactive false --app-name newapp --host-type azure --azure-resources sql function
```

***

# teamsfx account

Manage cloud service accounts. The supported cloud services are `azure` and `m365`.

## Commands

| `teamsFx account` Commands  | Descriptions |
|:----------------  |:-------------|
| `teamsfx account login <service>`      | Log in to the selected cloud service. |
| `teamsfx account logout <service>`      | log out of selected cloud service. |
| `teamsfx account set`      | Update account settings. |

## Parameters for `teamsfx account set`

### `--subscription`  

**(Required)** Enter a subscription id.

***

# `teamsfx env`

Manage the environments.

## Commands

| `teamsfx env` Commands  | Descriptions |
|:----------------  |:-------------|
| `teamsfx env add <new_env_name> --env <existing_env_name>` | Add a new environment by copying from the specified environment. |
| `teamsfx env list` | List all environments. |

## Examples

### Add a new environment

Add a new environment by copying from the existing dev environment.

```bash
teamsfx env add staging --env dev
```

***

# teamsfx capability

Add new capabilities to the current application.

## Commands

| `teamsFx capability` Commands  | Descriptions |
|:----------------  |:-------------|
| `teamsfx capability add tab`      | Add a tab. |
| `teamsfx capability add bot`      | Add a bot. |
| `teamsfx capability add message-extension`      | Add a Messaging Extension. |
> Note: Once your project include a bot, messaging extension cannot be added any more and it applies vice versa. You can include both bot and messaging extensions in your project when creating a new Teams app project.

## Parameters for `teamsfx capability add bot` and `teamsfx capability add message-extension`

### `--way-to-register-bot`

Options are `create-new` to Register a new bot or `reuse-existing` to reuse an existing one. Reuse existing bot requires `bot-id` and `bot-password`. The default value is: `create-new`.

### `--bot-id`

Bot id.

### `--bot-password`

Bot password.

***

# teamsfx resource

Manage the resources in the current application. Supported `<resource-type>` are: `azure-sql`, `azure-function` and `azure-apim` .

## Commands

| `teamsFx resource` Commands  | Descriptions |
|:----------------  |:-------------|
| `teamsfx resource add <resource-type>`      | Add a resource into current application.|
| `teamsfx resource show <resource-type>`      | Show configuration details of the resource. |
| `teamsfx resource list`      | List all the resources in the current application. |

## Parameters for `teamsfx resource add azure-function`

### `--function-name`

Provide a function name. The default value is: `getuserprofile`.

## Parameters for `teamsfx resource add azure-sql`

### `--function-name`

Provide a function name. The default value is: `getuserprofile`.
> Note: We ask for function name because SQL needs to be accessed from server workload. If your project doesn't contain `Azure Functions` we will create one for you.

## Parameters for `teamsfx resource add azure-apim`

> Below options will take effect when you try to use an existing `APIM` instance. By default, you don't have to specify any options and it will create a new instance during `teamsfx provision` step.

### `--subscription`

Select a subscription

### `--apim-resource-group`

The name of resource group.

### `--apim-service-name`

The name of the API Management service instance.

### `--function-name`

Provide a function name. The default value is: `getuserprofile`.
> Note: We ask for function name because `Azure API Management` needs to work with `Azure Functions` If your project doesn't contain `Azure Functions` we will create one for you.

***

# `teamsfx provision`

Provision the cloud resources in the current application.

## Required Parameters

### `--env`

Select or create an environment for the project.

## Optional Parameters

### `--subscription`

Specify an Azure Subscription ID.

### `--resource-group`

Set the name of an existing resource group.

> Below options will take effect when there is SQL resource in your project.

### `--sql-admin-name`

Admin name of SQL

### `--sql-password`

Admin password of SQL

### `--sql-confirm-password`  

Confirm admin password of SQL

***

# `teamsfx deploy`

This command is used to deploy the current application. By default it will deploy entire project but it's also possible for you to deploy partially of your project. Options(Multiple) are: `frontend-hosting`, `function`, `apim`, `teamsbot`, `spfx`.

## Required Parameters

### `--env`

Select an existing environment for the project.

## Optional Parameters

> Below options will take effect when your project contains `apim`.

### `--open-api-document`  

The Open API document file path.

### `--api-prefix`

The API name prefix. The default unique name of the API will be `{api-prefix}-{resource-suffix}-{api-version}`.

### `--api-version`

The API version.

***

# `teamsfx validate`

Validate current application. This command will validate your application's manifest file.

## Required Parameters

### `--env`

Select an existing environment for the project.

***

# `teamsfx publish`

Publish the app to Teams.

## Required Parameters

### `--env`

Select an existing environment for the project.

***

# `teamsfx preview`

Preview the current application from local or remote.

## Optional Parameters

### `--local`

Preview the application from local. `--local` is exclusive with `--remote`.

### `--remote`

Preview the application from remote. `--remote` is exclusive with `--local`.

### `--env`

Select an existing environment for the project when parameter `--remote` appended.

### `--folder`

Project root directory. The default value is `./`.

### `--browser`

The browser to open Teams web client. Options are `chrome`, `edge` and `default` (system default browser). The default value is `default`.

## Examples

### Local Preview

```bash
teamsfx preview --local
teamsfx preview --local --browser chrome
```

### Remote Preview

```bash
teamsfx preview --remote
teamsfx preview --remote --browser edge
```

## Local Preview Dependencies

- Node.js
- .NET SDK
- Azure Functions Core Tools

## Notes

- SPFx preview is not supported currently.
- The logs of the background services like React will be saved in `~/.fx/cli-log/local-preview/`.

***

# `teamsfx config`

Manage the configuration data either in user scope or project scope.

## Commands

| `teamsfx config` Commands  | Descriptions |
|:----------------  |:-------------|
| `teamsfx config get [option]` | View the configuration value of option |
| `teamsfx config set <option> <value>` | Update the configuration value of option |

## Required Parameters

### `--env`

Select an existing environment for the project.

## Optional Parameters

> Below options can always take effect.

### `--folder`

Project directory. This is used when get/set project configuration. The default value is: `./`.

### `--global`

Scope of configuration. If this is true, the scope is limited to user scope instead of project scope. The default value is: `false`.
Currently supported global configurations:
- telemetry
- validate-dotnet-sdk
- validate-func-core-tools
- validate-node

## Examples

Secrets in .userdata file are encrypted, `teamsfx config` could help you viewing / updating these values.

### Stop sending telemetry data

```bash
teamsfx config set telemetry off
```

### Disable environment checker

There are three configs to turn on/off Node.js, .NET SDK and Azure Functions Core Tools validation, and all of them are enabled by default. You are able to set the config to "off" if you do not need the dependencies validation and would like to install the dependencies by yourself. Check the [Node.js installation guide](../vscode-extension/envchecker-help.md#how-to-install-nodejs), [.NET SDK installation guide](../vscode-extension/envchecker-help.md#how-to-install-net-sdk) and [Azure Functions Core Tools installation guide](../vscode-extension/envchecker-help.md#how-to-install-azure-functions-core-tools).

For example, to disable .NET SDK validation, you can use the following command.

```bash
teamsfx config set validate-dotnet-sdk off
```

To enable .NET SDK validation, you can use the following command.

```bash
teamsfx config set validate-dotnet-sdk on
```

### View all the user scope configuration

```bash
teamsfx config get -g
```

### View all the configuration in project

The secret will automatically decrypted.

```bash
teamsfx config get --env dev
```

### Update the secret configuration in project

```bash
teamsfx config set fx-resource-aad-app-for-teams.clientSecret xxx --env dev
```

# Collaborate with other developers

Teams Toolkit CLI provides `teamsFx permission` Commands for collaboration scenario.

## Commands

| `teamsFx permission` Commands | Descriptions |
|:------------------------------|-------------|
| `teamsfx permission grant` | Grant permission for collaborator's M365 account for the project |
| `teamsfx permission status` | Show permission status for the project |

***

### Parameters for `teamsfx permission grant`

- #### `--env`

	**(Required)** Provide env name.

- #### `--email`

	**(Required)** Provide collaborator's M365 email address. Note that the collaborators's account should be in the same tenant with creator.

### Parameters for `teamsfx permission status`

- #### `--env`

	**(Required)** Provide env name.

- #### `--list-all-collaborators`

	With this flag, Teams Toolkit CLI will print out all collaborators for this project.

## User Cases

Here are some examples for you to better handling permission for `TeamsFx` projects.

### Grant Permission

Project creator and collaborators can use `teamsfx permission grant` command to add a new collaborator to the project.

```bash
teamsfx permission grant --env dev --email user-email@user-tenant.com
```

After successfully granted permission, project creator and collaborators can share the project with the new collaborator by Github, and the new collaborator will have all permission for M365 account.

### Show Permission Status

Project creator and collaborators can use `teamsfx permission status` command to view his M365 account permission for specific env.

```bash
teamsfx permission status --env dev
```

### List All Collaborators

Project creator and collaborators can use `teamsfx permission status` command to view all collaborators for specific env.

```bash
teamsfx permission status --env dev --list-all-collaborators
```

## E2E Collaboration Work Flow in CLI

### As a Project Creator

- Create a new TeamsFx Tab project (You can also select bot), and the hosting type select Azure.

  ```bash
  teamsfx new --interactive false --app-name newapp --host-type azure
  ```

- Login M365 account and Azure account

  ```bash
  teamsfx account login azure
  teamsfx account login m365
  ```

- Provision your project

  ```bash
  teamsfx provision
  ```

- View collaborators. You should see yourself here.

  ```bash
  teamsfx permission status --env dev --list-all-collaborators
  ```

  ![list-all-collaborators](../images/permission-status-all.png)
- Add another account as collaborator. Note that the added account must under the same tenant.

  ```bash
  teamsfx permission grant --env dev --email user-email@user-tenant.com
  ```

  ![add-new-collaborator](../images/permission-grant.png)
- Push your project to GitHub

### As a Project Collaborator

- Clone the project from GitHub
- Login M365 account account. Note that the M365 account should be the same as added above.

  ```bash
  teamsfx account login m365
  ```

- Login Azure account which has contributor permission for all the Azure resources

  ```bash
  teamsfx account login azure
  ```

- Check permission status. You should find yourself have the owner permission of the project.

  ```bash
  teamsfx permission status --env dev
  ```

  ![permission-status](../images/permission-status.png)
- Update Tab code, and deploy the project to remote
- Launch remote and the project should work fine
