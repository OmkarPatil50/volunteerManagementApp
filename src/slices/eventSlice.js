import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await fetch(
      "https://volunteer-management-application.omkarpatil20.repl.co/events"
    );
    const result = await response.json();
    return result.events;
  } catch (error) {
    console.error(error);
  }
});

export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (newEventData) => {
    try {
      const response = await fetch(
        "https://volunteer-management-application.omkarpatil20.repl.co/events",
        {
          method: "POST",
          body: JSON.stringify(newEventData),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      return result.event;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ _id: id, newEvent }) => {
    try {
      const response = await fetch(
        `https://volunteer-management-application.omkarpatil20.repl.co/events/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newEvent),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      return result.events;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id) => {
    try {
      const response = await fetch(
        `https://volunteer-management-application.omkarpatil20.repl.co/events/${id}`,
        {
          method: "DELETE"
        }
      );
      const result = await response.json();
      return result.events;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  events: [],
  status: "idle",
  error: null
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.status = "idle";
      state.events = action.payload;
      state.error = null;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(addEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.status = "idle";
      state.events.push(action.payload);
      state.error = null;
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(deleteEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.status = "idle";
      state.events = action.payload;
      state.error = null;
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(updateEvent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.status = "idle";
      state.events = action.payload;
      state.error = null;
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
  }
});
