import { Colors } from "@/constants/theme";
import { useCameraStore } from "@/hooks/camera-store";
import { ArrowsRoundedOutline, FlashSlashOutline, GreenScreenOutline, GridOutline, MoonOutline, MultiCameraOutline, MultiCardOutline, MusicOutline, StabilizerOutline, TimerOutline, VideoStarOutline } from "../icons";

const toggleCameraFace = () => {
    const { face, setFace } = useCameraStore.getState();
    face === 'back' ? setFace('front') : setFace('back');
};

const toggleCameraFlash = () => {
    const { setFlash, flash } = useCameraStore.getState();
    setFlash(!flash);
};

export const rightSideItemList = [
    {
        key: 'multi-snap',
        title: 'Multi Snap',
        icons: <MultiCardOutline size={24} color={Colors.dark.text} />,
        onPress: () => { }
    },
    {
        key: 'dual-camera',
        title: 'Dual Camera',
        icons: <MultiCameraOutline size={24} color={Colors.dark.text} />,
        onPress: () => { }
    },
    {
        key: 'timer',
        title: 'Timer',
        icons: <TimerOutline size={24} color={Colors.dark.text} />,
        onPress: () => { }
    },
    {
        key: 'video-stability',
        title: 'Video Stability',
        icons: <StabilizerOutline size={24} color={Colors.dark.text} />,
        onPress: () => { }
    },
    {
        key: 'green-screen',
        title: 'Green Screen',
        icons: <GreenScreenOutline size={24} color={Colors.dark.text} />,
        onPress: () => { }
    },
    {
        key: 'grid',
        title: 'Grid',
        icons: <GridOutline size={24} color={Colors.dark.text} />,
        onPress: () => { }
    },
];

export const rightSideItemFirstList = [
    {
        key: 'flip',
        title: 'Flip',
        icons: <ArrowsRoundedOutline size={22} color={Colors.dark.text} />,
        onPress: () => toggleCameraFace()
    },
    {
        key: 'flash',
        title: 'Flash',
        icons: <FlashSlashOutline size={24} color={Colors.dark.text} />,
        onPress: () => toggleCameraFlash()
    },
    {
        key: 'sounds',
        title: 'Sounds',
        icons: <MusicOutline size={22} color={Colors.dark.text} />,
        onPress: () => { }
    },
    {
        key: 'night-mode',
        title: 'Night Mode',
        icons: <MoonOutline size={22} color={Colors.dark.text} />,
        onPress: () => { }
    },
    {
        key: 'director-mode',
        title: 'Director Mode',
        icons: <VideoStarOutline size={24} color={Colors.dark.text} />,
        onPress: () => { }
    },
];