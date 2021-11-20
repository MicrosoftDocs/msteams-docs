# Customize Teams App Manifest in Teams Toolkit

There are two manifest template files under `templates/appPackage` folder.

- `manifest.local.template.json` - local debug teams app only
- `manifest.remote.template.json` - shared by all environments

During provision, Teams Toolkit combines `manifest.remote.template.json` with configurations from `{{state.{env}.json}}` and `{{config.{env}.json}}`, then creates a Teams App in [Dev Portal](https://dev.teams.microsoft.com/apps) with this combined manifest.

## Supported customizable placeholder in manifest.remote.template.json

- In `state.{env}.json`, `{{state.xx}}` is pre-defined placeholder whose value is resolved by Teams Toolkit. Do not modify the values in state.{env}.json.
- In `config.{env}.json`, `{{config.manifest.xx}}` is customizable placeholder. You can add a customized parameter by following:
  - Add a placeholder in manifest.remote.template.json with pattern: `{{config.manifest.xx}}`
  - Add a config value in config.{env}.json

        ```
        {
            "manifest": {
                "KEY": "VALUE"
            }
        }
        ```
