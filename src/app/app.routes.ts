import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaBebidasComponent } from './pages/bebidas/lista-bebidas/lista-bebidas.component';
import { FormBebidaComponent } from './pages/bebidas/form-bebida/form-bebida.component';
import { ListaIngredientesComponent } from './pages/ingredientes/lista-ingredientes/lista-ingredientes.component';

// As importações anteriores conectam cada endereço ao componente correspondente.

import { FormIngredienteComponent } from './pages/ingredientes/form-ingrediente/form-ingrediente.component';

export const routes: Routes = [
  { path: '', component: InicioComponent, title: 'Início | Bubble Bliss' },
  { path: 'bebidas', component: ListaBebidasComponent, title: 'Bubble Teas | Bubble Bliss' },
  { path: 'bebidas/nova', component: FormBebidaComponent, title: 'Nova bebida | Bubble Bliss' },
  { path: 'bebidas/editar/:id', component: FormBebidaComponent, title: 'Editar bebida | Bubble Bliss' },

  // As rotas acima atendem à página inicial e ao CRUD completo de bebidas.

  { path: 'ingredientes', component: ListaIngredientesComponent, title: 'Ingredientes | Bubble Bliss' },
  { path: 'ingredientes/novo', component: FormIngredienteComponent, title: 'Novo ingrediente | Bubble Bliss' },
  { path: 'ingredientes/editar/:id', component: FormIngredienteComponent, title: 'Editar ingrediente | Bubble Bliss' },
  { path: '**', redirectTo: '' }
];
