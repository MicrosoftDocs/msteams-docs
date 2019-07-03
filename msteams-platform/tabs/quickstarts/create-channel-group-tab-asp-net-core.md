---
title: "Quickstart: Create a Channel and Group Tab with ASP.NET Core" 
author: laujan 
description: A quickstart guide to creating a channel and group tab with ASP.NET Core. 
ms.topic: quickstart 
ms.author: laujan 
---
# Quickstart: Create a Channel and Group Tab with ASP.NET Core

Custom tabs enable you to embed your hosted web content directly into Microsoft Teams and add Teams-specific functionality via your  [Teams App Package](foo.md) (see [What are custom tabs in Microsoft Teams?](/msteams-platform/tabs/what-are-custom-tabs.md)). There are two types of tabs available in Teams - channel/group and personal. A channel/group tab delivers content to channels and group chats and are a great way to create collaborative spaces around dedicated web-based content. A channel/group tab can be pinned to the tabs bar located at the top of the channel and each channel or group chat can have its own tabs to support specific focus areas. An app can only have one channel/group tab.

In this quickstart we'll walk-through creating a custom channel/group tab with C# and [ASP.Net Core](AspNetCore.Docs/aspnetcore/index.md) [Razor Pages](/aspnet/AspNetCore.Docs/aspnetcore/mvc/views/razor.md). When a user chooses to add or update your tab, Microsoft Teams will load the configurationUrl, specified in your manifest, within an IFrame and render it in your channel or group chat.You will also use App Studio for Microsoft Teams [App Studio for Microsoft Teams](/msteams-platform/get-started/get-started-app-studio.md) to test your tab's Teams integration.

## Prerequisites

- To complete this quickstart you will need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled. To learn more, see [Manage Microsoft Teams settings for your organization](/OfficeDocs-SkypeForBusiness/Teams/enable-features-office-365.md). If you don't currently have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription will remain active as long as you're using it for ongoing development (see [Welcome to the Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program.md).

- You will use the App Studio for Microsoft Teams to import your app package to Teams. To install App Studio in Teams click **Apps** ![Store App](/msteams-docs/platform/assets/storeApp.png) at the bottom-left corner of the app, and search for App Studio. Once you find the tile for App Studio, click on it and choose install in the popup dialog box.

- You will also need a [GitHub](https://github.com) account, so that you can get a copy of the source code for for this project.

In addition, this project requires that you have the following installed in your development environment:

- The Visual Studio 2019 IDE with the `.NET CORE cross-platform development` workload installed. If you don't already have Visual Studio, you can download and install the latest [Microsoft Visual Studio Community](https://visualstudio.microsoft.com/downloads) version for free.

![screenshot: visual studio install options](/msteams-docs/platform/assets/images/tab-images/workloads.png)

- The [Ngrok](https://ngrok.com/docs) reverse proxy tool. You will use ngrok to create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Go to https://ngrok.com/download to get the download for your environment. You will use ngrok to create a tunnel to your locally running web server's publicly-available HTTPS endpoints.

## Get the source code for your project

Open a command prompt and create a new directory for your tab project. You can find the GitHub repository for this quickstart at [GitHubRepository foo.md](https:///github.com/MicrosoftDocs). Navigate to your new directory and type the following command to [clone](https://help.github.com/en/articles/cloning-a-repository) the sample repository to your local machine:

```bash
git clone https://github.com/MicrosoftDocs/CreateChannelGroupTabNetCore/foo.md
```

Once the repository is cloned, open the solution file, foo.md, in Visual Studio: and click `Build Solution` from the `Build` menu. Run the sample by pressing `F5` or choosing `Start Debugging` from the `Debug` menu and navigate to the following URLs to verify that the app URLS are loading:

- `http://localhost:44311`
- `http://localhost:44311/privacy`
- `http://localhost:44311/tou`

## Explore the source code files

This project was created from an ASP.NET Core web application empty template. The empty template doesn't enable serving static content by default, however, your project will be serving static content: HTML, CSS, and images.  In addition, since Razor pages are a subset of the ASP.NET Core MVC framework and we need to register the MVC services to add the many components to the service collection that MVC and, therefore, Razor Pages require. To do this, in the `Startup.cs` file,  we added the static files middleware to the `Configure()` method and added the dependency injection framework to the  `ConfigureServices()` method:

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

In the ASP.NET Core application, the default static file location is in the web root (wwwroot) folder which isn't included with the empty template. We added a new folder to the root of our project, and named it wwwroot. When the newly created folder displays in Solution Explorer it has the proper appearance and &#127760; icon (cool!). With the static files middleware added to the project, ASP.NET Core will look in the wwwroot folder of your app for static files and return them if the filename matches the request.

&#9989; wwwroot folder

open the wwwroot folder. You will see that it contains a CSS folder containing the CSS styling for our app `site.css`, an images folder containing several icons, and a library folder containing `bootstrap.css` files.

&#9989; Index.cshtml

ASP.NET core treats files called `Index` as the default page for the site. When your browser URL points to the root of the site, the Index.cshtml will be displayed. This will be your content page for your tab.

&#9989; ChannelGroup.cs

This C# file contains two simple methods that will be called from the `channelGroup.cshtml` file when the page is configured.

## Add code to existing files

&#9989; Pages folder and the  _Layout page

The Pages folder is where the framework looks for Razor Pages by default.

For your channel/group tab to display within Microsoft Teams, you must include the Microsoft Teams JavaScript client SDK and include a call to the Teams SDK - microsoftTeams.initialize() -  in your &#60;`script`&#62; tags.

 Open the pages folder and click on the Shared folder and open the _Layout.cshtml file. The _Layout file is a page that defines a shared layout for the app's Razor pages. You must include the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) in your channel/group page and include a call to the Teams SDK&mdash; `microsoftTeams.initialize()`&mdash;within your script tags. This is how your app and the Teams app communicate.

To reference the microsoftTeams library, in the _Layout Razor page,  add the markup for the latest version of the MicrosoftTeams JavaScript API (via CDN) to the bottom of the `<head>`tags section wrapped in script tags. The markup should resemble the following but may look a bit different with the latest version:

`<script src="https://unpkg.com/@microsoft/teams-js@1.4.1/dist/MicrosoftTeams.min.js" integrity="sha384-wHgBQlRj8iDw76cpan9ViEoOBiIJid4ACaE6vA2gUJPtn15GJnMmUGS+fLxKBWeI" crossorigin="anonymous"></script>`

>[!IMPORTANT]
>Do not copy/paste the &#60;script src="..." URLs from this page, they may not represent the latest version. To get the latest version of the SDK markup, always go to
https://www.npmjs.com/package/@microsoft/teams-js

&#9989; ChannelGroup.cshtml

Open the ChannelGroup.cshtml. At the bottom of the file are two buttons with `onclick` events that display a &#60;div&#62; whose contents are rendered following a call to methods in C# file, `ChannelGroup.cs`. The `colorClick()` method provides a simple configuration for the channel/group tab. Add the following inside &#60;`script`&#62; tags:

```javascript
let microSoftTeams;

    microsoftTeams.initialize();

    microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
        microSoftTeams.settings.setSettings({ contentURL: colorClick() });
        saveEvent.notifySuccess();
    });

    microsoftTeams.settings.setValidityState(true);
```

In this example, the user is presented with two option buttons for displaying either a red or gray icon. Selecting either button fires `colorClick()`, which sets `microsoftTeams.settings.setValidityState(true)` and enables the *Save* button in the tabs UI. This piece of code lets Teams know that you have satisfied the configuration, things are valid, and the installation can proceed.  Without this you'll be stuck in a loop and not able to use your app. On save, the parameters of `microsoftTeams.settings.setSettings` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.  

&#9989; manifest folder

The Manifest folder contains the following required files:

- A full color icon measuring 192 x 192 pixels color
- A transparent outline icon measuring 32 x 32 pixels.
- A manifest.json file which specifies the attributes of your tab and points to required resources like the channelGroup page.

These files will need to be zipped in an app package for use in uploading your app to teams.

In the Solution Explorer window right click on the foo.md project and click on `Edit Project File`. At the bottom of the file you will see the  code that builds your zip file when the project builds:

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

Now that your tab code is complete, you can build your project. But first, *Save all* for good measure.

## Package your app for Microsoft Teams

Microsoft Teams is an entirely cloud-based product, and thus requires your app to be available from the cloud using HTTPS endpoints. Teams doesn't allow apps to be hosted on localhost. Therefore, you need to either publish your app to a public URL, or use a proxy which will expose your local port to an internet-facing URL.

To test your tab extension you'll use [ngrok](https://ngrok.com/docs). Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

### Start ngrok

- Open a command prompt in the root of your project folder and run the following command:

```bash
ngrok http https://localhost:44311 -host-header="localhost:44311"
```

- Ngrok will listen to requests from the internet and will route them to your app when it is running on port 44311.  It should look something like `https://yo8urGro7upChann3elTa2b.ngrok.io/` where `yo8urGro7upChann3elTa2b` is replaced by the ngrok alpha-numeric URL prefix. Make note of the HTTPS ngrok address - you can copy it to `Notepad for Windows`. You will need the ngrok HTTPS address to test your app in Teams.

### Update ChannelGroup.cshtml

- Open the ChannelGroup.cshtml file
- Register your ChannelGroup page settings by updating the first two parameters of the `microsoftTeams.settings.setSettings` call as follows (where `yo8urGro7upChann3elTa2b` is replaced with your ngrok URL):

```bash
websiteUrl: "https://yo8urGro7upChann3elTa2b.ngrok.io",

contentUrl: "https://yo8urGro7upChann3elTa2b.ngrok.io/ChannelGroup",
```

### Run your project in Visual Studio

- You can run the project by pressing `F5` or choosing `Start Debugging` from the `Debug` menu. Verify that ngrok is working properly by opening your browser and going to the forwarding HTTPS URL supplied by ngrok in your command prompt window.

>[!TIP]
>You need to keep both your app in Visual Studio and ngrok running until you have completed this quickstart. If you need to stop running your app to work on it keep ngrok running. Ngrok will continue to run and will resume routing your app's request when it restarts. If you have to restart the ngrok service it will return a new address and you will have to update every place that uses that address.

### Upload your app in Microsoft Teams with App Studio

- Open `Microsoft Teams` using the [web based version](https://teams.microsoft.com) so that you can inspect your front-end code using your browser's developer tools.

- Open App studio and click on the `Manifest editor` tab.

- Select the *Import an existing app* tile in the Manifest Editor to begin updating the app package for your tab. Recall that the source code comes with its own pre-made manifest and the `.csproj file` contains code to create an app package when the project is built. The name of your app package is *tab.zip*. You can search your local machine's file explorer or switch to Visual Studio `Folder View` to find your zip file's location. It should be found here:

 `/bin/Debug/netcoreapp2.2/tab.zip`

- Upload `tab.zip` to App Studio.

### Update your app package with Manifest Editor

- Once you upload the app into Teams, you will need to configure it to show content.
- Click on the tile for your newly imported tab in the right panel of the Manifest Editor welcome page.

There is a list of steps in the left-hand side of the Manifest editor, and on the right a list of properties that need to be filled in for each of those steps. Much of the information has been provided by your `manifest.json` file but there are a few fields that you will need to update:

#### Details: App details

- In the **Developer information** field update the `Website URL` with your ngrok HTTPS URL.

- In the **App URLs** field update the `Privacy statement` and `Terms of use` URLs with your ngrok HTTPS URL. Remember to include the */privacy* and */tou* parameters at the end of the URLs.

#### Capabilities: Tabs

##### Team Tab

- Under the `Team Tab` click on the (**&#8226;&#8226;&#8226;**) button under the `Tab configuration url` field and select &#128393; `Edit`.
- Update the `Configuration URL` with your ngrok HTTPS URL. Remember to include the */channelgroup* parameter at the end of the URL.

#### Finish

##### Domains and permissions

The `Domains from your tabs` should contain only your ngrok URL without the HTTPS prefix, similar to `yo8urGro7upChann3elTa2b.ngrok.io/`.

##### Test and distribute

- Click the ![install button](/microsoftteams/platform/assets/images/tab-images/install-button.png) button.

>[!IMPORTANT]
>In the `Description` field on the right you will see the following warning:\
&#9888; "**The 'validDomains' array cannot contain a tunneling site.**" <br>**The warning can be ignored while you are testing your app.** \
After your channel/group has been uploaded to Microsoft teams, via ngrok, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends . \
**Remember to serve your tab on your hosted website prior to submission to the Teams app store for approval**.

- In the popup's `Add to a team or chat` field enter your team and click ![install button](/microsoftteams/platform/assets/images/tab-images/install-button.png).

- In the next popup choose the team channel where you would like the tab displayed and click ![set up button](/microsoftteams/platform/assets/images/tab-images/setUp-button.png.

- In the final popup select a value for the configuration page and ![save button](/microsoftteams/platform/assets/images/tab-images/save-button.png).

- To view, select your new tab from the tab bar.

### Nice work! You just extended Microsoft Teams with custom tabs
