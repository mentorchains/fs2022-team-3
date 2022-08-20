export default {
    setupComponent(args, component) {
      if (settings.sort_by === "views") {
        this.set("sortByViews", true);
      } else {
        this.set("sortByViews", false);
      }
    },
  };
