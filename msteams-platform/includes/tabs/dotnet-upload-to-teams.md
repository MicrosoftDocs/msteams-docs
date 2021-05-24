## Upload your tab to Teams

>[!NOTE]
> Use App Studio to edit your **manifest.json** file and upload the completed package to Teams. You can also manually edit the **manifest.json** file manually and build the solution to create a **tab.zip** file to upload.

**To upload your tab**

1. Open Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

1. Open App Studio and select the **Manifest editor** tab.

1. Select the **Import an existing app** tile in the Manifest editor to update the app package for your tab. The source code comes with its own partially complete manifest. The name of your app package is **tab.zip**. It must be found here:

    ```bash
    /bin/Debug/netcoreapp2.2/tab.zip
    ```

1. Upload **tab.zip** to App Studio.

### Update your app package with Manifest editor

You must configure your app package using App Studio.

* Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There are list of steps in the left-hand side and list of properties on the right that must have values for each step in the Manifest editor. Much of the information has been provided by your *manifest.json* but there are few fields that you need to update:

#### Details: App details

In the *App details* section:

- Under *Identification* select **Generate** to generate a new App Id for your app.

- Under *Developer information* update the **Website URL** field with your *ngrok* HTTPS URL.

- Under *App URLs* update the **Privacy statement** to `https://<yourngrokurl>/privacy` and **Terms of use** to `https://<yourngrokurl>/tou`>.

#### Capabilities: Tabs

In the *Tabs* section:

- Under *Team Tab* select **Add**.

- In the Team tab pop-up window, update the *Configuration URL* to `https://<yourngrokurl>/tab`.

- Select the *can update configuration? Team*, and *Group chat* check boxes.

- Select **Save**

#### Finish: Domains and permissions

In the *Domains and permissions* section, the *Domains from your tabs* field must contain your ngrok URL without the HTTPS prefix - `<yourngrokurl>.ngrok.io/`.

#### Finish: Test and distribute

>[!IMPORTANT]
>In a **Description** field on the right you'll see the following warning:
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

Navigate to the team where you installed the tab, and select the tab from the tab bar. The page selected during the configuration is displayed.
