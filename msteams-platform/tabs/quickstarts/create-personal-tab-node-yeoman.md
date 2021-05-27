---
title: "Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a personal tab with the Yeoman Generator for Microsoft Teams.
localization_priority: Normal
ms.topic: quickstart
ms.author: lajanuar
---

# Create a personal tab in Microsoft Teams

Create a Personal tab using the following platforms in Microsoft Teams

# [Node.js](#tab/nodejs)

This quickstart takes you through the steps to create a custom personal tab using Node.js and the Teams Yeoman generator.

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

### What you'll learn

* Generate a project.
* Create personal tab.
* Build and run your application.
* Establish a secure tunnel using ngrok.
* Upload the application to Teams.

[!INCLUDE [node-js-yeoman-prereq](~/includes/tabs/node-js-yeoman-prereq.md)]

**Create a configurable or static tab**
Use the arrow keys to select static tab.

> [!IMPORTANT]
> The path component **yourDefaultTabNameTab** referenced in this quickstart is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**.
>
> For example: DefaultTabName: **MyTab** => **/MyTabTab/**

### Create a personal tab

To add a personal tab to your application, you must create a content page and update the existing files.

**To create a personal tab**

1. Open code editor, create a new HTML file, **personal.html** and add the following markup:

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>
                <!-- Todo: add your a title here -->
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- inject:css -->
            <!-- endinject -->
        </head>
            <body>
                <h1>Personal Tab</h1>
                <p><img src="/assets/icon.png"></p>
                <p>This is your personal tab!</p>
            </body>
    </html>
    ```

1. Save the HTML file in your application's **web** folder.

    ```bash
    ./src/app/web/<yourDefaultTabNameTab>/personal.html
    ```

1. Open **manifest.json** in your code editor.

    ```bash
    ./src/manifest/manifest.json/
   ```

1. Add the following to the empty `staticTabs` array (`staticTabs":[]`) and add the following JSON object:

    ```json
    {
        "entityId": "personalTab",
        "name": "Personal Tab",
        "contentUrl": "https://{{HOSTNAME}}/<yourDefaultTabNameTab>/personal.html",
        "websiteUrl": "https://{{HOSTNAME}}",
        "scopes": ["personal"]
    }

    ```


1. Update the `contentUrl` path component `yourDefaultTabNameTab` with your actual tab name.

1. Save the updated **manifest.json**.

1. Your content page must be served in an IFrame. Open **Tab.ts** in your code editor.

    ```bash
    ./src/app/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following to the list of IFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultAppName>TabNameTab>/personal.html")
    ```

1. Save the updated **Tab.ts** file. Your tab code is complete.

### Build and run your application

Perform the following steps through command prompt in your project directory:

[!INCLUDE [node-js-yeoman-gulp-tasks](~/includes/tabs/node-js-yeoman-gulp-tasks.md)]

4. Navigate to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view your personal tab.

    ![personal tab screenshot](/microsoftteams/platform/assets/images/tab-images/personalTab.PNG)

### Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires your tab content to be available from the cloud using HTTPS endpoints. Teams does not allow local hosting, you must either publish your tab to a public URL or use a proxy that exposes your local port to an internet-facing URL.

To test your tab extension, you must use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that creates a tunnel to your local web server's publicly available HTTPS endpoints.

Your server's web endpoints are available during the current session on your local machine. When the machine is shut down or goes to sleep, the service is no longer available.

In your command prompt, exit localhost and enter the following:

```bash    
gulp ngrok-serve
```

> [!IMPORTANT]
> When your tab is uploaded to Microsoft Teams through *ngrok* and successfully saved, you can view your tab in Teams until your tunnel session ends.

### Upload your application to Teams

1. Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

1. In the *YourTeams* panel on the left, select the `...` menu next to the team that you are using to test your tab and select **Manage team**.

    ![Manage team screenshot](~/assets/images/tab-images/manage-team.png)

1. In the main panel select **Apps** from the tab bar and select **Upload a custom app** located in the lower left-hand corner of the page.
 
    ![Upload a custom app screenshot](~/assets/images/tab-images/upload-custom-app.png)

1. Open your project directory, browse to the **./package** folder, select the zip folder, right-click, and select **Open**. Your tab is uploaded into Teams.

### View your personal tabs

Select the `...` menu from the left panel of Teams, and select your application from the list.

# [ASP.NET Core](#tab/aspnetcore)

## Create a personal tab using ASP.NET Core

This quickstart takes you through the steps to create a custom personal tab using C#, ASP.NET Core and ASP.NET Core MVC. It also helps you finalize your app manifest and upload your tab in Teams using [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md).

### What you'll learn

* Review the source code.
* Update your application.
* Establish a secure tunnel using ngrok.
* Upload your application to Teams using App Studio.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

### Get the source code

We have provided the following simple project to get you started:

[Personal Tab](https://github.com/OfficeDev/microsoft-teams-sample-tabs/tree/master/PersonalTab)

In a command prompt create a new directory for your tab project. To retrieve the source code you can download the zip folder and extract the files or clone the following sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

In Visual Studio, navigate to the **File**, **Open** and select **project/solution**. Navigate to the tab application directory and open **PersonalTab.sln**.

To build and run your application press **F5** or select **Start Debugging** from the **Debug** menu. In a browser enter the following URLs and verify the application has loaded properly:

* http://localhost:44325/
* http://localhost:44325/personal
* http://localhost:44325/privacy
* http://localhost:44325/tou

### Review the source code

#### Startup.cs

This project was created from an ASP.NET Core 2.2 Web Application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template does not enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

#### wwwroot

In ASP.NETCore, The application looks for the static files in this folder.

#### Index.cshtml

ASP.NETCore treats **index** files as default or home page for the site. When your browser URL points to the root, **index.cshtml** is displayed as the home page for your application.

### Models

*PersonalTab.cs* presents a Message object and methods that is called from *PersonalTabController* when a user selects a button in the *PersonalTab* View.

### Views

#### Home

ASP.NETCore treats *Index* files as default or home page for the site. When your browser URL points to the root of the site, *Index.cshtml* is displayed as the home page for your application.

#### Shared

The partial view markup *_Layout.cshtml* contains the application's overall page structure and shared visual elements. It also reference the Teams Library.

### Controllers

The controllers use the ViewBag property to transfer values dynamically to the Views.

### AppManifest

This folder contains the following app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app.

These must be zipped in an app package to upload your tab to Teams. Microsoft Teams loads the `contentUrl` specified in your manifest, embed it in an <iframe\>, and render it in your tab.

### .csproj

In the Visual Studio Solution Explorer window, right-click on the project and select **Edit Project File**. At the bottom of the file, see the following code that creates and updates your zip folder when the application builds:

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

[!INCLUDE  [dotnet-update-personal-app](~/includes/tabs/dotnet-update-personal-app.md)]

[!INCLUDE [dotnet-ngrok-intro](~/includes/tabs/dotnet-ngrok-intro.md)]

**To establish a secure tunnel**

In a command prompt, navigate to the root of your project directory run the following command:

```bash
ngrok http https://localhost:44325 -host-header="localhost:44325"
```

Ngrok listens the request from the internet and routes to your application when it is running on port 44325.  It must resemble `https://y8rPrT2b.ngrok.io/` where *y8rPrT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

You must keep the command prompt while ngrok is running, you need it later to write down the URL.

Verify that **ngrok** is up and running by opening your browser and navigating to your content page through the ngrok HTTPS URL provided in your command prompt window.

>[!TIP]
>You must run your application in Visual Studio and ngrok to complete this quickstart. When you need to stop running your application in Visual Studio to work on it, **keep ngrok running**. It continues to listen and resume routing your application's request to Visual Studio. When you restart the ngrok service, it returns the new URL, and you need to update all locations that use the old URL.

### Run your application

- In Visual Studio press **F5** or select **Start Debugging** from your application's **Debug** menu.

[!INCLUDE [dotnet-personal-use-appstudio](~/includes/tabs/dotnet-personal-use-appstudio.md)]


# [ASP.NET Core MVC](#tab/aspnetcoremvc)

## Create a personal tab using C# and ASP.NETCore MVC

This quickstart takes you through the steps to create a custom personal tab with C# and ASP.NetCore MVC, and helps you finalize your app manifest and deploy your tab in Teams using [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md).

## What you'll learn

* Review the source code.
* Update your application.
* Establish a secure tunnel using ngrok.
* Upload your application to Teams using App Studio.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

## Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple project to get you started. To retrieve the source code, download the zip folder and extract the files or clone the following sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

In Visual Studio, navigate to the  **File** **Open** and select **project/solution**. Navigate to the tab application directory and open **PersonalTabMVC.sln**.

To build and run your application press **F5** or select **Start Debugging** from the **Debug** menu. In a browser enter the following URLs and verify the application has loaded properly:

http://localhost:44335
http://localhost:44335/privacy
http://localhost:44335/tou

## Review the source code

### Startup.cs

This project was created from an ASP.NETCore 2.2 Web Application empty template with the *Advanced - Configure for HTTPS* check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. The empty template does not enable serving static content by default, so the following static files middleware is added to the `Configure()` method:

``` csharp
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

### wwwroot

In ASP.NETCore, the application looks for the static files in this folder.

### AppManifest

This folder contains the following required app package files:

* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A **manifest.json** file that specifies the attributes of your app.

These files must be zipped in an app package to upload your tab to Teams. Microsoft Teams loads the `contentUrl` specified in your manifest, embed it in an <iframe>, and render it in your tab.

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

### Models

**PersonalTab.cs** presents a Message object and methods that will be called from *PersonalTabController* when a user selects a button in the **PersonalTab** View.

### Views

#### Home

ASP. NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** will be displayed as the home page for your application.

#### Shared

The partial view markup *_Layout.cshtml* contains the application's overall page structure and shared visual elements. It also reference the Teams Library.
---