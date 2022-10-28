| Property name | Purpose | Required? | Minimum manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request will include this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
| `type` | Set the type of command. Possible values include `query` and `action`. If not, present the default value is set to `query` | No | 1.4 |
| `initialRun` | Optional parameter, used with `query` commands. If set to **true**, indicates this command should be executed as soon as the user chooses this command in the UI. | No | 1.0 |
| `fetchTask` | Optional parameter, used with `action` commands. Set to **true** to fetch the adaptive card or web url to display within the task module. This is used when the input to the `action` command is dynamic as opposed to a static set of parameters. Note that if set to **true** the static parameter list for the command is ignored | No | 1.4 |
| `parameters` | Static list of parameters for the command. | Yes | 1.0 |
| `parameter.name` | The name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes this parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text` | No | 1.4 |
| `context` | Optional array of values that defines the context the message action is available in. Possible values are `message`, `compose`, or `commandBox`. Default is `["compose", "commandBox"]`. | No | 1.5 |
|`taskInfo`||Specify the task module to preload when using a message extension command| No | 1.4 |
|`taskInfo.title`|Initial dialog title|No | 1.4 |
|`taskInfo.width`|Dialog width - either a number in pixels or default layout such as 'large', 'medium', or 'small'|No | 1.4 |
|`taskInfo.height`|Dialog height - either a number in pixels or default layout such as 'large', 'medium', or 'small'|No | 1.4 |
|`taskInfo.url`|Initial webview URL|No | 1.4 |
|`messageHandlers`|A list of handlers that allow apps to be invoked when certain conditions are met. Domains must also be listed in `validDomains`|No | 1.5 |
|`messageHandlers.type`|The type of message handler. Must be `"link"`.|No | 1.5 |
|`messageHandlers.value.domains`|Array of domains that the link message handler can register for.|No | 1.5 |
