---
title: Build a RAG Bot in Teams
author: surbhigupta
description:  In this module, learn how to build RAG bot using Teams AI library.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: v-ganr
ms.date: 05/21/2024
---

# Build a RAG Bot in Teams

The most effective applications enabled by Large Language Models (LLMs) are the creation of sophisticated question-answering (Q&A) chatbots. These chatbots can respond to inquiries about specific source information using a technique known as Retrieval Augmented Generation (RAG)."

A typical RAG architecture has two main flows:

1. **Data Ingestion**: A pipeline for ingesting data from a source and indexing it. This usually happens offline.
1. **Retrieval and Generation**: The actual RAG chain, which takes the user query at run time and retrieves the relevant data from the index, then passes that to the model.

Microsoft Teams enables developers to build a conversational bot with RAG capability to create a powerful experience to maximize the productivity.

Microsoft Teams Toolkit provides a series of ready-to-use application templates in the chat with your data category. These templates combine the capabilities of Azure AI Search, Microsoft 365, SharePoint, and Custom API as different data sources, along with LLMs, to create a conversational search experience in Teams.

## Prerequisites

| Install | For using... |
| --- | --- |
| &nbsp; | &nbsp; |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or Python build environments. Use the latest version. |
| [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version.|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place.|
| [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's Generative Pretrained Transformer (GPT). If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|

## Create a new Basic AI Chatbot project

1. Open **Visual Studio Code**.
 
1. Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**

1. Select **Create a New App**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/create-new-app.png" alt-text="Screenshot shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Custom Copilot**.image

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/custom-copilot.png" alt-text="Screenshot shows the option to select custom Copilot as the new project to create.":::

1. Select **Chat With Your Data**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/chat-with-your-data.png" alt-text="Screenshot shows the option to select app features using AI library list.":::

1. Select **Customize**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/chat-with-data-customize.png" alt-text="Screenshot shows the option to select the data customization for loading.":::

1. Select **JavaScript**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/language-javascript.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Azure OpenAI**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/azure-openai.png" alt-text="Screenshot shows the option to select the LLM.":::

1. Based on your service selection, you can optionally enter the credentials to access OpenAI or Azure OpenAI. Select **Enter**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/azure-open-api-key-optional.png" alt-text="Screenshot shows the location to enter Azure open API key.":::

1. Select **Default folder**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/default-folder.png" alt-text="Screenshot shows the location app folder to save.":::

    To change the default location, follow these steps:

    1. Select **Browse**.
    1. Select the location for the project workspace.
    1. Select **Select Folder**.

1. Enter an application name for your app and then select the **Enter** key.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/application-name.png" alt-text="Screenshot shows the option to enter the suitable name.":::

   Now, you've successfully created your chat with your data project workspace.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/rag-project-output.png" alt-text="Screenshot shows the ai chatbot created and readme file is available.":::

1. Under **EXPLORER**, go to **env** > **.env.testtool.user** file.

1. Update the following details:
    Azure OpenAI key `SECRET_AZURE_OPENAI_API_KEY=<your-key>`
    Endpoint `AZURE_OPENAI_ENDPOINT=<your-endpoint>`
    Deployment name `AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment>`

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/env-testtool-user.png" alt-text="Screenshot shows the details updated in the env file.":::

1. Select **F5** or from the left pane, select **RUN and DEBUG** (Ctrl+Shift+D) and select **Debug in Test Tool (Preview)** from the dropdown list.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/debug-test-tool.png" alt-text="Screenshot shows the selection of debugging option from the list of options.":::

Test Tool opens the bot in a webpage.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/rag-final-output.png" alt-text="Screenshows the chat with your data final output." lightbox="../assets/images/teams-toolkit-v2/custom-copilot/rag-output.png":::

## Take a tour of the bot app source code

| Folder       | Contents                                            |
| - | - |
| `.vscode`    | Visual Studio Code files for debugging                          |
| `appPackage` | Templates for the Teams application manifest        |
| `env`        | Environment files                                   |
| `infra`      | Templates for provisioning Azure resources          |
| `src`        | The source code for the application                 |
|`src/index.js`| Sets up the bot app server.|
|`src/adapter.js`| Sets up the bot adapter.|
|`src/config.js`| Defines the environment variables.|
|`src/prompts/chat/skprompt.txt`| Defines the prompt.|
|`src/prompts/chat/config.json`| Configures the prompt.|
|`src/app/app.js`| Handles business logics for the RAG bot.|
|`src/app/myDataSource.js`| Defines the data source.|
|`src/data/*.md`| Raw text data sources.|
|`teamsapp.yml`|This is the main Teams Toolkit project file. The project file defines two primary things:  Properties and configuration Stage definitions. |
|`teamsapp.local.yml`|This overrides `teamsapp.yml` with actions that enable local execution and debugging.|
|`teamsapp.testtool.yml`| This overrides `teamsapp.yml` with actions that enable local execution and debugging in Teams App Test Tool.|

## RAG scenarios for Teams AI

Teams AI library doesn't provide vector database implementation, so you need to add your own logic for further processing the created embeddings.

In AI context, vector databases are widely used as RAG storages, which store embeddings data and provide vector-similarity search. Teams-AI library provides utilities to help create embeddings for the given inputs.

# [JavaScript](#tab/javascript)

```javascript
// create OpenAIEmbeddings instance
const model = new OpenAIEmbeddings({ ... endpoint, apikey, model, ... });

// create embeddings for the given inputs
const embeddings = await model.createEmbeddings(model, inputs);

// your own logic to process embeddings
```
# [Python](#tab/python)

```python
# create OpenAIEmbeddings instance
model = OpenAIEmbeddings(OpenAIEmbeddingsOptions(api_key, model))

# create embeddings for the given inputs
embeddings = await model.create_embeddings(inputs)

# your own logic to process embeddings
```
---

:::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/teams-ai-rag-scenario.png" alt-text="Screenshot shows the RAG scenario.":::

Teams AI library also provides functionalities to ease each step of the retrieval and generation process.

1. **Handle Input**: The most straight forward way is to pass user's input as is to retrieval. However, if you'd like to customize the input before retrieval, you can add activity handler to certain incoming activities.

1. **Retrieve data source**: Teams-AI library provides DataSource interface to let you add your own retrieval logic. You need to create your own DataSource instance, and the library calls it on demand.

    # [JavaScript](#tab/javascript1)
    
    ```javascript
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
      ```
    # [Python](#tab/python1)
    
      ```python
      class MyDataSource(DataSource):
        def __init__(self):
          self.name = "my_datasource_name"
        
        def name(self):
          return self.name
      
        async def render_data(self, _context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: int):
          # your render data logic
      ```
    ---

1. **Call AI with prompt**: In the Teams AI prompt system, you can easily inject a data source by adjusting the augmentation.data_sources configuration section. This connects the prompt with the DataSource added in the previous step, and the library orchestrator to inject the data source text into the final prompt. For more information, See [AuthorPrompt](https://github.com/OfficeDev/TeamsFx/wiki/). For example, in the prompt's 'config.json' file.

    ```json
    {
        "schema": 1.1,
        ...
        "augmentation": {
            "data_sources": {
                "my-datasource": 1200
            }
        }
    }
    ```

1. **Build response**: By default, Teams-AI library replies the AI generated response as text message to user. If you'd like to customize the response, you can override the default SAY action (see [AI Actions](https://github.com/OfficeDev/TeamsFx/wiki/)) or explicitly call AI model (see [AI Models](https://github.com/OfficeDev/TeamsFx/wiki/)) to build your own replies, for example, with adaptive cards.

Here's a minimal set of implementations to add RAG to your app. In general, it implements DataSource to inject your own knowledge into prompt, so that AI can generate response based on the knowledge.

* Create myDataSource.ts to implement `DataSource` interface.

    ```typescript
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
    ```

* Register the data source in `app.ts`,

    # [JavaScript](#tab/javascript2)
    
    ```javascript
    // Register your data source to prompt manager
    planner.prompts.addDataSource(new MyDataSource());
    ```
    # [Python](#tab/python2)
    
    ```python
    planner.prompts.add_data_source(MyDataSource())
    ```
    ---

* Create `prompts/qa/skprompt.txt` for prompt template text.

    ```
    The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly to answer user's question.
    
    Base your answer off the text below:
    
    ```

* Create `prompts/qa/config.json` to connect with the data source.

    ```json
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
    ```

## Choose Between Data Sources

 * Customize allows you to fully control the data ingestion, see the sample on Build your own Data Ingestion to build your own vector index, and use it as data source. There are other alternatives, for example, Azure Cosmos DB Vector Database Extension or Azure PostgreSQL Server vector Extension as vector databases, or Bing Web Search API to get latest web content. You might implement any DataSource instance to connect with your own data source.

 * Azure AI Search provides a sample to add your documents to Azure AI Search Service, then use the search index as data source.

 * Custom API allows your chatbot can invoke the API defined in the OpenAPI description document to retrieve domain data from API service.

 * Microsoft Graph and SharePoint provides a sample to use Microsoft 365 content from Microsoft Graph Search API as data source.

## Build your own Data Ingestion

Data ingestion process is as follows:

 1. **Load your source documents**: Besides text, if you have other types of documents, you might need to convert them to meaningful text, since the embedding model takes text as input.
 1. **Split into chunks**: The embedding model has an input token limitation, so you might need to split documents into chunks to avoid API call failures.
 1. **Call embedding model**: Call the embedding model APIs to create embeddings for the given inputs.
 1. **Store embeddings**: Store the created embeddings into a vector database, also including useful metadata and raw content for further referencing.

## Sample code

# [JavaScript](#tab/javascript2)

* `loader.ts`: Plain text as source input.

    ```javascript
    import * as fs from "node:fs";
    
    export function loadTextFile(path: string): string {
      return fs.readFileSync(path, "utf-8");
    }
    ```

* `splitter.ts`: Split text into chunks, with certain overlap.
    
    ```javascript
    
    // split words by delimiters.
    const delimiters = [" ", "\t", "\r", "\n"];
    
    export function split(content: string, length: number, overlap: number): Array<string> {
      const results = new Array<string>();
      let cursor = 0, curChunk = 0;
      results.push("");
      while(cursor < content.length) {
        const curChar = content[cursor];
        if (delimiters.includes(curChar)) {
          // check chunk length
          while (curChunk < results.length && results[curChunk].length >= length) {
            curChunk ++;
          }
          for (let i = curChunk; i < results.length; i++) {
            results[i] += curChar;
          }
          if (results[results.length - 1].length >= length - overlap) {
            results.push("");
          }
        } else {
          // append
          for (let i = curChunk; i < results.length; i++) {
            results[i] += curChar;
          }
        }
        cursor ++;
      }
      while (curChunk < results.length - 1) {
        results.pop();
      }
      return results;
    }
    
    ```

* `embeddings.ts`: Use Teams AI library OpenAIEmbeddings to create embeddings.

    ```javascript
    import { OpenAIEmbeddings } from "@microsoft/teams-ai";
    
    const embeddingClient = new OpenAIEmbeddings({
      azureApiKey: "<your-aoai-key>",
      azureEndpoint: "<your-aoai-endpoint>",
      azureDeployment: "<your-embedding-deployment, e.g., text-embedding-ada-002>"
    });
    
    export async function createEmbeddings(content: string): Promise<number[]> {
      const response = await embeddingClient.createEmbeddings(content);
      return response.output[0];
    }
    ```

* `searchIndex.ts`: One-time and standalone method to create Azure AI Search Index.

    ```javascript
    import { SearchIndexClient, AzureKeyCredential, SearchIndex } from "@azure/search-documents";
    
    const endpoint = "<your-search-endpoint>";
    const apiKey = "<your-search-key>";
    const indexName = "<your-index-name>";
    
    const indexDef: SearchIndex = {
      name: indexName,
      fields: [
        {
          type: "Edm.String",
          name: "id",
          key: true,
        },
        {
          type: "Edm.String",
          name: "content",
          searchable: true,
        },
        {
          type: "Edm.String",
          name: "filepath",
          searchable: true,
          filterable: true,
        },
        {
          type: "Collection(Edm.Single)",
          name: "contentVector",
          searchable: true,
          vectorSearchDimensions: 1536,
          vectorSearchProfileName: "default"
        }
      ],
      vectorSearch: {
        algorithms: [{
          name: "default",
          kind: "hnsw"
        }],
        profiles: [{
          name: "default",
          algorithmConfigurationName: "default"
        }]
      },
      semanticSearch: {
        defaultConfigurationName: "default",
        configurations: [{
          name: "default",
          prioritizedFields: {
            contentFields: [{
              name: "content"
            }]
          }
        }]
      }
    };
    
    export async function createNewIndex(): Promise<void> {
      const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
      await client.createIndex(indexDef);
    }
    ```

* `searchIndexer.ts`: Upload created embeddings and other fields to Azure AI Search Index.

    ```javascript
    import { AzureKeyCredential, SearchClient } from "@azure/search-documents";
    
    export interface Doc {
      id: string,
      content: string,
      filepath: string,
      contentVector: number[]
    }
    
    const endpoint = "<your-search-endpoint>";
    const apiKey = "<your-search-key>";
    const indexName = "<your-index-name>";
    const searchClient: SearchClient<Doc> = new SearchClient<Doc>(endpoint, indexName, new AzureKeyCredential(apiKey));
    
    export async function indexDoc(doc: Doc): Promise<boolean> {
      const response = await searchClient.mergeOrUploadDocuments([doc]);
      return response.results.every((result) => result.succeeded);
    }
    ```

* `index.ts`: Orchestrate above components.

    ```javascript
    import { createEmbeddings } from "./embeddings";
    import { loadTextFile } from "./loader";
    import { createNewIndex } from "./searchIndex";
    import { indexDoc } from "./searchIndexer";
    import { split } from "./splitter";
    
    async function main() {
      // Only need to call once
      await createNewIndex();
    
      // local files as source input
      const files = [`${__dirname}/data/A.md`, `${__dirname}/data/A.md`];
      for (const file of files) {
        // load file
        const fullContent = loadTextFile(file);
    
        // split into chunks
        const contents = split(fullContent, 1000, 100);
        let partIndex = 0;
        for (const content of contents) {
          partIndex ++;
          // create embeddings
          const embeddings = await createEmbeddings(content);
    
          // upload to index
          await indexDoc({
            id: `${file.replace(/[^a-z0-9]/ig, "")}___${partIndex}`,
            content: content,
            filepath: file,
            contentVector: embeddings,
          });
        }
      }
    }
    
    main().then().finally();
    ```

# [Python](#tab/python2)

* `loader.py`: Plain text as source input.

    ```python
    def load_text_file(path: str) -> str:
        with open(path, 'r', encoding='utf-8') as file:
            return file.read()
    ```

* `splitter.py`: Split text into chunks, with certain overlap.

    ```python
    def split(content: str, length: int, overlap: int) -> list[str]:
        delimiters = [" ", "\t", "\r", "\n"]
        results = [""]
        cursor = 0
        cur_chunk = 0
        while cursor < len(content):
            cur_char = content[cursor]
            if cur_char in delimiters:
                while cur_chunk < len(results) and len(results[cur_chunk]) >= length:
                    cur_chunk += 1
                for i in range(cur_chunk, len(results)):
                    results[i] += cur_char
                if len(results[-1]) >= length - overlap:
                    results.append("")
            else:
                for i in range(cur_chunk, len(results)):
                    results[i] += cur_char
            cursor += 1
        while cur_chunk < len(results) - 1:
            results.pop()
        return results
    ```

* `embeddings.py`: Use Teams AI library OpenAIEmbeddings to create embeddings.

    ```python
    async def create_embeddings(text: str, embeddings):
        result = await embeddings.create_embeddings(text)
        
        return result.output[0]
    ```

* `search_index.py`: One-time and standalone method to create Azure AI Search Index.

    ```python
    async def create_index_if_not_exists(client: SearchIndexClient, name: str):
        doc_index = SearchIndex(
            name=name,
            fields = [
                SimpleField(name="docId", type=SearchFieldDataType.String, key=True),
                SimpleField(name="docTitle", type=SearchFieldDataType.String),
                SearchableField(name="description", type=SearchFieldDataType.String, searchable=True),
                SearchField(name="descriptionVector", type=SearchFieldDataType.Collection(SearchFieldDataType.Single), searchable=True, vector_search_dimensions=1536, vector_search_profile_name='my-vector-config'),
            ],
            scoring_profiles=[],
            cors_options=CorsOptions(allowed_origins=["*"]),
            vector_search = VectorSearch(
                profiles=[VectorSearchProfile(name="my-vector-config", algorithm_configuration_name="my-algorithms-config")],
                algorithms=[HnswAlgorithmConfiguration(name="my-algorithms-config")],
            )
        )
    
        client.create_or_update_index(doc_index)
    ```

* `search_indexer.py`: Upload created embeddings and other fields to Azure AI Search Index.

    ```python
    from embeddings import create_embeddings
    from search_index import create_index_if_not_exists
    from loader import load_text_file
    from split import split
    
    async def get_doc_data(embeddings):
        file_path=f'{os.getcwd()}/my_file_path_1'
        raw_description1 = split(load_text_file(file_path), 1000, 100)
        doc1 = {
            "docId": "1",
            "docTitle": "my_titile_1",
            "description": raw_description1,
            "descriptionVector": await create_embeddings(raw_description1, embeddings=embeddings),
        }
        
        file_path=f'{os.getcwd()}/my_file_path_2'
        raw_description2 = split(load_text_file(file_path), 1000, 100)
        doc2 = {
            "docId": "2",
            "docTitle": "my_titile_2",
            "description": raw_description2,
            "descriptionVector": await create_embeddings(raw_description2, embeddings=embeddings),
        }
    
        return [doc1, doc2]
    
    async def setup(search_api_key, search_api_endpoint):
        index = 'my_index_name'
        credentials = AzureKeyCredential(search_api_key)
        search_index_client = SearchIndexClient(search_api_endpoint, credentials)
        await create_index_if_not_exists(search_index_client, index)
    
        search_client = SearchClient(search_api_endpoint, index, credentials)
        embeddings=AzureOpenAIEmbeddings(AzureOpenAIEmbeddingsOptions(
              azure_api_key="<your-aoai-key>",
              azure_endpoint="<your-aoai-endpoint>",
              azure_deployment="<your-embedding-deployment, e.g., text-embedding-ada-002>"
        ))
        data = await get_doc_data(embeddings=embeddings)
        await search_client.merge_or_upload_documents(data)
    ```
* `index.py`: Orchestrate above components.

    ```python
    from search_indexer import setup
    
    search_api_key = '<your-key>'
    search_api_endpoint = '<your-endpoint>'
    asyncio.run(setup(search_api_key, search_api_endpoint))
    ```

---

## Azure AI Search as Data Source

This doc showcases a solution to:

* Add your document to Azure AI Search through Azure OpenAI Service.
* Use Azure AI Search index as data source in the RAG app.

### Data Ingestion

With Azure OpenAI on your data, you can ingest your knowledge documents to Azure AI Search Service and create a vector index. Then you can use the index as data source.

1. Prepare your data in Azure Blob Storage, or directly upload in later step on Azure OpenAI Studio, add your data source.

   :::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/assistant-set-up.png" alt-text="Screenshot shows to do assistant setup in Azure OpenAI Studio.":::

1. Fill fields to create a vector index.

:::image type="content" source="../assets/images/teams-toolkit-v2/custom-copilot/add-data.png" alt-text="Screenshot shows the option to add data source.":::

### Data Source

After ingesting data into Azure AI Search, you can implement your own DataSource to retrieve data from search index.

# [JavaScript](#tab/javascript3)

```javascript

import { AzureKeyCredential, SearchClient } from "@azure/search-documents";
import { DataSource, Memory, OpenAIEmbeddings, RenderedPromptSection, Tokenizer } from "@microsoft/teams-ai";
import { TurnContext } from "botbuilder";

export interface Doc {
  id: string,
  content: string, // searchable
  filepath: string,
  // contentVector: number[] // vector field
  // ... other fields
}

// Azure OpenAI configuration
const aoaiEndpoint = "<your-aoai-endpoint>";
const aoaiApiKey = "<your-aoai-key>";
const aoaiDeployment = "<your-embedding-deployment, e.g., text-embedding-ada-002>";

// Azure AI Search configuration
const searchEndpoint = "<your-search-endpoint>";
const searchApiKey = "<your-search-apikey>";
const searchIndexName = "<your-index-name>";

export class MyDataSource implements DataSource {
  public readonly name = "my-datasource";
  private readonly embeddingClient: OpenAIEmbeddings;
  private readonly searchClient: SearchClient<Doc>;

  constructor() {
    this.embeddingClient = new OpenAIEmbeddings({
      azureEndpoint: aoaiEndpoint,
      azureApiKey: aoaiApiKey,
      azureDeployment: aoaiDeployment
    });
    this.searchClient = new SearchClient<Doc>(searchEndpoint, searchIndexName, new AzureKeyCredential(searchApiKey));
  }

  public async renderData(context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>> {
    // use user input as query
    const input = memory.getValue("temp.input") as string;

    // generate embeddings
    const embeddings = (await this.embeddingClient.createEmbeddings(input)).output[0];

    // query Azure AI Search
    const response = await this.searchClient.search(input, {
      select: [ "id", "content", "filepath" ],
      searchFields: ["rawContent"],
      vectorSearchOptions: {
        queries: [{
          kind: "vector",
          fields: [ "contentVector" ],
          vector: embeddings,
          kNearestNeighborsCount: 3
        }]
      }
      queryType: "semantic",
      top: 3,
      semanticSearchOptions: {
        // your semantic configuration name
        configurationName: "default",
      }
    });

    // Add documents until you run out of tokens
    let length = 0, output = '';
    for await (const result of response.results) {
      // Start a new doc
      let doc = `${result.document.content}\n\n`;
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
}

```
# [Python](#tab/python3)

```python
async def get_embedding_vector(text: str):
    embeddings = AzureOpenAIEmbeddings(AzureOpenAIEmbeddingsOptions(
        azure_api_key='<your-aoai-key>',
        azure_endpoint='<your-aoai-endpoint>',
        azure_deployment='<your-aoai-embedding-deployment>'
    ))
    
    result = await embeddings.create_embeddings(text)
    if (result.status != 'success' or not result.output):
        raise Exception(f"Failed to generate embeddings for description: {text}")
    
    return result.output[0]

@dataclass
class Doc:
    docId: Optional[str] = None
    docTitle: Optional[str] = None
    description: Optional[str] = None
    descriptionVector: Optional[List[float]] = None

@dataclass
class MyDataSourceOptions:
    name: str
    indexName: str
    azureAISearchApiKey: str
    azureAISearchEndpoint: str

from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
import json

@dataclass
class Result:
    def __init__(self, output, length, too_long):
        self.output = output
        self.length = length
        self.too_long = too_long

class MyDataSource(DataSource):
    def __init__(self, options: MyDataSourceOptions):
        self.name = options.name
        self.options = options
        self.searchClient = SearchClient(
            options.azureAISearchEndpoint,
            options.indexName,
            AzureKeyCredential(options.azureAISearchApiKey)
        )
        
    def name(self):
        return self.name

    async def render_data(self, _context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: int):
        query = memory.get('temp.input')
        embedding = await get_embedding_vector(query)
        vector_query = VectorizedQuery(vector=embedding, k_nearest_neighbors=2, fields="descriptionVector")

        if not query:
            return Result('', 0, False)

        selectedFields = [
            'docTitle',
            'description',
            'descriptionVector',
        ]

        searchResults = self.searchClient.search(
            search_text=query,
            select=selectedFields,
            vector_queries=[vector_query],
        )

        if not searchResults:
            return Result('', 0, False)

        usedTokens = 0
        doc = ''
        for result in searchResults:
            tokens = len(tokenizer.encode(json.dumps(result["description"])))

            if usedTokens + tokens > maxTokens:
                break

            doc += json.dumps(result["description"])
            usedTokens += tokens

        return Result(doc, usedTokens, usedTokens > maxTokens)
```
---

## Add more API for Custom API as data source

You can follow the following steps to extend the Custom Copilot from Custom API template with more APIs.

1. Update `./appPackage/apiSpecificationFile/openapi.*`

Copy corresponding part of the API you want to add from your spec, and append to `./appPackage/apiSpecificationFile/openapi.*`.

1. Update `./src/prompts/chat/actions.json`

Fill necessary info and properties for path, query and/or body for the API in the following object, and add it in the array in `./src/prompts/chat/actions.json`.

```json

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

```

1. Update `./src/adaptiveCards`

Create a new file with name `${{YOUR-API-NAME}}.json`, and fill in the adaptive card for the API response of your API.

1. Update `./src/app/app.js`

   Add following code before module.exports = app;

```javascript

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

```

## Microsoft 365 as Data Source

This doc showcases a solution to query Microsoft 365 content from Microsoft Graph Search API as data source in the RAG app. To learn more about Microsoft Graph Search API, you can refer to Use the Microsoft Search API to search OneDrive and SharePoint content.

Prerequisite - You should create a Graph API client and grant it the Files.Read.All permission scope to access SharePoint and OneDrive files, folders, pages, and news.

### Data Ingestion

The Microsoft Graph Search API, which can search SharePoint content, is available. Therefore, you only need to ensure your document is uploaded to SharePoint or OneDrive, with no extra data ingestion required.

Note: SharePoint Server indexes a file only if its file extension is listed on the Manage File Types page. For a complete list of supported file extensions, refer to the Default crawled file name extensions and parsed file types in SharePoint Server and SharePoint in Microsoft 365.

### Data Source Implementation

An example of searching for txt files in SharePoint and OneDrive as follows:

```
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

```

## See also

[Teams AI library](../bots/how-to/Teams%20conversational%20AI/teams-conversation-ai-overview.md)