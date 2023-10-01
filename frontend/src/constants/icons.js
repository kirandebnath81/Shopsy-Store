import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
  AiOutlineFilter,
  AiOutlineDelete,
} from "react-icons/ai";

import {
  MdOutlineExplore,
  MdOutlineErrorOutline,
  MdExplore,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";

import { FaUser, FaLinkedinIn } from "react-icons/fa";
import {
  BsBagCheck,
  BsBagCheckFill,
  BsTwitter,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";

import { VscHeart, VscHeartFilled, VscCode } from "react-icons/vsc";
import { IoArrowBackOutline } from "react-icons/io5";
import { BiMenu, BiSearch, BiSortAlt2 } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const icons = {
  explore: MdOutlineExplore,
  exploreFill: MdExplore,
  wishlist: VscHeart,
  wishlistFill: VscHeartFilled,
  cart: BsBagCheck,
  cartFill: BsBagCheckFill,
  user: AiOutlineUser,
  userFill: FaUser,
  backArrow: IoArrowBackOutline,
  menu: BiMenu,
  error: MdOutlineErrorOutline,
  eye: AiOutlineEye,
  eyeInvisible: AiOutlineEyeInvisible,
  github: AiFillGithub,
  twitter: BsTwitter,
  linkedin: FaLinkedinIn,
  code: VscCode,
  search: BiSearch,
  cross: RxCross2,
  arrowUp: MdKeyboardArrowUp,
  arrowDown: MdKeyboardArrowDown,
  sort: BiSortAlt2,
  filter: AiOutlineFilter,
  star: BsStar,
  starHalf: BsStarHalf,
  starFill: BsStarFill,
  increase: IoMdAdd,
  decrease: IoMdRemove,
  delete: AiOutlineDelete,
};

export default icons;
