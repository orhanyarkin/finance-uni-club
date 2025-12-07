import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { partner } from './partner'
import { teamMember } from './teamMember'
import { event } from './event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, partner, teamMember, event],
}
