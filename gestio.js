const divBenvinguda = document.getElementById("benvinguda");
const divGestioMetges = document.getElementById("gestio-metges");
const divLlistatMetges = document.getElementById("llistat-metges");

const eleID_btnGestMetges = document.getElementById("btnGestMetges");
const eleID_btnGestPacients = document.getElementById("btnGestPacients");
const eleID_btnGestMalalties = document.getElementById("btnGestMalalties");
const eleID_btnGestAplicacio = document.getElementById("btnGestAplicacio");


divBenvinguda.style.display="block";
divGestioMetges.style.display="none";
divLlistatMetges.style.display="none";

function canviaBotons(){
  debugger;
  if(eleID_btnGestMetges.disabled){
    eleID_btnGestMetges.disabled=false;
    eleID_btnGestPacients.disabled=false; 
    eleID_btnGestMalalties.disabled=false;
    eleID_btnGestAplicacio.disabled=false;
  } else {
    eleID_btnGestMetges.disabled=true;
    eleID_btnGestPacients.disabled=true; 
    eleID_btnGestMalalties.disabled=true;
    eleID_btnGestAplicacio.disabled=true;
  }

}

function mostraGestioMetges(){
    document.getElementById('tancaDivMetges').onclick = function tanca() {
        //divBenvinguda.classList.toggle("d-none");
        // divGestioMetges.classList.toggle("d-none");
        divBenvinguda.style.display="block";
        divGestioMetges.style.display="none";
        divLlistatMetges.style.display="none";
        canviaBotons();
      }
      
      divBenvinguda.style.display="none";
      divGestioMetges.style.display="block";
      divLlistatMetges.style.display="block";
      
      canviaBotons();
  }
  
  function mostraGestioApp(){
    alert("Soc aqui!");
  }