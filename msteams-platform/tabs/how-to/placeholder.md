## How are tabs added to a Teams app package?

All Teams development (custom tabs, connectors, extensions, or bots) needs to be bundled in a [Teams app package](/msteams-platform/_old/concepts/apps/apps-package.md) for distribution either in the Teams App Store or within a team. A custom tab is declared directly in the manifest of your app package. Your app can have a maximum of one (1) group/channel tab and up to sixteen (16) personal tabs.

**Your app manifest must conform to the [Manifest schema for Microsoft Teams](/msteams-platform/_old/resources/schema/manifest-schema.md) and will include the following required keys:**

1. "schema"
1. "manifestVersion"
1. "id"
1. "packageName"
1. "developer" ("name", "websiteURL","privacyURL","termsOfUseURL")
1. "name" ("short", "full")
1. "description" ("short", "full")
1. "icons" ("outline", "color")
1. "accentColor"

In addition to the basic template, you declare the group/channel tab schema in the configurableTabs section and the personal tab schema in the staticTabs section of your app manifest with the following key/value pairs:

```json
"configurableTabs": [
    {
      "configurationUrl": "[The https://URL to use when configuring your tab.]",
      "canUpdateConfiguration": "A boolean value indicating whether an instance of your tab's configuration can be updated by the user after creation. Default: "true"]",
      "scopes": [ "team", "groupchat" ]
    }
  ],
```

```json
  "staticTabs": [
    {
      "entityId": "[Required. A unique identifier for the entity that your tab displays]",
      "name": "Display name of tab",
      "contentUrl": "https://contoso.com/content?host=msteams",
      "websiteUrl": "https://contoso.com/content",
      "scopes": [ "personal" ]
    }
  ],
}
```
>>>>>>> 0e8b250edf0c6721d4e3fef36555b2bb7aab941a

**Your app manifest must conform to the [Manifest schema for Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema) and will include the following template:**

```json
{
  "$schema": "[Optional, but specifying the schema at the beginning of your manifest enables IntelliSense or similar support from your code editor.]",
  "manifestVersion": "[Required. The current version of the manifest schema your app manifest is using.]",
"id": "[Required. A unique identifier for this app. This id must be a GUID.]"
  "version": "[Required. The version of your app]",
  "packageName": "[Required. A unique identifier for the your app in reverse domain notation.]",
  "developer": {
    "name": "[Required. Your display name.]",
    "websiteUrl": "[Required. The https:// URL to your website.]",
    "privacyUrl": "[Required. The https:// URL to your privacy policy.]",
    "termsOfUseUrl": "[Required. The https:// URL to your terms of use.]",
    "mpnId": "[Optional. This field is not required, and should only be used if you are already part of the Microsoft Partner Network. More info at https://aka.ms/partner]"
  },
  "name": {
    "short": "[Required. The short display name for your app. It must be <=30 characters]",
    "full": "[Required if the full name of your app exceeds 30 characters.]"
  },
  "description": {
    "short": "[Required. A short description of your app to users. ]",
    "full": "[Required. The full description of your app to provide additional useful information to users.]"
  },
  "icons": {
    "outline": "[Required. A relative path to a transparent 32X32 PNG outline icon.]",
    "color": "[Required. A relative path to a full-color 192X192 PNG icon.]"
  },
  "accentColor": "[Required. A valid HTML color code for use with and as a background for your outline icons.]",
```

***In addition to the basic template, you declare the group/channel tab schema in the configurableTabs section and the personal tab schema in the staticTabs section of your manifest with the following name/value pairs:**

```json
"configurableTabs": [
    {
      "configurationUrl": "[The https://URL to use when configuring your tab.]",
      "canUpdateConfiguration": "A boolean value indicating whether an instance of your tab's configuration can be updated by the user after creation. Default: "true"]",
      "scopes": [ "team", "groupchat" ]
    }
  ],
```

```json
  "staticTabs": [
    {
      "entityId": "[Required. A unique identifier for the entity that your tab displays]",
      "name": "Display name of tab",
      "contentUrl": "https://contoso.com/content?host=msteams",
      "websiteUrl": "https://contoso.com/content",
      "scopes": [ "personal" ]
    }
  ],
}
```