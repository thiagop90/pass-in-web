import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline data-[current=true]:text-foreground data-[current=true]:underline"
      {...props}
    />
  )
}
