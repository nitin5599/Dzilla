import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import { Stores, Invite, Account } from "../screens"

import { COLORS, icons } from "../constants"
import { TabIcon } from '../components';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    elevation:0,
                    borderTopColor:'transparent',
                    backgroundColor: COLORS.white,
                    height: 60
                }
            }}
        >
            <Tab.Screen
                name="Stores"
                component={Stores}
                options={{
                    tabBarIcon: ({focused}) => <TabIcon
                        focused={focused} icon={icons.store} name='Stores'
                    />
                }}
            />
            <Tab.Screen
                name="Invite"
                component={Invite}
                options={{
                    tabBarIcon: ({focused}) => <TabIcon
                        focused={focused} icon={icons.invite} name='Invite'
                    />
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: ({focused}) => <TabIcon
                        focused={focused} icon={icons.user} name='Account'
                    />
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs