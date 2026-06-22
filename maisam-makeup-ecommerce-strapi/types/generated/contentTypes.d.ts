import type { Struct, Schema } from '@strapi/strapi';

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    width: Schema.Attribute.Integer;
    height: Schema.Attribute.Integer;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    ext: Schema.Attribute.String;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    related: Schema.Attribute.Relation<'morphToMany'>;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    timezone: Schema.Attribute.String;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    entryDocumentId: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    name: 'Workflow';
    description: '';
    singularName: 'workflow';
    pluralName: 'workflows';
    displayName: 'Workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    name: 'Workflow Stage';
    description: '';
    singularName: 'workflow-stage';
    pluralName: 'workflow-stages';
    displayName: 'Stages';
  };
  options: {
    version: '1.1.0';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String;
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Schema.Attribute.String;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    timestamps: true;
    draftAndPublish: false;
  };
  attributes: {
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    details: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAboutAbout extends Struct.SingleTypeSchema {
  collectionName: 'abouts';
  info: {
    singularName: 'about';
    pluralName: 'abouts';
    displayName: 'About';
    description: 'Write about yourself and the content you create';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Schema.Attribute.String;
    blocks: Schema.Attribute.DynamicZone<
      ['shared.media', 'shared.quote', 'shared.rich-text', 'shared.slider']
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::about.about'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAccountSettingAccountSetting
  extends Struct.CollectionTypeSchema {
  collectionName: 'account_settings';
  info: {
    singularName: 'account-setting';
    pluralName: 'account-settings';
    displayName: 'Account Setting';
    description: 'Per-user account-level automation preferences (ad account, WhatsApp, language, credits).';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ukey: Schema.Attribute.String & Schema.Attribute.Unique;
    adAccountId: Schema.Attribute.String;
    phoneNumberId: Schema.Attribute.String;
    whatsappToken: Schema.Attribute.String & Schema.Attribute.Private;
    language: Schema.Attribute.String & Schema.Attribute.DefaultTo<'English'>;
    credits: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::account-setting.account-setting'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAdCampaignAdCampaign extends Struct.CollectionTypeSchema {
  collectionName: 'ad_campaigns';
  info: {
    singularName: 'ad-campaign';
    pluralName: 'ad-campaigns';
    displayName: 'Ad Campaign';
    description: 'Log of paid promotions created for published posts';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    adAccountId: Schema.Attribute.String;
    campaignId: Schema.Attribute.String;
    adsetId: Schema.Attribute.String;
    adId: Schema.Attribute.String;
    objective: Schema.Attribute.String;
    optimizationGoal: Schema.Attribute.String;
    dailyBudget: Schema.Attribute.Decimal;
    durationDays: Schema.Attribute.Integer;
    audience: Schema.Attribute.JSON;
    age: Schema.Attribute.JSON;
    status: Schema.Attribute.Enumeration<['creating', 'active', 'failed']> &
      Schema.Attribute.DefaultTo<'creating'>;
    published_post: Schema.Attribute.Relation<
      'manyToOne',
      'api::published-post.published-post'
    >;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    raw: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ad-campaign.ad-campaign'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiArticleArticle extends Struct.CollectionTypeSchema {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: 'A collection for article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'>;
    cover: Schema.Attribute.Media<'images'>;
    author: Schema.Attribute.Relation<'manyToOne', 'api::author.author'>;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    blocks: Schema.Attribute.DynamicZone<['media.slider', 'shared.rich-text']>;
    content: Schema.Attribute.RichText;
    conver: Schema.Attribute.Media<'images'>;
    vedioLinks: Schema.Attribute.Component<'links.vediolinks', true>;
    comments: Schema.Attribute.Component<'shared.comment', true>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAuthorAuthor extends Struct.CollectionTypeSchema {
  collectionName: 'authors';
  info: {
    singularName: 'author';
    pluralName: 'authors';
    displayName: 'Author';
    description: 'A collection for author';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Schema.Attribute.String;
    avatar: Schema.Attribute.Media<'images'>;
    email: Schema.Attribute.String;
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::author.author'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiAutopilotPlanAutopilotPlan
  extends Struct.CollectionTypeSchema {
  collectionName: 'autopilot_plans';
  info: {
    singularName: 'autopilot-plan';
    pluralName: 'autopilot-plans';
    displayName: 'Auto-Pilot Plan';
    description: 'Recurring posting plans for social auto-pilot';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    status: Schema.Attribute.Enumeration<['active', 'paused', 'completed']> &
      Schema.Attribute.DefaultTo<'active'>;
    postsPerDay: Schema.Attribute.Integer;
    timeMode: Schema.Attribute.Enumeration<['specific', 'autosplit']>;
    workingHoursStart: Schema.Attribute.String;
    workingHoursEnd: Schema.Attribute.String;
    startDate: Schema.Attribute.Date;
    durationDays: Schema.Attribute.Integer;
    destinations: Schema.Attribute.JSON;
    sources: Schema.Attribute.JSON;
    slots: Schema.Attribute.JSON;
    pageId: Schema.Attribute.String;
    social_connection: Schema.Attribute.Relation<
      'manyToOne',
      'api::social-connection.social-connection'
    >;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::autopilot-plan.autopilot-plan'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiBrandProfileBrandProfile
  extends Struct.CollectionTypeSchema {
  collectionName: 'brand_profiles';
  info: {
    singularName: 'brand-profile';
    pluralName: 'brand-profiles';
    displayName: 'Brand Profile';
    description: 'Per-Page brand identity used to engineer on-brand Runway/image prompts.';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    wkey: Schema.Attribute.String & Schema.Attribute.Unique;
    pageId: Schema.Attribute.String;
    pageName: Schema.Attribute.String;
    concept: Schema.Attribute.Text;
    summary: Schema.Attribute.Text;
    voice: Schema.Attribute.String;
    logoUrl: Schema.Attribute.String;
    colors: Schema.Attribute.String;
    colorSpace: Schema.Attribute.String & Schema.Attribute.DefaultTo<'sRGB'>;
    imageStyle: Schema.Attribute.String;
    useBrandColors: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    addLogo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    language: Schema.Attribute.String & Schema.Attribute.DefaultTo<'English'>;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::brand-profile.brand-profile'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Struct.CollectionTypeSchema {
  collectionName: 'categorys';
  info: {
    singularName: 'category';
    pluralName: 'categorys';
    displayName: 'Category';
    description: 'A collection for category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'name'>;
    description: Schema.Attribute.Text;
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiContentPlanContentPlan extends Struct.CollectionTypeSchema {
  collectionName: 'content_plans';
  info: {
    singularName: 'content-plan';
    pluralName: 'content-plans';
    displayName: 'Content Plan';
    description: 'Per-Page weekly Cadence plan (summary, winning patterns) with its plan items.';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    wkey: Schema.Attribute.String;
    pageId: Schema.Attribute.String;
    week: Schema.Attribute.String;
    summary: Schema.Attribute.Text;
    winningPatterns: Schema.Attribute.JSON;
    plan_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::plan-item.plan-item'
    >;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::content-plan.content-plan'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiCouponCoupon extends Struct.CollectionTypeSchema {
  collectionName: 'coupons';
  info: {
    singularName: 'coupon';
    pluralName: 'coupons';
    displayName: 'coupon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Schema.Attribute.String;
    type: Schema.Attribute.String;
    value: Schema.Attribute.Integer;
    minorder: Schema.Attribute.Integer;
    maxUsers: Schema.Attribute.Integer;
    usedCount: Schema.Attribute.Integer;
    startDate: Schema.Attribute.String;
    endDate: Schema.Attribute.String;
    description: Schema.Attribute.String;
    active: Schema.Attribute.Boolean;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::coupon.coupon'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiCreativeCreative extends Struct.CollectionTypeSchema {
  collectionName: 'creatives';
  info: {
    singularName: 'creative';
    pluralName: 'creatives';
    displayName: 'Creative';
    description: 'A generated ad creative (copy, prompts, media) tied to a Page and week.';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    cId: Schema.Attribute.String;
    pageId: Schema.Attribute.String;
    week: Schema.Attribute.String;
    status: Schema.Attribute.String;
    format: Schema.Attribute.String;
    persona: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    cta: Schema.Attribute.String;
    imagePrompt: Schema.Attribute.Text;
    imageUrl: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
    reasoning: Schema.Attribute.JSON;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::creative.creative'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiGlobalGlobal extends Struct.SingleTypeSchema {
  collectionName: 'globals';
  info: {
    singularName: 'global';
    pluralName: 'globals';
    displayName: 'Global';
    description: 'Define global settings';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    favicon: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    siteDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    defaultSeo: Schema.Attribute.Component<'shared.seo', false>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global.global'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiGrowWorkspaceGrowWorkspace
  extends Struct.CollectionTypeSchema {
  collectionName: 'grow_workspaces';
  info: {
    singularName: 'grow-workspace';
    pluralName: 'grow-workspaces';
    displayName: 'Grow Workspace';
    description: 'Per-Page Cadence workspace (brand, plan, creatives) and account state.';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    wkey: Schema.Attribute.String & Schema.Attribute.Unique;
    pageId: Schema.Attribute.String;
    data: Schema.Attribute.JSON;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::grow-workspace.grow-workspace'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiOrderdetailsOrderdetails
  extends Struct.CollectionTypeSchema {
  collectionName: 'orderdetailss';
  info: {
    singularName: 'orderdetails';
    pluralName: 'orderdetailss';
    displayName: 'Orderdetails';
    description: 'A collection for orderdetails';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    total: Schema.Attribute.Decimal;
    date: Schema.Attribute.DateTime;
    store: Schema.Attribute.Relation<'manyToOne', 'api::store.store'>;
    address: Schema.Attribute.String;
    addressType: Schema.Attribute.String;
    cart: Schema.Attribute.JSON;
    city: Schema.Attribute.String;
    name: Schema.Attribute.String;
    notes: Schema.Attribute.Text;
    cost: Schema.Attribute.Decimal;
    paymentMethod: Schema.Attribute.String;
    phoneNumber: Schema.Attribute.String;
    street: Schema.Attribute.String;
    subtotal: Schema.Attribute.BigInteger;
    order_id: Schema.Attribute.UID;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::orderdetails.orderdetails'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiPartPart extends Struct.CollectionTypeSchema {
  collectionName: 'parts';
  info: {
    singularName: 'part';
    pluralName: 'parts';
    displayName: 'Part';
    description: 'A collection for part';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    date: Schema.Attribute.DateTime;
    images: Schema.Attribute.Media<'images', true>;
    stores: Schema.Attribute.Relation<'manyToMany', 'api::store.store'>;
    available: Schema.Attribute.Boolean;
    details: Schema.Attribute.JSON;
    price: Schema.Attribute.Decimal;
    categories: Schema.Attribute.String;
    clicks: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    visits: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    shares: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publisher: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::part.part'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPaymentOrderPaymentOrder
  extends Struct.CollectionTypeSchema {
  collectionName: 'payment_orders';
  info: {
    singularName: 'payment-order';
    pluralName: 'payment-orders';
    displayName: 'Payment Order';
    description: 'Hyp (MAX) payment records';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    orderId: Schema.Attribute.String;
    planId: Schema.Attribute.String;
    amount: Schema.Attribute.Decimal;
    currency: Schema.Attribute.String;
    billing: Schema.Attribute.String;
    hypId: Schema.Attribute.String;
    status: Schema.Attribute.String;
    raw: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::payment-order.payment-order'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiPerformanceSnapshotPerformanceSnapshot
  extends Struct.CollectionTypeSchema {
  collectionName: 'performance_snapshots';
  info: {
    singularName: 'performance-snapshot';
    pluralName: 'performance-snapshots';
    displayName: 'Performance Snapshot';
    description: 'Per-Page weekly performance metrics and learnings for the Cadence engine.';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    wkey: Schema.Attribute.String;
    pageId: Schema.Attribute.String;
    week: Schema.Attribute.String;
    spend: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    roas: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    impressions: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    ctr: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    approvedCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    learnings: Schema.Attribute.JSON;
    fatigueSignals: Schema.Attribute.JSON;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::performance-snapshot.performance-snapshot'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiPlanItemPlanItem extends Struct.CollectionTypeSchema {
  collectionName: 'plan_items';
  info: {
    singularName: 'plan-item';
    pluralName: 'plan-items';
    displayName: 'Plan Item';
    description: 'A single item within a Content Plan (title, persona, format, hypothesis, offer).';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Schema.Attribute.String;
    persona: Schema.Attribute.String;
    format: Schema.Attribute.String;
    hypothesis: Schema.Attribute.Text;
    offer: Schema.Attribute.String;
    content_plan: Schema.Attribute.Relation<
      'manyToOne',
      'api::content-plan.content-plan'
    >;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::plan-item.plan-item'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiPlanOccurrencePlanOccurrence
  extends Struct.CollectionTypeSchema {
  collectionName: 'plan_occurrences';
  info: {
    singularName: 'plan-occurrence';
    pluralName: 'plan-occurrences';
    displayName: 'Plan Occurrence';
    description: 'Durable per-post queue for the auto-pilot cron runner';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    scheduledAt: Schema.Attribute.DateTime;
    slotIndex: Schema.Attribute.Integer;
    status: Schema.Attribute.Enumeration<
      ['pending', 'processing', 'posted', 'failed', 'skipped']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    attempts: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    result: Schema.Attribute.JSON;
    autopilot_plan: Schema.Attribute.Relation<
      'manyToOne',
      'api::autopilot-plan.autopilot-plan'
    >;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::plan-occurrence.plan-occurrence'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiPostSettingPostSetting extends Struct.CollectionTypeSchema {
  collectionName: 'post_settings';
  info: {
    singularName: 'post-setting';
    pluralName: 'post-settings';
    displayName: 'Post Setting';
    description: 'Per-user default tags and posting agents';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    defaultTags: Schema.Attribute.String;
    igAgent: Schema.Attribute.Text;
    fbAgent: Schema.Attribute.Text;
    users_permissions_user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::post-setting.post-setting'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: 'A collection for product';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    image: Schema.Attribute.Media<'images', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    categories: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    name: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: Schema.Attribute.UID<'name'>;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    details: Schema.Attribute.JSON &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    store: Schema.Attribute.Relation<'manyToOne', 'api::store.store'>;
    services: Schema.Attribute.Relation<'manyToMany', 'api::service.service'>;
    clicks: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Schema.Attribute.DefaultTo<0>;
    visits: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Schema.Attribute.DefaultTo<0>;
    shares: Schema.Attribute.Integer &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Schema.Attribute.DefaultTo<0>;
    publisher: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    >;
  };
}

export interface ApiPublishedPostPublishedPost
  extends Struct.CollectionTypeSchema {
  collectionName: 'published_posts';
  info: {
    singularName: 'published-post';
    pluralName: 'published-posts';
    displayName: 'Published Post';
    description: 'Log of posts published to Facebook or Instagram';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    provider: Schema.Attribute.Enumeration<['facebook', 'instagram']>;
    targetId: Schema.Attribute.String;
    externalPostId: Schema.Attribute.String;
    caption: Schema.Attribute.Text;
    imageUrl: Schema.Attribute.String;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<['published', 'scheduled', 'failed']>;
    draftId: Schema.Attribute.String;
    plan_occurrence: Schema.Attribute.Relation<
      'manyToOne',
      'api::plan-occurrence.plan-occurrence'
    >;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    raw: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::published-post.published-post'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiRunwayWorkflowRunwayWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'runway_workflows';
  info: {
    singularName: 'runway-workflow';
    pluralName: 'runway-workflows';
    displayName: 'Runway Workflow';
    description: "A customer's purchased Runway Workflow, saved per Page (id, version, key, node template).";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    wfId: Schema.Attribute.String;
    pageId: Schema.Attribute.String;
    name: Schema.Attribute.String;
    workflowId: Schema.Attribute.String;
    version: Schema.Attribute.String & Schema.Attribute.DefaultTo<'2024-11-06'>;
    apiKey: Schema.Attribute.String & Schema.Attribute.Private;
    baseUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'api.dev.runwayml.com'>;
    nodeOutputs: Schema.Attribute.JSON;
    imageNode: Schema.Attribute.String;
    promptNode: Schema.Attribute.String;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::runway-workflow.runway-workflow'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiScrapePlanScrapePlan extends Struct.CollectionTypeSchema {
  collectionName: 'scrape_plans';
  info: {
    singularName: 'scrape-plan';
    pluralName: 'scrape-plans';
    displayName: 'Scrape Plan';
    description: 'Daily scrape-to-post automation plans (source URLs, post hours, channels).';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    tenantId: Schema.Attribute.String;
    pageId: Schema.Attribute.String;
    urls: Schema.Attribute.JSON;
    channels: Schema.Attribute.JSON;
    hours: Schema.Attribute.JSON;
    postsPerDay: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    autoPublish: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    brief: Schema.Attribute.Text;
    channel: Schema.Attribute.String;
    language: Schema.Attribute.String;
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    lastRun: Schema.Attribute.DateTime;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::scrape-plan.scrape-plan'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceService extends Struct.CollectionTypeSchema {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: 'A collection for service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    price: Schema.Attribute.Decimal;
    stores: Schema.Attribute.Relation<'manyToMany', 'api::store.store'>;
    image: Schema.Attribute.Media<'images'>;
    date: Schema.Attribute.DateTime;
    details: Schema.Attribute.JSON;
    slug: Schema.Attribute.UID<'title'>;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    clicks: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    visits: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    shares: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publisher: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiSocialConnectionSocialConnection
  extends Struct.CollectionTypeSchema {
  collectionName: 'social_connections';
  info: {
    singularName: 'social-connection';
    pluralName: 'social-connections';
    displayName: 'Social Connection';
    description: 'Facebook/Meta OAuth credentials for connected accounts';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    provider: Schema.Attribute.Enumeration<['facebook', 'instagram']> &
      Schema.Attribute.DefaultTo<'facebook'>;
    metaUserId: Schema.Attribute.String;
    metaName: Schema.Attribute.String;
    metaEmail: Schema.Attribute.Email;
    userToken: Schema.Attribute.Text;
    tokenExpiresAt: Schema.Attribute.DateTime;
    pages: Schema.Attribute.JSON;
    igUserId: Schema.Attribute.String;
    igUserToken: Schema.Attribute.Text;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-connection.social-connection'
    > &
      Schema.Attribute.Private;
  };
}

export interface ApiStoreStore extends Struct.CollectionTypeSchema {
  collectionName: 'stores';
  info: {
    singularName: 'store';
    pluralName: 'stores';
    displayName: 'Store';
    description: 'A collection for store';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    address: Schema.Attribute.String;
    details: Schema.Attribute.JSON;
    hostname: Schema.Attribute.String;
    visits: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    clicks: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    shares: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publisher: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    tags: Schema.Attribute.String;
    provider: Schema.Attribute.String;
    slug: Schema.Attribute.UID<'name'>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    logo: Schema.Attribute.Media<'images'>;
    socialMedia: Schema.Attribute.JSON;
    parts: Schema.Attribute.Relation<'manyToMany', 'api::part.part'>;
    services: Schema.Attribute.Relation<'manyToMany', 'api::service.service'>;
    apiToken: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::store.store'> &
      Schema.Attribute.Private;
  };
}

export interface ApiStylePresetStylePreset extends Struct.CollectionTypeSchema {
  collectionName: 'style_presets';
  info: {
    singularName: 'style-preset';
    pluralName: 'style-presets';
    displayName: 'Style Preset';
    description: 'Named, reusable image-generation style presets per user.';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    presetId: Schema.Attribute.String;
    name: Schema.Attribute.String;
    style: Schema.Attribute.Text;
    logoUrl: Schema.Attribute.String;
    useBrandColors: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    addLogo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    users_permissions_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::style-preset.style-preset'
    > &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Schema.Attribute.String;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    preferedLanguage: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Schema.Attribute.String;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Schema.Attribute.DateTime;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Schema.Attribute.DateTime;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    createdAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::about.about': ApiAboutAbout;
      'api::account-setting.account-setting': ApiAccountSettingAccountSetting;
      'api::ad-campaign.ad-campaign': ApiAdCampaignAdCampaign;
      'api::article.article': ApiArticleArticle;
      'api::author.author': ApiAuthorAuthor;
      'api::autopilot-plan.autopilot-plan': ApiAutopilotPlanAutopilotPlan;
      'api::brand-profile.brand-profile': ApiBrandProfileBrandProfile;
      'api::category.category': ApiCategoryCategory;
      'api::content-plan.content-plan': ApiContentPlanContentPlan;
      'api::coupon.coupon': ApiCouponCoupon;
      'api::creative.creative': ApiCreativeCreative;
      'api::global.global': ApiGlobalGlobal;
      'api::grow-workspace.grow-workspace': ApiGrowWorkspaceGrowWorkspace;
      'api::orderdetails.orderdetails': ApiOrderdetailsOrderdetails;
      'api::part.part': ApiPartPart;
      'api::payment-order.payment-order': ApiPaymentOrderPaymentOrder;
      'api::performance-snapshot.performance-snapshot': ApiPerformanceSnapshotPerformanceSnapshot;
      'api::plan-item.plan-item': ApiPlanItemPlanItem;
      'api::plan-occurrence.plan-occurrence': ApiPlanOccurrencePlanOccurrence;
      'api::post-setting.post-setting': ApiPostSettingPostSetting;
      'api::product.product': ApiProductProduct;
      'api::published-post.published-post': ApiPublishedPostPublishedPost;
      'api::runway-workflow.runway-workflow': ApiRunwayWorkflowRunwayWorkflow;
      'api::scrape-plan.scrape-plan': ApiScrapePlanScrapePlan;
      'api::service.service': ApiServiceService;
      'api::social-connection.social-connection': ApiSocialConnectionSocialConnection;
      'api::store.store': ApiStoreStore;
      'api::style-preset.style-preset': ApiStylePresetStylePreset;
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
    }
  }
}
