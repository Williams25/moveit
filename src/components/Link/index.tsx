import NextLink from 'next/link'

export const Link = ({ children, href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  )
}