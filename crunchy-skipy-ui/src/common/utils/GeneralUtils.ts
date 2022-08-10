import { IPlayerConfig } from '../contracts/PlayerConfig.interface';

// TODO: Refactor all the functions out of "GeneralUtils" and into targeted files

export default class GeneralUtils {
  private static _videoLoadPromise?: Promise<number>

  /**
   * Returns a promise containing the video's duration
   */
  public static async waitForVideoLoad(playerConfig: IPlayerConfig): Promise<number> {
    if (!this._videoLoadPromise) {
      this._videoLoadPromise = new Promise((res) => {
        const timeout = window.setInterval(function () {
          const video = playerConfig.getVideo?.()
          if (video && video.readyState > 0) {
            res(video.duration)
            clearInterval(timeout)
          }
        }, 250)
      })
    }
    return this._videoLoadPromise
  }

  /**
   * Strip out hashes and query params from a url
   * @param url The input url
   *
   * TODO: Export this so it can be used by things outside the player, or export a transformUrl(() => ..., () => ..., ...) instead?
   */
  public static stripUrl(url: string): string {
    const urlDetails = new URL(url)
    return `${urlDetails.protocol}//${urlDetails.hostname}${urlDetails.pathname}`
  }

  public static formatSeconds(seconds: number, includeDecimals: boolean) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    const secStr = GeneralUtils.padLeft(Math.floor(secs), 2)
    if (includeDecimals) {
      let decimal = Math.round((secs - Math.floor(secs)) * 100)
      if (decimal === 100) decimal = 99
      return `${mins}:${secStr}.${GeneralUtils.padLeft(decimal, 2)}`
    } else {
      return `${mins}:${secStr}`
    }
  }

  public static padLeft(value: number | string, size: number, char = '0'): string {
    let num = value.toString()
    while (num.length < size) num = char + num
    return num
  }

  public static padRight(value: number | string, size: number, char = '0'): string {
    let num = value.toString()
    while (num.length < size) num += char
    return num
  }

  public static formatGraphql(data: string): string {
    const lines = data
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => !!line)

    function addTabs(string: string, tabs: number): string {
      let result = string
      for (let i = 0; i < tabs; i++) {
        result = '  ' + result
      }
      return result
    }

    let tabs = 0
    const tabbedLines = lines.map((line) => {
      if (line === '}') tabs--
      const newLine = addTabs(line, tabs)
      if (line.endsWith('{')) tabs++
      return newLine
    })

    return tabbedLines.join('\n')
  }

  public static randomId(): number {
    return Math.random() * Number.MAX_SAFE_INTEGER
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static arrayIncludes<K extends string>(
    array: { [key in K]: any }[],
    idKey: K,
    value: { [key in K]: any } & Record<string, any>,
  ): boolean {
    return array.some((item) => item[idKey] === value[idKey])
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  public static computeListDiffs<T>(
    newItems: ReadonlyArray<T>,
    oldItems: ReadonlyArray<T>,
    getId: (item: T) => any, // eslint-disable-line @typescript-eslint/no-explicit-any
    compareNeedsUpdated: (l: T, r: T) => boolean,
  ): {
    toCreate: ReadonlyArray<T>
    toUpdate: ReadonlyArray<T>
    toDelete: ReadonlyArray<T>
    toLeave: ReadonlyArray<T>
  } {
    const getItemMap = (items: ReadonlyArray<T>) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items.reduce<Record<any, T>>((map, item) => {
        map[getId(item)] = item
        return map
      }, {})
    const oldItemsMap = getItemMap(oldItems)
    const newItemsMap = getItemMap(newItems)

    const intersection = newItems.filter((newItem) => !!oldItemsMap[getId(newItem)])
    const toUpdate: T[] = []
    const toLeave: T[] = []
    intersection.forEach((newItem) => {
      const oldItem = oldItemsMap[getId(newItem)]
      if (compareNeedsUpdated(newItem, oldItem)) {
        toUpdate.push(newItem)
      } else {
        toLeave.push(oldItem)
      }
    })

    return {
      toCreate: newItems.filter((newItem) => !oldItemsMap[getId(newItem)]),
      toUpdate,
      toDelete: oldItems.filter((oldItem) => !newItemsMap[getId(oldItem)]),
      toLeave,
    }
  }

  /**
   * Calculate the offset of the timestamps because of a difference in duration length. The return
   * value should be used with `applyTimestampOffset` and `undoTimestampOffset`, and math should not
   * be done inline
   *
   * @param baseDuration The duration of the video the timestamps were based on
   * @param duration The duration of the current video
   * @returns The number of seconds difference between the two
   */
  public static computeTimestampsOffset(baseDuration: number, duration: number): number {
    return duration - baseDuration
  }

  public static applyTimestampsOffset(
    timestampsOffset: number | undefined,
    timestampAt: number,
  ): number {
    return (timestampsOffset ?? 0) + timestampAt
  }

  public static undoTimestampOffset(
    timestampsOffset: number | undefined,
    timestampAt: number,
  ): number {
    return timestampAt - (timestampsOffset ?? 0)
  }

  public static boundedNumber(
    value: number,
    [lowBound, highBound]: [number | undefined, number | undefined],
  ): number {
    if (lowBound != null && value < lowBound) return lowBound
    if (highBound != null && value > highBound) return highBound
    return value
  }

  public static setIntervalUntil(callback: () => boolean, interval: number, timeout: number): void {
    function clearBothTimers(): void {
      /* eslint-disable @typescript-eslint/no-use-before-define */
      window.clearTimeout(timeoutTimer)
      window.clearInterval(intervalTimer)
      /* eslint-enable @typescript-eslint/no-use-before-define */
    }
    const timeoutTimer = window.setTimeout(clearBothTimers, timeout)
    const intervalTimer = window.setInterval(() => {
      const stopEarly = callback()
      if (stopEarly) {
        clearBothTimers()
      }
    }, interval)
  }
}
