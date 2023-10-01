import { v4 } from "uuid";

const getFillIconInfo = (rating) => {
  if (rating === 2) {
    return [
      { iconType: "fill", id: v4() },
      { iconType: "fill", id: v4() },
    ];
  } else if (rating === 3) {
    return [
      { iconType: "fill", id: v4() },
      { iconType: "fill", id: v4() },
      { iconType: "fill", id: v4() },
    ];
  } else if (rating === 4) {
    return [
      { iconType: "fill", id: v4() },
      { iconType: "fill", id: v4() },
      { iconType: "fill", id: v4() },
      { iconType: "fill", id: v4() },
    ];
  }
};

export const getRatingIconInfo = (rating) => {
  if (rating === 0) {
    return [
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
    ];
  } else if (rating === 1) {
    return [
      { iconType: "fill", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
    ];
  } else if (rating === 2) {
    return [
      ...getFillIconInfo(2),
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
    ];
  } else if (rating === 2.5) {
    return [
      ...getFillIconInfo(2),
      { iconType: "half", id: v4() },
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
    ];
  } else if (rating === 3) {
    return [
      ...getFillIconInfo(3),
      { iconType: "outline", id: v4() },
      { iconType: "outline", id: v4() },
    ];
  } else if (rating === 3.5) {
    return [
      ...getFillIconInfo(3),
      { iconType: "half", id: v4() },
      { iconType: "outline", id: v4() },
    ];
  } else if (rating === 4) {
    return [...getFillIconInfo(4), { iconType: "outline", id: v4() }];
  } else if (rating === 4.5) {
    return [...getFillIconInfo(4), { iconType: "half", id: v4() }];
  } else if (rating === 5) {
    return [...getFillIconInfo(4), { iconType: "fill", id: v4() }];
  }
};
