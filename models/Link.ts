import ILink from '~~/types/ILink'
import IDocMetadata from '~~/types/IDocMetaData'

// TODO: "uid" exists -> it is not a new doc. should not create, just can get updated
// TODO... no "uid" -> it has not stored in DB
// TODO... empty URL or not a valid URL -> it cannot get stored yet

class Link implements ILink {
  public uid?: string | null = null
  public metadata?: IDocMetadata

  public title: string | null = null
  public url = ''
  public note?: string | null = null

  constructor (link: ILink) {
    this.uid = link.uid ?? null
    this.metadata = link.metadata

    this.title = link.title ?? null
    this.url = link.url
    this.note = link.note ?? null
  }

  /**
   * @param withUID boolean: if the UID should included or not
   * @returns ILink
   */
  toJSON (withUID?: false): ILink {
    const obj:ILink = {
      metadata: this.metadata,

      url: this.url,
      title: this.title,
      note: this.note
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
}

export default Link
