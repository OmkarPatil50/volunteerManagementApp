import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    try {
      const response = await fetch(
        "https://volunteer-management-application.omkarpatil20.repl.co/volunteers"
      );
      const result = await response.json();
      return result.volunteers;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addVolunteer = createAsyncThunk(
  "volunteers/addVolunteer",
  async (newVolunteerData) => {
    try {
      const response = await fetch(
        "https://volunteer-management-application.omkarpatil20.repl.co/volunteers",
        {
          method: "POST",
          body: JSON.stringify(newVolunteerData),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      return result.volunteer;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateVolunteer = createAsyncThunk(
  "volunteers/updateVolunteer",
  async ({ id, newVolunteer }) => {
    try {
      const response = await fetch(
        `https://volunteer-management-application.omkarpatil20.repl.co/volunteers/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newVolunteer),
          headers: {
            "Content-type": "application/json"
          }
        }
      );
      const result = await response.json();
      return result.volunteers;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteVolunteer = createAsyncThunk(
  "volunteers/deleteVolunteer",
  async (id) => {
    try {
      const response = await fetch(
        `https://volunteer-management-application.omkarpatil20.repl.co/volunteers/${id}`,
        {
          method: "DELETE"
        }
      );
      const result = await response.json();
      return result.volunteers;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  volunteers: [],
  status: "idle",
  error: null
};

export const volunteerSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVolunteers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchVolunteers.fulfilled, (state, action) => {
      state.status = "idle";
      state.volunteers = action.payload;
      state.error = null;
    });
    builder.addCase(fetchVolunteers.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(addVolunteer.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addVolunteer.fulfilled, (state, action) => {
      state.status = "idle";
      state.volunteers.push(action.payload);
      state.error = null;
    });
    builder.addCase(addVolunteer.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(deleteVolunteer.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteVolunteer.fulfilled, (state, action) => {
      state.status = "idle";
      state.volunteers = action.payload;
      state.error = null;
    });
    builder.addCase(deleteVolunteer.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
    builder.addCase(updateVolunteer.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateVolunteer.fulfilled, (state, action) => {
      state.status = "idle";
      state.volunteers = action.payload;
      state.error = null;
    });
    builder.addCase(updateVolunteer.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload.error;
    });
  }
});
