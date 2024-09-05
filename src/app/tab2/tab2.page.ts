import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public dados: any;

  public usuario: any = {
    first_name: '',
    last_name: '',
    email: '',
    job: ''
  };

  public isEditing: boolean = false;
  private editingUserId: number | null = null;

  constructor(
    private userService: UserService,
    private toastController: ToastController
  ) {
    this.carregarUsuarios();
  }

  private carregarUsuarios() {
    this.userService.obterTodos().subscribe((dados: any) => {
      this.dados = dados;
    });
  }

  public salvarUsuario() {
    if (this.isEditing && this.editingUserId !== null) {
      this.userService.atualizar(this.editingUserId, this.usuario).subscribe(() => {
        this.presentToast('Usuário atualizado com sucesso!');
        this.resetForm();
        this.carregarUsuarios();
      });
    } else {
      this.userService.cadastrar(this.usuario).subscribe(() => {
        this.presentToast('Usuário cadastrado com sucesso!');
        this.resetForm();
        this.carregarUsuarios();
      });
    }
  }

  public editarUsuario(usuario: any) {
    this.usuario = { ...usuario };
    this.isEditing = true;
    this.editingUserId = usuario.id;
  }

  public deletarUsuario(id: number) {
    this.userService.deletar(id).subscribe(() => {
      this.presentToast('Usuário excluído com sucesso!');
      this.carregarUsuarios();
    });
  }

  private resetForm() {
    this.usuario = {
      first_name: '',
      last_name: '',
      email: ''
    };
    this.isEditing = false;
    this.editingUserId = null;
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
