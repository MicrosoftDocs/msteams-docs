---
title: Conversation AI quick start
author: surbhigupta
description:  In this module, learn how to quickly try the Teams AI SDK.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ypalikila
ms.date: 04/07/2022
---

# Getting started

The Teams AI SDK simplifies the process of creating and powering bots with AI capabilities. It provides APIs to access and manipulate data, as well as a range of controls and components to create custom user interfaces. With the PredictionEngine (Open AI plugin), developers can easily add AI capabilities to their Teams applications.

DevOps, an Azure-powered application, enables users to track work items to manage projects, track bugs, or plan complex project management scenarios. To increase engagement, DevOps Teams bots will use GPT (Generative Pre-trained Transformer) capabilities. The key entity with which DevOps Bot operates is work items. All bugs are also categorized as work items for the purposes of this document.

## Pre-requisites

To get started, set up migration guide and start GPT setup guide:

1. [Set up migration guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/00.MIGRATION.md)
1. [Start GPT setup guide](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/01.GPT-SETUP.md)
1. [API-REFERENCE](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/02.API-REFERENCE.md)
1. [PROMPT-INJECTION](https://github.com/microsoft/botbuilder-m365/blob/main/getting-started/PROMPT-INJECTION.md)

This document is intended to help Teams developers to GPTify their bots and spark creativity.

1. Setup the SDK
1. Teams-ify: Pick your capabilities
1. Prompt engineering: Add AI instructions
1. Topic filters: Pick the subject(s)
1. Actions: Execute the right command(s)
1. Responsible AI: Ethical way to use GPT

## Setup the SDK

To get started, you must first create an application package. To do this, you'll need to use the App Studio tool in the Microsoft Teams app. This will allow you to create an application package that contains all the necessary files and scaffolding needed to run your app in Teams.

To get started import the AI SDK package into your source file. This will add SDK’s new Application class to your app and configure it with an OpenAI powered prediction engine and the state storage provider of your choice:

```javascript
import { Application, OpenAIPredictionEngine } from 'botbuilder-m365';
import { MemoryStorage } from 'botbuilder';
// Create OpenAI prediction engine
const predictionEngine = new OpenAIPredictionEngine({ 
// Configure your OpenAI API key 
configuration: { apiKey: process.env.OPENAI_API_KEY }, 
// Configure prompt & promptConfig 
// Configure topicFilter & topicFilterConfig
}); 
// Create storage provider used to persist state
const storage = new MemoryStorage();
 // Create application class
const app = new Application({ 
predictionEngine, 
storage
});
```

## Teams-ify: Pick your capabilities

Next step is to pick the capabilities needed. Developers will need to use the SDK to scaffold bot and adaptive card handlers to the source file.

**Card handler** – Add it to the cards folder in the source folder

```javascript
Import {Attachment, Cardfactory} from ‘botbuilder’;
export function yourfunctionname(): Attachment {
return Cardfactory.adaptivecard{
//code logic
}

```

**Bot handler** – Add it to the main activity manager file. Once you've configured your Open AI API, you need to create a Bot Activity Handler class. This class will contain all the logic for handling user requests and responding with the appropriate response.

```javascript
import { 
CloudAdapter, 
ConfigurationBotFrameworkAuthentication, ConfigurationBotFrameworkAuthenticationOptions, 
MemoryStorage, 
ActivityTypes } from 'botbuilder';

const adapter = new CloudAdapter(botFrameworkAuthentication);
```

## Prompt engineering: Add AI instructions

Prompts are pieces of text that can be used to create conversational experiences. They're used to start conversations, ask questions, and generate responses. They can be used to create natural language experiences for chatbots, virtual assistants, and other conversational user interfaces. The use of prompts can help reduce the complexity of creating conversational experiences and make them more engaging for the user.

The Teams AI SDK provides developers with access to OpenAI's machine learning capabilities through the PredictionEngine plugin. This is the default AI plugin that comes with the SDK, but developers can also create their own plugin or connector to use an alternative plugin.

Add the prompt details via the PredictionEngine initializer (refer step #1).

This is where you need to provide the right configuration to ensure bot responses are aligned with your business requirement.

* Model = Davinci003: This is the name of the LLM model for responses

* Temperature: This is how creative or deterministic the bot will be when responding

* Maximum Tokens: Bot response length supported.

* Top P: This is how many of the choice’s bot can remember and use when responding

* Frequency Penalty: This is a special rule that helps the bot avoid crafting responses that sound too similar to other it has made.

* Presence Penalty: This is another special rule that helps the bot avoid making responses that sound like earlier responses.

```javascript
//define the prompt
prompt: path.join(__dirname, '../src/prompt.txt'), 
promptConfig: { model: 'text-davinci-003', 
temperature: 0.0, 
max_tokens: 2048, 
top_p: 1, 
frequency_penalty: 0, 
presence_penalty: 0.6, 
stop: [' Human:', ' AI:'] }, 

```

Once the prompt initialized, you need to add the details in the prompt.txt to provide the functional outline for the bot. Using prompt.txt, bot understands which how it operates and what actions it can perform.
The following is a conversation with AI assistant.

The following actions are supported:

* CreateWI
* AssignWI
* UpdateWI
* TriageWI

All entities are required parameters to actions.

## Topic filters: Pick the subject(s)

The topic filter for the DevOps bot is an important feature that allows it to respond to specific topics, such as bugs or work items. By applying the topic filter, the bot can focus its attention on the topics that are most important to the user. This makes it easier for the user to find the information they need quickly and efficiently, as the app will not be distracted by topics that aren't relevant to their needs. Additionally, the topic filter helps to ensure that the bot provides accurate and up-to-date information by filtering out irrelevant topics.

Teams AI SDK offers topic filtering services via the PredictionEngine.

In step 3, the prompt was added to the PredictionEngine initializer. Now, the topic filter configuration details should also be added in the same way.

```javascript
//initialize the topic filter here
topicFilter: path.join(__dirname, '../src/topicFilter.txt'), 
topicFilterConfig: { 
model: 'text-davinci-003', 
temperature: 0.0, 
max_tokens: 128, 
top_p: 1, 
frequency_penalty: 0, 
presence_penalty: 0.0, 
stop: [' Human:', ' AI:'] 
}, });
```

Once the topic filter is initialized, you need to add details to the topicfilter.txt file. This will provide the bot with an outline of the conversation it should follow, including what topics it should respond to and what it should ignore.

AI can only respond to work item or bug related queries.
Bugs are a type of work item.
Humans can chat with AI for the following tasks.

* Greet the AI
* Ask for help
* Answer question asked by AI
* Ask AI to perform certain task it's capable of

Conversation History:

```javascript
// load the conversation history
{{conversation.history}}
```

Current message:

```javascript
//add the user query to the conversation
Human: {{activity.text}}
```

Think about the topic of this message. Is the human allowed to chat with the AI about this? Just answer yes or no.

## Actions: Execute the right command(s)

This is the place where everything comes together. In step #2 we defined in prompt that Dev bot can perform four actions of:

1. CreateWI
1. TriageWI
1. AssignWI
1. UpdateWI

These actions need to be registered in the source file. These actions are required for the bot to execute when AI finds an intent match from the user conversation, it needs to find the relevant action to be executed (refer #2 prompt on how the mapping is defined).  

The following is the code sample for actions in the main app handler:

```javascript
CreateWI {
generate_WI_title(conversation.history.title)
Generate_WI_desc(conversation.history.summary
Create_ticket()
}

//AssignWI {
Find_user(Conversation.history.suggesteduser)
Update_WI(WI#,find_user)

}

//UpdateWI(WI#) {
WI_update_action = find_update_field(conversation.history.updateaction)
Update_WI(WI#, WI_update_action)


//TriageWI {
WI_priority = find_WI_priority(conversation.history.newpriority)
Update_WI(WI#, WI_priority)
}
```

## Responsible AI: Ethical way to use GPT
