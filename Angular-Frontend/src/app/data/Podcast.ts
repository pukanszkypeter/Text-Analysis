export class Podcast {
  podcastId: string;
  itunsId: number;
  slug: string;
  itunesUrl: string;
  title: string;

  // Object Init
  initialize(object: any): Podcast {
    this.podcastId = object.podcast_id;
    this.itunsId = object.itunsId;
    this.slug = object.slug;
    this.itunesUrl = object.itunesUrl;
    this.title = object.title;
    return this;
  }

}
