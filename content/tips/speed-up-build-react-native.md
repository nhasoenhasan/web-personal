---
title: "Speeding Up React Native Builds (New Architecture)"
category: "Tips & Tricks"
date: "2026-08-10"
tags: ["React Native", "Tooling", "Performance"]
description: "A combination of settings that cut build times by up to 40% in large projects."
---

# Speeding Up React Native Builds

Long build times are the enemy of productivity. Here is the combination I use in projects with many native modules.

## 1. Use the Right Metro Cache

```bash
# Only reset the cache when you really need to
npx react-native start --reset-cache
```

Don't reset the cache on every build — Metro has an incremental cache that actually makes subsequent builds faster.

## 2. Optimize Gradle Parallel/Incremental Builds

In `android/gradle.properties`:

```properties
org.gradle.parallel=true
org.gradle.caching=true
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=2048m
```

## 3. Remove Unused Modules

Every native library adds to the Gradle compilation time. Audit `package.json`:

```bash
npx react-native config
```

If there are libraries that are no longer used, remove them and re-run `pod install`.

## 4. Prebuild & Cache in CI

In CI, cache the Gradle and Pods directories:

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.gradle/caches
      ios/Pods
    key: deps-${{ hashFiles('package-lock.json') }}
```

## Results

With this combination, the build time in my project dropped from about 12 minutes to about 7 minutes in CI.
