---
title: Error handling
description: Error handling
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Error handling messages

## Apps in meetings

<details>
<br>

<summary><b>No specific error code</b></summary>

* **Reason**: Session ID changes on every page reload in the custom app on MS Teams Desktop App.

* **Scenario**: A custom app in Microsoft Teams Desktop App uses cookies and a session ID to keep track of temporary settings for tasks. The issue is session ID changes on every page reload.

* **Resolution**: The issue is session ID changes on every page reload.

* **Link**:

</details>
</br>

<details>
<br>
<summary><b>BadArgument</b></summary>

* **Reason**: Unknown attachment type.

* **Scenario**: The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.

* **Resolution**: Avoid using cookies in Teams apps as they can cause issues when switching between Desktop and Web or different devices. Instead, store state server-side in a database or other store, keyed on the user's AadObject ID (their unique Azure Active Directory user guid), which remains consistent across all platforms.

* **Link**

</details>
</br>

<details>
<br>
<summary><b>Upload failed File size too large</b></summary>

* **Reason**: The file size limit for Adobe eSign feature is 10 MB.

* **Scenario**: The error occurred when trying to attach files over 10 MB using the Teams 'Approvals' App for eSignature and Approvals of documents.

* **Resolution**: Ensure that the file size doesn't exceed the limit set by Adobe eSign feature, which is 10 MB. If larger files need to be attached, consider compressing the files or using a different method to send them.

* **Link**

</details>
</br>

## Adaptive Card

<details>
<br>
<summary><b>Unable to render dynamic data inside the Adaptive Card template for user mentions in Teams.</b></summary>

* **Reason**: The file size limit for Adobe eSign feature is 10 MB.

* **Scenario**: The developer is trying to create a dynamic AdaptiveCard to mention users in Teams. They're facing an issue with rendering dynamic data inside the template. They've tried to serialize a JSON with the same $data structure with the name of the user mentioned but it doesn't render anything.

* **Resolution**: Currently, there's no support for sending a dynamic array to the entity property in Microsoft Teams. For mentioning a user, you need to repeat the entity block, not the text block.

* **Link**

</details>
</br>

<details>
<br>
<summary><b>URL with double quotes in Adaptive Card action isn't opening in Microsoft Teams on iOS.</b></summary>

* **Reason**: The file size limit for Adobe eSign feature is 130 MB.

* **Scenario**: A developer is using Logic Apps to generate Actions in an Adaptive Card and pass a URL with double quotes. When the Adaptive Card is sent to Microsoft Teams and the action button is clicked, the URL doesn't open.

* **Resolution**: Verify the URL and try with a different URL. Ensure that the URL is properly encoded to handle special characters like double quotes. Test the behavior on different platforms (Teams web, desktop, and iOS) to isolate the issue. If the problem persists, report the issue with all the relevant details for further investigation.

* **Link**

</details>
</br>

## Bots

<details>
<br>
<summary><b>ServiceError</b></summary>

* **Reason**: Couldn't find Connection Setting with name teamsAuth.

* **Scenario**: The developer was trying to add SSO for a notification bot using Teams Toolkit. Despite following the documentation and adding the OAuth connection in the bot, the developer was encountering an error stating that the connection setting 'teamsAuth' couldn't be found.

* **Resolution**: Ensure that the OAuth connection name is correctly added to the .env file as mentioned in the documentation. If the issue persists, try using the TeamsBotSSOPrompt function by registering an Azure Active Directory App for bot authentication. If the problem still persists, consider filing an issue in the TeamsFx repo for further assistance.

* **Link**

</details>
</br>

<details>
<br>
<summary><b>BadArgument</b></summary>

* **Reason**: Unknown attachment type.

* **Scenario**: The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.
* **Resolution**: The developer should check the sample code for file sharing on MS Teams provided by Microsoft. Additionally, the 'supportsFiles' option needs to be enabled in the manifest for the bot to support file attachments.

* **Link**

</details>
</br>

## Cards

<details>
<br>
<summary><b>iOS Teams app not showing card if the card contains a hyperlink with an ampersand</b></summary>

:::image type="icon" source="../../assets/icons/red-dot.png" border="false"::: **Reason**: The developer is trying to display a card in the iOS Teams app that contains a hyperlink with an ampersand. Instead of displaying the card, the app only shows the message 'Sent a card'

:::image type="icon" source="../../assets/icons/yellow-dot.png" border="false"::: **Scenario**: The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.</br>

:::image type="icon" source="../../assets/icons/blue-dot.png" border="false"::: **Resolution**: Ensure that the iOS and Teams versions are up to date. If the issue persists, share the card JSON for further investigation. It might be an issue with the way the hyperlink is parsed when it contains an ampersand. As a workaround, try encoding the ampersand in the URL.

:::image type="icon" source="../../assets/icons/grey-dot.png" border="false"::: **Link**

</details>
</br>
