---
title: Create a personal tab
author: laujan
description: Learn to build a personal tab. Select the Node.js, ASP.NET Core, or ASP.NET Core MVC environment. Generate app, add content, create package, build and run app.
ms.localizationpriority: high
ms.topic: quickstart
ms.author: lajanuar
zone_pivot_groups: teams-app-environment
---

# Create a personal tab

Personal tabs, along with personally-scoped bots, are part of personal apps and are scoped to a single user. They can be pinned to the left pane for easy access. You can also [reorder](#reorder-static-personal-tabs) your personal tabs.

Ensure that you've all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build your personal tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a personal tab with Node.js

1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing the Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At the command prompt, install Microsoft Teams app generator by entering the following command:

    ```cmd
    npm install generator-teams --global
    ```

Following are the steps to create a personal tab:

1. [Generate your application with a personal tab](#generate-your-application-with-a-personal-tab)
1. [Add a content page to the personal tab](#add-a-content-page-to-the-personal-tab)
1. [Create your app package](#create-your-app-package)
1. [Build and run your application](#build-and-run-your-application)
1. [Establish a secure tunnel to your personal tab](#establish-a-secure-tunnel-to-your-tab)
1. [Upload your application to Teams](#upload-your-application-to-teams)

### Generate your application with a personal tab

1. At the command prompt, create a new directory for your personal tab.

1. Enter the following command in your new directory to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide your values to a series of questions prompted by Microsoft Teams app generator to update your `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name is your project name. You can accept the suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      You're currently in your project directory. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      The title is your app package name and is used in the app manifest and description. Enter a title or select **Enter** to accept the default name.

    * **Your (company) name? (max 32 characters)**

      Your company name will be used in the app manifest. Enter a company name or select **Enter** to accept the default name.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; enter **n** to enter your Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field isn't required and must be used only if you're already part of the [Microsoft Partner Network](https://partner.microsoft.com).

    * **What do you want to add to your project?**

      Select **( &ast; ) A Tab**.

    * **The URL where you will host this solution?**

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

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Azure Active Directory (Azure AD) Single-Sign-On support for the tab?**

      Choose **not** to include Azure AD Single-Sign-On support for the tab. The default is yes, enter **n**.
    > [!NOTE]
    > In a tab, the tab home page appears only when the user selects the back button (or moves out of the tab) and comes back to the home page. The tab doesn't maintain or retain the previous state by design.
    </details>

### Add a content page to the personal tab

Create a content page and update the existing files of the personal tab application:

1. Create a new **personal.html** file in your Visual Studio Code with the following markup:

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

1. Save **personal.html** in your application's **public** folder in the following location:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` from the following location in your Visual Studio Code:

    ```
     ./src/manifest/manifest.json
    ```

1. Add the following to the empty `staticTabs` array (`staticTabs":[]`) and add the following JSON object:

    ```json
    {
        "entityId": "personalTab",
        "name": "Personal Tab ",
        "contentUrl": "https://{{PUBLIC_HOSTNAME}}/<yourDefaultTabNameTab>/personal.html",
        "websiteUrl": "https://{{PUBLIC_HOSTNAME}}",
        "scopes": ["personal"]
    }
    ```

    > [!IMPORTANT]
    > The path component **yourDefaultTabNameTab** is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**.
    >
    > For example: DefaultTabName is **MyTab** then **/MyTabTab/**

1. Update the **contentURL** path component **yourDefaultTabNameTab** with your actual tab name.

1. Save the updated `manifest.json` file.

1. Open **Tab.ts** in your Visual Studio Code from the following path to provide your content page in an iFrame:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following to the list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. Your tab code is complete.

### Create your app package

You must have an app package to build and run your application in Teams. The app package is created through a gulp task that validates the `manifest.json` file and generates the zip folder in the `./package` directory. At the command prompt, use the command `gulp manifest`.

### Build and run your application

#### Build your application

Enter the following command at the command prompt to transpile your solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, enter the following command to start a local web server:

    ```cmd
    gulp serve
    ```

1. Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in your browser to view your application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Browse `http://localhost:3007/<yourDefaultAppNameTab>/personal.html`, to view your personal tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

### Establish a secure tunnel to your tab

At the command prompt exit the localhost and enter the following command to establish a secure tunnel to your tab:

```cmd
gulp ngrok-serve
```

After your tab is uploaded to Microsoft Teams through **ngrok** and successfully saved, you can view it in Teams until your tunnel session ends.

### Upload your application to Teams

1. Go to Teams and select **Apps**&nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Go to your project directory, browse to the **./package** folder, select the zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your personal tab":::

1. Select **Add** in the dialog. Your tab is uploaded to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the left pane of Teams, select ellipses &#x25CF;&#x25CF;&#x25CF; and then choose your uploaded app to view your personal tab.

   Now you've successfully created and added your personal tab in Teams.
  
   As you've your personal tab in Teams, you can also [reorder](#reorder-static-personal-tabs) your personal tab.

::: zone-end

::: zone pivot="razor-csharp"

## Create a personal tab with ASP.NET Core

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are the steps to create a personal tab:

1. [Generate your application with a personal tab](#generate-your-application-with-a-personal-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a personal tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application has loaded properly. In a browser, go to the following URLs:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project was created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method using the following code:

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

ASP.NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** is displayed as the home page for your application.

#### AppManifest folder

This folder contains the following required app package files:

* A full color icon measuring 192 x 192 pixels.
* A transparent outline icon measuring 32 x 32 pixels.
* A `manifest.json` file that specifies the attributes of your app.

These files must be zipped in an app package for use in uploading your tab to Teams. Teams loads the `contentUrl` specified in your manifest, embeds it in an <iframe\>, and renders it in your tab.

#### .csproj

In Visual Studio Solution Explorer, right-click on the project and select **Edit Project File**. At the end of the file, you can see the following code that creates and updates your zip folder when the application builds:

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

### Update and run your application

1. Open Visual Studio Solution Explorer and go to **Pages** > **Shared** folder and open **_Layout.cshtml** and add the following to the `<head>` tags section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from **Pages** folder and add `microsoftTeams.app.initialize()` in the `<script>` tags.

1. Select **Save**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu.

### Establish a secure tunnel to your tab

At the command prompt in the root of your project directory, run the following command to establish a secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package file name is `tab.zip` and it's available at `/bin/Debug/netcoreapp3.1/tab.zip` path.

1. Select `tab.zip` and open it in the Developer Portal.

1. A default **App ID** is created and populated in **Basic information** section.

1. Add the Short and Long description  for your app in **Descriptions**.

1. In **Developer Information**, add the required details and in **Website (must be a valid HTTPS URL)** give your ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou` and select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab** and enter the name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL field blank and select **Context** as personalTab from the dropdown list and select **Confirm**.

1. Select **Save**.

1. In the Domains section, domains from your tabs must contain your ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar, Developer Portal informs you that your app is sideloaded successfully. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab in Teams. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   Now you've successfully created and added your personal tab in Teams.
  
   As you've your personal tab in Teams, you can also [reorder](#reorder-static-personal-tabs) your personal tab.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a personal tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are the steps to create a personal tab:

1. [Generate your application with a personal tab](#generate-your-application-with-a-personal-tab-2)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a personal tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln** in Visual Studio.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application has loaded properly. In a browser, go to the following URLs:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project was created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** check box selected at setup. The MVC services are registered by the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template doesn't enable serving static content by default, so the static files middleware is added to the `Configure()` method using the following code:

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

In ASP.NET Core, the web root folder is where the application looks for static files.

#### AppManifest folder

This folder contains the following required app package files:

* A **full color icon** measuring 192 x 192 pixels.
* A **transparent outline icon** measuring 32 x 32 pixels.
* A `manifest.json` file that specifies the attributes of your app.

These files must be zipped in an app package for use in uploading your tab to Teams. Teams loads the `contentUrl` specified in your manifest, embeds it in an iFrame, and renders it in your tab.

#### .csproj

In the Visual Studio Solution Explorer, right-click on the project and select **Edit Project File**. At the end of the file, you see the following code that creates and updates your zip folder when the application builds:

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

**PersonalTab.cs** presents a message object and methods that are called from **PersonalTabController** when a user selects a button in the **PersonalTab** View.

#### Views

These views are the different views in ASP.NET Core MVC:

* Home: ASP.NET Core treats files called **Index** as the default or home page for the site. When your browser URL points to the root of the site, **Index.cshtml** is displayed as the home page for your application.

* Shared: The partial view markup **_Layout.cshtml** contains the application's overall page structure and shared visual elements. It also references the Teams Library.

#### Controllers

The controllers use the `ViewBag` property to transfer values dynamically to the Views.

</details>

### Update and run your application

1. Open Visual Studio Solution Explorer and go to **Views** > **Shared** folder and open **_Layout.cshtml**, and add the following to the `<head>` tags section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from **Views** > **PersonalTab** folder and add `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Select **Save**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu.

### Establish a secure tunnel to your tab

At the command prompt in the root of your project directory, run the following command to establish a secure tunnel to your tab:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The name of your app package is **tab.zip**. It's available in the following path:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in the Developer Portal.

1. A default **App ID** is created and populated in **Basic information** section.

1. Add the Short and Long description  for your app in **Descriptions**.

1. In **Developer information**, add the required details and in **Website (must be a valid HTTPS URL)** give your ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou` and select **Save**.

1. In **App features**, select **Personal app** > **Create your first personal app tab** and enter the name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL field blank and select **Context** as personalTab from the dropdown list and select **Confirm**.

1. Select **Save**.

1. In the Domains section, Domains from your tabs must contain your ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar, Developer Portal informs you that your app is sideloaded successfully. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab on Teams. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
   Now you've successfully created and added your personal tab in Teams.

   As you've your personal tab in Teams, you can also [reorder](#reorder-static-personal-tabs) your personal tab.

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

Do you already have a tenant and the admin access? Let's check if you really do!

Verify if you can sideload apps in Teams:

1. In the Teams client, select **Store** icon.
1. Select **Manage your apps**.
1. Select **Upload a custom app**. If you see Upload a custom app option, sideloading apps is enabled.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot of Manage your apps in Teams with the Upload an app dialog open. Apps icon, Manage your apps, Upload an app, and Upload a custom app option highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor/upload-custom-app.PNG":::

    > [!NOTE]
    > Contact your Teams administrator, if you don't find the option to upload a custom app.

### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, you can get it for free. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying your Microsoft 365 developer subscriptions for the blazor app.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you've the **Upload a custom app** option in Teams.

## Get a free Azure account

If you wish to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

Now you've got all the tools and set up your accounts. Next, let's set up your development environment and start building!

## Create project workspace for your tab app

Start Teams app development by creating your first app. This app uses tab capability.

:::image type="content" source="~/assets/images/teams-toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of tab app after you've successfully completed the step-by-step guide.":::

This tutorial walks you through the steps to create, run, and deploy your first Teams app using .NET/Blazor.

In this page, you'll learn:

1. [How to set up a new tab project with Teams Toolkit](#create-your-tab-project)
1. [About the directory structure of your app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Teams Toolkit to create your first tab project. The toolkit takes you through a series of pages to create and configure your Teams app project:

1. **Create a new project** page: You can select the project type.
1. **Configure your new project** page: You can enter the project details.
1. **Create a new Teams application** page: You can select the Teams app capabilities.

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

      :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for blazor app creation."lightbox="../../assets/images/teams-toolkit-v2/blazor/vs-select-teams-app.png":::

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

      :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot1 of Configure your new project with Create option highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select Teams app feature.

   1. Select the **Tab** as the capability for your app.

   1. Select **Create**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot2 of Create a new Teams application with Tab and Create options highlighted in red.":::

Your Teams tab app is created in few seconds.

:::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot3 of Visual Studio displaying tips to get started while building your app."lightbox="../../assets/images/teams-toolkit-v2/blazor/vs-tab-app.png":::

<details>
<summary>A quick recap of creating a Teams tab app.</summary>
Watch this short recap for creating a Teams tab app.

:::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows the process of creating the Teams tab app1.":::

### Take a tour of the source code for Teams tab app

After project creation, you've the components to build a basic personal app. You can view the project directory structure in the **Solution Explorer** pane of the Visual Studio.

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

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot5 of Visual Studio with Project, Teams Toolkit, and Prepare Teams App Dependencies options are highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

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

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot8 of BlazorApp local debug with Add option highlighted in red.":::

    Congratulations, your first tab app is running in your local environment!

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot9 of Microsoft Teams with Your app is running in your local environment highlighted in red.":::

1. Move through the page to view the user details.

1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

    The app requests permission to grant access for displaying user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot10 of Microsoft Teams with Authorize option highlighted in red.":::

1. Select **Accept** to let your app access user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot11 of Permissions requested displaying the App info.":::

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

You've learned to create, build, and run Teams app with tab capability. The following final steps are to deploy your app on Azure and preview in Teams follow the steps:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud): You can provision your tab app in the cloud.
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud): You can deploy your tab app to cloud.
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams): You can preview your tab app in Teams.

    Let's deploy the first app with tab capability on Azure using Teams Toolkit.

### **To provision your tab app in the cloud**

1. Select **Project** > **Teams Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot13 of Visual Studio with Project, Teams Toolkit, and Provision in the Cloud options are highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. Enter the subscription and resource group details in the **Provision** dialog:
   1. Select the subscription name from  **Subscription name** dropdown list.
   1. Select the resource group from **Resource group** dropdown list or select **New** to add the resource group generated for your app.
   1. Select your **Region**, if new resource group is created.
   1. Select **Provision**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot14 of Provision with New and Provision highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

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

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot19 of Visual Studio with Project, Teams Toolkit, and Deploy to the Cloud options highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Select **OK**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot20 of Teams Toolkit with OK option highlighted in red.":::

    Your tab app is successfully deployed to the cloud!

#### **To preview your tab app in Teams**

1. Select **Project** > **Teams Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot21of Visual Studio with Project, Teams Toolkit, and Preview in Teams options are highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

1. Select **Add** when prompted to install the app to Teams.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/blazor-add-app.PNG" alt-text="Screenshot22 of Teams displaying the Add option for adding Blazor app. The Add option highlighted in red.":::

    Congratulations, your first tab app is running in your Azure environment!

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot23 of Microsoft Teams with Your app is running in your Azure environment highlighted in red.":::

    Move through the page to view the user details.

1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

    The app requests permission to grant access for displaying user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot24 of Microsoft Teams with Authorize option under Personal Tab highlighted in red.":::

1. Select **Accept** to let your app access user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot25 of Permissions requested displaying the App info.":::

    Your photograph and details appear in your **Personal Tab**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot26 of your Personal Tab displaying basic information.":::

## Congratulations

You've completed the tutorial to build a tab app with Blazor.

::: zone-end

## Reorder static personal tabs

Starting with manifest version 1.7, developers can rearrange all tabs in their personal app. You can move the **bot chat** tab, which always defaults to the first position, anywhere in the personal app tab header. Two reserved tab `entityId` keywords are declared, **conversations** and **about**.

If you create a bot with a **personal** scope, it appears in the first tab position in a personal app by default. If you want to move it to another position, you must add a static tab object to your manifest with the reserved keyword, **conversations**. The **conversation** tab appears on web or desktop depending on where you add the **conversation** tab in the `staticTabs` array.

``` JSON

{
   "staticTabs":[
      {
         
      },
      {
         "entityId":"conversations",
         "scopes":[
            "personal"
         ]
      }
   ]
}

```

## Code sample

| Sample name | Description | .NET |Node.js|Manifest|
|-------------|-------------|------|----|----|
|Tab personal|Sample app which showcases creating a custom channel/group tab with ASP.Net Core and MVC. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) |  NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip)|

## Next step

> [!div class="nextstepaction"]
> [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [Share to Teams from personal app or tab](~/concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md)
* [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Build tabs with Adaptive Cards](build-adaptive-card-tabs.md)
* [Tabs on mobile](../design/tabs-mobile.md)
