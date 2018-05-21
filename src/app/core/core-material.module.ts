import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MAT_DATE_FORMATS,
    MatProgressSpinnerModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    exports: [
		MatFormFieldModule,
	    MatInputModule,
	    MatDialogModule,
	    MatSelectModule,
	    MatOptionModule,
	    MatCheckboxModule,
	    MatTabsModule,
	    MatTableModule,
	    MatPaginatorModule,
	    MatSortModule,
	    MatRippleModule,
	    MatCardModule,
	    MatButtonModule,
	    MatToolbarModule,
	    MatIconModule,
	    MatMenuModule,
		MatGridListModule,
		MatAutocompleteModule,
		MatListModule,
		MatExpansionModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatProgressSpinnerModule
	],
	providers: [
		{provide: MAT_DATE_FORMATS, useValue: {
			parse: {
				dateInput: 'DD/MM/YYYY'
			},
			display: {
				dateInput: 'DD/MM/YYYY',
				monthYearLabel: 'MMM YYYY',
    			dateA11yLabel: 'LL',
    			monthYearA11yLabel: 'MMMM YYYY'
			}
		}}
	]
})
export class CoreMaterialModule { }
