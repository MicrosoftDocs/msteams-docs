---
title: Virtual Assistant for Microsoft Teams
description: How to create Virtual Assistant bot and skills for use in Microsoft Teams
localization_priority: Normal
ms.topic: how-to
keywords: teams virtual assistant bots
---

# Virtual Assistant for Microsoft Teams

Virtual Assistant is a Microsoft open-source template that enables you to create a robust conversational solution while maintaining full control of user experience, organizational branding, and necessary data. The [Virtual Assistant core template](https://microsoft.github.io/botframework-solutions/overview/virtual-assistant-template) is the basic building block that brings together the Microsoft technologies required to build a Virtual Assistant, including the [Bot Framework SDK](https://github.com/microsoft/botframework-sdk), [Language Understanding (LUIS)](https://www.luis.ai/), [QnA Maker](https://www.qnamaker.ai/), as well as essential capabilities including  skills registration, linked accounts, basic conversational intent to offer end users a range of seamless interactions and experiences. In addition, the template capabilities include rich examples of reusable conversational [skills](https://microsoft.github.io/botframework-solutions/overview/skills).  Individual skills can be integrated in a Virtual Assistant solution to enable multiple scenarios. Using the Bot Framework SDK, Skills are presented in source code form enabling you to customize and extend as required. See [What is a Bot Framework Skill](https://microsoft.github.io/botframework-solutions/overview/skills/).

![Virtual Assistant overview diagram](../assets/images/bots/virtual-assistant/overview.png)

Text message activities are routed to associated skills by the Virtual Assistant core using a [dispatch](/azure/bot-service/bot-builder-tutorial-dispatch?view=azure-bot-service-4.0&tabs=cs&preserve-view=true) model. 

## Implementation considerations

The decision to add a Virtual Assistant can include many determinants and differ for each organization. Here are the factors that support implementing a Virtual Assistant for your organization:

- A central team manages all employee experiences and has the capability to build a Virtual Assistant experience and manage updates to the core experience including the addition of new skills.
- Multiple applications exist across business functions and/or the number is expected to grow in the future.
- Existing applications are customizable, owned by the organization, and can be converted into skills for a Virtual Assistant.
- The central employee-experiences team is able to influence customizations to existing apps and provide necessary guidance for integrating existing applications as skills in Virtual Assistant experience

![Central team maintains the assistant, and business function teams contribute skills](../assets/images/bots/virtual-assistant/business-functions.png)

## Create a Teams-focused Virtual Assistant

Microsoft has published a [Visual Studio template](https://marketplace.visualstudio.com/items?itemName=BotBuilder.VirtualAssistantTemplate) for building Virtual Assistants and skills. With the Visual Studio template, you can create a Virtual Assistant, powered by a text-based experience with support for limited rich cards with actions. We have enhanced the Visual Studio base template to include Microsoft Teams platform capabilities and power great Teams app experiences. A few of the capabilities include support for rich adaptive cards, task modules, teams/group chats and messaging extensions. *See also*, [Tutorial: Extend Your Virtual Assistant to Microsoft Teams](https://microsoft.github.io/botframework-solutions/clients-and-channels/tutorials/enable-teams/1-intro/).

![High-level diagram of a Virtual Assistant solution](../assets/images/bots/virtual-assistant/high-level-diagram.png)

### Add adaptive cards to your Virtual Assistant

To dispatch requests properly, your Virtual Assistant needs to identify the correct LUIS model and corresponding skill associated with it. However, the dispatching mechanism cannot be used for card action activities since the LUIS model associated with a skill may not be trained for card action texts since these are fixed, pre-defined keywords, not utterances from a user.

We have resolved this by embedding skill information in the card action payload. Every skill should embed `skillId` in the  `value` field of card actions. This is the best way to ensure that each card action activity carries the relevant skill information and Virtual Assistant can utilize this information for dispatching.

Below is a card action data sample. By providing `skillId` in the constructor we ensure that skill information is always present in card actions.

```csharp
    public class CardActionData
    {
        public CardActionData(string skillId)
        {
            this.SkillId = skillId;
        }

        [JsonProperty("skillId")]
        public string SkillId { get; set; }
    }

    ...
    var button = new CardAction
    {
        Type = ActionTypes.MessageBack,
        Title = "Card action button",
        Text = "card action button text",
        Value = new CardActionData(<SkillId>),
    };
```

Next, we introduce `SkillCardActionData` class in the Virtual Assistant template to extract `skillId` from the card action payload.

```csharp
    // Skill Card action data should contain skillId parameter
    // This class is used to deserialize it and get skillId 
    public class SkillCardActionData
    {
        /// <summary>
        /// Gets the ID of the skil that should handle this card
        /// </summary>
        [JsonProperty("skillId")]
        public string SkillId { get; set; }
    }
```

Below is a code snippet to extract  `skillId` from card action data. We implemented it as an  extension method in the [Activity](https://github.com/microsoft/botframework-sdk/blob/master/specs/botframework-activity/botframework-activity.md) class.

```csharp
    public static class ActivityExtensions
    {
        // Fetches skillId from CardAction data if present
        public static string GetSkillId(this Activity activity)
        {
            string skillId = string.Empty;

            try
            {
                if (activity.Type.Equals(ActivityTypes.Message) && activity.Value != null)
                {
                    var data = JsonConvert.DeserializeObject<SkillCardActionData>(activity.Value.ToString());
                    skillId = data.SkillId;
                }
                else if (activity.Type.Equals(ActivityTypes.Invoke) && activity.Value != null)
                {
                    var data = JsonConvert.DeserializeObject<SkillCardActionData>(JObject.Parse(activity.Value.ToString()).SelectToken("data").ToString());
                    skillId = data.SkillId;
                }
            }
            catch
            {
                // If not able to retrive skillId, empty skillId should be returned
            }

            return skillId;
        }
    }
```

### Handle interruptions gracefully

Virtual Assistant can handle interruptions in cases where a user tries to invoke a skill while another skill is currently active. we have introduced `TeamsSkillDialog` and `TeamsSwitchSkillDialog`, based on Bot Framework's [SkillDialog](https://github.com/microsoft/botframework-solutions/blob/5b46d73e220bbb4fba86c48be532e495535ca78a/sdk/csharp/libraries/microsoft.bot.solutions/Skills/SkillDialog.cs) and [SwitchSkillDialog](https://github.com/microsoft/botframework-solutions/blob/6d40fa8ae05f96b0c5e0464e01361a9e1deb696c/sdk/csharp/libraries/microsoft.bot.solutions/Skills/Dialogs/SwitchSkillDialog.cs), to enable users to switch a skill experience from card actions. To handle this request the Virtual Assistant prompts the user with a confirmation message to switch skills.

![Confirmation prompt when switching to a new skill](../assets/images/bots/virtual-assistant/switch-skills-prompt.png)

### Handling task module requests

To add task module capabilities to a Virtual Assistant, two additional methods are included in the Virtual Assistant activity handler: `OnTeamsTaskModuleFetchAsync` and `OnTeamsTaskModuleSubmitAsync`. These methods listen to task module-related activities from Virtual Assistant, identify the skill associated with the request, and forward the request to the identified skill. 

Request forwarding is done via the  [SkillHttpClient](/dotnet/api/microsoft.bot.builder.integration.aspnet.core.skills.skillhttpclient?view=botbuilder-dotnet-stable&preserve-view=true), `PostActivityAsync` method. It returns the response as `InvokeResponse` which is parsed and converted to `TaskModuleResponse` .

```csharp
    public static TaskModuleResponse GetTaskModuleRespose(this InvokeResponse invokeResponse)
    {
        if (invokeResponse.Body != null)
        {
            return new TaskModuleResponse()
            {
                Task = GetTask(invokeResponse.Body),
            };
        }

        return null;
    }

    private static TaskModuleResponseBase GetTask(object invokeResponseBody)
        {
            JObject resposeBody = (JObject)JToken.FromObject(invokeResponseBody);
            var task = resposeBody.GetValue("task");
            var taskType = task.SelectToken("type").ToString();

            return taskType switch
            {
                "continue" => new TaskModuleContinueResponse()
                {
                    Type = taskType,
                    Value = task.SelectToken("value").ToObject<TaskModuleTaskInfo>(),
                },
                "message" => new TaskModuleMessageResponse()
                {
                    Type = taskType,
                    Value = task.SelectToken("value").ToString(),
                },
                _ => null,
            };
        }
```

A similar approach is followed for card action dispatching and task module responses. Task module fetch and submit action data is updated to include `skillId`. 
Activity Extension method `GetSkillId` extracts `skillId` from the payload which provides details about the skill that needs to be invoked.

Below is a code snippet for `OnTeamsTaskModuleFetchAsync` and `OnTeamsTaskModuleSubmitAsync` methods.

```csharp
    // Invoked when a "task/fetch" event is received to invoke task module.
    protected override async Task<TaskModuleResponse> OnTeamsTaskModuleFetchAsync(ITurnContext<IInvokeActivity> turnContext, TaskModuleRequest taskModuleRequest, CancellationToken cancellationToken)
    {
        try
        {
            string skillId = (turnContext.Activity as Activity).GetSkillId();
            var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == skillId).First().Value;

            // Forward request to correct skill
            var invokeResponse = await _skillHttpClient.PostActivityAsync(this._appId, skill, _skillsConfig.SkillHostEndpoint, turnContext.Activity as Activity, cancellationToken);

            return invokeResponse.GetTaskModuleRespose();
        }
        catch (Exception exception)
        {
            await turnContext.SendActivityAsync(_templateEngine.GenerateActivityForLocale("ErrorMessage"));
            _telemetryClient.TrackException(exception);

            return null;
        }
    }

    // Invoked when a 'task/submit' invoke activity is received for task module submit actions.
    protected override async Task<TaskModuleResponse> OnTeamsTaskModuleSubmitAsync(ITurnContext<IInvokeActivity> turnContext, TaskModuleRequest taskModuleRequest, CancellationToken cancellationToken)
    {
        try
        {
            string skillId = (turnContext.Activity as Activity).GetSkillId();
            var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == skillId).First().Value;

            // Forward request to correct skill
            var invokeResponse = await _skillHttpClient.PostActivityAsync(this._appId, skill, _skillsConfig.SkillHostEndpoint, turnContext.Activity as Activity, cancellationToken).ConfigureAwait(false);

            return invokeResponse.GetTaskModuleRespose();
        }
        catch (Exception exception)
        {
            await turnContext.SendActivityAsync(_templateEngine.GenerateActivityForLocale("ErrorMessage"));
            _telemetryClient.TrackException(exception);

            return null;
        }
    }
```

Additionally, all skill domains must be included in the `validDomains` section in Virtual Assistant's manifest file so that task modules invoked via a skill render properly.

### Handling collaborative app scopes

Teams apps can exist in multiple scopes including 1:1 chat, group chat, and channels. The core Virtual Assistant template is designed for 1:1 chats. As part of the onboarding experience Virtual Assistant  prompts users for name and maintains user state. Since that onboarding experience is not suited for group chat/channel scopes it has been removed.

Skills should handle activities in multiple scopes (1:1 chat, group chat, and channel conversation). If any of these scopes are not supported, skills should respond with an appropriate message.

The following  processing functions have been added to Virtual Assistant core:

- Virtual Assistant can be invoked without any text message from a group chat or channel.
- Articulations are cleaned (i.e.,  remove the necessary @mention of the bot) before sending the message to the dispatch module.

```csharp
    if (innerDc.Context.Activity.Conversation?.IsGroup == true)
    {
        // Remove bot atmentions for teams/groupchat scope
        innerDc.Context.Activity.RemoveRecipientMention();

        // If bot is invoked without any text, reply with FirstPromptMessage
        if (string.IsNullOrWhiteSpace(innerDc.Context.Activity.Text))
        {
            await innerDc.Context.SendActivityAsync(_templateEngine.GenerateActivityForLocale("FirstPromptMessage"));
            return EndOfTurn;
        }
    }
```

### Handling messaging extensions

The commands for a messaging extension are declared in your app manifest file. The messaging extension user interface is powered by those commands. For a Virtual Assistant to power a messaging extension command (as an attached skill), a Virtual Assistant's own manifest must contain those commands. The commands from an individual skill's manifest should be added to the Virtual Assistant's manifest as well. The command ID provides information about an associated skill by appending the skill's app ID via a separator (`:`).

Below is a snippet from a skill's manifest file.

```json
 "composeExtensions": [
    {
        "botId": "<Skil_App_Id>",
        "commands": [
            {
                "id": "searchQuery",
                "context": [ "compose", "commandBox" ],
                "description": "Test command to run query",
    ....
```

And, below is the corresponding Virtual Assistant manifest file code snippet.

```json
 "composeExtensions": [
    {
        "botId": "<VA_App_Id>",
        "commands": [
            {
                "id": "searchQuery:<skill_id>",
                "context": [ "compose", "commandBox" ],
                "description": "Test command to run query",
    ....
```

Once the commands are invoked by a user, the Virtual Assistant can identify an associated skill by parsing the command ID, update the activity by removing the extra suffix (`:<skill_id>`) from the command ID,  and forward it to the corresponding skill. The code for a skill doesn't need to handle the extra suffix, thus, conflicts between command IDs across skills are avoided. With this approach, all the search and action commands of a skill within all contexts ("compose", "commandBox" and "message") can be powered by a Virtual Assistant.

```csharp
    const string MessagingExtensionCommandIdSeparator = ":";

    // Invoked when a 'composeExtension/submitAction' invoke activity is received for a messaging extension action command
    protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionSubmitActionAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
    {
        return await ForwardMessagingExtensionActionCommandActivityToSkill(turnContext, action, cancellationToken);
    }

    // Forwards invoke activity to right skill for messaging extension action commands.
    private async Task<MessagingExtensionActionResponse> ForwardMessagingExtensionActionCommandActivityToSkill(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
    {
        var skillId = ExtractSkillIdFromMessagingExtensionActionCommand(turnContext, action);
        var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == skillId).First().Value;
        var invokeResponse = await _skillHttpClient.PostActivityAsync(this._appId, skill, _skillsConfig.SkillHostEndpoint, turnContext.Activity as Activity, cancellationToken).ConfigureAwait(false);

        return invokeResponse.GetMessagingExtensionActionResponse();
    }

    // Extracts skill Id from messaging extension command and updates activity value
    private string ExtractSkillIdFromMessagingExtensionActionCommand(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action)
    {
        var commandArray = action.CommandId.Split(MessagingExtensionCommandIdSeparator);
        var skillId = commandArray.Last();

        // Update activity value by removing skill id before forwarding to the skill.
        var activityValue = JsonConvert.DeserializeObject<MessagingExtensionAction>(turnContext.Activity.Value.ToString());
        activityValue.CommandId = string.Join(MessagingExtensionCommandIdSeparator, commandArray, 0 commandArray.Length - 1);
        turnContext.Activity.Value = activityValue;

        return skillId;
    }
```

Some messaging extension activities do not include the command ID. For example, `composeExtension/selectItem` contains only the value of the invoke tap action. To identify the associated skill, `skillId`  is attached to each item card while forming a response for `OnTeamsMessagingExtensionQueryAsync`. (This is similar to the approach for [adding adaptive  cards to your Virtual Assistant](#add-adaptive-cards-to-your-virtual-assistant).

```csharp
    // Invoked when a 'composeExtension/selectItem' invoke activity is received for compose extension query command.
    protected override async Task<MessagingExtensionResponse> OnTeamsMessagingExtensionSelectItemAsync(ITurnContext<IInvokeActivity> turnContext, JObject query, CancellationToken cancellationToken)
    {
        var data = JsonConvert.DeserializeObject<SkillCardActionData>(query.ToString());
        var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == data.SkillId).First().Value;
        var invokeResponse = await _skillHttpClient.PostActivityAsync(this._appId, skill, _skillsConfig.SkillHostEndpoint, turnContext.Activity as Activity, cancellationToken).ConfigureAwait(false);

        return invokeResponse.GetMessagingExtensionResponse();
    }
```

---

## Example: Convert the Book-a-room app template to a Virtual Assistant skill

[Book-a-room](app-templates.md#book-a-room) is a [Microsoft Teams bot](../bots/what-are-bots.md) that lets users quickly find and reserve a meeting room for 30 (default), 60, or 90 minutes starting from the current  time. The Book-a-room bot scopes to personal or 1:1 conversations.

![Virtual Assistant with a "book a room" skill](../assets/images/bots/virtual-assistant/book-a-room-skill.png)

Followings are the delta changes introduced to convert it to a skill which can be attached to a Virtual Assistant. Similar guidelines can be followed to convert any existing v4 bot to a skill.

### Skill manifest

A skill manifest is a JSON file that exposes a skill's messaging endpoint, id, name, and other relevant metadata (this manifest is different than the manifest used for sideloading an app in Microsoft Teams) A Virtual Assistant requires a path to this file as an input to attach a skill. We have added the following manifest to the bot's wwwroot folder.

```bash
botskills connect --remoteManifest "<url to skill's manifest>" ..
```

```json
{
  "$schema": "https://schemas.botframework.com/schemas/skills/skill-manifest-2.1.preview-0.json",
  "$id": "microsoft_teams_apps_bookaroom",
  "name": "microsoft-teams-apps-bookaroom",
  "description": "microsoft-teams-apps-bookaroom description",
  "publisherName": "Your Company",
  "version": "1.1",
  "iconUrl": "<icon url>",
  "copyright": "Copyright (c) Microsoft Corporation. All rights reserved.",
  "license": "",
  "privacyUrl": "<privacy url>",
  "endpoints": [
    {
      "name": "production",
      "protocol": "BotFrameworkV3",
      "description": "Production endpoint for the skill",
      "endpointUrl": "<endpoint url>",
      "msAppId": "skill app id"
    }
  ],
  "dispatchModels": {
    "languages": {
      "en-us": [
        {
          "id": "microsoft-teams-apps-bookaroom-en",
          "name": "microsoft-teams-apps-bookaroom LU (English)",
          "contentType": "application/lu",
          "url": "file://book-a-meeting.lu",
          "description": "English language model for the skill"
        }
      ]
    }
  },
  "activities": {
    "message": {
      "type": "message",
      "description": "Receives the users utterance and attempts to resolve it using the skill's LU models"
    }
  }
}
```

### LUIS Integration

Virtual Assistant's dispatch model is built on top of attached skills' LUIS models. The dispatch model identifies the intent for every text activity and finds out skill associated with it.

Virtual Assistant requires skill's LUIS model (in `.lu` format) as an input while attaching a skill. LUIS json can be converted to `.lu` format using botframework-cli  tool.

```json
botskills connect --remoteManifest "<url to skill's manifest>" --luisFolder "<path to the folder containing your Skill's .lu files>" --languages "en-us" --cs
```

```bash
npm i -g @microsoft/botframework-cli
bf luis:convert --in <pathToLUIS.json> --out <pathToLuFile>
```

Book-a-room bot has two main commands for users:

- `Book room`
- `Manage Favorites`

We have built a LUIS model understanding these two commands. Corresponding secrets need to be populated in `cognitivemodels.json`. The corresponding LUIS JSON file can be found [here](https://github.com/OfficeDev/microsoft-teams-apps-bookaroom/blob/nebhagat/microsoft-teams-apps-bookaroom-skill/Deployment/Resources/LU/book-a-meeting.json) and this is how the corresponding `.lu` file looks like.

```
> ! Automatically generated by [LUDown CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/Ludown), Tue Mar 31 2020 17:30:32 GMT+0530 (India Standard Time)

> ! Source LUIS JSON file: book-a-meeting.json

> ! Source QnA TSV file: Not Specified

> ! Source QnA Alterations file: Not Specified


> # Intent definitions

## BOOK ROOM
- book a room
- book room
- please book a room
- reserve a room
- i want to book a room
- i want to book a room please
- get me a room please
- get me a room


## MANAGE FAVORITES
- manage favorites
- manage favorite
- please manage my favorite rooms
- manage my favorite rooms please
- manage my favorite rooms
- i want to manage my favorite rooms

## None


> # Entity definitions


> # PREBUILT Entity definitions


> # Phrase list definitions


> # List entities

> # RegEx entities
```

With this approach, any command issues by a user to Virtual Assistant related to `book room` or `manage favorites` can be identified as a command associated with Book-a-room bot and is forwarded to this skill.
On the other hand, Book-a-room room bot needs to use LUIS model to understand these commands if they are not typed as is (for example: `I want to manage my favorite rooms`).

### Multi-Language support

For this example, we have only created a LUIS model with English culture. You can create LUIS models corresponding to other languages and add entry to `cognitivemodels.json`.

```json
{
  "defaultLocale": "en-us",
  "languageModels": {
    "en-us": {
      "luisAppId": "",
      "luisApiKey": "",
      "luisApiHost": ""
    },
    "<your_language_culture>": {
      "luisAppId": "",
      "luisApiKey": "",
      "luisApiHost": ""
    }
  }
}
```

In parallel, add corresponding `.lu` file in luisFolder path. Folder structure should be as follows:

```bash
| - luisFolder

        | - en-us

                | - book-a-meeting.lu

        | - your_language_culture

                | - book-a-meeting.lu
```

Update botskills command as follows to modify `languages` parameter:

```json
botskills connect --remoteManifest "<url to skill's manifest>" --luisFolder "<path to luisFolder>" --languages "en-us, your_language_culture" --cs
```

Virtual Assistant uses `SetLocaleMiddleware` to identify current locale and invoke corresponding dispatch model. (Bot framework activity has locale field which is used by this middleware.) We recommend to use the same for your skill as well. Book-a-room bot does not use this middleware and instead gets locale from Bot framework activity's [clientInfo entity](https://github.com/microsoft/botframework-sdk/blob/master/specs/botframework-activity/botframework-activity.md#clientinfo).

### Claim validation

We have added [claimsValidator](https://github.com/nebhagat/msteams-virtual-assistant-dotnet/blob/master/msteams-virtual-assistant-dotnet/Authentication/AllowedCallersClaimsValidator.cs) to restrict callers to the skill. To allow a Virtual Assistant to call this skill, populate `AllowedCallers` array from `appsettings` with that particular Virtual Assistant's app ID.

```
"AllowedCallers": [ "<caller_VA1_appId>", "<caller_VA2_appId>" ],
```

The allowed callers array can restrict which skill consumers can access the skill. Add single entry `*` to this array, to accept calls from any skill consumer.

```
"AllowedCallers": [ "*" ],
```
Detailed documentation for adding claims validation to a skill can be found [here](https://docs.microsoft.com/azure/bot-service/skill-implement-skill?view=azure-bot-service-4.0&tabs=cs#claims-validator&preserve-view=true).

### Card refresh limitation

Updating activity (card refresh) is not supported yet via Virtual Assistant ([github issue](https://github.com/microsoft/botbuilder-dotnet/issues/3686)). Hence, we have replaced all card refresh calls (`UpdateActivityAsync`) with posting new card calls(`SendActivityAsync`).

### Card actions and task module flows

To forward card action or task module activities to an associated skill, the skill needs to embed `skillId` to it.
Book-a-room bot card action, task module fetch and submit action payloads are modified to contain `skillId` as a parameter. 

For more information refer [this](https://msteams-captain.visualstudio.com/xGrowth%20App%20Templates/_wiki/wikis/xGrowth.wiki/88/Virtual-Assistant-for-MS-Teams?anchor=rich-cards) section from this documentation.

### Handle activities from group chat or channel scope

Book-a-room bot is designed for private chats (personal/1:1 scope) only. Since we have customized Virtual Assistant to support group chat and channel scopes, the Virtual Assistant might be invoked from these scopes and thus, Book-a-room bot might get activities for the same. Hence Book-a-room bot is customized to handle those activities. The check has been put in `OnMessageActivityAsync` methods of Book-a-room bot's activity handler.

```csharp
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        // Check if activities are from groupchat/ teams scope. This might happen when the bot is consumed by Virtual Assistant.
        if (turnContext.Activity.Conversation.IsGroup == true)
        {
            await ShowNotSupportedInGroupChatCardAsync(turnContext).ConfigureAwait(false);
        }
        else
        {
            ...
        }
    }
```

You can also leverage existing skills from [Bot Framework Solutions repository](https://github.com/microsoft/botframework-solutions/tree/master/skills/csharp) or create a new skill altogether from scratch. Tutorials for the later can be found [here](https://microsoft.github.io/botframework-solutions/overview/skills/). Please refer to [documentation](https://docs.microsoft.com/azure/bot-service/skills-conceptual?view=azure-bot-service-4.0&preserve-view=true) for Virtual Assistant and skills architecture.

## Sample code to get started

- [Updated visual studio template](https://github.com/nebhagat/msteams-virtual-assistant-dotnet)
- [Book-a-room bot skill code](https://github.com/OfficeDev/microsoft-teams-apps-bookaroom/tree/nebhagat/microsoft-teams-apps-bookaroom-skill)

## Virtual Assistant known limitations

- **EndOfConversation**. A skill should send an `endOfConversation` activity when it finishes a conversation. basis this activity, a Virtual Assistant ends context with that particular skill and gets back into Virtual Assistant's (root) context. For Book-a-room bot, there is no clear state where conversation can be ended. Hence we have not sent `endOfConversation` from Book-a-room bot and when user wants to go back to root context they can simply do that by `start over` command.
- **Card refresh**. Card refreshes is not yet supported through Virtual Assistant.
- **Messaging extensions**.:
  - Currently, a Virtual Assistant can support a maximum of ten commands for messaging extensions.
  - Configuration of messaging extensions is not scoped to individual commands but for the entire extension itself. This limits configuration for each individual skill through Virtual Assistant.
  - Messaging extensions command IDs have a maximum length of [64 characters](../resources/schema/manifest-schema.md#composeextensions) and 37 characters will be used for embedding skill information. Thus, updated constraints for command ID are limited to 27 characters.
>
>
