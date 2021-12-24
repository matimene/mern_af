import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: (new Date).toISOString(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    archiveDate: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

newsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Conversion and assign of mongo _id to normal string id
    returnedObject.id = returnedObject._id.toString();
    // Erasing unneeded variables
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const News = mongoose.model("News", newsSchema);

export { News };