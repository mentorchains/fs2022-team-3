import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";

export default Component.extend({
  classNames: "featured-card",
  responsiveRatios: [1, 1.5, 2],
  displayHeight: 200,
  displayWidth: 200,

  @discourseComputed("topic.tags")
  tagUrl(tags) {
    return `/tag/${this.tag}`;
  },

  @discourseComputed("topic.tags")
  tag(tags) {
    return tags.find((element) =>
      settings.featured_tags.split("|").includes(element)
    );
  },
    
  @discourseComputed("topic.views")
  numOfViews(views) {
    return views
  },

  @discourseComputed("topic.like_count")
  numOfLikes(like_count) {
    return like_count
  },

  @discourseComputed("topic.thumbnails")
  srcset(thumbnails) {
    return this.responsiveRatios
      .map((ratio) => {
        const target = ratio * this.displayHeight;
        const match = this.findBest(
          ratio * this.displayHeight,
          ratio * this.displayWidth
        );
        return `${match.url} ${ratio}x`;
      })
      .join(",");
  },

  @discourseComputed("topic.thumbnails")
  original(thumbnails) {
    return thumbnails[0];
  },

  @discourseComputed("original")
  width(original) {
    return original.width;
  },

  @discourseComputed("original")
  height(original) {
    return original.height;
  },

  @discourseComputed("thumbnails")
  fallbackSrc() {
    return this.findBest(this.displayWidth, this.displayHeight).url;
  },

  findBest(maxWidth, maxHeight) {
    if (!this.topic.thumbnails) return;

    const largeEnough = this.topic.thumbnails.filter((t) => {
      if (!t.url) return false;
      return t.max_width >= maxHeight;
    });

    if (largeEnough.lastObject) {
      return largeEnough.lastObject;
    }

    return this.original;
  },

  @discourseComputed("topic")
  url(topic) {
    return topic.linked_post_number
      ? topic.urlForPostNumber(topic.linked_post_number)
      : topic.get("lastUnreadUrl");
  },
});
