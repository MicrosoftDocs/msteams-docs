# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [*3.1.1*] - <*2021-09-30*>

### Changes

* Dependency bump

### Fixes

* Fixed an issue where non source files was included in tests
* Fixed an issue to use userAgent to detect Teams desktop client (#20)

## [*3.1.0*] - <*2021-03-01*>

### Added

* Added `setThemeHandler` option (#13)
* Added unit testing

### Fixes

* Fixed an issue with the `@fluentui/react-northstar` peer dependency version range with npm 7+

## [*3.0.2*] - <*2021-01-29*>

### Fixes

* Fixed issue where the Teams JS Library was not initialized while hosted outside of Teams (for instance in a popup)

## [*3.0.1*] - <*2020-12-18*>

### Changes

* `inTeams` is `undefined` by default, instead of `false`
* Optimized the hook to reduce the number of renders of the component using the hook

## [*3.0.0*] - <*2020-12-06*>

### Added

* Added `useTeams` React hook
* Exported helper method `getQueryVariable`
* Exported helper method `checkInTeams`

### Changes

* Method detecting if the hook is used inside Microsoft Teams now relies on naming of the hosting iframe
* Moved to Github actions from Travis CI

### Removed

* Base class removed

## [*2.2.0*] - <*2020-10-27*>

### Added

* Added `esm` module version of the package (#5)

### Changed

* Updated `@microsoft/teams-js` to version `^1.8.0`
* Updated `@fluentui/react-northstar` to version `^0.51.0`.

## [*2.1.0*] - <*2020-05-17*>

### Changed

* Breaking change, `inTeams(timeout:number=1000)` now returns a `Promise<Boolean>`
* Switched to `eslint` and removed `tslint`
* Switched to *renamed package* `@fluentui/react-northstar`

### Deleted

* Removed unnecessary constructor
* Removed `fontSize` from state
* Removed `pageFontSize` protected method
* Removed the property interface
* Removed the `setValidityState` method

## [*2.0.0*] - <*2020-03-05*>

### Changed

* Replaced `msteams-ui-components-react` with `@fluentui/react`
* Updated dependecies (`@microsoft/teams-js`)
* Refactored packages into `peerDependencies`

## [*1.1.1*] - <*2019-04-17*>

### Fixes

* Fixed an issue with React typings version

## [*1.1.0*] - <*2019-03-24*>

### Changed

* Updated Typescript, React, teams-js and msteams-ui-components-react libraries

## [*1.0.0*] - <*2018-08-13*>

### Changed

* Updated version of @microsoft/teams-js

## [*0.0.4*] - <*2018-07-30*>

### Changed

* Updated code to reflect linting changes

### Fixed

* Fixed missing import to the @microsoft/teams-js library

### Added

* Travis-ci integration
* Linting added (npm run lint)

## [*0.0.3*] - <*2018-07-28*>

### Changed

* Changed signature for getQueryVariable and updateTheme

## [*0.0.2*] - <*2018-07-28*>

### Added

* More inline documentation

### Changed

* Included comments in output
* Updated node packages
* Updated method signatures
* Updated tsconfig.json with stricter checking

## [*0.0.1*] - <*2018-07-28*>

### Added

* Initial release
