# Why not FE

이거왜안돼 팀 프론트앤드 코드

## 목차

- [초기 설정방법](#초기-설정방법)
    - [Tureborepo install](#turborepo-install)
    - [React Native install](#react-native-install)
- [폴더 구조](#폴더-구조)
- [개발모드 실행](#개발모드-실행)
    - [초기 설정](#초기-설정)
    - [개발모드 실행 방법](#개발모드-실행-방법)
    - [오류 해결](#오류-해결)
- [React Native](#react-native)
    - [Webview 설정](#webview-설정)


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

## 개발모드 실행

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

### 오류 해결

yarn ios 로 실행 시 `Unable to run simctl: Error:xcrun simctl help exited with non-zero code: 72` 에러 발생

yarn expo start > i 를 통해 ios 시뮬레이터를 한번 이상 실행해야만 제대롤 동작하는 것을 확인

아래의 추가 환경 설정이 필요함

#### 방법 1: expo start 실행 후 기존 로직 진행

- `cd apps/mobile && yarn start`

- `i` 입력 후 ios 시뮬레이터 실행

#### 방법 2: `dev` command에 `expo start` 추가

- apps/mobile/package.json

    ```json
    {
    "name": "mobile",
    "main": "expo-router/entry",
    "version": "1.0.0",
    "scripts": {
        ...
        ////////////////////
        // 아패 코드 입력
        ////////////////////
        "dev": "expo start",
        ...
    },
    }
    ```

- `yarn dev`

- `mobile#dev`에서 `i`입력 후 iOS 시뮬레이터 실행

## React Native

### Webview 설정

#### Package 설치

[`react-native-webview`](https://github.com/react-native-webview/react-native-webview) 설치 필요

```sh
cd apps/mobile && yarn add react-native-webview
```

#### Environment 추가

```sh
cd apps/mobile && echo "WEBVIEW_URL=http://localhost:3000" > .env.local
```

혹은

`/apps/mobile` 폴더에서 `.env.local` 파일 생성 후 `WEBVIEW_URL=http://localhost:3000` 추가

#### 홈화면 적용

```tsx
import WebView from 'react-native-webview';

export default function HomeScreen() {
  return (
    <WebView
      source={{ uri: process.env.WEBVIEW_URL || 'http://localhost:3000' }}
    />
  );
}
```

#### 주의

이전에 시뮬레이션에 앱을 한번 실행했었다면 시뮬레이션 환경에서 앱 종료 후 `yarn android`, `yarn ios` or `yarn dev` 로 실행해주어야 반영됨
