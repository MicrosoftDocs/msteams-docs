---
title: "Create a Channel and Group Tab with ASP.NET Core" 
author: laujan
description: A quickstart guide to creating a custom channel and group tab with ASP.NET Core.
localization_priority: Normal
ms.topic: quickstart 
ms.author: lajanuar
---

# Create a custom channel or group tab using C# ASP.NET Core and ASP.Net Core MVC

This quickstart takes you through the steps to create a custom channel or group tab with C#, ASP.NET Core Razor pages, and ASP.NET Core MVC. It also helps you finalize your app manifest and deploy your tab in Teams using [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md).

## What you'll learn

* Review the source code.
* Update your application.
* Establish a secure tunnel using ngrok.
* Upload your tab to Teams using App Studio.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

## Get the source code

We have provided the following simple projects to get you started:

[Channel Group Tab](https://github.com/OfficeDev/microsoft-teams-sample-tabs/tree/master/channelGroupTab)

[Channel Group Tab MVC](https://github.com/OfficeDev/microsoft-teams-sample-tabs/tree/master/ChannelGroupTabMVC)

Open command prompt and create a new directory for your tab project. To retrieve the source code you can download the zip folder and extract the files or clone the following sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

# [ASP.NET Core](#tab/aspnetcore)

In Visual Studio, navigate to  **File** **Open** and select **project/solution**. Navigate to the tab application directory and open **ChannelGroupTab.sln**.

To build and run your application press **F5** or select **Start Debugging** from the **Debug** menu. In a browser enter the following URLs and verify the application loaded properly:

* http://localhost:44355
* http://localhost:44355/privacy
* http://localhost:44355/tou

# [ASP.NET Core MVC](#tab/aspnetcoremvc)

In Visual Studio, navigate to  **File** **Open** and select **project/solution**. Navigate to the tab application directory and open **ChannelGroupTabMVC.sln**.

To build and run your application press **F5** or choose **Start Debugging** from the **Debug** menu. In a browser enter the following URLs and verify that the application loaded properly:

* `http://localhost:44360`
* `http://localhost:44360/privacy`
* `http://localhost:44360/tou`

---

## Review the source code

### Startup.cs

This project was created from an ASP.NETCore 2.2 Web Application empty template with the *Advanced - Configure for HTTPS* check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. The empty template does not enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

In ASP.NETCore, the web root folder is where the application looks for static files.

# [ASP.NET Core](#tab/aspnetcore)

### Index.cshtml

ASP.NETCore treats *Index* files as default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** is displayed as the home page for your application.

### Tab.cs

This C# file contains a method that is called from **Tab.cshtml** during configuration.

# [ASP.NET Core MVC](#tab/aspnetcoremvc)

### Models

*ChannelGroup.cs* presents a Message object and methods that is called from the Controllers during configuration.

### Views

#### Home

ASP.NETCore treats *Index* files as default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** is displayed as the home page for your application.

#### Shared

The partial view markup *_Layout.cshtml* contains the application's overall page structure and shared visual elements. It also reference the Teams Library.

### Controllers

The controllers use the ViewBag property to transfer values dynamically to the Views.

---

### AppManifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app.

These files must be zipped in an app package to upload your tab to Teams. When a user add or updates the tab, Microsoft Teams loads the `configurationUrl` specified in your manifest, embed it in an IFrame, and render it in your tab.

### .csproj

In the Visual Studio Solution Explorer window, right-click on the project and select **Edit Project File**. At the bottom of the file, see the code that creates and updates your zip folder when the application builds:

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

* Open a command prompt in the root of your project directory and run the following command:

    ```bash
    ngrok http https://localhost:44355 -host-header="localhost:44355"
    ```

* Ngrok listen to requests from the internet and route them to your application when it is running on port 44355. It must resemble `https://y8rCgT2b.ngrok.io/` where *y8rCgT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

* You need to keep the command prompt while ngrok is running, you need it later to write down the URL.

## Update your application

In *Tab.cshtml* the application presents the user with two buttons to indicate the tabs with red or gray icon. Choosing the **Select Gray** or **Select Red** button fires `saveGray()` or `saveRed()`. It also sets `settings.setValidityState(true)`, and enables the **Save** button on the configuration page. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of `settings.setSettings` are set, and `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

[!INCLUDE [dotnet-update-app](~/includes/tabs/dotnet-update-chan-grp-app.md)]

## View your channel or group tab

Navigate to the team where you installed the tab, and select the tab from the tab bar. The page selected during the configuration is displayed.

## Next step

> [!div class="nextstepaction"]
> [Create a Custom Channel and Group Tab with ASP.NETCore MVC](~/tabs/quickstarts/create-channel-group-tab-dotnet-core-mvc.md)
