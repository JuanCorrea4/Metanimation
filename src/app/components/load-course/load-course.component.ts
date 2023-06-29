import { Component } from '@angular/core';
@Component({
  selector: 'app-load-course',
  templateUrl: './load-course.component.html',
  styleUrls: ['./load-course.component.css']
})


export class LoadCourseComponent {

  colorDiamont: number = 1;
  colorText: number = 1;
  numberClass: number = 1
  textoBoton = 'chevron-right';
  arrayModulos: any[] = [];
  arrayClases: any[] = [];
  arrayRecursos: any[] = [];
  editableFields: boolean[] = [];


  nextStep() {
    if (this.colorDiamont == 3 || this.colorText == 3) {
      this.textoBoton = ' none'
    }
    if (this.colorDiamont == 4 || this.colorText == 4) {
      this.colorDiamont = 1
      this.colorText = 1
      this.textoBoton = 'chevron-right'
      return
    }
    const containerForm: any = document.getElementById("containerForm")
    containerForm.style.marginLeft = '-' + this.colorDiamont + '00%';
    this.colorDiamont++
    this.colorText++
  }

  previousStep() {
    const containerForm: any = document.getElementById("containerForm")
    if (this.colorDiamont == 4 || this.colorText == 4) {
      containerForm.style.marginLeft = '-200%';
    }
    if (this.colorDiamont == 3 || this.colorText == 3) {
      containerForm.style.marginLeft = '-100%';
    }

    if (this.colorDiamont == 2 || this.colorText == 2) {
      containerForm.style.marginLeft = '0';
    }
    if (this.colorDiamont == 1 || this.colorText == 1) {
      this.colorDiamont = 1
      this.colorText = 1
      return
    }
    this.textoBoton = 'chevron-right'
    this.colorDiamont--
    this.colorText--
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        const myElement = document.getElementById("uploadImage");
        let img = document.createElement("img")
        img.src = fileContent
        myElement?.appendChild(img)
      };
      reader.readAsText(file);
    }
  }

  createOneClass() {

    const nombreClase: any = document.getElementById("nombreClase")

    const urlClase: any = document.getElementById("urlClase")

    if (nombreClase.value != "" && urlClase.value != "") {
      let dataClase = {
        "nombreClase": nombreClase.value,
        "urlClase": urlClase.value
      }
      this.arrayClases.push(dataClase)
      nombreClase.value = ""
      urlClase.value = ""

    } else {
      alert("Por favor completa los campos de la clase")
    }


  }

  createOneSource() {

    const nombreRecurso: any = document.getElementById("nombreRecurso")

    const urlRecurso: any = document.getElementById("urlRecurso")

    if (nombreRecurso.value != "" && urlRecurso.value != "") {
      let dataRecurso = {
        "nombreRecurso": nombreRecurso.value,
        "urlRecurso": urlRecurso.value
      }
      this.arrayRecursos.push(dataRecurso)
      nombreRecurso.value = ""
      urlRecurso.value = ""

    } else {
      alert("Por favor completa los campos de la clase")
    }


  }

  saveModule() {
    const classDiv: any = document.getElementById("class")
    const nameModule: any = document.getElementById("nameModule")
    const nombreClase: any = document.getElementById("nombreClase")
    const urlClase: any = document.getElementById("urlClase")
    if (nameModule.value != "") {
      if (classDiv.childNodes.length > 1){

        let dataModulo = {
          "nombreModulo": nameModule.value,
          "clases": this.arrayClases
        }
        this.arrayModulos.push(dataModulo)
        nameModule.value = "";
        this.arrayClases = [];

      }else{ 
        alert("Por favor completa los campos de la clase")
      }
    } else {
      alert("Por favor dale un nombre al modulo")
    }
  }

  loadInfoCourse(index){
    this.arrayModulos[index].clases.readonly = false  

    this.arrayClases = this.arrayModulos[index].clases
    
    const divModule: any = document.getElementById("modules")

    divModule.childNodes[0].removeAttribute("readonly")

    this.editableFields[index] = !this.editableFields[index];
  
  }

  postCourse(){
    const cursoNombre: any = document.getElementById("cursoNombre")

    const cursoDescripcion: any = document.getElementById("cursoDescripcion")

    const categoria: any = document.getElementById("categoria")

    const course =
    {
      "cursoNombre": cursoNombre.value,
      "cursoDescripcion": cursoDescripcion.value,
      "categoria": categoria.value,
      "modulos": this.arrayModulos,
      "recursos":this.arrayRecursos
    }  
    
    fetch('/api/cursos/add', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body:
          JSON.stringify(course)
  })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
      });
  }
}
