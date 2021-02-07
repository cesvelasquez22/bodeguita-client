import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'principal',
        title    : 'Principal',
        type     : 'group',
        children : [
            {
                id       : 'home',
                title    : 'Inicio',
                type     : 'item',
                icon     : 'home',
                url      : '/home',
            }
        ]
    },
    {
        id       : 'apps',
        title    : 'Módulos',
        type     : 'group',
        children : [
            {
                id       : 'inventory',
                title    : 'Inventario',
                type     : 'item',
                icon     : 'ballot',
                url      : '/inventory',
            },
            {
                id       : 'orders',
                title    : 'Órdenes',
                type     : 'item',
                icon     : 'assignment',
                url      : '/orders',
            },
        ]
    },
    {
        id       : 'backoffice',
        title    : 'Backoffice',
        type     : 'group',
        children : [
            {
                id       : 'users',
                title    : 'Usuarios',
                type     : 'item',
                icon     : 'person_pin',
                url      : '/users',
            },
            {
                id       : 'customers',
                title    : 'Clientes',
                type     : 'item',
                icon     : 'person',
                url      : '/customers',
            },
            {
                id       : 'providers',
                title    : 'Proveedores',
                type     : 'item',
                icon     : 'contacts',
                url      : '/providers',
            },
        ]
    },
    // {
    //     id       : 'applications',
    //     title    : 'Applications',
    //     translate: 'NAV.APPLICATIONS',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'sample',
    //             title    : 'Sample',
    //             translate: 'NAV.SAMPLE.TITLE',
    //             type     : 'item',
    //             icon     : 'email',
    //             url      : '/sample',
    //             badge    : {
    //                 title    : '25',
    //                 translate: 'NAV.SAMPLE.BADGE',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // }
];
