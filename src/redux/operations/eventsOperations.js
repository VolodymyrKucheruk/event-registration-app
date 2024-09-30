import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const API_URL =
  "https://event-registration-app-backend-evmo.onrender.com/api/events";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({
    page = 1,
    limit = 20,
    sortBy = "title",
    order = "asc",
    title,
    organizer,
    eventDateFrom,
    eventDateTo,
  }) => {
    const response = await axios.get(API_URL, {
      params: {
        page,
        limit,
        sortBy,
        order,
        title,
        organizer,
        eventDateFrom,
        eventDateTo,
      },
    });

    const events = response.data.events.map((event) => ({
      ...event,
      tempId: nanoid(),
    }));

    return events;
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, updatedData }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);
