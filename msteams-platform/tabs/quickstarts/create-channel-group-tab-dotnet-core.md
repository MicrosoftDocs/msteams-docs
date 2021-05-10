---
title: "Create a Channel and Group Tab with ASP.NET Core" 
author: laujan
description: A quickstart guide to creating a custom channel and group tab with ASP.NET Core.
localization_priority: Normal
ms.topic: quickstart 
ms.author: lajanuar
---
# Create a custom channel or group tab using C# and ASP.NETCore

This quickstart takes you through the steps to create a custom channel or group tab with C# and ASP.NetCore Razor pages, and helps you finalize your app manifest and deploy your tab in Teams using [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md).

## What you'll learn

* Review the source code.
* Update your application.
* Establish a secure tunnel using ngrok.
* Upload your application to Teams using App Studio.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

## Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple project to get you started. To retrieve the source code you can download the zip folder and extract the files or clone the following sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

In Visual Studio, navigate to  **File** **Open** and select **project/solution**. Navigate to the tab application directory and open **ChannelGroupTab.sln**.

To build and run your application press **F5** or select **Start Debugging** from the **Debug** menu. In a browser enter the following URLs and verify the application loaded properly:

* http://localhost:44355
* http://localhost:44355/privacy
* http://localhost:44355/tou

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

### Index.cshtml

ASP.NETCore treats *Index* files as default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** is displayed as the home page for your application.

### Tab.cs

This C# file contains a method that is called from **Tab.cshtml** during configuration.

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

## Update your application

> [!Note]
> In *Tab.cshtml* the application presents the user with two buttons to indicate the tabs with red or gray icon. Choosing the **Select Gray** or **Select Red** button fires `saveGray()` or `saveRed()`. It also sets `settings.setValidityState(true)`, and enables the **Save** button on the configuration page. This code lets Teams know that you have satisfied the configuration requirements and the installation can proceed. On save, the parameters of `settings.setSettings` are set, and `saveEvent.notifySuccess()` is called to indicate that the content URL has successfully resolved.

[!INCLUDE [dotnet-update-app](~/includes/tabs/dotnet-update-chan-grp-app.md)]

## Upload your tab to Teams with App Studio

>[!Note]
> We use App Studio to edit your **manifest.json** file and upload the completed package to Teams. You can edit the **manifest.json** file manually and build the solution to create a **tab.zip** file to upload.

**To upload your tab**

1. Open Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

1. Open App studio and select the **Manifest editor** tab.

1. Select the **Import an existing app** tile in the Manifest editor to update the app package for your tab. The source code comes with its own partially complete manifest. The name of your app package is **tab.zip**. It must be found here:

    ```bash
    /bin/Debug/netcoreapp2.2/tab.zip
    ```

1. Upload **tab.zip** to App Studio.

### Update your app package with Manifest editor

You must configure your app package using App Studio.

* Select the tile for your newly imported tab in the right panel of the Manifest editor welcome page.

There are list of steps in the left-hand side and list of properties on the right that must have values for each step in the Manifest editor. Much of the information has been provided by your *manifest.json* but there are few fields that you need to update:

#### Details: App details

In the *App details* section

- Under *Identification* select ***Generate*** to replace the placeholder id with the required GUID for your tab.

- Under *Developer information* update the **Website URL** field with your *ngrok* HTTPS URL.

- Under *App URLs* update the **Privacy statement** and **Terms of use** URL fields with your *ngrok* HTTPS URL. Remember to include the */privacy* and */tou* paths at the end of the URLs.

#### Capabilities: Tabs

In the *Tabs* section:

- Under *Team Tab* select **Add**.

- In the Team tab pop-up window, update the *Configuration URL* to `https://<yourngrokurl>/tab`.

- Select the *can update configuration? Team*, and *Group chat* check boxes.

- Select **Save**.

#### Finish: Domains and permissions

In the *Domains and permissions* section, the *Domains from your tabs* field must contain your ngrok URL without the HTTPS prefix - `<yourngrokurl>.ngrok.io/`.

#### Finish: Test and distribute

>[!IMPORTANT]
>In a **Description** field on the right, the following warning is displayed:
>
>&#9888; "**The 'validDomains' array cannot contain a tunneling site...**"
>
>This warning can be ignored while testing your tab.

In the *Test and distribute* section:

- Select **Install**.

- In the pop-up window's *Add to a team or chat* field, enter your team and select **Install**.

- In the next pop-up window choose the team channel where you would like the tab displayed and select **Set up**.

- In the final pop-up window select a value for the tab page (either a red or gray icon) and select **Save**.

## View your channel or group tab

Navigate to the team where you installed the tab, and select the tab from the tab bar. The page selected during the configuration is displayed.

