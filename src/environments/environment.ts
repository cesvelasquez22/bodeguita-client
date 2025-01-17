// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    API_URL: 'https://localhost:44398/api/',
    // API_URL: 'http://38.17.54.162:8083/api/',

    //
    // ─── URL CONTROLLERS PREFIX ─────────────────────────────────────────────────────
    //
    usuarioPrefix: 'usuario',
    rolesPrefix: 'roles',
    productoPrefix: 'producto',
    marcaPrefix: 'marca',
    categoriaPrefix: 'categoria',
    dimensionPrefix: 'dimension',
    ordenesCompraPrefix: 'OrdenesCompra',
    inventarioPrefix: 'inventario',
    ordenesVentaPrefix: 'OrdenesVenta',
    proveedorPrefix: 'proveedor',
    clientePrefix: 'cliente',
    maximosMinimosPrefix: 'maximosMinimos',
    unidadesMedidasPrefix: 'unidadesMedidas',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
