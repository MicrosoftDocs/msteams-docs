> [!NOTE]
>
> ## Add support for BizChat in your custom engine agent
   >
   > If you want your custom engine agent to support BizChat, you must use pre-release version of Teams Toolkit. After you install the pre release version, follow these steps:
   >
   > 1. Add the environment variable, `TEAMSFX_CEA_ENABLED=true`.
   > 2. [Set up your data on Azure OpenAI](/microsoftteams/platform/teams-ai-library-tutorial?tutorial-step=2)
   > 3. Perform the step 1. to step 4. from [create your custom engine agent](#create-a-new-custom-engine-agent-using-teams-toolkit) and ensure you select the **Basic AI Chatbot Works in Teams and Microsoft 365 Copilot** in Teams Toolkit. Continue with the rest of steps to create your custom engine agent.<br>
   >    :::image type="content" source="../msteams-platform/assets/images/Copilot/basic-ai-chat.png" alt-text="Screenshot shows the basic AI chatbot in Teams Toolkit."::: <br>
   > 4. [Configure your custom engine agent](#configure-and-debug-your-custom-engine-agent). Ensure you perform the following steps before your debug:
   >     * Ensure that the app manifest contains `copilotAgents` and its sub property `customEngineAgents`:
   >
   >        ```json
   >        "copilotAgents": { 
   >           "customEngineAgents": [ 
   >              { 
   >                 "type": "bot", 
   >                 "id": "<Bot-Id-Guid>" 
   >              } 
   >           ] 
   >           }
   >      
   >        ```
>
   >     * Ensure that the `scopes` is set as `Copilot`:
   >
   >        ```json
   >        "bots": [ 
   >           { 
   >              "botId": "<Bot-Id-Guid>", 
   >              "scopes": ["groupChat"], 
   >              "commandLists": [ 
   >                 { 
   >                 "scopes": ["Copilot"], 
   >                 "commands": [ 
   >                    { 
   >                       "title": "Sample prompt title", 
   >                       "description": "Description of sample prompt" 
   >                    } 
   >                 ] 
   >                 }, 
   >                 { 
   >                 "scopes": ["personal"], 
   >                 "commands": [ 
   >                    { 
   >                       "title": "Sample prompt title", 
   >                       "description": "Description of sample prompt" 
   >                    } 
   >                 ] 
   >                 } 
   >              ], 
   >           } 
   >           ], 
   >      
   >        ```
>
   >     * Remove the `validateManifest` and `validateAppPackage` from `teamsapp.local.yml` and `teamsapp.yml` file in your app.
