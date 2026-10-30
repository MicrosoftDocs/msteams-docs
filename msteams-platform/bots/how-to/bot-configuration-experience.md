---
title: Create an Agent Configuration Experience in Teams
description: Learn to set up and reconfigure bot settings directly within the channel or group chat post-installation. Code sample (.NET, Node.js).
ms.topic: article
ms.owner: angovil
ms.localizationpriority: high
ms.date: 10/30/2026
zone_pivot_groups: teams-sdk-languages
---

# Create an agent configuration experience in Teams

An agent configuration experience is a settings flow that lets users configure an agent during installation and reconfigure it later in a channel or group chat. Use it to collect the information your agent needs to work with a team's workflows, without asking users to leave Teams. For example, users can choose the news topics or GitHub repositories an agent monitors, then change those settings as their needs change.

## Prerequisites

Before you implement the configuration experience, you need:

* An agent project that supports a channel or group chat scope. For more information, see [Understand agent concepts](../bot-concepts.md).
* Access to the app manifest to update `bots.configuration`.
* A configuration dialog or Adaptive Card to collect the settings your agent needs. For more information, see [Dialogs](../../task-modules-and-cards/what-are-task-modules.md).

## User experience

Users configure the agent when they add it to a channel or group chat. They can later reopen its settings to adapt the agent to changing requirements.

### Configure during installation

The following example shows a user adding an agent to a group chat and configuring its settings.

:::image type="content" source="../../assets/images/bots/configuration-bot.gif" alt-text="Screenshot that shows adding an agent to a group chat and configuring its settings during installation.":::

### Reconfigure after installation

Users can reopen the configuration experience to change the agent's settings, as shown in the following example.

:::image type="content" source="../../assets/images/bots/reconfiguration-mention-bot.gif" alt-text="Screenshot that shows the agent settings option above the message compose area.":::

Users can reopen settings in either of the following ways:

* @mention the agent in the message compose area, then select **Settings** above the compose area. Update the agent's configuration in the dialog that opens.

   :::image type="content" source="../../assets/images/bots/reconfiguration-mention-bot.gif" alt-text="Screenshot that shows where to open agent settings after mentioning the agent.":::

* Hover over the agent to open its profile card, then select the settings icon. Update the agent's configuration in the dialog that opens.

   :::image type="content" source="../../assets/images/bots/reconfiguration-hover.gif" alt-text="Screenshot that shows the settings icon in an agent profile card in a group chat.":::

## Developer experience

To implement the configuration experience, follow these steps:

1. [Update app manifest](#update-app-manifest)
1. [Configure your agent](#configure-your-agent)

<a id="build-agent-configuration-experience"></a>

## Implement agent configuration experience

Support both initial configuration during installation and reconfiguration after installation.

### Update app manifest

In the app manifest (previously called Teams app manifest) file, update the `fetchTask` property under the `bots.configuration` object as follows:

```json
"bots": [
    {
      "botId": "${{AAD_APP_CLIENT_ID}}",
     "needsChannelSelector": false,
      "scopes": [
        "personal",
        "team",
        "groupChat"
      ],
      "configuration":{
        "groupChat":{
          "fetchTask": true
        },
        "team":{
          "fetchTask": true
        }
      },
      "isNotificationOnly": false
    }
  ],
```

* `groupChat.fetchTask` — Enables dynamic configuration requests in the group chat scope. Set this to `true` so your agent can return a configuration dialog or Adaptive Card.
* `team.fetchTask` — Enables dynamic configuration requests in the team channel scope. Set this to `true` so channel users can configure your agent.

For more information, see [app manifest schema](/microsoft-365/extensibility/schema/root-bots-configuration).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+app+manifest&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fbot-configuration-experience%23update-app-manifest&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fbot-configuration-experience.md&documentVersionIndependentId=415c2389-14be-5efd-9542-a58bf8a03900&platformId=7be118d5-e34d-24a2-73f8-81d8ec7c3cdf&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Configure your agent

When a user installs the agent in channel or group chat, the `fetchTask` property in the app manifest file initiates either `config.fetch` or `config.submit`.

If you set the `fetchTask` property in the app manifest to:

* **false**: The agent doesn't fetch a dialog or an Adaptive Card. Instead, the agent must provide a static dialog or card that is used when the agent is invoked. For more information, see [dialogs](../../task-modules-and-cards/what-are-task-modules.md).

* **true**: The agent initiates either `config.fetch` or `config.submit` as defined. When the agent is invoked, you can return an Adaptive Card or a dialog depending on the context provided in [channelData and userdata](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat).

The following table lists the response type associated with the invoke requests:

| Invoke request | Response type |
| --- | --- |
| `config.fetch` | `type: "continue"` or `type: "auth"` |
| `config.submit` | `type: "continue"` or `type: "message"` |

#### Continue the configuration dialog

Use `type: "continue"` to return a dialog or Adaptive Card when your agent needs more input from the user.

When the user submits the configuration, the `config.submit` invoke is triggered. Read the user's input and return a different Adaptive Card if more input is needed. You can also return a [dialog](../../task-modules-and-cards/what-are-task-modules.md).

::: zone pivot="teams-sdk-csharp"

```csharp
using CardAction = Microsoft.Teams.Cards.Action;
using TaskSize = Microsoft.Teams.Api.TaskModules.Size;

app.OnConfigFetch((context, cancellationToken) =>
{
    var card = new AdaptiveCard
    {
        Body = new List<CardElement>
        {
            new TextBlock("Configure your agent") { Weight = TextWeight.Bolder }
        },
        Actions = new List<CardAction>
        {
            new SubmitAction { Title = "Submit" }
        }
    };

    var taskInfo = new TaskInfo
    {
        Title = "test card",
        Width = new Union<int, TaskSize>(600),
        Height = new Union<int, TaskSize>(500),
        Card = new Attachment(card)
    };

    return System.Threading.Tasks.Task.FromResult<ConfigResponse>(
        new ConfigTaskResponse(new ContinueTask(taskInfo)));
});
```

* `Title` — Sets the title shown on the configuration dialog. Set this to `"test card"` for the sample, or use a title that describes your settings.
* `Width` and `Height` — Set the dimensions of the agent configuration dialog. Set these to `600` and `500` so the sample card has room to display.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('config.open', async (): Promise<ConfigResponse> => {
  const card = new AdaptiveCard({
    type: 'TextBlock',
    text: 'Configure your agent',
    weight: 'Bolder',
  }).withActions(
    new SubmitAction().withTitle('Submit')
  );

  return {
    responseType: 'config',
    config: {
      type: 'continue',
      value: {
        card: cardAttachment('adaptive', card),
        height: 500,
        width: 600,
        title: 'test card',
      },
    },
  };
});
```

* `config.type` — Keeps the configuration interaction open for user input. Set this to `'continue'` so Teams displays the configuration card.
* `config.value.card` — Supplies the Adaptive Card shown in the dialog. Set this to `cardAttachment('adaptive', card)` so users can interact with your configuration card.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_config_open
async def handle_config_open(
    ctx: ActivityContext[ConfigFetchInvokeActivity]
) -> ConfigInvokeResponse:
    card = AdaptiveCard(
        body=[
            TextBlock(text="Configure your agent", weight="Bolder")
        ],
        actions=[
            SubmitAction(title="Submit")
        ]
    )

    return ConfigResponse(
        config=TaskModuleContinueResponse(
            value=CardTaskModuleTaskInfo(
                card=card_attachment(AdaptiveCardAttachment(content=card)),
                height=500,
                width=600,
                title="test card",
            )
        )
    )
```

* `card` — Supplies the Adaptive Card shown in the dialog. Set this to `card_attachment(AdaptiveCardAttachment(content=card))` so users can interact with your configuration card.
* `height` and `width` — Set the dimensions of the agent configuration dialog. Set these to `500` and `600` so the sample card has room to display.

::: zone-end

#### Request authentication

Use `type: "auth"` in a response to `config.fetch` when your agent requires the user to authenticate. Provide a sign-in URL that opens a valid authentication page in a browser.

> [!NOTE]
> `type: "auth"` supports only third-party authentication, not single sign-on (SSO). For more information, see [Add authentication](../../messaging-extensions/how-to/add-authentication.md).

::: zone pivot="teams-sdk-csharp"

```csharp
app.OnConfigFetch((context, cancellationToken) =>
{
    var response = new ConfigAuthResponse(
        new ConfigAuth
        {
            SuggestedActions = new SuggestedActions
            {
                To = [context.Activity.From.Id],
                Actions =
                [
                    new CardAction(ActionType.OpenUrl)
                    {
                        Title = "Sign in to this app",
                        Value = "https://example.com/auth"
                    }
                ]
            }
        });

    return System.Threading.Tasks.Task.FromResult<ConfigResponse>(response);
});
app.OnConfigSubmit((context, cancellationToken) =>
{
    var response = new ConfigTaskResponse(
        new MessageTask("You have chosen to finish setting up agent"));

    return System.Threading.Tasks.Task.FromResult<ConfigResponse>(response);
});
```

* `SuggestedActions.To` — Identifies the user who receives the sign-in action. Set this to `[context.Activity.From.Id]` so the action targets the user configuring the agent.
* `ActionType.OpenUrl` — Specifies the action used to open authentication. Pass this to `CardAction` so users can open your authentication page.
* `Value` — Provides the destination URL for the sign-in action. Set this to your authentication page URL, replacing `"https://example.com/auth"` so users reach your service.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('config.open', async ({ activity }): Promise<ConfigResponse> => {
  return {
    responseType: 'config',
    config: {
      type: 'auth',
      suggestedActions: {
        to: [activity.from.id],
        actions: [
          {
            type: 'openUrl',
            value: 'https://example.com/auth',
            title: 'Sign in to this app',
          },
        ],
      },
    },
  };
});
```

* `config.type` — Selects an authentication response for the configuration request. Set this to `'auth'` so Teams prompts the user to sign in.
* `suggestedActions.to` — Identifies the user who receives the sign-in action. Set this to `[activity.from.id]` so the action targets the user configuring the agent.
* `suggestedActions.actions[].value` — Provides the destination URL for the sign-in action. Set this to your authentication page URL, replacing `'https://example.com/auth'` so users reach your service.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_config_open
async def handle_config_open(
    ctx: ActivityContext[ConfigFetchInvokeActivity]
) -> ConfigInvokeResponse:
    return ConfigResponse(
        config=ConfigAuth(
            suggested_actions=SuggestedActions(
                to=[],
                actions=[
                    CardAction(
                        type="openUrl",
                        value="https://example.com/auth",
                        title="Sign in to this app",
                    )
                ],
            )
        )
    )
```

* `type` — Specifies the action used to open authentication. Set this to `"openUrl"` so users can open your authentication page.
* `value` — Provides the destination URL for the sign-in action. Set this to your authentication page URL, replacing `"https://example.com/auth"` so users reach your service.

::: zone-end

#### Complete configuration

Use `type: "message"` to return a message that ends the interaction or provides information without requesting more input.

::: zone pivot="teams-sdk-csharp"

```csharp

app.OnConfigSubmit(async (context) =>
{
    return new ConfigTaskResponse(
        new MessageTask("You have chosen to finish setting up agent")
    );
});

```

* `MessageTask` message — Supplies the final message shown after configuration completes. Set this to `"You have chosen to finish setting up agent"` for the sample, or use a confirmation that describes the result.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('config.submit', async ({ activity, send }) => {
  return {
    config: {
      type: 'message',
      value: 'You have chosen to finish setting up agent',
    },
  };
});
```

* `config.type` — Ends the configuration interaction with a response message. Set this to `'message'` so Teams doesn't request more input.
* `config.value` — Supplies the final message shown after configuration completes. Set this to `'You have chosen to finish setting up agent'` for the sample, or use a confirmation that describes the result.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_config_submit
async def handle_config_submit(
    ctx: ActivityContext[ConfigSubmitInvokeActivity]
) -> ConfigInvokeResponse:
    return ConfigResponse(
        config=TaskModuleMessageResponse(
            value="You have chosen to finish setting up agent",
        )
    )
```

* `value` — Supplies the final message shown after configuration completes. Set this to `"You have chosen to finish setting up agent"` for the sample, or use a confirmation that describes the result.

::: zone-end

When a user reconfigures the agent, the `fetchTask` property in the app manifest initiates `config.fetch` in the agent logic. Use the same handler to support the entry points described in [Reconfigure after installation](#reconfigure-after-installation).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Configure+your+agent&&author=%40vikasalmal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fbot-configuration-experience%23configure-your-agent&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fbot-configuration-experience.md&documentVersionIndependentId=415c2389-14be-5efd-9542-a58bf8a03900&platformId=7be118d5-e34d-24a2-73f8-81d8ec7c3cdf&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Handle errors

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |

<!-- TODO: Add error codes -->

## Code sample

| Sample name | Description | .NET | Node.js | Manifest |
| --- | --- | --- | --- | --- |
| Agent configuration app | Configure and reconfigure Adaptive Cards in teams and group chats. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-configuration-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-configuration-app/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-configuration-app/csharp/demo-manifest) |
| Agent configuration app with auth | Configure and reconfigure an agent with dynamic search on Adaptive Cards. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-configuration-app-auth/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-configuration-app-auth/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-configuration-app-auth/csharp/demo-manifest) |

<a id="best-practices"></a>

## Design guidelines and best practices

* Track configuration per channel when your agent needs channel-specific settings. Configuration data isn't stored for you. Use the [channelData](../../messaging-extensions/how-to/action-commands/create-task-module.md#payload-activity-properties-when-a-dialog-is-invoked-from-a-group-chat) in the invoke payload to identify the channel.
* Provide a clear dialog that asks for the information your agent needs, such as a URL, an area path, or a dashboard link.
* Avoid sending repeated configuration notifications after installation, which can confuse users.
* For an app with both agent and tab capabilities, choose the default landing capability that matches your configuration flow. For more information, see [Configure your app's default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Limitations and known issues

* The agent configuration experience is supported only in a channel or group chat, not in personal scope.
* Authentication responses support only third-party authentication. SSO isn't supported for `type: "auth"`.
* Your agent is responsible for storing configuration data.

## Next step

> [!div class="nextstepaction"]
> [Invoke and dismiss dialogs](../../task-modules-and-cards/task-modules/invoking-task-modules.md)

## See also

* [Understand agent concepts](../bot-concepts.md)
* [Dialogs](../../task-modules-and-cards/what-are-task-modules.md)
* [Cards](../../task-modules-and-cards/what-are-cards.md)
