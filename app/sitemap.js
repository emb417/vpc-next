export default function sitemap() {
    return [
      {
        url: 'https://virtualpinballchat.com:8443',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://virtualpinballchat.com:8443/season',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://virtualpinballchat.com:8443/history',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: 'https://virtualpinballchat.com:8443/stats',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.3,
      },
    ]
  }