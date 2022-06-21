import { datatype, image, internet, lorem, random } from 'faker';
import { Guitar } from '../types/guitar';
import { Review } from '../types/review';
import { ReviewData } from '../types/review-data';

export const makeFakeGuitar = (): Guitar => ({
  id: datatype.number(),
  name: internet.userName(),
  vendorCode: random.words(),
  type: random.words(),
  description: lorem.text(),
  previewImg: image.image(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
  comments: datatype.array(2),
} as Guitar);

export const makeFakeReviews = (): Review => ({
  id: datatype.number(),
  userName: internet.userName(),
  advantage: random.words(),
  disadvantage: random.words(),
  comment: random.words(),
  rating: datatype.number(),
  createAt: datatype.string(),
  guitarId: datatype.number(),
} as Review);

export const makeFakeReviewData = (): ReviewData => ({
  guitarId: datatype.number(),
  userName: internet.userName(),
  advantage: random.words(),
  disadvantage: random.words(),
  comment: random.words(),
  rating: datatype.number(),
} as ReviewData);
