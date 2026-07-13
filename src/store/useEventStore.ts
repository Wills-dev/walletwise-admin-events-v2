import {
  CustomField,
  DefaultFields,
  DefaultFieldsPayload,
  EventCategory,
  EventFormState,
  EventPayload,
  FormSettings,
  TicketType,
} from "@/lib/types/events";
import { create } from "zustand";

interface EventActions {
  handleChange: (field: keyof EventFormState, value: string | number) => void;

  handleImageChange: (file: File | null) => void;
  clearImage: () => void;

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
  category: "beauty_pageant",
  address: "",
  date: "",
  time: "",
  endTime: "",
  imageFile: null,
  imagePreview: null,
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

    handleImageChange: (file) => {
      if (!file) return;

      const prev = get().imagePreview;
      if (prev) URL.revokeObjectURL(prev);

      const preview = URL.createObjectURL(file);
      set({ imageFile: file, imagePreview: preview });
    },

    clearImage: () => {
      const prev = get().imagePreview;
      if (prev) URL.revokeObjectURL(prev);
      set({ imageFile: null, imagePreview: null });
    },

    handleCategoryChange: (category) => {
      const isPageant = category === "beauty_pageant";

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

      let formSettings = null;
      if (state.formSettings) {
        const strippedDefaultFields = Object.fromEntries(
          Object.entries(state.formSettings.defaultFields).map(
            ([key, meta]) => [key, meta.value],
          ),
        ) as DefaultFieldsPayload;

        formSettings = {
          defaultFields: strippedDefaultFields,
          customFields: state.formSettings.customFields
            .filter((f) => f.confirmed)
            .map(({ confirmed, ...rest }) => rest),
        };
      }

      return {
        title: state.title,
        description: state.description,
        category: state.category,
        address: state.address,
        date: state.date,
        time: state.time,
        endTime: state.endTime,
        serviceFee: state.serviceFee,
        refundPolicy: state.refundPolicy,
        ticketTypes: Object.fromEntries(
          Object.entries(state.ticketTypes)
            .filter(([, t]) => t.confirmed)
            .map(([key, { confirmed, name, ...rest }]) => [
              key,
              {
                name,
                ...rest,
              },
            ]),
        ),
        formSettings,
      };
    },

    resetForm: () => set(initialState),
  }),
);
