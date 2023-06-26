---
title: Debug for mobile
author: surbhigupta 
description: In this module, learn how to debug your Teams app in mobile clients.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 06/14/2023
---

# Debug for mobile

When you're building a Microsoft Teams app that includes tab, bot, or message extension, you must debug your app to know how the app functions on both Android and iOS Microsoft Teams mobile clients. For more information, see [Debug your Teams app locally](debug-local.md).

## Debug your tab app

To debug your tab app follow these steps:

# [Visual Studio Code](#tab/vscode)

You can view the project folders and files under **Explorer** in the Visual Studio Code after debugging.

1. Add `Start local tunnel` after `Validate prerequisites` in the `task.json` file to make the tab app accessible on the mobile client.
1. Add the following code after the property `dependsOrder` in the `task.json` file.

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

> [!NOTE]
>
> * To preview the tab app only in mobile client, set the value for `access` property to `private`.
> * To preview the tab app on the mobile client and debug it on web clients, set the `access` property to `public`. Any user with the app's URL can visit the tab.

3. Remove the `TAB_DOMAIN` and `TAB_ENDPOINT` from the `teamsapp.local.yml` file.

```javascript
 - uses: script 
   with:
     run:
       echo "::set-teamsfx-env TAB_DOMAIN=localhost:53000";
       echo "::set-teamsfx-env TAB_ENDPOINT=https://localhost:53000";
```

4. If you're using React, add the configuration `WDS_SOCKET_PORT=0` in `teamsapp.local.yml` file to activate hot reloading while debugging in react after utilizing the tunnel service.

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
1. Run the command `ngrok http https://localhost:53000 --authtoken=<your-personal-ngrok-authtoken>` to start the local tunnel service.
1. Fill the values for `TAB_DOMAIN` and `TAB_ENDPOINT` in the `env/.env.local` file:

```json
 TAB_DOMAIN=sample-ngrok-id.ngrok.io 
 TAB_ENDPOINT=https://sample-ngrok-id.ngrok.io
```

4. Execute the command `teamsfx provision --env local` in your project directory.
5. Execute the command `teamsfx deploy --env local` in your project directory.
6. Execute the command `teamsfx preview --env local` in your project directory.

---

2. Select **Add** when prompted to sideload the app onto Teams.

:::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/remote-app-client.png" alt-text="The screenshot showing an app being installed.":::

> [!NOTE]
> When the dev tunnel access value is set to `private`, the tab app cannot be displayed within an iframe on the web client. The login page is hosted on "login.microsoftonline.com", which has the `X-FRAME-Options` header set to DENY.
> To preview the tab app on the mobile client and debug it on web clients, set the access value to `public`. Any user with the app's URL can visit the tab.

:::image type="content" source="../assets/images/debug-mobile/login.PNG" alt-text="The screenshot shows the login page.":::

## Test your tab app on mobile client

1. Open Teams on your mobile device and select **More** to find the previewing app.

:::image type="content" source="../assets/images/debug-mobile/debug-mobile.PNG" alt-text="The screenshot showing an app being installed in mobile clients.":::

> [!NOTE]
> If a you have debugged the app previously, it's recommended to clear the cache on the mobile device to ensure immediate app synchronization. After clearing the cache, the app takes some time to sync.

# [iOS](#tab/ios1)

To clear the Teams app data, go to **Settings** > **Teams** > **Clear App Data**.

:::image type="content" source="../assets/images/debug-mobile/clear-app-data-ios.PNG" alt-text="The screenshot showing to clean the app data in iOS mobile client.":::

# [Android](#tab/android1)

To clear the Teams app data, go to **Teams** > **Settings** > **Data and storage** > **Clear app data** > **Clear data**.

:::image type="content" source="../assets/images/debug-mobile/clear-app-data-android.PNG" alt-text="The screenshot showing to clean the app data in android mobile client.":::

---

2. If you're accessing the dev tunnel for the first time, Sign in to Microsoft 365 account and select **continue**.

:::image type="content" source="../assets/images/debug-mobile/m365-sign-in.PNG" alt-text="The screenshot showing the Microsoft 365 sign in page.":::

> [!NOTE]
> You need to login only once per device, and every time you install the app you need to confirm the anti-phishing page.

5. Your first mobile tab app is created.

:::image type="content" source="../assets/images/debug-mobile/mobile-tab-app.PNG" alt-text="The screenshot shows the mobile tab app.":::

6. For Android devices, use [DevTools](../tabs/how-to/developer-tools.md#access-devtools-from-an-android-device) to debug your tab while it's running.

## Test your bot app on mobile client

To test your bot in mobile client, follow the steps listed in [Test your tab app on mobile client](#test-your-tab-app-on-mobile-client) for your bot.

> [!NOTE]
> If a you have debugged the bot app previously and the Teams app manifest file is changed, it's recommended to clear the cache on the mobile device to ensure immediate app synchronization. After clearing the cache, the app takes some time to sync.

# [iOS](#tab/ios2)

To clear the Teams app data, go to **Settings** > **Teams** > **Clear App Data**.

:::image type="content" source="../assets/images/debug-mobile/iOS-mobile-bot.PNG" alt-text="The screenshot shows the bot app in iOS mobile client.":::

# [Android](#tab/android2)

To clear the Teams app data, go to **Teams** > **Settings** > **Data and storage** > **Clear app data** > **Clear data**.

:::image type="content" source="../assets/images/debug-mobile/clear-app-data-android.PNG" alt-text="The screenshot showing to clean the app data in android mobile client.":::

---

* Debug the bot app on your mobile client.

:::image type="content" source="../assets/images/debug-mobile/debug-bot-mobile.PNG" alt-text="The screenshot showing to debug the bot app in mobile client.":::
