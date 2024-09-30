import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
  "https://event-registration-app-backend-evmo.onrender.com/api/participants";

export const fetchParticipants = createAsyncThunk(
  "participants/fetchParticipants",
  async ({ eventId, searchQuery = "" }) => {
    const response = await axios.get(`${API_URL}/${eventId}`, {
      params: { search: searchQuery },
    });
    return response.data;
  }
);

export const registerParticipant = createAsyncThunk(
  "participants/registerParticipant",
  async (participantData) => {
    const response = await axios.post(`${API_URL}/register`, participantData);
    return response.data;
  }
);
