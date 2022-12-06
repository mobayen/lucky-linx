import IDocMetadata from '~~/types/IDocMetaData'

interface ILink {
  uid?: string
  metadata?: IDocMetadata

  title: string
  url: string
  note?: string
}

export default ILink
