/** Whether a nav link should be marked as the current page. */
export function isActivePath(pathname: string, href: string) {
  const path = href.split("?")[0] ?? href;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}
