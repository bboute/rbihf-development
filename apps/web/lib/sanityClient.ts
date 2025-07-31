import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID!
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-05-21'

if (!projectId) {
  throw new Error('Missing Sanity project ID in environment variables')
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})