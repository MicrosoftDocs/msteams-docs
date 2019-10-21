## Identify the user

Every request to your services includes the obfuscated ID of the user that performed the request, as well as the user's display name and Azure Active Directory object ID.

```json
"from": {
  "id": "29:1C7dbRrC_5yzN1RGtZIrcWT0xz88KPGP9sxdpVpV8sODlgPHeQE9RqQ02hnpuKzy6zZ-AaZx6swUOMj_Dsdse3TQ4sIaeebbFBF-VgjJy_nY",
  "name": "John Smythe",
  "aadObjectId": "cd723fa0-0591-416a-9290-e93ecf3a9b92"
},
```

The `id` and `aadObjectId` values are guaranteed to be that of the authenticated Teams user. They can be used as keys to look up credentials or any cached state in your service. In addition, each request contains the Azure Active Directory tenant ID of the user, which can be used to identify the user’s organization. If applicable, the request also contains the team and channel IDs from which the request originated.
