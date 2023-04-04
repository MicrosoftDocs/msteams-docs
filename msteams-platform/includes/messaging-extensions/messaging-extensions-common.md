## Add a message extension to your app

A message extension is a cloud-hosted service that listens to user requests and responds with structured data, such as a [card](~/task-modules-and-cards/what-are-cards.md). You integrate your service with Microsoft Teams via Bot Framework `Activity` objects. Our .NET and Node.js extensions for the Bot Builder SDK can help you add message extension functionality to your app.

:::image type="content" source="../../assets/images/compose-extensions/ceflow.png" alt-text="Screenshot that shows the action-based message extension in Teams.":::

### Register in the Bot Framework

If you haven’t done so already, you must first register a bot with the Microsoft Bot Framework. The Microsoft app ID and callback endpoints for your bot, as defined there, will be used in your message extension to receive and respond to user requests. Remember to enable the Microsoft Teams channel for your bot.

Take note of your bot app ID and app password, you'll need to provide the app ID in your app manifest.

### Update your app manifest

As with bots and tabs, you update the [manifest](~/resources/schema/manifest-schema.md#composeextensions) of your app to include the message extension properties. These properties govern how your message extension appears and behaves in the Microsoft Teams client. Message extensions are supported beginning with manifest v1.0.

#### Declare your message extension

To add a message extension, include a new top-level JSON structure in your manifest with the `composeExtensions` property. Currently, you're limited to creating a single message extension for your app.

> [!NOTE]
> The manifest refers to message extensions as `composeExtensions`. This is to maintain backward compatibility.

The extension definition is an object that has the following structure:

| Property name | Purpose | Required? |
|---|---|---|
| `botId` | The unique Microsoft app ID for the bot as registered with the Bot Framework. This should typically be the same as the ID for your overall Teams app. | Yes |
| `scopes` | Array declaring whether this extension can be added to `personal` or `team` scopes (or both). | Yes |
| `canUpdateConfiguration` | Enables **Settings** menu item. | No |
| `commands` | Array of commands that this message extension supports. You're limited to 10 commands. | Yes |

#### Define commands

Your message extension should declare one command, which appears when the user selects your app from the **More options** (**&#8943;**) button in the compose box.

:::image type="content" source="../../assets/images/compose-extensions/compose-extension-list.png" alt-text="Screenshot is an example that shows a list of message extensions in Teams.":::

In the app manifest, your command item is an object with the following structure:

| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request will include this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | Set the type of command. Possible values include `query` and `action`. If not present, the default value is set to `query`. | No | 1.4 |
| `initialRun` | Optional parameter, used with `query` commands. If set to **true**, indicates this command should be executed as soon as the user chooses this command in the UI. | No | 1.0 |
| `fetchTask` | Optional parameter, used with `action` commands. Set to **true** to fetch the adaptive card or web url to display within the [dialog](~/task-modules-and-cards/what-are-task-modules.md). This is used when the input to the `action` command is dynamic as opposed to a static set of parameters. Note that if set to **true**, the static parameter list for the command is ignored. | No | 1.4 |
| `parameters` | Static list of parameters for the command. | Yes | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter’s purposes and example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text`. | No | 1.4 |
| `context` | Optional array of values that defines the context the message action is available in. Possible values are `message`, `compose`, or `commandBox`. Default is `["compose", "commandBox"]`. | No | 1.5 |
