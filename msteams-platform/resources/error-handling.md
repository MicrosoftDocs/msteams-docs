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
|No specific error code <br>**Reason**: Session ID changes every time the page is reloaded in the custom app on MS Teams Desktop App.|A custom app in Microsoft Teams Desktop App, which uses Cookies and a session id to keep track of temporary settings for tasks, is experiencing an issue where the session ID changes every time the page is reloaded.                                        |         |
|BadArgument Unknown attachment type     |The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.        |Avoid using cookies in Teams apps as they can cause issues when switching between Desktop and Web or different devices. Instead, store state server-side in a database or other store, keyed on the user's AadObject Id (their unique Azure Active Directory user guid), which remains consistent across all platforms.|

[Back to top](#error-handling-messages)

## Adaptive card

|Error message                           |Scenario                               |Resolution  |
|----------------------------------------|---------------------------------------|------------|
|Unable to render dynamic data inside the AdaptiveCard template for user mentions in Teams.    | The developer is trying to create a dynamic AdaptiveCard to mention users in Teams. They are facing an issue with rendering dynamic data inside the template. They have tried to serialize a JSON with the same $data structure with the name of the user mentioned but it doesn't render anything.        |Currently, there is no support for sending a dynamic array to the entity property in Microsoft Teams. For mentioning a user, you need to repeat the entity block, not the text block. Refer to the documentation for more details refer: [Adaptive Cards Template Language](https://learn.microsoft.com/adaptive-cards/templating/language)|

[Back to top](#error-handling-messages)
