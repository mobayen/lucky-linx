import IDocMetadata from '~~/types/IDocMetaData'

interface ILink {
  uid?: string
  metadata?: IDocMetadata

  title: string
  url: string
  note?: string
  tags?: string[]
}

export default ILink
