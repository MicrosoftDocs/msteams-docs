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

Moreover, the cross-app integration feature allows you to access and act on data across different applications within the Microsoft 365 ecosystem, ensuring a unified user experience.  As developers, the future of efficient workflows is here, and it starts with  Actions in Copilot for Microsoft 365. Upgrade to version 1.13+ now and start leveraging the power of  Actions in Copilot for Microsoft 365.

# Implementing Actions in Copilot for Microsoft 365

Actions in message extension for copilot for micrososft 365 is the process of performing actions with natural language commands in the Copilot chat window using message extension plugins. For example, users can ask Copilot to file a reimbursement claim, create a task, or add a person to a project using third-party apps. The flow consists of the following steps:

* **Invocation**: The user types a natural language command in the Copilot chat window, such as "Can you file a sick leave for me?" or "Create a general issue".

* **Disclosure**: Copilot shows a confirmation screen with the parameters and parameter values that will be sent to the app, such as alias, claim type, category, etc. The user can modify or cancel the parameters if needed.

* **Confirmation**: The user clicks on "Continue in plugin" to proceed with the action. Copilot opens a task module with the app's dialog, pre-populated with the parameter values. The user can fill in any additional details or upload files as required by the app.

* **Completion**: The user submits the action and Copilot shows a notification with the status and outcome of the action, such as "Your details have been successfully submitted". The user can also view or edit the action details in the app.

## Why Implement  Actions?

Implementing  Actions in your applications can significantly enhance user productivity by streamlining workflows. Users can complete tasks within Copilot without the need to switch contexts or applications. The feature also leverages AI to generate content and perform actions based on contextual understanding, optimizing time, and resources. Furthermore, it allows for cross-app integration, enabling users to access and act on data across different applications within the Microsoft 365 ecosystem.

This feature is useful in scenarios such as project management, incident management, HR/ERP workflows, approvals, meetings, content generation, employee recognition, and bookings. By implementing  Actions, you can simplify these processes and provide a unified user experience.

## Prerequisites

Before you begin, ensure that you have met the following requirements:

* Update your manifest to version 1.13+ and add the Microsoft 365 channel for your plugin.
* Define parameters for Action commands.
* Ensure command and parameter descriptions are LLM friendly.
* Return synchronous card response from the task module for user-initiated cards.

## Implementation Steps

1. **Define Parameters for Action Commands**

   In your manifest, define parameters for Action commands. These parameters will be processed by your bot logic. Here's an example of how to define parameters:

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

   In this example, two parameters are defined for the `createTask` command: `taskTitle` and `taskDescription`.

2. **Adjust Bot Logic**

   Adjust your bot logic to process the parameters defined in the manifest. The bot should be able to handle the command and its parameters, perform the necessary actions, and return a response. For example, if a user initiates the `createTask` command, your bot should be able to create a task with the provided title and description.

3. **Ensure LLM Friendliness**

   Make sure that your command and parameter descriptions are friendly to Language and Locale Model (LLM). This ensures that your commands are easily understood and used by users across different locales. For example, avoid using jargon or complex language in your descriptions.

4. **Provide a Synchronous Card Response**

   For user-initiated cards, provide a synchronous card response from the task module. This ensures that users receive immediate feedback upon initiating an action. For example, once a user creates a task, they should receive a confirmation card.

## Limitations and Best Practices

While  Actions offer numerous benefits, it's important to note that they're dependent on the capabilities of the external systems they interact with. Therefore, ensure that the external systems can handle the actions initiated by Copilot.

As a best practice, always test your implementation thoroughly to ensure that it works as expected and provides a seamless user experience. Also, keep your command and parameter descriptions clear and concise to ensure they're easily understood by users.