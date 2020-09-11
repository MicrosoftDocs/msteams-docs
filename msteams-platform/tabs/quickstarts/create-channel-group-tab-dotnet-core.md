---
title: "Create a Channel and Group Tab with ASP.NET Core" 
author: laujan
description: A quickstart guide to creating a custom channel and group tab with ASP.NET Core.
ms.topic: quickstart 
ms.author: la.januari
---
# Create a Custom Channel and Group Tab with ASP.NET Core

In this quickstart we'll walk-through creating a custom channel/group tab with C# and ASP.Net Core Razor page. We'll also use [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md) to finalize your app manifest and deploy your tab to Teams.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

## Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple project to get you started. To retrieve the source code you can download the zip folder and extract the files or clone the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

Once you have the source code, open Visual Studio and select **Open a project or solution**. Navigate to the tab application directory and open **ChannelGroupTab.sln**.

To build and run your application press **F5** or choose **Start Debugging** from the **Debug** menu. In a browser navigate to the URLs below and verify the application loaded properly:

- `http://localhost:44355`
- `http://localhost:44355/privacy`
- `http://localhost:44355/tou`

## Review the source code

### Startup.cs

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

### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

### Index.cshtml

ASP.NET Core treats files called *Index* as the default/home page for the site. When your browser URL points to the root of the site, **Index.cshtml** will be displayed as the home page for your application.

### Tab.cs

This C# file contains a method that will be called from **Tab.cshtml** during configuration.

### AppManifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app.

These files need to be zipped in an app package for use in uploading your tab to Teams. When a user chooses to add or update your tab, Microsoft Teams will load the `configurationUrl` specified in your manifest, embed it in an IFrame, and render it in your tab.

### .csproj

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

## Update your application

Within *Tab.cshtml* the application presents the user with two option buttons for displaying the tab with either a red or gray icon. Choosing the **Select Gray** or **Select Red** button fires `saveGray()` or `saveRed()`, respectively, sets `settings.setValidityState(true)`, and enables the **Save** button on the configuration page. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of `settings.setSettings` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

[!INCLUDE [dotnet-update-app](~/includes/tabs/dotnet-update-chan-grp-app.md)]

