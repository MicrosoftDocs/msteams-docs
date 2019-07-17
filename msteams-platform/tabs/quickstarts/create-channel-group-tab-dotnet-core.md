---
title: "Quickstart: Create a Channel and Group Tab with ASP.NET Core" 
author: laujan 
description: A quickstart guide to creating a custom channel and group tab with ASP.NET Core. 
ms.topic: quickstart 
ms.author: laujan 
---
# Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core

In this quickstart we'll walk-through creating a custom channel/group tab with C# and [ASP.Net Core](AspNetCore.Docs/aspnetcore/index) [Razor Pages](/aspnet/AspNetCore.Docs/aspnetcore/mvc/views/razor). We'll also use [App Studio for Microsoft Teams](/foo.md) to test your tab's Teams integration.

## Prerequisites

- To complete this quickstart you'll need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled. To learn more, see [Manage Microsoft Teams settings for your organization](/OfficeDocs-SkypeForBusiness/Teams/enable-features-office-365).
  - If you don't currently have an Office 365 account, you can sign up for a free subscription through the [Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program). The subscription will remain active as long as you're using it for ongoing development.

- You'll use App Studio to import your application to Teams. To install App Studio select **Apps** ![Store App](/microsoftteams/platform/assets/images/tab-images/storeApp.png) at the bottom-left corner of the Teams app, and search for App Studio. Once you find the tile, select it and choose install in the pop-up window dialog box.

In addition, this project requires that you have the following installed in your development environment:

- The Visual Studio 2019 IDE with the **.NET CORE cross-platform development** workload installed. If you don't already have Visual Studio, you can download and install the latest [Microsoft Visual Studio Community](https://visualstudio.microsoft.com/downloads) version for free.

- The [ngrok](https://ngrok.com/docs) reverse proxy tool. You'll use ngrok to create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Go to https://ngrok.com/download to get the download for your environment.

## Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple [Channel Group Tab](OfficeDev/msteams-samples/samples/dotnet/tabs/ChannelGroupTab) project to get you started.To retrieve the source code you can download the zip file and extract the files or [clone](https://help.github.com/en/articles/cloning-a-repository) the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/msteams-samples.git
```

Once you have the source code, open Visual Studio and select **Open a project or solution**. Navigate to the tab application directory and open the **channelGroupTab.sln** file.

To build and run your application press **F5** or choose **Start Debugging** from the **Debug** menu. In a browser navigate to the URLs below, to verify the application loaded properly.

- `http://localhost:44355`
- `http://localhost:44355/privacy`
- `http://localhost:44355/tou`

## Review the source code

### Startup.cs

This project was created from an ASP.NET Core web application empty template. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

### index.cshtml

ASP.NET Core treats files called *index* as the default/home page for the site. When your browser URL points to the root of the site, **index.cshtml** will be displayed as the home page for your application.

### tab.cs

This C# file contains a method that will be called from **tab.cshtml** during configuration.

### AppManifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your tab and points to required resources like the tab.cshtml page.

These files need to be zipped in an app package for use in uploading your tab to Teams. When a user chooses to add or update your tab, Microsoft Teams will load the `configurationUrl` specified in your manifest, load it in an IFrame, and render it in your channel or group chat.

### channelGroupTab.csproj

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

To test your tab you'll use [ngrok](https://ngrok.com/docs). Your server's web endpoints will be available while ngrok is running on your local machine. If you close ngrok, the URLs will be different the next time you start it.

- Open a command prompt in the root of your project directory and run the following command:

```bash
ngrok http https://localhost:44355 -host-header="localhost:44355"
```

- Ngrok will listen to requests from the internet and will route them to your project when it is running on port 44355.  It should resemble `https://y8rCgT2b.ngrok.io/` where *y8rCgT2b* is replaced by the ngrok alpha-numeric HTTPS URL.

- Be sure to keep the command prompt with ngrok running, and to make note of the URL. You'll need it later.

## Update your application

This application presents the user with two option buttons for displaying the tab with either a red or gray icon. Choosing the **Select Gray** or **Select Red** button fires `saveGray()` or `saveRed()`, respectively, sets `settings.setValidityState(true)`, and enables the **Save** button on the configuration page. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of `settings.setSettings` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

### Update _Layout.cshtml

For your tab to display in Teams, you must include the **Microsoft Teams JavaScript client SDK** and include a call to `microsoftTeams.initialize()` after your page loads. This is how your tab and the Teams app communicate.

- Open the **Pages** folder, navigate to the **Shared** folder, open **_Layout.cshtml**, and add the following to the `<head>` tag:

```html
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
<script src="https://statics.teams.microsoft.com/sdk/v1.4.3/js/MicrosoftTeams.min.js"></script>
```

>[!IMPORTANT]
>Don't copy/paste the `<script src="...">` URLs from this page, as they may not represent the latest version. To get the latest version of the SDK markup, always go to:
[Microsoft Teams JavaScript API (via CDN)](foo.com) and [jQuery CDN - Latest Stable Versions](https://code.jquery.com) or [Microsoft jQuery Releases on the CDN.](/aspnet/ajax/cdn/overview#jquery-releases-on-the-cdn)

### Update tab.cshtml

Open the **tab.cshtml** file in the **Pages** folder, and update the embedded `<script>` as follows:

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

Make sure to save the updated **tab.cshtml**, and then your configuration page code is complete.

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
