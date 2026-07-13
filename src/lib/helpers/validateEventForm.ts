import { EventFormState } from "../types/events";

export type ValidationErrors = Partial<Record<string, string>>;

export function validateEventForm(state: EventFormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!state.title.trim()) errors.title = "Event title is required";
  if (!state.description.trim()) errors.description = "Description is required";
  if (!state.address.trim()) errors.address = "Address is required";
  if (!state.date) errors.date = "Date is required";
  if (!state.time) errors.time = "Start time is required";
  if (!state.endTime) errors.endTime = "End time is required";
  if (!state.imageFile) errors.imageFile = "Event image is required";

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

  if (state.category === "beauty_pageant" && state.formSettings) {
    const unconfirmedFields = state.formSettings.customFields.filter(
      (f) => !f.confirmed,
    );
    if (unconfirmedFields.length > 0) {
      errors.customFields =
        "Some custom fields haven't been confirmed. Click 'Add' to confirm or remove them.";
    }
  }

  return errors;
}
