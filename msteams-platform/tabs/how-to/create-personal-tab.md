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

Tabs in chats, channels, or meetings behave more like apps because developers can pin only one tab per app in Teams for easy access.

> [!IMPORTANT]
>
> Agents Toolkit (formerly known as Teams Toolkit) is available within Visual Studio Code. This version provides many new app development features. Developers are recommended to use Agents Toolkit v5 for building Teams apps.

Developers must ensure that all the [prerequisites](~/tabs/how-to/tab-requirements.md) are met before building the tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Developers follow this step-by-step guide to build a tab app using JavaScript. This guide walks through the process from generating the solution to testing the tab on Teams.

> Developers may consider a real-world scenario such as building a quick access dashboard for personal productivity, where the tab displays personalized user data.

[Learn to build your tab app using JavaScript](../../sbs-gs-javascript.yml)

<!--
1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing the Node.js:

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

1. At the command prompt, create a new directory for your tab.

1. Enter the following command in your new directory to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide your values to a series of questions prompted by Microsoft Teams app generator to update your `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name serves as the project name. Accept the suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      Developers are already in the project directory. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      This title appears on the app manifest and in the app description. Enter a title or accept the default.

    * **Your (company) name? (max 32 characters)**

      This name is used in the app manifest. Enter the company name or accept the default.

    * **Which manifest version would you like to use?**

      Select the default schema version.

    * **Quick scaffolding? (Y/n)**

      Default is yes; enter **n** if entering the Microsoft Partner ID is desired.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      Use this field only if a developer is already part of the Microsoft Cloud Partner Program.

    * **What do you want to add to your project?**

      Select **( * ) A Tab**.

    * **The URL where you will host this solution?**

      The generator suggests an Azure website URL by default. When testing locally, a valid URL is not mandatory.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose not to include a loading indicator. The default is **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose not to remove the tab header-bar. The default is **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose not to include test framework support. The default is **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. The default is **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose not to include Application Insights. The default is **n**.

    * **Default Tab Name (max 16 characters)?**

      Enter the name for your tab. This name is used throughout the project file paths and URLs.

    * **What kind of Tab would you like to create?**

      Using arrow keys, select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose not to include Single-Sign-On support. The default is **n**.
    > [!NOTE]
    > In a tab, the home page appears only when the user navigates away and returns; the tab does not preserve previous state by design.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Developers add a content page to present the user interface of the tab. This step details how to create a new HTML page and configure the manifest.

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

1. Save **personal.html** in the application’s **public** folder at the following location:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open the `manifest.json` file located at:

    ```
    ./src/manifest/manifest.json
    ```

1. In the manifest, add the following JSON object to the empty `staticTabs` array (`"staticTabs":[]`):

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
    > Replace the path component **yourDefaultTabNameTab** with the value entered in the generator for **Default Tab Name** appended by the word **Tab**.  
    > For example, if the DefaultTabName is **MyTab**, then use **/MyTabTab/** in the URL path.

1. Update the **contentUrl** path component **yourDefaultTabNameTab** with the actual tab name.
1. Save the updated `manifest.json` file.
1. Open **Tab.ts** located at:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following entry to the list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. The tab code is complete and developers can now interact with it in Teams.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+a+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

Developers must generate an app package to run the application in Teams. The app package is generated via a gulp task that validates the `manifest.json` file and creates a zip folder in the `./package` directory.

At the command prompt, run the following command:

    gulp manifest

### Build and run your application

#### Build your application

Transpile the solution into the **./dist** folder by entering:

```cmd
gulp build
```

#### Run your application

1. Start the local web server by entering the command:

    ```cmd
    gulp serve
    ```

1. In a browser, enter the URL below to view the application’s home page:

    http://localhost:3007/<yourDefaultAppNameTab>/

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. To view the personal tab, browse to:

    http://localhost:3007/<yourDefaultAppNameTab>/personal.html

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+a+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

To allow Teams to access the local instance, run the following command to establish a secure tunnel:

```cmd
gulp ngrok-serve
```

Teams uses **ngrok** to expose the local tab until the tunnel session ends.

### Upload your application to Teams

1. In Teams, open **Apps**.

    :::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::

1. Choose **Manage your apps** and then select **Upload an app** followed by **Upload a custom app**.
1. In the project directory, open the **./package** folder, select the zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. In the dialog that appears, select **Add**. The tab uploads successfully to Teams.
1. In Teams’ left pane, choose the ellipses (&#x25CF;&#x25CF;&#x25CF;) and then select the uploaded app to view the tab.

The tab is successfully created and added in Teams. Developers can also [reorder tabs](#reorder-tabs) within Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

This section demonstrates how developers can build a tab using ASP.NET Core. It includes cloning existing samples, running the solution, and testing for multiple pages.

1. At the command prompt, create a new directory for the tab project.
1. Clone the sample repository into this directory using either the command below or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The following steps guide developers through creating the tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.
1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.
1. In Visual Studio, press **F5** or select **Start Debugging** from the **Debug** menu to confirm that the application loads correctly. In your browser, check the following URLs:
   • http://localhost:3978/  
   • http://localhost:3978/personalTab  
   • http://localhost:3978/privacy  
   • http://localhost:3978/tou

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This sample originated from an ASP.NET Core 3.1 empty template with the **Advanced - Configure for HTTPS** option selected. The MVC services are registered in the `ConfigureServices()` method, and static file middleware is added in `Configure()`:

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

ASP.NET Core looks for static files in this web root folder.

#### Index.cshtml

Files named **Index** are used as the default or home page. When developers navigate to the site root URL, **Index.cshtml** displays as the home page.

#### AppManifest folder

This folder contains required app package files:
• A full color icon (192 x 192 pixels).  
• A transparent outline icon (32 x 32 pixels).  
• A `manifest.json` file that outlines the attributes of the app.

These files are packaged in a zip file for Teams deployment. Teams embeds the URL provided in the `contentUrl` property of the manifest into an iframe.

#### .csproj

In Visual Studio’s Solution Explorer, right-click the project and select **Edit Project File**. The project file includes code that automatically generates and updates the app package (zip file) after each build:

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

1. In Visual Studio Solution Explorer, navigate to **Pages** > **Shared** folder and open **_Layout.cshtml**. Within the `<head>` section, add the following script tags:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Solution Explorer, open **PersonalTab.cshtml** located under the **Pages** folder. Add `microsoftTeams.app.initialize()` within the `<script>` section.
1. Save all changes.
1. Press **F5** or select **Start Debugging** to run the application.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
  
### Establish a secure tunnel to your tab

From the project root directory, run this command to open a secure tunnel for Teams access:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Navigate to [**Developer portal**](https://dev.teams.microsoft.com/home).
1. In **Apps**, select **Import app**.
1. The app package file is named `tab.zip` and is located at `/bin/Debug/netcoreapp3.1/tab.zip`.
1. Open `tab.zip` in the Developer Portal.
1. A default **App ID** populates under **Basic information**.
1. Update the Short and Long descriptions under **Descriptions**.
1. In **Developer Information**, add the required details and enter the ngrok HTTPS URL in the **Website (must be a valid HTTPS URL)** field.
1. Under **App URLs**, set the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then click **Save**.
1. In **App features**, select **Personal app** and then **Create your first personal app tab**. Enter the tab name and update the **Content URL** to `https://<yourngrokurl>/personalTab`. Leave the Website URL blank and select **Context** as personalTab from the list, then click **Confirm**.
1. Click **Save**.
1. In the Domains section, add your ngrok URL without the HTTPS prefix (e.g., `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. In the Developer Portal toolbar, select **Preview in Teams**. The Developer Portal confirms the custom app upload and displays the **Add** screen.
1. Select **Add** to load the tab in Teams. The personal tab is now available.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Personal tab uploaded":::

    Developers can also [reorder tabs](#reorder-tabs) within Teams.
    
::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

This section guides developers through building a tab using ASP.NET Core MVC, including sample code and project configuration.

1. At the command prompt, create a new directory for the tab project.
1. Clone the sample repository using the command below or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The steps for this approach are:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.
1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln**.
1. Press **F5** or select **Start Debugging** in the **Debug** menu to confirm the application loads correctly. In a browser, check these URLs:
   • http://localhost:3978  
   • http://localhost:3978/personalTab  
   • http://localhost:3978/privacy  
   • http://localhost:3978/tou

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project originated from an ASP.NET Core 3.1 empty template with **Advanced - Configure for HTTPS** enabled. The `ConfigureServices()` method registers MVC services and the static files middleware is added in `Configure()`:

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

ASP.NET Core uses this folder as its web root to serve static files.

#### AppManifest folder

This folder holds required app package files:
• A full color icon (192 x 192 pixels).  
• A transparent outline icon (32 x 32 pixels).  
• A `manifest.json` file that outlines the app attributes.

The packaged files are zipped and later uploaded to Teams. Teams loads the URL specified in the `contentUrl` property.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and choose **Edit Project File**. The project file contains code that creates and updates a zip folder after every build:

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

The **PersonalTab.cs** file defines a message object and provides methods for use in **PersonalTabController** when a user interacts with the **PersonalTab** view.

#### Views

The following views exist:
• Home: ASP.NET Core automatically displays **Index.cshtml** as the default page.
• Shared: The **_Layout.cshtml** partial view contains shared user interface elements and references the Teams library.

#### Controllers

Controllers transfer dynamic values to Views using properties like `ViewBag`.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a+tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, open **Views** > **Shared** folder and then **_Layout.cshtml**. Within the `<head>` section, add these script tags:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. Open **PersonalTab.cshtml** from the **Views** > **PersonalTab** folder and insert `microsoftTeams.app.initialize()` within the `<script>` section.
1. Save the changes.
1. Press **F5** or select **Start Debugging** from the **Debug** menu to run the app.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
  
### Establish a secure tunnel to your tab

From the project root, run:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).
1. Under **Apps**, select **Import app**.
1. The app package, named **tab.zip**, is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Open **tab.zip** in the Developer Portal.
1. A default **App ID** auto-populates under **Basic information**.
1. Enter Short and Long descriptions under **Descriptions**.
1. In **Developer information**, include the required details and provide your ngrok HTTPS URL in the **Website** field.
1. Under **App URLs**, set the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then click **Save**.
1. In **App features**, select **Personal app** > **Create your first personal app tab**. Enter the tab name and configure the **Content URL** to `https://<yourngrokurl>/personalTab`. Leave the Website URL blank. From the dropdown, choose **Context** as personalTab and click **Confirm**.
1. Click **Save**.
1. In the Domains section, include the ngrok URL without the HTTPS prefix (e.g., `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Choose **Preview in Teams** from the Developer Portal toolbar. The portal confirms successful custom app upload and displays an **Add** page.
1. Select **Add** to load the tab app in Teams.
1. In the dialog, choose **Open** to launch the tab in personal scope.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
Developers now see the personal tab running in Teams and can modify or debug as required.

::: zone-end

::: zone pivot="blazor-app"

Blazor lets developers build interactive web UIs using C# instead of JavaScript. Developers can create both a tab app and a bot app with Blazor using the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the guide is completed.":::

> [!NOTE]
> Agents Toolkit does not support the message extension capability.

Developers require the following tools when building and deploying the app:

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)| Use Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Use Microsoft Teams to collaborate and test your app. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | Use a browser with developer tools for debugging. |

## Prepare development environment

After installing the required tools, set up the development environment.

### Install Agents Toolkit

Agents Toolkit streamlines the development process by provisioning and deploying cloud resources for the app. Developers can use Agents Toolkit via Visual Studio or the Agents Toolkit Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

Developers can use the latest Visual Studio to develop Teams apps with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest version of Visual Studio.
1. Open the Visual Studio installer executable from the download folder.
1. In the Visual Studio Installer page, select **Continue** to configure the installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options.":::

1. Under **Workloads**, select **ASP.NET and web development**.
1. In **Installation details**, choose **Microsoft 365 Agents Toolkit**.
1. Click **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview showing selected options under installation details.":::

    The installation completes in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), run the following command using npm:

``` bash
npm install -g @microsoft/teamsfx-cli
```

If necessary due to environment permissions, run:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

Ensure that the npm global cache is added to the PATH. This step is handled by the Node.js installer in most cases.

Use the CLI by calling the `atk` command. Verify its functionality by running:

    atk -h

> [!CAUTION]
> Before running TeamsFx in PowerShell, enable the remote signed execution policy.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

Teams uses a tenant as the container for development, testing, and collaboration. Developers verify the ability to upload and test custom apps within their tenant.

### Enable custom app upload

After app creation, developers can load the app in Teams without distributing it. To verify custom app upload permissions, sign in with a Microsoft 365 account and:

1. In the Teams client, select **Apps**.
1. Select **Manage your apps**.
1. Choose **Upload an app**. If **Upload a custom app** is available, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Developers should contact the Teams administrator if the custom app upload option is missing.

### Create a free Teams developer tenant (optional)

If developers do not have a Teams developer account, they can join the Microsoft 365 developer program for free.

1. Visit the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. On the welcome screen, select **Set up E5 subscription**.
1. Set up the administrator account and complete the steps.
1. Sign in to Teams using the new administrator account and verify the availability of the **Upload a custom app** option.

## Get a free Azure account

For hosting the app or accessing additional Azure resources, developers can [create a free Azure account](https://azure.microsoft.com/free/).

With the development tools and accounts in place, developers are ready to build the Teams tab app.

## Create project workspace for your tab app

Begin Teams app development by creating an app with tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of a tab app after the guide is completed.":::

This tutorial guides developers through creating, running, and deploying a Teams app using .NET/Blazor. Topics covered include:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of your app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Agents Toolkit walks developers through creating a new tab project. The toolkit guides developers through:

• Creating a new project.  
• Configuring project details.  
• Selecting Teams app capabilities.

**To create the tab project workspace:**

1. Open the latest Visual Studio.
1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted.":::

   The **Create a new project** page appears.
1. Select the project type and details:
   • Search for **Microsoft 365** in the templates list.  
   • Choose **Microsoft 365 Agents** as the template.  
   • Click **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page appears.
1. Configure the project details:
   • Enter a suitable project name.  
     > [!NOTE]
     > The project name automatically fills the **Solution name**. Changing the solution name does not affect the project name.
   • Choose the folder for the project workspace.
   • Optionally, provide a different solution name.
   • Optionally, check to save the project and solution in the same folder. This option is not required for the tutorial.
   • Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with Create option highlighted." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.
1. Select the Teams app capability:
   • Choose **Tab**.
   • Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted.":::

   The Teams tab app project is created in seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips for getting started." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Developers can watch this short recap to review the process.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows the process of creating a Teams tab app.":::
   </details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

Upon project creation, developers see a scaffolding that includes the components needed for a basic tab app. The directory structure appears in Visual Studio’s **Solution Explorer**.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution Explorer displaying the components of a personal app.":::

Agents Toolkit creates the scaffolding based on the chosen capabilities. Key components include:

| Folder name | Contents |
| --- | --- |
| App icons | App icons stored as PNG files (e.g., `color.png` and `outline.png`). |
| `manifest.json` | The app manifest for Teams publishing, stored in `Properties/manifest.json`. |
| `BackendController.cs` | A backend controller included in `Controllers/BackendController.cs` for authentication. |
| `Pages/Tab.razor` | A Razor page for the tab content. |
| `TeamsFx.cs` and `JS/src/index.js` | Files to initialize communication with the Teams host. |

Developers can add backend functionality by adding ASP.NET Core controllers as needed.

## Build and run your first Teams tab app

After setting up the project workspace with Agents Toolkit, developers can build and run the app.

To build and run the app:

1. In Visual Studio, go to **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio highlighting Agents Toolkit options." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Sign in with the Microsoft 365 account or select **Add an account**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account sign-in.":::

1. Select **Debug** > **Start Debugging** or press **F5**.
    <br>
    <details>
    <summary>Learn what happens when running the app in debug mode.</summary>
    
    When developers run the app:
    • The application registers with Microsoft Entra ID.
    • The application registers for custom app upload to Teams.
    • The backend starts locally.
    • The front-end serves locally.
    • Teams launches in a web browser using a custom app URL specified in the app manifest.
    
    </details>

1. If prompted, install the self-signed SSL certificate to enable local debugging.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning prompting to trust the certificate.":::

1. When Teams loads in the browser, select **Add**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. When the scope selection dialog appears, select **Open** to add the app in the personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

Congratulations, the first tab app runs in the local environment!

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot showing the tab app running locally.":::

1. Navigate through the page to view user details.
1. Select **Authorize** to allow the app to retrieve user details using Microsoft Graph.
    
    The app requests permission to display user information.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option.":::

1. Select **Accept** to grant permissions.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Microsoft Graph permissions.":::
    
    The personal tab displays the user’s photograph and details.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot showing basic user information in the personal tab.":::
    
1. Developers can set breakpoints and debug while the app supports hot reloading.
1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

After building and running the app, finalize deployment with these steps:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

The following instructions show how to deploy the tab app to Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot with Provision in the Cloud option highlighted." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. Enter subscription and resource group details:
   • Choose a **Subscription name**.  
   • Select an existing **Resource group** or opt to create a new one.  
   • If creating a new resource group, select the **Region**.
   • Click **Provision**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot showing subscription selection and Provision option." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

1. When a provision warning displays, select **Provision**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot displaying a provision warning.":::
    
1. After provisioning completes, select **OK**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of provision complete status with OK option.":::

1. Select **View Provisioned Resources** to navigate to the Azure portal.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot highlighting View Provisioned Resources in Agents Toolkit.":::

1. Sign in to the Azure portal when prompted. Developers will see the provisioned resource group (for example, app-dev-rg).

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of the resource group displayed in the Azure portal.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. From Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot showing Deploy to the Cloud option in Agents Toolkit." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Click **OK**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of successful cloud deployment with OK option highlighted.":::
    
    The tab app deploys to the cloud.

#### **To preview your tab app in Teams**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot showing Preview in Teams option." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::
    
    Teams loads in a web browser.
1. Click **Add**.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::
    
1. When prompted, select **Open** to display the app in personal scope.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of scope selection dialog with the Open option.":::
    
Congratulations, the tab app now runs in Azure!

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot showing the tab app running in Azure.":::
    
1. Navigate within the app to view user details.
1. Click **Authorize** to allow the app to retrieve user details via Microsoft Graph.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize option for user details.":::
    
1. Click **Accept** to grant permissions.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot displaying Microsoft Graph permission prompt.":::
    
    The personal tab displays user information, such as photographs and details.
    
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot of the app displaying user details in personal tab.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

Developers have now completed the tutorial to build a tab app with Blazor.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange tabs in their personal app. The **bot chat** tab always appears first by default. By adding a static tab with the reserved keyword **conversations**, developers reposition the bot tab as needed.

If a bot is created with **personal** scope, it shows in the first tab by default. To reposition it, add the following static tab object with the reserved **conversations** entityId. Teams renders the tab based on its placement in the `staticTabs` array:

``` JSON
{
   "staticTabs":[
      {
         // Other static tab objects
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

> [!NOTE]
> In Teams mobile, tabs are rearranged as defined in the `staticTabs` array.

This configuration also allows developers to set the default landing capability for the app. Developers can configure the app to open as a tab or a bot by default. For additional details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> Extending static tabs to group chat, channels, and meetings requires using app manifest v1.16 or later.

Developers can extend static tabs beyond personal scope to also function in group chats, channels, and meetings. Instead of pinned app content, tabs can behave as full apps with only one pin per app.

To extend static tabs, update the [app manifest](~/resources/schema/manifest-schema.md#statictabs) by specifying `scopes` and `context` in the `staticTabs` property. Note that when multiple static tabs are declared in the manifest and the app is added in a channel scope, only the first tab listed appears. For example, the following manifest snippet supports multiple scopes and contexts:

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

If a context array is not defined, Teams assumes the following default contexts:

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

Developers can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. By using the appropriate scope and context values (tab type, static scope, personal context, and meeting side panels), developers support calling-related features within the app.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

Developers can customize the static tab experience in chats, channels, or meetings by using the `setConfig` APIs. This API allows updating of the `contentUrl` and `websiteUrl` dynamically. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}
```

Only changes to the `contentUrl` and `websiteUrl` properties are supported with `setConfig`. Other properties cannot be updated dynamically.

## Offline tabs

> [!NOTE]
> Offline functionality in personal tabs is supported only on Teams for Android devices.

Developers can build personal tabs that function even when there is no internet connection. Offline tabs benefit scenarios where users work in areas with poor or no connectivity, such as field operations or remote work environments. In an offline tab, users can:

* Record data using forms, including multimedia elements.
* View details of previous submissions, incidents, or forms.

When connectivity returns, the app synchronizes the locally stored data with Azure Blob storage to maintain consistency.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows offline tab functionality on Teams mobile.":::

### Build an offline tab

Before developing an offline tab, developers should meet the [prerequisites](~/tabs/how-to/tab-requirements.md) for building a personal tab.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal) and record the account and container names.
1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.
1. In the cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot of opening the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. In the **EXPLORER** pane, go to **server** > **blobStoreOperations.js** and update the placeholders `{{ account-Name }}` and `{{ container-Name }}` with your Azure Blob storage account name and container name.
1. Press **F5** to start debugging the app. The app builds and opens Teams in a browser window.
1. When prompted, sign in with a Microsoft 365 account.
1. When the dialog appears, select **Add** to install the offline tab app in Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot showing how to add the offline tab app in Teams.":::

Congratulations! Developers have successfully created a Teams tab with offline functionality.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For guidance on optimizing tab performance on Teams for Android and iOS, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name            | Description                                                                                                                                  | .NET                                                                                   | Node.js                                                                                      | Manifest                                                                                                               |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| Tab personal           | Demonstrates development of a custom personal tab using ASP.NET Core MVC to enhance user interactivity.                                      | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp)  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js)  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip)  |
| Offline personal tab   | Demonstrates a CRUD application that functions offline in Teams, allowing management of data locally and automatic synchronization with blob storage. | NA                                                                                     | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip)  |

## Next step

> [!div class="nextstepaction"]
> [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [Share to Teams from personal app or tab](~/concepts/build-and-test/share-to-teams-from-personal-app-or-tab.md)
* [Developer Portal for Teams](../../concepts/build-and-test/teams-developer-portal.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Tabs on mobile](../design/tabs-mobile.md)
