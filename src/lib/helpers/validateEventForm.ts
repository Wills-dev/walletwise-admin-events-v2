import { EventFormState } from "../types/events";
import { getLocalDate } from "./getLocalDate";

export type ValidationErrors = Partial<Record<string, string>>;

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validateEventForm(state: EventFormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!state.title.trim()) errors.title = "Event title is required";
  if (!state.description.trim()) errors.description = "Description is required";
  if (!state.category) errors.category = "Category is required";
  if (!state.address.trim()) errors.address = "Address is required";
  if (!state.date) {
    errors.date = "Date is required";
  } else if (state.date < getLocalDate()) {
    errors.date = "Event date cannot be in the past";
  }
  if (!state.time) errors.time = "Start time is required";
  if (!state.endTime) {
    errors.endTime = "End time is required";
  } else if (state.time && state.endTime <= state.time) {
    errors.endTime = "End time must be later than start time";
  }
  if (!state.thumbnailFile) {
    errors.thumbnailFile = "Thumbnail image is required";
  } else if (!SUPPORTED_IMAGE_TYPES.includes(state.thumbnailFile.type)) {
    errors.thumbnailFile = "Thumbnail must be a JPG, PNG, or WEBP image";
  } else if (state.thumbnailFile.size > MAX_IMAGE_SIZE) {
    errors.thumbnailFile = "Thumbnail must not exceed 10 MB";
  }

  if (
    state.bannerFile &&
    !SUPPORTED_IMAGE_TYPES.includes(state.bannerFile.type)
  ) {
    errors.bannerFile = "Event page image must be a JPG, PNG, or WEBP image";
  } else if (state.bannerFile && state.bannerFile.size > MAX_IMAGE_SIZE) {
    errors.bannerFile = "Event page image must not exceed 10 MB";
  }

  const confirmedTickets = Object.entries(state.ticketTypes).filter(
    ([, t]) => t.confirmed,
  );
  const unconfirmedTickets = Object.entries(state.ticketTypes).filter(
    ([, t]) => !t.confirmed,
  );

  if (confirmedTickets.length === 0) {
    errors.ticketTypes = "At least one ticket type must be added";
  } else {
    confirmedTickets.forEach(([key, t]) => {
      if (!t.price || isNaN(Number(t.price))) {
        errors[`ticket_${key}_price`] =
          `"${t.name}" ticket must have a valid price`;
      }
      if (!t.quantity || t.quantity <= 0) {
        errors[`ticket_${key}_quantity`] =
          `"${t.name}" ticket must have a valid capacity`;
      }
    });
  }

  if (unconfirmedTickets.length > 0) {
    errors.unconfirmedTickets =
      "Some ticket types haven't been confirmed. Click 'Add' to confirm or remove them.";
  }

  if (state.category === "Beauty Pageant" && state.formSettings) {
    const unconfirmedFields = state.formSettings.customFields.filter(
      (f) => !f.confirmed,
    );
    if (unconfirmedFields.length > 0) {
      errors.customFields =
        "Some custom fields haven't been confirmed. Click 'Add' to confirm or remove them.";
    }
  }

  state.headliners.forEach((headliner, index) => {
    if (!headliner.artistName.trim()) {
      errors[`headliner_${index}_name`] =
        `Headliner ${index + 1} must have an artist name`;
    }
    if (!headliner.imageFile) {
      errors[`headliner_${index}_image`] =
        `Headliner ${index + 1} must have a matching image`;
    } else if (!SUPPORTED_IMAGE_TYPES.includes(headliner.imageFile.type)) {
      errors[`headliner_${index}_image`] =
        `Headliner ${index + 1} image must be JPG, PNG, or WEBP`;
    } else if (headliner.imageFile.size > MAX_IMAGE_SIZE) {
      errors[`headliner_${index}_image`] =
        `Headliner ${index + 1} image must not exceed 10 MB`;
    }
  });

  if (state.category === "Beauty Pageant") {
    state.prizes.forEach((prize, index) => {
      if (!prize.name.trim()) {
        errors[`prize_${index}_name`] =
          `Prize ${index + 1} must have a name`;
      }
      if (!prize.description.trim()) {
        errors[`prize_${index}_description`] =
          `Prize ${index + 1} must have a description`;
      }
      if (!prize.imageFile) {
        errors[`prize_${index}_image`] =
          `Prize ${index + 1} must have a matching image`;
      } else if (!SUPPORTED_IMAGE_TYPES.includes(prize.imageFile.type)) {
        errors[`prize_${index}_image`] =
          `Prize ${index + 1} image must be JPG, PNG, or WEBP`;
      } else if (prize.imageFile.size > MAX_IMAGE_SIZE) {
        errors[`prize_${index}_image`] =
          `Prize ${index + 1} image must not exceed 10 MB`;
      }
    });
  }

  return errors;
}
