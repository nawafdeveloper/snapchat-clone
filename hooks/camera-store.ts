import { create } from 'zustand';

type CameraStore = {
    flash: boolean;
    setFlash: (value: boolean) => void;
    face: "back" | "front";
    setFace: (value: "back" | "front") => void
    sound: string;
    setSound: (value: string) => void;
    nightMode: boolean;
    setNightMode: (value: boolean) => void;
    directorMode: boolean;
    setDirectorMode: (value: boolean) => void;
    multiSnap: boolean;
    setMultiSnap: (value: boolean) => void;
    dualCamera: boolean;
    setDualCamera: (value: boolean) => void;
    isTimerActive: boolean;
    setIsTimerActive: (value: boolean) => void;
    timerValue: number;
    setTimerValue: (value: number) => void;
    videoStability: boolean;
    setVideoStability: (value: boolean) => void;
    greenScreen: boolean;
    setGreenScreen: (value: boolean) => void;
    grid: boolean;
    setGrid: (value: boolean) => void;
    zoom: number;
    setZoom: (value: number) => void;
};

export const useCameraStore = create<CameraStore>((set) => ({
    flash: false,
    face: 'back',
    sound: '',
    nightMode: false,
    directorMode: false,
    multiSnap: false,
    dualCamera: false,
    isTimerActive: false,
    timerValue: 0,
    videoStability: false,
    greenScreen: false,
    grid: false,
    zoom: 0,

    setFlash: (value) => set({ flash: value }),
    setFace: (value) => set({ face: value }),
    setSound: (value) => set({ sound: value }),
    setNightMode: (value) => set({ nightMode: value }),
    setDirectorMode: (value) => set({ directorMode: value }),
    setMultiSnap: (value) => set({ multiSnap: value }),
    setDualCamera: (value) => set({ dualCamera: value }),
    setIsTimerActive: (value) => set({ isTimerActive: value }),
    setTimerValue: (value) => set({ timerValue: value }),
    setVideoStability: (value) => set({ videoStability: value }),
    setGreenScreen: (value) => set({ greenScreen: value }),
    setGrid: (value) => set({ grid: value }),
    setZoom: (value) => set({ zoom: value })
}));
