import { DateTime } from 'luxon'

export class TimeZone {
  base: DateTime<true> | DateTime<false>
  constructor(public zone: string) {
    this.base = DateTime.fromJSDate(new Date(), { zone })
  }

  offsetHours() {
    return this.base.offset / 60
  }

  offsetMinutes() {
    return this.base.offset
  }

  toOffsetString() {
    return `UTC${this.offsetHours() < 0 ? '' : '+'}${this.offsetHours().toString().padStart(2, '0')}:00`
  }

  toString() {
    return `${this.zone.replaceAll('_', ' ')} (${this.toOffsetString()})`
  }

  toUTC() {
    return this.base.getPossibleOffsets()
  }
}
