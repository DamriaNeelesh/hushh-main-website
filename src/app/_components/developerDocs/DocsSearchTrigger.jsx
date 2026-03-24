"use client";

export default function DocsSearchTrigger({ className = "" }) {
  const handleClick = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        metaKey: true,
        bubbles: true,
      }),
    );
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      Search docs
    </button>
  );
}
