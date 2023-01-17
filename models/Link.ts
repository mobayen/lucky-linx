import isURL from 'validator/es/lib/isURL'
import isLength from 'validator/es/lib/isLength'

import { useTimeAgo } from '@vueuse/core'
import ILink from '~~/types/ILink'
import IDocMetadata from '~~/types/IDocMetaData'

// TODO: "uid" exists -> it is not a new doc. should not create, just can get updated
// TODO... no "uid" -> it has not stored in DB
// TODO... empty URL or not a valid URL -> it cannot get stored yet

class Link implements ILink {
  public uid?: string
  public metadata?: IDocMetadata

  public title: string
  public url = ''
  public note?: string
  public tags?: string[]

  constructor (link: ILink) {
    this.uid = link.uid
    this.metadata = link.metadata

    this.title = link.title
    this.url = link.url
    this.note = link.note
    this.tags = link.tags
  }

  /**
   * @param withUID boolean: if the UID should included or not
   * @returns ILink
   */
  toJSON (withUID?: false): ILink {
    const obj:ILink = {
      metadata: this.metadata,

      url: this.url,
      title: this.title?.trim(),
      note: this.note?.trim(),
      tags: this.tags,
    }

    // not to include the UID if it's not needed or does not exist
    if (this.uid && withUID) {
      obj.uid = this.uid
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

      _all: url && title,
    }
  }

  get createdAtFormatted () {
    if (!this.metadata?.createdAtDate) {
      return
    }

    return useTimeAgo(this.metadata.createdAtDate)
  }
}

export default Link
