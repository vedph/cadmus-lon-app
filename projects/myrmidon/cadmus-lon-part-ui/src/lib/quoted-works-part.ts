import { Part } from '@myrmidon/cadmus-core';

/**
 * A quoted work in a letter.
 */
export interface QuotedWork {
  id: string;
  role: string;
  location?: string;
  note?: string;
}

/**
 * The quoted works part model.
 */
export interface QuotedWorksPart extends Part {
  works: QuotedWork[];
}

/**
 * The type ID used to identify the QuotedWorksPart type.
 */
export const QUOTED_WORKS_PART_TYPEID = 'it.vedph.lon.quoted-works';

/**
 * JSON schema for the QuotedWorks part.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const QuotedWorks_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/lon/cadmus-lon-part-ui/' +
    QUOTED_WORKS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'QuotedWorksPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'works',
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
    works: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['id', 'role'],
            properties: {
              id: {
                type: 'string',
              },
              role: {
                type: 'string',
              },
              location: {
                type: 'string',
              },
              note: {
                type: 'string',
              },
            },
          },
        ],
      },
    },
  },
};
