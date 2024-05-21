let carrito = [];

function agregarAlCarrito(nombre, precio) {
    const item = { nombre, precio, cantidad: 1 };
    const existente = carrito.find(i => i.nombre === nombre);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push(item);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function procesarPedido() {
    const numeroWhatsApp = '92982790240';
    let mensaje = 'Pedido de Servicios de Lavado:\n';

    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio} x ${item.cantidad}\n`;
    });

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    mensaje += `\nTotal: $${total.toFixed(2)}`;

    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    if (fecha && hora) {
        mensaje += `\nFecha: ${fecha}\nHora: ${hora}`;
    } else {
        alert('Por favor, selecciona una fecha y una hora.');
        return;
    }

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
 