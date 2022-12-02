import ILink from '~~/types/ILink'

class Link implements ILink {
  public title: string | null = ''
  public url = ''
  public note?: string | null = ''

  constructor (link: ILink) {
    this.title = link.title
    this.url = link.url
    this.note = link.note ?? null
  }

  toJSON () {
    return {
      url: this.url,
      title: this.title,
      note: this.note
    }
  }
}

export default Link
