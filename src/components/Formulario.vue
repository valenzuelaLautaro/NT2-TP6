<template>

  <section class="src-components-formulario">
    <div class="jumbotron">
      <vue-form :state="formState" @submit.prevent="enviar()">
        <!-- NOMBRE -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input type="text"
           id="nombre" 
           name="nombre" 
           class="form-control"
           v-model.trim="formData.nombre"
           autocomplete="off"
           required
           :minlength="nombreMinLength"
           :maxlength="nombreMaxLength"
           sin-espacios
          >
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido.
            </div>
            <div slot="sin-espacios" class="alert alert-danger mt-1">
              El campo no puede contener espacios.
            </div>
            <div slot="minlength" class="alert alert-danger mt-1">
              Este campo requiere como mínimo {{ nombreMinLength }} caracteres.
            </div>
            <div v-if="formData.nombre.length == nombreMaxLength" class="alert alert-danger mt-1">
              Este campo acepta como máximo {{ nombreMaxLength }} caracteres.
            </div>
          </field-messages>
        </validate>

        <!-- EDAD -->
        <validate tag="div">
          <label for="edad">Edad</label>
          <input type="number"
           id="edad" 
           name="edad" 
           class="form-control" 
           v-model.number="formData.edad"
           autocomplete="off"
           required
           :min="edadMin"
           :max="edadMax"
          >
          <field-messages name="edad" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido.
            </div>
            <div slot="max" class="alert alert-danger mt-1">
              Edad fuera de rango ({{edadMin}} - {{edadMax}}).
            </div>
            <div slot="min" class="alert alert-danger mt-1">
              Edad fuera de rango ({{edadMin}} - {{edadMax}}).
            </div>
          </field-messages>
        </validate>

        <!-- EMAIL -->
        <validate tag="div">
          <label for="email">Email</label>
          <input type="email"
           id="email" 
           name="email" 
           class="form-control"
           v-model.trim="formData.email" 
           autocomplete="off"
           required 
          >
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">
              Campo requerido.
            </div>
            <div slot="email" class="alert alert-danger mt-1">
              Por favor, ingrese un correo válido.
            </div>
          </field-messages>
        </validate>

        <button class="btn btn-success my-3" :disabled="formState.$invalid">Enviar</button>
      </vue-form>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {

    },
    data () {
      return {
        formData: this.getInitialData(),
        formState: {},
        nombreMinLength: 3,
        nombreMaxLength: 15,
        edadMin: 18,
        edadMax: 120,
        url: 'https://615657b1e039a0001725a9ae.mockapi.io/Usuarios'
      }
    },
    methods: {
      getInitialData(){
        return {
          nombre: '',
          edad: null,
          email: ''
        }
      },
      async enviar(){
        try {
          let usuario = { ...this.formData }
          let respuesta = await this.axios.post(this.url, usuario)
          console.log('Datos recibidos', respuesta.data)

          this.formData = this.getInitialData()
          this.formState._reset()
        } catch (error) {
          console.error(error.message)
        }
        
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

</style>
