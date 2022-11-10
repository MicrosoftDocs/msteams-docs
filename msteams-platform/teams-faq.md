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
Docs did not help - had to raise  PC ticket
Resolution-to connect the azure to MPN settings below developer tab.

</details>
<br>

<details>
<summary>Partner reported that the tab menu was showing a white screen under the "more" section on the Teams mobile iOS client and in the case of Teams dark mode.We have reproduced the issue with the provided details and observed that it is a common issue for Teams mobile iOS clients and only in the case of dark mode. So, we have raised a bug request for the same</summary>

Platform Bug
</details>
<br>

## Bots

<br>
<details>
<summary>The bot is not supposed to crash when the card is invalid. It can fail to display it, but it shouldn't crash. Also the behavior should be consistent between web and mobile.</summary>

Work with Universal Actions for Adaptive Cards - Teams | Microsoft Docs to validate.

</details>
<br>

<details>
<summary>How can I remove specific messages from bot history? The only way I've found requires an activity id (UpdateActivityAsync). Is there a way to get the chat history and find an activity id of a specific message?</summary>

Use [Delete messages-Bot framework's DeleteActivity](~/bots/how-to/update-and-delete-bot-messages?tabs=dotnet#delete-messages) method.

</details>
