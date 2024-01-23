import React, { createContext, useState } from 'react';

export const DataContext = createContext('')

export const DataProvider = ({ children }) => {
    const test1 = true
    const test2 = false

    return (
        <DataContext.Provider value={{
            test1,test2
        }}>
            {children}
        </DataContext.Provider>
    );
}