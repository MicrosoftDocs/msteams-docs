## Prerequisites

- Node.js 24 or later ([installer download](https://nodejs.org))
- .NET 10 or later ([installer download](https://dotnet.microsoft.com/download))
- Teams, with a Microsoft 365 work or school account that has permissions to install custom Teams apps (you'll confirm these permissions at the very beginning of the quickstart)

If you don't have a Microsoft 365 work or school account, see [Microsoft 365 Developer Program](/office/developer-program/microsoft-365-developer-program) for information about getting a developer sandbox subscription that you can use to try your app in Teams.

## Install tools, log in and confirm permissions

Install the Teams developer CLI and Microsoft 365 Agents Playground, then log in to the developer CLI.

```console
npm install -g @microsoft/teams.cli
teams login
```

The CLI will confirm your login, your account's permissions to install custom apps ("sideloading"), and check for the presence of an Azure CLI installation (not required for this quickstart).

```output
✔ Logged in as user@contoso.com
✔ Sideloading: enabled

Azure CLI: installed, not logged in
```

**To continue with this quickstart, sideloading must be enabled.** If it is disabled, you will need your organization's Microsoft 365 administrator to enable it for your account. See [Allow users to upload custom apps](/microsoftteams/teams-custom-app-policies-and-settings#allow-users-to-upload-custom-apps) for administrator instructions for enabling this permission.

## Create code for an agent

1. Use `teams project new` to create the code for a new agent from a template.

    ```console
    teams project new csharp EchoBot
    cd EchoBot/EchoBot
    ```

1. Start the agent to confirm it runs. Once it's running, you'll see a confirmation that it's running on port 3978.

    ```console
    dotnet run
    ```

1. Use <kbd>Ctrl+C</kbd> in the console window to stop your agent. Leave the console window open, you'll need it again soon.
