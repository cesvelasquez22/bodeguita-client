import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-warehousing-list',
    templateUrl: './warehousing-list.component.html',
    styleUrls: ['./warehousing-list.component.scss'],
})
export class WarehousingListComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;

    constructor() {}

    ngOnInit(): void {}
}
