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

Tabs in chats, channels, or meetings behave more like apps because only one tab per app can be pinned to the left pane for easy access.

> [!IMPORTANT]
>
> Microsoft has introduced [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (previously known as Teams Toolkit) extension within Visual Studio Code. This version comes with many new app development features. Agents Toolkit v5 is recommended for building Teams apps.

Developers must ensure all [prerequisites](~/tabs/how-to/tab-requirements.md) are in place to build a tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the step-by-step guide to [build your tab app using JavaScript](../../sbs-gs-javascript.yml).

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

1. Enter the following command in the new directory to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Respond to the series of questions prompted by the Microsoft Teams app generator so that the manifest.json file is updated accordingly.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update your manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name serves as your project name. Developers can accept the suggested name by pressing **Enter**.

    * **Where do you want to place the files?**

      Developers confirm they are in the project directory by pressing **Enter**.

    * **Title of your Microsoft Teams app project?**

      The title becomes your app package name and is used in the manifest and description. Either enter a new title or press **Enter** to accept the default.

    * **Your (company) name? (max 32 characters)**

      The company name appears in the app manifest. Enter a company name or press **Enter** to accept the default.

    * **Which manifest version would you like to use?**

      Developers select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; press **n** to enter your Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and should only be used if already a member of the [Microsoft Cloud Partner Program](https://partner.microsoft.com).

    * **What do you want to add to your project?**

      Select **( * ) A Tab**.

    * **The URL where you will host this solution?**

      The generator suggests an Azure website URL by default. For local testing, a valid URL is not necessary.

    * **Would you like to show a loading indicator when your app/tab loads?**

      Choose not to include a loading indicator during the app or tab load. The default is no; press **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose not to remove the tab header-bar from personal apps. The default is no; press **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose not to include a test framework. The default is no; press **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. The default is no; press **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose not to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; press **n**.

    * **Default Tab Name (max 16 characters)?**

      Provide a name for the tab. This name is used throughout the project, such as in file names or URL paths.

    * **What kind of Tab would you like to create?**

      Using the arrow keys, select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Opt not to include Microsoft Entra Single-Sign-On support. Although the default is yes, press **n**.
    > [!NOTE]
    > In a tab, the home page appears only when the user navigates back to it (for instance, by pressing the back button). The tab is designed not to retain the previous state.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Developers must create a content page and update the existing files of the tab application as follows:

1. Create a new file named **personal.html** in Visual Studio Code containing the markup:

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

1. Save **personal.html** in the application’s **public** folder located at:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` from the location:

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
    > The path component **yourDefaultTabNameTab** equals the value entered in the generator for **Default Tab Name** appended with the word **Tab**.
    >
    > For example: If DefaultTabName is **MyTab**, then the folder becomes **/MyTabTab/**.

1. Update the **contentUrl** path component **yourDefaultTabNameTab** with the actual tab name.
1. Save the updated `manifest.json` file.
1. Open **Tab.ts** from the path:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following decorator to the list of iFrame decorators:

    ```typescript
    @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. This completes the tab code.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

An app package is required to build and run the application in Teams. Developers create the app package through a gulp task that validates the `manifest.json` file and generates a zip folder in the `./package` directory. At the command prompt, run the command:

```cmd
gulp manifest
```

### Build and run your application

#### Build your application

At the command prompt, run the following command to transpile the solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, start a local web server by executing:

    ```cmd
    gulp serve
    ```

1. In a browser, navigate to:

    ```
    http://localhost:3007/<yourDefaultAppNameTab>/
    ```

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. To view your tab, browse to:

    ```
    http://localhost:3007/<yourDefaultAppNameTab>/personal.html
    ```

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

Exit the local server and run the command to create a secure tunnel:

```cmd
gulp ngrok-serve
```

Once the tab is uploaded to Teams via **ngrok** and saved successfully, developers can view it in Teams until the tunnel session ends.

### Upload your application to Teams

1. In Teams, select **Apps** &nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Navigate to **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Access your project directory, open the **./package** folder, select the zip folder, and then open it.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. In the dialog, click **Add**. The tab is uploaded to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In Teams’ left pane, click the ellipses (&#x25CF;&#x25CF;&#x25CF;) and select the uploaded app to display the tab.

Developers have now successfully created and added a tab in Teams. Tabs can also be [reordered](#reorder-tabs) within Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for the tab project.
1. Clone the sample repository into the new directory by running:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The creation process follows these steps:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.
1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** and open **PersonalTab.sln**.
1. Press **F5** (or choose **Start Debugging** from the application’s **Debug** menu) to verify that the application loads correctly. In the browser, check the following URLs:

    * http://localhost:3978/
    * http://localhost:3978/personalTab
    * http://localhost:3978/privacy
    * http://localhost:3978/tou

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

The project is created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected. MVC services are registered via the dependency injection framework’s `ConfigureServices()` method. Also, because the empty template does not serve static content by default, the static files middleware is included in the `Configure()` method as follows:

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

ASP.NET Core uses the web root folder (wwwroot) to locate static files.

#### Index.cshtml

ASP.NET Core designates files named **Index** as the default or home page. When the browser URL points to the site root, **Index.cshtml** is rendered.

#### AppManifest folder

This folder holds the required app package files:

* A full color icon (192 x 192 pixels)
* A transparent outline icon (32 x 32 pixels)
* A `manifest.json` file that specifies app attributes

These files are zipped to create an app package for Teams. Teams loads the `contentUrl` defined in the manifest, embeds it in an <iframe>, and renders it within the tab.

#### .csproj

Developers can right-click the project in Visual Studio Solution Explorer and select **Edit Project File**. At the end of the file, the following code creates and updates the zip folder when the application builds:

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

1. Within Visual Studio Solution Explorer, open **Pages** > **Shared** and then open **_Layout.cshtml**. Add the following inside the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from the **Pages** folder and insert `microsoftTeams.app.initialize()` within the `<script>` tags.
1. Save all changes.
1. Press **F5** (or select **Start Debugging** from the **Debug** menu) to run the application.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Establish a secure tunnel to your tab

From the project root directory in the command prompt, start a secure tunnel by executing:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Open [**Developer portal**](https://dev.teams.microsoft.com/home).
1. Within **Apps**, select **Import app**.
1. The app package file, named **tab.zip**, is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** to open it within the Developer Portal.
1. A default **App ID** is automatically generated in the **Basic information** section.
1. Add the Short and Long descriptions in **Descriptions**.
1. In **Developer Information**, provide the required details and, in **Website (must be a valid HTTPS URL)**, enter the ngrok HTTPS URL.
1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.
1. In **App features**, select **Personal app** > **Create your first personal app tab**, then input a name and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, select **Context** as personalTab from the dropdown, and click **Confirm**.
1. Select **Save**.
1. In the Domains section, ensure that the domains include the ngrok URL without the HTTPS prefix, e.g., `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. From the Developer Portal toolbar, select **Preview in Teams**; the portal confirms that the custom app has been uploaded successfully, and the **Add** page appears in Teams.
1. Click **Add** to load the tab in Teams. The tab becomes available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

    Developers have now successfully created and added a tab in Teams. Tabs can be [reordered](#reorder-tabs).

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for the tab project.
1. Clone the sample repository into the new directory by running:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

This process follows these steps:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.
1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** and open **PersonalTabMVC.sln**.
1. Press **F5** (or select **Start Debugging** from the **Debug** menu) to verify that the application loads correctly. In the browser, check the URLs:

    * http://localhost:3978
    * http://localhost:3978/personalTab
    * http://localhost:3978/privacy
    * http://localhost:3978/tou

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected. The MVC services register via `ConfigureServices()` and the static files middleware is added in `Configure()` as shown:

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

ASP.NET Core locates static files within the web root folder (wwwroot).

#### AppManifest folder

The folder contains essential app package files including:

* A **full color icon** (192 x 192 pixels)
* A **transparent outline icon** (32 x 32 pixels)
* A `manifest.json` file with the app attributes

These files must be zipped to form an app package for Teams. Teams loads the `contentUrl` defined in the manifest, embeds it in an iFrame, and displays it in the tab.

#### .csproj

Right-click on the project in Visual Studio Solution Explorer and select **Edit Project File**. The code at the file’s end creates and updates a zip folder during build:

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

The **PersonalTab.cs** model provides a message object and related methods, invoked by **PersonalTabController** when a user interacts with a button in the **PersonalTab** view.

#### Views

Views represent different pages:

* Home: ASP.NET Core uses files named **Index** as the default homepage.
* Shared: The partial view **_Layout.cshtml** contains shared structure and references to the Teams Library.

#### Controllers

Controllers make use of `ViewBag` to dynamically pass values to corresponding Views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, open **Views** > **Shared** and then **_Layout.cshtml**. Insert the following scripts inside the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. Open **PersonalTab.cshtml** from **Views** > **PersonalTab** and add `microsoftTeams.app.initialize()` within the `<script>` tags.
1. Save all changes.
1. Press **F5** (or choose **Start Debugging** from the **Debug** menu) to run the application.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
  
### Establish a secure tunnel to your tab

From the project root directory in the command prompt, start a secure tunnel by executing:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Open [**Developer portal**](https://dev.teams.microsoft.com/home).
1. Under **Apps**, select **Import app**.
1. The app package file, **tab.zip**, is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** to open it in the Developer Portal.
1. A default **App ID** is created and appears in **Basic information**.
1. Provide the Short and Long descriptions within **Descriptions**.
1. In **Developer Information**, supply the required details and in **Website (must be a valid HTTPS URL)**, enter the ngrok HTTPS URL.
1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then click **Save**.
1. Under **App features**, choose **Personal app** > **Create your first personal app tab**, enter a name, and update the **Content URL** with `https://<yourngrokurl>/personalTab`. Leave the Website URL blank, select **Context** as personalTab from the dropdown list, and click **Confirm**.
1. Click **Save**.
1. In the Domains section, ensure that the list of domains contains the ngrok URL without the HTTPS prefix (e.g., `<yourngrokurl>.ngrok.io`).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. From the Developer Portal toolbar, click **Preview in Teams**. Developer Portal confirms a successful upload, and the **Add** page appears in Teams.
1. Click **Add** to load the tab in Teams.
1. In the dialog, select **Open** to display the app in personal scope.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
Developers have now successfully created and added a tab in Teams. Tabs can be [reordered](#reorder-tabs) as needed.

::: zone-end

::: zone pivot="blazor-app"

Blazor allows developers to build interactive web UIs using C# instead of JavaScript. Both a tab app and a bot app can be created with Blazor and the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide is successfully completed.":::

> [!NOTE]
> Agents Toolkit does not support message extension capability.

Below is a list of tools required for building and deploying the app.

| &nbsp;         | Install                                                                                  | For using...                                                                                                                              |
|----------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **Required**   | &nbsp;                                                                                   | &nbsp;                                                                                                                                    |
| &nbsp;         | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17) | Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1).                                                               |
| &nbsp;         | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app)                | Microsoft Teams to collaborate via chat, meetings, and calls in a unified app.                                                            |
| &nbsp;         | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser equipped with developer tools.                                                                                                 |

## Prepare development environment

After installing the required tools, set up the development environment.

### Install Agents Toolkit

Agents Toolkit simplifies development by provisioning and deploying cloud resources for the app, publishing to the Teams Store, and more. Developers can use Agents Toolkit with Visual Studio or the Agents Toolkit Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

Developers can use the latest version of Visual Studio to develop Teams apps with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest version of Visual Studio.
1. Launch the Visual Studio installer (.exe) from the download folder.
1. In the Visual Studio Installer, select **Continue** to configure the installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue option highlighted.":::

1. Under **Workloads**, select **ASP.NET and web development**.
1. Under **Installation details**, select **Microsoft 365 Agents Toolkit**.
1. Click **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with the ASP.NET, web development, and Microsoft Teams development tools options highlighted.":::

Visual Studio installs in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI) via npm, run:

```bash
npm install -g @microsoft/teamsfx-cli
```

Depending on the configuration, developers might need to use `sudo`:

```bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

Ensure the npm global cache is added to the PATH (typically handled by the Node.js installer).

The CLI is available via the `atk` command. Verify by running:

```bash
atk -h
```

> [!CAUTION]
> Before running TeamsFx in PowerShell terminals, the remote signed execution policy for PowerShell must be enabled.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

A tenant acts as a container for an organization in Teams where chats, file sharing, and meetings occur. It also serves as the space to upload and test custom apps. Developers should verify readiness for custom app upload.

### Enable custom app upload

Custom app upload lets developers test apps in Teams without full distribution. To verify if custom app upload is enabled:

1. In the Teams client, open **Apps**.
1. Go to **Manage your apps**.
1. Click **Upload an app**. The presence of the **Upload a custom app** option confirms that custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot showing the option to upload a custom app in Teams.":::

    > [!NOTE]
    > If the option does not appear, contact the Teams administrator.

### Create a free Teams developer tenant (optional)

Developers without a Teams developer account can join the Microsoft 365 developer program at no cost:

1. Visit the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Click **Join Now** and follow the onscreen instructions.
1. On the welcome screen, select **Set up E5 subscription**.
1. Configure the administrator account. Once complete, a subscription screen appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying available Microsoft 365 developer subscriptions.":::

1. Sign in to Teams using the new administrator account and verify the presence of the **Upload a custom app** option.

## Get a free Azure account

If hosting the app or using Azure resources is planned, developers must possess an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before proceeding.

With all tools installed and accounts set up, developers can now create and build a Teams app with tab capability.

## Create project workspace for your tab app

Initiate Teams app development by creating an app that uses tab functionality.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of the tab app after completing the Blazor guide.":::

This tutorial covers:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [A tour of the source code for the Teams tab app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Agents Toolkit guides developers through creating the tab project workspace using several steps:

1. On the **Create a new project** page, select the desired project type.
1. On the **Configure your new project** page, enter the project details.
1. On the **Create a new Teams application** page, select the app capabilities.

**To create the tab project workspace:**

1. Open the latest version of Visual Studio.
1. Click **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio displaying the Create a new project option.":::

   The **Create a new project** page is displayed.

1. Specify the project type and details:
   1. Search for **Microsoft 365** in the templates dropdown.
   1. Choose **Microsoft 365 Agents** as the template.
   1. Click **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of the Create a new project page with the Next option selected." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page appears.

1. Provide the project details:
   1. Enter a suitable project name.

      > [!NOTE]
      > The project name automatically fills in as the **Solution name**. Developers may modify the solution name without affecting the project name.

   1. Choose the folder path for the project workspace.
   1. Optionally, enter a different solution name.
   1. (Optional) Check the option to save the project and solution in the same folder; this step is not required for this tutorial.
   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of the Configure your new project page with the Create option selected." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. On the **Create a new Teams application** page, select the Teams app feature:
   1. Choose **Tab** as the app capability.
   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot showing the Tab feature and Create option selected in the Create a new Teams application page.":::

   The Teams tab app is generated within seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying initial tips for building the app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this brief recap for creating a Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical walkthrough of the Teams tab app creation process.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
   </details>

### Take a tour of the source code for Teams tab app

Once the project is generated, developers have access to all components required for a basic tab app. Use the **Solution Explorer** pane in Visual Studio to examine the directory structure.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution Explorer displaying files and folders for a personal tab app.":::

Agents Toolkit scaffolds the project based on the selected capabilities. Key components include:

| Folder name    | Contents                                                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| App icons      | PNG files for the app icons stored as `color.png` and `outline.png`.                                                                             |
| `manifest.json`| The app manifest required for publishing via Developer Portal for Teams is stored in `Properties/manifest.json`.                                  |
| BackendController.cs | A backend controller located at `Controllers/BackendController.cs` aids in authentication.                                                 |
| `Pages/Tab.razor`| The tab page for the application.                                                                                                              |
| `TeamsFx.cs` and `JS/src/index.js` | Scripts responsible for initializing communication with the Teams host.                                                     |

Developers may add additional ASP.NET Core controllers to incorporate backend functionality.

## Build and run your first Teams tab app

After setting up the Agents Toolkit project workspace, build and run the tab app as follows:

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio showing the Project and Agents Toolkit options for configuring the Teams app." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Choose the Microsoft 365 account or select **Add an account** to sign in.
   
    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of the Microsoft 365 Account sign-in screen with the Continue option highlighted.":::

1. Press **Debug** > **Start Debugging** or press **F5** to launch the app in debug mode.
    <br>
    <details>
    <summary>Learn what occurs when running the app locally in the debugger.</summary>

    When F5 is pressed, Agents Toolkit:

    1. Registers the application with Microsoft Entra ID.
    1. Registers the application for Teams custom app upload.
    1. Launches the backend locally.
    1. Launches the front-end locally.
    1. Opens Teams in a web browser and instructs it to load the custom app using the embedded URL in the manifest.

    </details>

1. If prompted, install the self-signed SSL certificate for local debugging.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning prompting SSL certificate installation.":::

    Teams launches in a web browser.
1. In Teams, click **Add**.
   
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option selected.":::

1. When prompted for scope, click **Open** to display the app in personal mode.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of scope selection with the Open option highlighted.":::

Developers now see that the first tab app runs locally.
1. Navigate through the page to view additional user details.
1. Click **Authorize** to allow the app to retrieve user details from Microsoft Graph.
    The app will prompt for permission to access user details.
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize prompt in the personal tab.":::
1. Click **Accept** to grant the necessary permissions.
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of the Microsoft Graph permissions prompt displaying app information.":::
1. The user’s photo and related details appear on the **Personal Tab**.
    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot showing the personal tab displaying user details.":::
1. Developers can perform standard debugging activities (such as setting breakpoints) as with any web application. The app also supports hot reloading.
1. Stop debugging in Visual Studio when finished.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

Once the tab app is built and run, developers should deploy the app to Azure and preview it in Teams. The final steps are:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

The following sections guide through deploying the first tab app on Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio highlighting the Provision in the Cloud option in Agents Toolkit." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. In the **Provision** dialog, provide the subscription and resource group details:
   1. Choose a subscription from the **Subscription name** dropdown.
   1. Choose an existing resource group from **Resource group** or select **New** to create one.
   1. If creating a new resource group, select an appropriate **Region**.
   1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of the Provision dialog with New and Provision options selected." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning is displayed.

1. Click **Provision**.
   
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot showing the provision confirmation in Agents Toolkit.":::

   The provisioning process takes a few minutes.
1. After provisioning completes, click **OK**.
   
    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot showing that provisioning is complete with an OK option.":::
1. Click **View Provisioned Resources** to open the Azure portal.
   
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit displaying the View Provisioned Resources option.":::
1. Sign in to the Azure portal if prompted. The resource group (e.g., app-dev-rg) appears, confirming successful provisioning.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio showing the Deploy to the Cloud option in Agents Toolkit." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot confirming a successful deployment to the cloud.":::

The tab app has now been deployed to the cloud.

#### **To preview your tab app in Teams**

1. In Visual Studio, select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Agents Toolkit highlighting the Preview in Teams option." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams launches in a web browser.
1. Click **Add**.
   
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app Add dialog with the Add option selected.":::
1. When prompted for scope, click **Open** to display the app in personal mode.
   
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot showing scope selection with the Open option highlighted.":::
1. Congratulations! The first tab app is running in the Azure environment.
1. Navigate through the app to view user details.
1. Click **Authorize** to allow the app to retrieve user details via Microsoft Graph.
    The app will request permission.
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot showing the authorize prompt in the Teams tab.":::
1. Click **Accept** to grant permissions.
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Microsoft Graph permission prompt displaying app details.":::
1. The user’s photo and details appear on the **Personal Tab**.
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot showing user info on the Azure-deployed personal tab.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

Developers have now completed the tutorial to build a tab app with Blazor.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange tabs in personal apps. The **bot chat** tab, which defaults to the first position, can be moved by adding a static tab object with the reserved keyword **conversations** in the manifest.

If a bot with a **personal** scope is created, it appears in the first position by default. To change its position, add a static tab object with the reserved **conversations** keyword. The **conversations** tab will be positioned on web and desktop based on its placement in the `staticTabs` array.

``` JSON
{
   "staticTabs": [
      {
         // other tab properties
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
> On mobile, tabs are ordered as specified in the `staticTabs` array.

This setting also allows configuration of the default landing capability for the app. Developers can choose whether the app opens as a tab or a bot by default. For more details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend static tabs for use in group chat, channels, and meetings, use app manifest version 1.16 or later.

Developers can extend static tabs so that they function in group chat, channels, and meetings. Instead of pinned app content, tabs behave more like full apps, with only one tab allowed per app (for example, a single YouTube app tab).

To extend static tabs, update the [app manifest](~/resources/schema/manifest-schema.md#statictabs) by including the `scopes` and `context` parameters in the `staticTabs` property. When multiple static tabs are declared in the manifest and the app is added in channel scope, only the first tab in the manifest appears.

The example below defines a static tab that works in all scopes and contexts in Teams:

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

If a context is omitted in the manifest, Teams defaults to the following:

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

Developers can create personal scope apps that integrate with the Public Switched Telephone Network (PSTN) as well as Teams-to-Teams calls. Using the appropriate scope, context, and static tab configuration, apps can incorporate tab type and meeting side panels into calling scenarios.

For more details, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize the static tab experience in chats, channels, or meetings, the `setConfig` API can be used to update the `contentUrl` and `websiteUrl`. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
  // additional configuration properties can be added as needed
})
```

Only the `contentUrl` and `websiteUrl` can be modified using `setConfig` for static tabs.

## Offline tabs

> [!NOTE]
> Offline functionality for personal tabs is only supported on Teams for Android.

Developers can create personal tabs that function without an internet connection. Offline tabs benefit users in areas with poor or no connectivity (such as field agents or frontline workers). Offline tabs support the following tasks:

* Recording data through forms that may include images and videos.
* Viewing details of previously submitted requests, incidents, or forms.

Once the device reconnects to the internet, the app automatically synchronizes the locally stored data with Azure Blob storage, ensuring data consistency organization-wide.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic demonstrating how an offline tab functions in the Teams mobile client.":::

### Build an offline tab

Before building an offline tab, developers must ensure that all [prerequisites](~/tabs/how-to/tab-requirements.md) to build a personal tab are met.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Record the storage account and container names for future reference.
1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.
1. In the cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot displaying the code sample opened in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. In the **EXPLORER**, under **server**, open **blobStoreOperations.js**. Replace `{{ account-Name }}` and `{{ container-Name }}` with the actual Azure Blob storage account and container names.
1. Press **F5** to start debugging the app. Teams launches in a browser once the build completes.
1. Sign in with the Microsoft 365 account, if prompted.
1. When a dialog box appears, select **Add** to add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot showing the option to add the offline tab app to Teams.":::

Congratulations! The Teams tab with offline functionality is successfully created.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For guidelines on optimizing the performance of tabs on Teams for Android and iOS, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name             | Description                                                                                                  | .NET                                                                                     | Node.js                                                                                      | Manifest                                                                                   |
|-------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Tab personal            | Demonstrates development of a custom personal tab for Teams using ASP.NET Core MVC to enhance user interaction. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab    | Shows a CRUD application that functions offline, enabling users to manage data without connectivity – then synchronization occurs with blob storage.  | NA                                                                                       | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs)        | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

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