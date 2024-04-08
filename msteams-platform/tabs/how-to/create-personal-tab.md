---
title: Create a tab
author: laujan
description: Learn to build a personal or static tab. Select the Node.js, ASP.NET Core, or ASP.NET Core MVC environment. Generate app, add content, create package, build, and run app.
ms.localizationpriority: high
ms.topic: quickstart
zone_pivot_groups: teams-app-environment
ms.date: 02/27/2023
---

# Create a tab

Tabs are part of the Teams apps that can be pinned to the left navigation bar for easy access and behave more like apps, as you can pin only one tab per app. 

Static tabs work in personal chat, group chat, channels, and meetings with a customizable experience. 

Ensure that you've all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build your static tab.

::: zone pivot="java-script"

## Create your tab project workspace

> [!IMPORTANT]
>
> We've introduced the [Teams Toolkit](../../toolkit/teams-toolkit-fundamentals.md) extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.

# [Visual Studio Code](#tab/vsc)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New App**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Screenshots shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Tab** to create a new tab project.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/create-new-app1.png" alt-text="Screenshots shows the wizard to create a new project.":::

1. Ensure that **Basic Tab** is selected as the app feature that you want to build in your app.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/select-capabilities-tabapp.png" alt-text="Screenshot shows to add app feature to add to your new app.":::

1. Select **JavaScript** as the programming language.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/select-language-tab.png" alt-text="Screenshot shows how to select the programming language.":::

1. Select **Default folder** to store your project root folder in default location.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/select-default-location.png" alt-text="Screenshot shows how to select default location.":::

   Follow the steps to change the default location:

   1. Select **Browse**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/select-browse.png" alt-text="Screenshot shows to select browse for storage.":::

   1. Select the location for project workspace.

   1. Select the **Select folder**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/select-folder.png" alt-text="Screenshot shows how to select-folder.":::

   1. Enter a suitable name for your app and then select **Enter**.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/enter-name-tab1.png" alt-text="Screenshot shows where to enter the app name.":::

      The Teams tab app is created in few seconds.

      :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/tap-app-created1.png" alt-text="Screenshot shows the app created.":::

      After your app is created, Teams Toolkit displays the following message:

      :::image type="content" source="~/assets/images/teams-toolkit-v2/preview-project-tab.png" alt-text="Screenshot shows to preview project.":::
        
      You can select **Local debug** to preview your project. 
      </br>
      <details>
      <summary>A quick recap of creating a Teams app.</summary>
      Watch this short recap for creating a Teams app.

      ![Create a Teams app](~/assets/videos/javascript-tab-app1.gif)
      </details>

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project. Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```
You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, use arrow keys to select an option and then, select **Enter** to confirm.

1. Select **Create a new Teams app**.
1. Select the **Tab** capability.
1. Select **Azure** frontend hosting.
1. Don't select any cloud resources.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter `helloworld` as the name for your app. The name of the app must have only alphanumeric characters.

After you've answered all the questions, your project is created.

---

## Take a tour of the tab app source code

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files in the **Explorer** in the Visual Studio Code.

:::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/folder-structure-tab-app.png" alt-text="Screen shot shows the structure tab.":::

Although you're free to choose any UI framework (or not to use any), this sample template code provides a scaffolding with React components.

Among other items in this directory structure, the Toolkit maintains:

| Folder name | Contents |
| --- | --- |
| `.vscode` | VSCode files for debugging. |
| `appPackage` | Templates for the Teams application manifest. |
| `env` | Name / value pairs are stored in environment files and used by teamsapp.yml to customize the provisioning and deployment rules. |
| `infra` | Templates for provisioning Azure resources. |
| `src/`| The source code for the notification Teams application. |
| `src/app.js` | Application entry point and `restify` handlers for website. |
| `src/views/hello.html`| A HTML template that is bind to the tab endpoint. |
| `src/static` | The static assets like CSS and JavaScript files that can be served by the web server. |
| `teamsapp.yml` | Main project file describes your application configuration and defines the set of actions to run in each lifecycle stages. |
| `teamsapp.local.yml` | This overrides `teamsapp.yml` with actions that enable local execution and debugging. |

## Build and run your first tab app

After you set up your project workspace with Teams Toolkit, build your tab project. You need to sign in to your Microsoft 365 account.

### Sign in to your Microsoft 365 account

Use your Microsoft 365 account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to M365** using your credentials.

   Your default web browser opens to let you sign in to the account.

1. Close the browser when prompted and return to Visual Studio Code.
1. Return to Teams Toolkit within Visual Studio Code.

   The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name. If custom app upload is enabled for your Microsoft 365 account, Teams Toolkit displays **Sideloading enabled**.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/m365-sideloading-enabled.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure.":::

   Now you're ready to build the app and run it in the local environment!

# [Command line](#tab/cline)

1. Sign in to Microsoft 365 with the TeamsFx CLI:

   ``` bash
   teamsfx account login m365
   ```

   Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

2. Sign in to Azure with the TeamsFx CLI:

   ``` bash
   teamsfx account login azure
   ```

   Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

   The account logins are shared between Visual Studio Code and the TeamsFx CLI.

   Now that the development environment is configured, you. can create, build, and deploy your first Teams app.

---

### Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run the application in debug mode.

   <details>
   <summary>Learn what happens when you run your app locally in the debugger.</summary>

   In case you're wondering, when you press the **F5** key, Teams Toolkit:

   1. Checks for the following prerequisites:
      * You're logged in with a Microsoft 365 account.
      * Custom app upload is enabled for your Microsoft 365 account.
      * Supported Node.js version is installed.
      * Development certificate for localhost is installed.
      * Port is available for the tab app.
      > [!NOTE]
      > If Teams Toolkit is unable to check a particular prerequisite, it prompts you to check.

   2. Install NPM packages.
   3. Registers the app with Microsoft Entra ID and configures the app.
   4. Registers the app in Teams Developer Portal and configures the app.
   5. Starts the tab app.
   6. Starts Teams in a web browser and uploads the tab app.

   </details>

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed." lightbox="~/assets/images/teams-toolkit-v2/first-tab/f5-build-and-run.png":::

   > [!NOTE]
   > When you run the app for the first time, all dependencies are downloaded, and the app is built. A browser window opens when the build is complete. This process can take 3-5 minutes to complete.

   The toolkit prompts you to install a local certificate, if necessary. This certificate allows Teams to load your application from `https://localhost`.

1. Select **Yes** if the following dialog appears:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/hw-warning.png" alt-text="Screenshot shows the microsoft warning.":::

   Or select **Continue**, depending on your operating system:

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/ssl-prompt-mac.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost on Mac.":::

   Teams web client opens in a browser window.

   > [!NOTE]
   > If the toolkit doesn't prompt you to install a certificate, you must install the certificate manually. For more information, see [Add manual certificate](/skype-sdk/sdn/articles/installing-the-trusted-root-certificate#adding-certificate-snap-ins).

1. Sign in with your Microsoft 365 account, if prompted.

1. Select **Add** when prompted to upload the custom app onto Teams on your local machine.

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/add-tab-app-local-debug.png" alt-text="Screenshot shows to add the app to Teams.":::

1. Congratulations, your first app is running on Teams!

   :::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/tab-app-localdebug.png" alt-text="Screenshot shows the completed app" lightbox="~/assets/images/teams-toolkit-v2/first-tab/tab-app-localdebug-1.png":::

   > [!NOTE]
   > If you want to extend your app to Outlook and Microsoft 365, you can choose to debug your app with Outlook and Microsoft 365 from RUN AND DEBUG dropdown in Visual Studio Code.

   You can add SSO feature to retrieve the user details. You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

   <details>
   <summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

   To successfully run your app in Teams, ensure that you've enabled custom app upload in your Teams account. You can learn more about custom app upload in the prerequisites section.

   </details>

Your static tab app is successfully created and added in Teams.You can also [reorder](#reorder-static-tabs) your static tab in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a static tab with ASP.NET Core

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are the steps to create a static tab:

1. [Generate your application with a static tab](#generate-your-application-with-a-static-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a static tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application is loaded properly. In a browser, go to the following URLs:

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

1. Select **Preview in Teams** from the Developer Portal toolbar, Developer Portal informs you that your custom app is uploaded successfully. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab in Teams. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   Your static tab is successfully created and added in Teams. You can also [reorder](#reorder-static-tabs) your static tab in Teams.


::: zone-end

::: zone pivot="mvc-csharp"

## Create a static tab with ASP.NET Core MVC

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

1. At the command prompt, create a new directory for your tab project.

1. Clone the sample repository into your new directory using the following command or you can download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Following are the steps to create a static tab:

1. [Generate your application with a static tab](#generate-your-application-with-a-static-tab-2)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a static tab

1. Open Visual Studio and select **Open a project or solution**.

1. Go to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln** in Visual Studio.

1. In Visual Studio, select **F5** or choose **Start Debugging** from your application's **Debug** menu to verify if the application is loaded properly. In a browser, go to the following URLs:

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

1. Select **Preview in Teams** from the Developer Portal toolbar, Developer Portal informs you that your custom app is uploaded successfully. The **Add** page appears for your app in Teams.

1. Select **Add** to load the tab on Teams. Your tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    Your static tab is successfully created and added in Teams.You can also [reorder](#reorder-static-tabs) your static tab in Teams.

::: zone-end

::: zone pivot="blazor-app"

> [!IMPORTANT]
>
> We've introduced the [Teams Toolkit](../../toolkit/teams-toolkit-fundamentals.md) extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.

Blazor lets you build interactive web UI using C#. You can create a tab app with Blazor and the latest version of Visual Studio.

## Create project workspace for your tab app

Start Teams app development by creating your first tab app. Use Teams Toolkit to create your first tab project.

**To create your tab project workspace**

1. Open the latest version of Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted in red for Blazor app.":::

   The **Create a new project** page appears.

1. Select the project details.

   Select the project type:

   1. Search for **Microsoft Teams** from templates dropdown list.  

   1. Select **Microsoft Teams App** as the template.

   1. Select **Next**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for Blazor app creation."lightbox="../../assets/images/teams-toolkit-v2/blazor/vs-select-teams-app.png":::

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

      :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with Create option highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select Teams app feature.

   1. Select the **Tab** as the capability for your app.

   1. Select **Create**.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

      Your Teams tab app is created in few seconds.

      :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips to get started while building your app."lightbox="../../assets/images/teams-toolkit-v2/blazor/vs-tab-app.png":::

      <details>
      <summary>A quick recap of creating a Teams tab app.</summary>
      Watch this short recap for creating a Teams tab app.

      :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows the process of creating the Teams tab app1.":::

### Take a tour of the source code for Teams tab app

After project creation, you've the components to build a basic tab app. You can view the project directory structure in the **Solution Explorer** pane of the Visual Studio.

:::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution explorer displaying the components to build a basic tab app.":::

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

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio with Project, Teams Toolkit, and Prepare Teams App Dependencies options are highlighted in red."lightbox="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Select your Microsoft 365 account or **Add an account** to sign in.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or select **F5** to run your app in debug mode.
    <!-- markdownlint-disable MD033 -->
    <details>
    <summary>Learn what happens when you run your app locally in the debugger.</summary>

    When you select **F5**, Teams Toolkit:

    1. Registers your application with Microsoft Entra ID.
    1. Registers your application for uploading in Teams.
    1. Starts your application backend running locally.
    1. Starts your application front-end hosted locally.
    1. Starts Teams in a web browser with a command to instruct Teams to upload a custom app (the URL is registered inside the application manifest).

    </details>

1. Install the self-signed SSL certificate for local debugging, if requested.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot of Security Warning with Yes option highlighted in red.":::

    Teams is loaded in a web browser.

1. Select **Add** when prompted to install the app to Teams.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of BlazorApp local debug with Add option highlighted in red.":::

    Congratulations, your first tab app is running in your local environment!

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot shows your first tab app is running in your local environment.":::

1. Move through the page to view the user details.

1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

    The app requests permission to grant access for displaying user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows the authorize option in the static tab of your app.":::

1. Select **Accept** to let your app access user details.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Permissions requested displaying the App info.":::

    Your photograph and details appear in your **Personal Tab**.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot shows the basic information displayed on the static tab of your app in Teams.":::

    You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading.  If you change any file within the project, the page will be reloaded.

    <!-- markdownlint-disable MD033 -->
    <details>
    <summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

    To run your app in Teams, you need a Microsoft 365 development account that allows custom app upload. You can learn more about it in the Prerequisites section.

    </details>

::: zone-end

::: zone pivot="node-java-script"

## Create a static tab with Node.js

1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing the Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At the command prompt, install Microsoft Teams app generator by entering the following command:

    ```cmd
    npm install generator-teams --global
    ```

Following are the steps to create a static tab:

1. [Generate your application with a static tab](#generate-your-application-with-a-static-tab)
1. [Add a content page to the static tab](#add-a-content-page-to-the-static-tab)
1. [Create your app package](#create-your-app-package)
1. [Build and run your application](#build-and-run-your-application)
1. [Establish a secure tunnel to your static tab](#establish-a-secure-tunnel-to-your-tab)
1. [Upload your application to Teams](#upload-your-application-to-teams)

### Generate your application with a static tab

1. At the command prompt, create a new directory for your static tab.

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

      Your company name is used in the app manifest. Enter a company name or select **Enter** to accept the default name.

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

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose **not** to include Microsoft Entra Single-Sign-On support for the tab. The default is yes, enter **n**.
    > [!NOTE]
    > In a tab, the tab home page appears only when the user selects the back button (or moves out of the tab) and comes back to the home page. The tab doesn't maintain or retain the previous state by design.
    </details>

### Add a content page to the static tab

Create a content page and update the existing files of the static tab application:

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

1. Browse `http://localhost:3007/<yourDefaultAppNameTab>/personal.html`, to view your static tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

### Establish a secure tunnel to your tab

At the command prompt exit the localhost and enter the following command to establish a secure tunnel to your tab:

```cmd
gulp ngrok-serve
```

After your tab is uploaded to Microsoft Teams through **ngrok** and successfully saved, you can view it in Teams until your tunnel session ends.

### Upload your application to Teams

1. Go to Teams and select **Apps**&nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Go to your project directory, browse to the **./package** folder, select the zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your static tab":::

1. Select **Add** in the dialog. Your tab is uploaded to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the left pane of Teams, select ellipses &#x25CF;&#x25CF;&#x25CF; and then choose your uploaded app to view your static tab.

   Your static tab is successfully created and added in Teams.You can also [reorder](#reorder-static-tabs) your static tab in Teams.

::: zone-end


## Reorder static tabs

Starting with manifest version 1.7, developers can rearrange all tabs in their static tab app. You can move the **bot chat** tab, which always defaults to the first position, anywhere in the Teams app tab header. Two reserved tab `entityId` keywords are declared, **conversations** and **about**.

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

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> * Extending static tab to group chat, channels, and meetings is available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md). 
> * Extending static tab to group chat, channels, and meetings is available only in classic Teams client and isn't available in the [new Teams client](~/resources/teams-updates.md).
> * To extend your static tab to group chat, channels, and meetings, use the app manifest v1.16 or later.

You can extend static tabs to group chat, channels, and meetings. Instead of pinned app content, you can build tabs that behave more like apps as you can pin only one tab per app, for example, pinning a single YouTube app tab.

To extend your static tabs to group chat, channels, and meetings, update your [app manifest](~/resources/schema/manifest-schema.md#statictabs) with the `scopes` and `context` parameters in the `staticTabs` property.

Following is an example of app manifest where a static tab is defined that works in all scopes and contexts in Teams:

```json
"staticTabs": [ 
  { 
     "entityId": "homeTab", 
     "scopes": [ 
       "personal", 
       "groupChat", 
       "team"
      ], 
     "context": [ 
       "personalTab",
       "channelTab", 
       "privateChatTab", 
       "meetingChatTab", 
       "meetingDetailsTab", 
       "meetingSidePanel", 
       "meetingStage" 
      ], 
      "name": "Contoso", 
      "contentUrl": "https://contoso.com/content (displayed in Teams canvas)", 
      "websiteUrl": "https://contoso.com/content (displayed in web browser)" 
  }
], 

```

If a context isn't defined in the app manifest, by default Teams consider the following context:

```json
"context": [ 
   "personalTab",
   "channelTab",
   "privateChatTab", 
   "meetingChatTab", 
   "meetingDetailsTab", 
   "meetingStage" 
]
```

## Customizing your static tab in chats or meetings

To customize your static tab experience in chats, channels, or meetings, you can use the `setConfig` APIs in your tab to update the `contentUrl` and `websiteUrl`. Following is an example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}

```

Only `contentUrl` and `websiteUrl` changes are supported for `setConfig`, other properties can't be changed for static tabs.

## Code sample

| Sample name | Description | .NET |Node.js|Manifest|
|-------------|-------------|------|----|----|
|Tab personal| Sample app, which showcases custom personal Tab with ASP.NET core for group chat, channels, and meetings. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip)|

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
