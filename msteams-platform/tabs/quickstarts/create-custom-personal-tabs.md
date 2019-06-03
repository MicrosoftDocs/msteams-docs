---
title: "Quickstart: create custom personal tabs in Microsoft Teams" 
author: laujan 
description: A quickstart guide to building personal tabs. 
ms.topic: quickstart 
ms.author: v-laujan 
---

<!---Recommended: Remove all the comments in this template before you
sign-off or merge to master.--->

<!---quickstarts are fundamental day-1 instructions for helping new
customers use a subscription to quickly try out a specific product/service.
The entire activity is a short set of steps that provides an initial
experience.
You only use quickstarts when you can get the service, technology, or
functionality into the hands of new customers in less than 10 minutes.
--->

# Quickstart: build custom static tabs
<!---Required:
Starts with "quickstart: "
Make the first word following "quickstart:" a verb.
--->

<!---Required:
Lead with a light intro that describes, in customer-friendly language,
what the customer will learn, or do, or accomplish. Answer the fundamental
"why would I want to do this?" question.
--->
A custom personal tab is a content page that you create to support an individual user. When building a custom tab you should follow the guidelines in [Create a content page for your Microsoft Teams <custom> tab](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-content). You can include up to 16 personal tabs per app.

In this quickstart, you will build a static content page, test it locally and upload it your Teams channel in the personal scope.

If you don’t have a <service> subscription, create a free trial account...
<!--- Required, if a free trial account exists
Because quickstarts are intended to help new customers use a subscription
to quickly try out a specific product/service, include a link to a free
trial before the first H2, if one exists. You can find listed examples in
[Write quickstarts](contribute-how-to-mvc-quickstart.md)
--->

<!---Avoid notes, tips, and important boxes. Readers tend to skip over them.
Better to put that info directly into the article text.--->
## Guidelines
Here are a few guidelines: 
[Content and conversations, all at once using tabs](https://docs.microsoft.com/xmicrosoftteams/platform/resources/design/framework/tabs)

Scope is set in the app manifest of your [app package](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-package) and can be one of these values:

the intended users scope the functionality of your tab

 Only **configurable** tabs are allowed within the group/channel scope and only one configurable tab can be specified in an app package. Only **static** tabs are allowed within the personal scope and the staticTabs object allows you to specify up to 16 tabs per app package. 

## Prerequisites

As with all Teams development (tabs, connectors, extensions, or bots) custom tabs need to be bundled in a [Teams app package](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-package)  for distribution either in the Teams App Store or within your channel. This means supplying a manifest file, a JSON document, that describes the application in detail.

The App Studio app in the Teams App Store provides a UI tool to build the manifest file dynamically.

Use the App Studio Manifest Editor to detail the required and recommended details of your application:
|key| sample value | content | required or recommended? |
|--- | --- | :--- | --- |
| "$schema": | "https://developer.microsoft.com/en-us/json-schemas/teams/v1.5/MicrosoftTeams.schema.json", | The https:// URL referencing the JSON Schema for the manifest. | Optional but recommended|
| "manifestVersion": |"1.5" |The version of the manifest schema this manifest is using.|**Required**|
|"version"|"1.0.0"|The version of the app. Changes to your manifest should cause a version change. This version string must follow the semver standard (http://semver.org).|**Required**|
|"id"|"%MICROSOFT-APP-ID%"|A unique identifier for this app. This id must be a GUID.|**Required**|
|"packageName"|"com.example.myapp"|A unique identifier for this app in reverse domain notation.|**Required**|
|"developer:" {|||**Required**|
||"name": "Publisher Name",|The display name for the developer.||
||"websiteUrl": "https://website.com/",|The url to the page that provides support information for the app.||
||"privacyUrl": "https://website.com/privacy",|The url to the page that provides privacy information for the app.||
||"termsOfUseUrl": "https://website.com/app-tos",|The url to the page that provides the terms of use for the app.||
||"mpnId": "1234567890"|This field is not required, and should only be used if you are already part of the Microsoft Partner Network.| |
|&emsp;&emsp;&emsp;&emsp;&emsp; },|||
|"name"|"MyAppTab" (<=30 chars)|The short display name for the app is required.|**Required**|
|"description"|"A Short Description" (<=80 char); "A Long Description" (<=4000 char)|Both the short and full descriptions are required|**Required**||
|"icons"|Both icon and color icons are required  |The outline and color icons are both required.|**Required**|
||outline|A relative file path to a transparent 32x32px PNG outline icon||
||color|A relative file path to a full color 192x192 PNG icon||
|"accentColor|"#4464ee|A color to use in conjunction with and as a background for your outline icons.The value must be a valid HTML color code |**Required**|


After completing the required details, complete the sections with the capabilities (tabs, connectors, extensions, or bots) that match your development.

Tabbed content is defined in the static Tabs block of the app manifest.

```json
⋮
"staticTabs": [
  {
    "entityId": "TestAppMyTab",
    "name": "My Custom Tab",
    "contentUrl": "https://teams-specific-webview.website.com/mytab",
    "websiteUrl": "http://fullwebsite.website.com/mytab",
    "scopes": [ "personal" ]
  }
]
⋮
```
For more detailed information see the following: \
[Reference: Manifest schema for Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema)


<!---If you feel like your quickstart has a lot of prerequisites, the
quickstart may be the wrong content type - a tutorial or how-to guide
may be the better option.
If you need them, make Prerequisites your first H2 in a quickstart.
If there’s something a customer needs to take care of before they start (for
example, creating a VM) it’s OK to link to that content before they begin.
--->

## Sign in to <service/product/tool name>

Sign in to the [<service> portal](url).
<!---If you need to sign in to the portal to do the quickstart, this H2 and
link are required.--->

## Procedure 1

<!---Required:
Quickstarts are prescriptive and guide the customer through an end-to-end
procedure. Make sure to use specific naming for setting up accounts and
configuring technology.
Don't link off to other content - include whatever the customer needs to
complete the scenario in the article. For example, if the customer needs
to set permissions, include the permissions they need to set, and the specific
settings in the quickstart procedure. Don't send the customer to another
article to read about it.
In a break from tradition, do not link to reference topics in the procedural
part of the quickstart when using cmdlets or code. Provide customers what they
need to know in the quickstart to successfully complete the quickstart.
For portal-based procedures, minimize bullets and numbering.
For the CLI or PowerShell based procedures, don't use bullets or numbering.
--->

Include a sentence or two to explain only what is needed to complete the
procedure.

1. Step 1 of the procedure
1. Step 2 of the procedure
1. Step 3 of the procedure
   ![Browser](media/contribute-how-to-mvc-quickstart/browser.png)
   <!---Use screenshots but be judicious to maintain a reasonable length. Make
    sure screenshots align to the
    [current standards](https://review.docs.microsoft.com/help/contribute/contribute-how-to-create-screenshot?branch=master).
   If users access your product/service via a web browser the first screenshot
   should always include the full browser window in Chrome or Safari. This is
   to show users that the portal is browser-based - OS and browser agnostic.--->
1. Step 4 of the procedure

## Procedure 2

Include a sentence or two to explain only what is needed to complete the procedure.

1. Step 1 of the procedure
1. Step 2 of the procedure
1. Step 3 of the procedure

## Procedure 3

Include a sentence or two to explain only what is needed to complete the procedure.
<!---Code requires specific formatting. Here are a few useful examples of
commonly used code blocks. Make sure to use the interactive functionality where
possible.
For the CLI or PowerShell based procedures, don't use bullets or numbering.--->

Here is an example of a code block for Java:

```java
cluster = Cluster.build(new File("src/remote.yaml")).create();
...
client = cluster.connect();
```

or a code block for Azure CLI:

```azurecli-interactive 
az vm create --resource-group myResourceGroup --name myVM --image win2016datacenter --admin-username azureuser --admin-password myPassword12
```
or a code block for Azure PowerShell:

```azurepowershell-interactive
New-AzureRmContainerGroup -ResourceGroupName myResourceGroup -Name mycontainer -Image microsoft/iis:nanoserver -OsType Windows -IpAddressType Public
```

## Clean up resources

If you're not going to continue to use this application, delete <resources>
with the following steps:

1. From the left-hand menu...
2. ...click Delete, type...and then click Delete

<!---Required:
To avoid any costs associated with following the quickstart procedure, a Clean
up resources (H2) should come just before Next steps (H2)
--->

## Next steps

Advance to the next article to learn how to create...
> [!div class="nextstepaction"]
> [Next steps button](contribute-get-started-mvc.md)

<!--- Required:
Quickstarts should always have a Next steps H2 that points to the next logical
quickstart in a series, or, if there are no other quickstarts, to some other
cool thing the customer can do. A single link in the blue box format should
direct the customer to the next article - and you can shorten the title in the
boxes if the original one doesn’t fit.
Do not use a "More info section" or a "Resources section" or a "See also section". --->