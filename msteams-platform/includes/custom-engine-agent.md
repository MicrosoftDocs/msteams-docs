> [!NOTE]
>
> ## Add support for Microsoft 365 Copilot Chat in your custom engine agent
   >
   > If you want your custom engine agent to support Microsoft 365 Copilot Chat, you must install [Microsoft 365 Agents Toolkit] (../toolkit/install-Teams-Toolkit.md#install-agents-toolkit-for-visual-studio-code). After you install the Agents Toolkit, follow these steps:
   >
   > 1. Ensure that you enable **Fx-extension: Enable Custom Engine Agent** in Agents Toolkit.
   >
   >    :::image type="content" source="../assets/images/copilot-extension-vsc.png" alt-text="Screenshot shows how to enable custom engine agent extension in Microsoft 365 Agents Toolkit.":::
   >
   > 2. Perform step 1. to step 4. from [create your custom engine agent](/microsoftteams/platform/teams-ai-library-tutorial?tutorial-step=2) and ensure you select the **Basic AI Chatbot Works in Teams and Microsoft 365 Copilot** for step 5. in Agents Toolkit. Continue with the rest of steps (step 6. to step 11.) to create your custom engine agent.<br>
   >    :::image type="content" source="../assets/images/Copilot/basic-ai-chat.png" alt-text="Screenshot shows the basic AI chatbot in Agents Toolkit.":::<br>
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
   >     * Ensure that the `scopes` is set as `copilot` for `bots` and `commandLists`:
   >
   >        ```json
   >        "bots": [ 
   >           { 
   >              "botId": "<Bot-Id-Guid>", 
   >              "scopes": [
                     "personal",
   >                  "copilot",
   >                  "team",
   >                  "groupChat"
   >              ],
   >              "commandLists": [ 
   >                 { 
   >                 "scopes": ["personal", "copilot"], 
   >                 "commands": [ 
   >                    { 
   >                       "title": "Sample prompt title", 
   >                       "description": "Description of sample prompt" 
   >                    } 
   >                 ] 
   >                 }, 
   >                 { 
   >                 "scopes": ["personal","copilot"], 
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
