import { FaHome, FaChevronDown, FaInfoCircle, FaFolderOpen, FaClipboardList, FaShoppingBag, FaChevronRight, FaGoogle, FaTwitter, FaLinkedin, FaShoppingCart, FaTrash, FaRegHeart } from "react-icons/fa";

const IconMap = {
  FaHome,
  FaChevronDown,
  FaInfoCircle,
  FaFolderOpen,
  FaClipboardList,
  FaShoppingBag,
  FaChevronRight,
  FaGoogle,
  FaTwitter,
  FaLinkedin,
  FaShoppingCart,
  FaTrash,
  FaRegHeart
}

export const DynamicIcon = ({ iconName, fallback = null, ...props }) => {
  const IconComponent = IconMap[iconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`);
    return fallback;
  }

  return <IconComponent {...props} />;
};