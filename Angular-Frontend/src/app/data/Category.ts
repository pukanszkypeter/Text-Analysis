export class Category {
  podcastId: string;
  category: string;

  // Object Init
  initialize(object: any): Category {
    this.podcastId = object.podcast_id;
    this.category = object.category;
    return this;
  }

}
