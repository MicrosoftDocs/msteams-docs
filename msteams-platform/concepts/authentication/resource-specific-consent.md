---
title: Resource specific consent in Teams
description: Describes resource specific consent to apps accessing Team's data and how to configure it.
keywords: RSC resource specific consent
---
# Resource specific consent in Teams

Resource-specific consent (RSC) enables team owners to consent apps accessing Teams data. Teams app can now call Teams' Graph APIs without the need of [tenant-wide admin consent](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent). These APIs include creating, renaming and deleting channels, reading channel messages, creating tabs, adding and removing members from teams. This article provides the steps to take advantage of RSC.

Previously, apps calling Teams Graph APIs required a global admin to approve the app before the app could run and access team data and required very high levels of permissions that admins were reluctant to grant. Resource-specific consent eliminates this friction by allowing team owners to give consent to an app to use just their team's data, without the need for a global admin to approve the app tenant-wide. To the team owner, it will look just like any other Teams app, only with more powerful permissions. 

![Consent screen.](../../assets/images/rsc/rsc-screen.png)

## Prerequisites

* ### Settings in Azure AD:
By default, the RSC feature is enabled in tenants where `Users can consent to apps accessing company data on their behalf` is set to `Yes`. Team owners cannot provide consent if this setting is not enabled. 

Possible values for [EnableGroupSpecificConsent](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-user-consent) setting- 
* On - All team owners can grant Team-specific permissions (for the teams they own).  
* Off - Nobody except admins can grant team-specific permissions. 
* Limited - only users in identified by GroupSpecificPermissionGrantsAllowedGroupId can grant team-specific permissions (for the teams they own).

> **Important** : Changing any of these settings doesn't affect data access for apps that were already granted consent. 

![RSC default settings.](../../assets/images/rsc/rsc-default-settings.png)
 
* ### Settings in Microsoft Teams admin center and app permission policy:
Refer [org-wide app settings in the Microsoft Teams admin center and the settings in the app permission policy](https://review.docs.microsoft.com/en-us/MicrosoftTeams/resource-specific-consent?branch=v-lanac-rsc) assigned to the team owner to determine whether a team owner can give consent.


## RSC Configuration steps

The basic steps required to configure a service and get a token from the Microsoft identity platform endpoint that your service can use to call Microsoft Graph are:

1. Register your app to get an app Id.
2. Remove unnecessary permissions.
3. Update your Teams app manifest to link to your app Id.
4. Get an access token.
5. Make a Graph call.


## 1. Register your app to get an app Id

If you do not have an app, [register an application with the Microsoft identity platform.](~/graph/auth-register-app-v2) Here is the [portal](https://ms.portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) you will use to create/edit/manage your app registrations. If your app supports single sign-on (SSO), you should use the same app Id for Graph/RSC as you use for SSO. 

## 2. Remove unnecessary permissions 
Azure app Registration portal can't be used to request RSC permissions. All RSC permissions should go through the app manifest only as mentioned in the third point below. Hence, go to the `API permissions` section, on your app registration page and delete any additional permissions. If the Graph calls you will be making are only with RSC, delete all the permissions on that page. If your app will be making non-RSC calls as well as RSC calls, keep the non-RSC permissions you need.  

## 3. Update your Teams app manifest to link to your app Id
Add a 'webApplicationInfo' section to the manifest that includes two properties - `id` is the app Id, and `applicationPermissions` are the RSC permissions your app requires.


> **Note**: If your app needs non RSC permissions, you can continue to use them as always, but they do not go in the manifest. 


```
{ 
  "$schema": ".../MicrosoftTeams.schema.json", 

   "webApplicationInfo": { 

      "id": "db5c3ee6-4180-4b81-b080-a3ce61e16b66", 

      "applicationPermissions": [  

          "Channel.Delete.Group", 

          "ChannelMessage.Read.Group", 

          "TeamsApp.Read.Group" 
      ] 
  }
  ... 
} 
```  
Refer list of available Graph permissions for RSC in [Teams permissions](~/permissions-reference.md) section.

## 4. Get an access token 

Before making a REST call to the Graph, you'll need to get a token for application permissions. This is the same as getting an application permission token for non-RSC use. Refer [Get an access token to make a Graph call](~/auth-v2-service) for more details. 


  
```
string response = await HttpHelpers.POST( 

    $"https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token", 

    $"grant_type=client_credentials&client_id={appId}&client_secret={appSecret}" 

    + "&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default"); 

string token = response.Deserialize<TokenResponse>().access_token; 
```
  
## 5. Make a Graph call 

This works exactly the same as non-RSC Graph calls. You can directly make a REST call or use the SDK. See [Microsoft Graph](https://developer.microsoft.com/en-us/graph) and [Use the Microsoft Graph API to work with Microsoft Teams](~/api/resources/teams-api-overview?view=graph-rest-beta) for more details. 

##  RSC Guidelines

- **Team owner needs a Teams app** : 
  To provide consent to your app, the team owner needs to install a Teams app. Webpages running outside of Teams may make RSC Graph calls, but only after the corresponding Teams app has been installed.

- **Not every graph API supports RSC** :
Team owners can only give consent to team data, but many Graph permissions aren't about Team data. It's fine for your app to need Mail.Read, but that's not an RSC scenario because it's not team data, and team owners can't give consent for other people's mailboxes. 1-1 chats and group chats aren't taking place within a team, so RSC does not provide access to that data. Within team data, APIs for Files, SharePoint, OneNote, Planner, and Calendar do not support RSC yet. 

- **Not everyone can install RSC apps** : 
  Admins can choose to disable RSC (it's enabled by default). Admins may also limit the ability to consent to specific team owners. Team members are not allowed to give consent to Team data, only team owners can provide the consent. 
Installation for Teams apps is atomic, either the app has consent or the app is not installed. 

- **Don't have multiple Teams apps linked to the same app Id** :
It is not a good idea to have multiple Teams apps point to the same app Id. In any Team, app Ids must be unique – if someone tries to install another Teams app linked to the same app Id, the installation will fail. 

- **Graph RSC calls are not attributed to a user** :
When you make an RSC API call, Graph does not know on which user's behalf (if any) you are doing the work. (You are calling with application permissions rather than user delegated permissions) As a result, the application may be allowed to do things which a user is not – such as creating a channel or removing a tab - you should think about whether this is what the team owner wants for your use case, and if not, check the Team settings before making the API call. Similarly, when actions such as creating a channel or a tab are logged in the `general` channel or the audit log, they are attributed to the application rather than to the user. 