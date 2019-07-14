---
title: "Quickstart: Create a Channel and Group Tab with ASP.NET Core" 
author: laujan 
description: A quickstart guide to creating a custom channel and group tab with ASP.NET Core. 
ms.topic: quickstart 
ms.author: laujan 
---
# Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core

In this quickstart we'll walk-through creating a custom channel/group tab with C# and [ASP.Net Core](AspNetCore.Docs/aspnetcore/index) [Razor Pages](/aspnet/AspNetCore.Docs/aspnetcore/mvc/views/razor). We'll also use [App Studio for Microsoft Teams](/msteams-platform/get-started/get-started-app-studio.md) to test your tab's Teams integration.

## Prerequisites

- To complete this quickstart you'll need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled. To learn more, see [Manage Microsoft Teams settings for your organization](/OfficeDocs-SkypeForBusiness/Teams/enable-features-office-365). If you don't currently have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription will remain active as long as you're using it for ongoing development. See [Welcome to the Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program).

- You'll use App Studio to import your application to Teams. To install App Studio select **Apps** ![Store App](/microsoftteams/platform/assets/images/tab-images/storeApp.png) at the bottom-left corner of the Teams app, and search for App Studio. Once you find the tile, select it and choose install in the pop-up window dialog box.

In addition, this project requires that you have the following installed in your development environment:

- The Visual Studio 2019 IDE with the **.NET CORE cross-platform development** workload installed:

![screenshot: visual studio install options](/microsoftteams/platform/assets/images/tab-images/workloads.png)

If you don't already have Visual Studio, you can download and install the latest [Microsoft Visual Studio Community](https://visualstudio.microsoft.com/downloads) version for free.

- The [ngrok](https://ngrok.com/docs) reverse proxy tool. You'll use ngrok to create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Go to https://ngrok.com/download to get the download for your environment.

## Get the source code

Open a command prompt and create a new directory for your tab project.
We have provided a simple [Channel Group Tab](OfficeDev/msteams-samples/samples/dotnet/tabs/channelgroup) project to get you started.To retrieve the source code you can download the zip file and extract the files or [clone](https://help.github.com/en/articles/cloning-a-repository) the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/msteams-samples.git
```

Once you have the source code, open Visual Studio and select *Open a project or solution*. Navigate to the tab solution file, [Channel group tab project](msteams-samples/samples/dotnet/tabs/channelGroupTab/), and open **channelGroupTab.sln**.

To build and run your application select *F5* or choose *Start Debugging* from the *Debug* menu, navigate to the following, and verify that the application URLS load properly:

- `http://localhost:44355`
- `http://localhost:44355/privacy`
- `http://localhost:44355/tou`

## Review the source code

&#9989; Startup.cs

This project was created from an ASP.NET Core web application empty template. We registered the MVC services by adding the dependency injection framework to the  **ConfigureServices()** method. Additionally, the empty template doesn't enable serving static content by default, so we added the static files middleware to the **Configure()** method:

```csharp
public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }
public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();
            app.UseMvc();
        }
```

&#9989; wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files. We added a new folder to the root of the application, and named it wwwroot which, when displayed in Solution Explorer, has the proper appearance and globe icon.

&#9989; index.cshtml

ASP.NET Core treats files called *index* as the default/home page for the site. When your browser URL points to the root of the site, index.cshtml will be displayed as the content page for your tab.

&#9989; tab.cs

This C# file contains a method that will be called from **tab.cshtml** during configuration.

&#9989; AppManifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your tab and points to required resources like the tab.cshtml page.

These files need to be zipped in an app package for use in uploading your tab to Teams. When a user chooses to add or update your tab, Microsoft Teams will load the configurationUrl, specified in your manifest, load it in an IFrame, and render it in your channel or group chat.

&#9989; channelGroupTab.csproj

In the Visual Studio Solution Explorer window right-click on the project and select **Edit Project File**. At the bottom of the file you'll see the code that creates and updates your zip file when the application builds:

```xml
<PropertyGroup>
    <PostBuildEvent>powershell.exe Compress-Archive -Path \"$(ProjectDir)AppManifest\*\" -DestinationPath \"$(TargetDir)tab.zip\" -Force</PostBuildEvent>
  </PropertyGroup>

  <ItemGroup>
    <EmbeddedResource Include="AppManifest\icon-outline.png">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\icon-color.png">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="AppManifest\manifest.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
  </ItemGroup>
```

## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires that your tab content be available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting, therefore, you need to either publish your tab to a public URL, or use a proxy that will expose your local port to an internet-facing URL.

To test your tab you'll use [ngrok](https://ngrok.com/docs). Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

- Open a command prompt in the root of your project folder and run the following command:

```bash
ngrok http https://localhost:44355 -host-header="localhost:44355"
```

- Ngrok will listen to requests from the internet and will route them to your project when it is running on port 44355.  It should resemble `https://y8rGr7pCh3nlT2b.ngrok.io/` where *y8rGr7pCh3nlT2b* is replaced by the ngrok alpha-numeric HTTPS URL.

- Make note of the HTTPS ngrok URL&mdash;you can copy it to **Notepad for Windows**. You'll need the ngrok HTTPS URL to test your tab in Teams.

## Update your application for Teams Integration

For your tab to display in Teams, you must include the **Microsoft Teams JavaScript client SDK** and include a call to the Teams SDK&mdash;**microsoftTeams.initialize()**&mdash;within your tab page &#60;script&#62; tags. This is how your tab and the Teams app communicate:

- Open the **Pages** folder, navigate to the **Shared** folder, open **_Layout.cshtml**, and add the following to the &#60;head&#62; tags section:

```html
`<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>`
`<script src="https://statics.teams.microsoft.com/sdk/v1.4.3/js/MicrosoftTeams.min.js"></script>`
```

>[!IMPORTANT]
>Don't copy/paste the &#60;script src="..." URLs from this page, they may not represent the latest version. To get the latest version of the SDK markup, always go to:
**[Microsoft Teams JavaScript API (via CDN)](foo.com)** and **[jQuery CDN - Latest Stable Versions](https://code.jquery.com)** or [Microsoft jQuery Releases on the CDN.](/aspnet/ajax/cdn/overview#jquery-releases-on-the-cdn)

## Configure your tab

This application presents the user with two option buttons for displaying the tab with either a red or gray icon. Choosing the **Select Gray** or **Select Red** button fires **saveGray()** or **saveRed()**, respectively, sets **settings.setValidityState(true)**, and enables ***Save*** in the Teams UI. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of **settings.setSettings** are set. Finally, **saveEvent.notifySuccess()** is called to indicate that the content URL has successfully resolved. Update your configuration page as follows:

- In the **Pages** folder select **tab.cshtml**, reference the [Microsoft Teams Library](https://github.com/OfficeDev/microsoft-teams-library-js) as follows:

- Within the first set of &#60;**script**&#62; tags, call **initialize()** on **microsoftTeams**:

```javascript
    microsoftTeams.initialize();
```

- Within the next set of script tags, you'll find two settings functions. Update the **websiteUrl** and **contentUrl** values in each function with the HTTPS ngrok URL to your tab. Your code should look like the following with **y8rGr7pCh3nlT2b** replaced with your ngrok URL:

```javascript
    let saveGray = () => {
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            microsoftTeams.settings.setSettings({
                websiteUrl: `https://y8rGr7pCh3nlT2b.ngrok.io`,
                contentUrl: `https://y8rGr7pCh3nlT2b.ngrok.io/gray/`,
                entityId: "grayIconTab",
                suggestedDisplayName: "MyNewTab"
            });
            saveEvent.notifySuccess();
        });
    }

    let saveRed = () => {
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            microsoftTeams.settings.setSettings({
                websiteUrl: `https://y8rGr7pCh3nlT2b.ngrok.io`,
                contentUrl: `https://y8rGr7pCh3nlT2b.ngrok.io/red/`,
                entityId: "redIconTab",
                suggestedDisplayName: "MyNewTab"
            });
            saveEvent.notifySuccess();
        });
    }
```

- *Save* the updated **tab.cshtml** and *Save all* for good measure.

Your tab code is complete.

### Run your application

- In Visual Studio select **F5** or choose **Start Debugging** from your application's **Debug** menu. Verify that **ngrok** is running and working properly by opening your browser and going to your content page via the HTTPS URL supplied by **ngrok** in your command prompt window.

>[!TIP]
>You need to have both your application in Visual Studio and ngrok running to complete this quickstart. If you need to stop running your application in Visual Studio to work on it **keep ngrok running**. Ngrok will continue to listen and will resume routing your application's request when it restarts in Visual Studio. If you have to restart the ngrok service it will return a new URL and you'll have to update every place that uses that URL.

### Upload your tab with App Studio

- Open **Microsoft Teams** using the [web based version](https://teams.microsoft.com) so that you can inspect your front-end code using your browser's developer tools.

- Open App studio and select the **Manifest editor** tab.

- Select the *Import an existing app* tile in the Manifest editor to begin updating the app package for your tab. Recall that the source code comes with its own pre-made manifest and the **.csproj file** contains code to create an app package when the application is built. The name of your app package is **tab.zip**. You can search your local machine's file explorer or switch to Visual Studio **Folder View** to find your zip file's location. It should be found here:

```bash
 /bin/Debug/netcoreapp2.2/tab.zip
```

- Upload **tab.zip** to App Studio.

### Update your app package with Manifest editor

Once you've uploaded your tab into Teams, you'll need to configure it to show content.

- Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There's a list of steps in the left-hand side of the Manifest editor, and on the right, a list of properties that need to have values for each of those steps. Much of the information has been provided by your **manifest.json** but there are a few fields that you'll need to update:

#### Details: App details

- Under *Identification* select ***Generate*** to replace the placeholder id with the required GUID for your tab.

- Under **Developer information** update the **Website URL** field with your **ngrok** HTTPS URL.

- Under **App URLs** update the **Privacy statement** and **Terms of use** URL fields with your **ngrok** HTTPS URL. Remember to include the */privacy* and */tou* parameters at the end of the URLs.

#### Capabilities

- Select ***Tabs***.

- Under **Team Tab** select **Add**.

- In the Team tab pop-up window update the **Configuration URL** with your **ngrok** HTTPS URL. Remember to include the */tab* parameter at the end of the URL.

- Finally, make sure the *can update configuration?, *Team*, and/or *Group chat* boxes are checked and select **Save**.

#### Finish

- Select **Domains and permissions**

-Leave the **Enter a valid domain** field empty.

If the **Additional valid domains** field is populated, select (•••) and choose **Delete**.

- To clear placeholder URLs from Manifest editor, scroll to the bottom of the Tabs section (*Select a tab from the following list to include any additional domains*) select the (•••) button and choose **Delete**.

- The **Domains from your tabs** should contain your ngrok URL without the HTTPS prefix&mdash;**y8rGr7pCh3nlT2b.ngrok.io/**.

##### Test and distribute

>[!IMPORTANT]
>In the **Description** field on the right you'll see the following warning:<br>
&#9888; "**The 'validDomains' array cannot contain a tunneling site...**" <br>**This warning can be ignored while you're testing your tab.**<br>
After your tab has been uploaded to Microsoft teams, via ngrok, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends .<br><br>
**Remember to serve your tab on your hosted website prior to submission to the Teams app store for approval**.

- Under Install select ***Install***.

- In the pop-up window's **Add to a team or chat** field enter your Teams team and select ***Install***.

- In the next pop-up window choose the team channel where you would like the tab displayed and select ***Set up***.

- In the final pop-up window select a value for the tab page (either a red or gray icon) and select ***Save***.

- To view, select your new tab from the tab bar.

### Nice work! You just extended Microsoft Teams with a custom tab.
