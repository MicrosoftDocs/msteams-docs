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

Tabs in chats, channels, or meetings behave more like apps, as only one tab per app can be pinned to the left pane for quick access.

> [!IMPORTANT]
>
> The [Microsoft 365 Agents Toolkit](../../toolkit/agents-toolkit-fundamentals.md) (previously known as Teams Toolkit) extension in Visual Studio Code is introduced with many new app development features. Developers are encouraged to use Agents Toolkit v5 for building Teams apps.

Ensure that developers have all the [prerequisites](~/tabs/how-to/tab-requirements.md) to build the tab.

[!INCLUDE [sdk-include](~/includes/sdk-include.md)]

::: zone pivot="node-java-script"

## Create a tab with JavaScript

Follow the step-by-step instructions to [build the tab app using JavaScript](../../sbs-gs-javascript.yml).

<!--
1. At the command prompt, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by entering the following command after installing Node.js:

    ```cmd
    npm install yo gulp-cli --global
    ```

1. At the command prompt, install the Microsoft Teams app generator by entering the following command:

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

1. In the new directory, run the following command to start the Microsoft Teams app generator:

    ```cmd
    yo teams
    ```

1. Provide the required values in response to a series of questions prompted by the Microsoft Teams app generator to update the `manifest.json` file.

    :::image type="content" source="~/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="Teams generator":::

    <details>
    <summary><b>Series of questions to update the manifest.json file</b></summary>

    * **What is your solution name?**

      The solution name is the project name. Developers can accept the suggested name by selecting **Enter**.

    * **Where do you want to place the files?**

      Since the project directory is active, select **Enter**.

    * **Title of your Microsoft Teams app project?**

      The title serves as the app package name and appears in the app manifest and description. Enter a title or press **Enter** to accept the default name.

    * **Your (company) name? (max 32 characters)**

      This name appears in the app manifest. Enter a company name or press **Enter** to use the default.

    * **Which manifest version would you like to use?**

      Select the default schema.

    * **Quick scaffolding? (Y/n)**

      The default is yes; press **n** if you wish to enter a Microsoft Partner ID.

    * **Enter your Microsoft Partner Id, if you've one? (Leave blank to skip)**

      This field is optional and used only if already enrolled in the [Microsoft Cloud Partner Program](https://partner.microsoft.com), formerly Microsoft Partner Network.

    * **What do you want to add to your project?**

      Select **( * ) A Tab**.

    * **The URL where you will host this solution?**

      By default, the generator suggests an Azure website URL. A valid URL is unnecessary when testing locally.

    * **Would you like show a loading indicator when your app/tab loads?**

      Choose to not include a loading indicator when the app or tab loads. The default is no; press **n**.

    * **Would you like personal apps to be rendered without a tab header-bar?**

      Choose to not include personal apps rendered without a tab header-bar. The default is no; press **n**.

    * **Would you like to include Test framework and initial tests? (y/N)**

      Choose not to include a test framework for the project. The default is no; press **n**.

    * **Would you like to include ESLint support? (y/N)**

      Choose not to include ESLint support. The default is no; press **n**.

    * **Would you like to use Azure Applications Insights for telemetry? (y/N)**

      Choose to not include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; press **n**.

    * **Default Tab Name (max 16 characters)?**

      Specify the tab name, which is later used as a file or URL path component throughout the project.

    * **What kind of Tab would you like to create?**

      Use the arrow keys to select **Personal (static)**.

    * **Do you require Microsoft Entra Single-Sign-On support for the tab?**

      Choose not to include Microsoft Entra Single-Sign-On for the tab. The default is yes; press **n**.
    > [!NOTE]
    > In a tab, the home page appears only when the user selects the back button (or navigates away and returns). The tab is designed to not retain previous state.
    </details>

-->

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+Issue%5D+Create+a+tab+with+JavaScript&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dnode-java-script%23create-a-tab-with-javascript&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Add a content page to the tab

Create a content page and update the existing files in the tab application:

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

1. Open `manifest.json` from the following location in Visual Studio Code:

    ```
     ./src/manifest/manifest.json
    ```

1. Add the JSON object to the empty `staticTabs` array (`staticTabs":[]`):

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
    > The path component **yourDefaultTabNameTab** is the value entered in the generator for **Default Tab Name** with the word **Tab** appended.
    >
    > For example: If DefaultTabName is **MyTab**, then the path becomes **/MyTabTab/**

1. Update the **contentUrl** path component **yourDefaultTabNameTab** with the actual tab name.

1. Save the updated `manifest.json` file.

1. Open **Tab.ts** in Visual Studio Code from the following path to provide the content page in an iFrame:

    ```bash
    ./src/server/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following to the list of iFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultTabName Tab>/personal.html")
    ```

1. Save the updated file. The tab code is now complete.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+a+content+page+to+the+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23add-a-content-page-to-the-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Create your app package

An app package is required to build and run the application in Teams. The app package is created through a gulp task that validates the `manifest.json` file and generates a zip folder in the `./package` directory. At the command prompt, run:

    gulp manifest

### Build and run your application

#### Build your application

Run the following command at the command prompt to transpile the solution into the **./dist** folder:

```cmd
gulp build
```

#### Run your application

1. At the command prompt, run the following command to start a local web server:

    ```cmd
    gulp serve
    ```

1. Open `http://localhost:3007/<yourDefaultAppNameTab>/` in a browser to view the application's home page.

    :::image type="content" source="~/assets/images/tab-images/homePage.png" alt-text="Default Tab":::

1. Browse to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view the tab.

    :::image type="content" source="~/assets/images/tab-images/personalTab.PNG" alt-text="Default html Tab":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+application&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

### Establish a secure tunnel to your tab

Exit the localhost process at the command prompt and run the following command to establish a secure tunnel to the tab:

```cmd
gulp ngrok-serve
```

After the tab is uploaded to Microsoft Teams via **ngrok** and saved successfully, it can be viewed in Teams until the tunnel session expires.

### Upload your application to Teams

1. Open Teams and select **Apps**&nbsp;:::image type="content" source="~/assets/images/tab-images/store.png" alt-text="Microsoft Teams Store":::.
1. Choose **Manage your apps** > **Upload an app** > **Upload a custom app**.
1. In the project directory, navigate to the **./package** folder, select the zip folder, and then choose **Open**.

    :::image type="content" source="~/assets/images/tab-images/addingpersonaltab.png" alt-text="Adding your tab":::

1. Click **Add** in the dialog. The tab is uploaded to Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabuploaded.png" alt-text="Personal tab uploaded":::

1. In the left pane of Teams, click the ellipses &#x25CF;&#x25CF;&#x25CF; and select the uploaded app to view the tab.

   The tab is successfully created and added in Teams. Developers can also [reorder](#reorder-tabs) tabs in Teams.

::: zone-end

::: zone pivot="razor-csharp"

## Create a tab with ASP.NET Core

1. At the command prompt, create a new directory for the tab project.

1. Clone the sample repository into the new directory using the command below, or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The following steps detail the creation of a tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab-1)
1. [Update and run your application](#update-and-run-your-application)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-1)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal)
1. [Preview your app in Teams](#preview-your-app-in-teams)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **razor-csharp** and open **PersonalTab.sln**.

1. In Visual Studio, press **F5** or choose **Start Debugging** from the **Debug** menu to verify that the application loads properly. In a browser, verify the following URLs:

    * `<http://localhost:3978/>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is based on an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected during setup. The MVC services are registered via the dependency injection framework's `ConfigureServices()` method. Since the empty template does not serve static content by default, the static files middleware is added to the `Configure()` method as shown below:

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

In ASP.NET Core, the wwwroot folder is the location for static files.

#### Index.cshtml

ASP.NET Core treats files named **Index** as the default or home page. When the browser URL points to the root, **Index.cshtml** is displayed as the home page.

#### AppManifest folder

This folder contains the required app package files:

* A full-color icon (192 x 192 pixels).
* A transparent outline icon (32 x 32 pixels).
* A `manifest.json` file that defines the app's attributes.

These files must be zipped into an app package to upload the tab to Teams. Teams loads the `contentUrl` specified in the manifest, embeds it in an iFrame, and renders the tab.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and choose **Edit Project File**. At the end of the file, the following code creates and updates the zip folder when the application builds:

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

1. In Visual Studio Solution Explorer, open the **_Layout.cshtml** file in the **Pages** > **Shared** folder and add the following within the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** in the **Pages** folder and add `microsoftTeams.app.initialize()` within the `<script>` tags.

1. Save the changes.

1. Press **F5** or choose **Start Debugging** from the **Debug** menu in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the command prompt in the project directory root, run:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package file is named `tab.zip` and is located at `/bin/Debug/netcoreapp3.1/tab.zip`.

1. Select `tab.zip` and open it in the Developer Portal.

1. A default **App ID** is created and displayed in the **Basic information** section.

1. Provide the Short and Long descriptions for the app in **Descriptions**.

1. In **Developer Information**, fill in the required details, and in **Website (must be a valid HTTPS URL)** enter the ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and the Terms of use to `https://<yourngrokurl>/tou` then select **Save**.

1. In **App features**, choose **Personal app** > **Create your first personal app tab**, input the name, update the **Content URL** with `https://<yourngrokurl>/personalTab`, leave the Website URL blank, and select **Context** as personalTab from the dropdown menu, then select **Confirm**.

1. Select **Save**.

1. In the Domains section, the domains for tabs must include the ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-your-app-package-with-developer-portal&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. From the Developer Portal toolbar, select **Preview in Teams**. The Developer Portal confirms that the custom app is uploaded, and the **Add** page for the app appears in Teams.

1. Select **Add** to load the tab in Teams. The tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetuploaded.png" alt-text="Default Tab":::

   The tab is successfully created and added in Teams. Developers can also [reorder](#reorder-tabs) the tab in Teams.

::: zone-end

::: zone pivot="mvc-csharp"

## Create a tab with ASP.NET Core MVC

1. At the command prompt, create a new directory for the MVC tab project.

1. Clone the sample repository into the new directory using the command below, or download the [source code](https://github.com/OfficeDev/Microsoft-Teams-Samples) and extract the files:

    ```cmd
    git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
    ```

The steps below describe how to create the tab:

1. [Generate your application with a tab](#generate-your-application-with-a-tab)
1. [Update and run application](#update-and-run-your-application-1)
1. [Establish a secure tunnel to your tab](#establish-a-secure-tunnel-to-your-tab-2)
1. [Update your app package with Developer Portal](#update-your-app-package-with-developer-portal-1)
1. [Preview your app in Teams](#preview-your-app-in-teams-1)

### Generate your application with a tab

1. Open Visual Studio and select **Open a project or solution**.

1. Navigate to **Microsoft-Teams-Samples** > **samples** > **tab-personal** > **mvc-csharp** and open **PersonalTabMVC.sln**.

1. In Visual Studio, press **F5** or choose **Start Debugging** from the **Debug** menu to verify that the application loads correctly. In a browser, check the following URLs:

    * `<http://localhost:3978>`
    * `<http://localhost:3978/personalTab>`
    * `<http://localhost:3978/privacy>`
    * `<http://localhost:3978/tou>`

<details>
<summary><b>Review the source code</b></summary>

#### Startup.cs

This project is based on an ASP.NET Core 3.1 web application empty template with the **Advanced - Configure for HTTPS** option selected during setup. The MVC services are registered through the dependency injection framework's `ConfigureServices()` method. Since the empty template does not enable serving static content by default, the static files middleware is added in the `Configure()` method as follows:

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

In ASP.NET Core, the wwwroot folder stores static files.

#### AppManifest folder

This folder contains the required app package files:

* A **full color icon** (192 x 192 pixels).
* A **transparent outline icon** (32 x 32 pixels).
* A `manifest.json` file defining the app attributes.

These files must be zipped into an app package to upload the tab to Teams. Teams loads the `contentUrl` specified in the manifest, embeds it in an iFrame, and displays it in the tab.

#### .csproj

In Visual Studio Solution Explorer, right-click the project and select **Edit Project File**. At the file's end, the following code creates and updates the zip folder when the application builds:

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

The **PersonalTab.cs** model defines a message object and methods that are invoked from **PersonalTabController** when a user clicks a button in the **PersonalTab** View.

#### Views

These views represent different pages in ASP.NET Core MVC:

* Home: Files named **Index** serve as the default home page for the site. When the browser URL points to the root, **Index.cshtml** is displayed.
* Shared: The partial view **_Layout.cshtml** contains the overall page structure and shared visual elements, including the reference to the Teams Library.

#### Controllers

Controllers use the `ViewBag` property to dynamically pass values to the Views.

</details>

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Generate+your+application+with+a+tab&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23generate-your-application-with-a-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Update and run your application

1. In Visual Studio Solution Explorer, open **_Layout.cshtml** located in **Views** > **Shared** and add the following within the `<head>` section:

    ```HTML
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
    <script src="https://res.cdn.office.net/teams-js/2.0.0/js/MicrosoftTeams.min.js" integrity="sha384-QtTBFeFlfRDZBfwHJHYQp7MdLJ2C3sfAEB1Qpy+YblvjavBye+q87TELpTnvlXw4" crossorigin="anonymous"></script>
    ```

1. In Visual Studio Solution Explorer, open **PersonalTab.cshtml** from the **Views** > **PersonalTab** folder and add `microsoftTeams.app.initialize()` inside the `<script>` tags.

1. Save the changes.

1. Press **F5** or choose **Start Debugging** from the **Debug** menu in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+and+run+your+application&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Drazor-csharp%23update-and-run-your-application&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)
>
### Establish a secure tunnel to your tab

At the command prompt in the project root, run:

```cmd
ngrok http 3978 --host-header=localhost
```

### Update your app package with Developer Portal

1. Go to [**Developer portal**](https://dev.teams.microsoft.com/home).

1. Open **Apps** and select **Import app**.

1. The app package file is **tab.zip** and is located at:

    ```
    /bin/Debug/netcoreapp3.1/tab.zip
    ```

1. Select **tab.zip** to open it in the Developer Portal.

1. A default **App ID** is generated and displayed in the **Basic information** section.

1. Provide the Short and Long descriptions for the app in **Descriptions**.

1. In **Developer information**, enter the required details and in **Website (must be a valid HTTPS URL)**, input the ngrok HTTPS URL.

1. In **App URLs**, update the Privacy policy to `https://<yourngrokurl>/privacy` and the Terms of use to `https://<yourngrokurl>/tou` then select **Save**.

1. In **App features**, choose **Personal app** > **Create your first personal app tab**, enter the name, update the **Content URL** with `https://<yourngrokurl>/personalTab`, leave the Website URL blank, select **Context** as personalTab from the dropdown, and click **Confirm**.

1. Select **Save**.

1. In the Domains section, the domains for tabs must include the ngrok URL without the HTTPS prefix `<yourngrokurl>.ngrok.io`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+your+app+package+with+Developer+Portal&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dmvc-csharp%23update-your-app-package-with-developer-portal-1&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Preview your app in Teams

1. From the Developer Portal toolbar, select **Preview in Teams**. The portal confirms the custom app is uploaded, and the **Add** page appears in Teams.

1. Select **Add** to load the tab in Teams. The tab is now available in Teams.

    :::image type="content" source="~/assets/images/tab-images/personaltabaspnetmvccoreuploaded.png" alt-text="Personal tab":::
  
    The tab is successfully created and added in Teams. Developers can also [reorder](#reorder-tabs) the tab in Teams.

::: zone-end

::: zone pivot="blazor-app"

Blazor enables building interactive web UIs using C# instead of JavaScript. Developers can create both a tab app and a bot app with Blazor using the latest version of Visual Studio.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app.png" alt-text="Screenshot of the Blazor app displaying the tab, Bot, and Message Extension output after the step-by-step Blazor guide is successfully completed.":::

> [!NOTE]
> Agents Toolkit does not support the message extension capability.

Below is a list of required tools for building and deploying the app.

| &nbsp;    | Install   | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio version 17.2.0 preview 2.1](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=17)|  Select Visual Studio Enterprise 2022 Preview (version 17.2.0 preview 2.1). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams for collaboration via apps for chat, meetings, and calls in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser equipped with developer tools. |

## Prepare development environment

After installing the required tools, set up the development environment.

### Install Agents Toolkit

Agents Toolkit simplifies the development process by providing tools to provision and deploy cloud resources for the app, publish to the Teams Store, and more. Developers can use Agents Toolkit with Visual Studio or through the Agents Toolkit Command Line Interface.

# [Latest version of the Visual Studio](#tab/vs)

The latest version of Visual Studio enables Teams app development with Blazor Server in .NET.

To install the Agents Toolkit extension:

1. Download the latest version of Visual Studio.
1. Open the Visual Studio installer file (`.exe`) from the download folder.
1. Select **Continue** in the **Visual Studio Installer** to configure the installation.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/visual-studio-installer.PNG" alt-text="Screenshot of Visual Studio Installer with continue options highlighted in red.":::

1. Under **Workloads**, select **ASP.NET and web development**.
1. In **Installation details**, select **Microsoft 365 Agents Toolkit**.
1. Select **Install**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs.install.PNG" alt-text="Screenshot of Visual Studio Enterprise Preview with the option Asp.NET, web development, and Microsoft Teams development tools under installation details and install highlighted in red.":::

    Visual Studio installs in a few minutes.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Latest+version+of+the+Visual+Studio&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23latest-version-of-the-visual-studio&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Command line](#tab/cli)

To install Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI), run the following command using npm:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on the configuration, `sudo` might be required:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
 ```

This may be necessary especially on Linux and macOS systems.

Ensure that the npm global cache is added to the PATH. This step is typically performed by the Node.js installer.  

Developers can use the CLI with the `atk` command. Verify functionality by running `atk -h`.

> [!CAUTION]
> Before running TeamsFx in PowerShell terminals, enable the remote signed execution policy for PowerShell.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Install+Microsoft+Agents+Toolkit+-+Command+line&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23install-microsoft-agents-toolkit&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23command-line&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## Set up your Teams development tenant

A tenant serves as a space or container for an organization in Teams, where chat, file sharing, and meetings occur. This container is also used to upload and test custom apps. Verify that the tenant is ready for development.

### Enable custom app upload

After creating the app, it must be loaded in Teams without distribution. This process is known as custom app upload. Sign in to the Microsoft 365 account to access this option.

To verify if custom app upload is enabled in Teams:

1. In the Teams client, select **Apps**.
1. Choose **Manage your apps**.
1. Click **Upload an app**. If the option **Upload a custom app** is visible, custom app upload is enabled.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/upload-custom-app.PNG" alt-text="Screenshot shows the option to upload a custom app in Teams.":::

    > [!NOTE]
    > Contact the Teams administrator if the option to upload a custom app is not displayed.

### Create a free Teams developer tenant (optional)

If a Teams developer account is not available, it can be obtained for free by joining the Microsoft 365 developer program.

1. Navigate to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Click **Join Now** and follow the onscreen instructions.
1. On the welcome screen, select **Set up E5 subscription**.
1. Complete the administrator account setup. After completion, the following screen appears.

    :::image type="content" source="../../assets/images/build-your-first-app/dev-program-subscription.PNG" alt-text="Screenshot of Microsoft 365 Developer Program displaying Microsoft 365 developer subscriptions for the Blazor app.":::

1. Sign in to Teams using the newly created administrator account and verify that the **Upload a custom app** option is available.

## Get a free Azure account

If hosting the app or accessing Azure resources is desired, an Azure subscription is required. [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before beginning.

Now that the necessary tools and accounts are set up, the development environment can be configured to start building.

## Create project workspace for your tab app

Begin Teams app development by creating the first app that leverages tab capability.

:::image type="content" source="~/assets/images/toolkit-v2/blazor/your-blazor-helloworld-app1.png" alt-text="Screenshot of Blazor app displaying the final output of the tab app after the step-by-step Blazor guide is successfully completed.":::

This tutorial explains how to create, run, and deploy the first Teams app using .NET/Blazor.

The following topics are covered:

1. [How to set up a new tab project with Agents Toolkit](#create-your-tab-project)
1. [About the directory structure of the app](#take-a-tour-of-the-source-code-for-teams-tab-app)

## Create your tab project

Use Agents Toolkit to create the initial tab project. The toolkit guides developers through a series of pages to create and configure a Teams app project:

1. **Create a new project** page: Select the project type.
1. **Configure your new project** page: Enter the project details.
1. **Create a new Teams application** page: Select the Teams app capabilities.

**To create the tab project workspace**

1. Open the latest version of Visual Studio.

1. Select **Create a new project**.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-project.png" alt-text="Screenshot of Visual Studio with Create a new project option highlighted in red for Blazor app.":::

   The **Create a new project** page appears.

1. Select the project type and provide the details:

   1. In the templates dropdown list, search for **Microsoft 365**.  

   1. Choose **Microsoft 365 Agents** as the template.

   1. Click **Next**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png" alt-text="Screenshot of Create a new project with Next option highlighted in red for Blazor app creation." lightbox="../../assets/images/toolkit-v2/blazor/vs-select-teams-app.png":::

      The **Configure your new project** page is displayed.

1. Configure the new project details:

   1. Enter a suitable name for the project.

      > [!NOTE]
      > Note that the entered project name automatically populates the **Solution name**. Developers may change the solution name if desired without impacting the project name.

   1. Select the folder path where the project workspace will be created.

   1. Optionally, enter a different solution name.

   1. Check the option to save the project and solution in the same folder if desired. For this tutorial, this option is not required.

   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG" alt-text="Screenshot of Configure your new project with Create option highlighted in red." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-new-project.PNG":::

      The **Create a new Teams application** page appears.

1. Choose the Teams app capability:

   1. Select **Tab** as the capability for the app.

   1. Click **Create**.

      :::image type="content" source="../../assets/images/toolkit-v2/first-tab/create-tab.png" alt-text="Screenshot of Create a new Teams application with Tab and Create options highlighted in red.":::

   The Teams tab app is created within a few seconds.

   :::image type="content" source="../../assets/images/toolkit-v2/blazor/vs-tab-app.png" alt-text="Screenshot of Visual Studio displaying tips for getting started with the app." lightbox="../../assets/images/toolkit-v2/blazor/vs-tab-app.png":::

   <details>
   <summary>A quick recap of creating a Teams tab app.</summary>
   Watch this short recap on creating a Teams tab app.

   :::image type="content" source="~/assets/videos/blazorapp.gif" alt-text="Graphical representation shows the process of creating the Teams tab app1.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+tab+project&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23create-your-tab-project&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

### Take a tour of the source code for Teams tab app

After creating the project, a scaffolding for a basic tab app is provided. The project directory structure is visible in the **Solution Explorer** pane in Visual Studio.

:::image type="content" source="../../assets/images/toolkit-v2/blazor/blazor-app-solution-explorer_1.png" alt-text="Screenshot of Solution Explorer displaying components for a basic personal app.":::

Agents Toolkit creates scaffolding based on the selected capabilities. Key components include:

| Folder name | Contents |
| --- | --- |
| App icons | Contains app icons stored as PNG files (`color.png` and `outline.png`). |
| `manifest.json` | The app manifest (for publishing via the Developer Portal for Teams) located in `Properties/manifest.json`. |
| `BackendController.cs` | A backend controller located in `Controllers/BackendController.cs` to assist with authentication. |
| `Pages/Tab.razor` | The page that renders the tab content. |
| `TeamsFx.cs` and `JS/src/index.js` | Files used to initialize communication with the Teams host. |

Backend functionality can be extended by adding additional ASP.NET Core controllers to the application.
</details>

## Build and run your first Teams tab app

After setting up the project workspace with Agents Toolkit, build the tab project.

To build and run the app:

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Select Microsoft 365 Account**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png" alt-text="Screenshot of Visual Studio highlighting Project, Agents Toolkit, and Prepare Teams App Dependencies options." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/configure-msteamsapp_1.png":::

1. Choose the Microsoft 365 account or click **Add an account** to sign in.

    :::image type="content" source="../../assets/images/toolkit-v2/m365-account_1.PNG" alt-text="Screenshot of Microsoft 365 Account with Continue option highlighted in red.":::

1. Select **Debug** > **Start Debugging** or press **F5** to run the app in debug mode.
    <br>
    <details>
    <summary>Learn what happens during local debugging.</summary>

    When **F5** is pressed, Agents Toolkit:

    1. Registers the application with Microsoft Entra ID.
    1. Registers the application for upload in Teams.
    1. Starts the local application backend.
    1. Hosts the application front-end locally.
    1. Launches Teams in a web browser with a command instructing Teams to upload a custom app (the URL is registered in the application manifest).

    </details>

1. Install the self-signed SSL certificate for local debugging if prompted.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ssl-prompt.png" alt-text="Screenshot of Security Warning with the Yes option highlighted.":::

    Teams launches in the web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Click **Open** to display the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    The first tab app runs in the local environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-local.png" alt-text="Screenshot showing the first tab app running locally.":::

1. Interact with the page to display user details.

1. Click **Authorize** to allow the app to retrieve user details using Microsoft Graph.

    The app requests permission to access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot displaying the authorize option in the personal tab of the app.":::

1. Click **Accept** to allow access to user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of permissions requested displaying the app info.":::

    The user's photograph and details display in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor/tab-user-info.png" alt-text="Screenshot displaying basic user information in the personal tab of the app in Teams.":::

    Normal debugging activities such as setting breakpoints are supported, and hot reloading is enabled. Changes to any project file cause the page to reload.

    <br>
    <details>
    <summary>Learn how to troubleshoot if the app does not run locally.</summary>

    Running the app in Teams requires a Microsoft 365 development account that permits custom app upload. More details are provided in the Prerequisites section.

    </details>

1. Stop debugging in Visual Studio.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+and+run+your+first+Teams+tab+app&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23build-and-run-your-first-teams-tab-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Preview your first Teams tab app

After learning to create, build, and run a Teams app with tab capability, the final steps deploy the app on Azure and preview it in Teams:

1. [Provision your tab app in the cloud](#to-provision-your-tab-app-in-the-cloud)
1. [Deploy your tab app to cloud](#to-deploy-your-tab-app-to-cloud)
1. [Preview your tab app in Teams](#to-preview-your-tab-app-in-teams)

Deploy the first app with tab capability on Azure using Agents Toolkit.

### **To provision your tab app in the cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Provision in the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png" alt-text="Screenshot of Visual Studio highlighting Project, Agents Toolkit, and Provision in the Cloud options." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-provision_1.png":::

1. In the **Provision** dialog, enter the subscription and resource group details:
   1. Choose a subscription from the **Subscription name** dropdown.
   1. Select a resource group from the **Resource group** dropdown or click **New** to create a resource group for the app.
   1. Choose a **Region** if a new resource group is created.
   1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG" alt-text="Screenshot of Provision highlighting New and Provision options." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/select-subscription.PNG":::

   A provision warning is displayed.

1. Click **Provision**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/provision-warning.PNG" alt-text="Screenshot of Agents Toolkit with Provision highlighted in red.":::

   The resource group provisions in the cloud within a few minutes.

1. After provisioning completes, click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/provision-complete.png" alt-text="Screenshot of Agents Toolkit app with OK option highlighted in red.":::

1. Click **View Provisioned Resources** to open the Azure portal.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/view-resource.PNG" alt-text="Screenshot of Agents Toolkit with View Provisioned Resources highlighted in red.":::

1. Sign in to the Azure portal if prompted.

    The app-dev-rg resource group is visible.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/app-dev-rg-azure.PNG" alt-text="Screenshot of Blazorapp-dev-rg displaying provisioned resources in the Azure portal.":::

    The resources are successfully provisioned in Azure.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+provision+your+tab+app+in+the+cloud&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-provision-your-tab-app-in-the-cloud&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

#### **To deploy your tab app to cloud**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Deploy to the Cloud**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png" alt-text="Screenshot of Visual Studio highlighting Project, Agents Toolkit, and Deploy to the Cloud options." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-deploytocloud_1.png":::

1. Click **OK**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/deploy-success.PNG" alt-text="Screenshot of the app built with Agents Toolkit with OK option highlighted in red.":::

    The tab app is successfully deployed to Azure.

#### **To preview your tab app in Teams**

1. Select **Project** > **Microsoft 365 Agents Toolkit** > **Preview in Teams**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png" alt-text="Screenshot of Visual Studio highlighting Project, Agents Toolkit, and Preview in Teams options." lightbox="../../assets/images/toolkit-v2/blazor-vs-preview2/vs-build-preview_1.png":::

    Teams launches in a web browser.

1. Click **Add**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app.png" alt-text="Screenshot of the personal tab app dialog with the Add option highlighted.":::

1. Click **Open** to display the app in personal scope.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-app-scope.png" alt-text="Screenshot of the scope selection dialog with the Open option highlighted.":::

    The first tab app runs in the Azure environment.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/blazor-tab-app-azure.PNG" alt-text="Screenshot displaying the personal tab of the app in Teams.":::

    Navigate through the page to view user details.

1. Click **Authorize** to allow the app to retrieve user details using Microsoft Graph.

    The app requests permission to access user information.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/authorize-user-info.png" alt-text="Screenshot displaying the authorize option in the personal tab of the app in Teams.":::

1. Click **Accept** to allow the app to access user details.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/ms-graph-permission_1.png" alt-text="Screenshot of permissions requested displaying the app info.":::

    The user's photograph and details are then shown in the **Personal Tab**.

    :::image type="content" source="../../assets/images/toolkit-v2/blazor-vs-preview2/azure-user-info.png" alt-text="Screenshot of the app with the personal tab showing basic information.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+preview+your+tab+app+in+Teams&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Ftabs%3Dvs%26pivots%3Dblazor-app%23to-preview-your-tab-app-in-teams&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&author=surbhigupta&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

## Congratulations

The tutorial to build a tab app with Blazor is complete.

::: zone-end

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange the order of all tabs in the personal app. The **bot chat** tab, which defaults to the first position, can be repositioned anywhere in the personal app tab header. Two reserved tab `entityId` keywords are defined: **conversations** and **about**.

If a bot with a **personal** scope is created, it defaults to appearing in the first tab position in a personal app. To reposition it, add a static tab object to the manifest with the reserved keyword **conversations**. The **conversations** tab appears on the web and desktop based on its position in the `staticTabs` array.

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
> On mobile, tabs are reordered as defined in `staticTabs`.

This property also allows setting the default landing capability for the app. It can be configured to open as a tab or a bot by default. For more details, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend a static tab to group chat, channels, and meetings, use app manifest version 1.16 or later.

Static tabs can be extended to group chat, channels, and meetings. Instead of pinning app content, developers can build tabs that function more like apps by pinning only one tab per app; for example, a single YouTube app tab.

To extend static tabs, update the [app manifest](/microsoft-365/extensibility/schema/root-static-tabs) with the `scopes` and `context` parameters for the `staticTabs` property. When multiple static tabs are declared in the manifest and the app is added in channel scope, only the first tab listed appears.

Below is an example of an app manifest where a static tab is defined to work in all Teams scopes and contexts:

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

If no context is specified in the app manifest, Teams assumes the following default contexts:

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

Developers can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use the appropriate scope and context to build apps that leverage tab type, static scope, personal context, and meeting side panels.

For additional information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize the static tab experience in chats, channels, or meetings, the `setConfig` APIs can be used to update `contentUrl` and `websiteUrl`. For example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}
```

Only changes to `contentUrl` and `websiteUrl` are supported through `setConfig`; other properties cannot be modified for static tabs.

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are supported only on Teams for Android devices.

Developers can create a personal tab that operates without an internet connection. An offline tab benefits users in areas with limited or no connectivity, such as field agents or frontline workers. With an offline tab, users can:

* Record data through forms that may include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the user's device reconnects, the tab automatically synchronizes the locally stored data with Azure Blob storage, ensuring data consistency across the organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic demonstrates how an offline tab functions in the Teams mobile client.":::

### Build an offline tab

Before building an offline tab, ensure that the [prerequisites](~/tabs/how-to/tab-requirements.md) to build a personal tab are met.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Note the account and container names for later use.

1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.

1. In the cloned repository, navigate to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot showing how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. In the **EXPLORER** pane, navigate to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with the corresponding Azure Blob storage account and container values.

1. Press **F5** to start debugging the app. Teams opens in a browser upon successful build.

1. Sign in with the Microsoft 365 account if prompted.

1. When prompted, select **Add** to add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot showing how to add the offline tab app to Teams.":::

Congratulations! The Teams tab with offline functionality is successfully created.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&platformId=7b2eedc9-c3ef-d30c-e8e1-e6d80e341b11&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Best practices for tabs in Teams mobile

For guidance on optimizing tab performance in the Teams Android and iOS clients, see [best practices for Teams mobile](../../resources/teams-mobile-best-practices.md).

## Code sample

| Sample name           | Description                                                                                             | .NET                                                                                                       | Node.js                                                                                                     | Manifest                                                                                           |
|-----------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| Tab personal          | This sample demonstrates creating a custom personal tab for Microsoft Teams using ASP.NET Core MVC.    | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp)      | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js)       | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip) |
| Offline personal tab  | This sample app demonstrates a CRUD application that works offline in Microsoft Teams, syncing with Blob storage upon reconnection. | NA                                                                                                         | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs)       | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip)  |

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