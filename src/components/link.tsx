import type { FC, HTMLAttributes } from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";

type CustomLinkProps = RouterLinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    to: string;
    target?: string;
  };

const Link: FC<CustomLinkProps> = ({ children, to, ...rest }) => {
  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
