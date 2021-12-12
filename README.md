# next-boost-hdc-adapter

This lib has been retired. Use hybrid-disk-cache to with next-boost directly if you are using ^0.14.1 of next-boost.

[next-boost](https://github.com/rjyo/next-boost) used to use [hybird-disk-cache](https://github.com/rjyo/hybrid-disk-cache) as its sole cache adapter.

Since 0.10.x, next-boost splits the cache adapter with the http handler logic. And this package provides its default adapter, the hybrid-disk-cache.
