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

Actions in Copilot for Microsoft 365 allow users to interact with applications by enabling direct engagement with external systems. Actions extend to a wide range of scenarios, from project and incident management to HR or ERP workflows, approvals, meetings, content generation, employee  recognition, and bookings. With the added advantage of AI,  Actions can generate content and perform actions based on contextual understanding, optimizing your time, and resources.

It supports cross-app integration within the Microsoft 365 ecosystem, streamlining project management, incident management, HR/ERP workflows, approvals, meetings, content generation, employee recognition, and bookings. The cross-app integration allows you to access and act on data across different applications within the Microsoft 365 ecosystem, ensuring a unified user experience. Action commands allow users to interact with Copilot in natural language to create or update items, tapping into Generative AI powered by company data. This simplifies tasks like ticket creation, leave requests, and sending kudos, directly within Copilot’s interface.

## Build Actions in Copilot for Microsoft 365

Actions in message extension for copilot for Microsoft 365 is the process of performing actions with natural language commands in the Copilot chat window using message extension plugins. For example, users can ask Copilot to file a reimbursement claim, create a task, or add a person to a project using third-party apps. The flow consists of the following steps:

* **Invocation**: Users initiate an action by entering a natural language query that aligns with an action's intent. The user types a natural language command in the Copilot chat window, such as **Can you file a sick leave for me?** or **Create a general issue**.

* **User Action Confirmation**: Users explicitly confirm the action, which then shares the information with the plugin. The user selects on **Continue in plugin** to proceed with the action. Copilot opens a dialog with the app's dialog, prepopulated with the parameter values. The user can fill in any more details or upload files as required by the app.

* **Completion Confirmation**: The plugin acknowledges the action's completion, potentially through an adaptive card, text, or JSON templates. The user submits the action and Copilot shows a notification with the status and outcome of the action, such as **Your details have been successfully submitted**. The user can also view or edit the action details in the app.

* **Clarification [Optional Step]**: If essential parameters are missing, Copilot might request additional information from the user.

* **Modification [Optional Step]**: Users can modify the disclosed information by submitting a natural language query, using rich Large Language Model (LLM) capabilities to alter existing parameter values.

* **3P Error [Optional Step]**: Should a service encounter an error, Copilot relays the plugin's error message to the user. The following errors are supported:

   * **Recoverable Errors**:
      * **Rectification Suggestions**: Developers can send an error response to the user with requests for corrections or more data in text or JSON format.
      * **Authentication/Configuration Failure**: Developers can prompt the user to reauthorize if there's an authentication or configuration issue.

   * **Irrecoverable Errors**:
      * **From Developer**: Developers should be able to send a failure message that Copilot displays to the user.
      * **From Copilot**: In cases of API availability issues or network problems, Copilot can send an error message to the user.

1. **User Action Confirmation from Dialogs**: Users must confirm actions from dialogs to complete the process.

## Prerequisites

1. Updated your app manifest to version 1.13 or later.
1. [Upgrade to Teamsjs version v2.22 or later](https://www.npmjs.com/package/@microsoft/teams-js)
1. Add the Microsoft 365 channel for your plugin for users to interact with your message extension from Microsoft 365 Copilot or Outlook. For more information, see Add Microsoft 365 channel.
1. If you're using single sign-on (SSO), [update your Microsoft Entra ID app registration for SSO](/m365-apps/extend-m365-teams-personal-tab.md#update-microsoft-entra-app-registration-for-sso).
1. If using Content Security Policy, [modify your Content Security Policy headers](/m365-apps/extend-m365-teams-personal-tab.md?tabs=manifest-teams-toolkit#configure-content-security-policy-headers).

[Extend a Teams personal tab across Microsoft 365](../m365-apps/extend-m365-teams-personal-tab.md)

## Add actions to bot-based message extension

1. **Define Parameters for Action Commands**: In your manifest, within the action command section, add the parameters and its descriptions which you need for that command. Here's an example of how to define parameters:

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

1. **Upgrade to Teamsjs version v2.22 or later** [@microsoft/teams-js - npm (npmjs.com)](https://www.npmjs.com/package/@microsoft/teams-js) (v2.22 may be in Beta at the time you are reading this, it is expected to be a released as a stable build in early April 2024).

1. Prepopulate the dialog fields by calling `app.getContext` and checking the `dialogParameters` object:

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

1. Extracted parameters are also sent as part of the bot invoke response – if you are using fetchTask based adaptive card dialog – you must prepopulate the dialog with the parameter values using these. A sample invoke request for fetch-task will look something like this:

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
    > For static parameter based dialogs, Copilot auto-populates the parameters and show the dialog to the user.

1. After the action is completed in the dialog, you must return a [card as response](how-to/action-commands/respond-to-task-module-submit.md#respond-with-a-card-inserted-into-the-compose-message-area) which will then be shown to the user.
