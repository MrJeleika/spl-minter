import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://spl-minter.vercel.app/',
      lastModified: new Date(),
    },
  ]
}