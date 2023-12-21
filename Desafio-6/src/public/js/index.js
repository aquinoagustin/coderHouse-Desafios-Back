//Iniciar el Socket

const socket = io();

socket.emit('message','cliente conectado')



const listProds = document.getElementById('list-prods');

socket.on('e_prods',(data)=>{
    listProds.innerHTML = ''




        data.map((item)=>{

            listProds.innerHTML += `
            <div class="card col-sm-2 m-3" style="width:18rem">
                <img src="https://www.bicifan.uy/wp-content/uploads/2016/09/producto-sin-imagen.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title" id="card-h5">${item.title}</h5>
                <h4 class="card-title">US$ ${item.price}</h4>
                <p class="card-text">Description:${item.description}</p>
                <p class="card-text">Quantity: ${item.stock}</p>

                </div>
            </div>
            `



/*

            const div = document.createElement('div');
            const li = document.createElement('li');
            div.innerText = ``
            li.innerText = `${item.id}:${item.title} US$ ${item.price}`
            listProds.appendChild(li)
            */
            }
        )
    
})

