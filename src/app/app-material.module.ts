import {NgModule} from '@angular/core';
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
	MatAutocompleteModule
} from '@angular/material';

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
		MatAutocompleteModule
	]
})
export class AppMaterialModule {

}