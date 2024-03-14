## Developer mode for plugins for Copilot for Microsoft 365

You can enable developer mode on Microsoft 365 Chat in Teams. When the developer mode is enabled, a plugin debug info card is displayed for each search intent where search is triggered. The plugin debug info card contains the following information:

* **Enabled plugins**: A list of plugins enabled by users through plugin flyout.
* **Matched functions**: A list of plugins or plugin functions matched in the runtime app index lookup.
* **Selected functions for execution**: A list of plugin functions selected for invocation based on large language model (LLM) reasoning.  
* **Function execution details**: Request and response execution status executed by the plugins.

:::image type="content" source="../../assets/images/Copilot/plugin-developer-mode.png" alt-text="Screenshot shows the plugin debug info card and a table with enabled plugins, matched functions, selected functions for execution, and function execution details.":::

To enable developer mode in M365 chat in Teams, follow these steps:

1. Go to **Microsoft Teams**.
1. Go to **M365 Chat**.
1. In the message compose area, enter `-developer on`. M365 chat responds with a message **Successfully enabled developer mode**.
1. Select the search intent to see the plugin debug info card.

:::image type="content" source="../../assets/images/Copilot/m365-chat-developer-on.png" alt-text="Screenshot shows the developer on command in M365 chat.":::

### Troubleshooting execution failures

Here are some common failures you might encounter when debugging plugin execution, and possible causes:

* **No debug card**: If the orchestrator doesn't require the user's Microsoft 365 data or skills to respond to a prompt, no debug info card is returned. Any system failure results in an *I'm sorry* response from debug cards.

* **Empty debug card**: If no plugins are enabled or when the 3S the skill discovery service isn't triggered, debug info card returns empty.

* **Card with empty Matched functions**: If relevant plugins are enabled, yet no matched functions were returned for the given prompt, this likely indicates the prompt didn't explicitly mention the plugin name.

* **Card with empty Selected functions for execution**: If no enabled plugin matched the search intent of the prompt, the debug info card reports **No functions selected for execution**. This is likely because the command description in the manifest isn't semantically related to the search intent of the given prompt or that the data needed to fill in the parameters was not available in the conversation.

  If Copilot was previously matching and executing your plugin functions successfully, this could be an indication of throttling. In case of LLM throttling, the rate limit will be reset after one hour.

* **Card with empty or failed Function execution details**: For nonmessage extension plugins, if the function execution details or request status is empty or failed, it can be due to an error in defining URLs, or the API failed to return an error. If the failure is consistent, it's most likely due to unclear plugin or parameter descriptions, invalid host urls, or other problems with your OpenAPI description.

  For message extension plugins, best practice is to optimize for responses under two seconds. For more information, review the [technical requirements](/microsoftteams/platform/messaging-extensions/high-quality-message-extension?context=/microsoft-365-copilot/extensibility/context#technical-requirements) for message extension plugins.

* **Third-party API returns Response or Timeout Error**: If the **Function execution details** filed is reporting a *Response Status* of `0`, but *Request status* of `Success`, it might be an indication of timeout. Currently the timeout limit for Copilot execution of a plugin API is set at 10 seconds.
