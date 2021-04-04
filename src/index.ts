import Cache, { CacheOptions } from 'hybrid-disk-cache'

let interval: NodeJS.Timeout

/**
 * Init the hybrid-disk-cache adapter
 *
 * @param conf the cache's config, with defaults:
 *  - ttl=3600
 *  - tbd=3600
 *  - path=$TMPDIR/hdc
 * @returns the hdc cache instance
 */
function init(conf?: CacheOptions) {
  const cache = new Cache(conf)
  console.log(`  Cache located at ${cache.path}`)
  // purge timer
  initPurgeTimer(cache)
  return cache
}

/**
 * Stop the purge timer
 */
function shutdown() {
  clearInterval(interval)
}

export default {
  init,
  shutdown,
}

function initPurgeTimer(cache: Cache): void {
  if (interval) return
  const tbd = Math.min(cache.tbd, 3600)
  console.log('  Cache manager inited, will start to purge in %ds', tbd)
  interval = setInterval(() => {
    const start = process.hrtime()
    const rv = cache.purge()
    log(start, 'purge', `purged all ${rv} inactive record(s)`)
  }, tbd * 1000)
}

function log(start: [number, number], status: string, msg?: string): void {
  const [secs, ns] = process.hrtime(start)
  const ms = ns / 1000000
  const timeS = `${secs > 0 ? secs + 's' : ''}`
  const timeMs = `${secs === 0 ? ms.toFixed(1) : ms.toFixed(0)}ms`
  const time = timeS + (secs > 1 ? '' : timeMs)
  console.log('%s | %s: %s', time.padStart(7), status.padEnd(6), msg)
}
