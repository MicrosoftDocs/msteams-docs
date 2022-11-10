---
title: Frequently asked questions for Teams developer document
description: Frequently asked questions for Teams developer document
ms.topic: reference
ms.localizationpriority: high
---

# Frequently asked questions

This section contains the frequently asked questions and the answers.

## App validation

<br>
<details>
<summary>Publisher Attestation issue - the app needed to be published first(I attached the screenshot when I tried to submit the attestation). Before doing the Publisher Attestation. I think this is most likely to connect the Azure AD to an MPN account.</summary>

Publisher verification overview - Microsoft Entra | Microsoft LearnMark an app as publisher verified - Microsoft Entra | Microsoft Learn
Docs didn't help - had to raise  PC ticket
Resolution-to connect the Azure to MPN settings below developer tab.

</details>
<br>

<details>
<summary>Partner reported that the tab menu was showing a white screen under the "more" section on the Teams mobile iOS client and for Teams dark mode. We have reproduced the issue with the provided details and observed that it's a common issue for Teams mobile iOS clients and only for dark mode. So, we've raised a bug request for the same</summary>

Platform Bug
</details>
<br>

## Bots

<br>
<details>
<summary>The bot is'nt supposed to crash when the card is invalid. It can fail to display it, but it shouldn't crash. Also the behavior should be consistent between web and mobile.</summary>

Work with Universal Actions for Adaptive Cards - Teams | Microsoft Docs to validate.

</details>
<br>

<details>
<summary>How can I remove specific messages from bot history? The only way I've found requires an activity ID (UpdateActivityAsync). Is there a way to get the chat history and find an activity ID of a specific message?</summary>

Use [Delete messages-Bot framework's DeleteActivity](~/bots/how-to/update-and-delete-bot-messages?tabs=dotnet#delete-messages) method.

</details>

<br>
<details>
<summary>How can I test the validity of the card schema via code, to avoid this in the future?</summary>

Provided steps to test/validate adaptive card schema:“Adaptive cards editor(preview)” option from the Teams apps >>Developer portal >> Tools" and asked to refer Schema Explorer | Adaptive Cards.

</details>

<br>

## Microsoft Graph

<details>
<summary>We are wondering when the user sets the preferred time to get a notification, can we also get their timezone automatically? Any function may be in graph API where we can get the user's location?</summary>

<br>
Response:
You can use the following Grap API Get user mailbox settings - Microsoft Graph v1.0 | Microsoft Docs to get the user’s time zone like mentioned below.
• GET /me/mailboxSettings/timeZone
• GET /users/{id|userPrincipalName}/mailboxSettings/timeZone

</details>

<br>
<details>
<summary>Customer was looking for support to deploy the code in azure using teams toolkit, also asked few queries related to graph api get user profile photo.</summary>

<br>
Shared references to deploy the code using toolkit: Create a new Teams app using Teams Toolkit - Teams | Microsoft Docs
TeamsFx Command Line Interface - Teams | Microsoft Docs
Also, provided guidance how they can call Graph API get user profile photo.

</details>

<br>

## Single sign-on

<details>
<summary>Partner asked few queries on SSO login flow and a way to redirect the user to auth from invoking an adaptive card. Also Partner needs a way to access the PROD app package and resources from azure since they lost access to prod subscription.</summary>

<br>
you can open the authentication page in the task module when clicks on the button. We do have a sample for opening the task module on button click mentioned here BotBuilder-Samples/teams_task_module_bot.py at main · microsoft/BotBuilder-Samples (github.com). You can replace the taskInfo.url with your auth page.

</details>

<br>

<details>
<summary>How we can change Application ID URI of SSO scope to use bot id also so that the consent window won't be required for Bot?</summary>

<br>
[Register your app on Azure AD](/bots/how-to/authentication/auth-aad-sso-bots#register-your-app-through-the-azure-ad-portal)

</details>

<br>
<details>
<summary>Customer's requirement is to open an iframe, it contains a react app (that displays sensitive information) from a bot task module securely. Can you suggest what is the best/easiest/standard approach to perform this operation?</summary>

<br>

Implement react page with tab SSO and render the content as required. You can open the same tab URL as task module from Bot.
</details>

<br>
