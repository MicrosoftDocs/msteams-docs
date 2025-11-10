hi

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

Tabs in chats, channels, or meetings behave more like apps, as a single tab per app can be pinned to the left pane for easy access.

> [!IMPORTANT]
>
> We've introduced [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (previously known as Teams Toolkit) extension within Visual Studio Code. This version offers many new app development features. It is recommended that developers use Agents Toolkit v5 for building Teams apps.

Ensure that all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build a tab are met.

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

      The project directory is used. Select **Enter**.

    * **Title of your Microsoft Teams app project?**

      The title is the app package name and is used in the app manifest and description. Enter a title or select **Enter** to accept the default.

    * **Your (company) name? (max 32 characters)**

      The company name is included in the app manifest. Enter a company name or select **Enter** to accept the default.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; enter **n** to manually enter your Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and used only if part of the [Microsoft Cloud Partner Program](https://partner.microsoft.com), formerly known as Microsoft Partner Network.

    * **What do you want to add to your project?**

      Select **( &ast; ) A Tab**.

    * **The URL where you will host this solution?**

      By default, the generator suggests an Azure website URL. When testing locally, a valid URL is not required.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose **not** to include a loading indicator; the default is no, enter **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose **not** to include personal apps without a tab header-bar. The default is no, enter **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose **not** to include a test framework. The default is no, enter **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. The default is no, enter **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose **not** to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no, enter **n**.

    * **Default Tab Name (max 16 characters)?**

      Name the tab. This name is used throughout the project as a file or URL path component.

    * **What kind of Tab would you like to create?**

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose **not** to include Microsoft Entra Single-Sign-On support. The default is yes, enter **n**.
    > [!NOTE]
    > In a tab, the home page appears only when the user navigates back (or returns after leaving) and does not retain previous state by design.
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

1. Save **personal.html** in the application's **public** folder at:

    ```
    ./src/public/<yourDefaultTabNameTab>/personal.html
    ```

1. Open `manifest.json` from the following location in Visual Studio Code:

    ```
     ./src/manifest/manifest.json
    ```

1. Add the following JSON object to the empty `staticTabs` array (`staticTabs":[]`):

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
    > For example: If DefaultTabName is **MyTab**, then the path becomes **/MyTabTab/**

1. Update the **contentUrl** path component **yourDefaultTabNameTab** with the actual tab name.
1. Save the updated `manifest.json` file.
1. Open **Tab.ts** from the following path in Visual Studio Code to provide the content page in an iFrame:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following line to the list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. The tab code is now complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

An app package is required to build and run the application in Teams. The package is created through a gulp task that validates the `manifest.json` file and generates a zip folder in the `./package` directory. At the command prompt, execute the command `gulp manifest`.

### Build and run your application

#### Build your application

Enter the following command at the command prompt to transpile the solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, enter the following command to start a local web server:

    ```cmd
    gulp serve
    ```

1. Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in the browser to view the application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Browse to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view the tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

At the command prompt, exit the local server and run the following command to establish a secure tunnel to the tab:

```cmd
gulp ngrok-serve
```

After the tab is uploaded to Microsoft Teams via **ngrok** and successfully saved, it can be viewed in Teams until the tunnel session ends.

### Upload your application to Teams

1. In Teams, select **Apps** &nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Select **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. Navigate to the project directory, browse to the **./package** folder, select the zip folder, and choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. Select **Add** in the dialog. The tab is now uploaded to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the Teams left pane, select the ellipses &#x25CF;&#x25CF;&#x25CF; and then choose the uploaded app to view the tab.

   The tab is successfully created and added to Teams. Tabs can also be [reordered](#reorder-tabs) in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for the tab project.
1. Clone the sample repository into the new directory using the following command, or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Follow these steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.
1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** folder and open **PersonalTab.sln**.
1. In Visual Studio, select **F5** or choose **Start Debugging** from the **Debug** menu to verify the application loads properly. In a browser, navigate to the following URLs:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** checkbox selected during setup. The MVC services are registered via dependency injection in `ConfigureServices()`. Additionally, since the empty template does not serve static content by default, static files middleware is added in `Configure()` using the following code:

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

In ASP.NET Core, the web root folder is where static files are located.

#### Index.cshtml

Files named **Index** serve as the default home page. When the browser points to the root, **Index.cshtml** is displayed.

#### AppManifest folder

This folder contains the required app package files:

* A full color icon (192 x 192 pixels).
* A transparent outline icon (32 x 32 pixels).
* A `manifest.json` file that details the app attributes.

These files must be zipped into an app package for uploading the tab to Teams. Teams loads the `contentUrl` from the manifest, embeds it in an <iframe\>, and renders it in the tab.

#### .csproj

In Solution Explorer, right-click the project and select **Edit Project File**. At the bottom, the following code creates and updates the zip folder when the application is built:

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

1. In Visual Studio Solution Explorer, navigate to **Pages** > **Shared** folder, open **_Layout.cshtml**, and add the following within the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Solution Explorer, open **PersonalTab.cshtml** from the **Pages** folder and add `microsoftTeams.app.initialize()` within the `<script>` tags.
1. Save the changes.
1. In Visual Studio, select **F5** or **Start Debugging** to run the application.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the command prompt in the project root, run the following command to establish a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).
1. Open **Apps** and select **Import app**.
1. The app package file, named `tab.zip`, is located at `/bin/Debug/netcoreapp3.1/tab.zip`.
1. Select `tab.zip` and upload it in the Developer Portal.
1. A default **App ID** is created and populated in the **Basic information** section.
1. Add the Short and Long description for the app in **Descriptions**.
1. In **Developer Information**, provide the required details and in **Website (must be a valid HTTPS URL)**, enter your ngrok HTTPS URL.
1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.
1. In **App features**, select **Personal app** > **Create your first personal app tab**, enter the name, update the **Content URL** with `https://<yourngrokurl>/personalTab`, leave the Website URL blank, select **Context** as personalTab from the dropdown, and choose **Confirm**.
1. Select **Save**.
1. In the Domains section, include your ngrok URL without the HTTPS prefix as `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar. The Developer Portal confirms that the custom app has been uploaded successfully and the **Add** page for the app appears in Teams.
1. Select **Add** to load the tab in Teams. The tab now appears in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   The tab is successfully created and added to Teams. Tabs can also be [reordered](#reorder-tabs) in Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for the tab project.
1. Clone the sample repository into the new directory using the following command, or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

Follow these steps to create a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.
1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** folder and open **PersonalTabMVC.sln** in Visual Studio.
1. In Visual Studio, select **F5** or **Start Debugging** from the **Debug** menu to verify the application loads properly. In a browser, navigate to the following URLs:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is created from an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** checkbox selected during setup. The MVC services are registered via dependency injection in `ConfigureServices()`. Since the empty template does not serve static content by default, static files middleware is added in `Configure()` as shown:

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

In ASP.NET Core, the web root folder is where static files are located.

#### AppManifest folder

This folder contains the required app package files:

* A **full color icon** (192 x 192 pixels).
* A **transparent outline icon** (32 x 32 pixels).
* A `manifest.json` file that specifies the app attributes.

These files must be zipped for the app package used when uploading the tab to Teams. Teams loads the `contentUrl` from the manifest, embeds it in an iFrame, and renders it in the tab.

#### .csproj

In Solution Explorer, right-click the project and select **Edit Project File**. At the bottom, the following code creates and updates the zip folder when the application builds:

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

**PersonalTab.cs** defines a message object and methods used by **PersonalTabController** when a button is pressed in the **PersonalTab** view.

#### Views

These views serve as the various pages in ASP.NET Core MVC:

* Home: ASP.NET Core treats files named **Index** as the default home page. When the browser URL points to the root, **Index.cshtml** is displayed.
* Shared: The partial view **_Layout.cshtml** contains the overall page layout and shared visual elements. It also references the Teams Library.

#### Controllers

Controllers use the `ViewBag` property to transfer dynamic values to the Views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, open **Views** > **Shared** folder, and open **_Layout.cshtml**. Add the following to the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Solution Explorer, open **PersonalTab.cshtml** from **Views** > **PersonalTab** folder and add `microsoftTeams.app.initialize()` inside the `<script>` tags.
1. Save the changes.
1. In Visual Studio, select **F5** or **Start Debugging** to run the application.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the command prompt in the project root, execute the following command to create a secure tunnel:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).
1. Open **Apps** and select **Import app**.
1. The app package is named **tab.zip** and is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** and upload it in the Developer Portal.
1. A default **App ID** is generated and populated in the **Basic information** section.
1. Add Short and Long descriptions for the app in **Descriptions**.
1. In **Developer information**, provide the required details and in **Website (must be a valid HTTPS URL)**, enter your ngrok HTTPS URL.
1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and Terms of use to `https://<yourngrokurl>/tou`, then select **Save**.
1. In **App features**, select **Personal app** > **Create your first personal app tab**, enter the name, update the **Content URL** with `https://<yourngrokurl>/personalTab`, leave the Website URL blank, and select **Context** as personalTab from the dropdown, then choose **Confirm**.
1. Select **Save**.
1. In the Domains section, include the ngrok URL without the HTTPS prefix as `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. Select **Preview in Teams** from the Developer Portal toolbar. The Developer Portal confirms that the custom app has been uploaded, and the **Add** page for the app appears in Teams.
1. Select **Add** to load the tab in Teams.
1. Select **Open** to open the app in personal scope.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    The tab is successfully created and added to Teams. Tabs can also be [reordered](#reorder-tabs) in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor enables building interactive web UIs using C# instead of JavaScript. A tab app and a bot app can be created using Blazor and the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide is successfully completed.":::

> [!NOTE]
> Agents Toolkit does not support the message extension capability.

Below is a list of required tools for building and deploying the app.

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams is used for collaboration through chat, meetings, and calls. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |

## Prepare development environment

After installing the required tools, set up the development environment.

### Install Agents Toolkit

Agents Toolkit simplifies the development process with tools to provision and deploy cloud resources for the app, publish to the Teams Store, and more. Developers can use Agents Toolkit with Visual Studio or as the Agents Toolkit Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

The latest version of Visual Studio can be used to develop Teams apps with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest version of Visual Studio.
1. Open the Visual Studio installer file (`.exe`) from the download folder.
1. Select **Continue** in the **Visual Studio Installer** page to configure the installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.
1. Under **Installation details**, select **Microsoft 365 Agents Toolkit**.
1. Select **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with the option Asp.NET, web development, and Microsoft Teams development tools under installation details and install highlighted in red.":::

    The installation completes in minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), use the `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

If needed, use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

This condition is common on Linux and macOS systems.

Ensure the npm global cache is added to the PATH. This is typically handled by the Node.js installer.

The CLI is used with the `atk` command. Verify the installation by running `atk -h`.

> [!CAUTION]
> Before using TeamsFx in PowerShell terminals, enable the remote signed execution policy for PowerShell.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

A tenant is a container for an organization in Teams, where users chat, share files, and hold meetings. It is also the location where custom apps are uploaded and tested. This section verifies readiness for Teams app development using the tenant.

### Enable custom app upload

After creating the app, it must be uploaded in Teams without distribution. This is known as custom app upload. Sign in to a Microsoft 365 account to verify this option.

To verify that custom app upload is enabled in Teams:

1. In the Teams client, select **Apps**.
1. Select **Manage your apps**.
1. Select **Upload an app**. If **Upload a custom app** is visible, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Contact the Teams administrator if the option to upload a custom app is missing.

### Create a free Teams developer tenant (optional)

If a Teams developer account is not available, it can be obtained for free. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the instructions.
1. On the welcome screen, select **Set up E5 subscription**.
1. Set up the administrator account. Once completed, a screen appears displaying the subscription information.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying Microsoft 365 developer subscriptions for the Blazor app.":::

1. Sign in to Teams using the newly set-up administrator account. Verify that the **Upload a custom app** option is available.

## Get a free Azure account

For hosting the app or accessing Azure resources, an Azure subscription is required. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before starting.

With the tools installed and accounts set up, the next steps are to set up the development environment and begin building.

## Create project workspace for your tab app

Begin Teams app development by creating the first app with tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of tab app after the step-by-step Blazor guide is successfully completed.":::

This tutorial explains how to create, run, and deploy the first Teams app using .NET/Blazor.

In this page, developers learn:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of the app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Agents Toolkit to create the first tab project. The toolkit guides the developer through pages to create and configure the Teams app project:

1. **Create a new project** page: Select the project type.
1. **Configure your new project** page: Enter project details.
1. **Create a new Teams application** page: Select the Teams app capabilities.

**To create the tab project workspace**

1. Open the latest version of Visual Studio.
1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted in red for Blazor app.":::

   The **Create a new project** page appears.

1. Select the desired project type and details:

   1. Search for **Microsoft 365** in the templates dropdown.
   1. Select **Microsoft 365 Agents** as the template.
   1. Select **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for Blazor app creation." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page appears.

1. Configure the new project details:

   1. Enter an appropriate project name.

      > [!NOTE]
      > The project name automatically populates the **Solution name**. The solution name can be changed independently without affecting the project name.

   1. Select the folder path for the project workspace.
   1. Optionally, enter a different solution name.
   1. Optionally, check the option to save the project and solution in the same folder (not required for this tutorial).
   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Select the Teams app feature:

   1. Choose **Tab** as the capability for the app.
   1. Select **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

   The Teams tab app is created within seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips to get started while building the app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this short recap for creating a Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows the process of creating the Teams tab app1.":::
   </details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

After project creation, the scaffolding for the basic tab app is available. The project directory structure is visible in the **Solution Explorer** pane in Visual Studio.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution explorer displaying the components to build a basic personal app.":::

Agents Toolkit generates a scaffold based on the selected capabilities. Notable files include:

| Folder name | Contents |
| --- | --- |
| App icons | PNG files for the app icons in `color.png` and `outline.png`. |
| `manifest.json` | The app manifest for Teams publishing, located in `Properties/manifest.json`. |
| `BackendController.cs` | A backend controller in `Controllers/BackendController.cs` for assisting with authentication. |
| `Pages/Tab.razor` | Contains the UI for the tab app. |
| `TeamsFx.cs` and `JS/src/index.js` | Code for initializing communication with the Teams host. |

Backend functionality can be added by incorporating additional ASP.NET Core controllers.

## Build and run your first Teams tab app

With the project workspace set up using Agents Toolkit, the next step is to build and run the tab project.

To build and run the app:

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Prepare Teams App Dependencies options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Choose the Microsoft 365 account or **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or press **F5** to run the app in debug mode.
    <br>
    <details>
    <summary>Learn what happens when the app runs locally in the debugger.</summary>

    When **F5** is pressed, Agents Toolkit:

    1. Registers the application with Microsoft Entra ID.
    1. Registers the application for uploading in Teams.
    1. Starts the application backend locally.
    1. Hosts the application front-end locally.
    1. Launches Teams in a web browser with a command that instructs Teams to upload a custom app (using a URL embedded in the manifest).

    </details>

1. If prompted, install the self-signed SSL certificate for local debugging.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning with the Yes option highlighted.":::

    Teams loads in a web browser.
1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Select **Open** to open the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    Congratulations, the first tab app is running in the local environment!
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot shows the first tab app running locally.":::

1. Navigate through the page to view user details.
1. Select **Authorize** to allow the app to retrieve user details using Microsoft Graph.

    The app requests permission to access and display user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows the authorize option in the personal tab of the app.":::

1. Select **Accept** to permit the app to access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Permissions requested displaying the App info.":::

    The user’s photograph and details appear in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot shows basic information displayed on the personal tab in Teams.":::

    Standard debugging activities, such as setting breakpoints, can be performed as with any other web application. The app also supports hot reloading, automatically refreshing the page when files change.
    <br>
    <details>
    <summary>Learn troubleshooting if the app does not run locally.</summary>

    A Microsoft 365 development account with custom app upload enabled is required. Refer to the Prerequisites section for more details.

    </details>

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

After creating, building, and running the Teams app with tab capability, the final steps deploy the app on Azure and preview it in Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

Deploy the first tab app on Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Provision in the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. In the **Provision** dialog, enter the subscription and resource group details:
   1. Choose the subscription from the **Subscription name** dropdown.
   1. Choose the resource group from the **Resource group** dropdown, or select **New** to have a new group created for the app.
   1. If a new resource group is created, select the appropriate **Region**.
   1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of Provision with New and Provision options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning is displayed.

1. Select **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit with Provision highlighted in red.":::

   The process may take a few minutes.
1. After provisioning completes, select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit app with OK option highlighted in red.":::

1. Select **View Provisioned Resources** to open the Azure portal.
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted in red.":::
1. Sign in to the Azure portal when prompted.

    The app-dev-rg resource group appears.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of Blazorapp-dev-rg displaying the Resources provisioned in the Azure portal.":::

    The resources are now provisioned in Azure.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Deploy to the Cloud options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Select **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of app built with Agents Toolkit with OK option highlighted in red.":::

    The tab app is now deployed to the cloud.

#### **To preview your tab app in Teams**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Visual Studio with Project, Agents Toolkit, and Preview in Teams options highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams launches in a web browser.
1. Select **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::
1. Select **Open** to open the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    Congratulations, the first tab app is running in the Azure environment!
    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot shows the personal tab of the app in Teams.":::
1. Navigate through the page to view user details.
1. Select **Authorize** to allow the app to retrieve user details using Microsoft Graph.

    The app requests permission to access and display user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot shows the authorize option in the personal tab of the app in Teams.":::
1. Select **Accept** to allow the app access to user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of Permissions requested displaying the App info.":::
1. The user’s photograph and details appear in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot of the app with personal tab displaying basic information.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

The tutorial to build a tab app with Blazor is now complete.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange all tabs in a personal app. The **bot chat** tab, which defaults to the first position, can be moved anywhere in the personal app tab header. Two reserved `entityId` keywords are defined: **conversations** and **about**.

When a bot is created with a **personal** scope, it appears in the first tab position by default. To reposition it, add a static tab object in the manifest with the reserved keyword **conversations**. The **conversation** tab appears on web and desktop based on its placement in the `staticTabs` array.

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

> [!NOTE]
> In mobile, tabs are reordered as defined in `staticTabs`.

This property also enables setting the default landing capability for the app. The app can be configured to open as a tab or a bot by default. For more details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend static tabs to group chat, channels, and meetings, use app manifest v1.16 or later.

Static tabs can be extended beyond personal scope. Instead of pinned app content, tabs that behave more like full apps can be built, for example, pinning a single YouTube app tab.

To extend static tabs to group chat, channels, and meetings, update the [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) by including the `scopes` and `context` parameters in the `staticTabs` property. When multiple static tabs are declared in the manifest and the app is added in channel scope, only the first tab configured in the manifest appears.

Below is an example manifest where a static tab is defined to work across all scopes and contexts in Teams:

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

If a context is not defined in the manifest, Teams defaults to:

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

Personal scope apps can integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use the appropriate scope and context to build apps that leverage tab type, static scope, personal context, and meeting side panels.

For more details, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize the static tab experience in chats, channels, or meetings, use the `setConfig` APIs in the tab to update the `contentUrl` and `websiteUrl`. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}
```

Only changes to `contentUrl` and `websiteUrl` are supported with `setConfig`; other properties cannot be modified for static tabs.

## Offline tabs

> [!NOTE]
> Offline functionality for personal tabs is supported only on Teams for Android.

Personal tabs with offline functionality enable usage without an internet connection, benefiting users in areas with limited network access, such as field agents or frontline workers. In an offline tab, users can:

* Record data through forms that may include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the device reconnects to the internet, the tab automatically synchronizes locally stored data with an Azure Blob storage, ensuring data consistency across the organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows how an offline tab works in Teams mobile client.":::

### Build an offline tab

Before building an offline tab, ensure that the [prerequisites](~/tabs/how-to/tab-requirements.md) for a personal tab are met.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Note down the account and container names for later use.
1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.
1. In the cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot shows how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. In the **EXPLORER**, navigate to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with your Azure Blob storage account and container values.
1. Press **F5** to debug the app. Teams opens in a browser once the build completes.
1. Sign in with the Microsoft 365 account if prompted.
1. When the dialog appears, select **Add** to add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot shows how to add the offline tab app to Teams.":::

Congratulations! The Teams tab with offline functionality has been successfully created.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For guidance on optimizing tab performance in Teams on Android and iOS, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name | Description | .NET | Node.js | Manifest |
|-------------|-------------|------|---------|----------|
| Tab personal | This sample demonstrates the development of a custom personal tab for Microsoft Teams, utilizing ASP.NET Core MVC to enhance user interaction. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab | This sample app demonstrates a CRUD application that functions offline in Microsoft Teams, enabling users to manage data without an internet connection and automatically sync with blob storage upon reconnection. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip) |

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