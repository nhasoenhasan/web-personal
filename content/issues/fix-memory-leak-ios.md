---
title: "Fixing Memory Leaks in React Native on iOS"
category: "Issues"
date: "2026-08-13"
tags: ["React Native", "iOS", "Performance"]
description: "How I resolved a memory leak that caused the app to crash after extended use on iOS."
---

# Fixing Memory Leaks in React Native on iOS

## Symptoms

The app runs fine at first, but after 30-60 minutes of use, performance degrades sharply and it eventually crashes. In Xcode Instruments, the memory graph keeps climbing without coming back down (the sawtooth pattern disappears).

## Root Cause

The most common culprits in React Native:

1. **Event listeners never cleaned up** — `AppState.addEventListener`, `DeviceEventEmitter.addListener`, or native libraries that subscribe without unsubscribing in the `useEffect` cleanup.
2. **Timers / intervals not cleared** — `setInterval` inside a component without `clearInterval`.
3. **Unoptimized large lists** — `FlatList` without a stable `keyExtractor` or with heavy render items.

## Solution

### 1. Always clean up listeners

```javascript
useEffect(() => {
  const sub = AppState.addEventListener('change', handler)
  return () => sub.remove()
}, [])
```

### 2. Clear intervals

```javascript
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])
```

### 3. Optimize FlatList

```jsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  windowSize={5}
  initialNumToRender={8}
/>
```

## Prevention Checklist

- [x] Every listener has a cleanup
- [x] No interval without clear
- [x] FlatList uses a stable keyExtractor
- [x] Profiling with Instruments before release
