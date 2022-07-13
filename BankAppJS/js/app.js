const ingresos = [
    new Ingreso("Salario", 2600.00),
    new Ingreso("Venta Moto", 1500.00),
    new Ingreso("Venta Zapatos", 500.00)
];

const egresos = [
    new Egreso("Comida", 200.00),
    new Egreso("Ropa", 400.00)
];

//id
const PRESUPUESTO_ID = "presupuesto";
const EGRESO_ID = "egresos";
const PORCENTAJE_ID = "porcentaje";

//Funciones
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero = () => {
    cargarPresupuesto();
    cargarGastos();
    cargarPorcentajeEgresos();
    document.getElementById('ingresos').innerHTML = "+" + totalPresupuesto();
}

let cargarPorcentajeEgresos = () => {
    let porcentaje = (totalGastos() * 100) / totalPresupuesto();
    document.getElementById(PORCENTAJE_ID).innerHTML = porcentaje.toFixed(2) + "%";
}

let totalPresupuesto = () => {
    let total = 0;
    for(let ingreso of ingresos){
        total += ingreso.valor;
    };
    return total;
}

let cargarPresupuesto = () => {
    let presupuesto = totalPresupuesto() - totalGastos();
    let p = '';
    if (presupuesto < 0) p = "-";
    document.getElementById(PRESUPUESTO_ID).innerHTML = p + presupuesto + "€";
}

let totalGastos = () => {
    let total = 0;
    for(let gasto of egresos){
        total += gasto.valor;
    };
    return total;
}

let cargarGastos = () => {
    document.getElementById(EGRESO_ID).innerHTML = "-" + totalGastos();
}

const cargarIngresos = () => {
    let ingresosHTML = '<ul>';
    for(let ingreso of ingresos){
        ingresosHTML += crearDiv(ingreso);
    }
    ingresosHTML += '</ul>';
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

function crearDiv(ingreso){
    return `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento-valor">+ ${ingreso.valor}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-outline"
                    onclick="eliminarIngreso(${ingreso.id})">-</ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
}

let cargarEgresos = () => {
    let egresosHTML = '<ul>';
    for(let gasto of egresos){
        egresosHTML += crearDivEgreso(gasto);
    }
    egresosHTML += '</ul>';
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

function crearDivEgreso(gasto){
    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">
                <div class="elemento_descripcion">${gasto.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">- ${gasto.valor}</div>
                    <div class="elemento_porcentaje">${(gasto.valor*100/totalGastos()).toFixed(2)}%</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="close-outline"
                            onclick="eliminarEgreso(${gasto.id})">-</ion-icon>
                        </button>
            </div>
                </div>
            </div>
        </div>
    `;
}

const eliminarIngreso = (id) => {
    //la variable ingreso es propia de la funcion findIndex
    let indiceAEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceAEliminar, 1);

    alert(`El ingreso ha sido eliminado`);
    cargarApp();
}

const eliminarEgreso = (id) => {
    //la variable gasto es propia de la funcion findIndex
    let indiceAEliminar = egresos.findIndex(gasto => gasto.id === id);
    egresos.splice(indiceAEliminar, 1);

    alert(`El gasto ha sido eliminado`);
    cargarApp();
}

let agregarDato = () => {
    let form = document.forms["forma"];
    if(form['valor'].value === '' || form['descripcion'].value === ''){
        alert('Rellena todos los campos');
    }else{
        if(form['tipo'].value==='ingreso'){
        let ingreso = new Ingreso(form['descripcion'].value, Number(form['valor'].value));
        ingresos.push(ingreso);
        }else{
        let egreso = new Egreso(form['descripcion'].value, Number(form['valor'].value));
        egresos.push(egreso);
        }
        cargarApp();
    }
    cleanForm();
}

function cleanForm(){
    let form = document.forms["forma"];
    form['valor'].value = '';
    form['descripcion'].value = '';
}