import {createClient} from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: "2oxqalq0",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-08-12"
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

export default client;