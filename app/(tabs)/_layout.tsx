import React from 'react';

import { CameraOutline, CameraSolid, ChatOutline, ChatSolid, MapOutline, MapSolid, SpotlightOutline, SpotlightSolid, StoriesOutline, StoriesSolid } from '@/components/icons';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './chats';
import Camera from './index';
import Locations from './locations';
import Spotlight from './spotlight';
import Stories from './stories';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].icons,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].icons,
        tabBarIndicator: () => null,
        tabBarShowLabel: false,
        tabBarBounces: false,
        animationEnabled: false,
        tabBarStyle: { height: 95, backgroundColor: colorScheme === 'dark' ? Colors.dark.card : Colors.light.bg, borderTopColor: Colors[colorScheme ?? 'light'].border, paddingTop: 15 }
      }}
      pageMargin={40}
    >
      <Tab.Screen
        name="locations"
        component={Locations}
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => focused ? <MapSolid size={21} color={color} /> : <MapOutline size={21} color={color} />,
        }}
      />
      <Tab.Screen
        name="chats"
        component={Chats}
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => focused ? <ChatSolid size={21} color={color} /> : <ChatOutline size={21} color={color} />,
          tabBarBadge: () => (<ThemedView style={{ backgroundColor: Colors[colorScheme ?? 'dark'].red, width: 15, height: 15, borderRadius: 99, outlineWidth: 2, outlineColor: colorScheme === 'dark' ? Colors.dark.card : Colors.light.bg, right: 25, top: 7 }} />)
        }}
      />
      <Tab.Screen
        name="index"
        component={Camera}
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => focused ? <CameraSolid size={21} color={color} /> : <CameraOutline size={21} color={color} />
        }}
      />
      <Tab.Screen
        name="stories"
        component={Stories}
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => focused ? <StoriesSolid size={21} color={color} /> : <StoriesOutline size={21} color={color} />,
        }}
      />
      <Tab.Screen
        name="spotlight"
        component={Spotlight}
        options={{
          title: '',
          tabBarBadge: () => (<ThemedView style={{ backgroundColor: Colors[colorScheme ?? 'dark'].red, width: 15, height: 15, borderRadius: 99, outlineWidth: 2, outlineColor: colorScheme === 'dark' ? Colors.dark.card : Colors.light.bg, right: 25, top: 7 }} />),
          tabBarIcon: ({ color, focused }) => focused ? <SpotlightSolid size={21} color={color} /> : <SpotlightOutline size={21} color={color} />,
        }}
      />
    </ Tab.Navigator>
  );
}
