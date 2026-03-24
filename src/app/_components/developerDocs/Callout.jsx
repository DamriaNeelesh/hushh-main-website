export default function Callout({ type = "info", children }) {
  return (
    <div className={`docs-callout docs-callout--${type}`}>
      <div className="docs-callout-label">{type}</div>
      <div className="docs-callout-body">{children}</div>
    </div>
  );
}
