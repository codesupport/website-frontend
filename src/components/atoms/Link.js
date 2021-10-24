import React from "react";
import NextLink from "next/link";

function Link({ href, className, children }) {
	return (
		<NextLink href={href}>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a className={className}>{children}</a>
		</NextLink>
	);
}

export default Link;