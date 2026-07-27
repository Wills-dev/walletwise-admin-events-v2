"use client";

import { ArrowRight, CircleCheckBig, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";

interface EventSubmissionSuccessProps {
  redirectSeconds: number;
  onViewEvents: () => void;
}

const EventSubmissionSuccess = ({
  redirectSeconds,
  onViewEvents,
}: EventSubmissionSuccessProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto flex min-h-[65vh] w-full max-w-150 items-center justify-center"
    >
      <div className="w-full rounded-2xl border border-[#E5E5E5] bg-white px-6 py-10 text-center shadow-sm sm:px-10">
        <motion.div
          initial={{ scale: 0.6, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#F0EAFE] text-[#5A27CC]"
        >
          <CircleCheckBig className="size-8" aria-hidden="true" />
        </motion.div>

        <h1 className="mt-6 text-xl font-semibold text-[#262626] sm:text-2xl">
          Event uploaded successfully
        </h1>
        <p className="mx-auto mt-3 max-w-110 text-sm leading-6 text-[#737373]">
          Your event has been submitted and is now waiting for approval. We’ll
          make it available to attendees once the review is complete.
        </p>

        <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-[#F5F5F5] px-4 py-2 text-sm text-[#525252]">
          <Clock3 className="size-4 text-[#5A27CC]" aria-hidden="true" />
          Redirecting to All Events in{" "}
          <strong className="tabular-nums">{redirectSeconds}s</strong>
        </div>

        <div className="mx-auto mt-8 max-w-70">
          <Button type="button" onClick={onViewEvents}>
            <span className="flex items-center gap-2">
              View all events
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default EventSubmissionSuccess;
