---
title: Build an AI Agent in Teams
author: surbhigupta
description:  In this module, learn how to quickly try the Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ganr
ms.date: 08/05/2024
---

An AI agent in Microsoft Teams is a conversational chatbot that can reason with large language models to interact with users to understand the intention and choose a sequence of actions to take so the chatbot can complete common tasks. Example tasks include querying and summarizing information (e.g., "Do you have any flights to DC tomorrow?"), authoring content based on user intent (e.g., "Rephrase this sentence to be more professional"), or acting on the user’s behalf (e.g., "Please cancel my order"). To build an AI agent that works in Microsoft Teams, you will need:

Teams AI Library is the SDK designed specifically for this use case. It's predictive engine that can map intents to actions by leveraging provided prompts and topic filters. You can even chain multiple actions together to make building complex workflows easy.

Microsoft Teams Toolkit enables you to get started with building AI agents fast through a set of ready-to-use application templates, development lifecycle automations in Visual Studio Code.

(Optional) Assistants API from OpenAI. You can also optionally use the Assistants API from OpenAI to simplify the development effort of creating an AI agent. OpenAI as a platform, offers pre-built tools such as Code Interpreter, Knowledge Retrieval and Function Calling that drastically simplifies the code you need to write for common scenarios.

In this tutorial, you will learn:
Get started with Teams Toolkit, Teams AI Library and Assistants API:

Prerequisite
How to choose between Build New and Build with Assistants API
How to create a new AI Agent
How to understand the AI Agent project
How Teams AI Library is used to create an AI Agent
Customize the app template:

Build New:

Customize prompt augmentation
Add functions
Build with Assistants API:

Customize the Assistant creation
Add functions
back to top

Prerequisites
Building an AI agent is an advanced scenario, it requires basic understanding of how AI orchestration works, advanced concepts like Planner and Actions that can leverage LLM to generate a plan on how to accomplish a user ask and mix and match atomic functions registered in AI system so that it can recombine them into a series of steps that complete the goal.

Tip

If you are not familiar with those concepts, please start with Build a Basic AI Chatbot in Teams.

back to top

How to choose between Build New and Build with Assistants API
Comparison	Build New	Build with Assistants API
Cost	Only costs for LLM services	Costs for LLM services and use tools in Assistants API may incur additional costs
Dev Effort	Medium	Relatively Small
LLM Services	Azure OpenAI or OpenAI	OpenAI Only
Example Implementations in Template	This app template is capable of chatting with users and helping users manage tasks.	This app templates uses Code Interpreter tool to solve math problems and also Function Calling tool to get city weather.
Limitations	N/A	Currently, the Knowledge Retrieval tool is not supported by Teams AI library.
back to top

How to create a new AI Agent
In Visual Studio Code
From Teams Toolkit side bar click Create a New App or select Teams: Create a New App from the command palette. image

Select Custom Copilot. image

Select AI Agent. image

Select a way to start building the agent image

Select a Programming Language image

Important

If you have selected Build with Assistants API in previous, you may only continue with OpenAI as Azure OpenAI service has not provided support for Assistants API yet.

Select a service to access LLMs image

Based on your service selection, you can optionally enter the credentials to access OpenAI or Azure OpenAI. Hit enter to skip. image

Select a folder where to create you project. The default one is ${HOME}/TeamsApps/. image

Enter an application name and then press enter. image

Important

Make sure you have entered the credentials to access Azure OpenAI or OpenAI service. If you have skipped entering those in the project creation dialog, follow the README file in the project to specify them.

After you successfully created the project, you can quickly start local debugging via F5 in Visual Studio Code. Select Debug in Test Tool (Preview) debug option to test the application in Teams App Test Tool. Now you can start chatting with your AI agent.

Build New: ai agent new

Build with Assistants API: ai agent with assistants api

back to top

How to understand the AI Agent project
Teams Toolkit generates a standard project that has built-in features to demonstrate how a basic AI chatbot works as well as some configuration files that help automate the development experience.

Below are common files used for both options to build an AI Agent:

Folder	Contents
.vscode	VSCode files for debugging
appPackage	Templates for the Teams application manifest
env	Environment files
infra	Templates for provisioning Azure resources
src	The source code for the application
The following are another set of project specific files Teams Toolkit generate. You can visit a complete guide on Github to understand how Teams Toolkit works.

File	Contents
teamsapp.yml	This is the main Teams Toolkit project file. The project file defines two primary things: Properties and configuration Stage definitions.
teamsapp.local.yml	This overrides teamsapp.yml with actions that enable local execution and debugging.
teamsapp.testtool.yml	This overrides teamsapp.yml with actions that enable local execution and debugging in Teams App Test Tool.
When starting the two options (Build New vs Build with Assistants API), the differences are mostly in the src folders where we demonstrate an example implementation and allow developers to customize.

Build New
File	Contents
src/index.js	Sets up the bot app server.
src/adapter.js	Sets up the bot adapter.
src/config.js	Defines the environment variables.
src/prompts/planner/skprompt.txt	Defines the prompt.
src/prompts/planner/config.json	Configures the prompt.
src/prompts/planner/actions.json	Defines the actions.
src/app/app.js	Handles business logics for the AI Assistant Bot.
src/app/messages.js	Defines the message activity handlers.
src/app/actions.js	Defines the AI actions.
Build with Assistants API
File	Contents
src/index.js	Sets up the bot app server.
src/adapter.js	Sets up the bot adapter.
src/config.js	Defines the environment variables.
src/creator.js	One-time tool to create OpenAI Assistant.
src/app/app.js	Handles business logics for the AI Assistant Bot.
src/app/messages.js	Defines the message activity handlers.
src/app/actions.js	Defines the AI actions.
back to top

How Teams AI Library is used to create an AI Agent
Build New
Teams AI Library provides a comprehensive flow that facilitates you to build your own AI agent. These are the most important concepts you need to know:

Actions: An action is an atomic function that is registered to the AI System. It is a fundamental building block of a plan.
Planner: The planner receives the user's ask and returns a plan on how to accomplish the request. The user's ask is in the form of a prompt or prompt template. It does this by using AI to mix and match atomic functions (called actions) registered to the AI system so that it can recombine them into a series of steps that complete a goal.
Action PlannerThe Action Planner is a powerful planner that uses an LLM to generate plans. It can trigger parameterized actions and send text-based responses to the user.
Planner
The planner receives the user's ask and returns a plan on how to accomplish the request. The user's ask is in the form of a prompt or prompt template. This is a powerful concept because it allows you to create actions that can be used in ways that you as a developer may not have thought of.

For instance, If you have a task with Summarize & SendEmail actions, the planner could combine them to create workflows like "Rewrite the following report into a short paragraph and email it to johndoe@email.com" without you explicitly having to write code for those scenarios.

Plan
A plan is the entity that is generated by the planner. It is a JSON object of the following shape:

{
  "type": "plan",
  "commands": [
    {
      "type": "DO",
      "action": "<name>",
      "parameters": {
        "<name>": "<value>"
      }
    },
    {
      "type": "SAY",
      "response": "<response>"
    }
  ]
}
A plan consists of two types of commands and their entities:

SAY: Sends a message to the user.
response: The string message to send.
DO: AI system will execute a specific action, passing in the generated parameters.
action: A lambda function registered to the AI system
parameters: A dictionary passed to the action.
The JSON object string is returned by the LLM and deserialized into an object.

This plan is executed in sequential order. So first the list will be created and then an item will be added to it. Finally, the response message will be sent to the user.

Action
An action is an atomic function that is registered to the AI System. It is a fundamental building block of a plan. Actions are used to perform tasks such as creating a list, adding items to a list, or sending a message to the user. Actions are executed in the order they are defined in the plan.

Here's an example of what an action creating a new list would look like in code. Call this action createList: List Bot sample

app.ai.action("createList", async (context: TurnContext, state: ApplicationTurnState, parameters: ListAndItems) => {
  // Ex. create a list with name "Grocery Shopping".
  ensureListExists(state, parameters.list);

  // Continues exectuion of next command in the plan.
  
  await app.ai.doAction(context, state, "addItems", parameters);
  return `list created and items added. think about your next action`;
});
To 'chain' actions together programmatically, the doAction method is used to call the next action. This is a common pattern in the AI System.

Important

Note that ___DO___ and ___SAY___, despite being called commands, are actually specialized actions. This means that a plan is really a sequence of actions.

Action Planner
The Action Planner is a powerful planner that uses an LLM to generate plans. It can trigger parameterized actions and send text-based responses to the user.

back to top

Build with Assistants API
Assistants API from OpenAI to simplify the development effort of creating an AI agent. OpenAI as a platform, offers pre-built tools such as Code Interpreter, Knowledge Retrieval and Function Calling that drastically simplifies the code you need to write for common scenarios.

Check out the video for a comprehensive walkthrough with Assistants API:

IMAGE ALT TEXT HERE

back to top

Customize the application template
Customize prompt augmentation
The SDK provides a functionality to augment the prompt. With augmentation:

The actions defined in src/prompts/planner/actions.json will be inserted into the prompt to let LLM know the available functions.
An internal piece of prompt text will be inserted into the prompt to instruct LLM to determine which functions to call based on the available functions. This prompt text orders LLM to generate the response in a structured json format.
The SDK will validate the LLM response and let LLM correct or refine the response if the response is in wrong format.
In src/prompts/planner/config.json, configure augmentation.augmentation_type. The options are:

sequence: suitable for tasks that require multiple steps or complex logic.
monologue: suitable for tasks that require natural language understanding and generation, and more flexibility and creativity.
back to top

Add functions (Build New)
In src/prompts/planner/actions.json, define your actions schema.
[
    ...
    {
        "name": "myFunction",
        "description": "The function description",
        "parameters": {
            "type": "object",
            "properties": {
                "parameter1": {
                    "type": "string",
                    "description": "The parameter1 description"
                },
            },
            "required": ["parameter1"]
        }
    }
]
In src/app/actions.ts, define the action handlers.
// Define your own function
export async function myFunction(context: TurnContext, state: TurnState, parameters): Promise<string> {
  // Implement your function logic
  ...
  // Return the result
  return "...";
}
In src/app/app.ts, register the actions.
app.ai.action("myFunction", myFunction);
back to top

Customize assistant creation
The file src/creator.ts creates a new OpenAI Assistant. You can customize the assistant creation by updating the parameters including instruction, model, tools and functions.

back to top

Add functions (with Assistants API)
When the assistant returns a function that need to be called along with its arguments, the SDK maps the function to the corresponding action that is registered in advance, then calls the action handler and submits the results to the assistant. You can add your functions by registering the actions into the app.

In src/app/actions.ts, define the action handlers.
// Define your own function
export async function myFunction(context: TurnContext, state: TurnState, parameters): Promise<string> {
  // Implement your function logic
  ...
  // Return the result
  return "...";
}
In src/app/app.ts, register the actions.
app.ai.action("myFunction", myFunction);
