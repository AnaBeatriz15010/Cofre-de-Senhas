import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Account = {
    id: string;
    site: string;
    image?: string;
    username: string;
    password: string;
};

export type Profile = { name: string; email: string };
type AccountData = Omit<Account, 'id'>;

const DEAFULT_PASSWORD = '1234';
const K = {
    pass: 'app_password',
    profile: 'profile',
    accounts: 'accounts',
};

async function readJSON<T>(key: string, fallback: T): Promise<T> {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse (value) : fallback;
    } catch (error) {
        console.warn(`Falha ao ler ${key}.`, error);
        return fallback;
    }
}

async function writeJSON(key: string, value: unknown): Promise <void> {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Falha ao gravar ${key}.`, error);
    }
}