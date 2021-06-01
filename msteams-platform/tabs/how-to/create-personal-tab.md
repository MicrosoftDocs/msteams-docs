---
title: "Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a personal tab with the Yeoman Generator for Microsoft Teams.
localization_priority: Normal
ms.topic: quickstart
ms.author: lajanuar
---

# Create a personal tab

You can create a personal tab using Node.js and the Yeoman Generator, using ASP.NETCore, and using ASP.NETCore MVC.

## Create a custom personal tab using Node.js and the Yeoman Generator

>[!NOTE]
>This quickstart follows the steps outlined in the [build Your first Microsoft Teams app](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

In this quickstart we'll walk-through creating a custom personal tab using the [Teams Yeoman generator](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App). We'll also upload the application to Team.

[!INCLUDE [node-js-yeoman-prereq](~/includes/tabs/node-js-yeoman-prereq.md)]

**Create a configurable or static tab**

Use the arrow keys to select static tab.

>[!IMPORTANT]
>The path component *yourDefaultTabNameTab*, referenced in this quickstart, is the value that you entered in the generator for *Default Tab Name* plus the word *Tab*.
>
>For example: DefaultTabName: *MyTab* => */MyTabTab/*

### Add a personal tab

To add a personal tab to this application you'll create a content page and update existing files:

- In your code editor, create a new HTML file, **personal.html** and add the following markup:

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

- Save **personal.html** in your application's **web** folder:

    ```bash
    ./src/app/web/<yourDefaultTabNameTab>/personal.html
    ```

- Open **manifest.json** in your code editor:

    ```bash
    ./src/manifest/manifest.json/
    ```

Add the following to the empty `staticTabs` array (`staticTabs":[]`) and add the following JSON object:

```json
{
    "entityId": "personalTab",
    "name": "Personal Tab ",
    "contentUrl": "https://{{HOSTNAME}}/<yourDefaultTabNameTab>/personal.html",
    "websiteUrl": "https://{{HOSTNAME}}",
    "scopes": ["personal"]
}

```

Remember to update the **"contentURL"** path component **yourDefaultTabNameTab** with your actual tab name.

- Save the updated **manifest.json**.

- Your content page must be served in an IFrame. Open **Tab.ts** in your code editor:

    ```bash
    ./src/app/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

- Add the following to the list of IFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultAppName>TabNameTab>/personal.html")
    ```

- Make sure to save the updated **Tab.ts** file. Your tab code is complete.

### Build and run Your application

Open a command prompt in your project directory to complete the next tasks.

[!INCLUDE [node-js-yeoman-gulp-tasks](~/includes/tabs/node-js-yeoman-gulp-tasks.md)]

To view your personal tab, go to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html`

>![personal tab screenshot](/microsoftteams/platform/assets/images/tab-images/personalTab.PNG)

### Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires that your tab content be available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting, therefore, you need to either publish your tab to a public URL or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension, you'll use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

In your command prompt, exit localhost and enter the following:

```bash
gulp ngrok-serve
```

> [!IMPORTANT]
> After your tab has been uploaded to Microsoft teams, via **ngrok**, and successfully saved, you can view it in Teams until your tunnel session ends.

### Upload your application to Teams

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).
- In the **YourTeams** panel on the left, select the `...` menu next to the team that you're using to test your tab and choose **Manage team**.
- In the main panel select **Apps** from the tab bar and choose **Upload a custom app** located in the lower right-hand corner of the page.
- Open your project directory, browse to the **./package** folder, select the zip folder, right-click, and choose **Open**. Your tab will upload into Teams.

### View your personal tabs

In the navigation bar located at the far-left of the Teams client, select the ellipses &#x25CF;&#x25CF;&#x25CF; and choose your app from the list.

## Create a personal tab using ASP.NETCore

In this quickstart, we'll walk-through creating a custom personal tab with C# and ASP.Net Core Razor pages. We'll also use [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md) to finalize your app manifest and deploy your tab to Teams.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

### Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple project to get you started. To retrieve the source code you can download the zip folder and extract the files or clone the sample repository into your new directory:

```bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

Once you have the source code, open Visual Studio and select **Open a project or solution**. Navigate to the tab application directory and open **PersonalTab.sln**.

To build and run your application press **F5** or choose **Start Debugging** from the **Debug** menu. In a browser navigate to the URLs below to verify the application loaded properly:

- `http://localhost:44325/`
- `http://localhost:44325/personal`
- `http://localhost:44325/privacy`
- `http://localhost:44325/tou`

### Review the source code

#### Startup.cs

This project was created from an ASP.NET Core 2.2 Web Application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

#### AppManifest folder

This folder contains the following required app package files:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A **manifest.json** file that specifies the attributes of your app.

These files need to be zipped in an app package for use in uploading your tab to Teams. Microsoft Teams will load the `contentUrl` specified in your manifest, embed it in an <iframe\>, and render it in your tab.

#### .csproj

In the Visual Studio Solution Explorer window, right-click on the project and select **Edit Project File**. At the bottom of the file you'll see the code that creates and updates your zip folder when the application builds:

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

- Open a command prompt in the root of your project directory and run the following command:

    ```bash
    ngrok http https://localhost:44325 -host-header="localhost:44325"
    ```

- Ngrok will listen to requests from the internet and will route them to your application when it is running on port 44325.  It should resemble `https://y8rPrT2b.ngrok.io/` where *y8rPrT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

- Be sure to keep the command prompt with ngrok running, and to make a note of the URL — you'll need it later.

- Verify that **ngrok** is running and working properly by opening your browser and going to your content page via the ngrok HTTPS URL that was provided in your command prompt window.

>[!TIP]
>You need to have both your application in Visual Studio and ngrok running to complete this quickstart. If you need to stop running your application in Visual Studio to work on it, **keep ngrok running**. It will continue to listen and will resume routing your application's request when it restarts in Visual Studio. If you have to restart the ngrok service it will return a new URL and you'll have to update every place that uses that URL.

#### Run your application

- In Visual Studio press **F5** or choose **Start Debugging** from your application's **Debug** menu.

[!INCLUDE [dotnet-personal-use-appstudio](~/includes/tabs/dotnet-personal-use-appstudio.md)]

## Create a custom personal tab with ASP.NET Core MVC

In this quickstart we'll walk-through creating a custom personal tab with C# and ASP.Net Core MVC. We'll also use [App Studio for Microsoft Teams](~/concepts/build-and-test/app-studio-overview.md) to finalize your app manifest and deploy your tab to Teams.

[!INCLUDE [dotnet-core-prereq](~/includes/tabs/dotnet-core-prereq.md)]

### Get the source code

Open a command prompt and create a new directory for your tab project. We have provided a simple project to get you started. To retrieve the source code you can download the zip folder and extract the files or clone the sample repository into your new directory:

``` bash
git clone https://github.com/OfficeDev/microsoft-teams-sample-tabs.git
```

Once you have the source code, open Visual Studio and select **Open a project or solution**. Navigate to the tab application directory and open **PersonalTabMVC.sln**.

To build and run your application press **F5** or choose **Start Debugging** from the **Debug** menu. In a browser navigate to the URLs below to verify that the application loaded properly:

* `http://localhost:44335`
* `http://localhost:44335/privacy`
* `http://localhost:44335/tou`

### Review the source code

#### Startup.cs

This project was created from an ASP. NET Core 2.2 Web Application empty template with the *Advanced - Configure for HTTPS* check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method:

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

#### wwwroot folder

In ASP. NET Core, the web root folder is where the application looks for static files.

#### AppManifest folder

This folder contains the following required app package files:

* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A **manifest.json** file that specifies the attributes of your app.

These files need to be zipped in an app package for use in uploading your tab to Teams. Microsoft Teams will load the `contentUrl` specified in your manifest, embed it in an IFrame, and render it in your tab.

#### .csproj

In the Visual Studio Solution Explorer window right-click on the project and select **Edit Project File**. At the bottom of the file you'll see the code that creates and updates your zip folder when the application builds:

``` xml
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

**PersonalTab.cs** presents a Message object and methods that will be called from *PersonalTabController* when a user selects a button in the **PersonalTab** View.

#### Views

##### Home

ASP. NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** will be displayed as the home page for your application.

##### Shared

The partial view markup *_Layout.cshtml* contains the application's overall page structure and shared visual elements. It will also reference the Teams Library.

#### Controllers

The controllers use the ViewBag property to transfer values dynamically to the Views.

[!INCLUDE [dotnet-update-personal-app](~/includes/tabs/dotnet-update-personal-app.md)]

[!INCLUDE [dotnet-ngrok-intro](~/includes/tabs/dotnet-ngrok-intro.md)]

* Open a command prompt in the root of your project directory and run the following command:

    ``` bash
    ngrok http https://localhost:44345 -host-header="localhost:44345"
    ```

* Ngrok will listen to requests from the internet and will route them to your application when it is running on port 44325.  It should resemble `https://y8rPrT2b.ngrok.io/` where *y8rPrT2b* is replaced by your ngrok alpha-numeric HTTPS URL.

* Be sure to keep the command prompt with ngrok running, and to make a note of the URL — you'll need it later.

* Verify that **ngrok** is running and working properly by opening your browser and going to your content page via the ngrok HTTPS URL that was provided in your command prompt window.

> [!TIP]
> You need to have both your application in Visual Studio and ngrok running to complete this quickstart. If you need to stop running your application in Visual Studio to work on it, **keep ngrok running**. It will continue to listen and will resume routing your application's request when it restarts in Visual Studio. If you have to restart the ngrok service it will return a new URL and you'll have to update every place that uses that URL.

#### Run your application

* In Visual Studio press **F5** or choose **Start Debugging** from your application's **Debug** menu.

[!INCLUDE [dotnet-personal-use-appstudio](~/includes/tabs/dotnet-personal-use-appstudio.md)]

## Next step

> [!div class="nextstepaction"]
> [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)
