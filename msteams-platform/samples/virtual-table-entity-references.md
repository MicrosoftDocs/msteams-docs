---
title: Virtual Table entity references
author: surbhigupta
description: In this module, learn about virtual tables entity reference and their attributes in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-npaladugu
ms.topic: conceptual
---

# Virtual Tables Entity Reference

Learn about all the available Collaboration controls virtual entities and their attributes. These entities have a one-to-one mapping with a specific Microsoft Graph resource type, for example, the Graph Planner Task entities maps to the [Microsoft Graph Planner Task resource type](/graph/api/resources/plannertask). The virtual entity shares the same attributes as the resource type.

> [!NOTE]
> Currently Collaboration controls are available only in [public developer preview](~/resources/dev-preview/developer-preview-intro.md).

## Collaboration controls virtual entities

| Name | Description |
|---|---|
| Graph Planner Task | The Graph Planner Task table represents a Planner task in Microsoft 365. |
| Graph Planner Plan | The Graph Planner Plan table represents a Planner plan in Microsoft 365. |
| Graph Event | The Graph Event table represents an event in a user calendar, or the default calendar of a Microsoft 365 group. |
| Graph Booking Appointment | The Graph Booking Appointment table represents a customer appointment for a Booking Service, performed by a set of staff members, provIDed by a Microsoft Bookings business. |
| Graph Drive | The Graph Drive table represents the top-level object that represents a user's OneDrive or a document library in SharePoint. |
| Graph Drive Item | The Graph Drive Item table represents a file, folder, or other item stored in a drive. |

### Graph Planner Task

* Entity name: m365_graphplannertask.
* Graph resource: [plannerTask resource type](/graph/api/resources/plannertask)
* Sorting isn't supported.
* Filtering isn't supported.
* Server driven pagination is supported, with maximum page size being 400.

### Attributes Graph Planner Task

| Column  | Dataverse Type | Details |
|---|---|---|
| `m365_collaborationrootID` | StringType | Collaboration root ID(s) of the collaboration session record is associated with multiple collaboration sessions. This will be returned as a comma delimited string. Note that this attribute won't be returned when retrieving multiple records. |
| `m365_activechecklistitemcount` | IntegerType | Number of checklist items with value set to false, representing incomplete items. |
| `m365_appliedcategories` | StringType | Number of checklist items with value set to false, representing incomplete items. |
| `m365_appliedcategories` | StringType | The categories to which the task has been applied. This attribute is a JSON encoded string, for example "{ \"category1\": true, \"category6\": true, \"category9\": true }" |
| `m365_assigneepriority` | StringType | Hint used to order items of this type in a list view. The format is defined as outlined in [using order hints in Planner](/graph/api/resources/planner-order-hint-format). |
| `m365_assignments` | StringType | The set of assignees, the task is assigned to. This attribute is a JSON encoded string for example "{\" 7be...\": {\"assignedBy\": {\"user\": {\"displayName\", \"email\", \"ID\":\" 7be...\"}, \"group\": null, \"application\": null \"device\": null}" |
| m365_bucketID | StringType | Bucket ID to which the task belongs. The bucket needs to be in the plan that the task is in. It's 28 characters long and case-sensitive. Format valIDation is done on the service. |
| m365_checklistitemcount | IntegerType | Number of checklist items that are present on the task. |
| m365_completedby | StringType | IDentity of the user that completed the task. This attribute is a JSON encoded string, for example {\"user\": {\"displayName\",\"ID\":\"d55...\"}} |
| m365_completeddatetime | DateTimeType | Read-only. Date and time at which the 'percentComplete' of the task is set to '100'. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, mIDnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| m365_conversationthreadID |StringType | Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group. |
| m365_createdby | StringType | IDentity of the user that created the task. This attribute is a JSON encoded string, for example {\"user\": {\"displayName\",\"ID\":\"d55...\"}} |
| m365_createddatetime | DateTimeType | Read-only. Date and time at which the task is created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, mIDnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| m365_duedatetime | DateTimeType | Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, mIDnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| m365_hasdescription | BooleanType | Read-only. Value is true if the details object of the task has a non-empty description and false otherwise. |
| m365_ID | StringType | Read-only. ID of the task. It's 28 characters long and case-sensitive. Format valIDation is done on the service.|
| m365_orderhint | StringType | Hint used to order items of this type in a list view. The format is defined as outlined here. |
| m365_percentcomplete | IntegerType | Percentage of task completion. When set to 100, the task is consIDered completed. |
| m365_priority | IntegerType | Priority of the task. The valID range of values is between 0 and 10, with the increasing value being lower priority (0 has the highest priority and 10 has the lowest priority). Currently, Planner interprets values 0 and 1 as "urgent", 2, 3 and 4 as "important", 5, 6, and 7 as "medium", and 8, 9, and 10 as "low". Additionally, Planner sets the value 1 for "urgent", 3 for "important", 5 for "medium", and 9 for "low". |
| m365_planID | StringType | Plan ID to which the task belongs. |
| m365_previewtype | StringType | This sets the type of preview that shows up on the task. The possible values are: automatic, noPreview, checklist, description, reference. |
| m365_referencecount | IntegerType | Number of external references that exist on the task.|
| m365_startdatetime | DateTimeType | Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, mIDnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| m365_title | StringType |Title of the task. Primary lookup column |

### Graph Planner Plan

* Entity name: m365_graphplannerplan.
* Graph resource:  graph/api/resources/plannerplan.
* Sorting isn't supported.
* Filtering isn't supported.
* Server driven pagination is supported, with maximum page size being 400.

### Attributes Graph Planner Plan

| Column  | Dataverse Type | Details |
|---|---|---|
| m365_collaborationrootID | StringType | Collaboration root ID(s) of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note: This attribute won't be returned when retrieving multiple records.|
| m365_graphplannerplanID |StringType |
| m365_createdby | StringType | IDentity of the user that created the task. This attribute is a JSON encoded string, for example {\"user\": {\"displayName\",\"ID\":\"d55...\"}} |
| m365_createddatetime | DateTimeType | Read-only. Date and time at which the task is created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, mIDnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
| m365_ID | StringType | Read-only. ID of the plan. It's 28 characters long and case-sensitive. Format valIDation is done on the service.|
| m365_owner | StringType | ID of the group that owns the plan. After it's set, this property can’t be updated.|
| m365_title | StringType | Title of the plan. Primary lookup column |

## Graph Event

* Entity name: m365_graphevent
* Graph resource: graph/api/resources/event
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

### Attributes Graph Event

| Column |Dataverse Type |Details |
|---|---|---|
|m365_collaborationrootid |StringType |Collaboration root id(s) of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note: This attribute won't be returned when retrieving multiple records. |
|m365_allownewtimeproposals |BooleanType |true if the meeting organizer allows invitees to propose a new time when responding; otherwise, false. Optional. Default is true. |
|m365_attendees |StringType |The collection of attendees for the event. This attribute is a JSON encoded string, 15000 max in length. for example, [{{\"type\":\"required\",\"status\":{{\"response\":\"none\",\"time\":\"0001-01-01T00:00:00Z\"}},\"emailAddress\":\"test@contoso.com\"}}] |
|m365_body |StringType |The body of the message associated with the event. It can be in HTML or text format. This attribute is a JSON encoded string, 15000 max in length. for example {\"contentType\":\"html\",\"content\":\"html/html\"} |
|m365_bodypreview |StringType |The preview of the message associated with the event. It is in text format. |
|m365_categories |StringType |The categories associated with the event. Each category corresponds to the displayName property of an outlookCategory defined for the user. for example [\"string\"] |
|m365_changekey |StringType |Identifies the version of the event object. Every time the event is changed, ChangeKey changes as well. This allows Exchange to apply changes to the correct version of the object. |
|m365_createddatetime |DateTimeType |The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z |
|m365_start |DateTimeType |The start date, time, and time zone of the event. This attribute is a JSON encoded string, 100 max in length. for example {\"dateTime\":\"2022-01-19T11:00:00+00:00\",\"timeZone\":\"UTC\"}|
|m365_end |DateTimeType |The date, time, and time zone that the event ends. This attribute is a JSON encoded string, 100 max in length. for example {\"dateTime\":\"2022-01-19T11:00:00+00:00\",\"timeZone\":\"UTC\"} |
|m365_hasattachments |BooleanType |Set to true if the event has attachments. |
|m365_hideattendees |BooleanType |When set to true, each attendee only sees themselves in the meeting request and meeting Tracking list. Default is false. |
|m365_icaluid |StringType |A unique identifier for an event across calendars. This ID is different for each occurrence in a recurring series. Read-only. |
|m365_isallday |BooleanType |Set to true if the event lasts all day. If true, regardless of whether it's a single-day or multi-day event, start and end time must be set to midnight and be in the same time zone. |
|m365_iscancelled |BooleanType |Set to true if the event has been canceled. |
|m365_id| StringType |Read-only. ID of the event. |
|m365_isdraft |BooleanType |Set to true if the user has updated the meeting in Outlook but hasn't sent the updates to attendees. Set to false if all changes have been sent, or if the event is an appointment without any attendees.|
|m365_isonlinemeeting|BooleanType|True if this event has online meeting information (that is, onlineMeeting points to an onlineMeetingInfo resource), false otherwise. Default is false (onlineMeeting is null). Optional. After you set isOnlineMeeting to true, Microsoft Graph initializes onlineMeeting. Later Outlook ignores any further changes to isOnlineMeeting, and the meeting remains available online.|
|m365_isorganizer|BooleanType|Set to true if the calendar owner (specified by the owner property of the calendar) is the organizer of the event (specified by the organizer property of the event). This also applies if a delegate organized the event on behalf of the owner.|
|m365_isreminderon|BooleanType|Set to true if an alert is set to remind the user of the event.|
|m365_lastmodifieddatetime|DateTimeType|The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z|
|m365_location|StringType|The location of the event. JSON encoded string, max 4000 in length.
for example[{\"address\":null,\"coordinates\":null,\"displayName\":\"Harry\'s Bar\",\"locationEmailAddress\":null,\"locationType\":\"default\",\"locationUri\":null,\"uniqueId\":\"Harry\'s Bar\",\"uniqueIdType\":\"private\"}|
|m365_locations|StringType|The locations where the event is held or attended from. The location and locations properties always correspond with each other. If you update the location property, any prior locations in the locations collection would be removed and replaced by the new location value. JSON encoded string, max 4000 in length.for example[{\"address\":null,\"coordinates\":null,\"displayName\":\"Harry\'s Bar\",\"locationEmailAddress\":null,\"locationType\":\"default\",\"locationUri\":null,\"uniqueId\":\"Harry\'s Bar\",\"uniqueIdType\":\"private\"}]|
|m365_onlinemeeting|StringType|Details for an attendee to join the meeting online. Default is null. Read-only.After you set the isOnlineMeeting and onlineMeetingProvider properties to enable a meeting online, Microsoft Graph initializes onlineMeeting. When set, the meeting remains available online, and you can't change the isOnlineMeeting, onlineMeetingProvider, and onlneMeeting properties again. JSON encoded string, max 4000 in length.for example{\"conferenceId\": \"String\",\"joinUrl\": \"String\",\"phones\": [{\"@odata.type\": \"microsoft.graph.phone\"}],\"quickDial\": \"String\",\"tollFreeNumbers\": [\"String\"],\"tollNumber\": \"String\"}|
|m365_onlinemeetingprovider|StringType|Details for an attendee to join the meeting online. Default is null. Read-only. After you set the isOnlineMeeting and onlineMeetingProvider properties to enable a meeting online, Microsoft Graph initializes onlineMeeting. When set, the meeting remains available online, and you can't change the isOnlineMeeting, onlineMeetingProvider, and onlneMeeting properties again.|
|m365_onlinemeetingurl|StringType|A URL for an online meeting. The property is set only when an organizer specifies in Outlook that an event is an online meeting such as Skype. Read-only.
To access the URL to join an online meeting, use joinUrl, which is exposed via the onlineMeeting property of the event. The onlineMeetingUrl property will be deprecated in the future.|
|m365_organizer|StringType|The organizer of the event.JSON encoded string, max 4000 in length.
{\"emailAddress\":{\"@odata.type\":\"microsoft.graph.emailAddress\"}}|
|m365_originalendtimezone|StringType|The end time zone that was set when the event was created. A value of tzone://Microsoft/Custom indicates that a legacy custom time zone was set in desktop Outlook.|
|m365_originalstart|DateTimeType|Represents the start time of an event when it's initially created as an occurrence or exception in a recurring series. This property isn't returned for events that are single instances. Its date and time information is expressed in ISO 8601 format and is always in UTC. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z|
|m365_originalstarttimezone|StringType|The start time zone that was set when the event was created. A value of tzone://Microsoft/Custom indicates that a legacy custom time zone was set in desktop Outlook.|
|m365_recurrence|StringType|The recurrence pattern for the event. JSON encoded string, max 4000 in length.for example{\"pattern\":{\"dayOfMonth\":0,\"daysOfWeek\":[\"monday\",\"wednesday\",\"friday\"],\"firstDayOfWeek\":\"sunday\",\"index\":\"first\",\"interval\":1,\"month\":0,\"type\":\"weekly\"},\"range\":{\"startDate\":\"2017-08-14\",\"endDate\":\"2018-08-14\",\"numberOfOccurrences\":0,\"recurrenceTimeZone\":\"Eastern Standard Time\",\"type\":\"endDate\"}}|
|m365_reminderminutesbeforestart|IntegerType|The number of minutes before the event start time that the reminder alert occurs.|
|m365_responserequested|BooleanType|Default is true, which represents the organizer would like an invitee to send a response to the event.|
|m365_responsestatus|StringType|Indicates the type of response sent in response to an event message. JSON encoded string, max 4000 in length.{\"response\": \"String\",\"time\": \"String (timestamp)\"}|
|m365_sensitivity|StringType|Possible values are: normal, personal, private, confidential.|
|m365_seriesmasterid|StringType|The ID for the recurring series master item, if this event is part of a recurring series.|
|m365_showas|StringType|The status to show. Possible values are: free, tentative, busy, oof, workingElsewhere, unknown.|
|m365_subject|StringType|The text of the event's subject line. Primary lookup column|
|m365_transactionid|StringType|A custom identifier specified by a client app for the server to avoid redundant POST operations in case of client retries to create the same event. This is useful when low network connectivity causes the client to time out before receiving a response from the server for the client's prior create-event request. After you set transactionId when creating an event, you can't change transactionId in a subsequent update. This property is only returned in a response payload if an app has set it. Optional.|
|m365_type|StringType|The event type. Possible values are: singleInstance, occurrence, exception, seriesMaster. Read-only|
|m365_weblink|StringType|The URL to open the event in Outlook on the web.Outlook on the web opens the event in the browser if you're signed in to your mailbox. Otherwise, Outlook on the web prompts you to sign in.This URL cannot be accessed from within an iFrame.|
|m365_grapheventid|StringType|Unique identifier of the graph event.|
|m365_groupid|StringType|Group ID to which the event belongs.|

### Graph Booking Appointment

* Entity name: m365_graphbookingappointment
* Graph resource: graph/api/resources/bookingAppointment
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

### Attributes Graph Booking Appointment

| Column  | Dataverse Type | Details |
|---|---|---|
| m365_collaborationrootID| StringType| Collaboration root ID(s) of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note: This attribute won't be returned when retrieving multiple records.|
| m365_graphbookingappointmentID | StringType | Unique Identifier of the graph booking appointment.|
| m365_bookingbusinessID | StringType | The unique Identifier of the booking business the appointment is scheduled under.|
| m365_additionalinformation | StringType | Additional information that is sent to the customer when an appointment is confirmed.|
| m365_customers | StringType| It lists down the customer properties for an appointment. appointment will contain a list of customer information and each unit will indicate the properties of a customer who is part of that appointment. Optional[{\"customerID\":\"d243c77b-f1ff-4615-a01f-1660b5cb0e79\",\"customQuestionAnswers\":[],\"emailAddress\":\"jordanm@contoso.com\",\"location\":{\"address\":{\"city\":\"\",\"countryOrRegion\":\"\",\"postalCode\":\"\",\"postOfficeBox\",\"state\":\"\",\"street\":\"\",\"type\" },\"coordinates\":{\"accuracy\",\"altitude\",\"altitudeAccuracy\",\"latitude\",\"longitude\" },\"displayName\":\"\",\"locationEmailAddress\",\"locationType\",\"locationUri\":\"\",\"uniqueID\",\"uniqueIDType\" },\"name\":\"Jordan Miller\",\"notes\",\"phone\",\"timeZone\",\"@odata.type\":\"#microsoft.graph.bookingCustomerInformation\"}] |
| m365_customertimezone | StringType | The time zone of the customer. For a list of possible values, see docs.microsoft.com/graph/api/resources/datetimetimezone?view=graph-rest-beta> |
| m365_duration | StringType | The length of the appointment, denoted in ISO8601 format.|
| m365_enddatetime | DateTimeType | The date, time, and time zone that the appointment ends.|
| m365_filledattendeescount | IntegerType | The current number of customers in the appointment.|
| m365_ID | StringType | The ID of the bookingAppointment. Read-only.|
| m365_islocationonline | BooleanType | True indicates that the appointment will be held online. Default value is false.|
| m365_joinweburl | StringType | The URL of the online meeting for the appointment.|
| m365_maximumattendeescount | IntegerType | The maximum number of customers allowed in an appointment.|
| m365_optoutofcustomeremail | BooleanType | True indicates that the bookingCustomer for this appointment doesn't wish to receive a confirmation for this appointment.|
| m365_postbuffer | StringType | The amount of time to reserve after the appointment ends, for cleaning up, as an example. The value is expressed in ISO8601 format.|
| m365_prebuffer | StringType | The amount of time to reserve before the appointment begins, for preparation, as an example. The value is expressed in ISO8601 format.|
| m365_price | DecimalType | The regular price for an appointment for the specified bookingService.|
| m365_pricetype | StringType | A setting to provIDe flexibility for the pricing structure of services. Possible values are: undefined, fixedPrice, startingAt, hourly, free, priceVaries, callUs, notSet.|
| m365_reminders | StringType | The collection of customer reminders sent for this appointment. The value of this property is available only when reading this bookingAppointment by its ID.
[{\"message\":\"We look forward to seeing you!\",\"offset\":\"P1D\",\"recipients\":\"customer\"},{\"message\":\"Reminder that you have an appointment!\",\"offset\":\"P1D\",\"recipients\":\"staff\"}] |
| m365_selfserviceappointmentID | StringType | additional tracking ID for the appointment, if the appointment has been created directly by the customer on the scheduling page, as opposed to by a staff member on the behalf of the customer.|
| m365_serviceID | StringType | The ID of the bookingService associated with this appointment.|
| m365_servicelocation | StringType | The location where the service is delivered. {\"address\":{\"city\":\"\",\"countryOrRegion\":\"\",\"postalCode\":\"\",\"postOfficeBox\",\"state\":\"\",\"street\":\"\",\"type\" },\"coordinates\":{\"accuracy\",\"altitude\",\"altitudeAccuracy\",\"latitude\",\"longitude\" },\"displayName\":\"Our office address\",\"locationEmailAddress\",\"locationType\",\"locationUri\":\"\",\"uniqueID\",\"uniqueIDType\" } |
| m365_servicename | StringType | The name of the bookingService associated with this appointment. This property is optional when creating a new appointment. If not specified, it's computed from the service associated with the appointment by the serviceID property. |
| m365_servicenotes |StringType | Notes from a bookingStaffMember. The value of this property is available only when reading this bookingAppointment by its ID.|
| m365_smsnotificationsenabled | BooleanType | True indicates SMS notifications will be sent to the customers for the appointment. Default value is false.|
| m365_staffmemberIDs | StringType | The ID of each bookingStaffMember who is scheduled in this appointment. Stored as a comma separated string.[\”string\”] |
| m365_startdatetime | DateTimeType | The date, time, and time zone that the appointment begins.|

### Graph Drive

* Entity name: m365_graphdrive
* Graph resource: graph/api/resources/drive
* Sorting isn't supported.
* Filtering isn't supported.
* Server driven pagination is supported.

### Attributes Graph Drive

|Column |Dataverse Type |Details |
|---|---|---|
|m365_collaborationrootID |StringType | Collaboration root ID(s) of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note: This attribute won't be returned when retrieving multiple records. |
|m365_createdby |StringType |IDentity of the user, device, or application that created the item. Read-only. This attribute is a JSON encoded string for example { "user": { "displayName": "System Account" } } |
|m365_createddatetime |DateTimeType |Date and time of item creation. Read-only. |
|m365_description |StringType |ProvIDe a user-visible description of the drive. Read-only. |
|m365_drivetype |StringType |Describes the type of drive represented by this resource. OneDrive personal drives will return personal. OneDrive for Business will return business. SharePoint document libraries will return documentLibrary. Read-only. |
|m365_graphdriveID |GuID |Unique Identifier of the graph drive. |
|m365_ID |StringType |The unique Identifier of the drive. Read-only. |
|m365_lastmodifiedby | StringType |IDentity of the user, device, and application, which last modified the item. Read-only. This attribute is a JSON encoded string for example { "user": { "email": “user@contoso.com”,  "ID": "61de164e-21ff-4b1c-8cbd-77ac440894f8", "displayName": "User Name" } } |
|m365_lastmodifieddatetime |DateTimeType |Date and time the item was last modified. Read-only.|
|m365_name |StringType |The name of the item. Read-only. |
|m365_owner |StringType |Optional. The user account that owns the drive. Read-only. This attribute is a JSON encoded string. for example { "group": { "ID": "76c7286f-8645-4ba8-bc0f-c65a16424aaa", "displayName": "Group Name" } } |
|m365_quota |StringType |Optional. Information about the drive's storage space quota. Read-only.
This attribute is a JSON encoded string. for example { "deleted": 482586,  "remaining": 27487788645969, "state": "normal", "total": 27487790694400, "used": 1565845 } |
|m365_sharepointIDs |StringType |Returns Identifiers useful for SharePoint REST compatibility. Read-only. This property isn't returned by default and must be selected using the $select query parameter. This attribute is a JSON encoded string. for example "sharePointIDs": { "listID": "29d8457a-8e26-4291-9901-09718a388aaa", "siteID": "93618739-b3ca-4107-a77c-fba278c48aaa", "siteUrl": “<https://contoso.sharepoint.com>”,  "tenantID": "53986071-de92-43ad-a41f-f3c4adb2beef",  "webID": "a0d0e9ec-e547-4338-92d9-4c2c62e5beef" } |
| m365_siteID |StringType |The Identifier for the site that contains the document library.
|m365_system |StringType |If present, indicates that this is a system-managed drive. Read-only.
|m365_weburl |StringType |URL that displays the resource in the browser. Read-only.

### Graph Drive Item

* Entity name: m365_graphdriveitem
* Graph resource: graph/api/resources/driveitem
* Sorting is supported on the following columns:
* m365_name
* Filtering is supported on the following columns:
* m365_name
* Server driven pagination is supported.

### Attributes Graph Drive Item

|Column |Dataverse Type |Details |
|---|---|---|
|m365_audio |StringType |Audio metadata, if the item is an audio file. Read-only. Only on OneDrive Personal. This attribute is a JSON encoded string. { "album": "string",  "albumArtist": "string", artist": "string", bitrate": 128,   "composers": "string", copyright": "string", "disc": 0, "discCount": 0, "duration": 567, "genre": "string", "hasDrm": false, "isVariableBitrate": false, "title": "string", "track": 1, "trackCount": 16, "year": 2014 } |
|M365_bundle |StringType |Bundle metadata, if the item is a bundle. Read-only. This attribute is a JSON encoded string. for example{ "childCount": 3, "album": { "@odata.type": "microsoft.graph.album" }, } |
|m365_collaborationrootID |StringType |Collaboration root ID(s) of the collaboration session the record is associated with. If the record is associated with multiple collaboration sessions this will be returned as a comma delimited string. Note: This attribute won't be returned when retrieving multiple records. |
|m365_copy |StringType |If present in the request then a copy operation is performed. |
|m365_createdby |StringType |IDentity of the user, device, and application, which created the item. Read-only. This attribute is a JSON encoded string. for example {"user":{"displayName":"User Name","email":"alias@contoso.com","ID":"a298b975-3493-4d9e-b2d4-3cad78f00000"},"group": null,"application","device" } |
|m365_createddatetime |DateTimeType |Date and time of item creation. Read-only. |
|m365_ctag |StringType |An eTag for the content of the item. This eTag isn't changed if only the metadata is changed. Note. This property isn't returned if the item is a folder. Read-only. |
|m365_deleted |StringType |Information about the deleted state of the item. Read-only. This attribute is a JSON encoded string. for example { "state": "string" } |
|m365_description |StringType |ProvIDes a user-visible description of the item. Read-write. Only on OneDrive Personal. |
|m365_driveID |StringType |The Identifier for the drive that contains the drive item.|
|m365_etag |StringType |eTag for the entire item (metadata + content). Read-only. |
| m365_file |StringType |File metadata, if the item is a file. Read-only. This attribute is a JSON encoded string. for example {"hashes":{"crc32Hash","quickXorHash":"Biuzvwdu+Tmu6yRefayD27hD9vD=","sha1Hash","sha256Hash" },"mimeType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","processingMetadata" } |
| m365_filesysteminfo |StringType |File system information on client. This attribute is a JSON encoded string. for example {"createdDateTime":"2022-07-21T15:02:47+00:00","lastAccessedDateTime","lastModifiedDateTime":"2022-07-21T15:02:55+00:00"} |
|m365_folder |StringType | Folder metadata, if the item is a folder. Read-only. This attribute is a JSON encoded string. for example {"childCount":0,"view" } |
|m365_graphdriveitemID |GuID |Unique Identifier of the graph drive item. |
|m365_ID |StringType |The unique Identifier of the item within the Drive. Read-only. |
|m365_image |StringType |Image metadata, if the item is an image. Read-only. This attribute is a JSON encoded string. for example {"height","wIDth" } |
|m365_lastmodifiedby |StringType |IDentity of the user, device, and application, which last modified the item. Read-only. This attribute is a JSON encoded string. for example {"user":{"displayName":"User Name","email":"alias@contoso.com","ID":"a298b975-3493-4d9e-b2d4-3cad78f9a00e"},"group","application","device" } |
|m365_lastmodifieddatetime |DateTimeType |Date and time the item was last modified. Read-only. |
|m365_location |StringType |Location metadata, if the item has location data. Read-only. This attribute is a JSON encoded string. for example "location": { "altitude": 1.0, "latitude": 1.0, "longitude": 1.0 } |
|m365_malware |StringType |Malware metadata, if the item was detected to contain malware. Read-only. This attribute is a JSON encoded string. for example { "description": "string" } |
|m365_name |StringType |The name of the item (filename and extension). Read-write. |
|m365_package |StringType |If present, indicates that this item is a package instead of a folder or file. Packages are treated like files in some contexts and folders in others. Read-only. This attribute is a JSON encoded string. for example { "type": "oneNote" } |
|m365_parentreference |StringType |Parent information, if the item has a parent. This attribute is a JSON encoded string. for example
{"driveID":"b!qgK-8nOzX0qISvfGCiC2Smbv0m0RlNhDvNQDZsCMpbSnchFAhWAaQoiTLZcSo1gq","driveType":"documentLibrary","ID":"01EYDCV4YHV77FE3EDDFHIVD6WJ2ETT3PP","name","path":"/drives/b!qgK-8nOzX0qISvfGCiC2Smbv0m0RlNhDvNQDZsCMpbSnchFAhWAaQoiTLZcSo1no/root: /folder name","shareID","sharepointIDs":{"listID":"401172a8-6085-421a-8893-2d9712a35c3c","listItemID","listItemUniqueID":"52feaf12-836c-4e19-8a8f-d64e8939ee52","siteID":"f34e02aa-b373-4a5f-884a-f7c60a20b64a","siteUrl":"https://contoso.sharepoint.com/sites/Contoso","tenantID","webID":"6dd2ef66-9411-43d8-bcd4-0366c08ccabd"},"siteID" } |
|m365_parentreferenceID |StringType |The Identifier for the drive item that is the parent of the drive item. |
|m365_pendingoperations |StringType |If present, indicates that one or more operations that might affect the state of the driveItem are pending completion. Read-only. This attribute is a JSON encoded string. for example { "pendingContentUpdate": {"@odata.type": "microsoft.graph.pendingContentUpdate"} } |
|m365_photo |StringType |Photo metadata, if the item is a photo. Read-only. This attribute is a JSON encoded string. for example { "cameraMake": "Camera Make", "cameraModel": "Camera Model", "exposureDenominator": 1000000, "exposureNumerator": 41671, "focalLength": 4.38, "fNumber": 1.73, "iso": 70, "orientation": 6, "takenDateTime": "2020-04-29T14:17:39Z" } |
|m365_publication |StringType |ProvIDes information about the published or checked-out state of an item, in locations that support such actions. This property isn't returned by default. Read-only. This attribute is a JSON encoded string. for example {"level":"published","versionID":"2.0"} |
|m365_remoteitem |StringType |Remote item data, if the item is shared from a drive other than the one being accessed. Read-only. This attribute is a JSON encoded string. for example { "ID": "string", "createdBy": { "@odata.type": "microsoft.graph.IDentitySet" }, "createdDateTime": "timestamp", "file": { "@odata.type": "microsoft.graph.file" }, "fileSystemInfo": { "@odata.type": "microsoft.graph.fileSystemInfo" }, "folder": { "@odata.type": "microsoft.graph.folder" }, "image": { "@odata.type": "microsoft.graph.image" }, "lastModifiedBy": { "@odata.type": "microsoft.graph.IDentitySet" }, "lastModifiedDateTime": "timestamp", "name": "string", "package": { "@odata.type": "microsoft.graph.package" }, "parentReference": { "@odata.type": "microsoft.graph.itemReference" }, "shared": { "@odata.type": "microsoft.graph.shared" }, "sharepointIDs": { "@odata.type": "microsoft.graph.sharepointIDs" }, "specialFolder": { "@odata.type": "microsoft.graph.specialFolder" }, "size": 1024, "vIDeo": { "@odata.type": "microsoft.graph.vIDeo" }, "webDavUrl": "url", "webUrl": "url" } |
|m365_root |StringType |If this property is non-null, it indicates that the driveItem is the top-most driveItem in the drive. |
|m365_searchresult |StringType |Search metadata, if the item is from a search result. Read-only. This attribute is a JSON encoded string. for example { "onClickTelemetryUrl": "url" } |
|m365_shared |StringType |Indicates that the item has been shared with others and provIDes information about the shared state of the item. Read-only. This attribute is a JSON encoded string. for example { "scope": "users", "owner": { "user": { "displayName": "User Name", "ID": "bbbb6fa48aaaaaaa" } } } |
|m365_sharepointIDs |StringType |Returns Identifiers useful for SharePoint REST compatibility. Read-only. This attribute is a JSON encoded string. e.g{"listID":"401172a7-6085-421a-8893-2d9712a35aba","listItemID":"338","listItemUniqueID":"0edc89e5-24ea-4c6b-a019-dc51f45eeccc","siteID":"f2be02aa-b373-4a5f-884a-f7c60a20bddd","siteUrl":"https://contoso.sharepoint.com/sites/Contoso","tenantID":"1c137272-0581-487f-b195-aeeb93cc4ccc","webID":"6dd2ef66-9411-43d8-bcd4-0366c08caaaa"} |
|m365_siteID |StringType |The Identifier for the site that contains the document library. |
|m365_size |IntType |Size of the item in bytes. Read-only. |
|m365_specialfolder |StringType |If the current item is also available as a special folder, this facet is returned. Read-only. This attribute is a JSON encoded string. for example { "name": "documents" } |
|m365_thumbnail |StringType |If present in the request then the drive item thumbnails will be retrieved. |
|m365_vIDeo |StringType |If the current item is also available as a special folder, this facet is returned. Read-only. This attribute is a JSON encoded string. for example {"bitrate": 10646968, "duration": 1050683, "height": 720,  "wIDth": 1280,  "audioBitsPerSample": 16, "audioChannels": 1, "audioFormat": "PCM", "audioSamplesPerSecond": 32000, "fourCC": "H264", "frameRate": 60} |
|m365_webdavurl |StringType | WebDAV compatible URL for the item. |
|m365_weburl |StringType |URL that displays the resource in the browser. Read-only. |
