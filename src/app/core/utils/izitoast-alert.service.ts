import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import izitoast from 'izitoast';
import {
    IIzitoasInfoDefault,
    IIzitoastErrorDefault,
    IIzitoastSuccessDefault,
    IIzitoasWarningDefault,
} from '../models/izitoast-model';

@Injectable({
    providedIn: 'root',
})
export class IzitoastAlertService {
    //
    // ──────────────────────────────────────────────────────────────────────────────  ──────────
    //   :::::: C U S T O M I Z A B L E   A L E R T S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //

    CustomAlertsArray: any = [
        IIzitoastSuccessDefault,
        IIzitoasInfoDefault,
        IIzitoastErrorDefault,
        IIzitoasWarningDefault,
    ];

    constructor(
        private router: Router,
    ) {}

    //
    // ────────────────────────────────────────────────────────────────────────────────  ──────────
    //   :::::: C U S T O M   A L E R T   H A N D L E R : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────
    //

    CustomSuccessAlert(message: string) {
        this.CustomAlertsArray[0].message = message;
        izitoast.success(this.CustomAlertsArray[0]);
    }

    CustomInfoAlert(message: string) {
        this.CustomAlertsArray[1].message = message;
        izitoast.info(this.CustomAlertsArray[1]);
    }

    CustomErrorAlert(message: string) {
        this.CustomAlertsArray[2].message = message;
        izitoast.error(this.CustomAlertsArray[2]);
    }
    
    CustomWarningAlert(message: string) {
        this.CustomAlertsArray[3].message = message;
        izitoast.warning(this.CustomAlertsArray[3]);
    }

    MaxMinAlerts(product: any) {
        izitoast.show({
            theme: 'dark',
            icon: 'notification',
            title: 'Productos',
            message: `${product} agotado`,
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
            progressBarColor: 'rgb(0, 255, 184)',
            buttons: [
                ['<button>Ir a tabla</button>', (instance, toast) => {
                    this.router.navigate(['/admin/home']);
                }, true], // true to focus
                ['<button>Cerrar</button>', (instance, toast) => {
                    instance.hide({
                        transitionOut: 'fadeOutUp',
                        onClosing: (_instance, _toast, closedBy) => {
                            console.log('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                        }
                    }, toast, 'buttonName');
                }] as any
            ],
            onOpening: (instance, toast) => {
                console.log('callback abriu!');
            },
            onClosing: (instance, toast, closedBy) => {
                console.log('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
            }
        });
    }
}
