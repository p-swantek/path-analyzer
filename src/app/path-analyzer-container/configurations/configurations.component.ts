import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GridConfiguration, ModelFormGroup } from '../models';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-configurations',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent implements OnInit{

  maxRows = input<number>();
  maxColumns = input<number>();

  gridSizeChanged = output<GridConfiguration>();

  private formBuilder = inject(FormBuilder);
  configForm: ModelFormGroup<GridConfiguration>;

  ngOnInit(): void {
    let validators = Validators.compose([Validators.required, Validators.min(0)])
    this.configForm = this.formBuilder.group({
      numCols: [45, validators],
      numRows: [45, validators],
    })

  }

  updateGridSize() {
    if (this.configForm.valid){
      this.gridSizeChanged.emit(this.configForm.getRawValue())
    }
  }








}
