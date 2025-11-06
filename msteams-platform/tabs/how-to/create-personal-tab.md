---
title: Methods to Build Tab App
author: laujan
description: Learn to build a personal tab with Node.js, ASP.NET Core, or ASP.NET Core MVC, extending it to support group chats, channels, meetings, and offline access.
ms.localizationpriority: high
ms.topic: quickstart
zone_pivot_groups: teams-app-environment
ms.date: 02/28/2025
ms.owner: ryanbliss
---

# Create a tab

Tabs in chats, channels, or meetings act more like apps, as developers pin only one tab per app to the left pane for easy access.

> [!IMPORTANT]
>
> Microsoft introduces [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (previously known as Teams Toolkit) extension within Visual Studio Code. This version provides many new app development features. Developers are recommended to use Agents Toolkit v5 for building Microsoft Teams apps.

Developers must ensure that all the [prerequisites](~/tabs/how-to/tab-requirements.md) are met to build the tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the step-by-step guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

<!--
1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At the command prompt, install Microsoft Teams app generator by entering the following command:

    ```cmd
    npm install generator-teams --global
    ```

Following are the steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Add a content page to the tab](#add-a-content-page-to-the-tab)
1. [Create your app package](#create-your-app-package)
1. [Build and run your application](#build-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab)
1. [Upload your application to Teams](#upload-your-application-to-teams)

### Generate your application with a tab

1. At the command prompt, create a new directory for the tab.

1. Enter the following command in the new directory to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide values to a series of questions prompted by the Microsoft Teams app generator to update the `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update the manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name becomes the project name. Developers can accept the suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      Developers are already in the project directory. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      The title becomes the app package name and appears in the app manifest and description. Enter a title or select **Enter** to accept the default.

    * **Your (company) name? (max 32 characters)**

      The company name appears in the app manifest. Enter a company name or select **Enter** to accept the default.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; enter **n** if Microsoft Partner ID entry is required.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and is used only if already part of the [Microsoft Cloud Partner Program](https://partner.microsoft.com), formerly known as Microsoft Partner Network.

    * **What do you want to add to your project?**

      Select **( * ) A Tab**.

    * **The URL where you will host this solution?**

      By default, the generator suggests an Azure website URL. Developers testing the app locally do not require a valid URL.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose **not** to include a loading indicator when the app or tab loads. The default is no, enter **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose **not** to include personal apps rendered without a tab header-bar. The default is no, enter **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose **not** to include a test framework. The default is no, enter **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. The default is no, enter **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose **not** to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; enter **n**.

    * **Default Tab Name (max 16 characters)?**

      Name the tab. This tab name is used throughout the project as a file or URL path component.

    * **What kind of Tab would you like to create?**

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose **not** to include Microsoft Entra Single-Sign-On support. The default is yes, enter **n**.
    > [!NOTE]
    > In a tab, the home page appears only when the user selects the back button (or moves out of the tab) and returns to the home page. The tab does not maintain or retain the previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Create a content page and update the existing files of the tab application:

1. Create a new **personal.html** file in Visual Studio Code with the following markup:

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

1. Save **personal.html** in the application's **public** folder at the following location:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` in Visual Studio Code from this location:

    ```
     ./src/manifest/manifest.json
    ```

1. Add the following JSON object to the empty `staticTabs` array (`"staticTabs":[]`):

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
    > The path component **yourDefaultTabNameTab** is the value entered in the generator for **Default Tab Name** plus the word **Tab**.
    >
    > For example: If DefaultTabName is **MyTab** then the path is **/MyTabTab/**

1. Update the **contentUrl** path component **yourDefaultTabNameTab** with the actual tab name.

1. Save the updated `manifest.json` file.

1. Open **Tab.ts** in Visual Studio Code from the following path to provide the content page in an iframe:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following to the list of iframe decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. The tab code is complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

An app package is required to build and run the application in Microsoft Teams. The app package is created using a gulp task that validates the `manifest.json` file and generates a zip folder in the `./package` directory. At the command prompt, run:

    gulp manifest

### Build and run your application

#### Build your application

Enter the following command to transpile the solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, run the following command to start a local web server:

    ```cmd
    gulp serve
    ```

1. Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in the browser to view the application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Visit `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view the tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

At the command prompt, exit the local host session and run the following command to establish a secure tunnel to the tab:

```cmd
gulp ngrok-serve
```

Once the tab is uploaded to Microsoft Teams using **ngrok** and is successfully saved, the tab remains visible in Microsoft Teams until the tunnel session ends.

### Upload your application to Teams

1. Open Microsoft Teams and select **Apps**&nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. In the project directory, navigate to the **./package** folder, select the zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. In the dialog, select **Add**. The tab uploads to Microsoft Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the left pane of Microsoft Teams, select the ellipses &#x25CF;&#x25CF;&#x25CF; and then choose the uploaded app to view the tab.

   The tab is successfully created and added in Microsoft Teams. Developers can also [reorder tabs](#reorder-tabs) in Microsoft Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the new directory using the following command or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The following steps guide the tab creation:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.

1. In Visual Studio, press **F5** or choose **Start Debugging** from the application's **Debug** menu to verify that the application loads properly. In a browser, navigate to:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project originates from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected during setup. The MVC services register via the dependency injection framework's `ConfigureServices()` method. Additionally, the empty template does not serve static content by default; therefore, the static files middleware is added in the `Configure()` method using the code below:

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

In ASP.NET Core, the `wwwroot` folder serves as the web root where the application looks for static files.

#### Index.cshtml

ASP.NET Core treats files named **Index** as the default home page. When the browser URL points to the root of the site, **Index.cshtml** displays as the home page.

#### AppManifest folder

This folder contains the required app package files:

* A full color icon sized 192 x 192 pixels.
* A transparent outline icon sized 32 x 32 pixels.
* A `manifest.json` file that defines the attributes of the app.

These files must be zipped in an app package for use in uploading the tab to Microsoft Teams. Microsoft Teams loads the `contentUrl` specified in the manifest, embeds it in an iframe, and displays it in the tab.

#### .csproj

In Visual Studio Solution Explorer, right-click on the project and select **Edit Project File**. Near the end of the file, the following code creates and updates the zip folder when the application builds:

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

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, navigate to the **Pages** > **Shared** folder and open **_Layout.cshtml**. Add the following within the `<head>` tags:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from the **Pages** folder and add `microsoftTeams.app.initialize()` within the `<script>` tags.

1. Save all changes.

1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
  
### Establish a secure tunnel to your tab

In the root of the project directory, run the following command to establish a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Navigate to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package file name is `tab.zip`, available at `/bin/Debug/netcoreapp3.1/tab.zip`.

1. Select `tab.zip` and open it in the Developer Portal.

1. A default **App ID** is generated and populated in the **Basic information** section.

1. Add Short and Long descriptions for the app in **Descriptions**.

1. In **Developer Information**, provide the required details and specify the ngrok HTTPS URL in **Website (must be a valid HTTPS URL)**.

1. Under **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and the Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.

1. Under **App features**, select **Personal app** > **Create your first personal app tab**, enter the name, and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL field blank, set **Context** to personalTab from the dropdown, and select **Confirm**.

1. Select **Save**.

1. In the Domains section, ensure the domains for the tabs include the ngrok URL without the HTTPS prefix, for example, `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar. The Developer Portal confirms that the custom app has been uploaded successfully and displays the **Add** page for the app in Teams.

1. Select **Add** to load the tab in Teams. The tab becomes available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   The tab is successfully created and added in Teams. Developers can also [reorder tabs](#reorder-tabs) in Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the new directory using the following command or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The following steps guide the tab creation:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln** in Visual Studio.

1. In Visual Studio, press **F5** or choose **Start Debugging** from the application's **Debug** menu to confirm that the application loads correctly. In a browser, visit:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project originates from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected during setup. The MVC services register via the dependency injection framework's `ConfigureServices()` method. Additionally, static files middleware is added in the `Configure()` method:

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

In ASP.NET Core, the `wwwroot` folder serves as the web root where the application finds static files.

#### AppManifest folder

This folder contains the required app package files:

* A **full color icon** sized 192 x 192 pixels.
* A **transparent outline icon** sized 32 x 32 pixels.
* A `manifest.json` file that defines the app's attributes.

These files must be zipped in an app package to upload the tab to Microsoft Teams. Microsoft Teams loads the `contentUrl` from the manifest, embeds it in an iframe, and displays it in the tab.

#### .csproj

In Visual Studio Solution Explorer, right-click on the project and select **Edit Project File**. At the file's end, the following code creates and updates the zip folder during the build:

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

The file **PersonalTab.cs** presents a message object and methods called from **PersonalTabController** when a user selects a button in the **PersonalTab** view.

#### Views

These views compose the various pages in ASP.NET Core MVC:

* Home: Files named **Index** serve as the default home page. When the browser URL points to the root, **Index.cshtml** displays as the home page.
* Shared: The partial view **_Layout.cshtml** defines the application's overall page structure and shared visual elements and references the Microsoft Teams Library.

#### Controllers

The controllers use the `ViewBag` property to dynamically transfer values to the views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, navigate to the **Views** > **Shared** folder and open **_Layout.cshtml**. Add the following within the `<head>` tags:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from the **Views** > **PersonalTab** folder and add `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Save the files.

1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the root of the project directory, run the following command to establish a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Navigate to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The name of the app package is **tab.zip**. It is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and open it in the Developer Portal.

1. A default **App ID** is generated and populated in the **Basic information** section.

1. Add Short and Long descriptions for the app in **Descriptions**.

1. In **Developer information**, provide the required details and enter the ngrok HTTPS URL in **Website (must be a valid HTTPS URL)**.

1. Under **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.

1. Under **App features**, select **Personal app** > **Create your first personal app tab**, enter the name, and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL field blank, choose **Context** as personalTab from the dropdown, and select **Confirm**.

1. Select **Save**.

1. In the Domains section, ensure that the domains for the tabs include the ngrok URL without the HTTPS prefix (e.g., `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar. The Developer Portal confirms that the custom app is uploaded successfully and displays the **Add** page in Teams.

1. Select **Add** to load the tab in Teams. The tab becomes available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    The tab is successfully created and added in Teams. Developers can also [reorder tabs](#reorder-tabs) in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor enables building interactive web UIs using C# instead of JavaScript. Developers can create both a tab app and a bot app with Blazor and the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after completing the step-by-step Blazor guide.":::

> [!NOTE]
> Agents Toolkit does not support the message extension capability.

The following table lists the required tools for building and deploying the app:

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams facilitates collaboration through chat, meetings, and calls. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |

## Prepare development environment

After installing the required tools, set up the development environment.

### Install Agents Toolkit

Agents Toolkit simplifies the development process by providing tools to provision and deploy cloud resources for the app, publish to Microsoft Teams Store, and more. Developers can use Agents Toolkit with Visual Studio or as the Agents Toolkit Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

Developers can use the latest version of Visual Studio to develop Microsoft Teams apps with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest version of Visual Studio.
1. Open the Visual Studio installer file (`.exe`) from the download folder.
1. In the Visual Studio Installer, select **Continue** to configure the installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.

1. In **Installation details**, select **Microsoft 365 Agents Toolkit**.

1. Select **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with Asp.NET, web development, and Microsoft Teams development tools options highlighted in red.":::

    Visual Studio installs in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), run the following using the `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

If required, use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

This condition occurs commonly on Linux and macOS systems.

Ensure that the npm global cache is added to the PATH. This adjustment is normally handled during the Node.js installation.

Developers can use the CLI with the `atk` command. Verify the command works by running `atk -h`.

> [!CAUTION]
> Before running TeamsFx in PowerShell terminals, developers must enable the remote signed execution policy for PowerShell.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

A tenant serves as a space or container for an organization in Microsoft Teams, where developers chat, share files, and run meetings. This space also accommodates uploading and testing a custom app. Verify that the tenant is properly configured for development.

### Enable custom app upload

After creating the app, developers must load it in Microsoft Teams without distributing it. This process is known as custom app upload. Sign in with a Microsoft 365 account to access this option.

To verify if the custom app upload is enabled:

1. In the Microsoft Teams client, select **Apps**.
1. Select **Manage your apps**.
1. Select **Upload an app**. If the **Upload a custom app** option is visible, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Contact the Teams administrator if the option to upload a custom app is not available.

### Create a free Teams developer tenant (optional)

Developers without a Teams developer account can obtain one for free by joining the Microsoft 365 developer program.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up the administrator account. When finished, a screen appears displaying the Microsoft 365 developer subscriptions.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying Microsoft 365 developer subscriptions for the Blazor app.":::

1. Sign in to Microsoft Teams using the newly created administrator account. Verify that the **Upload a custom app** option is available.

## Get a free Azure account

To host the app or access Azure resources, developers must have an Azure subscription. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before beginning.

With all the necessary tools and accounts in place, the development environment is ready for building the app.

## Create project workspace for your tab app

Begin Microsoft Teams app development by creating the first app using the tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of the tab app after completing the step-by-step Blazor guide.":::

This tutorial explains the steps to create, run, and deploy the first Microsoft Teams app using .NET/Blazor.

In this page, developers learn:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of the app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Agents Toolkit to create the first tab project. The toolkit guides developers through a series of pages to create and configure the Microsoft Teams app project:

1. **Create a new project** page: Select the project type.
1. **Configure your new project** page: Enter the project details.
1. **Create a new Teams application** page: Select the app capabilities.

**To create the tab project workspace**

1. Open the latest version of Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio displaying the Create a new project option highlighted in red for Blazor app.":::

   The **Create a new project** page appears.

1. Select the project type and details:

   1. Search for **Microsoft 365** in the templates dropdown.
   1. Select **Microsoft 365 Agents** as the template.
   1. Select **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with the Next option highlighted in red for Blazor app creation." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page appears.

1. Configure the new project details:

   1. Enter a suitable project name.

      > [!NOTE]
      > The project name automatically fills in as the **Solution name**. Developers can change the solution name without impacting the project name.

   1. Select the folder path to create the project workspace.
   1. Optionally enter a different solution name.
   1. Decide whether to save the project and solution in the same folder. For this tutorial, this option is not required.
   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with the Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select the Microsoft Teams app feature:

   1. Choose **Tab** as the capability.
   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

   The Microsoft Teams tab app is created in a few seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips for getting started while building the app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Microsoft Teams tab app.</summary>
   Review this short summary for creating a Microsoft Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation of the process for creating the Microsoft Teams tab app.":::
   </details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for the Teams tab app

After creating the project, the components required to build a basic tab app become available. Developers can review the project directory structure in the **Solution Explorer** pane of Visual Studio.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution Explorer displaying the components for building a basic personal app.":::

Agents Toolkit scaffolds the project based on the selected capabilities. Among other files, Agents Toolkit includes:

| Folder name | Contents |
| --- | --- |
| App icons | App icons are stored as PNG files in `color.png` and `outline.png`. |
| `manifest.json` | The app manifest for publishing through the Developer Portal for Microsoft Teams is stored in `Properties/manifest.json`. |
| `BackendController.cs` | A backend controller is available in `Controllers/BackendController.cs` to assist with authentication. |
| `Pages/Tab.razor` | The main tab page for the app. |
| `TeamsFx.cs` and `JS/src/index.js` | Files used for initializing communications with the Microsoft Teams host. |

Developers can add backend functionality by including additional ASP.NET Core controllers in the application.
  
## Build and run your first Teams tab app

After setting up the project workspace with Agents Toolkit, build the tab project.

To build and run the app:

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Prepare Teams App Dependencies options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Select the Microsoft 365 account or **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with Continue option highlighted in red.":::

1. Choose **Debug** > **Start Debugging** or press **F5** to run the app in debug mode.
    <br>
    <details>
    <summary>Learn what happens when the app runs locally in the debugger.</summary>

    When **F5** is selected, Agents Toolkit:

    1. Registers the application with Microsoft Entra ID.
    1. Registers the application for uploading in Microsoft Teams.
    1. Starts the backend locally.
    1. Starts the front-end hosted locally.
    1. Launches Microsoft Teams in a web browser with the necessary command to upload a custom app (the URL is registered inside the application manifest).

    </details>

1. If prompted, install the self-signed SSL certificate for local debugging.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning with the Yes option highlighted.":::

    Microsoft Teams launches in a web browser.

1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Select **Open** to load the app in the personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    The first tab app runs in the local environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot showing the first tab app running in the local environment.":::

1. Navigate through the page to view user details.

1. Select **Authorize** to allow the app to retrieve user details from Microsoft Graph.
    The app requests permission to access and display user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option in the personal tab of the app.":::

1. Select **Accept** to allow the app to access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of permissions requested displaying the app info.":::

    The developer’s photograph and details appear in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot showing basic information displayed on the personal tab of the app in Microsoft Teams.":::

    Developers can debug using breakpoints as in any other web application. The app supports hot reloading. Changes to any file within the project automatically reload the page.

    <br>
    <details>
    <summary>Learn how to troubleshoot when the app does not run locally.</summary>

    Running the app in Microsoft Teams requires a Microsoft 365 development account that permits custom app upload. More information is available in the Prerequisites section.

    </details>

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

After creating, building, and running the Microsoft Teams app with tab capability, the final steps deploy the app on Azure and preview it in Microsoft Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

Deploy the first app with tab capability on Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Provision in the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. In the **Provision** dialog, enter the subscription and resource group details:
   1. Select the subscription from the **Subscription name** dropdown.
   1. Select or create a resource group from the **Resource group** dropdown.
   1. If a new resource group is created, select the **Region**.
   1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of Provision with New and Provision highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning appears.

1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit with Provision highlighted in red.":::

   The provisioning process takes several minutes.

1. Once provisioning completes, select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit app with OK option highlighted in red.":::

1. Select **View Provisioned Resources** to access the Azure portal.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted in red.":::

1. Sign in to the Azure portal when prompted.

    The resource group (e.g., app-dev-rg) appears.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of app-dev-rg displaying the provisioned resources in the Azure portal.":::

    The resources are provisioned successfully in Azure.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Deploy to the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of app built with Agents Toolkit with OK option highlighted in red.":::

    The tab app deploys successfully to the cloud.

#### **To preview your tab app in Teams**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Preview in Teams options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Microsoft Teams launches in a web browser.

1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Select **Open** to open the app in the personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    The first tab app runs in the Azure environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot showing the personal tab of the app in Microsoft Teams.":::

1. Navigate through the page to view user details.

1. Select **Authorize** to allow the app to retrieve user details from Microsoft Graph.

    The app requests permission to access and display user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option in the personal tab of the app in Microsoft Teams.":::

1. Select **Accept** to allow access to user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of permissions requested displaying the app info.":::

    The developer’s photograph and details appear in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot of the app with the personal tab displaying basic information.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

Developers complete the tutorial to build a tab app with Blazor.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange all tabs in a personal app. It is possible to move the **bot chat** tab—which defaults to the first position—anywhere in the personal app's tab header. Two reserved tab `entityId` keywords are declared: **conversations** and **about**.

If a bot is created with a **personal** scope, it appears as the first tab by default. To reposition it, a static tab object with the reserved keyword **conversations** must be added to the manifest. The **conversations** tab appears on web and desktop depending on its position in the `staticTabs` array.

``` JSON
{
   "staticTabs": [
      {
         // Other tab settings
      },
      {
         "entityId": "conversations",
         "scopes": [
            "personal"
         ]
      }
   ]
}
```

> [!NOTE]
> On mobile, tabs are reordered as defined in the `staticTabs` array.

This property also lets developers set the default landing capability for the app. The configuration sets the app to open as a tab or a bot by default. For details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend a static tab to group chat, channels, and meetings, use app manifest v1.16 or later.

Static tabs can extend to group chat, channels, and meetings. Instead of pinned app content, tabs can behave as standalone apps where only one tab per app is pinned (for example, pinning a single YouTube app tab).

To extend static tabs, update the [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) by including the `scopes` and `context` parameters in the `staticTabs` property. When multiple static tabs are declared in the manifest and the app is added in the channel scope, only the first listed tab appears.

The following is an example manifest entry where a static tab works in all scopes and contexts in Microsoft Teams:

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
      "contentUrl": "https://contoso.com/content (displayed in Microsoft Teams canvas)", 
      "websiteUrl": "https://contoso.com/content (displayed in web browser)" 
  }
], 
```

If a context is not specified in the manifest, Microsoft Teams defaults to the following contexts:

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

## Enable personal tab apps for calling extensibility

Developers can create personal-scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use the appropriate scope and context to build apps that utilize tab type, static scope, personal context, and meeting side panels.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize the static tab experience in chats, channels, or meetings, use the `setConfig` APIs to update the `contentUrl` and `websiteUrl`. The example below demonstrates the process:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
  // Other configurations if needed
})
```

Only `contentUrl` and `websiteUrl` can be modified using `setConfig`; other properties remain unchangeable for static tabs.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are supported only on Microsoft Teams for Android devices.

Developers can create a personal tab that operates without an internet connection. An offline tab benefits users working in areas with limited or no network coverage, such as field agents or frontline workers. In an offline tab, users can:

* Record data through forms that may include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the device reconnects to the internet, the tab automatically synchronizes locally stored data with an Azure Blob storage. This ensures that all offline changes update the central storage, maintaining data consistency across the organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic showing how an offline tab works in the Microsoft Teams mobile client.":::

### Build an offline tab

Before building an offline tab, developers must ensure the [prerequisites](~/tabs/how-to/tab-requirements.md) for building a personal tab are met.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Note the account and container names for later use.
1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.
1. In the cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot showing how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. Under **EXPLORER**, navigate to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with the Azure Blob storage account and container values.
1. Press **F5** to debug the app. Microsoft Teams opens in a browser window when the build completes.
1. Sign in with the Microsoft 365 account when prompted.
1. In the dialog box, select **Add** to add the tab app to Microsoft Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot showing how to add the offline tab app to Microsoft Teams.":::

Congratulations! Developers have successfully created a Microsoft Teams tab with offline functionality.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

Developers can learn how to optimize tab performance in the Microsoft Teams Android and iOS clients by reviewing [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name                 | Description                                                                                                                    | .NET                                                                                                                                         | Node.js                                                                                                                   | Manifest                                                                                                                       |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Tab personal                | This sample showcases the development of a custom personal tab for Microsoft Teams, utilizing ASP.NET Core MVC to enhance user interaction. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp)                                        | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js)                   | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab        | This sample demonstrates a CRUD application that functions offline in Microsoft Teams, allowing developers to manage data without an internet connection and automatically sync with blob storage when online.  | NA                                                                                                                                           | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs)                   | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

## Next step

> [!div class="nextstepaction"]
> [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [Share to Teams from personal app or tab](~/concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md)
* [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md)
* [App manifest schema for Teams](/microsoft-365/extensibility/schema/)
* [Tabs on mobile](../design/tabs-mobile.md)