"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { toast } from "sonner";

import { useUpdatePartnerEvent } from "@/lib/hooks/useUpdatePartnerEvent";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";
import type { EventPayload } from "@/lib/types/events";
import type { PartnerEventSettings } from "@/lib/types/settings";

export interface EditableSettingsTicket {
  clientId: string;
  name: string;
  price: string;
  capacity: string;
}

type TicketField = "name" | "price" | "capacity";

const getInitialTickets = (
  event: PartnerEventSettings,
): EditableSettingsTicket[] =>
  event.ticketTypes.map((ticket) => ({
    clientId: ticket.clientId,
    name: ticket.name,
    price: ticket.price === null ? "" : String(ticket.price),
    capacity: ticket.capacity === null ? "" : String(ticket.capacity),
  }));

const getValidMoney = (value: string) => {
  const trimmedValue = value.trim();

  if (!/^\d+(?:\.\d{1,2})?$/.test(trimmedValue)) {
    return null;
  }

  const parsed = Number(trimmedValue);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const getValidCapacity = (value: string) => {
  const trimmedValue = value.trim();

  if (!/^\d+$/.test(trimmedValue)) {
    return null;
  }

  const parsed = Number(trimmedValue);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
};

const getTicketDraftSignature = (tickets: EditableSettingsTicket[]) =>
  JSON.stringify(
    tickets.map(({ name, price, capacity }) => [name, price, capacity]),
  );

export const useEventTicketsForm = (event: PartnerEventSettings) => {
  const initialTicketValues = getInitialTickets(event);
  const initialServiceFeeValue =
    event.serviceFee === null ? "" : String(event.serviceFee);
  const initialTickets = useRef(initialTicketValues);
  const initialServiceFee = useRef(initialServiceFeeValue);
  const [tickets, setTickets] = useState(() => initialTicketValues);
  const [serviceFee, setServiceFee] = useState(
    () => initialServiceFeeValue,
  );
  const nextTicketId = useRef(0);
  const mutation = useUpdatePartnerEvent();

  const updateTicket = (
    clientId: string,
    field: TicketField,
    value: string,
  ) => {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.clientId === clientId
          ? { ...ticket, [field]: value }
          : ticket,
      ),
    );
  };

  const addTicket = () => {
    nextTicketId.current += 1;
    setTickets((current) => [
      ...current,
      {
        clientId: `new:${Date.now()}:${nextTicketId.current}`,
        name: "",
        price: "",
        capacity: "",
      },
    ]);
  };

  const removeTicket = (clientId: string) => {
    setTickets((current) =>
      current.filter((ticket) => ticket.clientId !== clientId),
    );
  };

  const handleSubmit = (submitEvent: SubmitEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    const ticketsChanged =
      getTicketDraftSignature(tickets) !==
      getTicketDraftSignature(initialTickets.current);
    const serviceFeeChanged = serviceFee !== initialServiceFee.current;

    if (!ticketsChanged && !serviceFeeChanged) {
      toast.info("There are no changes to save");
      return;
    }

    let ticketTypes: Array<{
      type: string;
      price: number;
      capacity: number;
    }> = [];

    if (ticketsChanged) {
      if (tickets.length === 0) {
        toast.error("Add at least one ticket type");
        return;
      }

      const normalizedNames = tickets.map((ticket) =>
        ticket.name.trim().toLocaleLowerCase(),
      );

      if (normalizedNames.some((name) => !name)) {
        toast.error("Every ticket type needs a name");
        return;
      }

      if (new Set(normalizedNames).size !== normalizedNames.length) {
        toast.error("Ticket type names must be unique");
        return;
      }

      const parsedTickets = tickets.map((ticket) => ({
        type: ticket.name.trim(),
        price: getValidMoney(ticket.price),
        capacity: getValidCapacity(ticket.capacity),
      }));

      if (parsedTickets.some((ticket) => ticket.price === null)) {
        toast.error("Enter a valid non-negative price for every ticket");
        return;
      }

      if (parsedTickets.some((ticket) => ticket.capacity === null)) {
        toast.error("Every ticket capacity must be a positive whole number");
        return;
      }

      ticketTypes = parsedTickets.map((ticket) => ({
        type: ticket.type,
        price: ticket.price as number,
        capacity: ticket.capacity as number,
      }));
    }

    const parsedServiceFee = serviceFeeChanged
      ? getValidMoney(serviceFee)
      : null;

    if (serviceFeeChanged && parsedServiceFee === null) {
      toast.error("Enter a valid non-negative service fee");
      return;
    }

    const patch: Partial<EventPayload> = {};

    if (serviceFeeChanged) {
      patch.service_fee = parsedServiceFee as number;
    }

    if (ticketsChanged) {
      patch.ticket_types = ticketTypes;
    }

    mutation.mutate(
      {
        eventId: event.eventId,
        patch,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Ticket details updated");

          if (ticketsChanged) {
            const submittedTickets = tickets.map((ticket, index) => ({
              ...ticket,
              name: ticketTypes[index].type,
              price: String(ticketTypes[index].price),
              capacity: String(ticketTypes[index].capacity),
            }));

            initialTickets.current = submittedTickets;
            setTickets(submittedTickets);
          }

          if (serviceFeeChanged) {
            const submittedServiceFee = String(parsedServiceFee);
            initialServiceFee.current = submittedServiceFee;
            setServiceFee(submittedServiceFee);
          }
        },
        onError: (error) => {
          promiseErrorFunction(error as ApiErrorResponse);
        },
      },
    );
  };

  return {
    tickets,
    serviceFee,
    isPending: mutation.isPending,
    setServiceFee,
    updateTicket,
    addTicket,
    removeTicket,
    handleSubmit,
  };
};
