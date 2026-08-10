import {
  CustomField,
  DefaultFields,
  EventCategory,
  EventFormState,
  EventPayload,
  FormSettings,
  Headliner,
  Prize,
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

  addHeadliner: () => void;
  updateHeadliner: (index: number, artistName: string) => void;
  setHeadlinerImage: (index: number, file: File | null) => void;
  removeHeadliner: (index: number) => void;

  addPrize: () => void;
  updatePrize: (
    index: number,
    field: "name" | "description",
    value: string,
  ) => void;
  setPrizeImage: (index: number, file: File | null) => void;
  removePrize: (index: number) => void;

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
  headliners: [],
  prizes: [],
  formSettings: { ...defaultFormSettings, customFields: [] },
};

const replaceImage = <T extends Headliner | Prize>(
  item: T,
  file: File | null,
): T => {
  if (item.imagePreview) URL.revokeObjectURL(item.imagePreview);

  return {
    ...item,
    imageFile: file,
    imagePreview: file ? URL.createObjectURL(file) : null,
  };
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

    addHeadliner: () => {
      set((state) => ({
        headliners: [
          ...state.headliners,
          { artistName: "", imageFile: null, imagePreview: null },
        ],
      }));
    },

    updateHeadliner: (index, artistName) => {
      set((state) => ({
        headliners: state.headliners.map((headliner, currentIndex) =>
          currentIndex === index ? { ...headliner, artistName } : headliner,
        ),
      }));
    },

    setHeadlinerImage: (index, file) => {
      set((state) => ({
        headliners: state.headliners.map((headliner, currentIndex) =>
          currentIndex === index
            ? replaceImage(headliner, file)
            : headliner,
        ),
      }));
    },

    removeHeadliner: (index) => {
      set((state) => {
        const removed = state.headliners[index];
        if (removed?.imagePreview) URL.revokeObjectURL(removed.imagePreview);
        return {
          headliners: state.headliners.filter((_, currentIndex) =>
            currentIndex !== index
          ),
        };
      });
    },

    addPrize: () => {
      set((state) => ({
        prizes: [
          ...state.prizes,
          { name: "", description: "", imageFile: null, imagePreview: null },
        ],
      }));
    },

    updatePrize: (index, field, value) => {
      set((state) => ({
        prizes: state.prizes.map((prize, currentIndex) =>
          currentIndex === index ? { ...prize, [field]: value } : prize,
        ),
      }));
    },

    setPrizeImage: (index, file) => {
      set((state) => ({
        prizes: state.prizes.map((prize, currentIndex) =>
          currentIndex === index ? replaceImage(prize, file) : prize,
        ),
      }));
    },

    removePrize: (index) => {
      set((state) => {
        const removed = state.prizes[index];
        if (removed?.imagePreview) URL.revokeObjectURL(removed.imagePreview);
        return {
          prizes: state.prizes.filter((_, currentIndex) =>
            currentIndex !== index
          ),
        };
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
                  input_type:
                    field.type === "Image"
                      ? ("file" as const)
                      : (field.type.toLowerCase() as "text" | "number" | "date"),
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
        ...(state.headliners.length > 0 && {
          headliner: state.headliners.map((headliner) => ({
            artist_name: headliner.artistName,
          })),
        }),
        ...(state.category === "Beauty Pageant" && state.prizes.length > 0 && {
          prizes: state.prizes.map((prize) => ({
            name: prize.name,
            description: prize.description,
          })),
        }),
        ...(formSettings && { form_settings: formSettings }),
      };
    },

    resetForm: () => {
      const state = get();
      if (state.thumbnailPreview) URL.revokeObjectURL(state.thumbnailPreview);
      if (state.bannerPreview) URL.revokeObjectURL(state.bannerPreview);
      state.headliners.forEach((item) => {
        if (item.imagePreview) URL.revokeObjectURL(item.imagePreview);
      });
      state.prizes.forEach((item) => {
        if (item.imagePreview) URL.revokeObjectURL(item.imagePreview);
      });
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
