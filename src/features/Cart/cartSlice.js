import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, deleteItem, updateItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};


export const fetchAsyncCart = createAsyncThunk(
  'cart/fetchitems',
  async () => {
    const response = await fetchItems();

    return response.data;
  }
);

export const addAsync = createAsyncThunk(
  'cart/additem',
  async (item) => {
    const { id, title, thumbnail, price } = item;
    const response = await addItem({ id, title, thumbnail, price, quantity: 1 });

    return response.data;
  }
);

export const deleteAsync = createAsyncThunk(
  'cart/deleteitem',
  async (id) => {
    await deleteItem(id);

    return id;
  }
);

export const updateAsync = createAsyncThunk(
  'cart/updateitem',
  async ({ id, change }) => {
    const response = await updateItem(id, change);

    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncCart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      }).addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      }).addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload)
        state.items.splice(index, 1);
      }).addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const { increment } = cartSlice.actions;



export default cartSlice.reducer;
