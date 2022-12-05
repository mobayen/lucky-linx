import IDocMetadata from '~~/types/IDocMetaData'

interface ILink {
  uid?: string | null
  metadata?: IDocMetadata

  title: string | null
  url: string
  note?: string | null
}

export default ILink
