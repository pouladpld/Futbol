import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competition } from '../models/competition';
import { headers } from './request-headers';
import { environment } from '../../environments/environment';

@Injectable()
export class RegistrationService {
    isNotificationSupported(): boolean {
        return window['Notification'] && true;
    }

    isServiceWorkerSupported(): boolean {
        return navigator['serviceWorker'] && true;
    }

    isNotificationPermissionGranted(): boolean {
        const Notification = window['Notification'];
        if (!Notification) {
            return false;
        }
        return Notification.permission === 'granted';
    }

    async isPushSubscribed(): Promise<boolean> {
        if (!('serviceWorker' in navigator)) {
            return false;
        }
        const swReg = await navigator.serviceWorker.getRegistration();
        if (!swReg) {
            return false;
        }
        const subscription = await swReg.pushManager.getSubscription();
        return subscription && true;
    }

    async requestNotificationPermission(): Promise<boolean> {
        const Notification = window['Notification'];
        if (!Notification) {
            alert('Your browser does not support notifications');
            return false;
        }

        const status = await Notification.requestPermission();
        if (status === 'granted') {
            const _ = new Notification('Great! Notifications are set.', {
                type: 'notif-granted',
            });
            return true;
        } else {
            alert('Please allow the app to send notifications.');
            return false;
        }
    }

    async trySubscribePushNotifications(): Promise<boolean> {
        if (!('serviceWorker' in navigator)) {
            alert('Service Worker is not supported in your browser');
            return false;
        }

        if (!environment.production) {
            console.warn('Not in production mode. Skipping push notification subscription.');
            return false;
        }

        let swReg: ServiceWorkerRegistration;
        try {
            swReg = await navigator.serviceWorker.register('sw.js');
        } catch (e) {
            console.warn(e);
            alert('Unable to register service worker.' + `\n${JSON.stringify(e)}`);
            return false;
        }

        let subscription: PushSubscription;
        try {
            subscription = await swReg.pushManager.subscribe({userVisibleOnly: true});
        } catch (e) {
            console.warn(e);
            alert('Unable to subscribe to push notifications.' + `\n${JSON.stringify(e)}`);
            return false;
        }

        console.log(subscription.endpoint);
        return true;
    }
}
