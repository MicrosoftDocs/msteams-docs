## Prerequisites

This quickstart is divided into two sections. In the first, section you'll need:

- Node.js 20 or later ([installer download](https://nodejs.org))
- An editor, we suggest VS Code TODO

In the second part, you'll also need Teams, with a Microsoft 365 work or school account that has permissions to install custom Teams apps.

If you don't have an account, or you aren't sure about your permissions, you can still begin. The quickstart will address those requirements when they're needed.

## Create code for an agent and try it in Microsoft 365 Agents Playground

1. Install the Teams developer CLI and Microsoft 365 Agents Playground locally.

    ```bash
    npm install -g @microsoft/teams.cli @microsoft/m365agentsplayground
    ```

1. Use `teams project new` to create the code for a new agent from a template and open it in Visual Studio Code.

    ```bash
    teams project new typescript echo-bot
    cd echo-bot
    code .
    ```

1. In Visual Studio Code, open `src/index.ts`. Find the line that reads `const app = new App();` and modify it to read:

    ```typescript
    const app = new App({ skipAuth: true });
    ```

    This is a temporary modification to enable Microsoft 365 Agents Playground to communicate with the agent.

1. Start the agent. Once it's running, you'll see a confirmation that it's available on port 3978.

    ```bash
    npm install
    npm run dev
    ```

3. In a new console window, start Microsoft 365 Agents Playground.

    ```bash
    agentsplayground
    ```

    This will connect Agents Playground to your agent and open the interface in a new browser tab.

4. Use the compose box to send your agent a message and see it respond in the chat. Your agent's up and running locally!

    :::image type="content" source="../../assets/images/agents-in-teams/agents-playground-interaction.png" alt-text="Screenshot of a short agent interaction in Microsoft 365 Agents Playground." lightbox="../../assets/images/agents-in-teams/agents-playground-interaction.png":::

5. Close the Agents Playground tab in your browser, and use <kbd>Ctrl+C</kbd> in both console windows to stop Agents Playground and your agent. Leave open the console window you used to create your agent, you'll need it again soon.

6. In Visual Studio Code, undo the modification you made in step 3. This will ensure a secure connection with Teams in the next steps.

## Log in and confirm permissions

> [!NOTE]
> The next part of this quickstart requires Teams, logged in to a Microsoft 365 work or school account with permissions to install custom Teams apps. This step will check for that permission.
>
>If you don't have a Microsoft 365 account, you can proceed to [Next steps](#next-steps) to continue working on your agent's code and complete the rest of this quickstart later. See [Microsoft 365 Developer Program](/office/developer-program/microsoft-365-developer-program) for information about getting a developer sandbox subscription that you can use to try your app in Teams.

Log in to your Microsoft 365 account from the Teams developer CLI.

```bash
teams login
```

The CLI will confirm your login, your account's sideloading permissions, and check for the presence of an Azure CLI installation (not required for this quickstart).

```console
✔ Logged in as nw_m365_admin@8k4lpb.onmicrosoft.com TODO
✔ Sideloading: enabled

Azure CLI: installed, not logged in
```

**To continue with this quickstart, sideloading must be enabled.** If it is disabled, you will need your organization's Microsoft 365 administrator to enable it for your account. See [Allow users to upload custom apps](/microsoftteams/teams-custom-app-policies-and-settings#allow-users-to-upload-custom-apps) for administrator instructions for enabling this permission. In the meantime, you can proceed [Next steps](#next-steps) to continue working on your agent's code.
