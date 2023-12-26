class TicketManager {
    constructor() {
        this.products = [];
        this.precioBaseDeGanancia = 0;
    }

    getProducts() {
        return this.products;
    }

    getUltimoId() {
        return this.products.length + 1;
    }

    addProduct(nombre, lugar, precio, capacidad = 50, fecha = new Date(), participantes = []) {
        const id = this.getUltimoId();
        const precioConGanancia = parseInt(precio) + parseInt(precio) * 0.5 + this.precioBaseDeGanancia;

        const nuevoProducto = {
            id,
            nombre,
            lugar,
            precio: precioConGanancia,
            capacidad,
            fecha,
            participantes,
        };

        this.products = [...this.products, nuevoProducto];
    }

    agregarUsuario(idProducto, idUsuario) {
        const existeProducto = this.existeProducto(parseInt(idProducto));
        if (existeProducto) {
            const usuarioEnProducto = this.existeUsuarioEnProducto(idUsuario, existeProducto);
            if (usuarioEnProducto) {
                console.log(`\nEl usuario ${idUsuario} ya se encuentra registrado en el producto.\n`);
                return;
            }

            existeProducto.participantes = [...existeProducto.participantes, idUsuario];
            console.log(`\nUsuario: ${idUsuario} agregado al producto: ${idProducto}!\n`);
            return;
        }

        console.log(`\nEl producto ${idProducto} no existe!\n`);
        return;
    }

    generaNuevoProducto(idProducto, nuevaLocalidad, nuevaFecha) {
        const existeProducto = this.existeProducto(idProducto);

        if (existeProducto) {
            const index = this.products.findIndex((producto) => producto.id === idProducto);
            this.products[index] = {
                ...this.products[index],
                lugar: nuevaLocalidad,
                fecha: nuevaFecha,
            };
            console.log(`\nProducto ${idProducto} actualizado!\n`);
            return;
        } else {
            console.log(`\nEl producto ${idProducto} no existe!\n`);
            return;
        }
    }

    existeProducto(idProducto) {
        return this.products.find((producto) => producto.id === idProducto);
    }

    existeUsuarioEnProducto(idUsuario, producto) {
        return producto.participantes.includes(idUsuario);
    }
}

const ticketManager = new TicketManager();
ticketManager.precioBaseDeGanancia = 2500;

ticketManager.addProduct("ShowenVivo", "Movistar Arena", 25000);
ticketManager.addProduct("Seminario", "Universidad Pontificia", 15000);

console.log(ticketManager.getProducts());

ticketManager.agregarUsuario(1, 1);
ticketManager.agregarUsuario(1, 2);
ticketManager.agregarUsuario(1, 3);
ticketManager.agregarUsuario(1, 3);
ticketManager.agregarUsuario(1, 5);

console.log(ticketManager.getProducts());

ticketManager.generaNuevoProducto(2, "DuocUC", new Date("2024-03-05"));

console.log(ticketManager.getProducts());
