---
title: "Quickstart: Create a Channel and Group Tab with ASP.NET Core" 
author: laujan 
description: A quickstart guide to creating a channel and group tab with ASP.NET Core. 
ms.topic: quickstart 
ms.author: laujan 
---
# Quickstart: Create a Channel <br>and Group Tab with ASP.NET Core

Custom tabs enable you to embed your hosted web content directly into Microsoft Teams and add Teams-specific functionality via your  [Teams App Package](foo.md). See [What are custom tabs in Microsoft Teams?](/msteams-platform/tabs/what-are-custom-tabs.md). There are two types of tabs available in Teams&mdash;channel/group and personal. A channel/group tab delivers content to channels and group chats and are a great way to create collaborative spaces around dedicated web-based content. A channel/group tab can be pinned to the tabs bar located at the top of the channel and each channel or group chat can have its own tabs to support specific focus areas. An app can have only one channel/group tab.

In this quickstart we'll walk-through creating a custom channel/group tab with C# and [ASP.Net Core](AspNetCore.Docs/aspnetcore/index.md) [Razor Pages](/aspnet/AspNetCore.Docs/aspnetcore/mvc/views/razor.md). We'll also use [App Studio for Microsoft Teams](/msteams-platform/get-started/get-started-app-studio.md) to test your tab's Teams integration.

## Prerequisites

- To complete this quickstart you'll need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled. To learn more, see [Manage Microsoft Teams settings for your organization](/OfficeDocs-SkypeForBusiness/Teams/enable-features-office-365.md). If you don't currently have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription will remain active as long as you're using it for ongoing development. See [Welcome to the Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program.md).

- You'll use App Studio for Microsoft Teams to import your app package to Teams. To install App Studio in Teams click **Apps** ![Store App](/microsoftteams/platform/assets/images/tab-images/storeApp.png) at the bottom-left corner of the Teams app, and search for App Studio. Once you find the tile for App Studio, click on it and choose install in the popup window dialog box.

- You'll also need a [GitHub](https://github.com) account so that you can get a copy of the source code for for this project.

In addition, this project requires that you have the following installed in your development environment:

- The Visual Studio 2019 IDE with the `.NET CORE cross-platform development` workload installed:

![screenshot: visual studio install options](/microsoftteams/platform/assets/images/tab-images/workloads.png)

If you don't already have Visual Studio, you can download and install the latest [Microsoft Visual Studio Community](https://visualstudio.microsoft.com/downloads) version for free.

- The [ngrok](https://ngrok.com/docs) reverse proxy tool. You'll use ngrok to create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Go to https://ngrok.com/download to get the download for your environment. 

## Get the source code for this project

Open a command prompt and create a new directory for your tab project. You can find the GitHub repository for this quickstart at [GitHubRepository foo.md](https:///github.com/MicrosoftDocs). Navigate to your new directory and type the following command to [clone](https://help.github.com/en/articles/cloning-a-repository) the sample repository to your local machine:

```bash
git clone https://github.com/MicrosoftDocs/CreateChannelGroupTabNetCore/foo.md
```

Once the repository is cloned, open the solution file, `foo.md`, in Visual Studio and click `Build Solution` from the `Build` menu. Run the sample by pressing `F5` or choosing `Start Debugging` from the `Debug` menu and navigate to the following URLs to verify that the app URLS are loading:

- `http://localhost:44311`
- `http://localhost:44311/privacy`
- `http://localhost:44311/tou`

## Review the source code files

&#9989; Startup.cs

This project was created from an ASP.NET Core web application empty template. Since Razor pages are a subset of the ASP.NET Core MVC framework, we needed to register the MVC services to the components to the service collection that MVC and, therefore, Razor Pages require. To do so, we added the dependency injection framework to the  `ConfigureServices()` method. Additionally,
the empty template doesn't enable serving static content by default, however, since your project will be serving static files&mdash;HTML, CSS, and images, we added the static files middleware to the `Configure()` method:

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

In the ASP.NET Core application, the web root (wwwroot) folder is the default static file location and isn't included with the empty template. We added a new folder to the root of our project, and named it wwwroot. When the newly created folder displayed in Solution Explorer it had the proper appearance and &#127760; icon. With the static files middleware added to the project, ASP.NET Core will look in the wwwroot folder of your app for static files and return them if the filename matches the request. The wwwroot folder contails the CSS styling tyling for our app `site.css`, an images folder containing several icons, and a library folder containing `bootstrap.css` files.

&#9989; Index.cshtml

ASP.NET Core treats files called `Index` as the default page for the site. When your browser URL points to the root of the site, the Index.cshtml will be displayed. This will be the content page for your tab.

&#9989; ChannelGroup.cs

This C# file contains two simple methods that will be called from the `channelGroup.cshtml` file when your channel/group page is configured.

&#9989; Manifest folder

The folder contains the following required files:

- A full color icon measuring 192 x 192 pixels color
- A transparent outline icon measuring 32 x 32 pixels.
- A manifest.json file which specifies the attributes of your tab and points to required resources like the channelGroup page.

These files will need to be zipped in an app package for use in uploading your app to Teams. When a user chooses to add or update your tab, Microsoft Teams will load the configurationUrl, specified in your manifest,load it in an IFrame, and render it in your channel or group chat.

In the Solution Explorer window right click on the foo.md project and click on `Edit Project File`. At the bottom of the file you will see the code that creates/updates your zip file when the project builds:

```xml
<PropertyGroup>
    <PostBuildEvent>powershell.exe Compress-Archive -Path \"$(ProjectDir)Manifest\*\" -DestinationPath \"$(TargetDir)tab.zip\" -Force</PostBuildEvent>
  </PropertyGroup>

  <ItemGroup>
    <EmbeddedResource Include="Manifest\icon-outline.png">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="Manifest\icon-color.png">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
    <EmbeddedResource Include="Manifest\manifest.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </EmbeddedResource>
  </ItemGroup>
``` 

## Establish an ngrok secure tunnel

Microsoft Teams is an entirely cloud-based product, and thus requires your app to be available from the cloud using HTTPS endpoints. Teams doesn't allow apps to be hosted on localhost. Therefore, you need to either publish your app to a public URL, or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension you'll use [ngrok](https://ngrok.com/docs). Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

- Open a command prompt in the root of your project folder and run the following command:

```bash
ngrok http https://localhost:44311 -host-header="localhost:44311"
```

- Ngrok will listen to requests from the internet and will route them to your app when it is running on port 44311.  It should resemble `https://yo8urGro7upChann3elTa2b.ngrok.io/` where `yo8urGro7upChann3elTa2b` is replaced by the ngrok alpha-numeric URL. Make note of the HTTPS ngrok URL - you can copy it to `Notepad for Windows`. You will need the ngrok HTTPS URL to test your app in Teams.

## Update your configuration page for Teams

The `Pages` folder is where the framework looks for Razor Pages by default.

In order for your channel/group tab to display within Microsoft Teams, you must include the `Microsoft Teams JavaScript client SDK` and include a call to the Teams SDK&mdash;`microsoftTeams.initialize()`&mdash;within your channel/group page &#60;`script`&#62; tags. This is how your app and the Teams app communicate.

This project presents the user with two option buttons for displaying their channel/group tab with either a red or gray icon. Clicking the `Select Gray` or `Select Red` button fires either the `saveGray` or `saveRed` functions, respectively, sets `microsoftTeams.settings.setValidityState(true)`, and enables the *Save* button in the Teams UI. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed.  Without this you'll be stuck in a loop and unable to proceed.

On save, the parameters of `microsoftTeams.settings.setSettings` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.  

- To reference the [Microsoft Teams Library](https://github.com/OfficeDev/microsoft-teams-library-js), click on the `Pages` folder, open the  `ChannelGroup.cshtml` file and add the markup for the latest version of the`jQuery Library` and the `MicrosoftTeams SDK` below the following Razor page shared layout reference:

```html
@{
Layout= #_Layout";
}
```

The markup should resemble the following with the **latest versions** referenced:

```html
`<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>`
`<script src='https://statics.teams.microsoft.com/sdk/v1.4.3/js/MicrosoftTeams.min.js'></script>`
```

>[!IMPORTANT]
>Do not copy/paste the &#60;script src="..." URLs from this page, they may not represent the latest version. To get the latest version of the SDK markup, always go to:
`foo.md(SDK)` and [jQuery CDN - Latest Stable Versions](https://code.jquery.com) or [Microsoft jQuery Releases on the CDN.](/aspnet/ajax/cdn/overview#jquery-releases-on-the-cdn)

- Within the first set of &#60;`script`&#62; tags, call the `initialize()` method on `microsoftTeams` as follows:

```javascript
    microsoftTeams.initialize();
```

- Within the next set of script tags, you will find the two settings functions. Update the `websiteUrl` and `contentUrl` values in each function with the HTTPS `ngrok` URL to your app. Your code should look like the following (where `y8urGr7pChan3Ta2b` is replaced with your ngrok URL):

```javascript
let saveRed = () => {
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            microsoftTeams.settings.setSettings({
                websiteUrl: "https://y8urGr7pChan3Ta2b.ngrok.io",
                contentUrl: "https://y8urGr7pChan3Ta2b.ngrok.io/red/",
                entityId: "tabby",
                suggestedDisplayName: "tabby"
            });
            saveEvent.notifySuccess();
        });
    }

    let saveGray = () => {
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
            microsoftTeams.settings.setSettings({
                websiteUrl: "https://y8urGr7pChan3Ta2b.ngrok.io",
                contentUrl: "https://y8urGr7pChan3Ta2b.ngrok.io/gray/",
                entityId: "tabby",
                suggestedDisplayName: "tabby"
            });
            saveEvent.notifySuccess();
        });
    }
```

Your tab code is complete. Now you can build your project. But first, *Save all* for good measure.

### Run your project from Visual Studio

- You can run the project by pressing `F5` or choosing `Start Debugging` from the `Debug` menu. Verify that `ngrok` is running and working properly by opening your browser and going to the HTTPS URL supplied by `ngrok` in your command prompt window.

>[!TIP]
>You need to have both your app in Visual Studio and ngrok running to complete this quickstart. If you need to stop running your app in Visual Studio to work on it **keep ngrok running**. Ngrok will continue to listen  and will resume routing your app's request when your app restarts in Visual Studio. If you have to restart the ngrok service it will return a new URL and you will have to update every place that uses that URL.

### Upload your app in Microsoft Teams with App Studio

- Open `Microsoft Teams` using the [web based version](https://teams.microsoft.com) so that you can inspect your front-end code using your browser's developer tools.

- Open App studio and click on the `Manifest editor` tab.

- Select the *Import an existing app* tile in the Manifest Editor to begin updating the app package for your tab. Recall that the source code comes with its own pre-made manifest and the `.csproj file` contains code to create an app package when the project is built. The name of your app package is *tab.zip*. You can search your local machine's file explorer or switch to Visual Studio `Folder View` to find your zip file's location. It should be found here:

 `/bin/Debug/netcoreapp2.2/tab.zip`

- Upload `tab.zip` to App Studio.

### Update your app package with Manifest Editor

- Once you've uploaded your app into Teams, you will need to configure it to show content.

- Click on the tile for your newly imported tab in the right panel of the Manifest Editor welcome page.

There's a list of steps in the left-hand side of the Manifest editor, and on the right a list of properties that need to be filled in for each of those steps. Much of the information has been provided by your `manifest.json` file but there are a few fields that you will need to update:

#### Details: App details

- In the **Developer information** field update the `Website URL` with your `ngrok` HTTPS URL.

- In the **App URLs** field update the `Privacy statement` and `Terms of use` URLs with your `ngrok` HTTPS URL. Remember to include the */privacy* and */tou* parameters at the end of the URLs.

#### Capabilities: 

- Click on *Tabs*.

##### Team Tab

- Under `Team Tab` click on the (**&#8226;&#8226;&#8226;**) button under the `Tab configuration url` field and select &#128393; `Edit`.
- Update the `Configuration URL` with your `ngrok` HTTPS URL. Remember to include the */channelgroup* parameter at the end of the URL.

#### Finish

##### Domains and permissions

The `Domains from your tabs` should contain only your ngrok URL without the HTTPS prefix, similar to `y8urGr7pChan3Ta2b.ngrok.io/`.

##### Test and distribute

- Click ![install](/microsoftteams/platform/assets/images/tab-images/install-button.png).

>[!IMPORTANT]
>In the `Description` field on the right you will see the following warning:\
&#9888; "**The 'validDomains' array cannot contain a tunneling site.**" <br>**The warning can be ignored while you are testing your app.** \
After your channel/group has been uploaded to Microsoft teams, via ngrok, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends . \
**Remember to serve your tab on your hosted website prior to submission to the Teams app store for approval**.

- In the pop-up window's `Add to a team or chat` field enter your Teams team and click ![install](/microsoftteams/platform/assets/images/tab-images/install-button.png)

- In the next pop-up window choose the team channel where you would like the tab displayed and click ![set up](/microsoftteams/platform/assets/images/tab-images/setUp-button.png.

- In the final pop-up window select a value for the tab page (either a red or gray icon) and click ![save](/microsoftteams/platform/assets/images/tab-images/save-button.png).

- To view, select your new tab from the tab bar.

### Nice work! You just extended Microsoft Teams with a custom channel/group tab.
