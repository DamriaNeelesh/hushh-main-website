"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MultiPhotoUploadPanel from "../_components/socialOnboarding/MultiPhotoUploadPanel";
import { useAuth } from "../context/AuthContext";
import { uploadImages } from "../lib/api/socialOnboarding";
import ContentWrapper from "src/app/_components/layout/ContentWrapper";

const MIN_REQUIRED_PHOTOS = 3;
const MAX_PROFILE_PHOTOS = 5;

export default function SocialOnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [files, setFiles] = useState([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const allValid = files.length >= MIN_REQUIRED_PHOTOS;

  const handleContinue = async () => {
    setAttemptedSubmit(true);
    if (!allValid || authLoading) return;

    if (!user?.email) {
      router.push("/login");
      return;
    }

    try {
      setSubmitting(true);
      await uploadImages({ email: user.email, files });
      try {
        sessionStorage.setItem("hushh_social_images_count", String(files.length));
      } catch {}
      router.push("/social-onboarding/social-links");
    } catch (error) {
      console.error(error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContentWrapper>
      <section className="relative mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <section className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full border border-[rgba(23,27,41,0.12)] bg-white text-lg shadow-sm">
            <span aria-hidden>🙂</span>
          </div>
          <h1 className="m-0 text-[2rem] font-semibold tracking-[-0.03em] text-[#171b29] md:text-[2.6rem]">
            Add your best profile photos
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[0.98rem] leading-7 text-[#57524a] md:text-[1.05rem]">
            A single upload step keeps this clean. Add between {MIN_REQUIRED_PHOTOS} and{" "}
            {MAX_PROFILE_PHOTOS} recent photos so we can personalize the rest of your setup.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[rgba(23,27,41,0.08)] bg-white p-6 shadow-[0_24px_60px_rgba(10,17,40,0.06)] md:p-8 lg:p-10">
          <MultiPhotoUploadPanel
            files={files}
            onFilesChange={setFiles}
            minFiles={MIN_REQUIRED_PHOTOS}
            maxFiles={MAX_PROFILE_PHOTOS}
            showRequiredState={attemptedSubmit}
          />

          <div className="mt-8 flex flex-col gap-5 border-t border-[rgba(23,27,41,0.08)] pt-6 md:mt-10 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#73664f]">
                Step 1 of 4
              </p>
              <p className="text-sm leading-6 text-[#57524a]">
                Your photos stay within the onboarding flow and help shape the rest of your profile.
              </p>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={submitting}
              className="site-cta-solid w-full px-6 text-xs disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:min-w-[11rem]"
              aria-label="Continue"
            >
              {submitting ? "Uploading..." : "Continue"}
            </button>
          </div>
        </section>
      </section>
    </ContentWrapper>
  );
}
