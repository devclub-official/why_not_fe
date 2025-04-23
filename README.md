# Why not FE

이거왜안돼 팀 프론트앤드 코드

## 초기 설정방법

### Turborepo install

> package manager: yarn 선택 (pnpm의 경우 expo를 정식 지원하지 않음)

```sh
npx create-turbo@latest
# package? yarn
```

### React Native install

[expo 공식문서](https://docs.expo.dev/guides/monorepos/) 참조

yarn berry 버전 필요 `yarn --version` 입력 후 `1.xx.xx` 버전일 경우 `yarn set version berry` 실행,

yarn 미설치 시 `npm i -g yarn && yarn set version berry`

```sh
yarn create expo apps/mobile
```

## 폴더 구조

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `mobile`: [React Native](https://reactnative.dev/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### 개발모드 실행

### 초기 설정

main 에서 사용할 공통 명령어를 설정해주어야함, React native의 경우 android, iOS 환경 모두 테스트해봐야 하므로 RN에 맞춰서 설정

#### turbo.json 설정

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    ...
    ////////////////////////
    // 아래 코드 추가
    //////////////////////
    "ios": {
      "dependsOn": ["^ios"]
    },
    "android": {
      "dependsOn": ["^android"]
    }
    /////////////////////////////
  }
}
```

#### package.json 설정

```json
{
  "name": "why_not_fe",
  "private": true,
  "scripts": {
    ...
    ////////////////////
    // 아래 코드 추가
    ///////////////////
    "ios": "turbo run ios",
    "android": "turbo run android"
    ///////////////////
  },
  ...
}
```

#### apps/web/package.json 설정

웹뷰 환경이므로 테스트 시 웹 동시 실행을 위하여 설정 필요

```json
{
  "name": "web",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack --port 3000",
    ////////////////////////////////////////
    // 아래 코드 추가
    ////////////////////////////////////
    "ios": "next dev --turbopack --port 3000",
    "android": "next dev --turbopack --port 3000",
    ...
  },
  ...
}
```

### 개발모드 실행 방법

```sh
# 안드로이드 실행
yarn android

# iOS 실행
yarn ios

# web만 실행
yarn dev --filter=web
```
