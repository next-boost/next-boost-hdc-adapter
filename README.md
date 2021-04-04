# next-boost-hdc-adapter

[next-boost](https://github.com/rjyo/next-boost) used to use [hybird-disk-cache](https://github.com/rjyo/hybrid-disk-cache) as its sole cache adapter.

Since 0.10.x, next-boost splits the cache adapter with the http handler logic. And this package provides its default adapter, the hybrid-disk-cache.