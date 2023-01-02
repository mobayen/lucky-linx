import isURL from 'validator/es/lib/isURL'
import isLength from 'validator/es/lib/isLength'

import { useTimeAgo } from '@vueuse/core'
import ILink from '~~/types/ILink'
import IUser from '~~/types/IUser'

class Link implements ILink {
  public _id?: string

  public title: string
  public url = ''
  public note?: string

  public createdBy?: IUser
  public createdAt?: Date // TODO: check if it's realy a Date or string

  constructor (link: ILink) {
    this._id = link._id

    this.title = link.title
    this.url = link.url
    this.note = link.note
    this.createdBy = link.createdBy ?? undefined
    this.createdAt = link.createdAt ?? undefined
  }

  /**
   * @returns ILink
   */
  toJSON (): ILink {
    const obj:ILink = {
      _id: this._id,
      url: this.url,
      title: this.title?.trim(),
      note: this.note?.trim(),

      createdBy: this.createdBy,
      createdAt: this.createdAt,
    }

    return obj
  }

  // TODO: a validate() method
  // TODO... checks if the url is a real url
  // TODO... checks it is ready to create or update??

  validate () {
    // TODO: URL must have the protocl
    // TODO... add http if there is no http or https
    const url = isURL(this.url, { require_protocol: true })
    const title = isLength(this.title ?? '', { max: 128 })

    return {
      url,
      title,

      _all: url,
    }
  }

  get createdAtFormatted () {
    if (!this.createdAt) {
      return
    }

    return useTimeAgo(this.createdAt)
  }
}

export default Link
