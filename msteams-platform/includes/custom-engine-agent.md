> [!NOTE]
>
> ## Add support for Microsoft 365 Copilot Chat in your custom engine agent
   >
   > If you want your custom engine agent to support Microsoft 365 Copilot Chat, you must [install a prerelease version of Teams Toolkit](../toolkit/install-Agents-Toolkit.md#install-a-prerelease-version). After you install the prerelease version, follow these steps:
   >
   > 1. Ensure that you enable **Fx-extension: Enable Custom Engine Agent** in Teams Toolkit.
   >
   >    :::image type="content" source="../assets/images/copilot-extension-vsc.png" alt-text="Screenshot shows how to enable custom engine agent extension in Teams Toolkit.":::
   >
   > 2. Perform the step 1. to step 4. from [create your custom engine agent](/microsoftteams/platform/teams-ai-library-tutorial?tutorial-step=2) and ensure you select the **Basic AI Chatbot Works in Teams and Microsoft 365 Copilot** for step 5. in Teams Toolkit. Continue with the rest of steps (step 6. to step 11.) to create your custom engine agent.<br>
   >    :::image type="content" source="../assets/images/Copilot/basic-ai-chat.png" alt-text="Screenshot shows the basic AI chatbot in Teams Toolkit.":::<br>
   > 3. [Configure your custom engine agent](/microsoftteams/platform/teams-ai-library-tutorial?tutorial-step=3). Ensure you perform the following steps before you debug:
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
   >     * Ensure that the `scopes` is set as `personal` for `bots` and `commandLists`:
   >
   >        ```json
   >        "bots": [ 
   >           { 
   >              "botId": "<Bot-Id-Guid>", 
   >              "scopes": [
   >                  "personal",
   >                  "team",
   >                  "groupChat"
   >              ],
   >              "commandLists": [ 
   >                 { 
   >                 "scopes": ["personal"], 
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
