


const image='https://res.cloudinary.com/dvpkr8zwm/image/upload/v1668040717/bsale_proyect/img2_pn5wgg.jpg';
const url = 'https://bsale-back-tienda-online.vercel.app';

let urlProductos=`${url}/product`;
const apiProductos=fetch(urlProductos);

apiProductos.then(res=>res.json())
.then(data=>{
  data.forEach(element=>{
    document.getElementById("products").innerHTML += `
    <div>
    <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name}/>
    <div>
      ${element.name}
    </div>
    <div>
    Precio: ${`$ ${element.price}`}
    </div>
    <div>
    Descuento: ${`${element.discount}%`}
    </div>
    </div>
    
    `;
  })
  document.getElementById("spinner").style.display="none";
}).catch(err=>console.log(err))
const accionAsincrona = async () => {
  return new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve();
  }, 3000);
});   
}


let urlCategorias = `${url}/category`;
const apiCategory = fetch(urlCategorias);

apiCategory.then(res=>res.json())
.then(data=>{
  data.forEach(element=>{
      document.getElementById("categories").innerHTML+=
      `
      <button class='botones' id=${element.id} onclick="filtrarProductoCat(${element.id})">
        ${element.name}
      </button>
      
      `
  })
})
.catch((err) => console.log(err));

function filtrarProductoCat(value){
  let urlFilter=`${url}/product`;
  const apifilter=fetch(urlFilter)

  apifilter.then(res=>res.json())
  .then(data=>{
    localStorage.setItem("allProducts",JSON.stringify(data))
  if(value==="all"){
    document.getElementById("products").innerHTML = "";
    data.forEach(element => {
      document.getElementById("products").innerHTML+=
      `
      <div id=${element.id}>
          <img src=${element.url_image?element.url_image: image} width='200px' height='200px' alt=${element.name}/>
          <div>
              ${element.name}
          </div>
          <div>
          Precio: ${`$ ${element.price}`}
          </div>
          <div>
          Descuento: ${`${element.discount}%`}
          </div>
      </div>
      `
    })
  }else{
    let filterCat= data.filter(e=>e.category===value)
    document.getElementById("products").innerHTML=""
    filterCat.forEach((element) => {
      document.getElementById("products").innerHTML +=          
      
      `<div id=${element.id}>
        <img src=${element.url_image ? element.url_image : image} width='200px' height='200px' alt=${element.name}>
          <div>
            ${element.name.toUpperCase()}
          </div>
          <div>
            Precio: ${`$ ${element.price}`}
          </div>
          <div>
            Descuento:${`${element.discount}%`}
          </div>
      </div>`;
    })
    localStorage.setItem('allProducts', JSON.stringify(filterCat));
  }
  })
}






