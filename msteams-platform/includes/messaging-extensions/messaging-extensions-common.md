## Add a message extension to your app

A message extension is a bot-based extensibility point in your Teams app that lets users search external systems or trigger actions from the compose area, command box, or directly from a message, and respond with structured data such as an [Adaptive Card](~/task-modules-and-cards/what-are-cards.md). You build message extensions using the [Microsoft Teams SDK (Teams AI Library)](/microsoftteams/platform/teams-sdk/), which provides handlers for the `query`, `submitAction`, `fetchTask`, and `selectItem` invokes. The Teams SDK supports bot-based message extensions only; for API-only scenarios, see [API-based message extensions](~/messaging-extensions/api-based-overview.md).

:::image type="content" source="../../assets/images/compose-extensions/ceflow.png" alt-text="Screenshot that shows the action-based message extension in Teams.":::

### Provision your bot identity

Provision a bot identity for your app using [Microsoft 365 Agents Toolkit](/microsoftteams/platform/teams-sdk/teams/configuration/agents-toolkit), the [Teams CLI](/microsoftteams/platform/teams-sdk/developer-tools/cli), or the [Developer Portal for Teams](https://dev.teams.microsoft.com/home). The toolkit handles bot registration, credential setup (client secret or federated identity), and supplies the bot ID through the `${{BOT_ID}}` placeholder used in your app manifest. For details, see [App authentication setup](/microsoftteams/platform/teams-sdk/teams/app-authentication/overview).

### Update your app manifest

Update your app [manifest](/microsoft-365/extensibility/schema/root-compose-extensions) to include the message extension properties. These properties govern how your message extension appears and behaves in the Microsoft Teams client. For an end-to-end manifest reference for SDK-based apps, see [Teams Manifest](/microsoftteams/platform/teams-sdk/teams/manifest).

#### Declare your message extension

To add a message extension, include a top-level `composeExtensions` array in your manifest.

> [!NOTE]
> The manifest refers to message extensions as `composeExtensions`. This is to maintain backward compatibility.

The extension definition is an object that has the following structure:

| Property name | Purpose | Required? |
|---|---|---|
| `botId` | The unique Microsoft app ID for the bot as registered with the Azure Bot Service. | Yes |
| `scopes` | Array declaring whether this extension can be added to `personal`, `team`, or `groupChat` scopes. | Yes |
| `canUpdateConfiguration` | Enables **Settings** menu item. | No |
| `commands` | Array of commands that this message extension supports. | Yes |

> [!Note]
> If you set the `canUpdateConfiguration` property to `true` in the app manifest, you can display the **Settings** menu item for your message extension. To enable **Settings**, you must also handle `onQuerySettingsUrl` and `onSettingsUpdate`.

#### Define commands

Your message extension declares one or more commands, which appear when the user selects your app from the **Actions and apps** (**+**) menu in the compose box.

:::image type="content" source="../../assets/images/compose-extensions/compose-extension-list.png" alt-text="Screenshot is an example that shows a list of message extensions in Teams.":::

In the app manifest, your command item is an object with the following structure:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request includes this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | Set the type of command. Possible values include `query` and `action`. If not present, the default value is set to `query`. | No | 1.4 |
| `initialRun` | Optional parameter, used with `query` commands. If set to **true**, indicates this command should be executed as soon as the user chooses this command in the UI. | No | 1.0 |
| `fetchTask` | Optional parameter, used with `action` commands. Set to **true** to fetch an Adaptive Card or web URL to display within a [dialog](~/task-modules-and-cards/what-are-task-modules.md). Use this when the input to the `action` command is dynamic rather than a static set of parameters. If set to **true**, the static parameter list for the command is ignored. | No | 1.4 |
| `parameters` | Static list of parameters for the command. | Yes | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter's purpose and example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text`. | No | 1.4 |
| `context` | Optional array of values that defines the context the message action is available in. Possible values are `message`, `compose`, or `commandBox`. Default is `["compose", "commandBox"]`. | No | 1.5 |
