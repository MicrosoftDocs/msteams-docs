---
title: Virtual table entity references
author: surbhigupta
description: In this module, learn about virtual tables entity reference and their attributes in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Virtual tables entity reference

Collaboration controls virtual entities and their attributes have a one-to-one mapping with a specific Microsoft Graph resource type. For example, the Graph Planner Task entities maps to the [Microsoft Graph Planner Task resource type](/graph/api/resources/plannertask). The virtual entity shares the same attributes as the resource type.

> [!NOTE]
> Currently, Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Collaboration controls virtual entities

| Name | Description |
|---|---|
| Graph Planner Task | The Graph Planner Task table represents a Planner task in Microsoft 365. |
| Graph Planner Plan | The Graph Planner Plan table represents a Planner plan in Microsoft 365. |
| Graph Event | The Graph Event table represents an event in a user calendar, or the default calendar of a Microsoft 365 group. |
| Graph Booking Appointment | The Graph Booking Appointment table represents a customer appointment for a Booking Service, performed by a set of staff members, provIDed by a Microsoft Bookings business. |
| Graph Drive | The Graph Drive table represents the top-level object that represents a user's OneDrive or a document library in SharePoint. |
| Graph Drive Item | The Graph Drive Item table represents a file, folder, or other item stored in a drive. |

## Graph Planner Task

* Entity name: m365_graphplannertask.
* Graph resource: [plannerTask resource type](/graph/api/resources/plannertask)
* Sorting isn't supported.
* Filtering isn't supported.
* Server driven pagination is supported, with maximum page size being 400.

### Attributes for Graph Planner Task

| Column  | Dataverse Type | Details |
|---|---|---|
| `m365_collaborationrootid` | String | Collaboration root ID of the collaboration session record is associated with multiple collaboration sessions. This will be returned as a comma delimited string. Note that this attribute won't be returned when retrieving multiple records. |
| `m365_activechecklistitemcount` | Int32 | Number of checklist items with value set to false, representing incomplete items. |
| `m365_graphplannertaskId` | Guid | Unique identifier of the graph planner task. |
| `m365_appliedcategories` | String | Number of checklist items with value set to false, representing incomplete items. |
| `m365_appliedcategories` | String | The categories to which the task has been applied. This attribute is a JSON encoded string, for example "{ \"category1\": true, \"category6\": true, \"category9\": true }" |
| `m365_assigneepriority` | String | Hint used to order items of this type in a list view. The format is defined as outlined in [using order hints in Planner](/graph/api/resources/planner-order-hint-format). |
| `m365_assignments` | String | The set of assignees, the task is assigned to. This attribute is a JSON encoded string for example "{\" 7be...\": {\"assignedBy\": {\"user\": {\"displayName\", \"email\", \"ID\":\" 7be...\"}, \"group\": null, \"application\": null \"device\": null}" |
| `m365_bucketid` | String | Bucket ID to which the task belongs. The bucket needs to be in the plan that the task is in. It's 28 characters long and case-sensitive. [Format validation](/graph/api/resources/planner-identifiers-disclaimer) is done on the service. |
| `m365_checklistitemcount` | Int32 | Number of checklist items that are present on the task. |
| `m365_completedby` | String | Identity of the user that completed the task. This attribute is a JSON encoded string, for example {\"user\": {\"displayName\",\"ID\":\"d55...\"}} |
| `m365_completeddatetime` | DateTime | Read-only. Date and time at which the 'percentComplete' of the task is set to '100'. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| `m365_conversationthreadid` |String | Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group. |
| `m365_createdby` | String | Identity of the user that created the task. This attribute is a JSON encoded string, for example {\"user\": {\"displayName\",\"ID\":\"d55...\"}} |
| `m365_createddatetime` | DateTime | Read-only. Date and time at which the task is created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| `m365_duedatetime` | DateTime | Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| `m365_hasdescription` | Boolean | Read-only. Value is true if the details object of the task has a non-empty description and false otherwise. |
| `m365_id` | String | Read-only. ID of the task. It's 28 characters long and case-sensitive. [Format validation](/graph/api/resources/planner-identifiers-disclaimer) is done on the service.|
| `m365_orderhint` | String | Hint used to order items of this type in a list view. The format is defined as outlined in [using order hints in Planner](/graph/api/resources/planner-order-hint-format). |
| `m365_percentcomplete` | Int32 | Percentage of task completion. When set to 100, the task is considered completed. |
| `m365_priority` | Int32 | Priority of the task. The valid range of values is between 0 and 10, with the increasing value being lower priority (0 has the highest priority and 10 has the lowest priority). Currently, Planner interprets values 0 and 1 as "urgent", 2, 3 and 4 as "important", 5, 6, and 7 as "medium", and 8, 9, and 10 as "low". Additionally, Planner sets the value 1 for "urgent", 3 for "important", 5 for "medium", and 9 for "low". |
| `m365_planid` | String | Plan ID to which the task belongs. |
| `m365_previewtype` | String | This sets the type of preview that shows up on the task. The possible values are: automatic, noPreview, checklist, description, reference. |
| `m365_referencecount` | Int32 | Number of external references that exist on the task.|
| `m365_startdatetime` | DateTime | Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| `m365_title` | String |Title of the task. Primary lookup column |

## Graph Planner Plan

* Entity name: m365_graphplannerplan.
* Graph resource: [plannerPlan resource type](/graph/api/resources/plannerplan).
* Sorting isn't supported.
* Filtering isn't supported.
* Server driven pagination is supported, with maximum page size being 400.

### Attributes for Graph Planner Plan

| Column  | Dataverse Type | Details |
|---|---|---|
| `m365_collaborationrootid` | String | Collaboration root ID of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note that this attribute won't be returned when retrieving multiple records.|
| `m365_graphplannerplanid` |Guid |Unique identifier of the graph planner plan.|
| `m365_createdby` | String | Identity of the user that created the task. This attribute is a JSON encoded string, for example {\"user\": {\"displayName\",\"ID\":\"d55...\"}} |
| `m365_createddatetime` | DateTime | Read-only. Date and time at which the task is created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| `m365_id` | String | Read-only. ID of the plan. It's 28 characters long and case-sensitive. [Format validation](/graph/api/resources/planner-identifiers-disclaimer) is done on the service.|
| `m365_owner` | String | ID of the [group](/graph/api/resources/group) that owns the plan. After it's set, this property can’t be updated.|
| `m365_title` | String | Title of the plan. Primary lookup column |

## Graph Event

* Entity name: m365_graphevent
* Graph resource: [event resource type](/graph/api/resources/event)
* Sorting is supported on the following columns:
  * m365_lastmodifieddatetime
  * m365_createddatetime
  * m365_hasattachments
  * m365_importance
  * m365_responserequested
  * m365_sensitivity
  * m365_showas
  * m365_subject
* Filtering is supported on the following columns:
  * m365_allownewtimeproposals
  * m365_lastmodifieddatetime
  * m365_createddatetime
  * m365_icaluID
  * m365_importance
  * m365_isallday
  * m365_iscancelled
  * m365_isdraft
  * m365_responserequested
  * m365_sensitivity
  * m365_showas
  * m365_subject
  * m365_type
* Server driven pagination is supported.

### Attributes for Graph Event

| Column |Dataverse Type |Details |
|---|---|---|
|`m365_collaborationrootid` |String |Collaboration root of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note that this attribute won't be returned when retrieving multiple records. |
|`m365_allownewtimeproposals` |Boolean |True, if the meeting organizer allows invitees to propose a new time when responding. Otherwise false, which is optional. Default is true. |
|`m365_attendees` |String |The collection of attendees for the event. This attribute is a JSON encoded string, 15000 max in length. For example, [{{\"type\":\"required\",\"status\":{{\"response\":\"none\",\"time\":\"0001-01-01T00:00:00Z\"}},\"emailAddress\":\"test@contoso.com\"}}] |
|`m365_body` |String |The body of the message associated with the event. It can be in HTML or text format. This attribute is a JSON encoded string, 15000 max in length. For example {\"contentType\":\"html\",\"content\":\"html/html\"} |
|`m365_bodypreview` |String |The preview of the message associated with the event. It is in text format. |
|`m365_categories` |String |The categories associated with the event. Each category corresponds to the displayName property of an outlookCategory defined for the user. For example [\"string\"] |
|`m365_changekey` |String |Identifies the version of the event object. Every time the event is changed, ChangeKey changes as well. This allows Exchange to apply changes to the correct version of the object. |
|`m365_createddatetime` |DateTime |The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
|`m365_start` |DateTime |The start date, time, and time zone of the event. This attribute is a JSON encoded string, 100 max in length. For example {\"dateTime\":\"2022-01-19T11:00:00+00:00\",\"timeZone\":\"UTC\"}|
|`m365_end` |DateTime |The date, time, and time zone that the event ends. This attribute is a JSON encoded string, 100 max in length. For example {\"dateTime\":\"2022-01-19T11:00:00+00:00\",\"timeZone\":\"UTC\"} |
|`m365_hasattachments` |Boolean |Set to true if the event has attachments. |
|`m365_hideattendees` |Boolean |When set to true, each attendee only sees themselves in the meeting request and meeting Tracking list. Default is false. |
|`m365_icaluid` |String |A unique identifier for an event across calendars. This ID is different for each occurrence in a recurring series. Read-only. |
|`m365_isallday`|Boolean |Set to true if the event lasts all day. If true, regardless of whether it's a single-day or multi-day event, start and end time must be set to midnight and be in the same time zone. |
|`m365_iscancelled` |Boolean |Set to true if the event has been canceled. |
|`m365_id`| String |Read-only. ID of the event. |
|`m365_isdraft` |Boolean |Set to true if the user has updated the meeting in Outlook but hasn't sent the updates to attendees. Set to false if all changes have been sent, or if the event is an appointment without any attendees.|
|`m365_isonlinemeeting`|Boolean|True if this event has online meeting information (that is, onlineMeeting points to an onlineMeetingInfo resource), false otherwise. Default is false (onlineMeeting is null). Optional. After you set isOnlineMeeting to true, Microsoft Graph initializes onlineMeeting. Later Outlook ignores any further changes to isOnlineMeeting, and the meeting remains available online.|
|`m365_isorganizer`|Boolean|Set to true if the calendar owner (specified by the owner property of the calendar) is the organizer of the event (specified by the organizer property of the event). This also applies if a delegate organized the event on behalf of the owner.|
|`m365_isremindero`n|Boolean|Set to true if an alert is set to remind the user of the event.|
|`m365_lastmodifieddatetime`|DateTime|The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z|
|`m365_location`|String|The location of the event. JSON encoded string, max 4000 in length. For example[{\"address\":null,\"coordinates\":null,\"displayName\":\"Harry\'s Bar\",\"locationEmailAddress\":null,\"locationType\":\"default\",\"locationUri\":null,\"uniqueId\":\"Harry\'s Bar\",\"uniqueIdType\":\"private\"}|
|`m365_locations`|String|The locations where the event is held or attended from. The location and locations properties always correspond with each other. If you update the location property, any prior locations in the locations collection would be removed and replaced by the new location value. JSON encoded string, max 4000 in length.for example[{\"address\":null,\"coordinates\":null,\"displayName\":\"Harry\'s Bar\",\"locationEmailAddress\":null,\"locationType\":\"default\",\"locationUri\":null,\"uniqueId\":\"Harry\'s Bar\",\"uniqueIdType\":\"private\"}]|
|`m365_onlinemeeting`|String|Details for an attendee to join the meeting online. Default is null. Read-only.After you set the isOnlineMeeting and onlineMeetingProvider properties to enable a meeting online, Microsoft Graph initializes onlineMeeting. When set, the meeting remains available online, and you can't change the isOnlineMeeting, onlineMeetingProvider, and onlneMeeting properties again. JSON encoded string, max 4000 in length.for example{\"conferenceId\": \"String\",\"joinUrl\": \"String\",\"phones\": [{\"@odata.type\": \"microsoft.graph.phone\"}],\"quickDial\": \"String\",\"tollFreeNumbers\": [\"String\"],\"tollNumber\": \"String\"}|
|`m365_onlinemeetingprovider`|String|Details for an attendee to join the meeting online. Default is null. Read-only. After you set the isOnlineMeeting and `onlineMeetingProvider` properties to enable a meeting online, Microsoft Graph initializes onlineMeeting. When set, the meeting remains available online, and you can't change the isOnlineMeeting, `onlineMeetingProvider`, and onlneMeeting properties again.|
|`m365_onlinemeetingurl`|String|A URL for an online meeting. The property is set only when an organizer specifies in Outlook that an event is an online meeting such as Skype. Read-only. To access the URL to join an online meeting, use `joinUrl`, which is exposed via the `onlineMeeting` property of the event. The `onlineMeetingUrl` property will be deprecated in the future.|
|`m365_organizer`|String|The organizer of the event.JSON encoded string, max 4000 in length. {\"emailAddress\":{\"@odata.type\":\"microsoft.graph.emailAddress\"}}|
|`m365_originalendtimezone`|String|The end time zone that was set when the event was created. A value of tzone://Microsoft/Custom indicates that a legacy custom time zone was set in desktop Outlook.|
|`m365_originalstart`|DateTime|Represents the start time of an event when it's initially created as an occurrence or exception in a recurring series. This property isn't returned for events that are single instances. Its date and time information is expressed in ISO 8601 format and is always in UTC. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z|
|`m365_originalstarttimezone`|String|The start time zone that was set when the event was created. A value of tzone://Microsoft/Custom indicates that a legacy custom time zone was set in desktop Outlook.|
|`m365_recurrence`|String|The recurrence pattern for the event. JSON encoded string, max 4000 in length.for example{\"pattern\":{\"dayOfMonth\":0,\"daysOfWeek\":[\"monday\",\"wednesday\",\"friday\"],\"firstDayOfWeek\":\"sunday\",\"index\":\"first\",\"interval\":1,\"month\":0,\"type\":\"weekly\"},\"range\":{\"startDate\":\"2017-08-14\",\"endDate\":\"2018-08-14\",\"numberOfOccurrences\":0,\"recurrenceTimeZone\":\"Eastern Standard Time\",\"type\":\"endDate\"}}|
|`m365_reminderminutesbeforestart`|Int32|The number of minutes before the event start time that the reminder alert occurs.|
|`m365_responserequested`|Boolean|Default is true, which represents the organizer would like an invitee to send a response to the event.|
|`m365_responsestatus`|String|Indicates the type of response sent in response to an event message. JSON encoded string, max 4000 in length.{\"response\": \"String\",\"time\": \"String (timestamp)\"}|
|`m365_sensitivity`|String|Possible values are: normal, personal, private, confidential.|
|`m365_seriesmasterid`|String|The ID for the recurring series master item, if this event is part of a recurring series.|
|`m365_showas`|String|The status to show. Possible values are: free, tentative, busy, oof, workingElsewhere, unknown.|
|`m365_subject`|String|The text of the event's subject line. Primary lookup column|
|`m365_transactionid`|String|A custom identifier specified by a client app for the server to avoid redundant POST operations if client retries to create the same event. This is useful when low network connectivity causes the client to time out before receiving a response from the server for the client's prior create-event request. After you set `transactionId` when creating an event, you can't change transactionId in a subsequent update. This property is only returned in a response payload if an app has set it. Optional.|
|`m365_type`|String|The event type. Possible values are: singleInstance, occurrence, exception, seriesMaster. Read-only|
|`m365_weblink`|String|The URL to open the event in Outlook on the web. Outlook on the web opens the event in the browser if you're signed in to your mailbox. Otherwise, Outlook on the web prompts you to sign in. This URL can't be accessed from within an iFrame.|
|`m365_grapheventid`|Guid|Unique identifier of the graph event.|
|`m365_groupid`|String|Group ID to which the event belongs.|

## Graph Booking Appointment

* Entity name: m365_graphbookingappointment
* Graph resource: [bookingAppointment resource type](/graph/api/resources/bookingappointment)
* Sorting isn't supported.
* Filtering is supported on the following columns:
  * m365_bookingbusinessID
  * m365_collaborationrootID
  * m365_customertimezone
  * m365_optoutofcustomeremail
  * m365_price
  * m365_pricetype
  * m365_serviceID
  * m365_servicename
* Pagination isn't supported.

### Attributes for Graph Booking Appointment

| Column  | Dataverse Type | Details |
|---|---|---|
| `m365_collaborationrootid`| String| Collaboration root ID of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note that this attribute won't be returned when retrieving multiple records.|
| `m365_graphbookingappointmentid` | Guid | Unique Identifier of the graph booking appointment.|
| `m365_bookingbusinessid` | String | The unique Identifier of the booking business the appointment is scheduled under.|
| `m365_additionalinformation` | String | Extra information that is sent to the customer when an appointment is confirmed.|
| `m365_customers` | String| It lists down the customer properties for an appointment. appointment will contain a list of customer information and each unit will indicate the properties of a customer who is part of that appointment. Optional[{\"customerID\":\"d243c77b-f1ff-4615-a01f-1660b5cb0e79\",\"customQuestionAnswers\":[],\"emailAddress\":\"jordanm@contoso.com\",\"location\":{\"address\":{\"city\":\"\",\"countryOrRegion\":\"\",\"postalCode\":\"\",\"postOfficeBox\",\"state\":\"\",\"street\":\"\",\"type\" },\"coordinates\":{\"accuracy\",\"altitude\",\"altitudeAccuracy\",\"latitude\",\"longitude\" },\"displayName\":\"\",\"locationEmailAddress\",\"locationType\",\"locationUri\":\"\",\"uniqueID\",\"uniqueIDType\" },\"name\":\"Jordan Miller\",\"notes\",\"phone\",\"timeZone\",\"@odata.type\":\"#microsoft.graph.bookingCustomerInformation\"}] |
| `m365_customertimezone` | String | The time zone of the customer. For a list of possible values, see [dateTimeTimeZone resource type](/graph/api/resources/datetimetimezone). |
| `m365_duration` | String | The length of the appointment, denoted in ISO8601 format.|
| `m365_enddatetime` | DateTime | The date, time, and time zone that the appointment ends.|
| `m365_filledattendeescount` | Int32 | The current number of customers in the appointment.|
| `m365_id` | String | The ID of the bookingAppointment. Read-only.|
| `m365_islocationonline` | Boolean | True indicates that the appointment will be held online. Default value is false.|
| `m365_joinweburl` | String | The URL of the online meeting for the appointment.|
| `m365_maximumattendeescount` | Int32 | The maximum number of customers allowed in an appointment.|
| `m365_optoutofcustomeremail` | Boolean | True indicates that the bookingCustomer for this appointment doesn't wish to receive a confirmation for this appointment.|
| `m365_postbuffer` | String | The amount of time to reserve after the appointment ends, for cleaning up, as an example. The value is expressed in ISO8601 format.|
| `m365_prebuffer` | String | The amount of time to reserve before the appointment begins, for preparation, as an example. The value is expressed in ISO8601 format.|
| `m365_price` | DecimalType | The regular price for an appointment for the specified bookingService.|
| `m365_pricetype` | String | A setting to provide flexibility for the pricing structure of services. Possible values are: undefined, fixedPrice, startingAt, hourly, free, priceVaries, callUs, notSet.|
| `m365_reminders` | String | The collection of customer reminders sent for this appointment. The value of this property is available only when reading this bookingAppointment by it's ID. [{\"message\":\"We look forward to seeing you!\",\"offset\":\"P1D\",\"recipients\":\"customer\"},{\"message\":\"Reminder that you have an appointment!\",\"offset\":\"P1D\",\"recipients\":\"staff\"}] |
| `m365_selfserviceappointmentid` | String | Another tracking ID for the appointment, if the appointment has been created directly by the customer on the scheduling page, as opposed to by a staff member on the behalf of the customer.|
| `m365_serviceid` | String | The ID of the bookingService associated with this appointment.|
| `m365_servicelocation` | String | The location where the service is delivered. {\"address\":{\"city\":\"\",\"countryOrRegion\":\"\",\"postalCode\":\"\",\"postOfficeBox\",\"state\":\"\",\"street\":\"\",\"type\" },\"coordinates\":{\"accuracy\",\"altitude\",\"altitudeAccuracy\",\"latitude\",\"longitude\" },\"displayName\":\"Our office address\",\"locationEmailAddress\",\"locationType\",\"locationUri\":\"\",\"uniqueID\",\"uniqueIDType\" } |
| `m365_servicename` | String | The name of the bookingService associated with this appointment. This property is optional when creating a new appointment. If not specified, it's computed from the service associated with the appointment by the serviceID property. |
| `m365_servicenotes` |String | Notes from a bookingStaffMember. The value of this property is available only when reading this bookingAppointment by its ID.|
| `m365_smsnotificationsenabled` | Boolean | True indicates SMS notifications will be sent to the customers for the appointment. Default value is false.|
| `m365_staffmemberids` | String | The ID of each bookingStaffMember who is scheduled in this appointment. Stored as a comma separated string.[\”string\”] |
| `m365_startdatetime` | DateTime | The date, time, and time zone that the appointment begins.|

## Graph Drive

* Entity name: m365_graphdrive
* Graph resource: [drive resource type](/graph/api/resources/drive)
* Sorting isn't supported.
* Filtering isn't supported.
* Server driven pagination is supported.

### Attributes for Graph Drive

|Column |Dataverse Type |Details |
|---|---|---|
|`m365_collaborationrootid` |String | Collaboration root ID of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note that this attribute won't be returned when retrieving multiple records. |
|`m365_createdby` |String |Identity of the user, device, or application that created the item. Read-only. This attribute is a JSON encoded string for example { "user": { "displayName": "System Account" } } |
|`m365_createddatetime` |DateTime |Date and time of item creation. Read-only. |
|`m365_description` |String |Provide a user-visible description of the drive. Read-only. |
|`m365_drivetype` |String |Describes the type of drive represented by this resource. OneDrive personal drives will return personal. OneDrive for Business will return business. SharePoint document libraries will return documentLibrary. Read-only. |
|`m365_graphdriveid` |Guid |Unique Identifier of the graph drive. |
|`m365_id` |String |The unique Identifier of the drive. Read-only. |
|`m365_lastmodifiedby` | String |Identity of the user, device, and application, which last modified the item. Read-only. This attribute is a JSON encoded string for example { "user": { "email": “user@contoso.com”,  "ID": "61de164e-21ff-4b1c-8cbd-77ac440894f8", "displayName": "User Name" } } |
|`m365_lastmodifieddatetime` |DateTime |Date and time the item was last modified. Read-only.|
|`m365_name` |String |The name of the item. Read-only. |
|`m365_owner` |String |Optional. The user account that owns the drive. Read-only. This attribute is a JSON encoded string. For example { "group": { "ID": "76c7286f-8645-4ba8-bc0f-c65a16424aaa", "displayName": "Group Name" }} |
|`m365_quota` |String |Optional. Information about the drive's storage space quota. Read-only. This attribute is a JSON encoded string. For example { "deleted": 482586,  "remaining": 27487788645969, "state": "normal", "total": 27487790694400, "used": 1565845 } |
|`m365_sharepointids` |String |Returns Identifiers useful for SharePoint REST compatibility. Read-only. This property isn't returned by default and must be selected using the $select query parameter. This attribute is a JSON encoded string. For example "sharePointIDs": { "listID": "29d8457a-8e26-4291-9901-09718a388aaa", "siteID": "93618739-b3ca-4107-a77c-fba278c48aaa", "siteUrl": “<https://contoso.sharepoint.com>”,  "tenantID": "53986071-de92-43ad-a41f-f3c4adb2beef",  "webID": "a0d0e9ec-e547-4338-92d9-4c2c62e5beef" } |
| `m365_siteid` |String |The Identifier for the site that contains the document library.
|`m365_system` |String |If present, indicates that this is a system-managed drive. Read-only.
|`m365_weburl` |String |URL that displays the resource in the browser. Read-only.

### Graph Drive Item

* Entity name: m365_graphdriveitem
* Graph resource: [driveItem resource type](/graph/api/resources/driveitem)
* Sorting is supported on the following column:
  * m365_name
* Filtering is supported on the following column:
  * m365_name
* Server driven pagination is supported.

### Attributes for Graph Drive Item

|Column |Dataverse Type |Details |
|---|---|---|
|`m365_audio` |String |Audio metadata, if the item is an audio file. Read-only. Only on OneDrive Personal. This attribute is a JSON encoded string. { "album": "string",  "albumArtist": "string", artist": "string", bitrate": 128, "composers": "string", copyright": "string", "disc": 0, "discCount": 0, "duration": 567, "genre": "string", "hasDrm": false, "isVariableBitrate": false, "title": "string", "track": 1, "trackCount": 16, "year": 2014 }|
|`M365_bundle` |String |Bundle metadata, if the item is a bundle. Read-only. This attribute is a JSON encoded string. For example, { "childCount": 3, "album": { "@odata.type": "microsoft.graph.album" }, } |
|`m365_collaborationrootid` |String |Collaboration root ID of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note that this attribute won't be returned when retrieving multiple records. |
|`m365_copy` |String |If present in the request then a copy operation is performed. |
|`m365_createdby` |String |Identity of the user, device, and application, which created the item. Read-only. This attribute is a JSON encoded string. For example, {"user":{"displayName":"User Name","email":"alias@contoso.com","ID":"a298b975-3493-4d9e-b2d4-3cad78f00000"},"group": null,"application","device" } |
|`m365_createddatetime` |DateTime |Date and time of item creation. Read-only. |
|`m365_ctag` |String |An eTag for the content of the item. This eTag isn't changed if only the metadata is changed. Note. This property isn't returned if the item is a folder. Read-only. |
|`m365_deleted` |String |Information about the deleted state of the item. Read-only. This attribute is a JSON encoded string. For example, { "state": "string" } |
|`m365_description` |String |Provides a user-visible description of the item. Read-write. Only on OneDrive Personal. |
|`m365_driveid` |String |The Identifier for the drive that contains the drive item.|
|`m365_etag` |String |eTag for the entire item (metadata + content). Read-only. |
| `m365_file` |String |File metadata, if the item is a file. Read-only. This attribute is a JSON encoded string. For example, {"hashes":{"crc32Hash","quickXorHash":"Biuzvwdu+Tmu6yRefayD27hD9vD=","sha1Hash","sha256Hash" },"mimeType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","processingMetadata" } |
| `m365_filesysteminfo` |String |File system information on client. This attribute is a JSON encoded string. For example, {"createdDateTime":"2022-07-21T15:02:47+00:00","lastAccessedDateTime","lastModifiedDateTime":"2022-07-21T15:02:55+00:00"} |
|`m365_folder` |String | Folder metadata, if the item is a folder. Read-only. This attribute is a JSON encoded string. For example, {"childCount":0,"view" } |
|`m365_graphdriveitemid` |Guid |Unique Identifier of the graph drive item. |
|`m365_id` |String |The unique Identifier of the item within the Drive. Read-only. |
|`m365_image` |String |Image metadata, if the item is an image. Read-only. This attribute is a JSON encoded string. For example, {"height","width" } |
|`m365_lastmodifiedby` |String |Identity of the user, device, and application, which last modified the item. Read-only. This attribute is a JSON encoded string. For example, {"user":{"displayName":"User Name","email":"alias@contoso.com","ID":"a298b975-3493-4d9e-b2d4-3cad78f9a00e"},"group","application","device" } |
|`m365_lastmodifieddatetime` |DateTime |Date and time the item was last modified. Read-only. |
|`m365_location` |String |Location metadata, if the item has location data. Read-only. This attribute is a JSON encoded string. For example, "location": { "altitude": 1.0, "latitude": 1.0, "longitude": 1.0 } |
|`m365_malware` |String |Malware metadata, if the item was detected to contain malware. Read-only. This attribute is a JSON encoded string. For example, { "description": "string" } |
|`m365_name` |String |The name of the item (filename and extension). Read-write. |
|`m365_package` |String |If present, indicates that this item is a package instead of a folder or file. Packages are treated like files in some contexts and folders in others. Read-only. This attribute is a JSON encoded string. For example, { "type": "oneNote" } |
|`m365_parentreference` |String |Parent information, if the item has a parent. This attribute is a JSON encoded string. For example, {"driveID":"b!qgK-8nOzX0qISvfGCiC2Smbv0m0RlNhDvNQDZsCMpbSnchFAhWAaQoiTLZcSo1gq","driveType":"documentLibrary","ID":"01EYDCV4YHV77FE3EDDFHIVD6WJ2ETT3PP","name","path":"/drives/b!qgK-8nOzX0qISvfGCiC2Smbv0m0RlNhDvNQDZsCMpbSnchFAhWAaQoiTLZcSo1no/root: /folder name","shareID","sharepointIDs":{"listID":"401172a8-6085-421a-8893-2d9712a35c3c","listItemID","listItemUniqueID":"52feaf12-836c-4e19-8a8f-d64e8939ee52","siteID":"f34e02aa-b373-4a5f-884a-f7c60a20b64a","siteUrl":"https://contoso.sharepoint.com/sites/Contoso","tenantID","webID":"6dd2ef66-9411-43d8-bcd4-0366c08ccabd"},"siteID" } |
|`m365_parentreferenceid` |String |The Identifier for the drive item that is the parent of the drive item. |
|`m365_pendingoperations` |String |If present, indicates that one or more operations that might affect the state of the driveItem are pending completion. Read-only. This attribute is a JSON encoded string. For example, { "pendingContentUpdate": {"@odata.type": "microsoft.graph.pendingContentUpdate"} } |
|`m365_photo` |String |Photo metadata, if the item is a photo. Read-only. This attribute is a JSON encoded string. For example, { "cameraMake": "Camera Make", "cameraModel": "Camera Model", "exposureDenominator": 1000000, "exposureNumerator": 41671, "focalLength": 4.38, "fNumber": 1.73, "iso": 70, "orientation": 6, "takenDateTime": "2020-04-29T14:17:39Z" } |
|`m365_publication` |String |Provides information about the published or checked-out state of an item, in locations that support such actions. This property isn't returned by default. Read-only. This attribute is a JSON encoded string. For example, {"level":"published","versionID":"2.0"} |
|`m365_remoteitem` |String |Remote item data, if the item is shared from a drive other than the one being accessed. Read-only. This attribute is a JSON encoded string. For example, { "ID": "string", "createdBy": { "@odata.type": "microsoft.graph.IdentitySet" }, "createdDateTime": "timestamp", "file": { "@odata.type": "microsoft.graph.file" }, "fileSystemInfo": { "@odata.type": "microsoft.graph.fileSystemInfo" }, "folder": { "@odata.type": "microsoft.graph.folder" }, "image": { "@odata.type": "microsoft.graph.image" }, "lastModifiedBy": { "@odata.type": "microsoft.graph.IdentitySet" }, "lastModifiedDateTime": "timestamp", "name": "string", "package": { "@odata.type": "microsoft.graph.package" }, "parentReference": { "@odata.type": "microsoft.graph.itemReference" }, "shared": { "@odata.type": "microsoft.graph.shared" }, "sharepointIDs": { "@odata.type": "microsoft.graph.sharepointIDs" }, "specialFolder": { "@odata.type": "microsoft.graph.specialFolder" }, "size": 1024, "video": { "@odata.type": "microsoft.graph.video" }, "webDavUrl": "url", "webUrl": "url" } |
|`m365_root` |String |If this property is non-null, it indicates that the driveItem is the top-most driveItem in the drive. |
|`m365_searchresult` |String |Search metadata, if the item is from a search result. Read-only. This attribute is a JSON encoded string. For example, { "onClickTelemetryUrl": "url" } |
|`m365_shared` |String |Indicates that the item has been shared with others and provides information about the shared state of the item. Read-only. This attribute is a JSON encoded string. For example, { "scope": "users", "owner": { "user": { "displayName": "User Name", "ID": "bbbb6fa48aaaaaaa" } } } |
|`m365_sharepointids` |String |Returns Identifiers useful for SharePoint REST compatibility. Read-only. This attribute is a JSON encoded string. e.g{"listID":"401172a7-6085-421a-8893-2d9712a35aba","listItemID":"338","listItemUniqueID":"0edc89e5-24ea-4c6b-a019-dc51f45eeccc","siteID":"f2be02aa-b373-4a5f-884a-f7c60a20bddd","siteUrl":"https://contoso.sharepoint.com/sites/Contoso","tenantID":"1c137272-0581-487f-b195-aeeb93cc4ccc","webID":"6dd2ef66-9411-43d8-bcd4-0366c08caaaa"} |
|`m365_siteid` |String |The Identifier for the site that contains the document library. |
|`m365_size` |IntType |Size of the item in bytes. Read-only. |
|`m365_specialfolder` |String |If the current item is also available as a special folder, this facet is returned. Read-only. This attribute is a JSON encoded string. For example, { "name": "documents" } |
|`m365_thumbnail` |String |If present in the request then the drive item thumbnails will be retrieved. |
|`m365_video` |String |If the current item is also available as a special folder, this facet is returned. Read-only. This attribute is a JSON encoded string. For example, {"bitrate": 10646968, "duration": 1050683, "height": 720,  "width": 1280,  "audioBitsPerSample": 16, "audioChannels": 1, "audioFormat": "PCM", "audioSamplesPerSecond": 32000, "fourCC": "H264", "frameRate": 60} |
|`m365_webdavurl` |String | WebDAV compatible URL for the item. |
|`m365_weburl` |String |URL that displays the resource in the browser. Read-only. |

## See also

* [Integrate web apps](integrate-web-apps-overview.md)
* [Microsoft Graph overview](/graph/teams-concept-overview)
