# Cadmus LON App

- [models](https://github.com/vedph/cadmus-lon)
- [API](https://github.com/vedph/cadmus-lon-api)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

- [models](https://github.com/vedph/cadmus-lon)
- [API](https://github.com/vedph/cadmus-lon-api)

## Docker

🐋 Quick Docker image build:

1. `npm run build-lib`;
2. update version in `env.js` (and `docker-compose.yml`) and `ng build --configuration production`;
3. `docker build . -t vedph2020/cadmus-lon-app:1.0.0 -t vedph2020/cadmus-lon-app:latest` (replace with the current version).

## History

- 2025-01-05: ⚠️ updated Angular and core dependencies.
- 2024-11-29: removed M2 styles from `angular.json` and refactored `styles.scss` to use different themes allowing color variants. Since Angular 18 the `color` directive (which automatically changed the target component's theme) has been removed, and you could use compatibility mixins; but these have side effects. In the approach used here, we just create different themes for color variants. In M2 Cadmus we use class `mat-primary` for emphasized components and `mat-warn` for warn/error components. In M3 I have a default theme, an error theme corresponding to `mat-warn`, and an accent theme corresponding to `mat-primary` (and `mat-accent`). See also [my SO post about M3 theming](https://stackoverflow.com/questions/79230742/proper-angular-material-v3-theming).

### 1.0.0

- 2024-11-23: ⚠️ upgraded to Angular 19.

### 0.0.10

- 2024-10-21:
  - updated Angular and packages.
  - allow multiple quoted works with same IDs.

### 0.0.9

- 2024-09-29: updated packages (flags editor fix).

### 0.0.8

- 2024-09-28: updated Angular and packages (new features in item editor).

### 0.0.7

- 2024-08-30: updated Angular and packages.

### 0.0.6

- 2024-07-29: updated Angular and packages.

### 0.0.5

- 2024-07-19: added lookup definition.

### 0.0.4

- 2024-07-17: updated Angular and packages.
- 2024-07-16: [refactored Gravatar](https://myrmex.github.io/overview/cadmus/dev/history/f-gravatar/).
- 2024-07-15: updated Angular and packages.
- 2024-07-02: shelfmark not required.
- 2024-06-30:
  - updated Angular and packages.
  - added WHG lookup.

### 0.0.3

- 2024-06-25:
  - upgraded Angular.
  - updated packages.
  - added biblio provider to lookups.
  - added external bibliography parts.
- 2024-06-17: updated packages.
