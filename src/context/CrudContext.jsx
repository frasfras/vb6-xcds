import React, { createContext, useContext, useReducer } from 'react';

// Actions
const ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  SELECT: 'SELECT',
  LOAD: 'LOAD',
};

// Reducer
const crudReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CREATE:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    
    case ACTIONS.UPDATE:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload.data } : item
        ),
      };
    
    case ACTIONS.DELETE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        selectedItem: state.selectedItem?.id === action.payload ? null : state.selectedItem,
      };
    
    case ACTIONS.SELECT:
      return {
        ...state,
        selectedItem: action.payload,
      };
    
    case ACTIONS.LOAD:
      return {
        ...state,
        items: action.payload,
      };
    
    default:
      return state;
  }
};

// Context
const CrudContext = createContext();

// Provider
export const CrudProvider = ({ children, initialItems = [] }) => {
  const [state, dispatch] = useReducer(crudReducer, {
    items: initialItems,
    selectedItem: null,
  });

  const create = (item) => {
    dispatch({ type: ACTIONS.CREATE, payload: { ...item, id: Date.now() } });
  };

  const update = (id, data) => {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, data } });
  };

  const remove = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  };

  const select = (item) => {
    dispatch({ type: ACTIONS.SELECT, payload: item });
  };

  const load = (items) => {
    dispatch({ type: ACTIONS.LOAD, payload: items });
  };

  return (
    <CrudContext.Provider value={{ ...state, create, update, remove, select, load }}>
      {children}
    </CrudContext.Provider>
  );
};

// Hook
export const useCrudContext = () => {
  const context = useContext(CrudContext);
  if (!context) {
    throw new Error('useCrudContext must be used within CrudProvider');
  }
  return context;
};
