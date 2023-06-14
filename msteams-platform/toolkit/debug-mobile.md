---
title: Debug for mobile
author: surbhigupta 
description: In this module, learn how to debug your Teams app in mobile.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 06/14/2023
---

# Debug for mobile

When you are building a Microsoft Teams app that includes tab, bot, and message extension. You must test how your app functions on both Android and iOS Microsoft Teams mobile clients.

## Prerequisties

You need an existing Teams tab app to perform the debug for mobile. If you don't have a Teams tab app, create a tab app [Build your first tab app using JavaScript](../sbs-gs-javascript.yml).

# Test your tab app on mobile client

Debug your Teams app [Debug your Teams app locally](debug-local.md).

# [Visual Studio Code](#tab/vscode)

1. You can view the project folders and files under **Explorer** in the Visual Studio Code after debugging.
1. Add `Start local tunnel` task in `.vscode/task.json` file to make the tab app accessible on the mobile client.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Teams App Locally",
      "dependsOn": [
        "Validate prerequisites",
        "Start local tunnel", // Add this line
        "Provision",
        "Deploy",
        "Start application"
      ],
      "dependsOrder": "sequence"
    },
    {
      // Add this task
      "label": "Start local tunnel",
      "type": "teamsfx",
      "command": "debug-start-local-tunnel",
      "args": {
        "type": "dev-tunnel",
        "ports": [
          {
            "portNumber": 53000,
            "protocol": "https",
            "access": "private",
            "writeToEnvironmentFile": {
              "endpoint": "TAB_ENDPOINT",
              "domain": "TAB_DOMAIN"
            }
          }
        ],
        "env": "local"
      },
      "isBackground": true,
      "problemMatcher": "$teamsfx-local-tunnel-watch"
    }
  ]
}
```

1. To preview the tab app only on mobile client set the access to `private`.
1. To preview the tab app on the mobile client and debug it on web clients, set the access to `public`.

> [!NOTE]
> It's worth nothing that public access raises safety concerns since the tab app can be visited by anyone who knows the app's URL.

1. Remove the following action `TAB_DOMAIN` and `TAB_ENDPOINT` from `teamsapp.local.yml` file.

```javascript
 - uses: script 
   with:
     run:
       echo "::set-teamsfx-env TAB_DOMAIN=localhost:53000";
       echo "::set-teamsfx-env TAB_ENDPOINT=https://localhost:53000";
```

1. For React add task `WDS_SOCKET_PORT=0` in `teamsapp.local.yml` file to activate hot reloading while debugging in react after utilizing the tunnel service.

```javascript
  - uses: file/createOrUpdateEnvironmentFile
    with:
      target: ./.localConfigs
      envs:
        BROWSER: none
        HTTPS: true
        PORT: 53000
        SSL_CRT_FILE: ${{SSL_CRT_FILE}}
        SSL_KEY_FILE: ${{SSL_KEY_FILE}}
        REACT_APP_CLIENT_ID: ${{AAD_APP_CLIENT_ID}} 
        REACT_APP_START_LOGIN_PAGE_URL: ${{TAB_ENDPOINT}}/auth-start.html 
        WDS_SOCKET_PORT: 0 
```

## Run the deployed app

Once the provisioning and deployment steps are complete:

1. Open the debug panel (**Ctrl+Shift+D** / **⌘⇧-D** or **View > Run**) from Visual Studio Code.
1. Select **Launch Remote (Edge)** from the launch configuration dropdown.
1. Select the **Start debugging (F5)** to launch your app from Azure.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/launch-remote.png" alt-text="The screenshot showing how to launch the app remotely.":::

# [Command Line](#tab/cline)

1. Go to [ngrok](https://ngrok.com) and sign up for a free account or log into your existing account. After you've signed in, go to the [dashboard](https://dashboard.ngrok.com) and get your auth token.
1. Create a ngrok configuration file `ngrok.yml` and add the following line. For more information on where the file can be located, see [ngrok](https://ngrok.com/docs#config):

  `authtoken: <Your-AuthToken>`

1. Run the command `ngrok http https://localhost:53000 --authtoken=<your-personal-ngrok-authtoken>` to start the local tunnel service.
1. Fill the values for `TAB_DOMAIN` and `TAB_ENDPOINT` in the `env/.env.local` file:

```json
 TAB_DOMAIN=sample-ngrok-id.ngrok.io 
 TAB_ENDPOINT=https://sample-ngrok-id.ngrok.io
```

1. Execute the command `teamsfx provision --env local` in your project directory.
1. Execute  the command `teamsfx deploy --env local` in your project directory.
1. Execute  the command `teamsfx preview --env local` in your project directory.

---

1. Select **Add** when prompted to sideload the app onto Teams.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/remote-app-client.png" alt-text="The screenshot showing an app being installed.":::

> [!NOTE]
> When the dev tunnel access is set to `private`, the tab app cannot be displayed within an iframe on the web client. The login page is hosted on "login.microsoftonline.com", which has the `X-FRAME-Options` header set to DENY.
> To preview the tab app on the mobile client and debug it on web clients, set the access to `public`.
> It's worth nothing that public access raises safety concerns since the tab app can be visited by anyone who knows the app's URL.
