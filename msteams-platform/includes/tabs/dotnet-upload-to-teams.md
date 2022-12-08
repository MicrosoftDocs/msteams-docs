## Upload your tab to Teams

>[!NOTE]
> We use App Studio to edit your `manifest.json` file and upload the completed package to Teams. You can also manually edit the `manifest.json` file if you prefer. If you do, be sure to build the solution again to create the `tab.zip` file to upload.

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com), you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

- Open the App Studio app and select the **Manifest editor** tab.

- Select the **Import an existing app** tile in the Manifest editor to begin updating the app package for your tab. The source code comes with its own partially complete manifest. The name of your app package is `tab.zip`. It should be found here:

    ```bash
    /bin/Debug/netcoreapp2.2/tab.zip
    ```

- Upload `tab.zip` to App Studio.

### Update your app package with Manifest editor

Once you've uploaded your app package into App Studio, you'll need to finish configuring it.

- Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There's a list of steps in the left-hand side of the Manifest editor, and on the right, a list of properties that need to have values for each of those steps. Much of the information has been provided by your *manifest.json* but there are a few fields that you'll need to update:

#### Details: App details

In the *App* details section:

- Under *Identification* select **Generate** to generate a new App Id for your app.

- Under *Developer information* update the **Website URL** field with your *ngrok* HTTPS URL.

- Under *App URLs*, update the **Privacy statement** to `https://<yourngrokurl>/privacy` and **Terms of use** to `https://<yourngrokurl>/tou`>.

#### Capabilities: Tabs

In the *Tabs* section:

- Under *Team Tab*, select **Add**.

- In the Team tab pop-up window, update the *Configuration URL* to `https://<yourngrokurl>/tab`.

- Finally, make sure the *can update configuration? Team*, and *Group chat* boxes are checked and select **Save**.

#### Finish: Domains and permissions

- In the *Domains and permissions* section, the *Domains from your tabs* field should contain your ngrok URL without the HTTPS prefix - `<yourngrokurl>.ngrok.io/`.

#### Finish: Test and distribute

>[!IMPORTANT]
>In the **Description** field on the right you'll see the following warning:
>
>&#9888; "**The 'validDomains' array cannot contain a tunneling site...**"
>
>This warning can be ignored while testing your tab.

In the *Test and distribute* section:

- Select **Install**.

- In the pop-up window's *Add to a team or chat* field, enter your team and select **Install**.

- In the next pop-up window, choose the team channel where you would like the tab displayed and select **Set up**.

- In the final pop-up window, select a value for the tab page (either a red or gray icon) and select **Save**.

To view your tab, go to the team you installed it on, and select it from the tab bar. The page that you chose during configuration should be displayed.
