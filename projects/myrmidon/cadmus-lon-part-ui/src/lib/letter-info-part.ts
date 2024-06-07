import { Part } from '@myrmidon/cadmus-core';
import { PhysicalSize } from '@myrmidon/cadmus-mat-physical-size';

/**
 * The letter info part model.
 */
export interface LetterInfoPart extends Part {
  archive: string;
  shelfmark: string;
  language: string;
  languages?: string[];
  features?: string[];
  size?: PhysicalSize;
}

/**
 * The type ID used to identify the LetterInfoPart type.
 */
export const LETTER_INFO_PART_TYPEID = 'it.vedph.lon.letter-info';

/**
 * JSON schema for the letter info part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const LETTER_INFO_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/lon/cadmus-lon-part-ui/' +
    LETTER_INFO_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'LetterInfoPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'archive',
    'shelfmark',
    'language',
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    creatorId: {
      type: 'string',
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    userId: {
      type: 'string',
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$',
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$',
    },
    archive: {
      type: 'string',
    },
    shelfmark: {
      type: 'string',
    },
    language: {
      type: 'string',
    },
    languages: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    features: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    size: {
      type: 'object',
      required: [],
      properties: {
        tag: {
          type: 'string',
        },
        w: {
          type: 'object',
          required: ['value', 'unit'],
          properties: {
            tag: {
              type: 'string',
            },
            value: {
              type: 'integer',
            },
            unit: {
              type: 'string',
            },
          },
        },
        h: {
          type: 'object',
          required: ['value', 'unit'],
          properties: {
            tag: {
              type: 'string',
            },
            value: {
              type: 'integer',
            },
            unit: {
              type: 'string',
            },
          },
        },
        d: {
          type: 'object',
          required: ['value', 'unit'],
          properties: {
            tag: {
              type: 'string',
            },
            value: {
              type: 'integer',
            },
            unit: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
