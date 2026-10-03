import COACollectionConfig from '@/collections/AccountingCollections/COA'
import InternalDocumentsCollectionConfig from '@/collections/InternalDocuments'
import TagsCollectionConfig from '@/collections/Tags'

// #region ! ---------- DATA COLLECTION ----------
import CountriesCollectionConfig from '@/collections/DataCollections/Countries'
import GlossaryCollectionConfig from '@/collections/DataCollections/GlossaryTerms'
import IndicatorsCollectionConfig from '@/collections/DataCollections/Indicators/index'
import IndicatorValuesCollectionConfig from '@/collections/DataCollections/IndicatorValues'
// #endregion ! --------------------

// #region ! ---------- PATHWAYS ----------
import PathwayCategoriesCollectionConfig from '@/collections/DataCollections/PathwayCategories'
import PathwayDocumentsCollectionConfig from '@/collections/DataCollections/PathwayDocuments'
import PathwayDocumentTypesCollectionConfig from '@/collections/DataCollections/PathwayDocumentTypes'
import PathwaysCollectionConfig from '@/collections/DataCollections/Pathways'
// #endregion ! --------------------

// #region ! ---------- FORMS ----------
import FormsCollectionConfig from '@/collections/FormCollections/Forms'
import FormSubmissionsCollectionConfig from '@/collections/FormCollections/FormSubmissions'
import FormUploadsCollectionConfig from '@/collections/FormCollections/FormUploads'
// #endregion ! --------------------

// #region ! ---------- UPLOADS ----------
import CountryImagesCollectionConfig from '@/collections/UploadCollections/CountryImages'
import DocumentsCollectionConfig from '@/collections/UploadCollections/Documents'
import MediasCollectionConfig from '@/collections/UploadCollections/Media'
// #endregion ! --------------------

// #region ! ---------- CONTENT ----------
import ContentCollectionConfig from '@/collections/ContentCollections/Content'
import ExternalResourceCollectionConfig from '@/collections/ContentCollections/ExternalResources'
import RoutesCollectionConfig from '@/collections/ContentCollections/Routes'
import TemplatesCollectionConfig from '@/collections/ContentCollections/Templates'
// #endregion ! --------------------

// #region ! ---------- WORKFLOW ----------
// #endregion ! --------------------

// #region ! ---------- PERMISSIONS ----------
import PillarsCollectionConfig from '@/collections/DeptCollections/Pillars'
import RolesCollectionConfig from '@/collections/DeptCollections/Roles'
import TeamsCollectionConfig from '@/collections/DeptCollections/Teams'
// #endregion ! --------------------

// #region ! ---------- USERS ----------
import UserInvitationsCollectionConfig from '@/collections/UserCollections/Invitations'
import UserApplicationCollectionConfig from '@/collections/UserCollections/UserApplications'
import UserRolesCollectionConfig from '@/collections/UserCollections/UserRoles'
import { UsersCollectionConfig } from '@/collections/UserCollections/Users'
// #endregion ! --------------------

import { setCollectionGroup } from '@/_config/_lib'
import {
  DonationsCollectionConfig,
  SupporterCollectionConfig,
} from '@/collections/AccountingCollections/Donations'
import { GlossaryTermCountryCollectionConfig } from '@/collections/DataCollections/GlossaryTerms/CountryTerm'
import type { CollectionConfig } from 'payload'
import { V1Pathways } from './DataCollections/V1Pathways'

export const collections: CollectionConfig[] = [
  ...setCollectionGroup('Finances', [
    COACollectionConfig,
    DonationsCollectionConfig,
    SupporterCollectionConfig,
  ]),
  ...setCollectionGroup('Content', [
    ContentCollectionConfig,
    RoutesCollectionConfig,
    PathwaysCollectionConfig,
    CountriesCollectionConfig,
  ]),
  ...setCollectionGroup('Content Utilities', [
    GlossaryCollectionConfig,
    GlossaryTermCountryCollectionConfig,
    ExternalResourceCollectionConfig,
    PathwayCategoriesCollectionConfig,
    PathwayDocumentsCollectionConfig,
    PathwayDocumentTypesCollectionConfig,
    TagsCollectionConfig,
    TemplatesCollectionConfig,
    V1Pathways,
    IndicatorsCollectionConfig,
    IndicatorValuesCollectionConfig,
  ]),
  ...setCollectionGroup('Media', [
    DocumentsCollectionConfig,
    MediasCollectionConfig,
    CountryImagesCollectionConfig,
    InternalDocumentsCollectionConfig,
  ]),
  ...setCollectionGroup('Volunteer Management', [
    PillarsCollectionConfig,
    RolesCollectionConfig,
    TeamsCollectionConfig,
    UserApplicationCollectionConfig,
    UserInvitationsCollectionConfig,
    UserRolesCollectionConfig,
    UsersCollectionConfig,
    FormsCollectionConfig,
    FormSubmissionsCollectionConfig,
    FormUploadsCollectionConfig,
  ]),
]
