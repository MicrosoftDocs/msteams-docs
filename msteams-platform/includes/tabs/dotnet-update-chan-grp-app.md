### _Layout.cshtml

To display your tab in Teams, you must include the **Microsoft Teams JavaScript client SDK** and include a call to `microsoftTeams.initialize()` after your page loads. This is how your tab and the Teams client communicate:

* Go to the **Shared** folder, open **_Layout.cshtml**, and add the following to the `<head>` tag:

```html
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
<script src="https://statics.teams.cdn.office.net/sdk/v1.6.0/js/MicrosoftTeams.min.js"></script>
```

>[!IMPORTANT]
>Do not copy or paste the `<script src="...">` URLs from this page, as they may not represent the latest version. To get the latest version of the SDK, always go to: [Microsoft Teams JavaScript API](https://www.npmjs.com/package/@microsoft/teams-js).

### Tab.cshtml

Open **Tab.cshtml** and update the embedded `<script>` as follows:

* At the top of the script, call `microsoftTeams.initialize()`.

* Update the `websiteUrl` and `contentUrl` values in each function with the HTTPS ngrok URL to your tab.

Your code looks like the following with **y8rCgT2b** replaced with your ngrok URL:

```javascript
    microsoftTeams.initialize();

    let saveGray = () => {
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            microsoftTeams.settings.setSettings({
                websiteUrl: `https://y8rCgT2b.ngrok.io`,
                contentUrl: `https://y8rCgT2b.ngrok.io/gray/`,
                entityId: "grayIconTab",
                suggestedDisplayName: "MyNewTab"
            });
            saveEvent.notifySuccess();
        });
    }

    let saveRed = () => {
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            microsoftTeams.settings.setSettings({
                websiteUrl: `https://y8rCgT2b.ngrok.io`,
                contentUrl: `https://y8rCgT2b.ngrok.io/red/`,
                entityId: "redIconTab",
                suggestedDisplayName: "MyNewTab"
            });
            saveEvent.notifySuccess();
        });
    }
```

Save the updated **Tab.cshtml**.

[!INCLUDE [dotnet-ngrok-intro](~/includes/tabs/dotnet-ngrok-intro.md)]

* Open a command prompt in the root of your project directory and run the following command:

    ```bash
    ngrok http https://localhost:44355 -host-header="localhost:44355"
    ```

* Ngrok listen to requests from the internet and route them to your application when it is running on port 44355. It must resemble `https://y8rCgT2b.ngrok.io/` where *y8rCgT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

* You need to keep the command prompt while ngrok is running, you need it later to write down the URL.

* Verify that **ngrok** is up and running by opening your browser and going to your content page through the ngrok HTTPS URL that was provided in your command prompt window.

>[!TIP]
>You must run your application in Visual Studio and ngrok to complete this quickstart. If you are no longer running your application in Visual Studio to work on it, **keep ngrok running**. It continues to listen and resume routing your application's request when it restarts in Visual Studio. When you restart the ngrok service, it returns the new URL and you need to update all locations that use the old URL.

### Run your application

* In Visual Studio press **F5**, or select **Start Debugging** from the **Debug** menu.