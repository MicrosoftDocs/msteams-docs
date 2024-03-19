---
title: Invoke activity handlers for bot event-driven conversations
author: surbhigupta
description: Learn about Microsoft Teams invoke activity handlers and invoke activities for bot messages and actions using Microsoft Bot Framework SDK.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.date: 01/22/2023
---

# Invoke activity handler for bot events

An invoke event is sent to a user from the bot when a user performs an action, such as selecting a button or tapping a card. Invoke activities are used to send a pre-defined payload back to the bot, which can then be used to trigger specific actions or responses, such as following:
* Send back confirmations
* Select items
* Provide feedback or input to the bot

When an event occurs, invoke activity handlers can identify the activity and forward it to the bot logic for processing. By incorporating an invoke activity into the handler logic, your bot can process the event and respond to the user based on the payload of the invoke activity.

:::image type="content" source="~/assets/images/bots/bot-invoke-activity.png" alt-text="Diagram that shows the flow of the invoke activity." lightbox="~/assets/images/bots/bot-invoke-activity.png":::

`{Image is a place holder will share it for development as per design standards post SME approval}`

The following table outlines which communication concept to use:

|Comunication flow| Concept| Description |
|---|---| --- |
| User **->** Bot| [Event activity handler](~/bots/how-to/conversations/bot-events.md#event-activity-handlers) |Event activity handlers are used when you want your bot to be notified when a user performs an event.|
| User **<->** Bot| [Invoke activity handler + Invoke activities](~/bots/how-to/conversations/bot-invoke-activity.md)| Invoke activity handlers are used when you want your bot to be notified when a user performs an event and respond back to the user based on the event through invoke activities.|

Teams activity handler is derived from [Bot Framework's activity handler](~/bots/how-to/conversations/bot-events.md#bot-framework-activity-handler). The two primary Teams activity handlers are as follows:

* `OnConversationUpdateActivityAsync`: Routes all the [conversation update activities](~/bots/how-to/conversations/bot-events.md).
* `OnInvokeActivityAsync`: Routes all Teams invoke activities.

The invoke activities listed in this article are applicable for conversational bots in Teams. 

# [C#](#tab/dotnet)

The list of Teams activity handlers called from the `OnInvokeActivityAsync` Teams activity handler includes the following invoke types:

| Invoke type| Handler| Description|
| :--------------------  | :--------------------- | :-------------------- |
| CardAction.Invoke | `OnTeamsCardActionInvokeAsync` | When the connector receives a card action invoke activity, this method is invoked. |
```csharp
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke | `OnTeamsFileConsentAcceptAsync` | When a user accepts a file consent card, this method is invoked. |
```csharp
async handleTeamsFileConsentAccept(context, fileConsentCardResponse) {
//Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke  | `OnTeamsFileConsentAsync` | When the connector receives a file consent card activity, this method is invoked. |
```csharp
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke  | `OnTeamsFileConsentDeclineAsync` | When a user declines a file consent card, this method is invoked. |
```csharp
protected override async Task OnTeamsFileConsentDeclineAsync(ITurnContext<IInvokeActivity> turnContext, FileConsentCardResponse fileConsentCardResponse, CancellationToken cancellationToken)
{
  //Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| actionableMessage/executeAction | `OnTeamsO365ConnectorCardActionAsync` | When the connector receives a connector card for Microsoft 365 Groups action activity, this method is invoked. |
```csharp
protected override async Task OnTeamsO365ConnectorCardActionAsync(ITurnContext<IInvokeActivity> turnContext, O365ConnectorCardActionQuery query, CancellationToken cancellationToken)
{
  //Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| signin/verifyState  | `OnTeamsSigninVerifyStateAsync` | When the connector receives a `signIn` verify state activity, this method is invoked. |
```csharp
protected override async Task OnTeamsSigninVerifyStateAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
  //Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| task/fetch  | `OnTeamsTaskModuleFetchAsync` | You can override this method in a derived class to provide logic when a dialog (referred as task module in TeamsJS v1.x) is fetched. |
```csharp
protected override async Task<TaskModuleResponse> OnTeamsTaskModuleFetchAsync(ITurnContext<IInvokeActivity> turnContext, TaskModuleRequest taskModuleRequest, CancellationToken cancellationToken)
{
  //Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| task/submit  | `OnTeamsTaskModuleSubmitAsync`  | You can override this method in a derived class to provide logic when a dialog is submitted. |
```csharp
protected override async Task<TaskModuleResponse> OnTeamsTaskModuleSubmitAsync(ITurnContext<IInvokeActivity> turnContext, TaskModuleRequest taskModuleRequest, CancellationToken cancellationToken)
{
 // Write your logic here
}
```

# [JavaScript](#tab/javascript)

The following table provides the list of Teams activity handlers called from the `onInvokeActivity` Teams activity handler:

| Invoke type                    | Handler                              | Description                                                  |
| :-----------------------------  | :----------------------------------- | :----------------------------------------------------------- |
| CardAction.Invoke               | `handleTeamsCardActionInvoke`       | This method is invoked when a card action invoke activity is received from the connector. |
```javascript
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke              | `handleTeamsFileConsentAccept`      | This method is invoked when the user accepts a file consent card. |
```javascript
async handleTeamsFileConsentAccept(context, fileConsentCardResponse) 
    {
       // Write your logic here
    }
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke              | `handleTeamsFileConsent`            | This method is invoked when a file consent card activity is received from the connector. |
```javascript
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke              | `handleTeamsFileConsentDecline`     | This method is invoked when the user declines a file consent card. |
```javascript
async handleTeamsFileConsentDecline(context, fileConsentCardResponse) 
{
        // Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| actionableMessage/executeAction | `handleTeamsO365ConnectorCardAction` | This method is invoked when a connector card for Microsoft 365 Groups action activity is received from the connector. |
```javascript
async handleTeamsO365ConnectorCardAction(context, query) 
{
// Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| signin/verifyState              | `handleTeamsSigninVerifyState`      | This method is invoked when a `signIn` verify state activity is received from the connector. |
```javascript
 async handleTeamsSigninVerifyState(context, state) 
 {
 await this.dialog.run(context, this.dialogState);
}

```

| Invoke type| Handler| Description|
| ---|--- |---|
| task/fetch                      | `handleTeamsTaskModuleFetch`        | This method can be overridden in a derived class to provide logic when a dialog is fetched. |
```javascript
handleTeamsTaskModuleFetch(context, request) {
     const Id = request.data.Id;
     // Write your logic here
}
```

| Invoke type| Handler| Description|
| ---|--- |---|
| task/submit                     | `handleTeamsTaskModuleSubmit`       | This method can be overridden in a derived class to provide logic when a dialog is submitted. |
```javascript
async handleTeamsTaskModuleSubmit(context, taskModuleRequest) {
    // Write your logic here
}
```

# [Python](#tab/python)

The list of Teams activity handlers called from the `on_invoke_activity` Teams activity handler includes the following invoke types:

| Invoke type| Handler | Description |
| ------| -----------| ------------ |
| CardAction.Invoke               | `on_teams_card_action_invoke`       | This method is invoked when a card action invoke activity is received from the connector. |
```python
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke              | `on_teams_file_consent_accept`      | This method is invoked when the user accepts a file consent card. |
```python
async def on_teams_file_consent_accept(
self,
turn_context: TurnContext,
file_consent_card_response: FileConsentCardResponse
):
// Write your logic here

```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke              | `on_teams_file_consent`            | This method is invoked when a file consent card activity is received from the connector. |
```python
```

| Invoke type| Handler| Description|
| ---|--- |---|
| fileConsent/invoke              | `on_teams_file_consent_decline`     | This method is invoked when the user declines a file consent card. |
```python
async def on_teams_file_consent_decline(
self,
turn_context: TurnContext,
file_consent_card_response: FileConsentCardResponse
):
// Write your logic here
```

| Invoke type| Handler| Description|
| ---|--- |---|
| actionableMessage/executeAction | `on_teams_o365_connector_card_action` | This method is invoked when a connector card for Microsoft 365 Groups action activity is received from the connector. |
```python
```

| Invoke type| Handler| Description|
| ---|--- |---|
| signin/verifyState              | `on_teams_signin_verify_state`      | This method is invoked when a `signIn` verify state activity is received from the connector. |
```python
```

| Invoke type| Handler| Description|
| ---|--- |---|
| task/fetch                      | `on_teams_task_module_fetch`        | This method can be overridden in a derived class to provide logic when a dialog is fetched. |
```python
async def on_teams_task_module_fetch(
self, turn_context: TurnContext, task_module_request: TaskModuleRequest
) -> TaskModuleResponse:
// Write you logic here
```

| Invoke type| Handler| Description|
| ---|--- |---|
| task/submit                     | `on_teams_task_module_submit`       | This method can be overridden in a derived class to provide logic when a dialog is submitted. |
```python
async def on_teams_task_module_submit(
self, turn_context: TurnContext, task_module_request: TaskModuleRequest
) -> TaskModuleResponse:
// Write your logic here
```

---

The Bot Framework SDK also supports invoke activities specific to message extensions. For more information, see [what are message extensions](~/messaging-extensions/what-are-messaging-extensions.md).

## Code sample

|Sample name | Description | .NET | Node.js | Python|
|----------------|-----------------|--------------|----------------|-------|
| Teams conversation bot | This sample app shows how to use different bot conversation events available in Bot Framework. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation/python)|
| Bot samples | Set of Bot Framework samples. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples#bots-samples-using-the-v4-sdk)|