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

* In a browser, enter the following URLs to verify the application loaded properly:

    - `http://localhost:44355`
    - `http://localhost:44355/privacy`
    - `http://localhost:44355/tou`

## Upload your tab to Teams with App Studio

>[!Note]
> We use App Studio to edit your **manifest.json** file and upload the completed package to Teams. You can also manually edit the **manifest.json** file and build the solution again to create the **tab.zip** file to upload.

1. Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

1. Open App studio and select the **Manifest editor** tab.

1. Select the **Import an existing app** tile in the Manifest editor to update the app package for your tab. The source code comes with its own partially complete manifest. The name of your app package is **tab.zip**. It must be found here:

    ```bash
    /bin/Debug/netcoreapp2.2/tab.zip
    ```

1. Upload **tab.zip** to App Studio.

### Update your app package with Manifest editor

Once you upload your app package into App Studio, you must configure it.

* Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There is a list of steps in the left-hand side of the Manifest editor, and on the right, a list of properties that need to have values for each of those steps. Much of the information has been provided by your *manifest.json* but there are a few fields that you need to update:

#### Details: App details

- Under *Identification* select ***Generate*** to replace the placeholder id with the required GUID for your tab.

- Under *Developer information* update the **Website URL** field with your *ngrok* HTTPS URL.

- Under *App URLs* update the **Privacy statement** and **Terms of use** URL fields with your *ngrok* HTTPS URL. Remember to include the */privacy* and */tou* paths at the end of the URLs.

#### Capabilities: Tabs

In the *Tabs* section:

- Under *Team Tab* select **Add**.

- In the Team tab pop-up window, update the *Configuration URL* to `https://<yourngrokurl>/tab`.

- Select the *can update configuration? Team*, and *Group chat* check boxes.

- Select **Save**.

#### Finish: Domains and permissions

In the *Domains and permissions* section, the *Domains from your tabs* field must contain your ngrok URL without the HTTPS prefix - `<yourngrokurl>.ngrok.io/`.

#### Test and distribute: Test and distribute

>[!IMPORTANT]
>In the **Description** field on the right, the following warning is displayed:
>
>&#9888; "**The 'validDomains' array cannot contain a tunneling site...**"
>
>This warning can be ignored while testing your tab.

In the *Test and distribute* section:

- Select **Install**.

- In the pop-up window's *Add to a team or chat* field, enter your team and select **Install**.

- In the next pop-up window choose the team channel where you would like the tab displayed and select **Set up**.

- In the final pop-up window select a value for the tab page (either a red or gray icon) and select **Save**.

## View your channel or group tab

To view your tab, go to the team you installed it on, and select it from the tab bar. The page that you chose during configuration is displayed.
