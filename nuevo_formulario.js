<template>
    <div class="container">
          <div class="jumbotron" v-bind:style="{'backgroundColor':background,'color':color}">

              <h1>Formularios</h1>
              <form @submit.prevent="enviar()" class="form-group">

                    <p>{{formulario.nombre}}</p>

                    <label for="nombre">Nombre</label>
                    <input placeholder="Ingrese un nombre" type="text" class="form-control"
                    name="nombre" id="nombre" v-model.trim="formulario.nombre">


                    <p>{{formulario.edad}}</p>

                    <label for="edad">Edad</label>
                    <input @keydown.prevent type="number" class="form-control" name="edad" id="edad" v-model.number="formulario.edad">

                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" id="email" v-model="formulario.email">

                    <br>
                    <label for="descripcion"></label>
                    <textarea name="" id="descripcion" cols="128" rows="3" v-model="formulario.descripcion"></textarea>

                    <div class="form-check">
                         <input value="maniana" type="checkbox" class="form-check-input" id="maniana" v-model="formulario.disponibilidad">
                         <label class="form-check-label" for="maniana">Mañana</label>
                     </div>

                    <div class="form-check">
                         <input  value="tarde" type="checkbox" class="form-check-input" id="tarde" v-model="formulario.disponibilidad">
                          <label class="form-check-label" for="tarde">Tarde</label>

                     </div>

                    <div class="form-check">
                         <input value="noche" type="checkbox" class="form-check-input" id="noche" v-model="formulario.disponibilidad">
                         <label class="form-check-label" for="noche">Noche</label>
                    </div>

                    <br><br>
                    <div class="form-check">
                         <input checked value="online" name="tipo" type="radio" class="form-check-input" id="online" v-model="formulario.tipo">
                         <label class="form-check-label" for="noche">On line</label>
                    </div>

                    <div class="form-check">
                         <input value="presencial" name="tipo" type="radio" class="form-check-input" id="presencial" v-model="formulario.tipo">
                         <label class="form-check-label" for="presencial">Presencial</label>
                    </div>

                    <br><br>

                    <select v-model='formulario.id_provincia'>
                        <option selected disabled value="-1">Seleccione una provincia</option>
                        <option value="50">Buenos Aires</option>
                        <option value="51">Santa Fe</option>
                        <option value="52">Córdoba</option>
                    </select>
                    <br><br>

                    <select v-model='formulario.id_provincia'>
                           <option :value="item.value" :key="index" v-for="(item,index) in provincias">
                                {{item.nombre}}
                           </option>
                    </select>

                    <br><br>

                    <select v-model="formulario.id_provincia" @change="traerMunicipios" class="form-control">
                           <option :value="item.id" :key="index" v-for="(item,index) in provincias1">
                                {{item.nombre}}
                           </option>
                    </select>

                    <select class="form-control">
                           <option :value="item.id" :key="index" v-for="(item,index) in municipios">
                                {{item.nombre}}
                           </option>
                    </select>

                    <button type="submit">Enviar</button>
              </form>
          </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            provincias:[
                {value:54,nombre:'Entre Rios'},
                {value:55,nombre:'Rio Negro'},
                {value:55,nombre:'Mendoza'}
                ],
            provincias1:[],
            municipios:[],
            formulario:this.obtenerDatos()
        }
    },
    methods:{
        enviar(){
            console.log(this.formulario)
            console.log('enviando...')
            this.formulario=this.obtenerDatos();
            document.getElementById('nombre').focus();
        },
        obtenerDatos(){
            return {nombre:'',
                    edad:'',
                    email:'',
                    descripcion:'Ingrese una descripción',
                    disponibilidad:[],
                    tipo:'',
                    id_provincia:"-1"}
        },
        traerProvincias(){

         fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
            .then(response=>{
                return response.json();
            }).then(mijson=>{
                this.provincias1= mijson.provincias;
            })
        },
        traerMunicipios(){
         fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${this.formulario.id_provincia}&campos=id,nombre&max=100`)
            .then(response=>{
                return response.json();
            }).then(mijson=>{
                this.municipios= mijson.municipios;
            })
        }
    },
    props:['background','color'],
    created(){
        this.traerProvincias()
    }
}
</script>
