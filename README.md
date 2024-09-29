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
3. `docker build . -t vedph2020/cadmus-lon-app:0.0.9 -t vedph2020/cadmus-lon-app:latest` (replace with the current version).

## History

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
