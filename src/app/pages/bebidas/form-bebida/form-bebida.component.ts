import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

// As importações anteriores oferecem formulário, navegação e componentes visuais.

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Bebida } from '../../../models/bebida';
import { BebidaService } from '../../../services/bebida.service';

@Component({
  selector: 'app-form-bebida',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form-bebida.component.html',
  styleUrl: './form-bebida.component.scss'
})
export class FormBebidaComponent implements OnInit {
  idEmEdicao: string | null = null;

  // Quando existe um identificador na rota, o formulário funciona como edição.

  formulario = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    sabor: ['', Validators.required],
    tamanho: ['M' as 'P' | 'M' | 'G', Validators.required],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    estoque: [0, [Validators.required, Validators.min(0)]],

    // Os campos anteriores exigem dados válidos antes de permitir o salvamento.

    imagem: ['', Validators.required],
    disponivel: [true]
  });

  constructor(private fb: FormBuilder, private servico: BebidaService, private rota: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idEmEdicao = this.rota.snapshot.paramMap.get('id');
    if (!this.idEmEdicao) return;
    const bebida = this.servico.buscarPorId(this.idEmEdicao);
    if (bebida) this.formulario.patchValue(bebida);
  }

  // Na edição, os valores atuais são encontrados e colocados nos campos.

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const bebida: Bebida = { id: this.idEmEdicao ?? crypto.randomUUID(), ...this.formulario.getRawValue() };
    if (this.idEmEdicao) this.servico.atualizar(bebida);
    else this.servico.adicionar(bebida);
    this.router.navigate(['/bebidas']);
  }
}
