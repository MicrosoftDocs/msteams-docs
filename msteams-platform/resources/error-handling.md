---
title: Error handling
description: Error handling
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Error handling messages

## Bots

The following are the error mesages:

### ServiceError

**Reason**: Couldn't find Connection Setting with name teamsAuth.

|Scenario|Resolution|
|--------|----------|
|The developer was trying to add SSO for a notification bot using Teams Toolkit. Despite following the documentation and adding the OAuth connection in the bot, the developer was encountering an error stating that the connection setting 'teamsAuth' couldn't be found.|Ensure that the OAuth connection name is correctly added to the .env file as mentioned in the documentation. If the issue persists, try using the TeamsBotSSOPrompt function by registering an Azure Active Directory App for bot authentication. If the problem still persists, consider filing an issue in the TeamsFx repo for further assistance.|

For more information, see link (Wajeed will provide).

### BadArgument

Reason: Unknown attachment type.

|Scenario|Resolution|
|--------|----------|
|The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.|The developer should check the sample code for file sharing on MS Teams provided by Microsoft. Additionally, the 'supportsFiles' option needs to be enabled in the manifest for the bot to support file attachments.|

### Bad Request - Error in query syntax

Reason: The error occurred while trying to get detailed user information using GetUserProfile() in Microsoft Power Virtual Agents Flow Template.

|Scenario|Resolution|
|--------|----------|
|The developer was trying to get detailed user information using Microsoft Power Virtual Agents in Microsoft Teams. The error occurred when the developer tried to use GetUserProfile() function with the input as 'first(outputs('Search_for_users_(V2)')?['body/value'])?['UserPrincipalName']'.|Ensure that the necessary camera and storage permissions are granted on the Android device. Check the app's permission settings and make sure the camera and storage permissions are enabled. If the issue persists, consider debugging the code to identify any potential issues specific to Android. Instead of passing in display name, pass in UserID. This way, the call to SearchForUsers() isn't needed. Correcting the input to GetUserProfile() function should resolve the issue.|

Style 2:

# Error handling messages

## Bots

The following are the error mesages:

### BadArgument

**Reason**: Unknown attachment type.

**Scenario**: The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.

**Resolution**: The developer should check the sample code for file sharing on MS Teams provided by Microsoft. Additionally, the 'supportsFiles' option needs to be enabled in the manifest for the bot to support file attachments.

For more information, see link (Wajeed will provide).

Style 3:

<details>

<summary><b>Bad Request - Error in query syntax</b></summary>

**Reason**: The error occurred while trying to get detailed user information using GetUserProfile() in Microsoft Power Virtual Agents Flow Template.

| **Scenario** | **Resolution** |
| -------- | --------- |
|The developer was trying to get detailed user information using Microsoft Power Virtual Agents in Microsoft Teams. The error occurred when the developer tried to use GetUserProfile() function with the input as 'first(outputs('Search_for_users_(V2)')?['body/value'])?['UserPrincipalName']'.|Ensure that the necessary camera and storage permissions are granted on the Android device. Check the app's permission settings and make sure the camera and storage permissions are enabled. If the issue persists, consider debugging the code to identify any potential issues specific to Android. Instead of passing in display name, pass in UserID. This way, the call to SearchForUsers() isn't needed. Correcting the input to GetUserProfile() function should resolve the issue.|

For more information, see link (Wajeed will provide).

</details>
</br>

<details>
<br>

<summary><b>Bad Request - Error in query syntax</b></summary>

**Reason**: The error occurred while trying to get detailed user information using GetUserProfile() in Microsoft Power Virtual Agents Flow Template.

**Scenario**: The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.

**Resolution**: The developer should check the sample code for file sharing on MS Teams provided by Microsoft. Additionally, the 'supportsFiles' option needs to be enabled in the manifest for the bot to support file attachments.

For more information, see link (Wajeed will provide).

</details>
</br>
