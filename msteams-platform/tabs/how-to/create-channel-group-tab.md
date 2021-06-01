---
title: "Create a custom channel and group Tab with Node.js and the Yeoman Generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a channel and group tab with the Yeoman Generator for Microsoft Teams.
localization_priority: Normal
ms.topic: quickstart
ms.author: lajanuar
---

# Create a channel or group tab

You can create a channel or group tab using Node.js and the Yeoman Generator, using ASP.NETCore, and using ASP.NETCore MVC.

## Create a custom channel and group tab using Node.js and the Yeoman Generator

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

In this quickstart we'll walk-through creating a custom channel and group tab using the [Teams Yeoman generator](https://github.com/OfficeDev/generator-teams/).

[!INCLUDE [node-js-yeoman-prereq](~/includes/tabs/node-js-yeoman-prereq.md)]

**Do you want to create a configurable or static tab?**

Use the arrow keys to select configurable tab.

**What scopes do you intend to use for your Tab?**

You can select a Team and/or a group chat

**Do you want this tab to be available in SharePoint Online? (Y/n)** 

Select **n**.

>[!IMPORTANT]
>The path component **yourDefaultTabNameTab**, referenced in this quickstart, is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**.
>
>For example: DefaultTabName: **MyTab** => **/MyTabTab/**

In your project directory, navigate to the following:

```bash
./src/app/scripts/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.tsx
```

That is where you'll find your tab logic. Locate the `render()` method and add the following `<div>` tag and content to the top of the `<PanelBody>` container code:

```html
    <PanelBody>
        <div style={styles.section}>
            Hello World! Yo Teams rocks!
        </div>
    </PanelBody>
```

Make sure to save the updated file.

### Build and run your application

Open a command prompt in your project directory to complete the next tasks.

[!INCLUDE [node-js-yeoman-gulp-tasks](~/includes/tabs/node-js-yeoman-gulp-tasks.md)]

To view your tab configuration page go to `https://localhost:3007/<yourDefaultAppNameTab>/config.html`. You should see the following:

![configuration page screenshot](~/assets/images/tab-images/configurationPage.png)

### Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires that your tab content be available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting, therefore, you need to either publish your tab to a public URL or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension, you'll use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

In your command prompt, exit localhost and enter the following:

```bash
gulp ngrok-serve
```

> [!IMPORTANT]
> After your tab has been uploaded to Microsoft teams and successfully saved, you can view it in the tabs gallery, add it to the tabs bar, and interact with it until your ngrok tunnel session ends. If you restart your ngrok session, you'll need to update your app with the new URL.

### Upload your application to Teams

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).
- In the *YourTeams* panel on the left, select the `...` menu next to the team that you're using to test your tab and choose **Manage team**.
- In the main panel select **Apps** from the tab bar and choose **Upload a custom app** located in the lower right-hand corner of the page.
- Open your project directory, browse to the **./package** folder, select the app package zip folder and choose **Open**. Your tab will upload into Teams.
- Return to your team, choose the channel where you would like to display the tab, select ➕ from the tab bar, and choose your tab from the gallery.
- Follow the directions for adding a tab. Note that there's a custom configuration dialog for your channel/group tab.
- Select **Save** and your tab will be added to the channel's tab bar.

## Create a custom channel and group tab with ASP.NETCore

In this quickstart we'll walk-through creating a custom channel/group tab with C# and ASP.Net Core Razor page. We'll also use [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md) to finalize your app manifest and deploy your tab to Teams.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

### Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple project to get you started. To retrieve the source code you can download the zip folder and extract the files or clone the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

Once you have the source code, open Visual Studio and select **Open a project or solution**. Navigate to the tab application directory and open **ChannelGroupTab.sln**.

To build and run your application press **F5** or choose **Start Debugging** from the **Debug** menu. In a browser navigate to the URLs below and verify the application loaded properly:

- `http://localhost:44355`
- `http://localhost:44355/privacy`
- `http://localhost:44355/tou`

### Review the source code

#### Startup.cs

This project was created from an ASP.NET Core 2.2 Web Application empty template with the *Advanced - Configure for HTTPS* check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

#### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

#### Index.cshtml

ASP.NET Core treats files called *Index* as the default/home page for the site. When your browser URL points to the root of the site, **Index.cshtml** will be displayed as the home page for your application.

#### Tab.cs

This C# file contains a method that will be called from **Tab.cshtml** during configuration.

#### AppManifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app.

These files need to be zipped in an app package for use in uploading your tab to Teams. When a user chooses to add or update your tab, Microsoft Teams will load the `configurationUrl` specified in your manifest, embed it in an IFrame, and render it in your tab.

#### .csproj

In the Visual Studio Solution Explorer window right-click on the project and select **Edit Project File**. At the bottom of the file you'll see the code that creates and updates your zip folder when the application builds:

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

[!INCLUDE [dotnet-ngrok-intro](~/includes/tabs/dotnet-ngrok-intro.md)]

- Open a command prompt in the root of your project directory and run the following command:

    ```bash
    ngrok http https://localhost:44355 -host-header="localhost:44355"
    ```

- Ngrok will listen to requests from the internet and will route them to your application when it is running on port 44355. It should resemble `https://y8rCgT2b.ngrok.io/` where *y8rCgT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

- Be sure to keep the command prompt with ngrok running and to make note of the URL — you'll need it later.

### Update your application

Within *Tab.cshtml* the application presents the user with two option buttons for displaying the tab with either a red or gray icon. Choosing the **Select Gray** or **Select Red** button fires `saveGray()` or `saveRed()`, respectively, sets `settings.setValidityState(true)`, and enables the **Save** button on the configuration page. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of `settings.setSettings` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

[!INCLUDE [dotnet-update-app](~/includes/tabs/dotnet-update-chan-grp-app.md)]

## Create a Custom Channel and Group Tab with ASP.NET Core MVC

In this quickstart we'll walk-through creating a custom channel/group tab with C# and ASP.Net Core MVC. We'll also use [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md) to finalize your app manifest and deploy your tab to Teams.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

### Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple [Channel Group Tab](https://github.com/OfficeDev/microsoft-teams-sample-tabs/tree/master/ChannelGroupTabMVC) project to get you started. To retrieve the source code you can download the zip folder and extract the files or clone the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

Once you have the source code, open Visual Studio and select **Open a project or solution**. Navigate to the tab application directory and open **ChannelGroupTabMVC.sln**.

To build and run your application press **F5** or choose **Start Debugging** from the **Debug** menu. In a browser, navigate to the URLs below and verify that the application loaded properly:

- `http://localhost:44360`
- `http://localhost:44360/privacy`
- `http://localhost:44360/tou`

### Review the source code

#### Startup.cs

This project was created from an ASP.NET Core 2.2 Web Application empty template with the *Advanced - Configure for HTTPS* check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

#### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

#### AppManifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app.

These files need to be zipped in an app package for use in uploading your tab to Teams.

#### .csproj

In the Visual Studio Solution Explorer window right-click on the project and select **Edit Project File**. At the bottom of the file you'll see the code that creates and updates your zip folder when the application builds:

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

#### Models

*ChannelGroup.cs* presents a Message object and methods that will be called from the Controllers during configuration.

#### Views

##### Home

ASP.NET Core treats files called *Index* as the default/home page for the site. When your browser URL points to the root of the site, **Index.cshtml** will be displayed as the home page for your application.

##### Shared

The partial view markup *_Layout.cshtml* contains the application's overall page structure and shared visual elements. It will also reference the Teams Library.

#### Controllers

The controllers use the ViewBag property to transfer values dynamically to the Views.

[!INCLUDE [dotnet-ngrok-intro](~/includes/tabs/dotnet-ngrok-intro.md)]

- Open a command prompt in the root of your project directory and run the following command:

    ```bash
    ngrok http https://localhost:443560 -host-header="localhost:44360"
    ```

- Ngrok will listen to requests from the internet and will route them to your application when it is running on port 44355.  It should resemble `https://y8rCgT2b.ngrok.io/` where *y8rCgT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

- Be sure to keep the command prompt with ngrok running and to make note of the URL — you'll need it later.

### Update your application

Within **Tab.cshtml** the application presents the user with two option buttons for displaying the tab with either a red or gray icon. Choosing the **Select Gray** or **Select Red** button fires `saveGray()` or `saveRed()`, respectively, sets `settings.setValidityState(true)`, and enables the **Save** button on the configuration page. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of `settings.setSettings` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

[!INCLUDE [dotnet-update-app](~/includes/tabs/dotnet-update-chan-grp-app.md)]
