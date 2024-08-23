---
title: Action-based Message Extension Plugin
description: Learn to create bot-based action message extensions in Microsoft Teams, enabling users to perform tasks with natural language commands in Copilot.
ms.date: 04/23/2024
ms.topic: conceptual
author: v-sdhakshina
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Actions in Copilot for Microsoft 365

Actions in message extension for Copilot for Microsoft 365 is the process of performing actions with natural language commands in the Copilot chat window using message extension plugins. For example, users can ask Copilot to file a reimbursement claim, create a task, or add a person to a project using third-party apps.

Actions in Copilot for Microsoft 365 allow a user to interact with applications by enabling direct engagement with external systems. Actions extend to a wide range of scenarios, from project and incident management to HR or ERP workflows, approvals, meetings, content generation, employee  recognition, and bookings. With the added advantage of AI,  Actions can generate content and perform actions based on contextual understanding, optimizing users' time, and resources.

It supports cross-app integration within the Microsoft 365 ecosystem, streamlining project management, incident management, HR/ERP workflows, approvals, meetings, content generation, employee recognition, and bookings. The cross-app integration allows you to access and act on data across different applications within the Microsoft 365 ecosystem, ensuring a unified user experience. Action commands allow users to interact with Copilot in natural language to create or update items, tapping into Generative AI powered by company data. This simplifies tasks like ticket creation, leave requests, and sending kudos, directly within Copilot’s interface.

## Build Actions in Copilot for Microsoft 365

The following steps explain the process to build Actions in Copilot for Microsoft 365:

1. **Invocation**: Users initiate an action by entering a natural language query that aligns with an action's intent. The user types a natural language command in the Copilot chat window, such as **Can you file a sick leave for me?** or **Create a general issue**.

1. **User Action Confirmation**: Users confirm the action to share the information with the plugin. User selects **Continue in plugin** to proceed with the action. Copilot opens a dialog with the app's dialog, prepopulated with the parameter values. The user can fill in more details or upload files as required by the app.

1. **Completion Confirmation**: The plugin acknowledges the action's completion, through an Adaptive Card, text, or JSON templates. The user submits the action and Copilot shows a notification with the status and outcome of the action, such as **Your details have been successfully submitted**. The user can also view or edit the action details in the app.

1. **Clarification [Optional]**: If essential parameters are missing, Copilot requests additional information from the user.

1. **Modification [Optional]**: Users can modify the submitted action command to Copilot by typing a natural language query, using rich Large Language Model (LLM) capabilities to alter existing parameter values and submitting again.

1. **3P Error [Optional]**: Should a service encounter an error, Copilot relays the plugin's error message to the user. The following errors are supported:

   * **Recoverable Errors**:
      * **Rectification Suggestions**: You can send an error response to the user with requests for corrections or more data in text or JSON format.
      * **Authentication/Configuration Failure**: You can prompt the user to reauthorize if there's an authentication or configuration issue.

   * **Irrecoverable Errors**:
      * **From Developer**: You should be able to send a failure message that Copilot displays to the user.
      * **From Copilot**: In cases of API availability issues or network problems, Copilot can send an error message to the user.

1. **User Action Confirmation from Dialogs**: Users must confirm actions from dialogs to complete the process.

## Prerequisites

Ensure that you adhere to the following prerequisites while building Actions in Copilot for Microsoft 365:

1. Update your app manifest to version 1.13 or later.
1. [Upgrade to Teamsjs version v2.22 or later](https://www.npmjs.com/package/@microsoft/teams-js)
1. Add the Microsoft 365 channel for your plugin for users to interact with your message extension from Microsoft 365 Copilot or Outlook. For more information, see [add Microsoft 365 channel for your app](../m365-apps/extend-m365-teams-message-extension.md#add-microsoft-365-channel-for-your-app).
1. If you're using single sign-on (SSO), [update your Microsoft Entra ID app registration for SSO](../m365-apps/extend-m365-teams-message-extension.md#update-microsoft-entra-app-registration-for-sso).
1. If you're using Content Security Policy, [modify your Content Security Policy headers](../m365-apps/extend-m365-teams-personal-tab.md#configure-content-security-policy-headers).

## Add actions to bot-based message extension

1. **Define Parameters for Action Commands**: In your app manifest, within the action command section, define the parameters along with their descriptions for the command. The following code snippet is an example to define parameters:

    ```json
    "composeExtensions": [
      {
        "commands": [
          {
            "id": "createContosoItem",
            "type": "action",
            "title": "Create Item",
            "description": "Create an item on Contoso",
            "taskInfo": {
              "title": "Create Item",
              "width": "large",
              "height": "large",
              "url": "your dialog url"
            },
            "parameters": [
              {
                "name": "Title",
                "inputType": "text",
                "title": "Title",
                "description": "Title of the item to be created"
              },
              {
                "name": "Summary",
                "inputType": "text",
                "title": "Summary",
                "description": "Summary of the item to be created"
              },
              {
                "name": "Priority",
                "inputType": "text",
                "title": "Priority",
                "description": "Priority of the item. This can be high, medium or low."
              }
            ],
            "samplePrompts": [
              { "text": "Create a Contoso ticket on <Topic>" },
              { "text": "Create a Contoso ticket on <Topic> and mark the priority as <Priority>" }
            ],
            "context": [
              "compose"
            ]
          }
        ]
      }
    ]
    ```

1. Call `app.getContext` and check `dialogParameters` object to prepopulate the dialog fields:

   ```JavaScript
    await app.initialize();  
    const context = await app.getContext();  
    const dialogParameters = context.dialogParameters;  
    /* context.dialogParameters will contain key value pairs prepopulated by Copilot.The keys will match the parameter names specified in the manifest.

    For example, if you had three parameters in your manifest called Title, Description and Priority, you can access the values Copilot has prepopulated for you using dialogParameters.Title, dialogParameters.Description and dialogParameters.Priority
    */  
    document.getElementById("Title").value = dialogParameters["Title"];  
    document.getElementById("Summary").value = dialogParameters["Summary"];  
    document.getElementById("Priority").value = dialogParameters["Priority"];  
   ```

    Adding extracted parameters into a bot invoke response is essential, especially when utilizing a `fetchTask` Adaptive Card dialog. It's important to autopopulate the dialog with parameter values obtained from the extracted data. Here's an example of a potential invoke request for fetch task:

    ```json
    {  
        "name": "composeExtension/fetchTask",  
        "value": {  
            "commandId": "createCommand",  
            "data": {  
            "taskParameters": [  
                     { "name": "title", "value": "Contoso issue" },  
                     { "name": "summary", "value": "Contoso issue faced in the Fabrikam app" },  
                     { "name": "priority", "value": "Critical" }  
            ]  
         }  
        }  
    } 
    ```

    > [!NOTE]
    > For static parameter-based dialogs, Copilot autopopulates the parameters and displays the dialog to the user.

1. After the action is completed in the dialog, you must return a [card as response](how-to/action-commands/respond-to-task-module-submit.md#respond-with-a-card-inserted-into-the-compose-message-area) that's displayed to the user.

You've successfully added actions in your bot-based message extension. Upload your bot-based message extension app in Teams and you'll see the following:

:::image type="content" source="~/assets/images/actions-in-m365.gif" alt-text="The GIF shows the actions in bot-based message extension.":::

## Code sample

| **Sample name** | **Description** | **Typescript** |
|------------|-------------|----------------|
| Actions in Copilot for Microsoft 365 | This sample implements a Teams message extension that can be used as a plugin in Copilot for Microsoft 365. | [View](https://github.com/OfficeDev/Copilot-for-M365-Samples/tree/main/samples/msgext-northwind-inventory-action-ts) |

## See also

[Extend bot-based message extension as plugin for Copilot for Microsoft 365](build-bot-based-plugin.md)
