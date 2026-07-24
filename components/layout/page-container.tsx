import type { ComponentPropsWithoutRef } from "react";

type PageContainerProps = ComponentPropsWithoutRef<"div">;

export function PageContainer({
  className = "",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={["page-container", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
