---
title: Meeting apps APIs
author: v-sdhakshina
description: Learn meeting apps API references that are available for Teams client and Bot Framework SDKs with examples, code samples, and response codes.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 04/07/2022
---

# Meeting apps APIs

The meeting extensibility provides APIs to enhance meeting experience. You can perform the following with help of the listed APIs:

* Build apps or integrate existing apps within meeting lifecycle.
* Use APIs to make your app aware of meeting.
* Select required APIs to improve the meeting experience.

> [!NOTE]
> Use the [Microsoft Teams JavaScript client library (TeamsJS)](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) (*Version*: 1.10 and later) for single sign-on (SSO) to work in meeting side panel.

The following table provides a list of APIs available across the Microsoft Teams JavaScript library and Microsoft Bot Framework SDKs:

|Method| Description| Source|
|---|---|----|
|[**Get user context**](#get-user-context-api)| Get contextual information to display relevant content in a Microsoft Teams tab.| [TeamsJS library](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-getcontext&preserve-view=true) |
|[**Get participant**](#get-participant-api)| Fetch participant information by meeting ID and participant ID. | [Microsoft Bot Framework SDK](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getmeetingparticipantasync?view=botbuilder-dotnet-stable&preserve-view=true)
|[**Send in-meeting notification**](#send-an-in-meeting-notification)| Provides meeting signals using the existing conversation notification API for user-bot chat and allows the bot to notify user action that shows an in-meeting notification. | [Microsoft Bot Framework SDK](/dotnet/api/microsoft.bot.builder.teams.teamsactivityextensions.teamsnotifyuser?view=botbuilder-dotnet-stable&preserve-view=true) |
|[**Get meeting details**](#get-meeting-details-api)| Get a meeting's static metadata. | [Microsoft Bot Framework SDK](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getmeetinginfoasync?view=botbuilder-dotnet-stable&preserve-view=true) |
|[**Send real-time captions**](#send-real-time-captions-api)| Send real-time captions to an ongoing meeting. | [TeamsJS library](/azure/cognitive-services/speech-service/speech-sdk?tabs=nodejs%2Cubuntu%2Cios-xcode%2Cmac-xcode%2Candroid-studio#get-the-speech-sdk&preserve-view=true) |
|[**Share app content to stage**](build-apps-for-teams-meeting-stage.md#share-app-content-to-stage-api)| Share specific parts of the app to meeting stage from the app side panel in a meeting. | [TeamsJS library](/javascript/api/@microsoft/teams-js/meeting) |
|[**Receive real-time Teams meeting events**](#receive-real-time-teams-meeting-events)|Receive real-time meeting events, such as meeting start and end or participant join and leave.| [Microsoft Bot Framework SDK](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmeetingstartasync?view=botbuilder-dotnet-stable&preserve-view=true) |
| [**Get incoming audio state**](#get-incoming-audio-state) | Allows an app to get the incoming audio state setting for the meeting user.| [TeamsJS library](/javascript/api/@microsoft/teams-js/microsoftteams.meeting?view=msteams-client-js-latest&preserve-view=true) |
| [**Toggle incoming audio**](#toggle-incoming-audio) | Allows an app to toggle the incoming audio state setting for the meeting user from mute to unmute or vice-versa.| [TeamsJS library](/javascript/api/@microsoft/teams-js/microsoftteams.meeting?view=msteams-client-js-latest&preserve-view=true) |

## Get user context API

> [!IMPORTANT]
>
> * By default, the [new Teams client](https://www.microsoft.com/en-us/microsoft-365/blog/2023/03/27/welcome-to-the-new-era-of-microsoft-teams/) supports light theme for apps in Teams meetings. When the `app.theme` property in getContext API returns the `default` value, Teams client is in light theme.
> * Earlier version of Teams clients only support Dark and Contrast theme for apps in Teams meetings

To identify and retrieve contextual information for your tab content, see [get context for your Teams tab](../tabs/how-to/access-teams-context.md#get-context-by-using-the-microsoft-teams-javascript-library). `meetingId` is used by a tab running in the meeting context and is added for the response payload.

### Examples

The following are the TeamsJS v2 responses for Get user context API based on meeting type, user type, and call type:

* Meeting type

  # [Channel meeting](#tab/channel-meeting)

  The following is a JSON payload response for a channel meeting for in-tenant users:

  ```json
  {
      "app": {
      "locale": "en-us",
      "sessionId": "ff47ec00-e6a7-4dc1-a6ae-f44110f50c94",
      "theme": "default",
      "iconPositionVertical": 0,
      "osLocaleInfo": {
        "platform": "windows",
        "regionalFormat": "en-in",
        "shortDate": "dd-MM-yyyy",
        "longDate": "dd MMMM yyyy",
        "shortTime": "HH:mm",
        "longTime": "HH:mm:ss"
      },
      "parentMessageId": "1678109354022",
      "userClickTime": 1678109521159,
      "userFileOpenPreference": "inline",
      "host": {
        "name": "Teams",
        "clientType": "desktop",
        "sessionId": "c3c3c0a0-f7a1-b070-6b89-c8cd1f380042",
        "ringId": "ring1"
      },
      "appLaunchId": "7346ae66-5cac-47f9-8a0d-1228dac474cb"
      },
      "page": {
      "id": "Test",
      "frameContext": "sidePanel",
      "subPageId": "",
          "isFullScreen": false,
          "isMultiWindow": true,
          "sourceOrigin": ""
         },
         "user": {
          "id": "57efa5f3-273c-47e2-a871-4879e5d849cf",
          "displayName": "",
          "isCallingAllowed": undefined,
          "isPSTNCallingAllowed": undefined,
          "licenseType": "Unknown",
          "loginHint": "v-prkamble@microsoft.com",
          "userPrincipalName": "v-prkamble@microsoft.com",
          "tenant": {
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47",
           "teamsSku": "enterprise"
          }
         },
         "channel": {
          "id": "19:49683807ffce4318ad6d6d7a24dbde45@thread.tacv2",
          "displayName": undefined,
          "relativeUrl": undefined,
          "membershipType": undefined,
          "defaultOneNoteSectionId": undefined,
          "ownerGroupId": undefined,
          "ownerTenantId": undefined
         },
         "chat": {
          "id": "19:49683807ffce4318ad6d6d7a24dbde45@thread.tacv2"
         },
         "meeting": {
          "id": "MCMxOTo0OTY4MzgwN2ZmY2U0MzE4YWQ2ZDZkN2EyNGRiZGU0NUB0aHJlYWQudGFjdjIjMTY3ODEwOTM1NDAyMg=="
         },
         "sharepoint": undefined,
         "team": {
          "internalId": "19:b34aeec3f8e54240a5c283e86bfc4878@thread.tacv2",
          "displayName": undefined,
          "type": undefined,
          "groupId": undefined,
          "templateId": undefined,
          "isArchived": undefined,
          "userRole": 1
         },
         "sharePointSite": {
          "teamSiteUrl": "",
          "teamSiteDomain": "microsoft.sharepoint.com",
          "teamSitePath": "",
          "teamSiteId": "",
          "mySitePath": undefined,
          "mySiteDomain": undefined
         }
        }
  ```

  # [Scheduled meeting](#tab/scheduled-meeting)

  The following is a JSON payload response for a scheduled meeting for in-tenant users:

  ```json
  {
          "app": {
           "locale": "en-us",
           "sessionId": "e746c935-0991-47b8-b7f4-16db7646771f",
           "theme": "default",
           "iconPositionVertical": 22.998046875,
           "osLocaleInfo": null,
           "parentMessageId": "",
           "userClickTime": 1678023107126,
           "userFileOpenPreference": "inline",
           "host": {
            "name": "Teams",
            "clientType": "web",
            "sessionId": "5f2a15f6-75bd-2612-c0ff-2e1085dd165a",
            "ringId": "general"
           },
           "appLaunchId": "e07b6f2c-dc0f-4de2-9b1f-44dba2ea733c"
          },
          "page": {
           "id": "Test",
           "frameContext": "content",
           "subPageId": "",
           "isFullScreen": false,
           "isMultiWindow": false,
           "sourceOrigin": NULL
          },
          "user": {
           "id": "e652dd92-dd63-4fcc-b5b2-2005681e8e9f",
           "displayName": null,
           "isCallingAllowed": null,
           "isPSTNCallingAllowed": null,
           "licenseType": "Unknown",
           "loginHint": "admin@M365x94626565.onmicrosoft.com",
           "userPrincipalName": "admin@M365x94626565.onmicrosoft.com",
           "tenant": {
            "id": "aa923623-ae61-49ee-b401-81f414b6ad5a",
            "teamsSku": "enterprise"
           }
          },
          "channel": null,
          "chat": {
           "id": "19:meeting_YmU5NWM3NGEtZjMyMi00ZDg4LTk4OGUtMjUzMGJkZjRhMDhm@thread.v2"
          },
          "meeting": {
           "id": "MCMxOTptZWV0aW5nX1ltVTVOV00zTkdFdFpqTXlNaTAwWkRnNExUazRPR1V0TWpVek1HSmtaalJoTURobUB0aHJlYWQudjIjMA=="
          },
          "sharepoint": null,
          "team": null,
          "sharePointSite": {
           "teamSiteUrl": "",
           "teamSiteDomain": "m365x94626565.sharepoint.com",
           "teamSitePath": "",
           "teamSiteId": null,
           "mySitePath": "/personal/admin_m365x94626565_onmicrosoft_com",
           "mySiteDomain": "m365x94626565-my.sharepoint.com"
          }
  }

  ```

  # [Instant meeting](#tab/instant-meeting)

  The following is a JSON payload response for an Instant meeting (Meet now) for in-tenant users:

  ```json
  {
          "app": {
            "locale": "en-us",
            "sessionId": "4b2b69ef-6030-4379-a07b-02a64ff3bd37",
            "theme": "default",
            "iconPositionVertical": 23,
            "parentMessageId": "",
            "userClickTime": 1681216672213,
            "userFileOpenPreference": "inline",
            "host": {
              "name": "Teams",
              "clientType": "web",
              "sessionId": "a384245b-c4ee-0c76-377b-7394bd040532",
              "ringId": "ring3_6"
            },
            "appLaunchId": "f7e97fbd-0b2e-477f-9599-91a5155418d5"
          },
          "page": {
            "id": "Test",
            "frameContext": "content",
            "subPageId": "",
            "isFullScreen": false,
            "isMultiWindow": false,
            "sourceOrigin": null
          },
          "user": {
            "id": "4ebcc4d0-291b-4154-a85f-a89cd77aefa8",
            "licenseType": "Unknown",
            "loginHint": "admin@M365x654992.onmicrosoft.com",
            "userPrincipalName": "admin@M365x654992.onmicrosoft.com",
            "tenant": {
              "id": "36a708ef-700d-4d60-9de0-0a5f7b7693df",
              "teamsSku": "unknown"
            }
          },
          "chat": {
            "id": "19:meeting_OWRiMjg0N2YtNDc1Ni00YWEyLWE4YjgtODkwZTliMzczYzg1@thread.v2"
          },
          "meeting": {
            "id": "MCMxOTptZWV0aW5nX09XUmlNamcwTjJZdE5EYzFOaTAwWVdFeUxXRTRZamd0T0Rrd1pUbGlNemN6WXpnMUB0aHJlYWQudjIjMA=="
          },
          "sharePointSite": {
            "teamSiteUrl": "",
            "teamSiteDomain": "m365x654992.sharepoint.com",
            "teamSitePath": "",
            "mySitePath": "/personal/admin_m365x654992_onmicrosoft_com",
            "mySiteDomain": "m365x654992-my.sharepoint.com"
          }
  }
  ```

* User type

  # [Guest user](#tab/guest-user)

  The following is a JSON payload response in a scheduled private meeting for a guest user:

  ```json
    {
          "app": {
           "locale": "en-us",
           "sessionId": "268beeb4-a52d-4ba8-b1c8-8b9f0b9b3492",
           "theme": "default",
           "iconPositionVertical": 23,
           "osLocaleInfo": {
            "platform": "windows",
            "regionalFormat": "en-in",
            "longDate": "dd MMMM yyyy",
            "shortDate": "dd-MM-yyyy",
            "longTime": "HH:mm:ss",
            "shortTime": "HH:mm"
           },
           "parentMessageId": "",
           "userClickTime": 1678023265131,
           "userFileOpenPreference": "inline",
           "host": {
            "name": "Teams",
            "clientType": "desktop",
            "sessionId": "967c980b-1e41-a2cd-eac0-a4bff8f73ce7",
            "ringId": "ring1"
           },
           "appLaunchId": "c35c4496-f28c-4107-8e6c-2dba09fb881a"
          },
          "page": {
           "id": "Test",
           "frameContext": "content",
           "subPageId": "",
           "isFullScreen": false,
           "isMultiWindow": false,
           "sourceOrigin": NULL
          },
          "user": {
           "id": "57efa5f3-273c-47e2-a871-4879e5d849cf",
           "displayName": undefined,
           "isCallingAllowed": undefined,
           "isPSTNCallingAllowed": undefined,
           "licenseType": "Unknown",
           "loginHint": "v-prkamble@microsoft.com",
           "userPrincipalName": "v-prkamble@microsoft.com",
           "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47",
            "teamsSku": "enterprise"
           }
          },
          "channel": undefined,
          "chat": {
           "id": "19:meeting_YmU5NWM3NGEtZjMyMi00ZDg4LTk4OGUtMjUzMGJkZjRhMDhm@thread.v2"
          },
          "meeting": {
           "id": "MCMxOTptZWV0aW5nX1ltVTVOV00zTkdFdFpqTXlNaTAwWkRnNExUazRPR1V0TWpVek1HSmtaalJoTURobUB0aHJlYWQudjIjMA=="
          },
          "sharepoint": undefined,
          "team": undefined,
          "sharePointSite": {
           "teamSiteUrl": "",
           "teamSiteDomain": "microsoft.sharepoint.com",
           "teamSitePath": "",
           "teamSiteId": undefined,
           "mySitePath": "/personal/v-prkamble_microsoft_com",
           "mySiteDomain": "microsoft-my.sharepoint.com"
          }
    }

  ```

  # [Anonymous user](#tab/anonymous-user)

  The following is a JSON payload response in a scheduled private meeting for an anonymous user:

  ```json
        {
            "app": {
                "locale": "en-us",
                "sessionId": "a57af773-73b1-480c-a525-0c9487a51792",
                "theme": "dark",
                "parentMessageId": "",
                "userClickTime": 1678369341888,
                "host": {
                    "name": "Teams",
                    "clientType": "web",
                    "sessionId": "",
                    "ringId": "general"
                }
            },
            "page": {
                "frameContext": "meetingStage",
                "subPageId": "",
                "isMultiWindow": false,
                "sourceOrigin": ""
            },
            "user": {
                "id": "",
                "licenseType": "Anonymous",
                "loginHint": "",
                "userPrincipalName": ""
            },
            "chat": {
                "id": "19:meeting_NTZmNTI3ODgtOWZkOS00NjgzLWJhNTMtMDhlNjE5ZjAwYWYx@thread.v2"
            },
            "meeting": {
                "id": "MCMxOTptZWV0aW5nX05UWm1OVEkzT0RndE9XWmtPUzAwTmpnekxXSmhOVE10TURobE5qRTVaakF3WVdZeEB0aHJlYWQudjIjMA=="
            }
        }

   ```

  # [External user](#tab/external-user)

  The following is a JSON payload response in a scheduled private meeting for an external user:

  ```json
        {
         "app": {
          "locale": "en-us",
          "sessionId": "fe4d7f01-e049-4238-8c5a-3c6bcf4517cd",
          "theme": "default",
          "iconPositionVertical": 0,
          "osLocaleInfo": {
           "platform": "windows",
           "regionalFormat": "en-us",
           "shortDate": "M/d/yyyy",
           "longDate": "dddd, MMMM d, yyyy",
           "shortTime": "h:mm tt",
           "longTime": "h:mm:ss tt"
          },
          "parentMessageId": "",
          "userClickTime": 0,
          "userFileOpenPreference": "inline",
          "host": {
           "name": "Teams",
           "clientType": "desktop",
           "sessionId": "d6d8d834-b13c-95bb-96bd-3bed74fdad4c",
           "ringId": "ring1"
          },
          "appLaunchId": "4ce26ee3-a6b6-4dad-9484-3b218d5603be"
         },
         "page": {
          "id": "Test",
          "frameContext": "sidePanel",
          "subPageId": "",
          "isFullScreen": false,
          "isMultiWindow": true,
          "sourceOrigin": ""
         },
         "user": {
          "id": "aeee11b1-7838-4b4a-8064-12ce5b01258f",
          "displayName": "",
          "licenseType": "Unknown",
          "loginHint": "v-hrajandira@microsoft.com",
          "userPrincipalName": "v-hrajandira@microsoft.com",
          "tenant": {
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47",
           "teamsSku": "enterprise"
          }
         },
         "chat": {
          "id": "19:meeting_Mzg5ZmQwYzItY2U3NS00MDE4LThkZjQtMzNjNWZiMzM5MzNi@thread.v2"
         },
         "meeting": {
          "id": "MCMxOTptZWV0aW5nX016ZzVabVF3WXpJdFkyVTNOUzAwTURFNExUaGtaalF0TXpOak5XWmlNek01TXpOaUB0aHJlYWQudjIjMA=="
         },
         "sharePointSite": {
          "teamSiteUrl": "",
          "teamSiteDomain": "microsoft.sharepoint.com",
          "teamSitePath": "",
          "teamSiteId": ""
         }
        }

  ```

* Call type

  # [One-on-One call](#tab/one-on-one-call)

  The following is a JSON payload response for a one-on-one call for an in-tenant user:

  ```json
        {
         "app": {
          "locale": "en-us",
          "sessionId": "1b3dc47e-f6ae-4fe2-8ed6-844a505f3186",
          "theme": "dark",
          "iconPositionVertical": null,
          "osLocaleInfo": {
           "platform": "windows",
           "regionalFormat": "en-in",
           "shortDate": "dd-MM-yyyy",
           "longDate": "dd MMMM yyyy",
           "shortTime": "HH:mm",
           "longTime": "HH:mm:ss"
          },
          "parentMessageId": "",
          "userClickTime": 1678088052473,
          "userFileOpenPreference": undefined,
          "host": {
           "name": "Teams",
           "clientType": "desktop",
           "sessionId": "",
           "ringId": "general"
          },
          "appLaunchId": undefined
         },
         "page": {
          "id": "Test",
          "frameContext": "sidePanel",
          "subPageId": "",
          "isFullScreen": undefined,
          "isMultiWindow": true,
          "sourceOrigin": ""
         },
         "user": {
          "id": "e652dd92-dd63-4fcc-b5b2-2005681e8e9f",
          "displayName": undefined,
          "isCallingAllowed": undefined,
          "isPSTNCallingAllowed": undefined,
          "licenseType": "Unknown",
          "loginHint": "admin@M365x94626565.onmicrosoft.com",
          "userPrincipalName": "admin@M365x94626565.onmicrosoft.com",
          "tenant": {
           "id": "aa923623-ae61-49ee-b401-81f414b6ad5a",
           "teamsSku": "unknown"
          }
         },
         "channel": undefined,
         "chat": {
          "id": "19:a74d8489-4455-4670-9581-7b38a8017c58_e652dd92-dd63-4fcc-b5b2-2005681e8e9f@unq.gbl.spaces"
         },
         "meeting": {
          "id": "MCMxOTphNzRkODQ4OS00NDU1LTQ2NzAtOTU4MS03YjM4YTgwMTdjNThfZTY1MmRkOTItZGQ2My00ZmNjLWI1YjItMjAwNTY4MWU4ZTlmQHVucS5nYmwuc3BhY2VzIzA="
         },
         "sharepoint": undefined,
         "team": undefined,
         "sharePointSite": {
          "teamSiteUrl": undefined,
          "teamSiteDomain": "m365x94626565.sharepoint.com",
          "teamSitePath": undefined,
          "teamSiteId": undefined,
          "mySitePath": undefined,
          "mySiteDomain": undefined
         }
        }
    
  ```

  # [Group call](#tab/group-call)

  The following is a JSON payload response for a group chat call for an in-tenant user:

  ```json
        {
         "app": {
          "locale": "en-us",
          "sessionId": "cbc005c1-8c10-4dfb-a7c6-711353009cc3",
          "theme": "dark",
          "iconPositionVertical": undefined,
          "osLocaleInfo": {
           "platform": "windows",
           "regionalFormat": "en-in",
           "shortDate": "dd-MM-yyyy",
           "longDate": "dd MMMM yyyy",
           "shortTime": "HH:mm",
           "longTime": "HH:mm:ss"
          },
          "parentMessageId": "",
          "userClickTime": 1678087909562,
          "userFileOpenPreference": undefined,
          "host": {
           "name": "Teams",
           "clientType": "desktop",
           "sessionId": "",
           "ringId": "general"
          },
          "appLaunchId": undefined
         },
         "page": {
          "id": "Test",
          "frameContext": "sidePanel",
          "subPageId": "",
          "isFullScreen": undefined,
          "isMultiWindow": true,
          "sourceOrigin": ""
         },
         "user": {
          "id": "e652dd92-dd63-4fcc-b5b2-2005681e8e9f",
          "displayName": undefined,
          "isCallingAllowed": undefined,
          "isPSTNCallingAllowed": undefined,
          "licenseType": "Unknown",
          "loginHint": "admin@M365x94626565.onmicrosoft.com",
          "userPrincipalName": "admin@M365x94626565.onmicrosoft.com",
          "tenant": {
           "id": "aa923623-ae61-49ee-b401-81f414b6ad5a",
           "teamsSku": "unknown"
          }
         },
         "channel": undefined,
         "chat": {
          "id": "19:a91b5c5f7dbc4eb58e8592240db70299@thread.v2"
         },
         "meeting": {
          "id": "MCMxOTphOTFiNWM1ZjdkYmM0ZWI1OGU4NTkyMjQwZGI3MDI5OUB0aHJlYWQudjIjMA=="
         },
         "sharepoint": undefined,
         "team": undefined,
         "sharePointSite": {
          "teamSiteUrl": undefined,
          "teamSiteDomain": "m365x94626565.sharepoint.com",
          "teamSitePath": undefined,
          "teamSiteId": undefined,
          "mySitePath": undefined,
          "mySiteDomain": undefined
         }
        }
  ```

## Get participant API

The `GetParticipant` API must have a bot registration and ID to generate auth tokens. For more information, see [bot registration and ID](/azure/bot-service/bot-service-quickstart-registration).

> [!NOTE]
>
> * The user type isn't included in the **getParticipantRole** API.
> * Do not cache participant roles since the meeting organizer can change the roles any time.
> * Currently, the `GetParticipant` API is only supported for distributions lists or rosters with less than 350 participants.

### Query parameters

> [!TIP]
> Get participant IDs and tenant IDs from the [tab SSO authentication](../tabs/how-to/authentication/tab-sso-overview.md).

The `Meeting` API must have `meetingId`, `participantId`, and `tenantId` as URL parameters. The parameters are available as part of the Microsoft Teams JavaScript client library (TeamsJS) library and bot activity.

The following table includes the query parameters:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| String | Yes | The meeting identifier is available through Bot Invoke and TeamsJS library. |
|**participantId**| String | Yes | The participant ID is the user ID. It's available in Tab SSO, Bot Invoke, and TeamsJS library. It's recommended to get a participant ID from the Tab SSO. |
|**tenantId**| String | Yes | The tenant ID is required for the tenant users. It's available in Tab SSO, Bot Invoke, and TeamsJS library. It's recommended to get a tenant ID from the Tab SSO. |

### Example

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getmeetingparticipantasync?view=botbuilder-dotnet-stable&preserve-view=true)  
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-context-app/csharp/MeetingContextApp/Bots/MeetingContextBot.cs#L33)

```csharp
protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
{
  // Gets the details for the given meeting participant. 
  // This only works in Teams meeting scoped conversations.
  TeamsMeetingParticipant participant = await TeamsInfo.GetMeetingParticipantAsync(turnContext, "yourMeetingId", "yourParticipantId", "yourParticipantTenantId").ConfigureAwait(false);
  TeamsChannelAccount member = participant.User;
  MeetingParticipantInfo meetingInfo = participant.Meeting;
  ConversationAccount conversation = participant.Conversation;

  // Sends a message activity to the sender of the incoming activity. 
  await turnContext.SendActivityAsync(MessageFactory.Text($"The participant role is: {meetingInfo.Role}"), cancellationToken);
}
```

# [JavaScript](#tab/javascript)

* [SDK reference](/javascript/api/botbuilder/teamsinfo?view=botbuilder-ts-latest#botbuilder-teamsinfo-getmeetingparticipant&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-token-app/nodejs/server/bot/botActivityHandler.js#L30)

```typescript
export class MyBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {

            // getMeetingParticipant : Gets the details for the given meeting participant. 
            // This only works in Teams meeting scoped conversations.
            TeamsMeetingParticipant participant = getMeetingParticipant(turnContext, "yourMeetingId", "yourParticipantId", "yourTenantId");
            let member = participant.user;
            let meetingInfo = participant.meeting;
            let conversation = participant.conversation;

            // Sends a message activity to the sender of the incoming activity. 
            await context.sendActivity(`The participant role is: '${meetingInfo.role}'`);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
```

# [JSON](#tab/json)

```http
GET /v1/meetings/{meetingId}/participants/{participantId}?tenantId={tenantId}
```

```json
{
   "user":{
      "id":"29:1JKiJGPAX9TTxtGxhVo0wLx_zwzo-gG8Z-X03306vBwi9p-xMTEbDXsT6KH7-0kkTS8cD-2zkrsoV6f5WJ6_aYw",
      "aadObjectId":"e236c4bf-88b1-4f3a-b1d7-8891dfc332b5",
      "name":"Bob Young",
      "givenName":"Bob",
      "surname":"Young",
      "email":"Bob.young@microsoft.com",
      "userPrincipalName":"Bob.young@microsoft.com",
      "tenantId":"2fe477ab-0efc-4dfd-bde2-484374e2c373",
      "userRole":"user"
   },
   "meeting":{
      "role ":"Presenter",
      "inMeeting":true
   },
   "conversation":{
      "id":"<conversation id>",
      "conversationType": "groupChat", 
      "isGroup":true
   }
}
```

---

| Property name | Description |
|---|---|
| **user.id** | ID of the user. |
| **user.aadObjectId** | Microsoft Entra object ID of the user. |
| **user.name** | Name of the user. |
| **user.givenName** | First Name of the user.|
| **user.surname** | Last Name of the user. |
| **user.email** | Mail ID of the user. |
| **user.userPrincipalName** | UPN of the user. |
| **user.tenantId** | Microsoft Entra tenant ID. |
| **user.userRole** | Role of the user. For example, 'admin' or 'user'. |
| **meeting.role** | The participant's role in the meeting. For example, 'Organizer' or 'Presenter' or 'Attendee'. |
| **meeting.inMeeting** | The value indicating if the participant is in the meeting. |
| **conversation.id** | The meeting chat ID. |
| **conversation.isGroup** | Boolean indicating whether conversation has more than two participants. |

### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **403** | Get participant information isn't shared with the app. If the app isn't installed in the meeting, it triggers the error response 403. If the tenant admin disables or blocks the app during live site migration, it triggers the error response 403. |
| **200** | The participant information is successfully retrieved.|
| **401** | The app responds with an invalid token.|
| **404** | The meeting has either expired or participants aren't available.|

## Send an in-meeting notification

All users in a meeting receive the notifications sent through in-meeting notification payload. In-meeting notification payload triggers an in-meeting notification and enables you to provide meeting signals that are delivered using the existing conversation notification API for user-bot chat. You can send an in-meeting notification based on user action. The payload is available through Bot Services.

You can also send targeted in-meeting notification to a specific participant in a meeting. For more information, see [Targeted in-meeting notification](in-meeting-notification-for-meeting.md#targeted-in-meeting-notification).

> [!NOTE]
>
> * When an in-meeting notification is invoked, the content is presented as a chat message.
> * You must invoke the [submitTask()](../task-modules-and-cards/task-modules/task-modules-bots.md#submit-the-result-of-a-dialog) function to dismiss automatically after a user takes an action in the web view. This is a requirement for app submission. For more information, see [Teams SDK task module](/javascript/api/@microsoft/teams-js/microsoftteams.tasks?view=msteams-client-js-latest#submittask-string---object--string---string---&preserve-view=true).
> * If you want your app to support anonymous users, initial invoke request payload must rely on `from.id` request metadata in `from` object, not `from.aadObjectId` request metadata. `from.id` is the user ID and `from.aadObjectId` is the Microsoft Entra ID of the user. For more information, see [using task modules in tabs](../task-modules-and-cards/task-modules/task-modules-tabs.md) and [create and send the task module](../messaging-extensions/how-to/action-commands/create-task-module.md?tabs=dotnet#the-initial-invoke-request).

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**conversationId**| String | Yes | The conversation identifier is available as part of Bot Invoke. |

### Examples

`Bot ID` is declared in the manifest and the bot receives a result object.

> [!NOTE]
>
> * The `completionBotId` parameter of the `externalResourceUrl` is optional in the requested payload example.
> * The `externalResourceUrl` width and height parameters must be in pixels. For more information, see [design guidelines](design/designing-apps-in-meetings.md).
> * The URL is the page, which loads as `<iframe>` in the in-meeting notification. The domain must be in the apps' `validDomains` array in your app manifest.

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityextensions.teamsnotifyuser?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityextensions-teamsnotifyuser(microsoft-bot-schema-iactivity)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-proactive-messaging/csharp/proactive-cmd/Program.cs#L178)

```csharp
// Specifies the type of text data in a message attachment.
Activity activity = MessageFactory.Text("This is a meeting signal test");

// Configures the current activity to generate a notification within Teams.
activity.TeamsNotifyUser(true, "https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&completionBotId=BOT_APP_ID");

// Sends a message activity to the sender of the incoming activity. 
await turnContext.SendActivityAsync(activity).ConfigureAwait(false);
```

# [JavaScript](#tab/javascript)

* [SDK reference](/javascript/api/botbuilder-core/turncontext?view=botbuilder-ts-latest#botbuilder-core-turncontext-sendactivity&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/bot-conversation/nodejs/bots/teamsConversationBot.js#L74)

```javascript
// MessageFactory.text(): Specifies the type of text data in a message attachment.
const replyActivity = MessageFactory.text('Hi'); // this could be an adaptive card instead
replyActivity.channelData = {
    notification: {
        alertInMeeting: true,
        externalResourceUrl: 'https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&completionBotId=BOT_APP_ID’
    }
};

// Sends a message activity to the sender of the incoming activity.
await context.sendActivity(replyActivity);
```

# [JSON](#tab/json)

```http
POST /v3/conversations/{conversationId}/activities
```

```json
// In-meeting notification response
{
    "type": "message",
    "text": "John Phillips assigned you a weekly todo",
    "summary": "Don't forget to meet with Marketing next week",
    "channelData": {
        "notification": {
            "alertInMeeting": true,
            "externalResourceUrl": "https://teams.microsoft.com/l/bubble/APP_ID?url=<url>&height=<height>&width=<width>&title=<title>&<completionBotId>=<BOT_APP_ID>"
        }
    },
    "replyToId": "1493070356924"
}
```

---

| Property name | Description |
|---|---|
| **type** | Type of activity. |
| **text** | The text content of the message. |
| **summary** | The summary text of the message. |
| **channelData.notification.alertInMeeting** | Boolean indicating if a notification is to be shown to the user while in a meeting. |
| **channelData.notification.externalResourceUrl** | The value of the notification's external resource URL.|
| **replyToId** | The ID of the parent or root message of the thread. |
| **APP_ID** | App ID declared in manifest. |
| **completionBotId** | Bot app ID. |

### Response codes

The following table includes the response codes:

|Response code|Description|
|---|---|
| **201** | The activity with signal is successfully sent. |
| **401** | The app responds with an invalid token. |
| **403** | The app is unable to send the signal. 403 response code can occur because of various reasons, such as the tenant admin disables and blocks the app during live site migration. In this case, the payload contains a detailed error message. |
| **404** | The meeting chat doesn't exist. |

## Targeted meeting notification and app icon badging API

The `targetedMeetingNotification` API allows apps to send targeted in-meeting notifications and shows app icon badging to specific participants in a meeting. Apps send targeted in-meeting notifications and app icon badging based on user action. The API is available through bot API.

### Prerequisite

You must configure your [app manifest](../resources/schema/manifest-schema.md) with [RSC permissions](../graph-api/rsc/resource-specific-consent.md) under the `webApplicationInfo` property to send targeted in-meeting notifications and shows app icon badging to specific participants in a meeting. Use the following examples to configure your manifest:

<br>

<details>

<summary><b>For app manifest version 1.12 and later</b></summary>

```json
"webApplicationInfo": {
    "id": "<<MICROSOFT-APP-ID>>",
    "resource": "https://RscBasedStoreApp"  },
  "authorization": {
    "permissions": {
      "resourceSpecific": [
            {
                "name": "OnlineMeetingNotification.Send.Chat",
                "type": "Application"
            }
        ]    
    }
}
 ```

<br>

</details>

<br>

<details>

<summary><b>For app manifest version 1.11 and earlier</b></summary>

```json
"webApplicationInfo": {
    "id": "<<MICROSOFT-APP-ID>>",
    "resource": "https://RscBasedStoreApp",
    "applicationPermissions": [
      "OnlineMeetingNotification.Send.Chat"
    ]
}
 ```

<br>

</details>

> [!NOTE]
>
> * The API payload only permits a dialog with a URL.
> * The user ID formats **aadObjectid** and **UPN** aren't supported.

Get supported user ID format for targeted in-meeting notification and app icon badging:

* [Get participant API](#get-participant-api)
* [Get members API](../bots/how-to/get-teams-context.md#fetch-the-roster-or-user-profile)

### Example

Following is an example of request payload for targeted in-meeting notification and app icon badging:

```http
POST /v1/meetings/{meetingId}/notification
```

```json
{

  "type": "targetedMeetingNotification",
  "value": {
    "recipients": [ 
"29:1I12M_iy2wTa97T6LbjTh4rJCWrtw2PZ3lxpD3yFv8j2YPnweY2lpCPPAn3RI0PP7rghfHauUz48I1t7ANhj4CA"
     ], 
    "surfaces": [ 
      { 
        "surface": "meetingStage", 
        "contentType": "task", 
        "content": { 
          "value": { 
            "height": "300", 
            "width": "400", 
            "title": "Targeted meeting Notification", 
            "url": "https://somevalidurl.com"           
}
        } 
      } 
    ] 
  },
  "channelData": { // optional if a developer doesn't want to support user attributes.
    "onBehalfOf": [ 
      { 
        "itemid": 0, 
        "mentionType": "person", 
        "mri": "29:1mDOCfGM9825lMHlwP8NjIVMJeQAbN-ojYBT5VzQfPpnst1IFQeYB1QXC8Zupn2RhgfLIW27HmynQk-4bdx_YhA", 
        "displayName": "yunny chung"      } 
    ] 
  }
}
```

| Property name | Description |
|---|---|
| `meetingId` | The meeting ID is available through bot invoke and TeamsJS library. |
| `type` |`targetedMeetingNotification` |
| `recipients` | List of user IDs. Get user IDs for meeting participants through [Get participant API](#get-participant-api). Get the entire list of chat roster using [Get members API](../bots/how-to/get-teams-context.md#fetch-the-roster-or-user-profile). Empty or null recipients list will return 400.|
| `surface` | A type of surface. The supported surface types are `meetingStage` and `meetingTabIcon`. |
| `surfaces` | List of surfaces where notifications can be rendered. |
| `contentType` | Type of content that the targeted in-meeting notification renders. The supported value is `task`. |
| `content` | [TaskModuleContinueResponse](/dotnet/api/microsoft.bot.schema.teams.taskmodulecontinueresponse?view=botbuilder-dotnet-stable&preserve-view=true) |
| `content.value.height` | **Optional**; requested height of the notification. |
|`content.value.width` | **Optional**; requested width of the notification. |
| `content.value.title` | **Optional**; title of the notification. |
| `content.value.url` | **Optional**; URL to be rendered in the notification. Make sure the URL is part of `validDomains` in app manifest. If empty string or no URL is provided, nothing will be rendered on a meeting notification. |
| `ChannelData.OnBehalfOf` | **Optional**; this is to support [User attributes](../messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md#user-attribution-for-bots-messages). |
| `onBehalfOf.itemid` | Describes identification of the item. Its value must be 0. |
| `onBehalfOf.mentionType` |`person` keyword. Describes the mention of a person. |
| `onBehalfOf.mri` | User MRI shown as sender. |
| `onBehalfOf.displayName` | **Optional**; name of the `person`. Used as fallback in case the name resolution is unavailable. |

> [!NOTE]
> If you provide an invalid input, the API returns the status code 400.

[!INCLUDE [Response code](../includes/meeting-response-code.md)]

## Get meeting details API

The meeting details API enables your app to get a meeting's static metadata. The metadata provides data points that don't change dynamically. The API is available through Bot Services. Currently, both private scheduled or recurring meetings and channel scheduled or recurring meetings support API with different RSC permissions respectively.

The meeting details API must have a bot registration and bot ID. It requires Bot SDK to get `TurnContext`. To use the meeting details API, you must obtain different RSC permission based on the scope of any meeting, such as private meeting or channel meeting.

> [!NOTE]
> The meeting details API is supported for scheduled private meetings, scheduled channel meeting, instant meetings (Meet now), one-on-one calls, and group calls in Teams desktop and mobile clients.

### Prerequisite

To use the meeting details API, you must obtain different RSC permission based on the scope of any meeting, such as private meeting or channel meeting.

<br>

<details>

<summary><b>For app manifest version 1.12 and later</b></summary>

Use the following example to configure your app manifest's `webApplicationInfo`  and `authorization` properties for any private meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
},
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "OnlineMeeting.ReadBasic.Chat",
                "type": "Application"
            }
        ]
    }
}
 ```

Use the following example to configure your app manifest's `webApplicationInfo` and `authorization` properties for any channel meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
},
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "ChannelMeeting.ReadBasic.Group",
                "type": "Application"
            }
        ]
    }
}
 ```

<br>

</details>

<br>

<details>

<summary><b>For app manifest version 1.11 and earlier</b></summary>

Use the following example to configure your app manifest's `webApplicationInfo` property for any private meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "OnlineMeeting.ReadBasic.Chat"
    ]
}
 ```

Use the following example to configure your app manifest's `webApplicationInfo` property for any channel meeting:

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "ChannelMeeting.ReadBasic.Group"
    ]
}
 ```

<br>

</details>

> [!NOTE]
>
> * If the `ChannelMeeting.ReadBasic.Group` permission is added to the manifest, the bot receives the meeting start or end events automatically from the channel meetings created in all the teams where the bot is added.
> * For a one-on-one call `organizer` is the initiator of the chat and for group calls `organizer` is the call initiator. For public channel meetings `organizer` is the person who created the channel post.

### Query parameter

The following table lists the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**meetingId**| String | Yes | The meeting identifier is available through Bot Invoke and the TeamsJS library.|

### Example

# [C#](#tab/dotnet)

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsinfo.getmeetinginfoasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsinfo-getmeetinginfoasync(microsoft-bot-builder-iturncontext-system-string-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/graph-meeting-notification/csharp/MeetingNotification/Bots/MeetingNotificationBot.cs#L56)

```csharp
// Gets the information for the given meeting id.
MeetingInfo result = await TeamsInfo.GetMeetingInfoAsync(turnContext);

// Sends a message activity to the sender of the incoming activity. 
await turnContext.SendActivityAsync(JsonConvert.SerializeObject(result));
```

# [JavaScript](#tab/javascript)

```javascript

this.onMessage(async(context, next) =>{
  TurnContext.removeRecipientMention(context.activity);
 
  const details=await TeamsInfo.getMeetingInfo(context);
  await context.sendActivity(JSON.stringify(details, null, 2));
});

```

# [JSON](#tab/json)

```http
GET /v1/meetings/{meetingId}
```

The JSON response body for meeting details API is as follows:

* **Scheduled meetings:**

    ```json

    {
       "details":  { 
             "id": "<meeting ID>", 
             "msGraphResourceId": "MSowYmQ0M2I4OS1lN2QxLTQxNzAtOGZhYi00OWJjYjkwOTk1YWYqMCoqMTk6bWVldGluZ19OVEkyT0RjM01qUXROV1UyW", 
             "scheduledStartTime": "2022-04-24T22:00:00Z", 
             "scheduledEndTime": "2022-04-24T23:00:00Z", 
             "joinUrl": "https://teams.microsoft.com/l/xx", 
             "title": "All Hands", 
             "type": "Scheduled" 
         },
        "conversation": { 
             "isGroup": true, 
             "conversationType": "groupChat", 
             "id": "meeting chat ID" 
             }, 
        "organizer": { 
             "id": "<organizer user ID>", 
             "aadObjectId": "<AAD object ID>",
             "objectId": "<organizer object ID>",
             "tenantId": "<Tenant ID>" 
         }
    } 
    ```

* **Scheduled channel meetings:**

    ```json
    { 
        "details": { 
        "msGraphResourceId": "MSoxNmUwYjdiYi05M2Q1LTQzNTItOTllMC0yM2VlNWYyZmZmZTIqMTY2MDc1ODYwNzc0MCoqMTk6a0RtQkpEWFZsYWl0QWhHcVB2SzBtRExZbHVTWnJub01WX1MxeFNkTjQxNDFAdGhyZWFkLnRhY3Yy", 
        "scheduledStartTime": "2022-08-17T18:00:00Z", 
        "scheduledEndTime": "2022-08-17T18:30:00Z", 
        "type": "ChannelScheduled", 
        "id": "MCMxOTprRG1CSkRYVmxhaXRBaEdxUHZLMG1ETFlsdVNacm5vTVZfUzF4U2RONDE0MUB0aHJlYWQudGFjdjIjMTY2MDc1ODYwNzc0MA==", 
        "joinUrl": "https://teams.microsoft.com/l/meetup-join/19%3akDmBJDXVlaitAhGqPvK0mDLYluSZrnoMV_S1xSdN4141%40thread.tacv2/1660758607740?context=%7b%22Tid%22%3a%229f044231-b634-4bdd-b29d-2776e3dbd699%22%2c%22Oid%22%3a%2216e0b7bb-93d5-4352-99e0-23ee5f2fffe2%22%7d", 
        "title": "Test channel meeting"
    }, 
    "conversation": { 
        "isGroup": true, 
        "conversationType": "channel", 
        "id": "19:kDmBJDXVlaitAhGqPvK0mDLYluSZrnoMV_S1xSdN4141@thread.tacv2;messageid=1660758607740"
    }, 
    "organizer": { 
        "tenantId": "9f044231-b634-4bdd-b29d-2776e3dbd699", 
        "objectId": "16e0b7bb-93d5-4352-99e0-23ee5f2fffe2", 
        "id": "29:1q4D6ekLXEAALkrqyLXUIcwtVSdXx31bf6vMdfahmkTb9euYVYSsN9x4133pXLV_I2idpVriFe40e19XEZt57bQ", 
        "aadObjectId": "16e0b7bb-93d5-4352-99e0-23ee5f2fffe2"
    }
    }
    ```

* **One-on-one calls:**

    ```json
    {
        "details": {
             "id": "<meeting ID>",
             "type": "OneToOneCall"
         },
        "conversation": {
             "isGroup": true,
             "conversationType": "groupChat",
             "id": "meeting chat ID"
         },
        "organizer  ": {
             "id": "<organizer user ID>",
             "aadObjectId": "<AAD object ID>",
             "objectId": "<organizer object ID>",
             "tenantId": "<Tenant ID>" 
         }
    }
    
    ```

* **Group calls:**

    ```json
    {
        "details": {
             "id": "<meeting ID>",
             "type": "GroupCall",
             "joinUrl": "https://teams.microsoft.com/l/xx"
         },
        "conversation": {
             "isGroup": true,
             "conversationType": "groupChat",
             "id": "meeting chat ID"
         },
        "organizer": {
             "id": "<organizer user ID>",
             "objectId": "<organizer object ID>",
             "aadObjectId": "<AAD object ID>",
             "tenantId": "<Tenant ID>" 
         }
    }
    
    ```

* **Instant meetings:**

    ```json
    { 
       "details": { 
             "id": "<meeting ID>", 
             "msGraphResourceId": "MSowYmQ0M2I4OS1lN2QxLTQxNzAtOGZhYi00OWJjYjkwOTk1YWYqMCoqMTk6bWVldGluZ19OVEkyT0RjM01qUXROV1UyW", 
             "scheduledStartTime": "2022-04-24T22:00:00Z", 
             "scheduledEndTime": "2022-04-24T23:00:00Z", 
             "joinUrl": "https://teams.microsoft.com/l/xx", 
             "title": "All Hands", 
             "type": "MeetNow" 
         }, 
        "conversation": { 
             "isGroup": true, 
             "conversationType": "groupChat", 
             "id": "meeting chat ID" 
         },
        "organizer": { 
             "id": "<organizer user ID>", 
             "aadObjectId": "<AAD object ID>", 
             "tenantId": "<Tenant ID>" ,
             "objectId": "<organizer object ID>"
         }
    }
    
    ```

---

| Property name | Description |
|---|---|
| **details.id** | The meeting's ID, encoded as a BASE64 string. |
| **details.msGraphResourceId** | The MsGraphResourceId, used specifically for MS Graph API calls. |
| **details.scheduledStartTime** | The meeting's scheduled start time, in UTC. |
| **details.scheduledEndTime** | The meeting's scheduled end time, in UTC. |
| **details.joinUrl** | The URL used to join the meeting. |
| **details.title** | The title of the meeting. |
| **details.type** | The meeting's type (OneToOneCall, GroupCall, Scheduled, Recurring, MeetNow, ChannelScheduled, and ChannelRecurring). |
| **conversation.isGroup** | Boolean indicating whether conversation has more than two participants. |
| **conversation.conversationType** | The conversation type. |
| **conversation.id** | The meeting chat ID. |
| **organizer.id** | The Organizer's user ID. |
| **organizer.aadObjectId** | The Organizer's Microsoft Entra object ID. |
| **organizer.tenantId** | The Organizer's Microsoft Entra tenant ID. |

In case of recurring meeting type:

**startDate**: Specifies the date to start applying the pattern. The value of startDate must correspond to the date value of the start property on the event resource. The first occurrence of the meeting might not occur on this date if it doesn't fit the pattern.

**endDate**: Specifies the date to stop applying the pattern. The last occurrence of the meeting might not occur on this date if it doesn't fit the pattern.

## Send real-time captions API

The send real-time captions API exposes a POST endpoint for Teams communication access real-time translation (CART) captions, human-typed closed captions. Text content sent to this endpoint appears to end users in a Teams meeting when they have captions enabled.

### CART URL

You can get the CART URL for the POST endpoint from the **Meeting options** page in a Teams meeting. For more information, see [CART captions in a Microsoft Teams meeting](https://support.microsoft.com/office/use-cart-captions-in-a-microsoft-teams-meeting-human-generated-captions-2dd889e8-32a8-4582-98b8-6c96cf14eb47). You don't need to modify the CART URL to use CART captions.

#### Query Parameter

The CART URL includes the following query parameters:

|Value|Type|Required|Description|
|---|---|----|----|
|**meetingId**| String | Yes |The meeting identifier is available through Bot Invoke and the TeamsJS library. <br/>For example, meetingid=%7b%22tId%22%3a%2272f234bf-86f1-41af-91ab-2d7cd0321b47%22%2c%22oId%22%3a%22e071f268-4241-47f8-8cf3-fc6b84437f23%22%2c%22thId%22%3a%2219%3ameeting_NzJiMjNkMGQtYzk3NS00ZDI1LWJjN2QtMDgyODVhZmI3NzJj%40thread.v2%22%2c%22mId%22%3a%220%22%7d|
|**token**| String | Yes |Authorization token.<br/> For example, token=04751eac |

#### Example

```http
https://api.captions.office.microsoft.com/cartcaption?meetingid=%7b%22tId%22%3a%2272f234bf-86f1-41af-91ab-2d7cd0321b47%22%2c%22oId%22%3a%22e071f268-4241-47f8-8cf3-fc6b84437f23%22%2c%22thId%22%3a%2219%3ameeting_NzJiMjNkMGQtYzk3NS00ZDI1LWJjN2QtMDgyODVhZmI3NzJj%40thread.v2%22%2c%22mId%22%3a%220%22%7d&token=gjs44ra
```

### Method

|Resource|Method|Description|
|----|----|----|
|/cartcaption|POST|Handle captions for meeting, which was started|

> [!NOTE]
> Ensure that the content type for all requests is plain text with UTF-8 encoding. The body of request contains only captions.

#### Example

```http
POST /cartcaption?meetingid=04751eac-30e6-47d9-9c3f-0b4ebe8e30d9&token=04751eac&lang=en-us HTTP/1.1
Host: api.captions.office.microsoft.com
Content-Type: text/plain
Content-Length: 22
Hello I’m Cortana, welcome to my meeting. 
```

> [!NOTE]  
> Each POST request generates a new line of captions. To ensure that the end user has enough time to read the content, limit each POST request body to 80-120 characters.

### Error codes

The following table provides the error codes:

|Error code|Description|
|---|---|
| **400** | Bad request. The response body has more information. For example, not of all required parameters presented.|
| **401** | Unauthorized. Bad or expired token. If you receive this error, generate a new CART URL in Teams. |
| **404** | Meeting not found or not started. If you receive this error, ensure that you start the meeting and select start captions. After captions are enabled in the meeting, you can begin POSTing captions into the meeting.|
| **500** |Internal server error. For more information, [contact support or provide feedback](../feedback.md).|

## Receive real-time Teams meeting events

You can receive real-time meeting events such as meeting start and end or participant join and leave events.

### Receive meeting start and end events

> [!NOTE]
> Meeting start and end events are supported for scheduled and channel meetings.

The user can receive real-time meeting events. As soon as any app is associated with a meeting, the actual meeting start and end time are shared with the bot. The actual start and end time of a meeting are different from scheduled start and end time. The meeting details API provides the scheduled start and end time. The event provides the actual start and end time.

If the `ChannelMeeting.ReadBasic.Group` and `OnlineMeeting.ReadBasic.Chat` permissions are added in the manifest, the bot automatically starts receiving the meeting start or end events for the scheduled and channel meeting types.

### Prerequisite

Your app manifest must have the `webApplicationInfo` property to receive the meeting start and end events. Use the following examples to configure your manifest:

<br>

<details>

<summary><b>For app manifest version 1.12 and later</b></summary>

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    },
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "OnlineMeeting.ReadBasic.Chat",
                "type": "Application"
            }
            {
                "name": "ChannelMeeting.ReadBasic.Group",
                "type": "Application"
            }
        ]    
    }
}
 ```

<br>

</details>

<br>

<details>

<summary><b>For app manifest version 1.11 and earlier</b></summary>

```json
"webApplicationInfo": {
    "id": "<bot id>",
    "resource": "https://RscPermission",
    "applicationPermissions": [
      "OnlineMeeting.ReadBasic.Chat",
      "ChannelMeeting.ReadBasic.Group"
    ]
}
 ```

<br>

</details>

### Example of getting meeting start or end events

The bot receives the meeting start and meeting end events through the `OnTeamsMeetingStartAsync` and `OnTeamsMeetingEndAsync` handlers. The information related to the meeting event is part of the `MeetingStartEventDetails` object, which includes the metadata fields such as, `meetingType`, `title`, `id`, `joinUrl`, `startTime`, and `EndTime`.

> [!NOTE]
>
> * Get meeting ID from `turnContext.ChannelData`.
> * Do not use conversation ID as meeting ID.
> * Do not use meeting ID from meeting events payload `turncontext.activity.value`.

The following examples show how to capture the meeting start and end events:

**Meeting Start Event**

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmeetingstartasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityhandler-onteamsmeetingstartasync(microsoft-bot-schema-teams-meetingstarteventdetails-microsoft-bot-builder-iturncontext((microsoft-bot-schema-ieventactivity))-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-events/csharp/MeetingEvents/Bots/ActivityBot.cs#L34)

```csharp
// Invoked when a Teams Meeting Start event activity is received from the connector.
protected override async Task OnTeamsMeetingStartAsync(MeetingStartEventDetails meeting, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
{
    // Sends a message activity to the sender of the incoming activity. 
    await turnContext.SendActivityAsync(JsonConvert.SerializeObject(meeting));
}
```

**Meeting End Event**

* [SDK reference](/dotnet/api/microsoft.bot.builder.teams.teamsactivityhandler.onteamsmeetingendasync?view=botbuilder-dotnet-stable#microsoft-bot-builder-teams-teamsactivityhandler-onteamsmeetingendasync(microsoft-bot-schema-teams-meetingendeventdetails-microsoft-bot-builder-iturncontext((microsoft-bot-schema-ieventactivity))-system-threading-cancellationtoken)&preserve-view=true)
* [Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-events/csharp/MeetingEvents/Bots/ActivityBot.cs#L51)

```csharp
// Invoked when a Teams Meeting End event activity is received from the connector.
protected override async Task OnTeamsMeetingEndAsync(MeetingEndEventDetails meeting, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
{
    // Sends a message activity to the sender of the incoming activity.
    await turnContext.SendActivityAsync(JsonConvert.SerializeObject(meeting));
}
```

### Example of meeting start event payload

The following code provides an example of meeting start event payload:

```json
{
  "name": " application/vnd.microsoft.meetingStart",
  "type": "event",
  "timestamp": "2023-02-23T19:34:07.478Z",
  "localTimestamp": "2023-02-23T11:34:07.478-8",
  "channelId": "msteams",
  "serviceUrl": "https://smba.trafficmanager.net/teams/",
  "from": {
    "id": "user_id"
  },
  "conversation": {
    "isGroup": true,
    "conversationType": "groupchat",
    "id": "conversation_id"
  },
  "recipient": {
    "id": "28:65f50003-e15d-434a-9e14-0fcfeb3d7817"
  },
  "value": {
    "id": "meeting_id",
    "joinUrl": "join_url",
    "title": "Example meeting",
    "meetingType": "Scheduled",
    "startTime": "2023-02-23T19:34:07.478Z"
  },
  "channelData": {
    "tenant": {
      "id": "tenant_id"
    }
  }
}
```

### Example of meeting end event payload

The following code provides an example of meeting end event payload:

```json
{
  "name": " application/vnd.microsoft.meetingEnd",
  "type": "event",
  "timestamp": "2023-02-23T19:34:07.478Z",
  "localTimestamp": "2023-02-23T11:34:07.478-8",
  "channelId": "msteams",
  "serviceUrl": "https://smba.trafficmanager.net/teams/",
  "from": {
    "id": "user_id"
  },
  "conversation": {
    "isGroup": true,
    "conversationType": "groupchat",
    "id": "conversation_id"
  },
  "recipient": {
    "id": "28:65f50003-e15d-434a-9e14-0fcfeb3d7817"
  },
  "value": {
    "id": "meeting_id",
    "joinUrl": "join_url",
    "title": "Example meeting",
    "meetingType": "Scheduled",
    "EndTime": "2023-02-23T20:30:07.478Z"
  },
  "channelData": {
    "tenant": {
      "id": "tenant_id"
    }
  }
}
```

| Property name | Description |
|---|---|
| **name** | Name of the user.|
| **type** | Activity type. |
| **timestamp** | Local date and time of the message, expressed in ISO-8601 format. |
| **id** | ID for the activity. |
| **channelId** | Channel this activity is associated with. |
| **serviceUrl** | Service URL where responses to this activity should be sent. |
| **from.id** | ID of the user that sent the request. |
| **from.aadObjectId** | Microsoft Entra object ID of the user that sent the request. |
| **conversation.isGroup** | Boolean indicating whether conversation has more than two participants. |
| **conversation.tenantId** | Microsoft Entra tenant ID of the conversation or meeting. |
| **conversation.id** | The meeting chat ID. |
| **recipient.id** | ID of the user that receives the request. |
| **recipient.name** | Name of the user that receives the request. |
| **entities.locale** | entity that contains metadata about locale. |
| **entities.country** | entity that contains metadata about country. |
| **entities.type** | entity that contains metadata about client. |
| **channelData.tenant.id** | Microsoft Entra tenant ID. |
| **channelData.source** | The source name from where event is fired or invoked. |
| **channelData.meeting.id** | The default ID associated with the meeting. |
| **value.MeetingType** | The type of meeting. |
| **value.Title** | The subject of the meeting. |
| **value.Id** | The default ID associated with the meeting. |
| **value.JoinUrl** | The join URL of the meeting. |
| **value.StartTime** | The meeting start time in UTC. |
| **value.EndTime** | The meeting end time in UTC. |
| **locale**| The locale of the message set by the client. |

### Receive meeting participant events

Your bot can receive real-time meeting events such as participant join and leave events. A bot can receive the participant events only if subscribed to these events in Developer Portal.

> [!NOTE]
>
> * Participant events are supported only for scheduled meetings.
> * For a bot to receive participant events, ensure that you add the bot to the meeting before a participant joins or leaves the meeting.

To subscribe to participant events, follow these steps:

1. In [Developer Portal](https://dev.teams.microsoft.com/) open your bot app or import an existing app.
1. In the **Meeting event subscriptions** section, select the events:
    * Participant join
    * Participant leave
1. Select **Save**

   :::image type="content" source="~/assets/images/apps-in-meetings/participant-events.png" alt-text="Screenshot shows how developer portal display for participant events.":::
1. Ensure that the `OnlineMeetingParticipant.Read.Chat` RSC permission is configured in your app manifest.

   If your app doesn't have the RSC permission, add it through the **Configure** > **Permissions** section of your app in Developer Portal. For more information, see [RSC permissions.](~/graph-api/rsc/resource-specific-consent.md)

The following examples show how to capture the participant join and leave events:

# [Participant join event](#tab/participant-join-event)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-events/csharp/MeetingEvents/Bots/ActivityBot.cs#L35)

```csharp
//Invoked on participant join a meeting
protected override async Task OnTeamsMeetingParticipantsJoinAsync(MeetingParticipantsEventDetails meeting, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
{
  await turnContext.SendActivityAsync("Member has joined the meeting.");
  return;
}
```

# [Participant leave event](#tab/participant-leave-event)

[Sample code reference](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/meetings-events/csharp/MeetingEvents/Bots/ActivityBot.cs#L48)

```csharp
//Invoked on participant leave a meeting
protected override async Task OnTeamsMeetingParticipantsLeaveAsync(MeetingParticipantsEventDetails meeting, ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
{
  await turnContext.SendActivityAsync("Member left the meeting.");
  return;
}
```

---

Following are the examples of the participant join and leave event payloads:

# [Participant join event](#tab/participant-join-event1)

The following is an example of the participant join event payload:

```json
{ 

    "type": "event", 
    "name": "application/vnd.microsoft.meetingParticipantJoin",
    "timestamp": "2023-02-23T19:34:07.478Z", 
    "channelId": "msteams", 
    "serviceUrl": "https://smba.trafficmanager.net/amer/", 
    "from": { 
        "id": "29:id_xyz" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "conversationType": "groupchat", 
        "id": "19:meeting_threadId@thread.v2" 
    }, 
    "recipient": { 
        "id": "28:botid" 
    },  
    "value": { 
       "members": [ 
       { 
        "user": { 
            "tenantId": "tenantid", 
            "objectId": "user_object_Id", 
            "id": "29:userId ", 
            "name": "Test User", 
            "aadObjectId": " user_object_Id " 
        },   
        "meeting": { 
            "inMeeting": true, 
            "role": "Organizer" //Attendee, Organizer, Presenter 
        },  
        }], 
    }, 
    "channelData": { 
        "tenant": { 
            "id": "tenantId" 
        }, 
        "meeting": { 
            "id": "encoded_meetingId" 
        } 
    } 
} 
```

# [Participant leave event](#tab/participant-leave-event1)

The following is an example of the participant leave event payload:

```json
{ 

    "type": "event", 
    "name": "application/vnd.microsoft.meetingParticipantLeave",
    "timestamp": "2023-02-23T19:34:07.478Z", 
    "channelId": "msteams", 
    "serviceUrl": "https://smba.trafficmanager.net/amer/", 
    "from": { 
        "id": "29:id_xyz" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "conversationType": "groupchat", 
        "id": "19:meeting_threadId@thread.v2" 
    }, 
    "recipient": { 
        "id": "28:botid" 
    },  
    "value": { 
       "members": [ 
       { 
        "user": { 
            "tenantId": "tenantid", 
            "objectId": "user_object_Id", 
            "id": "29:userId ", 
            "name": "Test User", 
            "aadObjectId": " user_object_Id " 
        },   
        "meeting": { 
            "inMeeting": false
        },  
       }], 
    }, 
    "channelData": { 
        "tenant": { 
            "id": "tenantId" 
        }, 
        "meeting": { 
            "id": "encoded_meetingId" 
        } 
    } 
} 
```

---

## Get incoming audio state

The `getIncomingClientAudioState` API allows an app to get the incoming audio state setting for the meeting user. The API is available through the TeamsJS library.

> [!NOTE]
>
> * The `getIncomingClientAudioState` API for mobile is available in [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md).
> * The `toggleIncomingClientAudio` API is available in the new Teams client.
> * Resource specific consent is available for manifest version 1.12 and later versions, hence this API doesn't work for manifest version 1.11 and earlier versions.

### Manifest

```JSON
"authorization": {
    "permissions": {
      "resourceSpecific": [
        {
          "name": "OnlineMeetingParticipant.ToggleIncomingAudio.Chat",
          "type": "Delegated"
        }
      ]
    }
  }
```
  
### Example

```javascript
callback = (errcode, result) => {
        if (errcode) {
            // Handle error code
        }
        else {
            // Handle success code
        }
    }
// The getIncomingClientAudioState API shows the current audio state.
microsoftTeams.meeting.getIncomingClientAudioState(this.callback)
```

### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters `error` and `result`. The *error* can either contain an error type `SdkError` or `null` when the audio fetch is successful. The *result* can either contain true or false value when the audio fetch is successful or null when the audio fetch fails. The incoming audio is muted if the result is true and unmuted if the result is false. |
  
### Response codes

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Toggle incoming audio

The `toggleIncomingClientAudio` API allows an app to toggle the incoming audio state setting for the meeting user from mute to unmute or vice-versa. The API is available through the TeamsJS library.

> [!NOTE]
>
> * The `toggleIncomingClientAudio` API for mobile is available in [Public Developer Preview](../resources/dev-preview/developer-preview-intro.md).
> * Resource specific consent is available for manifest version 1.12 and later versions, hence this API doesn't work for manifest version 1.11 and earlier versions.

### Manifest

```JSON
"authorization": {
 "permissions": {
  "resourceSpecific": [
   {
    "name": "OnlineMeetingParticipant.ToggleIncomingAudio.Chat",
    "type": "Delegated"
   }
  ]
 }
}
```

### Example

```javascript
callback = (error, result) => {
        if (error) {
            // Handle error code
        }
        else {
            // Handle success code
        }
    }
// The toggleIncomingClientAudio API allows an app to toggle the incoming audio state.
microsoftTeams.meeting.toggleIncomingClientAudio(this.callback)
```
  
### Query parameter

The following table includes the query parameter:

|Value|Type|Required|Description|
|---|---|----|---|
|**callback**| String | Yes | Callback contains two parameters `error` and `result`. The *error* can either contain an error type `SdkError` or `null` when the toggle is successful. The *result* can either contain true or false value, when the toggle is successful or null when the toggle fails. The incoming audio is muted if the result is true and unmuted if the result is false.
  
### Response code

The following table provides the response codes:

|Response code|Description|
|---|---|
| **500** | Internal error. |
| **501** | API isn't supported in the current context.|
| **1000** | App doesn't have proper permissions to allow share to stage.|

## Code sample

|Sample name | Description | .NET | Node.js | Manifest|
|----------------|-----------------|--------------|--------------|------|
| Meetings extensibility | Teams meeting extensibility sample for passing tokens. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-token-app/csharp/demo-manifest/meetings-token-app.zip)|
| In-meeting notification | Demonstrates how to implement in-meeting notification using bot. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-notification/csharp/demo-manifest/meetings-notification.zip) |
| Meeting side panel | Teams meeting extensibility sample for interacting with the side panel in-meeting. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-sidepanel/nodejs)||
| Details Tab in Meeting | This sample app shows Teams meeting extensibility feature where user can create a poll, and members can answer the poll in meeting.| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-details-tab/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-details-tab/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-details-tab/csharp/demo-manifest/meetings-details-tab.zip)|
| Meeting Events Sample | This sample shows real-time Teams meeting events using bot.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp/demo-manifest/Meetings-Events.zip)|
| Meeting Recruitment Sample |This sample app shows a meeting experience for recruitment scenario using Apps In Meetings.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-recruitment-app/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-recruitment-app/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meeting-recruitment-app/csharp/demo-manifest/Meeting-Recruitment-App.zip)|

## See also

* [Teams authentication flow for tabs](../tabs/how-to/authentication/auth-flow-tab.md)
* [Apps for Teams meetings](teams-apps-in-meetings.md)
* [Live Share SDK](teams-live-share-overview.md)
* [Teams cloud meeting recording](/microsoftteams/cloud-recording)
* [Get the attendance report for an online meeting](/graph/api/meetingattendancereport-get)
* [Build in-meeting notification for Teams meeting](in-meeting-notification-for-meeting.md)
* [Get notifications for Teams meeting call updates](/graph/changenotifications-for-onlinemeeting)
* [Get participants presence API](/graph/api/presence-get?&tabs=http)
