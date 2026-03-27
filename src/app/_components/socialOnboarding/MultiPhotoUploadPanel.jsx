"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ACCEPTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];

function getFileKey(file) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function isAcceptedImage(file) {
  const normalizedName = file.name.toLowerCase();
  const extensionAccepted = ACCEPTED_EXTENSIONS.some((extension) => normalizedName.endsWith(extension));
  return ACCEPTED_MIME_TYPES.has(file.type) || extensionAccepted;
}

export default function MultiPhotoUploadPanel({
  files,
  onFilesChange,
  maxFiles = 5,
  minFiles = 3,
  showRequiredState = false,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [feedback, setFeedback] = useState("");

  const previews = useMemo(
    () =>
      files.map((file) => ({
        file,
        key: getFileKey(file),
        url: URL.createObjectURL(file),
      })),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const appendFiles = useCallback(
    (incomingFiles) => {
      const candidates = Array.from(incomingFiles || []);
      if (!candidates.length) return;

      const nextFiles = [...files];
      const seen = new Set(nextFiles.map(getFileKey));
      const rejectedFiles = [];
      let skippedForLimit = 0;

      candidates.forEach((file) => {
        if (!isAcceptedImage(file)) {
          rejectedFiles.push(file.name);
          return;
        }

        if (seen.has(getFileKey(file))) {
          return;
        }

        if (nextFiles.length >= maxFiles) {
          skippedForLimit += 1;
          return;
        }

        seen.add(getFileKey(file));
        nextFiles.push(file);
      });

      onFilesChange(nextFiles);

      if (rejectedFiles.length) {
        setFeedback(`Unsupported format: ${rejectedFiles.join(", ")}.`);
        return;
      }

      if (skippedForLimit > 0) {
        setFeedback(`Only ${maxFiles} photos can be uploaded at once.`);
        return;
      }

      setFeedback("");
    },
    [files, maxFiles, onFilesChange]
  );

  const handleInputChange = useCallback(
    (event) => {
      appendFiles(event.target.files);
      event.target.value = "";
    },
    [appendFiles]
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      appendFiles(event.dataTransfer.files);
    },
    [appendFiles]
  );

  const removeAtIndex = useCallback(
    (indexToRemove) => {
      onFilesChange(files.filter((_, index) => index !== indexToRemove));
      setFeedback("");
    },
    [files, onFilesChange]
  );

  const clearAll = useCallback(() => {
    onFilesChange([]);
    setFeedback("");
  }, [onFilesChange]);

  const hasRequiredError = showRequiredState && files.length < minFiles;

  return (
    <div className="space-y-6">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-label="Upload profile photos"
        className={`rounded-[2rem] border border-dashed px-6 py-8 md:px-8 md:py-10 transition-all ${
          hasRequiredError
            ? "border-red-300 bg-red-50/70"
            : isDragging
            ? "border-[#171b29] bg-[#f8f6f1]"
            : "border-[rgba(23,27,41,0.16)] bg-[#faf8f4]"
        }`}
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-[rgba(23,27,41,0.12)] bg-white shadow-sm">
            <span className="text-3xl text-[#171b29]" aria-hidden>
              +
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#171b29]">
              Upload up to {maxFiles} profile photos
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-6 text-[#57524a] md:text-[0.98rem]">
              Use one upload area for your best recent photos. JPG, PNG, WEBP, HEIC, and HEIF are
              supported. Add at least {minFiles} to continue.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="site-cta-solid px-5 text-xs md:text-[0.78rem]"
            >
              Choose photos
            </button>
            {files.length > 0 ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  clearAll();
                }}
                className="site-cta-outline-branded px-5 text-xs md:text-[0.78rem]"
              >
                Clear selection
              </button>
            ) : null}
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#73664f]">
            {files.length} / {maxFiles} selected
          </p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple
            accept={ACCEPTED_EXTENSIONS.join(",")}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {feedback ? <p className="text-sm font-medium text-[#8a5a2b]">{feedback}</p> : null}

      {hasRequiredError ? (
        <p className="text-sm font-medium text-[#b42318]">
          Please upload at least {minFiles} photos before continuing.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {previews.map((preview, index) => (
          <article
            key={preview.key}
            className="overflow-hidden rounded-[1.5rem] border border-[rgba(23,27,41,0.08)] bg-white shadow-[0_18px_40px_rgba(10,17,40,0.08)]"
          >
            <div className="aspect-[4/5] bg-[#f2efe8]">
              <img src={preview.url} alt={preview.file.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#171b29]">{preview.file.name}</p>
                <p className="mt-1 text-xs text-[#73664f]">
                  {(preview.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeAtIndex(index)}
                className="rounded-full border border-[rgba(23,27,41,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#171b29] transition-colors hover:bg-[#f8f6f1]"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
