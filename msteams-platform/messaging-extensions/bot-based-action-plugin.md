---
title: Bot-based message extension plugin with Action
description: Learn how to create a bot-based action plugin for Microsoft Teams messaging extensions.
ms.date: 04/23/2024
ms.topic: conceptual
author: v-ypalikila
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Actions in Copilot for Microsoft 365

Actions in Copilot for Microsoft 365 revolutionizes the way users interact with applications by enabling direct engagement with external systems. This innovative feature creates a seamless and efficient workflow experience, eliminating the need to switch between contexts or applications. The result is a streamlined task management process that significantly enhances productivity.

The versatility of  Actions extends to a wide range of scenarios, from project and incident management to HR/ERP workflows, approvals, meetings, content generation, employee recognition, and bookings. But the innovation doesn't stop there. With the added advantage of AI,  Actions can generate content and perform actions based on contextual understanding, optimizing your time, and resources. 

Moreover, the cross-app integration feature allows you to access and act on data across different applications within the Microsoft 365 ecosystem, ensuring a unified user experience.  As developers, the future of efficient workflows is here, and it starts with  Actions in Copilot for Microsoft 365. Upgrade to version 1.13+ now and start using the power of  Actions in Copilot for Microsoft 365.

## Why Implement  Actions?

Implementing  Actions in your applications can significantly enhance user productivity by streamlining workflows. Users can complete tasks within Copilot without the need to switch contexts or applications. The feature also uses AI to generate content and perform actions based on contextual understanding, optimizing time, and resources. Furthermore, it allows for cross-app integration, enabling users to access and act on data across different applications within the Microsoft 365 ecosystem.

This feature is useful in scenarios such as project management, incident management, HR/ERP workflows, approvals, meetings, content generation, employee recognition, and bookings. By implementing  Actions, you can simplify these processes and provide a unified user experience.

## Build Actions in Copilot for Microsoft 365

Actions in message extension for copilot for Microsoft 365 is the process of performing actions with natural language commands in the Copilot chat window using message extension plugins. For example, users can ask Copilot to file a reimbursement claim, create a task, or add a person to a project using third-party apps. The flow consists of the following steps:

1. **Invocation**: Users initiate an action by entering a natural language query that aligns with an action's intent. The user types a natural language command in the Copilot chat window, such as "Can you file a sick leave for me?" or "Create a general issue".

1. **Disclosure and Action Confirmation UI**: Copilot responds with the parameters to be sent to the third party service, derived from the plugin manifest. A customizable action confirmation message from the third party is also displayed,  with the parameters and parameter values that are sent to the app, such as alias, claim type, category, etc. The user can modify or cancel the parameters if needed.

1. **User Action Confirmation**: Users explicitly confirm the action, which then shares the information with the plugin. The user selects on "Continue in plugin" to proceed with the action. Copilot opens a dialog with the app's dialog, prepopulated with the parameter values. The user can fill in any more details or upload files as required by the app.

1. **Completion Confirmation**: The plugin acknowledges the action's completion, potentially through an adaptive card, text, or JSON templates. The user submits the action and Copilot shows a notification with the status and outcome of the action, such as **Your details have been successfully submitted**. The user can also view or edit the action details in the app.

1. **Clarification [Optional Step]**: If essential parameters are missing, Copilot might request additional information from the user.

1. **Modification [Optional Step]**: Users can modify the disclosed information by submitting a natural language query, using rich Large Language Model (LLM) capabilities to alter existing parameter values.

1. **3P Error [Optional Step]**: Should a service encounter an error, Copilot relays the plugin's error message to the user. The following errors are supported:

   1. **Recoverable Errors**:
      * **Rectification Suggestions**: Developers can send an error response to the user with requests for corrections or more data in text or JSON format.
      * **Authentication/Configuration Failure**: Developers can prompt the user to reauthorize if there's an authentication or configuration issue.

   1. **Irrecoverable Errors**:
      * **From Developer**: Developers should be able to send a failure message that Copilot will display to the user.
      * **From Copilot**: In cases of API availability issues or network problems, Copilot can send an error message to the user.


1. **Disclosure and Action Confirmation with Dialogs**: For plugins requiring complex inputs, business logic, or rich editing, a button to launch a modal-based form is provided. To ensure users have full control over their data and can make changes to the data generated by Copilot, it's vital to show users the information being sent with each parameter and seek explicit confirmation before triggering an action, as it might result in unintended changes.

1. **User Action Confirmation from Dialogs**: Users must confirm actions from dialogs to complete the process.


## Add actions to bot-based message extension 

1. Updated your manifest to version 1.13 or later and add the Microsoft 365 channel for your plugin.

1. **Define Parameters for Action Commands**: In your manifest, define parameters for Action commands. The bot processes the parameters. Here's an example of how to define parameters:

   ```json
   "composeExtensions": [
       {
           "commands": [
               {
                   "id": "createTask",
                   "type": "action",
                   "parameters": [
                       {
                           "name": "taskTitle",
                           "title": "Task Title",
                           "description": "Title of the task",
                           "inputType": "text"
                       },
                       {
                           "name": "taskDescription",
                           "title": "Task Description",
                           "description": "Description of the task",
                           "inputType": "textarea"
                       }
                   ]
               }
           ]
       }
   ]
   ```

   Ensure that your command and parameter descriptions are friendly to LLM, which ensures that your commands are easily understood and used by users across different locales. For example, avoid using jargon or complex language in your descriptions.

1. **Adjust Bot Logic**: Adjust your bot logic to process the parameters defined in the manifest. The bot should be able to handle the command and its parameters, perform the necessary actions, and return a response. To enable action commands with natural language in the Copilot chat window, the bot logic should be updated to:

   * Use the getContext API to receive the values of the parameters that are defined in the manifest and passed by Copilot. 

   ```JavaScript
    await app.initialize();
    const context = await app.getContext();
    const dialogParameters = context.dialogParameters;

    // context.dialogParameters will contain key-value pairs prepopulated by Copilot.
    // The keys will match the parameter names specified in the manifest.
    // For example, if you had three parameters in your manifest called Title, Description, and Date,
    // you can access the values Copilot has prepopulated for you using:
    // dialogParameters.Title, dialogParameters.Description, dialogParameters.Date
   ```
   

1. **Provide a Synchronous Card Response**: For user-initiated cards, provide a synchronous card response from the dialog, which ensures that users receive immediate feedback upon initiating an action. For example, once a user creates a task, they should receive a confirmation card.
