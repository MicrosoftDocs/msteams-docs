# Quickstart: Create an agent and chat with it in Teams

In this quickstart, you'll use command-line developer tools to create a new agent. When you're finished, you'll have code for an agent that you can chat with in Teams while it's running in your local development environment. You'll be able to continue exploring and experimenting with this code, and as you add new features to it, you'll be able to experience them in Teams immediately.

## Prerequisites

This quickstart is divided into two sections. In the first, section you'll need:

- Node.js 20 or later ([installer download](https://nodejs.org))
- .NET 10 or later ([installer download](https://dotnet.microsoft.com/download))
- An editor, we suggest VS Code
- Teams, with a Microsoft 365 work or school account that has permissions to install custom Teams apps.

If you aren't sure about your account permissions, you will be able to confirm them during the quickstart before they are needed.

If you don't have a Microsoft 365 work or school account, see [Microsoft 365 Developer Program](/office/developer-program/microsoft-365-developer-program) for information about getting a developer sandbox subscription that you can use to try your app in Teams.

## Install tools, log in and confirm permissions

Install the Teams developer CLI and Microsoft 365 Agents Playground locally, and log in to the developer CLI.

```bash
npm install -g @microsoft/teams.cli @microsoft/m365agentsplayground
teams login
```

The CLI will confirm your login, your account's sideloading permissions, and check for the presence of an Azure CLI installation (not required for this quickstart).

```console
✔ Logged in as nw_m365_admin@8k4lpb.onmicrosoft.com TODO
✔ Sideloading: enabled

Azure CLI: installed, not logged in
```

**To continue with this quickstart, sideloading must be enabled.** If it is disabled, you will need your organization's Microsoft 365 administrator to enable it for your account. See [Allow users to upload custom apps](/microsoftteams/teams-custom-app-policies-and-settings#allow-users-to-upload-custom-apps) for administrator instructions for enabling this permission.

## Create code for an agent

1. Use `teams project new` to create the code for a new agent from a template.

    ```bash
    teams project new csharp echo-bot
    cd Echo.Bot/Echo.Bot
    ```

1. Start the agent. Once it's running, you'll see a confirmation that it's running on port 3978.

    ```bash
    dotnet run
    ```

1. Use <kbd>Ctrl+C</kbd> in the console window to stop your agent. Leave the console window open, you'll need it again soon.
