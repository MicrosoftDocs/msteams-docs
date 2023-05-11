---
title: Create a channel tab or group tab
author: laujan
description: Create custom channel, group tab with Node.js, ASP.NET Core, ASP.NET Core MVC. Generate app, create package, build and run app, secret tunnel, upload to Teams and build your first app using Blazor.
ms.localizationpriority: high
ms.topic: quickstart
ms.author: lajanuar
zone_pivot_groups: teams-app-environment-blazor
---

# Create a channel tab or group tab

Channel or group tabs deliver content to channels and group chats, which helps to create collaborative spaces around dedicated web-based content.

Ensure that you have all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build your channel or group tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a custom channel or group tab with Node.js

1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing the **Node.js**:

    ```cmd
    npm install yo gulp-cli --global
    ```

2. At the command prompt, install Microsoft Teams app generator by entering the following command:

    ```cmd
    npm install generator-teams --global
    ```

## Generate your application with a channel or group tab

1. At the command prompt, create a new directory for your channel or group tab.

1. Enter the following command in your new directory to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide your values to a series of questions prompted by Microsoft Teams app generator to update your `manifest.json` file:

    :::image type="content" source="../../assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Screenshot that shows a generator to update manifest.json files.":::

<details>
<summary><b>Series of questions to update your manifest.json file</b></summary>

* **What is your solution name?**

    The solution name is your project name. You can accept the suggested name by selecting **Enter**.

* **Where do you want to place the files?**

    You're currently in your project directory. Select **Enter**.

* **Title of your Microsoft Teams app project?**

    The title is your app package name and is used in the app manifest and description. Enter a title or select **Enter** to accept the default name.

* **Your (company) name? (max 32 characters)**

    Your company name can be used in the app manifest. Enter a company name or select **Enter** to accept the default name.

* **Which manifest version would you like to use?**

    Select the default schema.

* **Quick scaffolding? (Y/n)**

    The default is yes; enter **n** to enter your Microsoft Partner ID.

* **Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)**

    This field isn't required and must be used only if you're already part of the [Microsoft Partner Network](https://partner.microsoft.com).

* **What do you want to add to your project?**

    Select **( &ast; ) A Tab**.

* **The URL to host this solution?**

    By default, the generator suggests an Azure website URL. You're only testing your app locally, so a valid URL isn't necessary.

* **Would you like show a loading indicator when your app/tab loads?**

    Choose **not** to include a loading indicator when your app or tab loads. The default is no, enter **n**.

* **Would you like personal apps to be rendered without a tab header-bar?**

    Choose **not** to include personal apps to be rendered without a tab header-bar. Default is no, enter **n**.

* **Would you like to include Test framework and initial tests? (y/N)**

    Choose **not** to include a test framework for this project. The default is no, enter **n**.

* **Would you like to include ESLint support? (y/N)**

    Choose not to include ESLint support. The default is no, enter **n**.

* **Would you like to use Azure Applications Insights for telemetry? (y/N)**

    Choose **not** to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; enter **n**.

* **Default Tab Name (max 16 characters)?**

    Name your tab. This tab name is used throughout your project as a file or URL path component.

* **What kind of Tab would you like to create?**

    Use the arrow keys to select **Configurable** tab.

* **What scopes do you intend to use for your Tab?**

    You can select a team or a group chat.

* **Do you require Microsoft Azure Active Directory (Azure AD) Single-Sign-On support for the tab?**

    Choose **not** to include Microsoft Azure Active Directory (Azure AD) Single-Sign-On support for the tab. The default is yes, enter **n**.

* **Do you want this tab to be available in SharePoint Online? (Y/n)**

    Enter **n**.

</details>

> [!IMPORTANT]
> The path component **yourDefaultTabNameTab** is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**. For example, `DefaultTabName` is **MyTab** then **/MyTabTab/**.

<!--- TBD: this info seems removed from the main branch.
* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A `manifest.json` file that specifies the attributes of your app.
--->

## Create your app package

You must have an app package to build and run your application in Teams. The app package is created through a gulp task that validates the `manifest.json` file and generates the zip folder in the `./package` directory. At the command prompt, enter the following command:

```cmd
gulp manifest
```

## Build and run your application

### Build your application

Enter the following command at the command prompt to transpile your solution into the `./dist` folder:

```cmd
gulp build
```

### Run your application

1. At the command prompt, enter the following command to start a local web server:

    ```bash
    gulp serve
    ```

1. Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in your browser to view your application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. To view your tab configuration page, go to `http://localhost:3007/<yourDefaultAppNameTab>/config.html`.

    :::image type="content" source="~/assets/images/tab-images/configurationPage.png" alt-text="Tab configuration page":::

## Establish a secure tunnel to your tab

To establish a secure tunnel to your tab, exit the localhost and enter the following command:

```cmd
gulp ngrok-serve
```

> [!IMPORTANT]
> After your tab is uploaded to Microsoft Teams through **ngrok**, and successfully saved, you can view it in Teams until your tunnel session ends. If you restart your ngrok session, you must update your app with the new URL.

## Upload your application to Teams

1. Go to Teams and select **Apps**&nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Go to your project directory, browse to the **./package** folder, select the app package zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/channeltabadded.png" alt-text="Uploaded channel tab":::

1. Select **Add** in the dialog. Your tab is uploaded to Teams.

   If **Add** doesn't display in the dialog box then remove the following code from the manifest of the uploaded app package zip folder. Zip the folder again and upload it to Teams.

   ```Json
   "staticTabs": [],
   "bots": [],
   "connectors": [],
   "composeExtensions": [],
   ```

1. Follow the directions for adding a tab. There's a custom configuration dialog for your channel or group tab.
1. Select **Save** and your tab is added to the channel's tab bar.

    :::image type="content" source="~/assets/images/tab-images/channeltabuploaded.png" alt-text="Channel tab uploaded":::

    Now you've successfully created and added your channel or group tab in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a custom channel or group tab with ASP.NET Core

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

## Generate your application with a channel or group tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-channel-group** > **razor-csharp** folder and open **channelGroupTab.sln**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application has loaded properly. In a browser, go to the following URLs:

    * `https://localhost:3978/`
    * `https://localhost:3978/privacy`
    * `https://localhost:3978/tou`

<details>
<summary><b>Review the source code</b></summary>

### Startup.cs

This project was created from an ASP.NET Core 3.1 web application empty template with the **Advanced * Configure for HTTPS** check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method using the following code:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options => options.EnableEndpointRouting = false);
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

ASP.NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** is displayed as the home page for your application.

### Tab.cs

This C# file contains a method that is called from **Tab.cshtml** during configuration.

### AppManifest folder

This folder contains the following required app package files:

* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A `manifest.json` file that specifies the attributes of your app.

These files need to be zipped in an app package for use in uploading your tab to Teams. When a user chooses to add or update your tab, Teams loads the `configurationUrl` specified in your manifest, embeds it in an IFrame, and renders it in your tab.

### .csproj

In the Visual Studio Solution Explorer window, right-click on the project and select **Edit Project File**. At the end of the file, you see the following code that creates and updates your zip folder when the application builds:

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

</details>

## Establish a secure tunnel to your tab

At the command prompt in the root of your project directory, run the following command to establish a secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

Ensure that you keep the command prompt with ngrok running and make a note of the URL.

## Update your application

1. Open Visual Studio Solution Explorer and go to the **Pages** > **Shared** folder and open **_Layout.cshtml**, and add the following to the <head> tags section:

    ```html
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.2.0/js/MicrosoftTeams.min.js" 
      integrity="sha384yBjE++eHeBPzIg+IKl9OHFqMbSdrzY2S/LW3qeitc5vqXewEYRWegByWzBN/chRh" 
      crossorigin="anonymous" >
    </script>
    ```

    > [!IMPORTANT]
    > Do not copy and paste the `<script src="...">` URLs from this page, as they do not represent the latest version. To get the latest version of TeamsJS, always go to [Microsoft Teams JavaScript API](https://www.npmjs.com/package/@microsoft/teams-js).

1. Insert a call to `microsoftTeams.app.initialize();` in the `script` tag.

1. In Visual Studio Solution Explorer, go to the **Pages** folder and open **Tab.cshtml**

    Within **Tab.cshtml**, the application presents the user with two options for displaying the tab with a red or gray icon. The **Select Gray** or **Select Red** button triggers `saveGray()` or `saveRed()` respectively, sets `pages.config.setValidityState(true)`, and enables **Save** on the configuration page. This code lets Teams know that you've completed the requirements configuration and can proceed with the installation. The parameters of `pages.config.setConfig` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has been successfully resolved.

1. Update the `websiteUrl` and `contentUrl` values in each function with the HTTPS ngrok URL to your tab.

    Your code should now include the following with **y8rCgT2b** replaced with your ngrok URL:

    ```javascript
        
        let saveGray = () => {
            microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
                microsoftTeams.pages.config.setConfig({
                    websiteUrl: `https://y8rCgT2b.ngrok.io`,
                    contentUrl: `https://y8rCgT2b.ngrok.io/gray/`,
                    entityId: "grayIconTab",
                    suggestedDisplayName: "MyNewTab",
                    removeUrl: ""
                });
                saveEvent.notifySuccess();
            });
        }

        let saveRed = () => {
            microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
                microsoftTeams.pages.config.setConfig({
                    websiteUrl: `https://y8rCgT2b.ngrok.io`,
                    contentUrl: `https://y8rCgT2b.ngrok.io/red/`,
                    entityId: "redIconTab",
                    suggestedDisplayName: "MyNewTab",
                    removeUrl: ""
                });
                saveEvent.notifySuccess();
            });
        }
    ```

1. Save the updated **Tab.cshtml**.

## Build and run your application

1. In Visual Studio, select **F5** or choose **Start Debugging** from the **Debug** menu.

1. Verify that **ngrok** is running and working properly by opening your browser and going to your content page via the ngrok HTTPS URL that was provided in your command prompt window.

    > [!TIP]
    > You need to have both your application in Visual Studio and ngrok running to complete the steps provided in this article. If you need to stop running your application in Visual Studio to work on it, **keep ngrok running**. It listens and resumes routing your application's request when it restarts in Visual Studio. If you have to restart the ngrok service it returns a new URL and you have to update your application with the new URL.

<!--- TBD: This note seems to be removed from main. Commenting it for now.
> [!NOTE]
> App Studio can be used to edit your `manifest.json` file and upload the completed package to Teams. You can also manually edit the `manifest.json` file. If you do, ensure that you build the solution again to create the `tab.zip` file to upload.
--->

## Update your app package with Developer Portal

1. Go to Teams. If you use the [web-based version](https://teams.microsoft.com), you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

    <!--- TBD: This steps seems to be removed from main now so commenting it for now.
    Select **Import an existing app** in the **Manifest editor** to begin updating the app package for your tab. The source code comes with its own partially complete manifest. The name of your app package is `tab.zip`. It is available from the following path:
    --->

1. The name of your app package is `tab.zip`. It's available in the following path:

    ```bash
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select `tab.zip` and open it in the Developer Portal.

1. A default **App ID** is created and populated in **Basic information** section.

1. Add the Short and Long description for your app in **Descriptions**.

1. In **Developer Information**, add the required details and in **Website (must be a valid HTTPS URL)** give your ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou` and save.

1. In **App features**, select **Group and channel app**. Update the **Configuration URL** with `https://<yourngrokurl>/tab` and select your tab **Scope**.

1. Select **Save**.

1. In the Domains section, domains from your tabs must contain your ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

## Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar, Developer Portal informs you that your app is sideloaded successfully. The **Add** page appears for your app in Teams.

1. Select **Add to team** to Set up the tab in a team. Configure your tab and select **Save**. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/channeltabaspnetuploaded.png" alt-text="Channel tab ASPNET uploaded":::

    Now you've successfully created and added your channel or group tab in Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a custom channel or group tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

## Generate your application with a channel or group tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-channel-group** > **mvc-csharp** folder and open **ChannelGroupTabMVC.sln**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application has loaded properly. In a browser, go to the following URLs:

    * `https://localhost:3978/`
    * `https://localhost:3978/privacy`
    * `https://localhost:3978/tou`

<details>
<summary><b>Review the source code</b></summary>

### Startup.cs

This project was created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method using the following code:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc(options => options.EnableEndpointRouting = false);
}

public void Configure(IApplicationBuilder app)
{
    app.UseStaticFiles();
    app.UseMvc();
}
```

### wwwroot folder

In ASP.NET Core, the web root folder is where the application looks for static files.

### AppManifest folder

This folder contains the following required app package files:

* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A `manifest.json` file that specifies the attributes of your app.

These files need to be zipped in an app package for use in uploading your tab to Teams.

### .csproj

In the Visual Studio Solution Explorer window, right-click on the project and select **Edit Project File**. At the end of the file you, see the following code that creates and updates your zip folder when the application builds:

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

**ChannelGroup.cs** presents a message object and methods that can be called from the controllers during configuration.

### Views

These are the different views in ASP.NET Core MVC:

* Home: ASP.NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** can be displayed as the home page for your application.

* Shared: The partial view markup **_Layout.cshtml** contains the application's overall page structure and shared visual elements that also reference the Teams Library.

### Controllers

The controllers use the `ViewBag` property to transfer values dynamically to the views.

</details>

## Establish a secure tunnel to your tab

At the command prompt in the root of your project directory, run the following command to establish a secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

Ensure that you keep the command prompt with ngrok running and make a note of the URL.

## Update your application

1. Open Visual Studio Solution Explorer and go to the **Views** > **Shared** folder and open **_Layout.cshtml**, and add the following to the <head> tags section:

    ```html
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.2.0/js/MicrosoftTeams.min.js" 
      integrity="sha384yBjE++eHeBPzIg+IKl9OHFqMbSdrzY2S/LW3qeitc5vqXewEYRWegByWzBN/chRh" 
      crossorigin="anonymous" >
    </script>
    ```

    > [!IMPORTANT]
    > Do not copy and paste the `<script src="...">` URLs from this page, as they do not represent the latest version. To get the latest version of the SDK, always go to [Microsoft Teams JavaScript API](https://www.npmjs.com/package/@microsoft/teams-js).

1. Insert a call to `microsoftTeams.app.initialize();` in the `script` tag.

1. In Visual Studio Solution Explorer, go to the **Tab** folder and open **Tab.cshtml**

    Within **Tab.cshtml**, the application presents the user with two options for displaying the tab with a red or gray icon. The **Select Gray** or **Select Red** button triggers `saveGray()` or `saveRed()` respectively, sets `pages.config.setValidityState(true)`, and enables **Save** on the configuration page. This code lets Teams know that you've completed the requirements configuration and can proceed with the installation. The parameters of `pages.config.setConfig` are set. Finally, `saveEvent.notifySuccess()` is called to indicate that the content URL has been successfully resolved.

1. Update the `websiteUrl` and `contentUrl` values in each function with the HTTPS ngrok URL to your tab.

    Your code should now include the following with **y8rCgT2b** replaced with your ngrok URL:

    ```javascript

        let saveGray = () => {
            microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
                microsoftTeams.pages.config.setConfig({
                    websiteUrl: `https://y8rCgT2b.ngrok.io`,
                    contentUrl: `https://y8rCgT2b.ngrok.io/gray/`,
                    entityId: "grayIconTab",
                    suggestedDisplayName: "MyNewTab",
                    removeUrl:""
                });
                saveEvent.notifySuccess();
            });
        }
    
        let saveRed = () => {
            microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
                microsoftTeams.pages.config.setConfig({
                    websiteUrl: `https://y8rCgT2b.ngrok.io`,
                    contentUrl: `https://y8rCgT2b.ngrok.io/red/`,
                    entityId: "redIconTab",
                    suggestedDisplayName: "MyNewTab",
                    removeUrl:""
                });
                saveEvent.notifySuccess();
            });
        }
    ```

1. Make sure to save the updated **Tab.cshtml**.

## Build and run your application

1. In Visual Studio, select **F5** or choose **Start Debugging** from the **Debug** menu.

1. Verify that **ngrok** is running and working properly by opening your browser and going to your content page via the ngrok HTTPS URL that was provided in your command prompt window.

    > [!TIP]
    > You need to have both your application in Visual Studio and ngrok running to complete the steps provided in this article. If you need to stop running your application in Visual Studio to work on it, **keep ngrok running**. It listens and resumes routing your application's request when it restarts in Visual Studio. If you have to restart the ngrok service it returns a new URL and you have to update your application with the new URL.

## Update your app package with Developer Portal

1. Go to Teams. If you use the [web-based version](https://teams.microsoft.com), you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The name of your app package is **tab.zip**. It's available in the following path:

    ```bash
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in the Developer Portal.

1. A default **App ID** is created and populated in **Basic information** section.

1. Add the Short and Long description  for your app in **Descriptions**.

1. In **Developer Information**, add the required details and in **Website (must be a valid HTTPS URL)** give your ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou` and save.

1. In **App features**, select **Group and channel app**. Update the **Configuration URL** with `https://<yourngrokurl>/tab` and select your tab **Scope**.

1. Select **Save**.

1. In the Domains section, domains from your tabs must contain your ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

## Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar, Developer Portal informs you that your app is sideloaded successfully. The **Add** page appears for your app in Teams.

1. Select **Add to team** to Set up the tab in a team. Configure your tab and select **Save**. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/channeltabaspnetuploaded.png" alt-text="Channel tab ASPNET MVC uploaded":::

    Now you've successfully created and added your channel or group tab in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor lets you build interactive web UIs using C#, instead of JavaScript. You can create a tab app and a bot app  with Blazor and the latest version of Visual Studio.

:::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the blazor app displaying the tab, Bot, and Message Extension output after you've successfully completed the step-by-step blazor guide.":::

> [!NOTE]
> Teams Toolkit doesn't support the message extension capability.

Here's a list of tools you require for building and deploying your app.

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings and calls - all in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |

## Prepare development environment

After you've installed the required tools, set up the development environment.

### Install Microsoft Teams Toolkit

The Teams Toolkit helps simplify the development process with tools to provision and deploy cloud resources for your app, publish to the Teams store, and more. You can use the toolkit with Visual Studio, or as a Command Line Interface (called `teamsfx`).

# [Latest version of the Visual Studio](#tab/vs)

You can use the latest version of the Visual Studio to develop Teams apps with Blazor Server in .NET.

To install the Microsoft Teams Toolkit extension:

1. Download the latest version of the Visual Studio.
1. Open `vs_enterprise__3bed52501a604464b1eff2ce580fd4eb.exe` from your download folder.
1. Select **Continue** in the **Visual Studio Installer** page to configure your installation.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Select **ASP.NET and web development** under **Workloads**.

1. Select **Microsoft Teams development tools** under **Installation details**.

1. Select **Install**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with the option Asp.NET, web development, and Microsoft Teams development tools under installation details and install highlighted in red.":::

Your Visual Studio is installed in a few minutes.

# [Command line](#tab/cli)

To install the TeamsFx CLI, use the `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on your configuration, you may need to use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
 ```

This condition is more common on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step is normally done as part of the Node.js installer.  

You can use the CLI with the `teamsfx` command. Verify that the command is working by running `teamsfx -h`.

> [!CAUTION]
> Before you can run TeamsFx in PowerShell terminals, you must enable the remote signed execution policy for PowerShell.

---

## Set up your Teams development tenant

A tenant is like a space or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you sideload and test your app. Let's verify if you're ready to develop with the tenant.

### Enable sideloading option

After creating the app, you must load your app in Teams without distributing it. This process is known as sideloading. Sign in to your Microsoft 365 account to view this option.

Do you already have a tenant, and do you have the admin access? Let's check if you really do!

Verify if you can sideload apps in Teams:

1. In the Teams client, select **Store** icon.
1. Select **Manage your apps**.
1. Select **Upload a custom app**. If you see Upload a customized app option, sideloading apps is enabled.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot of Manage your apps in Teams with the Upload an app dialog open. Apps icon, Manage your apps, Upload an app, and Upload a customised app options highlighted in red.":::

    > [!NOTE]
    > If Teams doesn't show the option to upload a custom app, connect to your Teams administrator.

### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, you can get it for free. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying your Microsoft 365 developer subscriptions for the blazor app.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

## Get a free Azure account

If you wish to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

Now you've got all tools and set up your accounts. Next, let's set up your development environment and start building!

## Create project workspace for your tab app

Start Teams app development by creating your first app. This app uses the tab capability.

:::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of tab app after you've successfully completed the step-by-step guide.":::

This tutorial walks you through the steps to create, run, and deploy your first Teams app using .NET/Blazor.

In this section, you can learn:

1. [How to set up a new tab project with Teams Toolkit](#create-your-tab-project)
1. [About the directory structure of your app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Teams Toolkit to create your first tab project. The toolkit takes you through a series of pages to create and configure your Teams app project:

1. **Create a new project** page: You select the project type.
1. **Configure your new project** page: You enter the project details.
1. **Create a new Teams application** page: You select the Teams app capabilities.

**To create your tab project workspace**

1. Open the latest version of Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted in red for blazor app.":::

   The **Create a new project** page appears.

1. Select the project details.

   Select the project type:

   1. Search for **Microsoft Teams** from templates dropdown list.  

   1. Select **Microsoft Teams App** as the template.

   1. Select **Next**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for blazor app creation.":::

      The **Configure your new project** page appears.

1. Configure the new project details.

    Select the following project configuration:

   1. Enter a suitable name for your project.

      > [!NOTE]
      > You can note that the project name you enter is automatically filled in as the **Solution name** also. If you want, you can change the solution name with no affect on project name.

   1. Select the folder path where you want to create the project workspace.

   1. Enter a different solution name, if you want.

   1. Check the option to save the project and solution in the same folder, if you want. For this tutorial, you don't need this option.

   1. Select **Create**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot1 of Configure your new project with Create option highlighted in red.":::

      The **Create a new Teams application** page appears.

1. Select Teams app feature.

    Select app feature:

   1. Select the **Tab** as the capability for your app.

   1. Select **Create**.

:::image type="content" source="../../assets/images/teams-toolkit-v2/first-tab/select-language-tab_1.png" alt-text="Screenshot2 of Create a new Teams application with Tab and Create options highlighted in red.":::

Your Teams tab app is created in a few seconds.

:::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot3 of Visual Studio displaying tips to get started while building your app.":::

<details>
<summary>A quick recap of creating a Teams tab app.</summary>
Watch this short recap for creating a Teams tab app.

:::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows the process of creating the Teams tab app1.":::

### Take a tour of the source code for Teams tab app

After project creation, you have the components to build a basic personal app. You can view the project directory structure in the **Solution Explorer** pane of the Visual Studio.

:::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot4 of Solution explorer displaying the components to build a basic personal app.":::

Teams Toolkit creates a scaffolding for your project based on the capabilities you selected. Among other files, Teams Toolkit maintains:

| Folder name | Contents |
| --- | --- |
| App icons | The app icons are stored as PNG files in `color.png` and `outline.png`. |
| `manifest.json` | The app manifest for publishing through the Developer Portal for Teams is stored in `Properties/manifest.json`. |
| `BackendController.cs` | A backend controller is provided in `Controllers/BackendController.cs` for assisting with authentication. |
| `Pages/Tab.razor` | The app manifest for publishing through the Developer Portal for Teams is stored in `Properties/manifest.json`. |
| `TeamsFx.cs` and `JS/src/index.js` | The content is used for initializing communications with the Teams host. |

You can add backend functionality by adding other ASP.NET Core controllers to your application.
</details>

## Build and run your first Teams tab app

After you set up your project workspace with Teams Toolkit, build your tab project.

To build and run your app:

1. Select **Project** > **Teams Toolkit** > **Prepare Teams App Dependencies**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot5 of Visual Studio with Project, Teams Toolkit, and Prepare Teams App Dependencies options are highlighted in red.":::

1. Select your Microsoft 365 account or **Add an account** to sign in.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/m365-account_1.PNG" alt-text="Screenshot6 of Microsoft 365 Account with Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or select **F5** to run your app in debug mode.
    <!-- markdownlint-disable MD033 -->
    <details>
    <summary>Learn what happens when you run your app locally in the debugger.</summary>

    When you select **F5**, Teams Toolkit:

    1. Registers your application with Azure Active Directory.
    1. Registers your application for sideloading in Teams.
    1. Starts your application backend running locally.
    1. Starts your application front-end hosted locally.
    1. Starts Teams in a web browser with a command to instruct Teams to side load the application (the URL is registered inside the application manifest).

    </details>

1. Install the self-signed SSL certificate for local debugging, if requested.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot7 of Security Warning with Yes option highlighted in red.":::

    Teams is loaded in a web browser.

1. Select **Add** when prompted to install the app to Teams.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/blazor-add-app_1.png" alt-text="Screenshot8 of BlazorApp local debug with Add option highlighted in red.":::

    Congratulations, your first tab app is running in your local environment!

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot9 of Microsoft Teams with Your app is running in your local environment highlighted in red.":::

1. Move through the page to view the user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot10 of Microsoft Teams with Authorize option highlighted in red.":::

1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

    The app requests permission to grant access for displaying user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot11 of Permissions requested displaying the App info.":::

1. Select **Accept** to let your app access user details.

    Your photograph and details appear in your **Personal Tab**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot12 of your Personal Tab displaying basic information.":::

    You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading.  If you change any file within the project, the page will be reloaded.

    <!-- markdownlint-disable MD033 -->
    <details>
    <summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

    To run your app in Teams, you need a Microsoft 365 development account that allows app sideloading. You can learn more about it in the Prerequisites section.

    </details>

1. Stop debugging in Visual Studio.

## Preview your first Teams tab app

You've learned to create, build, and run Teams app with tab capability. The following final steps are to deploy your app on Azure and Preview in Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud): You can provision your tab app in the cloud.
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud): You can deploy your tab app to cloud.
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams): Your tab app opens in Teams.

    Let's deploy the first app with tab capability on Azure using Teams Toolkit.

### **To provision your tab app in the cloud**

1. Select **Project** > **Teams Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot13 of Visual Studio with Project, Teams Toolkit, and Provision in the Cloud options are highlighted in red.":::

1. Enter the subscription and resource group details in the **Provision** dialog:
   1. Select the subscription name from  **Subscription name** dropdown list.
   1. Select the resource group from **Resource group** dropdown list or select **New** to add the resource group generated for your app.
   1. Select your **Region**, if new resource group is created.
   1. Select **Provision**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot14 of Provision with New and Provision highlighted in red.":::

   Provision warning displays.

1. Select **Provision**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot15 of Teams Toolkit with Provision highlighted in red.":::

   It takes a few minutes for your resource group to provision in the cloud.

1. After the provision is complete, select **OK**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/provision-complete.png" alt-text="Screenshot16 of Teams Toolkit with OK option highlighted in red.":::

1. Select **View Provisioned Resources** to view on Azure portal.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot17 of Teams Toolkit with View Provisioned Resources highlighted in red.":::

1. Sign in to your Azure portal account on sign-in prompt.

    Your app-dev-rg appears.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot18 of Blazorapp-dev-rg displaying the Resources provisioned in the Azure portal.":::

    Your resources are provisioned in the Azure portal!

#### **To deploy your tab app to cloud**

1. Select **Project** > **Teams Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot19 of Visual Studio with Project, Teams Toolkit, and Deploy to the Cloud options highlighted in red.":::

1. Select **OK**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot20 of Teams Toolkit with OK option highlighted in red.":::

    Your tab app is successfully deployed to the cloud!

#### **To preview your tab app in Teams**

1. Select **Project** > **Teams Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot21of Visual Studio with Project, Teams Toolkit, and Preview in Teams options are highlighted in red.":::

1. Select **Add** when prompted to install the app to Teams.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/blazor-add-app.PNG" alt-text="Screenshot22 of Teams displaying the Add option for adding Blazor app. The Add option highlighted in red.":::

    Congratulations, your first tab app is running in your Azure environment!

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot23 of Microsoft Teams with Your app is running in your Azure environment highlighted in red.":::

1. Move through the page to view the user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot24 of Microsoft Teams with Authorize option under Personal Tab highlighted in red.":::

1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

    The app requests permission to grant access for displaying user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot25 of Permissions requested displaying the App info.":::

1. Select **Accept** to let your app access user details.

    Your photograph and details appear in your **Personal Tab**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot26 of your Personal Tab displaying basic information.":::

## Congratulations

You've done it!

You've completed the tutorial to build a tab app with Blazor.

::: zone-end

## Migrate your configurable tab to personal (static) tab

Teams has extended the personal (static) tab capability to support channel, group chat, or meetings. You can update your existing configurable tab to personal(static) tab and add different scopes to the personal tab. 

To change your configurable tab to personal (static) tab, make the following changes:

1. Move your configuration logic out of your `configurationUrl` codespace to your `contentUrl` codespace. For more information, see [configuration page.](~/tabs/how-to/create-tab-pages/configuration-page.md) 
1. Add the `staticTabs` property to your [app manifest](~/resources/schema/manifest-schema.md#statictabs) with `scopes` and `context` parameters. For more information, see [personal (static) tab.](~/tabs/how-to/create-personal-tab.md#extend-personal-tabs-to-group-chat-and-channels)

If your [configurable tab](~/tabs/how-to/create-tab-pages/configuration-page.md#configuration-page-for-tabs) allowed users to edit the tab after it was pinned, that is `canUpdateConfiguration: true` then you should continue to keep the `configurableTab` property in your app manifest in order to ensure users can edit pre-existing pinned configurable tabs.


## Next step

> [!div class="nextstepaction"]
> [Create a content page](~/tabs/how-to/create-tab-pages/content-page.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a personal tab](create-personal-tab.md)
* [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md)
* [Build tabs with Adaptive Cards](build-adaptive-card-tabs.md)
* [Add a SharePoint page as a tab in Teams](https://support.microsoft.com/en-us/office/add-a-sharepoint-page-list-or-document-library-as-a-tab-in-teams-131edef1-455f-4c67-a8ce-efa2ebf25f0b)
