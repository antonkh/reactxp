/**
* Accessibility.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*/

import RN = require('react-native');

import SubscribableEvent from 'subscribableevent';

import { Accessibility as NativeAccessibility } from '../native-common/Accessibility';

export class Accessibility extends NativeAccessibility {
    constructor() {
        super();

        if (RN.AccessibilityInfo) {
            RN.AccessibilityInfo.addEventListener('highContrastDidChange', isEnabled => {
                this.highContrastChangedEvent.fire(isEnabled);
            });
        }
    }    
}

export default new Accessibility();
