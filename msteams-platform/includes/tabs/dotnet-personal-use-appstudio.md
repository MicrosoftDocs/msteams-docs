## Upload your tab to Teams with App Studio

>[!NOTE]
> We use App Studio to edit your **manifest.json** file and upload the completed package to Teams. You can also manually edit the **manifest.json** file if you prefer. If you do, be sure to build the solution again to create the **tab.zip** file to upload.

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/foo.md).

- Open App studio and select the **Manifest editor** tab.

- Select the *Import an existing app* tile in the Manifest editor to begin updating the app package for your tab. Recall that the source code comes with its own pre-made manifest and the *.csproj file* contains code to create an app package when the application is built. The name of your app package is **tab.zip**. You can search your local machine's file explorer or switch to Visual Studio *Folder View* to find your zip folder's location. It should be found here:

```bash
/bin/Debug/netcoreapp2.2/tab.zip
```

- Upload **Tab.zip** to App Studio.

### Update your app package with Manifest editor

Once you've uploaded your app package into App Studio, you'll need to finish configuring it.

- Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There's a list of steps in the left-hand side of the Manifest editor, and on the right, a list of properties that need to have values for each of those steps. Much of the information has been provided by your *manifest.json* but there are a few fields that you'll need to update:

#### Details: App details

- Under *Identification* select ***Generate*** to replace the placeholder id with a required GUID for your tab.

- Under *Developer information* update the **Website URL** with your *ngrok* HTTPS URL.

- Under *App URLs* update the **Privacy statement** and **Terms of use** URL fields with your *ngrok* HTTPS URL. Remember to include the */privacy* and */tou* parameters at the end of the URLs.

#### Capabilities

- Select ***Tabs***.

- Under *Add a personal tab* select ***Add***. You will be presented with a pop-up dialogue window.

- Complete the *Name* field.

- Complete the *Entity Id* field.

- Complete the *Content URL* field with your *ngrok* HTTPS URL including the */personalTab* parameter.

- Complete the *Website URL* field with your *ngrok* HTTPS URL.

- Select ***Save***.

#### Finish

- Select *Domains and permissions*

- Leave the *Enter a valid domain* field empty.

If the *Additional valid domains* field is populated, select (•••) and choose ***Delete***.

- The *Domains from your tabs* field should contain your ngrok URL without the HTTPS prefix—**y8rPrT2b.ngrok.io/**.

##### Test and distribute

>[!IMPORTANT]
>In the **Description** field on the right you'll see the following warning:
>
>&#9888; "**The 'validDomains' array cannot contain a tunneling site...**"
>
>**This warning can be ignored while testing your tab.** After your tab has been uploaded to Microsoft teams, via *ngrok*, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends .
>
>**Remember to serve your tab on your hosted website prior to distribution.**.

- Select **Install**.

- In the pop-up window make sure that *Add for you* is set to *Yes* and *Add to a team or chat* is set to *No*.

- Select ***Install***.

- In the next pop-up window select ***Open*** and your tab will be displayed.

## View your personal tab

- In the tab bar located at the far-left of the Teams App, select (•••) *More added apps*. You'll be presented with a list of personal view apps.

- You can select your tab from the list to view.