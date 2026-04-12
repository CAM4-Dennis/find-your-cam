import { Link, type LinkProps } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * A Link component that automatically prepends the current language prefix.
 * Use this instead of react-router's Link for all internal navigation.
 */
const LocalLink = ({ to, ...props }: LinkProps) => {
  const { localePath } = useLanguage();
  const localTo = typeof to === "string" ? localePath(to) : to;
  return <Link to={localTo} {...props} />;
};

export default LocalLink;
