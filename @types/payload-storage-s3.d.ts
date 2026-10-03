import type {
  CollectionConfig,
  Field,
  FileData,
  PayloadRequest,
  TypeWithID,
  UploadCollectionSlug,
} from 'payload'

declare module '@payloadcms/storage-s3' {
  export type CollectionsConfig = Partial<
    Record<
      UploadCollectionSlug,
      | ({
          signedDownloads?: SignedDownloadsConfig
        } & Omit<CollectionOptions, 'adapter'>)
      | true
    >
  >

  export type SignedDownloadsConfig =
    | {
        /** @default 7200 */
        expiresIn?: number
        shouldUseSignedURL?(args: {
          collection: CollectionConfig
          filename: string
          req: PayloadRequest
        }): boolean | Promise<boolean>
      }
    | boolean

  interface CollectionOptions extends Record<string, any> {
    adapter: Adapter | null
    disableLocalStorage?: boolean
    disablePayloadAccessControl?: true
    generateFileURL?: GenerateURL
    prefix?: string
  }

  export type Adapter = (args: {
    collection: CollectionConfig
    prefix?: string
  }) => GeneratedAdapter

  export interface GeneratedAdapter {
    clientUploads?: ClientUploadsConfig

    fields?: Field[]

    generateURL?: GenerateURL
    handleDelete: HandleDelete
    handleUpload: HandleUpload
    name: string
    onInit?: () => void
    staticHandler: StaticHandler
  }

  export type ClientUploadsAccess = (args: {
    collectionSlug: UploadCollectionSlug
    req: PayloadRequest
  }) => boolean | Promise<boolean>

  export type ClientUploadsConfig =
    | {
        access?: ClientUploadsAccess
      }
    | boolean

  export type HandleUpload = (args: {
    clientUploadContext: unknown
    collection: CollectionConfig
    data: any
    file: File
    req: PayloadRequest
  }) =>
    Partial<FileData & TypeWithID> | Promise<Partial<FileData & TypeWithID>> | Promise<void> | void

  export interface TypeWithPrefix {
    prefix?: string
  }

  export type HandleDelete = (args: {
    collection: CollectionConfig
    doc: FileData & TypeWithID & TypeWithPrefix
    filename: string
    req: PayloadRequest
  }) => Promise<void> | void

  export type GenerateURL = (args: {
    collection: CollectionConfig
    data: any
    filename: string
    prefix?: string
  }) => Promise<string> | string

  export type StaticHandler = (
    req: PayloadRequest,
    args: {
      doc?: TypeWithID
      headers?: Headers
      params: {
        clientUploadContext?: unknown
        collection: string
        filename: string
      }
    }
  ) => Promise<Response> | Response
}
