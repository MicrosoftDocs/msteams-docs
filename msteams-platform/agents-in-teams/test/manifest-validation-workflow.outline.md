FILE: teams-platform/test/manifest-validation-workflow.md  
SOURCES:  
- toolkit/TeamsFx-preview-and-customize-app-manifest.md  
- toolkit/debug-overview.md (validation snippets)  
- resources/schema/manifest-schema-dev-preview.md  

OUTLINE:
---
title: Manifest validation workflow  
description: Automatically check your agent’s manifest for schema compliance, policy rules, and cross-host requirements before publishing to Microsoft Teams or Copilot.  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---
# Validate your agent manifest  
A correct `manifest.json` guarantees your agent installs, runs, and appears in Copilot as expected. This article shows CLI and CI methods to catch errors early.

## Prerequisites  
- Agents Toolkit CLI ≥ v1.1 (`atk --version`)  
- Manifest upgraded to schema version `1.22` (required for agents)  
- Node 18 / .NET 8 / Python 3.10 environment

## 1 – Run local validation  
### Using Agents Toolkit CLI  
```bash
atk validate --env local
```  
Checks performed:  
1. JSON schema validation against `$schema` URL  
2. **Policy** rules (icon sizes, name length, prohibited words)  
3. Cross-host requirement-set consistency  
4. Dev-tunnel URL safety (`https://*.tunnels.ms`)

### Using VS Code CodeLens  
Open `appPackage/manifest.json` → click **Validate** at top of file.  
Errors and warnings show inline.

## 2 – Preview manifest in Developer Portal  
1. `atk preview --manifest` launches Developer Portal with a temporary draft.  
2. Use visual editor to correct missing fields or add icons.  
3. Click **Export** to write changes back to repo.

## 3 – CI/CD validation step  
Add to GitHub Actions workflow:  
```yaml
- name: Validate Teams manifest
  run: atk validate --env prod --output json > manifest-report.json
```
Fail the build on any **error** severity result:  
```yaml
- name: Fail on validation errors
  run: |
    if jq '.errors | length > 0' manifest-report.json; then
      exit 1
    fi
```

## 4 – Common validation errors  
| Error ID | Explanation | Fix |  
|----------|-------------|-----|  
| `SCHEMA001` | Unknown property `copilotAgentz` | Rename to `copilotAgents`. |  
| `IMG004` | Color icon must be 192×192 PNG | Export correct size from design tool. |  
| `CAP201` | `composeExtensions` requires matching bot ID | Ensure `botId` matches `bots[*].botId`. |  
| `RSC401` | Missing resource-specific consent scopes | Add under `authorization.permissions.resourceSpecific`. |

## 5 – Testing pre-publishing policies  
Run marketplace checks:  
```bash
atk validate --rules store
```  
Includes legal text scan, mandatory privacy-policy URL, and localization file presence.

## Next step  
After a clean validation report, you’re ready to “[Publish your agent to the Teams Store](../publish/publish-your-agent-to-teams-store.md)”.

## See also  
- [App manifest for agents](../build/app-manifest-for-agents.md)  
- [Agents Toolkit CLI reference](toolkit link)