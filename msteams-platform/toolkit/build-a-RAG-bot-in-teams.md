---
title: Build a RAG Bot in Teams
author: surbhigupta
description:  In this module, learn how to build RAG bot using Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ganr
ms.date: 05/08/2024
---

# Build a RAG Bot in Teams

One of the most powerful applications enabled by LLMs is sophisticated question-answering (Q&A) chatbots. These are applications that can answer questions about specific source information. These applications use a technique known as Retrieval Augmented Generation, or RAG. For example:

Knowledge Base: "Company's shuttle bus may be 15 minutes late on rainy days."
User Query: "When will the shuttle bus arrive?"
AI Response (With RAG): "Today is rainy, the shuttle bus may be 15 minutes late than usual, so around 9:15 AM."
RAG typical architecture

This chart has demonstrated a typical RAG architecture that has two main flows:

Data Ingestion - A pipeline for ingesting data from a source and indexing it. This usually happens offline.
Retrieval and Generation - The actual RAG chain, which takes the user query at run time and retrieves the relevant data from the index, then passes that to the model.
Microsoft Teams enables developers to build a conversational bot with RAG capability to create a powerful experience to maximize the productivity.

Teams Toolkit provides a series ready to use application templates under the category Chat with your data that combines the capabilities of Azure AI Search, Microsoft 365 & SharePoint and Custom API as different data source and Large Language Models (LLMs) to create a conversational search experience in Microsoft Teams.

In this tutorial, you will learn:
Get started with Teams Toolkit and Teams AI Library:

How to create a new RAG bot
How teams-ai helps to achieve RAG scenario
Choose between data sources
How to understand the RAG project
Customize the app template:

Customize Azure AI as Data Source
Customize Microsoft Graph & SharePoint as Data Source
Build your own data ingestion
Add more API for Custom API as data source
back to top

How to create a new RAG bot
Important

This flow is based on the choice of Customize as your data source, if you choose to start with Azure AI Service, Custom API or Microsoft 365 you may see different prompts in Visual Studio Code. Make sure to follow the prompts and instructions in Teams Toolkit.

From Teams Toolkit side bar click Create a New App or select Teams: Create a New App from the command palette. image

Select Custom Copilot. image

Select Chat With Your Data image

Select an option for your data source image

Select a Programming Language image

Select a service to access LLMs image

Based on your service selection, you can optionally enter the credentials to access OpenAI or Azure OpenAI. Hit enter to skip. image

Select a folder where to create you project. The default one is ${HOME}/TeamsApps/. image

Enter an application name and then press enter. image

back to top

How teams-ai helps to achieve RAG scenario
Tip

Teams-AI library does not provide vector database implementation, so you need to add your own logic for further processing the created embeddings.

In AI context, vector databases are widely used as RAG storages, which store embeddings data and provide vector-similarity search. Teams-AI library provides utilities to help create embeddings for the given inputs.

For Javascript language:
// create OpenAIEmbeddings instance
const model = new OpenAIEmbeddings({ ... endpoint, apikey, model, ... });

// create embeddings for the given inputs
const embeddings = await model.createEmbeddings(model, inputs);

// your own logic to process embeddings
For Python language:
# create OpenAIEmbeddings instance
model = OpenAIEmbeddings(OpenAIEmbeddingsOptions(api_key, model))

# create embeddings for the given inputs
embeddings = await model.create_embeddings(inputs)

# your own logic to process embeddings
Teams AI helps RAG Teams-AI library also provides functionalities to ease each step of the retrieval and generation process.

Handle Input: The most straightforward way is to pass user's input as is to retrieval. However, if you'd like to customize the input before retrieval, you can add activity handler to certain incoming activities.

Retrieve data source: Teams-AI library provides DataSource interface to let you to add your own retrieval logic. You will need to create your own DataSource instance, and the library orchestrator will call it on demand.

For Javascript language:
class MyDataSource implements DataSource {
  /**
   * Name of the data source.
   */
  public readonly name = "my-datasource";

  /**
   * Renders the data source as a string of text.
   * @param context Turn context for the current turn of conversation with the user.
   * @param memory An interface for accessing state values.
   * @param tokenizer Tokenizer to use when rendering the data source.
   * @param maxTokens Maximum number of tokens allowed to be rendered.
   * @returns The text to inject into the prompt as a `RenderedPromptSection` object.
   */
  renderData(
    context: TurnContext,
    memory: Memory,
    tokenizer: Tokenizer,
    maxTokens: number
  ): Promise<RenderedPromptSection<string>> {
    ...
  }
}
For Python language:
class MyDataSource(DataSource):
  def __init__(self):
    self.name = "my_datasource_name"
  
  def name(self):
    return self.name

  async def render_data(self, _context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: int):
    # your render data logic
Call AI with prompt: In Teams-AI's prompt system, you can easily inject data source by adjusting the augmentation.data_sources configuration section. This connects the prompt with the added DataSource in previous step, and library orchestrator will inject the data source text into final prompt. See AuthorPrompt for the details. For example, in prompt's config.json file:
{
    "schema": 1.1,
    ...
    "augmentation": {
        "data_sources": {
            "my-datasource": 1200
        }
    }
}
Build response: By default, Teams-AI library replies the AI generated response as text message to user. If you'd like to customize the response, you can override the default SAY action (see AI Actions) or explicitly call AI model (see AI Models) to build your own replies, e.g., with adaptive cards.
Here's a minimal set of implementations to add RAG to your app. In general, it implements DataSource to inject your own knowledge into prompt, so that AI can generate response based on the knowledge.

Create myDataSource.ts to implement DataSource interface.

export class MyDataSource implements DataSource {
  public readonly name = "my-datasource";
  public async renderData(
    context: TurnContext,
    memory: Memory,
    tokenizer: Tokenizer,
    maxTokens: number
  ): Promise<RenderedPromptSection<string>> {
    const input = memory.getValue('temp.input') as string;
    let knowledge = "There's no knowledge found.";

    // hard-code knowledge
    if (input?.includes("shuttle bus")) {
      knowledge = "Company's shuttle bus may be 15 minutes late on rainy days.";
    } else if (input?.includes("cafe")) {
      knowledge = "The Cafe's available time is 9:00 to 17:00 on working days and 10:00 to 16:00 on weekends and holidays."
    }
    
    return {
      output: knowledge,
      length: knowledge.length,
      tooLong: false
    }
  }
}
Register the data source in app.ts,

For Javascript language:
// Register your data source to prompt manager
planner.prompts.addDataSource(new MyDataSource());
For Python language:
planner.prompts.add_data_source(MyDataSource())
Create prompts/qa/skprompt.txt for prompt template text.

The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly to answer user's question.

Base your answer off the text below:
Create prompts/qa/config.json to connect with the data source.

{
    "schema": 1.1,
    "description": "Chat with QA Assistant",
    "type": "completion",
    "completion": {
        "model": "gpt-35-turbo",
        "completion_type": "chat",
        "include_history": true,
        "include_input": true,
        "max_input_tokens": 2800,
        "max_tokens": 1000,
        "temperature": 0.9,
        "top_p": 0.0,
        "presence_penalty": 0.6,
        "frequency_penalty": 0.0,
        "stop_sequences": []
    },
    "augmentation": {
        "data_sources": {
            "my-datasource": 1200
        }
    }
}
back to top

Choose Between Data Sources
In the Chat With Your Data or RAG scenarios, Teams Toolkit has provided four different types of data source.

Customize allows you to fully control the data ingestion, see the sample on Build your own Data Ingestion to build your own vector index, and use it as data source. There are other alternatives, e.g., Azure Cosmos DB Vector Database Extension or Azure PostgreSQL Server pgvector Extension as vector databases, or Bing Web Search API to get latest web content. You may implement any DataSource instance to connect with your own data source.

Azure AI Search provides a sample to add your documents to Azure AI Search Service, then use the search index as data source.

Custom API allows your chatbot can invoke the API defined in the OpenAPI description document to retrieve domain data from API service.

Microsoft Graph & SharePoint provides a sample to use M365 content from Microsoft Graph Search API as data source.

back to top

Build your own Data Ingestion
This doc showcases a solution to fully control the data ingestion process, including:

Load your source documents - Besides text, if you have other types of documents, you may need to convert them to meaningful text, since the embedding model takes text as input.
Split into chunks - The embedding model has input token limitation, so you may need to split documents into chunks to avoid API call failure.
Call embedding model - Call the embedding model APIs to create embeddings for the given inputs.
Store embeddings - Store the created embeddings into a vector database, also including useful metadata and raw content for further referencing.
Sample Code
Here's a sample to create embeddings from source text document, and store into Azure AI Search Index:

For Javascript language:
For Python language:
back to top

Azure AI Search as Data Source
This doc showcases a solution to:

Add your document to Azure AI Search via Azure OpenAI Service
Use Azure AI Search index as data source in the RAG app
Data Ingestion
With Azure OpenAI on your data, you can ingest your knowledge documents to Azure AI Search Service and create a vector index. Then you can use the index as data source.

Prepare your data in Azure Blob Storage, or directly upload in later step
On Azure OpenAI Studio, add your data source AOAI Data Source
Fill fields to create a vector index AOAI Data Source Step
Note: this approach creates an end-to-end chat API to be called as AI model. But you can also just use the created index as data source, and use Teams AI library to customize the retrieval and prompt.

Data Source Implementation
After ingesting data into Azure AI Search, you can implement your own DataSource to retrieve data from search index.

For Javascript language:
For Python language:
back to top

Add more API for Custom API as data source
You can follow the following steps to extend the Custom Copilot from Custom API template with more APIs.

Update ./appPackage/apiSpecificationFile/openapi.*

Copy corresponding part of the API you want to add from your spec, and append to ./appPackage/apiSpecificationFile/openapi.*.

Update ./src/prompts/chat/actions.json

Fill necessary info and properties for path, query and/or body for the API in the following object, and add it in the array in ./src/prompts/chat/actions.json.

{
  "name": "${{YOUR-API-NAME}}",
  "description": "${{YOUR-API-DESCRIPTION}}",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "object",
        "properties": {
          "${{YOUR-PROPERTY-NAME}}": {
            "type": "${{YOUR-PROPERTY-TYPE}}",
            "description": "${{YOUR-PROPERTY-DESCRIPTION}}",
          }
          // You can add more query properties here
        }
      },
      "path": {
        // Same as query properties
      },
      "body": {
        // Same as query properties
      }
    }
  }
}
Update ./src/adaptiveCards

Create a new file with name ${{YOUR-API-NAME}}.json, and fill in the adaptive card for the API response of your API.

Update ./src/app/app.js

Add following code before module.exports = app;. Remember to replace necessary info.

app.ai.action(${{YOUR-API-NAME}}, async (context: TurnContext, state: ApplicationTurnState, parameter: any) => {
  const client = await api.getClient();
  
  const path = client.paths[${{YOUR-API-PATH}}];
  if (path && path.${{YOUR-API-METHOD}}) {
    const result = await path.${{YOUR-API-METHOD}}(parameter.path, parameter.body, {
      params: parameter.query,
    });
    const card = generateAdaptiveCard("../adaptiveCards/${{YOUR-API-NAME}}.json", result);
    await context.sendActivity({ attachments: [card] });
  } else {
    await context.sendActivity("no result");
  }
  return "result";
});
back to top

Microsoft 365 as Data Source
This doc showcases a solution to query M365 content from Microsoft Graph Search API as data source in the RAG app. To learn more about Microsoft Graph Search API, you can refer to Use the Microsoft Search API to search OneDrive and SharePoint content.

Prerequisite - You should create a Graph API client and grant it the Files.Read.All permission scope to access SharePoint and OneDrive files, folders, pages, and news.

Data Ingestion
Microsoft Graph Search API is available for searching SharePoint content, thus you just need to ensure your document is uploaded to SharePoint / OneDrive, no extra data ingestion required.

Note: SharePoint Server indexes a file only if its file extension is listed on the Manage File Types page. For a complete list of supported file extensions, refer to the Default crawled file name extensions and parsed file types in SharePoint Server and SharePoint in Microsoft 365.

Data Source Implementation
The following is an example of search txt files in SharePoint and OneDrive.

import {
  DataSource,
  Memory,
  RenderedPromptSection,
  Tokenizer,
} from "@microsoft/teams-ai";
import { TurnContext } from "botbuilder";
import { Client, ResponseType } from "@microsoft/microsoft-graph-client";

export class GraphApiSearchDataSource implements DataSource {
  public readonly name = "my-datasource";
  public readonly description =
    "Searches the graph for documents related to the input";
  public client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async renderData(
    context: TurnContext,
    memory: Memory,
    tokenizer: Tokenizer,
    maxTokens: number
  ): Promise<RenderedPromptSection<string>> {
    const input = memory.getValue("temp.input") as string;
    const contentResults = [];
    const response = await this.client.api("/search/query").post({
      requests: [
        {
          entityTypes: ["driveItem"],
          query: {
            // Search for markdown files in the user's OneDrive and SharePoint
            // The supported file types are listed here:
            // https://learn.microsoft.com/sharepoint/technical-reference/default-crawled-file-name-extensions-and-parsed-file-types
            queryString: `${input} filetype:txt`,
          },
          // This parameter is required only when searching with application permissions
          // https://learn.microsoft.com/graph/search-concept-searchall
          // region: "US",
        },
      ],
    });
    for (const value of response?.value ?? []) {
      for (const hitsContainer of value?.hitsContainers ?? []) {
        contentResults.push(...(hitsContainer?.hits ?? []));
      }
    }

    // Add documents until you run out of tokens
    let length = 0,
      output = "";
    for (const result of contentResults) {
      const rawContent = await this.downloadSharepointFile(
        result.resource.webUrl
      );
      if (!rawContent) {
        continue;
      }
      let doc = `${rawContent}\n\n`;
      let docLength = tokenizer.encode(doc).length;
      const remainingTokens = maxTokens - (length + docLength);
      if (remainingTokens <= 0) {
        break;
      }

      // Append do to output
      output += doc;
      length += docLength;
    }
    return { output, length, tooLong: length > maxTokens };
  }

  // Download the file from SharePoint
  // https://docs.microsoft.com/en-us/graph/api/driveitem-get-content
  private async downloadSharepointFile(
    contentUrl: string
  ): Promise<string | undefined> {
    const encodedUrl = this.encodeSharepointContentUrl(contentUrl);
    const fileContentResponse = await this.client
      .api(`/shares/${encodedUrl}/driveItem/content`)
      .responseType(ResponseType.TEXT)
      .get();

    return fileContentResponse;
  }

  private encodeSharepointContentUrl(webUrl: string): string {
    const byteData = Buffer.from(webUrl, "utf-8");
    const base64String = byteData.toString("base64");
    return (
      "u!" + base64String.replace("=", "").replace("/", "_").replace("+", "_")
    );
  }
}