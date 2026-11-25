import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

// Estes módulos criam o formulário e permitem retornar para a listagem.

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Ingrediente } from '../../../models/ingrediente';
import { IngredienteService } from '../../../services/ingrediente.service';

@Component({
  selector: 'app-form-ingrediente',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form-ingrediente.component.html',
  styleUrl: './form-ingrediente.component.scss'
})
export class FormIngredienteComponent implements OnInit {
  idEmEdicao: string | null = null;
  formulario = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    categoria: ['', Validators.required],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    unidade: ['', Validators.required]
  });

  // As validações impedem o salvamento de um ingrediente incompleto.

  constructor(private fb: FormBuilder, private servico: IngredienteService, private rota: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idEmEdicao = this.rota.snapshot.paramMap.get('id');
    if (!this.idEmEdicao) return;
    const item = this.servico.buscarPorId(this.idEmEdicao);
    if (item) this.formulario.patchValue(item);
  }

  // Se a rota contiver um identificador, os dados serão carregados para edição.

  salvar(): void {
    if (this.formulario.invalid) { this.formulario.markAllAsTouched(); return; }
    const item: Ingrediente = { id: this.idEmEdicao ?? crypto.randomUUID(), ...this.formulario.getRawValue() };
    if (this.idEmEdicao) this.servico.atualizar(item);
    else this.servico.adicionar(item);
    this.router.navigate(['/ingredientes']);
  }
}
