import { Link, useRouter } from "@/i18n/routing";

function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

function shouldPreserveDefault(
  e: React.MouseEvent<HTMLAnchorElement>
): boolean {
  const { nodeName } = e.currentTarget;

  // anchors inside an svg have a lowercase nodeName
  const isAnchorNodeName = nodeName.toUpperCase() === "A";

  if (isAnchorNodeName && isModifiedEvent(e)) {
    // ignore click for browser’s default behavior
    return true;
  }

  return false;
}

export const TransitionLink = (props: React.ComponentProps<typeof Link>) => {
  const { replace, href } = props;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if ("startViewTransition" in document) {
      if (shouldPreserveDefault(e)) {
        return;
      }
      e.preventDefault();

      document.startViewTransition(() => {
        router[replace ? "replace" : "push"](href as string);
      });
    }
  };
  return <Link {...props} onClick={handleClick} />;
};
