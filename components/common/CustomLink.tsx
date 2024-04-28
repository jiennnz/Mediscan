import clsx from "clsx";
import Link from "next/link";
import React from "react";

type LinkProps = {
  text: string;
  className: string;
  href: string;
  onClick?: () => void;
  target?: string;
};

const CustomLink = ({ text, className, href, onClick, target }: LinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={clsx(className)}
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default CustomLink;
