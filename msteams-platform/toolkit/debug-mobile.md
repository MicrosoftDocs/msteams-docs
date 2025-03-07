---
title: Debug Tab or Bot Apps in Mobile
author: surbhigupta 
description: Learn how to debug and test your Teams app with tab and bot capability on Android and iOS mobile clients in both Visual Studio Code and Command Line.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 02/06/2025
---

# Debug for mobile

When you're building a Microsoft Teams app that includes a tab, bot, or message extension, you must debug your app to know how the app functions on both Android and iOS Microsoft Teams mobile clients. For more information, see [debug your Teams app locally](debug-local.md).

See the following video to learn how to debug your Teams app in mobile clients:

> [!VIDEO 0137be57-10fc-4605-a47e-d7f6c6111600]

## Debug your tab app

To debug your tab app follow these steps:

# [Visual Studio Code](#tab/vscode)

You can view the project folders and files under **Explorer** in the Microsoft Visual Studio Code.

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
    > * When the dev tunnel access value is set to `private`, the tab app cannot be displayed within an iframe on the web client. The login page is hosted on **login.microsoftonline.com**, which has the `X-FRAME-Options` header set to DENY.
    > * To preview the tab app on the mobile client and debug it on web clients, set the access value to `public`. Any user with the app's URL can visit the tab.

2. Remove `TAB_DOMAIN` and `TAB_ENDPOINT` from the `teamsapp.local.yml` file.

    ```javascript
    - uses: script 
      with:
        run:
          echo "::set-teamsfx-env TAB_DOMAIN=localhost:53000";
          echo "::set-teamsfx-env TAB_ENDPOINT=https://localhost:53000";
    ```

3. If you're using React, add the configuration `WDS_SOCKET_PORT=0` in `teamsapp.local.yml` file to activate hot reloading while debugging in React after utilizing the tunnel service.

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

4. Run the deployed app

   1. Open the debug panel (**Ctrl+Shift+D** or **View > Run**) from Visual Studio Code.
   2. Select **Launch Remote in Teams (Edge)** from the launch configuration dropdown.
   3. Select the Start debugging (F5) button.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/launch-remote.png" alt-text="Screenshot shows how to launch the app remotely.":::

   4. Select **Add** to upload the custom app to Teams.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/remote-app-client.png" alt-text="Screenshot of the app details dialog to add the tab app to Teams.":::

   5. Select **Open**.

        :::image type="content" source="~/assets/images/teams-toolkit-v2/deploy-azure/add-scope-debug-mobile.png" alt-text="Screenshot of the scope selection dialog to open the app in personal scope.":::

        The app opens as a personal tab.

        :::image type="content" source="../assets/images/debug-mobile/login.PNG" alt-text="Screenshot shows the personal tab app page.":::

# [Command Line](#tab/cline)

1. Go to [ngrok](https://ngrok.com) and sign up for a free account or log into your existing account.
1. After you've signed in, from the left pane select [**Your Authtoken**](https://dashboard.ngrok.com).
1. Copy the value of your Authtoken.
1. Run the ngrok.exe file.
1. Run the command `ngrok http https://localhost:53000 --authtoken=<your-personal-ngrok-authtoken>` to start the local tunnel service.
1. In the `env/.env.local` file, update the values for `TAB_DOMAIN` and `TAB_ENDPOINT`.

    ```json
     TAB_DOMAIN=sample-ngrok-id.ngrok.io 
     TAB_ENDPOINT=https://sample-ngrok-id.ngrok.io
    ```

1. Run the following commands in your project directory:
   1. `teamsfx provision --env local`
   1. `teamsfx deploy --env local`
   1. `teamsfx preview --env local`

---

## Test your tab app on mobile client

1. To find the previewing app, open Teams on your mobile device and select **More**.

    :::image type="content" source="../assets/images/debug-mobile/mobile-more-option.PNG" alt-text="Screenshot shows the more option in Teams mobile client." lightbox="../assets/images/debug-mobile/debug-mobile.PNG":::

    > [!NOTE]
    > If you've debugged the app previously, we recommend that you clear the cache on the mobile device to ensure immediate app synchronization. After clearing the cache, the app takes some time to sync.

# [iOS](#tab/ios1)

To clear the Teams app data, go to **Settings** > **Teams** > **Clear App Data**.

:::image type="content" source="../assets/images/debug-mobile/clear-app-data-ios-option.PNG" alt-text="Screenshot shows how to clear the app data in iOS mobile client for tab." lightbox="../assets/images/debug-mobile/clear-app-data-ios.PNG":::

# [Android](#tab/android1)

To clear the Teams app data, go to **Teams** > **Settings** > **Data and storage** > **Clear app data** > **Clear data**.

:::image type="content" source="../assets/images/debug-mobile/clear-app-data-android-option.PNG" alt-text="Screenshot shows how to clear the app data in android mobile client for tab." lightbox="../assets/images/debug-mobile/clear-app-data-android.PNG":::

---

1. If you're accessing the dev tunnel for the first time, sign in to Microsoft 365 account and select **continue**.

    :::image type="content" source="../assets/images/debug-mobile/m365-sign-in.PNG" alt-text="Screenshot shows the Microsoft 365 sign in page.":::

    > [!NOTE]
    > You need to login only once per device, and every time you install the app you need to confirm the anti-phishing page.

1. Your first mobile tab app is created.

    :::image type="content" source="../assets/images/debug-mobile/mobile-tab-app.PNG" alt-text="Screenshot shows the mobile tab app.":::

1. For Android devices, use [DevTools](../tabs/how-to/developer-tools.md#access-devtools-from-teams-android-client) to debug your tab while it's running.

## Test your bot app on mobile client

1. To test your bot in mobile client, follow the steps listed in [Test your tab app on mobile client](#test-your-tab-app-on-mobile-client) for your bot.

    > [!NOTE]
    > If you've debugged the bot app previously and the app manifest (previously called Teams app manifest) file is changed, we recommend to clear the cache on the mobile device to ensure immediate app synchronization. After clearing the cache, the app takes some time to sync.

# [iOS](#tab/ios2)

To clear the Teams app data, go to **Settings** > **Teams** > **Clear App Data**.

:::image type="content" source="../assets/images/debug-mobile/clear-app-data-ios-option.PNG" alt-text="Screenshot shows how to clear the app data in iOS mobile client for bot." lightbox="../assets/images/debug-mobile/clear-app-data-ios.PNG":::

# [Android](#tab/android2)

To clear the Teams app data, go to **Teams** > **Settings** > **Data and storage** > **Clear app data** > **Clear data**.

:::image type="content" source="../assets/images/debug-mobile/clear-app-data-android-option.PNG" alt-text="Screenshot shows how to clear the app data in android mobile client for bot." lightbox="../assets/images/debug-mobile/clear-app-data-android.PNG":::

---

1. Your first mobile bot app is created.

    :::image type="content" source="../assets/images/debug-mobile/debug-bot-mobile.PNG" alt-text="Screenshot shows the bot app in mobile client.":::
