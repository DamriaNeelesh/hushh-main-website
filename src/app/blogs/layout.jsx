import React from "react";
import ContentWrapper from "../_components/layout/ContentWrapper";

export default function BlogLayout({ children }) {
  return (
    <ContentWrapper includeHeaderSpacing={true}>
      <div className="blog-theme blog-page-shell">{children}</div>
    </ContentWrapper>
  );
}
