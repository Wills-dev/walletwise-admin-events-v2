import {
  CustomField,
  DefaultFields,
  EventCategory,
  EventFormState,
  EventPayload,
  FormSettings,
  TicketType,
} from "@/lib/types/events";
import { create } from "zustand";

interface EventActions {
  handleChange: (field: keyof EventFormState, value: string | number) => void;

  handleThumbnailChange: (file: File | null) => void;
  clearThumbnail: () => void;
  handleBannerChange: (file: File | null) => void;
  clearBanner: () => void;

  handleCategoryChange: (category: EventCategory) => void;

  handleTicketChange: (
    ticketKey: string,
    field: keyof TicketType,
    value: string | number,
  ) => void;
  addTicketType: () => void;
  confirmTicketType: (tempKey: string) => void;
  editTicketType: (key: string) => void;
  removeTicketType: (ticketKey: string) => void;

  handleDefaultFieldToggle: (field: keyof DefaultFields) => void;
  addCustomField: () => void;
  updateCustomField: (
    index: number,
    key: keyof CustomField,
    value: string | boolean,
  ) => void;

  toggleCustomFieldRequired: (index: number) => void;
  confirmCustomField: (index: number) => void;
  editCustomField: (index: number) => void;
  removeCustomField: (index: number) => void;

  buildPayload: () => EventPayload;
  resetForm: () => void;
}

const defaultFormSettings: FormSettings = {
  defaultFields: {
    fullName: {
      label: "Full Name",
      description: "Contestant's legal full name",
      value: true,
    },
    dob: {
      label: "Date of Birth",
      description: "mm/dd/yyyy",
      value: true,
    },
    stateOfOrigin: {
      label: "State of Origin",
      description: "e.g. Lagos",
      value: true,
    },
  },
  customFields: [],
};

const initialState: EventFormState = {
  title: "",
  description: "",
  category: "",
  address: "",
  date: "",
  time: "",
  endTime: "",
  thumbnailFile: null,
  thumbnailPreview: null,
  bannerFile: null,
  bannerPreview: null,
  serviceFee: 0,
  refundPolicy: "",
  ticketTypes: {
    regular: { name: "Regular", price: "", quantity: 0, confirmed: false },
  },
  formSettings: { ...defaultFormSettings, customFields: [] },
};

export const useEventStore = create<EventFormState & EventActions>(
  (set, get) => ({
    ...initialState,

    handleChange: (field, value) => {
      set({ [field]: value } as Partial<EventFormState>);
    },

    handleThumbnailChange: (file) => {
      if (!file) return;

      const prev = get().thumbnailPreview;
      if (prev) URL.revokeObjectURL(prev);

      const preview = URL.createObjectURL(file);
      set({ thumbnailFile: file, thumbnailPreview: preview });
    },

    clearThumbnail: () => {
      const prev = get().thumbnailPreview;
      if (prev) URL.revokeObjectURL(prev);
      set({ thumbnailFile: null, thumbnailPreview: null });
    },

    handleBannerChange: (file) => {
      if (!file) return;

      const prev = get().bannerPreview;
      if (prev) URL.revokeObjectURL(prev);

      const preview = URL.createObjectURL(file);
      set({ bannerFile: file, bannerPreview: preview });
    },

    clearBanner: () => {
      const prev = get().bannerPreview;
      if (prev) URL.revokeObjectURL(prev);
      set({ bannerFile: null, bannerPreview: null });
    },

    handleCategoryChange: (category) => {
      const isPageant = category === "Beauty Pageant";

      set({
        category,
        ticketTypes: {
          regular: {
            name: "Regular",
            price: "",
            quantity: 0,
            confirmed: false,
          },
        },
        formSettings: isPageant
          ? { ...defaultFormSettings, customFields: [] }
          : null,
      });
    },

    handleTicketChange: (ticketKey, field, value) => {
      set((state) => ({
        ticketTypes: {
          ...state.ticketTypes,
          [ticketKey]: {
            ...state.ticketTypes[ticketKey],
            [field]: value,
          },
        },
      }));
    },

    addTicketType: () => {
      // key is a temp uid — replaced with the real name key on confirm
      const tempKey = `ticket_${Date.now()}`;
      set((state) => ({
        ticketTypes: {
          ...state.ticketTypes,
          [tempKey]: { name: "", price: "", quantity: 0, confirmed: false },
        },
      }));
    },

    confirmTicketType: (tempKey) => {
      set((state) => {
        const ticket = state.ticketTypes[tempKey];
        if (!ticket || !ticket.name.trim()) return state;

        const finalKey = ticket.name.toLowerCase().replace(/\s+/g, "_");
        const updated = { ...state.ticketTypes };
        delete updated[tempKey];
        updated[finalKey] = { ...ticket, confirmed: true };
        return { ticketTypes: updated };
      });
    },

    editTicketType: (key) => {
      set((state) => ({
        ticketTypes: {
          ...state.ticketTypes,
          [key]: { ...state.ticketTypes[key], confirmed: false },
        },
      }));
    },

    removeTicketType: (ticketKey) => {
      set((state) => {
        const updated = { ...state.ticketTypes };
        delete updated[ticketKey];
        return { ticketTypes: updated };
      });
    },

    handleDefaultFieldToggle: (field) => {
      set((state) => {
        if (!state.formSettings) return state;
        return {
          formSettings: {
            ...state.formSettings,
            defaultFields: {
              ...state.formSettings.defaultFields,
              [field]: {
                ...state.formSettings.defaultFields[field],
                value: !state.formSettings.defaultFields[field].value,
              },
            },
          },
        };
      });
    },

    addCustomField: () => {
      set((state) => {
        if (!state.formSettings) return state;
        const newField: CustomField = {
          name: "",
          type: "Text",
          required: false,
          confirmed: false,
        };
        return {
          formSettings: {
            ...state.formSettings,
            customFields: [...state.formSettings.customFields, newField],
          },
        };
      });
    },

    confirmCustomField: (index) => {
      set((state) => {
        if (!state.formSettings) return state;
        const updated = state.formSettings.customFields.map((field, i) =>
          i === index ? { ...field, confirmed: true } : field,
        );
        return {
          formSettings: { ...state.formSettings, customFields: updated },
        };
      });
    },

    editCustomField: (index) => {
      set((state) => {
        if (!state.formSettings) return state;
        const updated = state.formSettings.customFields.map((field, i) =>
          i === index ? { ...field, confirmed: false } : field,
        );
        return {
          formSettings: { ...state.formSettings, customFields: updated },
        };
      });
    },

    updateCustomField: (index, key, value) => {
      set((state) => {
        if (!state.formSettings) return state;
        const updated = state.formSettings.customFields.map((field, i) =>
          i === index ? { ...field, [key]: value } : field,
        );
        return {
          formSettings: { ...state.formSettings, customFields: updated },
        };
      });
    },

    toggleCustomFieldRequired: (index) => {
      set((state) => {
        if (!state.formSettings) return state;
        const updated = state.formSettings.customFields.map((field, i) =>
          i === index ? { ...field, required: !field.required } : field,
        );
        return {
          formSettings: { ...state.formSettings, customFields: updated },
        };
      });
    },

    removeCustomField: (index) => {
      set((state) => {
        if (!state.formSettings) return state;
        return {
          formSettings: {
            ...state.formSettings,
            customFields: state.formSettings.customFields.filter(
              (_, i) => i !== index,
            ),
          },
        };
      });
    },

    buildPayload: () => {
      const state = get();

      const formSettings =
        state.category === "Beauty Pageant" && state.formSettings
          ? {
              full_name: {
                input_type: "text" as const,
                is_required:
                  state.formSettings.defaultFields.fullName.value,
              },
              date_of_birth: {
                input_type: "date" as const,
                is_required: state.formSettings.defaultFields.dob.value,
              },
              state_of_origin: {
                input_type: "text" as const,
                is_required:
                  state.formSettings.defaultFields.stateOfOrigin.value,
              },
              custom_fields: state.formSettings.customFields
                .filter((f) => f.confirmed)
                .map((field) => ({
                  field_name: field.name,
                  input_type: field.type.toLowerCase() as Lowercase<
                    typeof field.type
                  >,
                  is_required: field.required,
                })),
            }
          : undefined;

      return {
        title: state.title,
        description: state.description,
        category: state.category as EventCategory,
        address: state.address,
        date: state.date,
        time: state.time,
        end_time: state.endTime,
        service_fee: state.serviceFee,
        refund_policy: state.refundPolicy,
        ticket_types: Object.entries(state.ticketTypes)
          .filter(([, ticket]) => ticket.confirmed)
          .map(([, ticket]) => ({
            type: ticket.name,
            price: Number(ticket.price),
            capacity: ticket.quantity,
          })),
        ...(formSettings && { form_settings: formSettings }),
      };
    },

    resetForm: () => {
      const state = get();
      if (state.thumbnailPreview) URL.revokeObjectURL(state.thumbnailPreview);
      if (state.bannerPreview) URL.revokeObjectURL(state.bannerPreview);
      set({
        ...initialState,
        ticketTypes: {
          regular: {
            name: "Regular",
            price: "",
            quantity: 0,
            confirmed: false,
          },
        },
        formSettings: { ...defaultFormSettings, customFields: [] },
      });
    },
  }),
);
