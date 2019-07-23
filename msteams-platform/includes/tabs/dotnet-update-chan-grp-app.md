### _Layout.cshtml

For your tab to display in Teams, you must include the **Microsoft Teams JavaScript client SDK** and include a call to `microsoftTeams.initialize()` after your page loads. This is how your tab and the Teams app communicate:

- Navigate to the **Shared** folder, open **_Layout.cshtml**, and add the following to the `<head>` tag:

```html
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
<script src="https://statics.teams.microsoft.com/sdk/v1.4.3/js/MicrosoftTeams.min.js"></script>
```

>[!IMPORTANT]
>Don't copy/paste the `<script src="...">` URLs from this page, as they may not represent the latest version. To get the latest version of the SDK markup, always go to:
[Microsoft Teams JavaScript API (via CDN)](foo.com) and [jQuery CDN - Latest Stable Versions](https://code.jquery.com) or [Microsoft jQuery Releases on the CDN.](/aspnet/ajax/cdn/overview#jquery-releases-on-the-cdn)

### Tab.cshtml

Open **Tab.cshtml** and update the embedded `<script>` as follows:

- At the top of the script, call `microsoftTeams.initialize()`.

- Update the `websiteUrl` and `contentUrl` values in each function with the HTTPS ngrok URL to your tab.

Your code should now look like the following with **y8rCgT2b** replaced with your ngrok URL:

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

Make sure to save the updated **Tab.cshtml**. Your configuration page code is complete.

## Build and run your application

- In Visual Studio press **F5**, or choose **Start Debugging** from the **Debug** menu. Verify that **ngrok** is running and working properly by opening your browser and going to your content page via the ngrok HTTPS URL that was provided in your command prompt window.

>[!TIP]
>You need to have both your application in Visual Studio and ngrok running to complete this quickstart. If you need to stop running your application in Visual Studio to work on it **keep ngrok running**. It will continue to listen and will resume routing your application's request when it restarts in Visual Studio. If you have to restart the ngrok service it will return a new URL and you'll have to update your application with the new URL.

## Upload your tab to Teams with App Studio

>[!Note]
> We use App Studio to edit your **manifest.json** file and upload the completed package to Teams. You can also manually edit the **manifest.json** file if you prefer. If you do, be sure to build the solution again to create the **tab.zip** file to upload.

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/foo.md).

- Open App studio and select the **Manifest editor** tab.

- Select the *Import an existing app* tile in the Manifest editor to begin updating the app package for your tab. Recall that the source code comes with its own pre-made manifest and the *.csproj file* contains code to create an app package when the application is built. The name of your app package is **tab.zip**. You can search your local machine's file explorer or switch to Visual Studio *Folder View* to find your zip file's location. It should be found here:

```bash
/bin/Debug/netcoreapp2.2/tab.zip
```

- Upload **tab.zip** to App Studio.

### Update your app package with Manifest editor

Once you've uploaded your app package into App Studio, you'll need to finish configuring it.

- Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There's a list of steps in the left-hand side of the Manifest editor, and on the right, a list of properties that need to have values for each of those steps. Much of the information has been provided by your *manifest.json* but there are a few fields that you'll need to update:

#### Details: App details

- Under *Identification* select ***Generate*** to replace the placeholder id with the required GUID for your tab.

- Under *Developer information* update the **Website URL** field with your *ngrok* HTTPS URL.

- Under *App URLs* update the **Privacy statement** and **Terms of use** URL fields with your *ngrok* HTTPS URL. Remember to include the */privacy* and */tou* paths at the end of the URLs.

#### Capabilities

- Select ***Tabs***.

- Under *Team Tab* select ***Add***.

- In the Team tab pop-up window update the *Configuration URL* with your *ngrok* HTTPS URL. Remember to include the */tab* parameter at the end of the URL.

- Finally, make sure the *can update configuration? *Team*, and/or *Group chat* boxes are checked and select ***Save***.

#### Finish

- Select *Domains and permissions*

- Leave the *Enter a valid domain* field empty.

If the *Additional valid domains* field is populated, select (•••) and choose ***Delete***.

- The *Domains from your tabs* field should contain your ngrok URL without the HTTPS prefix&mdash;**y8rCgT2b.ngrok.io/**.

#### Test and distribute

>[!IMPORTANT]
>In the **Description** field on the right you'll see the following warning:
>
>&#9888; "**The 'validDomains' array cannot contain a tunneling site...**"
>
>**This warning can be ignored while testing your tab.** After your tab has been uploaded to Microsoft teams, via *ngrok*, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends .
>
>**Remember to serve your tab on your hosted website prior to distribution.**.

- Select **Install**.

- In the pop-up window's *Add to a team or chat* field enter your team and select **Install**.

- In the next pop-up window choose the team channel where you would like the tab displayed and select **Set up**.

- In the final pop-up window select a value for the tab page (either a red or gray icon) and select **Save**.

To view your tab, navigate to the team you installed it on, and select it from the tab bar. The page that you chose during configuration should be displayed.

## Next Steps

- [learn something](~/foo.md)
- [and something else](~/foo.md)