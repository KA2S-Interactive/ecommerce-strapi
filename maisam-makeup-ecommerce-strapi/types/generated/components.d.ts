import type { Struct, Schema } from '@strapi/strapi';

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    icon: 'layout';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    metaTitle: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRichtext extends Struct.ComponentSchema {
  collectionName: 'components_shared_richtexts';
  info: {
    displayName: 'RichText';
    icon: 'layout';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedComment extends Struct.ComponentSchema {
  collectionName: 'components_shared_comments';
  info: {
    displayName: 'Comment';
    icon: 'layout';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    body: Schema.Attribute.Text;
    date: Schema.Attribute.DateTime;
    admin_user: Schema.Attribute.Relation<'manyToOne', 'admin::user'>;
    likes: Schema.Attribute.Integer;
  };
}

export interface MediaSlider extends Struct.ComponentSchema {
  collectionName: 'components_media_sliders';
  info: {
    displayName: 'Slider';
    icon: 'layout';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface LinksVediolinks extends Struct.ComponentSchema {
  collectionName: 'components_links_vediolinkss';
  info: {
    displayName: 'VedioLinks';
    icon: 'layout';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    url: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.slider': SharedSlider;
      'shared.seo': SharedSeo;
      'shared.richtext': SharedRichtext;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.media': SharedMedia;
      'shared.comment': SharedComment;
      'media.slider': MediaSlider;
      'links.vediolinks': LinksVediolinks;
    }
  }
}
