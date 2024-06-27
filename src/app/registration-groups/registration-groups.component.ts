import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IGroups } from '../interfaces/groups.interface';
import { GroupsService } from '../services/api_serivices/groups/groups.service';

interface GroupForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<string | null>;
}

@Component({
  selector: 'app-registration-groups',
  standalone: true,
  templateUrl: './registration-groups.component.html',
  styleUrls: ['./registration-groups.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class RegistrationGroupsComponent implements OnInit {
  groupsService = inject(GroupsService);
  router = inject(Router);

  grupos = new FormGroup<GroupForm>({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('true', [Validators.required])
  });

  ngOnInit() {}

  onSubmit() {
    if (this.grupos.valid) {
      const groupData: IGroups = {
        name: this.grupos.get('name')?.value || '',
        description: this.grupos.get('description')?.value || '',
        status: this.grupos.get('status')?.value === 'true'
      };

      this.groupsService.createGroup(groupData).subscribe(
        response => {
          alert('Grupo registrado exitosamente');
          console.log('Grupo registrado con éxito', response);
          this.router.navigate(['/group-list']);
        },
        error => {
          alert('Error al registrar el grupo');
          console.error('Error al registrar grupo', error);
        }
      );
    } else {
      this.showErrors();
    }
  }

  showErrors() {
    const controls = this.grupos.controls;
    Object.keys(controls).forEach(key => {
      const control = controls[key as keyof GroupForm];
      if (control.invalid) {
        const invalidControl = document.querySelector(`[formControlName="${key}"]`);
        invalidControl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (invalidControl as HTMLElement)?.focus();
        alert(`Por favor, complete el campo ${this.getFieldName(key)}`);
        return;
      }
    });
  }

  getErrorMessage(controlName: keyof GroupForm): string {
    const control = this.grupos.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      name: 'Nombre del grupo',
      description: 'Descripción',
      status: 'Habilitado'
    };
    return fieldNames[key] || key;
  }
}