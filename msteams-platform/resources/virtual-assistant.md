---
title: Virtual Assistant for Microsoft Teams
description: How to create Virtual Assistant bot and skills for use in Microsoft Teams
keywords: teams virtual assistant bots
ms.date: 05/27/2020
---

# Virtual Assistant for Microsoft Teams

Virtual Assistants provide developers the ability to build advanced conversational assistant experiences that can perform a set of activities, while enabling full control over user experience, data, and organizational branding.

A Virtual Assistant comprises:
- Virtual Assistant core: The [Virtual Assistant core template](https://microsoft.github.io/botframework-solutions/overview/virtual-assistant-template) is the basic building block that brings together the virtual assistant capabilities and the Microsoft technologies required to build a Virtual Assistant including Bot Framework SDK, LUIS, QnA Maker, skills registration, linked accounts, etc.
- Skills: Common assistant scenarios are provided as reusable conversational [skills](https://microsoft.github.io/botframework-solutions/overview/skills). Individual skills can be plugged into a Virtual Assistant solution to enable multiple scenarios. Skills include LUIS models, Dialogs and Integration code and delivered in source code form enabling you to customize and extend as required.

TODO: Insert image here

Text message activities are routed to associated skills by the Virtual Assistant core using [dispatch](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-dispatch?view=azure-bot-service-4.0&tabs=cs) model. Individual skills register their LUIS models with Virtual Assistant so that dispatch model builds intelligence to understand skill intents. This enables the Virtual Assistant to quickly identify which LUIS model should handle a given utterance and activities are dispatched to the corresponding skill associated with it.

## When to use a Virtual Assistant

Consider a large organization that has multiple business workflows related to employee self-service across business functions. To enable employees to complete these workflows, an employee may be required to go to different portals. In the context of digital transformation, this would manifest itself in the form of multiple apps or bots that an employee needs to install/access for completing business workflows. These apps may be built separately by each business function or may be consolidated under a digital employee experiences team.
For example, an organization may have an HR helpdesk, IT self-service, and leave management as separate bots surfaced to users via Microsoft Teams. These apps will need to be made discoverable for end users via tenant app catalog, app setup policies, and more. For each app developed within the organization the central employee experience team will focus on adoption and change management individually. An alternate approach could be to leverage Virtual Assistants and surface multiple app scenarios within a single interface.

An organization should consider building a Virtual Assistant when:
- A central team manages all employee experiences and has the capability to build a Virtual Assistant experience and manage updates to the core experience for addition of skills
- Multiple apps exist across business functions or number of apps is expected to grow in the future 
- Already developed apps are customizable and owned by the organization to be able to convert these into skills for a Virtual Assistant
- Central employee experiences team is able to influence customizations to existing apps and provide necessary guidance for plugging existing apps as skills in Virtual Assistant experience

TODO: Insert image here

## How to make your Virtual Assistant ready for Microsoft Teams

Microsoft has published a [Visual Studio template](https://marketplace.visualstudio.com/items?itemName=BotBuilder.VirtualAssistantTemplate) for building Virtual Assistants and skills. The Virtual Assistant template can be leveraged to create a Virtual Assistant bot powered by a text based experience with support for limited rich cards with actions. We have enhanced this base template to include Microsoft Teams platform capabilities to power great Teams app experiences. A few of the capabilities explored here include support for rich/adaptive cards, task modules, teams/group chat scope and messaging extensions. In this document, we propose the best practices to build a Teams-focused Virtual Assistant experience along with relevant examples and sample code.

[Extend Virtual Assistant to Microsoft Teams](https://microsoft.github.io/botframework-solutions/clients-and-channels/tutorials/enable-teams/1-intro/)

TODO: Insert image here

### Handling adaptive cards
In order to dispatch requests correctly, Virtual Assistants need to identify the correct LUIS model and the corresponding skill associated with it.

This dispatching mechanism cannot be used for card action activities since the LUIS model associated with a skill may not be trained for card action texts as these are fixed, pre-defined keywords, and are not utterances from a user.

We have solved this problem by embedding skill information in card action payload. Every skill should embed `skillId` in `value` field of card actions. This is the best way to ensure that each card action activity carries its skill information and Virtual Assistant can utilize this information for dispatching.

Here is a card action data sample:

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
By providing `skillId` in the constructor we ensure that skill information is always present in card actions.

We then introduced the following class in Virtual Assistant template for extracting `skillId` from card action payload.

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

Here is a code snippet for extracting `skillId` from card action data. We implemented it as an  extension method on the [Activity](https://github.com/microsoft/botframework-sdk/blob/master/specs/botframework-activity/botframework-activity.md) class.

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

Virtual Assistants can also handle interruptions in case a user tries to invoke another skill while a different skill is currently active. To handle this request the Virtual Assistant core prompts the users with a confirmation message to switch skills if the user utterance intent matches with a different skill than the skill which is currently active.

TODO: Insert image

Bot Framework has introduced [SwitchSkillDialog](https://github.com/microsoft/botframework-solutions/blob/6d40fa8ae05f96b0c5e0464e01361a9e1deb696c/sdk/csharp/libraries/microsoft.bot.solutions/Skills/Dialogs/SwitchSkillDialog.cs) to power this flow. `SwitchSkillDialog` saves user's current activity and prompts the user to confirm if they want to switch skills. Based on user's choice, an activity derived from saved activity is forwarded to the right skill and the flow is continued from there. While deriving an activity from saved activity, the value field is not copied which is used to store skill information if given activity is a card action based activity. 

Hence we have introduced `TeamsSkillDialog` and `TeamsSwitchSkillDialog` based on [SkillDialog](https://github.com/microsoft/botframework-solutions/blob/5b46d73e220bbb4fba86c48be532e495535ca78a/sdk/csharp/libraries/microsoft.bot.solutions/Skills/SkillDialog.cs) and [SwitchSkillDialog](https://github.com/microsoft/botframework-solutions/blob/6d40fa8ae05f96b0c5e0464e01361a9e1deb696c/sdk/csharp/libraries/microsoft.bot.solutions/Skills/Dialogs/SwitchSkillDialog.cs) to enable users to switch skill experience from card actions.

These classes cannot be inherited from existing dialogs as override behavior uses private members/methods. Hence, we have introduced new classes based on existing ones without using inheritance.

### Handling task module requests

To add task module capabilities to a Virtual Assistant, we included two additional methods in the Virtual Assistant's activity handler: `OnTeamsTaskModuleFetchAsync` and `OnTeamsTaskModuleSubmitAsync`.

These methods listen to task module related activities from Virtual Assistant core, identify the skill associated with the request and forward the request to the identified skill. 
Request forwarding is done via [SkillHttpClient](https://docs.microsoft.com/en-us/dotnet/api/microsoft.bot.builder.integration.aspnet.core.skills.skillhttpclient?view=botbuilder-dotnet-stable), `PostActivityAsync` method. 

It returns the response as `InvokeResponse` which is parsed and converted to `TaskModuleResponse` and sent back to the Virtual Assistant core.

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

We have followed similar approaches for card action dispatching and task module responses. Task module fetch and submit action data is updated to include `skillId`. 
Activity Extension method `GetSkillId` extracts `skillId` from the payload which provides details about the skill that needs to be invoked.

Below is a code snippet for `OnTeamsTaskModuleFetchAsync` and `OnTeamsTaskModuleSubmitAsync` methods.

```csharp
    // Invoked when a "task/fetch" event is received to invoke task module.
    protected override async Task<TaskModuleResponse> OnTeamsTaskModuleFetchAsync(ITurnContext<IInvokeActivity> turnContext, TaskModuleRequest taskModuleRequest, CancellationToken cancellationToken)
    {
        try
        {
            string skillId = (turnContext.Activity as Activity).GetSkillId();
            var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == skillId).FirstOrDefault().Value;

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
            var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == skillId).FirstOrDefault().Value;

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

Additionally, we need need to ensure that all skill domains are included in the `validDomains` section in Virtual Assistant's manifest file so that task modules invoked via a skill render properly.

### Handling collaborative app scopes

Teams apps can exist in multiple scopes including 1:1 chat, group chat and channel scope. The base Virtual Assistant template is designed for 1:1 chats. As part of its onboarding experience the Virtual Assistant bot prompts users for name and maintains user state. This experience is not suited for group chat/channel scopes. Hence that experience has been removed.

Also, we have handled the behavior where a Virtual Assistant can be invoked without any text message from a group chat or channel. 

Additionally, an utterance needs to be cleaned (remove bot @mentions) before feeding to the dispatch module so that dispatch output is not affected. All these processing functions have been added to Virtual Assistant core.

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

Skills should handle activities in multiple scopes (1:1 chat, group chat, and channel conversation). If any of these scopes are not supported, skills should respond with an appropriate message.

### Handling messaging extensions

The commands for a messaging extension are provided in the app's manifest file. The messaging extension user interface is powered by these commands. For a Virtual Assistant to power this experience for attached skills' messaging extension commands, a Virtual Assistant's own manifest must contain these commands.

Hence, these commands from individual skill's manifests should be added to Virtual Assistant's manifest as well. We have updated command ids to contain information about associated skill by appending skill's app id to it by a separator (`:`).

Here is the snippet from a skill's manifest file.

Note: A skill may or may not contain a manifest as it may never be added as an app to Microsoft Teams.

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

Here is the corresponding code snippet from the Virtual Assistant's manifest file.

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

Once these commands are invoked by a user, the Virtual Assistant can identify associated skill by parsing command id, update activity by removing extra suffix (`:<skill_id>`) from command id and forward it to the corresponding skill. The code for a skill then does not need to handle this extra suffix and conflicts between command ids across skills are also avoided. Through this approach all search and action commands of a skill from all contexts
 ("compose", "commandBox" and "message") can be powered by a Virtual Assistant.

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
        var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == skillId).FirstOrDefault().Value;
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

Some messaging extension activities do not include the command ID: for example, `composeExtension/selectItem` contains only the value of the invoke tap action. To identify the skill associated here, we have attached `skillId` to each item card while forming response for `OnTeamsMessagingExtensionQueryAsync`. (This approach is similar to what we did for card actions.)

```csharp
    // Invoked when a 'composeExtension/selectItem' invoke activity is received for compose extension query command.
    protected override async Task<MessagingExtensionResponse> OnTeamsMessagingExtensionSelectItemAsync(ITurnContext<IInvokeActivity> turnContext, JObject query, CancellationToken cancellationToken)
    {
        var data = JsonConvert.DeserializeObject<SkillCardActionData>(query.ToString());
        var skill = _skillsConfig.Skills.Where(s => s.Value.AppId == data.SkillId).FirstOrDefault().Value;
        var invokeResponse = await _skillHttpClient.PostActivityAsync(this._appId, skill, _skillsConfig.SkillHostEndpoint, turnContext.Activity as Activity, cancellationToken).ConfigureAwait(false);

        return invokeResponse.GetMessagingExtensionResponse();
    }
```

## Example: Converting the Book a Meeting app template to a Virtual Assistant skill

TODO: Add

## Known limitations

* EndOfConversation - A skill should send an `endOfConversation` activity when it finishes a conversation. basis this activity, a Virtual Assistant ends context with that particular skill and gets back into Virtual Assistant's (root) context. For Book-a-room bot, there is no clear state where conversation can be ended. Hence we have not sent `endOfConversation` from Book-a-room bot and when user wants to go back to root context they can simply do that by `start over` command.
* Card refreshes through Virtual Assistant are not yet supported. ([GitHub issue](https://github.com/microsoft/botbuilder-dotnet/issues/3686)).
* A Virtual Assistant will be able to support a maximum of ten commands for messaging extensions.
* Configuration of compose extensions is not scoped to individual commands but for the entire extension itself. This limits configuration for each individual skill through Virtual Assistant.
* Messaging extension command IDs have a maximum length of [64 characters](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema#composeextensionscommands). 37 characters will be used for embedding skill information. Hence, updated constraints for command ID would be 27 characters.
