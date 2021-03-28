export class Review {
  podcastId: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;

  // Object Init
  initialize(object: any): Review {
    this.podcastId = object.podcast_id;
    this.title = object.title;
    this.content = object.content;
    this.rating = object.rating;
    this.createdAt = object.createdAt;
    return this;
  }

}
