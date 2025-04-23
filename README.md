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

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### 개발모드 실행

### 초기 설정

main 에서 사용할 공통 명령어를 설정해주어야함, React native의 경우 android, iOS 환경 모두 테스트해봐야 하므롤 RN에 맞춰서 설정

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
pnpm dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/docs/reference/configuration)
- [CLI Usage](https://turbo.build/docs/reference/command-line-reference)
