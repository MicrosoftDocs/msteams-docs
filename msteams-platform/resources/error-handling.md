---
title: Error handling messages
description: In this article, display all the error handling messages for reference. 
ms.topic: reference
ms.localizationpriority: high
ms.author: v-vanisreeth
ms.date: 10/06/2023
---
# Error handling messages  

## Apps in meetings

|Error message                           |Scenario                                |Resolution |
|:----------------------------------------|:---------------------------------------|:---------|
|No specific error code <br>**Reason**: Session ID changes every time the page is reloaded in the custom app on MS Teams Desktop App.|A custom app in Microsoft Teams Desktop App uses cookies and a session ID to keep track of temporary settings for tasks. The issue is session ID changes on every page reload.                                        |         |
|BadArgument Unknown attachment type     |The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.        |Avoid using cookies in Teams apps as they can cause issues when switching between Desktop and Web or different devices. Instead, store state server-side in a database or other store, keyed on the user's AadObject ID (their unique Azure Active Directory user guid), which remains consistent across all platforms.|

[Back to top](#error-handling-messages)

## Adaptive card

|Error message                           |Scenario                               |Resolution  |
|----------------------------------------|---------------------------------------|------------|
|Unable to render dynamic data inside the AdaptiveCard template for user mentions in Teams.    | The developer is trying to create a dynamic AdaptiveCard to mention users in Teams. They're facing an issue with rendering dynamic data inside the template. They have tried to serialize a JSON with the same $data structure with the name of the user mentioned but it doesn't render anything.        |Currently, there's no support for sending a dynamic array to the entity property in Microsoft Teams. For mentioning a user, you need to repeat the entity block, not the text block. For more information, see: [Adaptive Cards Template Language](https://learn.microsoft.com/adaptive-cards/templating/language)|

[Back to top](#error-handling-messages)

## Bots

|Error message                           |Scenario                               |Resolution  |
|----------------------------------------|---------------------------------------|------------|
|ServiceError Could not find Connection Setting with name teamsAuth.    | The developer was trying to add SSO for a notification bot using Teams Toolkit. Despite following the documentation and adding the OAuth connection in the bot, the developer was encountering an error stating that the connection setting 'teamsAuth' could not be found.        |Ensure that the OAuth connection name is correctly added to the .env file as mentioned in the documentation. If the issue persists, try using the TeamsBotSSOPrompt function by registering an AAD App for bot authentication. If the problem still persists, consider filing an issue in the TeamsFx repo for further assistance.|BadArgument Unknown attachment type|The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.|The developer should check the sample code for file sharing on MS Teams provided by Microsoft. Additionally, the 'supportsFiles' option needs to be enabled in the manifest for the bot to support file attachments.|

[Back to top](#error-handling-messages)
