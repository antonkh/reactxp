/**
* Accessibility.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*/

import RN = require('react-native');
import SubscribableEvent from 'subscribableevent';
import { Accessibility as NativeAccessibility } from '../native-common/Accessibility';
import SyncTasks = require('synctasks');

export class Accessibility extends NativeAccessibility {
    private _isHighContrast: boolean|undefined;

    constructor() {
        super();

        if (RN.AccessibilityInfo) {
            RN.AccessibilityInfo.addEventListener('highContrastDidChange', isEnabled => {
                this._updateIsHighContrast(isEnabled);
            });

            if (RN.AccessibilityInfo.fetchIsHighContrast) {
                RN.AccessibilityInfo.fetchIsHighContrast().then(isEnabled => {
                    this._updateIsHighContrast(isEnabled);
                });
            }
        }
    }

    private _updateIsHighContrast(isEnabled: boolean) {
        if (this._isHighContrast !== isEnabled) {
            this._isHighContrast = isEnabled;
            this.highContrastChangedEvent.fire(isEnabled);
        }
    }

    isHighContrastEnabled(): boolean|undefined {
        return this._isHighContrast;
    }
}

export default new Accessibility();
