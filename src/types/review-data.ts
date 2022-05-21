export type ReviewData = {
    guitarId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    comment: string;
    rating: number;
    closeModalReviewCallback: () => void;
    showModalSuccessReview: () => void;
  };
