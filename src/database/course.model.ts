import { ECourseLevel, ECourseStatus } from "@/types/enum";
import { Document, model, models, Schema } from "mongoose";

export interface ICourse extends Document {
  _id: string;
  title: string
  image: string;
  intro_url: string;
  desc: string;
  price: number;
  sale_price: number;
  slug: string;
  author: Schema.Types.ObjectId;
  status: ECourseStatus;
  views: number;
  level: ECourseLevel;
  rating: number[];
  created_at: Date;
  infor: {
    requirements: string[];
    benefits: string[];
    qa: {
      question: string;
      answer: string;
    }[]
  };
  lectures: Schema.Types.ObjectId[];
  _destroy: boolean
}

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  intro_url: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
  sale_price: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(ECourseStatus),
    default: ECourseStatus.PENDING,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
  rating: {
    type: [Number],
    default: [5],
  },
  views: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    enum: Object.values(ECourseLevel),
    default: ECourseLevel.BEGINNER,
  },
  infor: {
    requirements: {
      type: [String]
    },
    benefits: {
      type: [String]
    },
    qa: [
      {
        question: {
          type: String
        },
        answer: {
          type: String,
        },
      }
    ]
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
});

const Course = models.Course || model<ICourse>("Course", courseSchema);
export default Course;