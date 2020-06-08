---
title: Testing activity feed notifications in Teams
description: JSON  test file resource-specific consent in Teams using Postman
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: How-to
keywords: teams authorization OAuth SSO AAD rsc Postman Graph json
---

# Test RSC Postman collection JSON

>[!NOTE]
> Depending on the user you want to send notification **from** and the **target user/recipient** you may have to update those parameter in the payload.

```json
{
	"info": {
		"_postman_id": "cc85275b-fa1b-48c2-ac00-8bafe945146c",
		"name": "Activity Feed Demonstrations",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "User Context",
			"item": [
				{
					"name": "Authenticate",
					"event": [
						{
							"listen": "test",
							"script": {
								"id": "2e6527fc-b97d-4ac2-a412-3aad93d338ee",
								"exec": [
									"pm.test(\"Status Code 200\", () => {",
									"    // Need to validate the request succeeded. ",
									"    pm.response.to.have.status(200);",
									"});",
									"",
									"// Set the user_context access token",
									"const { access_token } = pm.response.json();",
									"pm.environment.set(\"graph_access_token\", access_token);"
								],
								"type": "text/javascript"
							}
						},
						{
							"listen": "prerequest",
							"script": {
								"id": "16050487-fbb3-4a3b-b471-cb6ebc746579",
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/x-www-form-urlencoded"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "grant_type",
									"value": "password",
									"type": "text"
								},
								{
									"key": "username",
									"value": "AlexW@M365x347208.OnMicrosoft.com",
									"type": "text"
								},
								{
									"key": "password",
									"value": "07Apples!",
									"type": "text"
								},
								{
									"key": "client_id",
									"value": "f97677f9-8607-476e-9759-8c45b2832b59",
									"type": "text"
								},
								{
									"key": "client_secret",
									"value": "3RQa7TYXTU9ezMEu/O4x8pSNtkpM8tpW8m3foVjPVSc=",
									"type": "text"
								},
								{
									"key": "scope",
									"value": "https://canary.graph.microsoft.com/.default",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://login.microsoftonline.com/60bcdb18-3e8b-4c8d-8e03-c9bd0a442378/oauth2/v2.0/token",
							"protocol": "https",
							"host": [
								"login",
								"microsoftonline",
								"com"
							],
							"path": [
								"60bcdb18-3e8b-4c8d-8e03-c9bd0a442378",
								"oauth2",
								"v2.0",
								"token"
							]
						},
						"description": "Authenticate with AAD"
					},
					"response": []
				},
				{
					"name": "Send Custom Notification to User",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"value": "application/json",
								"type": "text"
							},
							{
								"key": "Authorization",
								"value": "Bearer {{graph_access_token}}",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"taskCreated\",\r\n    \"previewText\": \"New Task Created\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.aadUserNotificationAudience\",\r\n        \"userId\": \"2725adbe-59ac-4b1a-8096-b47bd244eb09\"\r\n    },\r\n    \"templateParameters\": [\r\n    \t{\r\n\t\t\t\"name\": \"taskId\",\r\n\t\t\t\"value\": \"Task 12321\"\r\n\t\t}\r\n    ],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\"\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Custom Notification to Team",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"taskCreated\",\r\n    \"previewText\": \"New Team Task Created\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.teamMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\"\r\n    },\r\n    \"templateParameters\": [\r\n    \t{\r\n\t\t\t\"name\": \"taskId\",\r\n\t\t\t\"value\": \"Task 12322\"\r\n\t\t}\r\n    ],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\"\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Custom Notification to Channel",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"taskCreated\",\r\n    \"previewText\": \"New Team Task Created\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.channelMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n        \"channelId\": \"19:61ecf6b8014c455d98ad7d2d29140c8a@thread.skype\"\r\n    },\r\n    \"templateParameters\": [\r\n    \t{\r\n\t\t\t\"name\": \"taskId\",\r\n\t\t\t\"value\": \"Task 12323\"\r\n\t\t}\r\n    ],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\"\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Mention to User",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"userMention\",\r\n    \"previewText\": \"User Mention\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.aadUserNotificationAudience\",\r\n        \"userId\": \"2725adbe-59ac-4b1a-8096-b47bd244eb09\"\r\n    },\r\n    \"templateParameters\": [],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\",\r\n    \"aggregationId\": 2\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Mention to Team",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"teamMention\",\r\n    \"previewText\": \"Team Mention\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.teamMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\"\r\n    },\r\n    \"templateParameters\": [],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\",\r\n    \"aggregationId\": 3\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Mention to Channel",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11/channels/19:61ecf6b8014c455d98ad7d2d29140c8a@thread.skype\",\r\n    \"activityType\": \"channelMention\",\r\n    \"previewText\": \"Channel Mention\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3A61ecf6b8014c455d98ad7d2d29140c8a%40thread.skype/Internal%2520Channel?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11&tenantId=60bcdb18-3e8b-4c8d-8e03-c9bd0a442378\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.channelMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n        \"channelId\": \"19:61ecf6b8014c455d98ad7d2d29140c8a@thread.skype\"\r\n    },\r\n    \"templateParameters\": [],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\",\r\n    \"aggregationId\": 4\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "App Context Copy",
			"item": [
				{
					"name": "Authenticate",
					"event": [
						{
							"listen": "test",
							"script": {
								"id": "2e6527fc-b97d-4ac2-a412-3aad93d338ee",
								"exec": [
									"pm.test(\"Status Code 200\", () => {",
									"    // Need to validate the request succeeded. ",
									"    pm.response.to.have.status(200);",
									"});",
									"",
									"// Set the user_context access token",
									"const { access_token } = pm.response.json();",
									"pm.environment.set(\"graph_access_token\", access_token);"
								],
								"type": "text/javascript"
							}
						},
						{
							"listen": "prerequest",
							"script": {
								"id": "16050487-fbb3-4a3b-b471-cb6ebc746579",
								"exec": [
									""
								],
								"type": "text/javascript"
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/x-www-form-urlencoded"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "grant_type",
									"value": "client_credentials",
									"type": "text"
								},
								{
									"key": "client_id",
									"value": "f97677f9-8607-476e-9759-8c45b2832b59",
									"type": "text"
								},
								{
									"key": "client_secret",
									"value": "3RQa7TYXTU9ezMEu/O4x8pSNtkpM8tpW8m3foVjPVSc=",
									"type": "text"
								},
								{
									"key": "scope",
									"value": "https://canary.graph.microsoft.com/.default",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://login.microsoftonline.com/60bcdb18-3e8b-4c8d-8e03-c9bd0a442378/oauth2/v2.0/token",
							"protocol": "https",
							"host": [
								"login",
								"microsoftonline",
								"com"
							],
							"path": [
								"60bcdb18-3e8b-4c8d-8e03-c9bd0a442378",
								"oauth2",
								"v2.0",
								"token"
							]
						},
						"description": "Authenticate with AAD"
					},
					"response": []
				},
				{
					"name": "Send Custom Notification to User",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"value": "application/json",
								"type": "text"
							},
							{
								"key": "Authorization",
								"value": "Bearer {{graph_access_token}}",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"taskCreated\",\r\n    \"previewText\": \"New Task Created\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.aadUserNotificationAudience\",\r\n        \"userId\": \"2725adbe-59ac-4b1a-8096-b47bd244eb09\"\r\n    },\r\n    \"templateParameters\": [\r\n    \t{\r\n\t\t\t\"name\": \"taskId\",\r\n\t\t\t\"value\": \"Task 12321\"\r\n\t\t}\r\n    ],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\"\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Custom Notification to Team",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"taskCreated\",\r\n    \"previewText\": \"New Team Task Created\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.teamMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\"\r\n    },\r\n    \"templateParameters\": [\r\n    \t{\r\n\t\t\t\"name\": \"taskId\",\r\n\t\t\t\"value\": \"Task 12322\"\r\n\t\t}\r\n    ],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\"\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Custom Notification to Channel",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"taskCreated\",\r\n    \"previewText\": \"New Team Task Created\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.channelMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n        \"channelId\": \"19:61ecf6b8014c455d98ad7d2d29140c8a@thread.skype\"\r\n    },\r\n    \"templateParameters\": [\r\n    \t{\r\n\t\t\t\"name\": \"taskId\",\r\n\t\t\t\"value\": \"Task 12323\"\r\n\t\t}\r\n    ],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\"\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Mention to User",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"userMention\",\r\n    \"previewText\": \"User Mention\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.aadUserNotificationAudience\",\r\n        \"userId\": \"2725adbe-59ac-4b1a-8096-b47bd244eb09\"\r\n    },\r\n    \"templateParameters\": [],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\",\r\n    \"aggregationId\": 2\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Mention to Team",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"activityType\": \"teamMention\",\r\n    \"previewText\": \"Team Mention\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3Abdbb89ee4acb46ee9f704057c12163a3%40thread.skype/General?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.teamMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\"\r\n    },\r\n    \"templateParameters\": [],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\",\r\n    \"aggregationId\": 3\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				},
				{
					"name": "Send Mention to Channel",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"type": "text",
								"value": "application/json"
							},
							{
								"key": "Authorization",
								"type": "text",
								"value": "Bearer {{graph_access_token}}"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"about\": \"https://graph.microsoft.com/beta/teams/e5a548cb-e5a4-4e54-8da1-ec0e944d9c11/channels/19:61ecf6b8014c455d98ad7d2d29140c8a@thread.skype\",\r\n    \"activityType\": \"channelMention\",\r\n    \"previewText\": \"Channel Mention\",\r\n    \"onClickWebUrl\": \"https://teams.microsoft.com/l/channel/19%3A61ecf6b8014c455d98ad7d2d29140c8a%40thread.skype/Internal%2520Channel?groupId=e5a548cb-e5a4-4e54-8da1-ec0e944d9c11&tenantId=60bcdb18-3e8b-4c8d-8e03-c9bd0a442378\",\r\n    \"recipient\": {\r\n        \"@odata.type\": \"microsoft.graph.channelMembersNotificationAudience\",\r\n        \"teamId\": \"e5a548cb-e5a4-4e54-8da1-ec0e944d9c11\",\r\n        \"channelId\": \"19:61ecf6b8014c455d98ad7d2d29140c8a@thread.skype\"\r\n    },\r\n    \"templateParameters\": [],\r\n    \"teamsAppId\": \"a1c8b1ca-3270-4007-9699-a8956baf73e8\",\r\n    \"aggregationId\": 4\r\n}\r\n"
						},
						"url": {
							"raw": "https://canary.graph.microsoft.com/testprodbetatestTeamsGraphSvcDev/teamwork/generateActivityNotification",
							"protocol": "https",
							"host": [
								"canary",
								"graph",
								"microsoft",
								"com"
							],
							"path": [
								"testprodbetatestTeamsGraphSvcDev",
								"teamwork",
								"generateActivityNotification"
							]
						}
					},
					"response": []
				}
			],
			"event": [
				{
					"listen": "prerequest",
					"script": {
						"id": "9363fcd3-abd5-47ef-b879-663cc8608a1d",
						"type": "text/javascript",
						"exec": [
							""
						]
					}
				},
				{
					"listen": "test",
					"script": {
						"id": "466dcf2d-9f83-4f37-bd5c-5bf3c24e4d86",
						"type": "text/javascript",
						"exec": [
							""
						]
					}
				}
			]
		}
	]
}
```
