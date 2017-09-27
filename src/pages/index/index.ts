import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service-provider';
/*
  Generated class for the Index page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

	productos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public service: ServiceProvider,public alertCtrl:AlertController)
  {
    this.getDados();
  }


  getDados() {
      //retorno de Dados
      this.service.getData().subscribe(
                  data=> this.productos = data,
                  err=> console.log(err)
            );
   }
  EditarProducto(req)
  {
      let prompt = this.alertCtrl.create({
          title : 'Edita Producto',
          inputs:[
            {
              name:'name' ,
              placeholder: 'Nombre',
              value:req.name
            },
            {
              name:'price' ,
              placeholder: 'Precio',
              value: req.price
            }
          ],
        buttons :[
          {
              text: 'Cancelar',
              handler: data =>{}
          },
          {
            text: 'Guardar',
            handler: data =>{
              let params:any={
                 id: req.id,
                 name:data.name,
                 price:data.price
              }
              this.service.actualizarproducto(params)
                .subscribe(
                    data=>{
                         console.log(data.mensaje);
                         this.getDados();
                         //mostrar un mensaje
                         this.showAlert(data.mensaje);
                    },
                      err=>console.log(err)
                );


            }

          }
        ]

      })

    prompt.present();
  }

  showAlert(men)
  {
    let alert = this.alertCtrl.create(
      {
          title:'Información',
          subTitle: men,
          buttons:['ok']
      });
    alert.present();
  }
}

