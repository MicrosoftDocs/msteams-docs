## Upload your tab to Teams with App Studio

>[!NOTE]
> We use App Studio to edit your **manifest.json** file and upload the completed package to Teams. You can also manually edit **manifest.json** if you prefer. If you do, you must build the solution again to create the **Tab.zip** file to upload.

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

- Open App studio and select the **Manifest editor** tab.

![Import an existing app screenshot](~/assets/images/tabs/Import-existing-tab.png)

- Select the **Import an existing app** tile in the Manifest editor to begin updating the app package for your tab. The source code comes with its own partially complete manifest. The name of your app package is **tab.zip**. It must be found here:

```bash
/bin/Debug/netcoreapp2.2/Tab.zip
```

- Upload **Tab.zip** to App Studio.

### Update your app package with Manifest editor

Once you've uploaded your app package into App Studio, you need to configure it.

- Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There is a list of steps on the left-hand side of the Manifest editor, and on the right, a list of properties that need to have values for each of those steps as shown in the corresponding screen:

![List of steps on left and right hand side screenshot](~/assets/images/tabs/Update-app-package-with-manifest-editor.png)

Much of the information is provided by your *manifest.json* but there are a few fields that you need to update:

#### Details: App details

In the *App details* section:

- Under *Identification* select **Generate** to generate a new App Id for your app.

- Under *Developer information* update the **Website URL** with your *ngrok* HTTPS URL.

- Under *App URLs* update the **Privacy statement** to `https://<yourngrokurl>/privacy` and **Terms of use** to `https://<yourngrokurl>/tou`>.

#### Capabilities: Tabs

In the *Tabs* section:

- Under *Add a personal tab* select **Add**. You get a pop-up dialogue window.

- Complete the *Name* field.

- Complete the *Entity Id* field.

- Update the *Content URL* field with to `https://<yourngrokurl>/personalTab`.

- Leave the *Website URL* field blank.

- Select ***Save***.

#### Finish: Domains and permissions

In the *Domains and permissions* section, the *Domains from your tabs* field must contain your ngrok URL without the HTTPS prefix - `<yourngrokurl>.ngrok.io/`.

##### Finish: Test and distribute

>[!IMPORTANT]
>In the **Description** field on the right, the following warning is displayed:
>
>&#9888; "**The 'validDomains' array cannot contain a tunneling site...**"
>
>This warning can be ignored while testing your tab.

In the *Test and distribute* section:

- Select **Install**.

- In the pop-up window make sure that *Add for you* is set to *Yes*, and *Add to a team or chat* is set to *No*.

- Select **Install**.

- In the next pop-up window select **Open** and your tab is displayed.

## View your personal tab

- Select the menu `...` in the navigation bar on the far-left of the Teams App, you'll get a list of personal applications.

- Select your tab from the list to view.
