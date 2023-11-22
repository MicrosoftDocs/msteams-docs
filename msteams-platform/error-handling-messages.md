---
title: Error handling messages
description: Error handling messgaes
author: vishnu
ms.localizationpriority: medium
ms.topic: reference
---

# Error handling messages

## Adaptive Card

<details>
<br>
<summary><b>Not Available</b></summary>

* **Message**: Unable to render dynamic data inside the Adaptive Card template for user mentions in Teams.

* **Scenario**: The developer is trying to create a dynamic AdaptiveCard to mention users in Teams. They are facing an issue with rendering dynamic data inside the template. They have tried to serialize a JSON with the same $data structure with the name of the user mentioned but it doesn't render anything.

* **Resolution**: Currently, there is no support for sending a dynamic array to the entity property in Microsoft Teams. For mentioning a user, you need to repeat the entity block, not the text block. For more information, see [https://learn.microsoft.com/en-us/adaptive-cards/templating/language](/adaptive-cards/templating/language)

* **Source**: [View](https://stackoverflow.com/questions/74364152/send-data-array-to-an-adaptivecard-with-c-sharp)

</br>
</details>

<details>
<br>
<summary><b>URL with double quotes in Adaptive Card action is not opening in Microsoft Teams on iOS.</b></summary>

* **Message**: URL with double quotes in Adaptive Card action is not opening in Microsoft Teams on iOS.

* **Scenario**: A developer is using Logic Apps to generate Actions in an Adaptive Card and pass a URL with double quotes. When the Adaptive Card is sent to Microsoft Teams and the action button is clicked, the URL does not open.

* **Resolution**: Verify the URL and try with a different URL. Ensure that the URL is properly encoded to handle special characters like double quotes. Test the behavior on different platforms (Teams web, desktop, and iOS) to isolate the issue. If the problem persists, report the issue with all the relevant details for further investigation.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/6934)

</br>
</details>
